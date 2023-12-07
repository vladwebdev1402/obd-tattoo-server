import { Router } from "express";
import Service from "../../model/ServiceModel.js";
import { FileController } from "../../controllers/FileController.js";
import { ImageUrl } from "./ImageUrl.js";
const ServiceRouter = Router();

ServiceRouter.get("/service", async (req, res) => {
  const data = await Service.find();
  res.json(data);
});

ServiceRouter.post("/service", async (req, res) => {
  const { name, description, price, image } = req.body;
  const data = await Service.create({
    name,
    description,
    image: ImageUrl + image,
    price,
  });
  res.json(data);
});

ServiceRouter.delete("/service", async (req, res) => {
  const data = await Service.findOneAndDelete().where({
    _id: req.body._id,
  });
  FileController.deleteFile(data.image);
  res.json(data);
});

ServiceRouter.put("/service", async (req, res) => {
  const { name, description, price, image } = req.body;
  const oldData = await Service.findOneAndUpdate(
    {
      _id: req.body._id,
    },
    {
      $set: {
        name,
        description,
        price,
        image: ImageUrl + image,
      },
    }
  );

  const data = await Service.findOne({ _id: req.body._id });
  if (data.image !== oldData.image) FileController.deleteFile(oldData.image);
  res.json(data);
});

export default ServiceRouter;
