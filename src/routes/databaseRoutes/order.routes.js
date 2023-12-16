import { AuthMiddleware } from "../../middleware/AuthMiddleware.js";
import Item from "../../model/ItemModel.js";
import Order from "../../model/OrderModel.js";
import Client from "../../model/ClientModel.js";
import Promocode from "../../model/PromocodeModel.js";
import { Router } from "express";

const OrderRouter = Router();

OrderRouter.get(
  "/order",
  AuthMiddleware(["DATABASE_ADMIN", "CLIENT"], []),
  async (req, res) => {
    const data = await Order.find({ client: req.user_id })
    .populate({path: "contacts.city", select: "name -_id"})
    .populate({path: "contacts.street", select: "name -_id"})
    .populate({path: "status", select: "name -_id"});
    return res.json({ data, message: "Заказы успешно получены" });
  }
);

OrderRouter.get(
  "/order/all",
  AuthMiddleware(["DATABASE_ADMIN"], []),
  async (req, res) => {
    const data = await Order.find();
    return res.json({ data, message: "Заказы успешно получены" });
  }
);

OrderRouter.post(
  "/order",
  AuthMiddleware(["DATABASE_ADMIN", "CLIENT"], {}),
  async (req, res) => {
    try {
      const date = new Date();
      const number = getUniqueNumber();
      
      const { basket, contacts, service, payment, delivery, promocode } =
        req.body;
      let allPrice = 0;
      let countItems = 0;
      const promoDiscount = promocode ? (await Promocode.findOne({_id: promocode})).discount : 0;
      // подсчёт информации о корзине 
      for (let i = 0; i < basket.length; i++) {
        const basketItem = basket[i];
        const shopItem = (await Item.find({ _id: basketItem.item }))[0];

        // проверка, что количество товаров в корзине не больше, чем на складе
        if (shopItem.count < basketItem.count) {
          return res.status(400).json({
            data: null,
            message: `Количество товара ${shopItem.name} на складе ${shopItem.count}. Измените количество этого товара в корзине товара`,
          });
        }
        countItems += basketItem.count;
        allPrice += shopItem.price * basketItem.count;
      }
      // уменьшение количества товаров на складе согласно корзине пользователя
      basket.forEach(async (basketItem) => {
        await Item.updateOne({_id: basketItem.item}, {
          $inc: { count: -basketItem.count }
        })

        await Item.updateOne({_id: basketItem.item, count: 0}, {
          $set: { 'marcers.no': true }
        })
        return basketItem;
      });

      // очистка корзины пользователя
      await Client.updateOne(
        {
          _id: req.user_id
        },
        {$set: {
          basket: []
        }}
      )

      const promo = {}
      if (promocode) promo.promocode = promocode

      const data = await Order.create({
        ...promo,
        date,
        number,
        client: req.user_id,
        basket,
        contacts,
        service,
        payment: payment ?? "656f32e18f35a7c471c6f566",
        delivery: delivery ?? "656f32878f35a7c471c6f558",
        allPrice: allPrice - (allPrice * promoDiscount / 100),
        countItems,
        status: "655f6146a4d2868df197b7be",
      });
      return res.json({ data, message: "Заказ успешно оформлен" });
    } catch (err) {
      console.log(err);
      return res.json({ message: "Произошла ошибка при оформлении заказа" });
    }
  }
);

OrderRouter.delete(
  "/order",
  AuthMiddleware(["DATABASE_ADMIN"], {}),
  async (req, res) => {
    const data = await Order.findOneAndDelete().where({
      _id: req.body._id,
    });
    return res.json({ data, message: "Заказ успешно удалён" });
  }
);

OrderRouter.delete(
  "/order/all",
  AuthMiddleware(["DATABASE_ADMIN"], {}),
  async (req, res) => {
    const data = await Order.deleteMany();
    return res.json({ data, message: "Заказы успешно удалён" });
  }
);

OrderRouter.put(
  "/order",
  AuthMiddleware(["DATABASE_ADMIN"], {}),
  async (req, res) => {
    const { basket, client, service, payment, delivery, promocode, status } =
      req.body;
    const data = await Order.findOneAndUpdate(
      {
        _id: req.body._id,
      },
      {
        $set: {
          basket,
          client,
          service,
          payment,
          delivery,
          promocode,
          status,
        },
      }
    );
    return res.status(400).json({ data, message: "Заказ успешно обновлён" });
  }
);

export default OrderRouter;

function getUniqueNumber() {
  let number = "";
  number += Math.round(Math.random() * 999);
  number += Math.round(Math.random() * 999);
  number += new Date().getTime().toString().slice(-2);
  return number;
}
