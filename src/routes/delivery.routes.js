import { Router } from "express";
import Delivery from "../model/DeliveryModel.js";

const DeliveryRouter = Router();

DeliveryRouter.get("/delivery", async (req, res) => {
  const data = await Delivery.find();
  res.json(data);
});

DeliveryRouter.post("/delivery", async (req, res) => {
  const { name, promt } = req.body;
  const data = await Delivery.create({ name, promt });
  res.json(data);
});

DeliveryRouter.delete("/delivery", async (req, res) => {
  const data = await Delivery.deleteOne().where({
    _id: req.body._id,
  });
  res.json(data);
});

DeliveryRouter.put("/delivery", async (req, res) => {
  const { name, promt } = req.body;
  const data = await Delivery.updateOne(
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
  res.json(data);
});

export default DeliveryRouter;
