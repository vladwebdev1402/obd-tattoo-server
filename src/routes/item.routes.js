import { Router } from "express";
import Item from "../model/ItemModel.js";
const ItemRouter = Router();

ItemRouter.get("/item", async (req, res) => {
    const data = await Item.find().populate("brand", "name").populate("category", ["name"]);
    res.json(data);
})

ItemRouter.post("/item", async (req, res) => {
    const {name, description, price, oldPrice, image, count, category, brand, marcers} = req.body;
    const data = await Item.create(
        {
            name, description, price, oldPrice, image, count, category, brand,
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
    const data = await Item.deleteOne().where(
        {
            _id: req.body._id
        }
    );
    res.json(data);
})

ItemRouter.put("/item", async (req, res) => {
    const {_id, name, description, price, oldPrice, image, count, category, brand, marcers} = req.body;

    const data = await Item.updateOne(
        {
            _id: _id
        },
        {$set: {
            name, description, price, oldPrice, image, count, category, brand, marcers
        }}
    );
    res.json(data);
})





export default ItemRouter;