import { Router } from "express";
import Street from "../model/StreetModel.js"
const StreetRouter = Router();

StreetRouter.get("/street", async (req, res) => {
    const data = await Street.find();
    res.json(data);
})

StreetRouter.post("/street", async (req, res) => {
    const {name, city} = req.body;
    const data = await Street.create(
        {
            name, city
        }
    );
    res.json(data);
})

StreetRouter.delete("/street", async (req, res) => {
    const data = await Street.deleteOne().where(
        {
            _id: req.body._id
        }
    );
    res.json(data);
})

StreetRouter.put("/street", async (req, res) => {
    const {name, city} = req.body;
    const data = await Street.updateOne(
        {
            _id: req.body._id
        },
        {$set: {
            name, city
        }}
    );
    res.json(data);
})




export default StreetRouter;