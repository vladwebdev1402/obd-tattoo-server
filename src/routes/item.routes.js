import { Router } from "express";
import Item from "../model/ItemModel.js";
import { FileController } from "../controllers/FileController.js";
import { ImageUrl } from "./ImageUrl.js";
const ItemRouter = Router();

ItemRouter.get("/item", async (req, res) => {
    
    const data = await Item.find();
    res.json(data);
})

ItemRouter.post("/item", async (req, res) => {
    const {name, description, price, oldPrice, image, count, category, brand, marcers} = req.body;
    const data = await Item.create(
        {
            name, description, price, oldPrice, count, category, brand, image: ImageUrl + image,
            marcers: {
                no: marcers.no ?? false,
                new: marcers.new ?? false,
                promotion: marcers.promotion ?? false,
                discount: marcers.discount ?? false,
                hot: marcers.hot ?? false,
            }
        }
    );
    res.json(data);
})


ItemRouter.delete("/item", async (req, res) => {
    const data = await Item.findOneAndDelete().where(
        {
            _id: req.body._id
        }
    );
    FileController.deleteFile(data.image);
    res.json(data);
})

ItemRouter.put("/item", async (req, res) => {
    const {_id, name, description, price, oldPrice, image, count, category, brand, marcers} = req.body;

    const oldData = await Item.findOneAndDelete(
        {
            _id: _id
        },
        {$set: {
            name, description, price, oldPrice, image: ImageUrl + image, count, category, brand, marcers
        }}
    );
    const data = await Item.findOne({_id: req.body._id});
    if (data.image !== oldData.image) FileController.deleteFile(oldData.image);
    res.json(data);
})





export default ItemRouter;