import { Router } from "express";
import Service from "../model/ServiceModel.js"
const ServiceRouter = Router();

ServiceRouter.get("/service", async (req, res) => {
    const data = await Service.find();
    res.json(data);
})

ServiceRouter.post("/service", async (req, res) => {
    const {name, description, price, image} = req.body;
    const data = await Service.create(
        {
            name,
            description,
            image,
            price
        }
    );
    res.json(data);
})

ServiceRouter.delete("/service", async (req, res) => {
    const data = await Service.deleteOne().where(
        {
            _id: req.body._id
        }
    );
    res.json(data);
})

ServiceRouter.put("/service", async (req, res) => {
    const {name, description, price, image} = req.body
    const data = await Service.updateOne(
        {
            _id: req.body._id
        },
        {$set: {
            name,
            description,
            image,
            price
        }}
    );
    res.json(data);
})




export default ServiceRouter;