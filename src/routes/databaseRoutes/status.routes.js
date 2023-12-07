import { Router } from "express";
import Status from "../../model/StatusModel.js"
const StatusRouter = Router();

StatusRouter.get("/status", async (req, res) => {
    const data = await Status.find();
    res.json(data);
})

StatusRouter.post("/status", async (req, res) => {
    const {name} = req.body;
    const data = await Status.create(
        {
            name
        }
    );
    res.json(data);
})

StatusRouter.delete("/status", async (req, res) => {
    const data = await Status.deleteOne().where(
        {
            _id: req.body._id
        }
    );
    res.json(data);
})

StatusRouter.put("/status", async (req, res) => {
    const data = await Status.updateOne(
        {
            _id: req.body._id
        },
        {$set: {
            name: req.body.name
        }}
    );
    res.json(data);
})




export default StatusRouter;