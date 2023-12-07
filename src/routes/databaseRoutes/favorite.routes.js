import { Router } from "express";
import Client from "../../model/ClientModel.js"
import { AuthMiddleware } from "../../middleware/AuthMiddleware.js";
const FavoriteRouter = Router();

FavoriteRouter.get("/favorite", AuthMiddleware(["DATABASE_ADMIN", "CLIENT"], []), async (req, res) => {
    const data = await Client.find({
        _id: req.query.id
    });
    return res.json({data, message: "Избранные товары успешно получены"});
})

FavoriteRouter.post("/favorite", AuthMiddleware(["DATABASE_ADMIN", "CLIENT"], {}), async (req, res) => {
    const {client, item} = req.body
    const data = await Client.findOneAndUpdate(
        { 
            _id: client
         }, {$push: {favorites: item}}
    );
    return res.json({data, message: "Избранный товар успешно добавлен"});
})

FavoriteRouter.delete("/favorite", AuthMiddleware(["DATABASE_ADMIN", "CLIENT"], {}), async (req, res) => {
    const {client, item} = req.body
    const data = await Client.findOneAndDelete(
        {
            _id: client
        },
        {$pull: {
            favorites: item
        }}
    );
    return res.json({data, message: "Избранный товар успешно удалён"});
})


export default FavoriteRouter;