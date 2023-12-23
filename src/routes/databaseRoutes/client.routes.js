import { Router } from "express";
import Client from "../../model/ClientModel.js";
import { AuthMiddleware } from "../../middleware/AuthMiddleware.js";
const ClientRouter = Router();

ClientRouter.get("/client", AuthMiddleware(["DATABASE_ADMIN", "CLIENT"], []), async (req, res) => {

    const data = await Client.find({_id: req.user_id}, {login: 0, password: 0, role: 0});
    return res.json({data: data[0], message: "Пользователи успешно получены"});
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
    const {_id, name, surname, patroname, phone, mail, 
        apartament, entrance, floor, intercom, city, street} = req.body
    await Client.updateOne(
        {
            _id: _id ?? req.user_id,
          
        },
        {$set: {
            name, surname, patroname, phone, mail, 
        apartament, entrance, floor, intercom, city, street
        }}
    );
    const data = await Client.findOne({_id: _id ?? req.user_id,})
    return res.json({data, message: "Личный кабинет успешно отредактирован"});
})




export default ClientRouter;