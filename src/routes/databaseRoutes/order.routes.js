import { AuthMiddleware } from "../../middleware/AuthMiddleware.js";
import Order from "../../model/OrderModel.js";
import { Router } from "express";

const OrderRouter = Router();

OrderRouter.get("/order", AuthMiddleware(["DATABASE_ADMIN"], []), async (req, res) => {
  const data = await Order.find();
  return res.json({data, message: "Заказы успешно получены"});
});


OrderRouter.get("/order/client", AuthMiddleware(["DATABASE_ADMIN", "CLIENT"], []), async (req, res) => {
  const data = await Order.find({client: req.query.client});
  return res.json({data, message: "Заказы успешно получены"});
});

OrderRouter.post("/order", AuthMiddleware(["DATABASE_ADMIN", "CLIENT"], {}), async (req, res) => {
  const date = new Date();

  const number = getUniqueNumber();
  const { basket, client, service, payment, delivery, promocode } = req.body;
  const data = await Order.create({
    date,
    number, 
    basket,
    client,
    service,
    payment,
    delivery,
    promocode,
    status: "655f6146a4d2868df197b7be",
  });
  return res.json({data, message: "Заказ успешно оформлен"});
});

OrderRouter.delete("/order", AuthMiddleware(["DATABASE_ADMIN"], {}), async (req, res) => {
  const data = await Order.findOneAndDelete().where({
    _id: req.body._id,
  });
  return res.json({data, message: "Заказ успешно удалён"});
});

OrderRouter.put("/order", AuthMiddleware(["DATABASE_ADMIN"], {}), async (req, res) => {
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
  return res.json({data, message: "Заказ успешно обновлён"});
});

export default OrderRouter;

function getUniqueNumber() {
  let number = "";
  number += Math.round(Math.random() * 999);
  number += Math.round(Math.random() * 999);
  number += new Date().getTime().toString().slice(-2);
  return number
}