import { Router } from "express";
import Brand from "../../model/BrandModel.js";
import { ImageUrl } from "./ImageUrl.js";
import { FileController } from "../../controllers/FileController.js";
import { AuthMiddleware } from "../../middleware/AuthMiddleware.js";

const BrandRouter = Router();
BrandRouter.get("/brand", async (req, res) => {
    const data = await Brand.find();
    return res.json({data, message: "Бренды получены"});
})

BrandRouter.post("/brand", AuthMiddleware(["DATABASE_ADMIN"], {}), async (req, res) => {
    const { name, image } = req.body;
    const data = await Brand.create(
        {
            name, image: ImageUrl + image
        }
    );
    return res.json({data, message: "Бренд успешно создан"});
})

BrandRouter.delete("/brand", AuthMiddleware(["DATABASE_ADMIN"], {}),async (req, res) => {
    const data = await Brand.findOneAndDelete().where(
        {
            _id: req.body._id
        }
    );
    FileController.deleteFile(data.image);
    return res.json({data, message: "Бренд успешно удалён"});
})

BrandRouter.put("/brand", AuthMiddleware(["DATABASE_ADMIN"], {}),  async (req, res) => {
    const {name, image} = req.body;
    const oldData = await Brand.findOneAndUpdate(
        {
            _id: req.body._id
        },
        {$set: {
            name, image: ImageUrl + image
        }}
    );
    const data = await Brand.findOne({_id: req.body._id});
    if (data.image !== oldData.image) FileController.deleteFile(oldData.image);
    return res.json({data, message: "Бренд успешно обновлён"});
})


export default BrandRouter;