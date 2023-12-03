import { Router } from "express";
import Promocode from "../model/PromocodeModel.js";
const PromocodeRouter = Router();

 

PromocodeRouter.get("/promocode", async (req, res) => {
  const data = await Promocode.find();
  res.json(data);
});

PromocodeRouter.post("/promocode", async (req, res) => {
  const { name, promocode, description, discount, image } = req.body;
  const data = await Promocode.create({
    name, promocode, description, discount, image
  });
  res.json(data);
});

PromocodeRouter.delete("/promocode", async (req, res) => {
  const data = await Promocode.deleteOne().where({
    _id: req.body._id,
  });
  res.json(data);
});

PromocodeRouter.put("/promocode", async (req, res) => {
  const { name, promocode, description, discount, image } = req.body;
  const data = await Promocode.updateOne(
    {
      _id: req.body._id,
    },
    {
      $set: {
        name, promocode, description, discount, image
      },
    }
  );
  res.json(data);
});

export default PromocodeRouter;
