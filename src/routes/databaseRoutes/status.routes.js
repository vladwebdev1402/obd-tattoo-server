import { Router } from "express";
import Status from "../../model/StatusModel.js"
import { AuthMiddleware } from "../../middleware/AuthMiddleware.js";
const StatusRouter = Router();

StatusRouter.get("/status", AuthMiddleware(["DATABASE_ADMIN"], []), async (req, res) => {
    const data = await Status.find();
    return res.json({data, message: "Статусы заказа успешно получены"});
})

StatusRouter.post("/status", AuthMiddleware(["DATABASE_ADMIN"], {}), async (req, res) => {
    const {name} = req.body;
    const data = await Status.create(
        {
            name
        }
    );
    return res.json({data, message: "Статус заказа успешно создан"});
})

StatusRouter.delete("/status", AuthMiddleware(["DATABASE_ADMIN"], {}), async (req, res) => {
    const data = await Status.findOneAndDelete().where(
        {
            _id: req.body._id
        }
    );
    return res.json({data, message: "Статусы заказа успешно удалён"});
})

StatusRouter.put("/status", AuthMiddleware(["DATABASE_ADMIN"], {}), async (req, res) => {
    await Status.updateOne(
        {
            _id: req.body._id
        },
        {$set: {
            name: req.body.name
        }}
    );
    const data = await Status.findOne({_id: req.body._id})
    return res.json({data, message: "Статусы заказа успешно обновлён"});
})




export default StatusRouter;