import { Router } from "express";
import Service from "../../model/ServiceModel.js";
import { FileController } from "../../controllers/FileController.js";
import { ImageUrl } from "./ImageUrl.js";
import { AuthMiddleware } from "../../middleware/AuthMiddleware.js";
const ServiceRouter = Router();

ServiceRouter.get("/service", AuthMiddleware(["DATABASE_ADMIN", "CLIENT"], []), async (req, res) => {
  const data = await Service.find();
  return res.json({data, message: "Дополнительные услуги успешно получены"});
});

ServiceRouter.post("/service", AuthMiddleware(["DATABASE_ADMIN"], {}), async (req, res) => {
  const { name, description, price, image } = req.body;
  const data = await Service.create({
    name,
    description,
    image: ImageUrl + image,
    price,
  });
  return res.json({data, message: "Дополнительная услуга успешно создана"});
});

ServiceRouter.delete("/service", AuthMiddleware(["DATABASE_ADMIN"], {}), async (req, res) => {
  const data = await Service.findOneAndDelete().where({
    _id: req.body._id,
  });
  FileController.deleteFile(data.image);
  return res.json({data, message: "Дополнительная услуга успешно удалена"});
});

ServiceRouter.put("/service", AuthMiddleware(["DATABASE_ADMIN"], {}), async (req, res) => {
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
  return res.json({data, message: "Дополнительная услуга успешно обновлена"});
});

export default ServiceRouter;
