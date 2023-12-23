import { Router } from "express";
import City from "../../model/CityModel.js"
import { AuthMiddleware } from "../../middleware/AuthMiddleware.js";
const CityRouter = Router();

CityRouter.get("/city",  AuthMiddleware(["DATABASE_ADMIN", "CLIENT"], []), async (req, res) => {
    const data = await City.find();
    res.json({data, message: "Города успешно получены"});
})

CityRouter.post("/city",  AuthMiddleware(["DATABASE_ADMIN"], {}), async (req, res) => {
    const {name} = req.body;
    const data = await City.create(
        {
            name
        }
    );
    res.json({data, message: "Город успешно создан"});
})

CityRouter.delete("/city",  AuthMiddleware(["DATABASE_ADMIN"], {}), async (req, res) => {
    const data = await City.findOneAndDelete().where(
        {
            _id: req.body._id
        }
    );
    res.json({data, message: "Город успешно удалён"});
})

CityRouter.put("/city",  AuthMiddleware(["DATABASE_ADMIN"], {}), async (req, res) => {
    await City.updateOne(
        {
            _id: req.body._id
        },
        {$set: {
            name: req.body.name
        }}
    );
  const data = await City.findOne({_id: req.body._id,})
  res.json({data, message: "Город успешно отредактирован"});
})




export default CityRouter;