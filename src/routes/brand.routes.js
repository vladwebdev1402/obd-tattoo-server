import { Router } from "express";
import Brand from "../model/BrandModel.js";
import { ImageUrl } from "./ImageUrl.js";
import { FileController } from "../controllers/FileController.js";

const BrandRouter = Router();
BrandRouter.get("/brand", async (req, res) => {
    const data = await Brand.find();
    res.json(data);
})

BrandRouter.post("/brand", async (req, res) => {
    const { name, image } = req.body;
    const data = await Brand.create(
        {
            name, image: ImageUrl + image
        }
    );
    res.json(data);
})

BrandRouter.delete("/brand", async (req, res) => {
    const data = await Brand.findOneAndDelete().where(
        {
            _id: req.body._id
        }
    );
    FileController.deleteFile(data.image);
    res.json(data);
})

BrandRouter.put("/brand",  async (req, res) => {
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
    FileController.deleteFile(oldData.image);
    res.json(data);
})


export default BrandRouter;