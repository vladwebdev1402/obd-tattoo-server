import { Router } from "express";
import Promocode from "../../model/PromocodeModel.js";
import { ImageUrl } from "./ImageUrl.js";
import { FileController } from "../../controllers/FileController.js";
import { AuthMiddleware } from "../../middleware/AuthMiddleware.js";
const PromocodeRouter = Router();

 

PromocodeRouter.get("/promocode", async (req, res) => {
  const data = await Promocode.find();
  return res.json({data, message: "Промокоды успешно получены"});
});

PromocodeRouter.post("/promocode", AuthMiddleware(["DATABASE_ADMIN"], {}), async (req, res) => {
  const { name, promocode, description, discount, image } = req.body;
  const data = await Promocode.create({
    name, promocode, description, discount, image: ImageUrl + image
  });
  return res.json({data, message: "Промокод успешно создан"});
});

PromocodeRouter.delete("/promocode", AuthMiddleware(["DATABASE_ADMIN"], {}), async (req, res) => {
  const data = await Promocode.findOneAndDelete().where({
    _id: req.body._id,
  });
    FileController.deleteFile(data.image);
    return res.json({data, message: "Промокод успешно удалён"});
});

PromocodeRouter.put("/promocode", AuthMiddleware(["DATABASE_ADMIN"], {}), async (req, res) => {
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
  return res.json({data, message: "Промокод успешно обновлён"});
});

export default PromocodeRouter;
