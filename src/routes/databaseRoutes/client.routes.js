import { Router } from "express";
import Client from "../../model/ClientModel.js";
import { AuthMiddleware } from "../../middleware/AuthMiddleware.js";
const ClientRouter = Router();

ClientRouter.get("/client", AuthMiddleware(["DATABASE_ADMIN"], []), async (req, res) => {
    const data = await Client.find();
    return res.json({data, message: "Пользователи успешно получены"});
})

ClientRouter.post("/client", AuthMiddleware(["DATABASE_ADMIN"], {}), async (req, res) => {
    const {name, surname, patronname, phone, mail, 
        apartament, entrance, floo, intercom, city, street} = req.body
    const data = await Client.create(
        { name, surname, patronname, phone, mail, 
            apartament, entrance, floo, intercom, city, street }
    );
    return res.json({data, message: "Пользователь успешно создан"});

})

ClientRouter.delete("/client", AuthMiddleware(["DATABASE_ADMIN"], {}), async (req, res) => {
    const data = await Client.findOneAndDelete().where(
        {
            _id: req.body._id
        }
    );
    return res.json({data, message: "Пользователь успешно удалён"});

})

ClientRouter.put("/client", AuthMiddleware(["DATABASE_ADMIN", "CLIENT"], {}), async (req, res) => {
    const {_id, name, surname, patronname, phone, mail, 
        apartament, entrance, floo, intercom, city, street} = req.body
    const data = await Client.updateOne(
        {
            _id: _id
        },
        {$set: {
            name, surname, patronname, phone, mail, 
        apartament, entrance, floo, intercom, city, street
        }}
    );
    return res.json({data, message: "Личный кабинет успешно отредактирован"});
})




export default ClientRouter;