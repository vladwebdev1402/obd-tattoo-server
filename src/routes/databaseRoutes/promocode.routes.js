import e, { Router } from "express";
import Promocode from "../../model/PromocodeModel.js";
import Category from "../../model/CategoryModel.js";
import Item from "../../model/ItemModel.js";
import Client from "../../model/ClientModel.js";
import { ImageUrl } from "./ImageUrl.js";
import { FileController } from "../../controllers/FileController.js";
import { AuthMiddleware } from "../../middleware/AuthMiddleware.js";
const PromocodeRouter = Router();

PromocodeRouter.get("/promocode", async (req, res) => {
  const data = await Promocode.find();
  return res.json({ data, message: "Промокоды успешно получены" });
});

PromocodeRouter.post(
  "/promocode",
  AuthMiddleware(["DATABASE_ADMIN"], {}),
  async (req, res) => {
    const { name, promocode, description, discount, image } = req.body;
    const data = await Promocode.create({
      name,
      promocode,
      description,
      discount,
      image: ImageUrl + image,
    });
    return res.json({ data, message: "Промокод успешно создан" });
  }
);

PromocodeRouter.delete(
  "/promocode",
  AuthMiddleware(["DATABASE_ADMIN"], {}),
  async (req, res) => {
    const data = await Promocode.findOneAndDelete().where({
      _id: req.body._id,
    });
    FileController.deleteFile(data.image);
    return res.json({ data, message: "Промокод успешно удалён" });
  }
);

PromocodeRouter.put(
  "/promocode",
  AuthMiddleware(["DATABASE_ADMIN"], {}),
  async (req, res) => {
    const { name, promocode, description, discount, image } = req.body;
    const oldData = await Promocode.findOneAndUpdate(
      {
        _id: req.body._id,
      },
      {
        $set: {
          name,
          promocode,
          description,
          discount,
          image: ImageUrl + image,
        },
      }
    );
    const data = await Promocode.findOne({ _id: req.body._id });
    if (data.image !== oldData.image) FileController.deleteFile(oldData.image);
    return res.json({ data, message: "Промокод успешно обновлён" });
  }
);

PromocodeRouter.post(
  "/promocode/check",
  AuthMiddleware(["DATABASE_ADMIN", "CLIENT"], {}),
  async (req, res) => {
    const { promocode } = req.body;
    const promo = await Promocode.findOne({promocode});
    const basket = (await Client.findOne({ _id: req.user_id })).basket;
    if (promocode === "IAMHEDGEHOG") {
      const _idNeedle = (await Category.findOne({ name: "Тату иглы" }))._id;
      const _idTips = (await Category.findOne({ name: "Тату наконечники" }))
        ._id;
      let countNeedles = 0;
      let countTips = 0;

      for (let e of basket) {
        const item = await Item.findOne({ _id: e.item });
        countNeedles +=
          item.category.toString() === _idNeedle.toString() ? e.count : 0;
        countTips +=
          item.category.toString() === _idTips.toString() ? e.count : 0;
      }

      if (countNeedles >= 5 && countTips >= 5) {
        // установить скидку в корзине
        return res.json({data: {discount: promo.discount, _id: promo._id}, message: "Промокод успешно активирован" });
      } else {
        return res.json({data: {discount: 0, _id: ""},
          message: `В корзине недостаточно товаров категорий: ${
            countNeedles < 5 ? 5 - countNeedles + " Тату иглы" : ""
          }${countTips < 5 ? ", " + `${5 - countTips}` + " Тату наконечники " : ""}`,
        });
      }
    } else if (promocode === "DRISKEL100") {
     
      let allPrice = 0;
      for (let e of basket) {
        const itemPrice = (await Item.findOne({ _id: e.item })).price;
        allPrice += itemPrice;
      }

      if (allPrice >= 5500) {
        // установить скидку в корзине
        return res.json({data: {discount: promo.discount, _id: promo._id}, message: "Промокод успешно активирован" });
      } else {
        return res.json({data: {discount: 0, _id: ""},
          message: `Недостаточно суммы для активации промокода: ${5500 - allPrice} рублей`,
        });
      }
    } else if (promocode === "ILOVETATTO") {
      const _idNeedle = (await Category.findOne({ name: "Тату иглы" }))._id;
      const _idSet = (await Category.findOne({ name: "Наборы для татуировок" }))
        ._id;
      let countNeedles = 0;
      let countSet = 0;

      for (let e of basket) {
        const item = await Item.findOne({ _id: e.item });
        countNeedles +=
          item.category.toString() === _idNeedle.toString() ? e.count : 0;
        countSet +=
          item.category.toString() === _idSet.toString() ? e.count : 0;
      }

      if (countNeedles >= 2 && countSet >= 2) {
        // установить скидку в корзине
        return res.json({data: {discount: promo.discount, _id: promo._id}, message: "Промокод успешно активирован" });
      } else {
        return res.json({data: {discount: 0, _id: ""},
          message: `В корзине недостаточно товаров категорий: ${
            countNeedles < 2 ? 2 - countNeedles + " Тату иглы" : ""
          }${countSet < 2 ? ", " + `${2 - countSet}` + " Наборы для татуировок " : ""}`,
        });
      }
    }

    return res.json({data: {discount: 0, _id: ""}, message: "Промокод не найден" });
  }
);

export default PromocodeRouter;
