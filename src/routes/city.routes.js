import { Router } from "express";
import City from "../model/CityModel.js"
const CityRouter = Router();

CityRouter.get("/city", async (req, res) => {
    const data = await City.find();
    res.json(data);
})

CityRouter.post("/city", async (req, res) => {
    const {name} = req.body;
    const data = await City.create(
        {
            name
        }
    );
    res.json(data);
})

CityRouter.delete("/city", async (req, res) => {
    const data = await City.deleteOne().where(
        {
            _id: req.body._id
        }
    );
    res.json(data);
})

CityRouter.put("/city", async (req, res) => {
    const data = await City.updateOne(
        {
            _id: req.body._id
        },
        {$set: {
            name: req.body.name
        }}
    );
    res.json(data);
})




export default CityRouter;