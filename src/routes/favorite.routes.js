import { Router } from "express";
import Client from "../model/ClientModel.js"
const FavoriteRouter = Router();

FavoriteRouter.get("/favorite", async (req, res) => {
    const data = await Client.find({
        _id: req.query.id
    });
    res.json(data);
})

FavoriteRouter.post("/favorite", async (req, res) => {
    const {client, item} = req.body
    const data = await Client.updateOne(
        { 
            _id: client
         }, {$push: {favorites: item}}
    );
    res.json(data);
})

FavoriteRouter.delete("/favorite", async (req, res) => {
    const {client, item} = req.body
    const data = await Client.updateOne(
        {
            _id: client
        },
        {$pull: {
            favorites: item
        }}
    );
    res.json(data);
})


export default FavoriteRouter;