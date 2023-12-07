import { Router } from "express";
import Street from "../../model/StreetModel.js"
import { AuthMiddleware } from "../../middleware/AuthMiddleware.js";
const StreetRouter = Router();

StreetRouter.get("/street", AuthMiddleware(["DATABASE_ADMIN", "CLIENT"], []), async (req, res) => {
    const data = await Street.find();
    return res.json({data, message: "Улицы успешно получены"});
})

StreetRouter.post("/street", AuthMiddleware(["DATABASE_ADMIN"], {}), async (req, res) => {
    const {name, city} = req.body;
    const data = await Street.create(
        {
            name, city
        }
    );
    return res.json({data, message: "Улица успешно создана"});
})

StreetRouter.delete("/street", AuthMiddleware(["DATABASE_ADMIN"], {}), async (req, res) => {
    const data = await Street.deleteOne().where(
        {
            _id: req.body._id
        }
    );
    return res.json({data, message: "Улица успешно удалена"});
})

StreetRouter.put("/street", AuthMiddleware(["DATABASE_ADMIN"], {}), async (req, res) => {
    const {name, city} = req.body;
    const data = await Street.updateOne(
        {
            _id: req.body._id
        },
        {$set: {
            name, city
        }}
    );
    return res.json({data, message: "Улица успешно обновлена"});
})




export default StreetRouter;