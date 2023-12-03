import { Router } from "express";
import Category from "../model/CategoryModel.js"
const CategoryRouter = Router();

CategoryRouter.get("/category", async (req, res) => {
    const data = await Category.find();
    res.json(data);
})

CategoryRouter.post("/category", async (req, res) => {
    const data = await Category.create(
        {
            name: req.body.name
        }
    );
    res.json(data);
})

CategoryRouter.delete("/category", async (req, res) => {
    const data = await Category.deleteOne().where(
        {
            _id: req.body._id
        }
    );
    res.json(data);
})

CategoryRouter.put("/category", async (req, res) => {
    const data = await Category.updateOne(
        {
            _id: req.body._id
        },
        {$set: {
            name: req.body.name
        }}
    );
    res.json(data);
})




export default CategoryRouter;