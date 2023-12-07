import { Router } from "express";
import Promocode from "../../model/PromocodeModel.js";
import { ImageUrl } from "./ImageUrl.js";
import { FileController } from "../../controllers/FileController.js";
const PromocodeRouter = Router();

 

PromocodeRouter.get("/promocode", async (req, res) => {
  const data = await Promocode.find();
  res.json(data);
});

PromocodeRouter.post("/promocode", async (req, res) => {
  const { name, promocode, description, discount, image } = req.body;
  const data = await Promocode.create({
    name, promocode, description, discount, image: ImageUrl + image
  });
  res.json(data);
});

PromocodeRouter.delete("/promocode", async (req, res) => {
  const data = await Promocode.findOneAndDelete().where({
    _id: req.body._id,
  });
    FileController.deleteFile(data.image);
    res.json(data);
});

PromocodeRouter.put("/promocode", async (req, res) => {
  const { name, promocode, description, discount, image } = req.body;
  const oldData = await Promocode.findOneAndUpdate(
    {
      _id: req.body._id,
    },
    {
      $set: {
        name, promocode, description, discount, image: ImageUrl + image
      },
    }
  );
  const data = await Promocode.findOne({_id: req.body._id});
  if (data.image !== oldData.image) FileController.deleteFile(oldData.image);
  res.json(data);
});

export default PromocodeRouter;
