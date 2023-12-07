import { Router } from "express";
import Client from "../../model/ClientModel.js";
import { AuthMiddleware } from "../../middleware/AuthMiddleware.js";
const ClientRouter = Router();

ClientRouter.get("/client", AuthMiddleware(["DATABASE_ADMIN"]), async (req, res) => {
    const data = await Client.find();
    res.json(data);
})

ClientRouter.post("/client", async (req, res) => {
    const {name, surname, patronname, phone, mail, 
        apartament, entrance, floo, intercom, city, street} = req.body
    const data = await Client.create(
        { name, surname, patronname, phone, mail, 
            apartament, entrance, floo, intercom, city, street }
    );
    res.json(data);

})

ClientRouter.delete("/client", AuthMiddleware(["DATABASE_ADMIN"]), async (req, res) => {
    const data = await Client.deleteOne().where(
        {
            _id: req.body._id
        }
    );
    res.json(data);
})

ClientRouter.put("/client", async (req, res) => {
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
    res.json(data);
})




export default ClientRouter;