import { Router } from "express";
import Delivery from "../../model/DeliveryModel.js";
import { AuthMiddleware } from "../../middleware/AuthMiddleware.js";

const DeliveryRouter = Router();

DeliveryRouter.get("/delivery", AuthMiddleware(["DATABASE_ADMIN", "CLIENT"], []), async (req, res) => {
  const data = await Delivery.find();
  return res.json({data, message: "Категории доставки успешно получены"});
});

DeliveryRouter.post("/delivery", AuthMiddleware(["DATABASE_ADMIN"], {}), async (req, res) => {
  const { name, promt } = req.body;
  const data = await Delivery.create({ name, promt });
  return res.json({data, message: "Категория доставки успешно создана"});

});

DeliveryRouter.delete("/delivery", AuthMiddleware(["DATABASE_ADMIN"], {}), async (req, res) => {
  const data = await Delivery.findOneAndDelete().where({
    _id: req.body._id,
  });
  return res.json({data, message: "Категория доставки успешно удалена"});

});

DeliveryRouter.put("/delivery", AuthMiddleware(["DATABASE_ADMIN"], {}), async (req, res) => {
  const { name, promt } = req.body;
  const data = await Delivery.findOneAndUpdate(
    {
      _id: req.body._id,
    },
    {
      $set: {
        name,
        promt,
      },
    }
  );
  return res.json({data, message: "Категория доставки успешно обновлена"});

});

export default DeliveryRouter;
