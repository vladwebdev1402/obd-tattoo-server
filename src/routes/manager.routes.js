import Manager from "../model/ManagerModel.js";
import { Router } from "express";

const ManagerRouter = Router();

ManagerRouter.get("/manager", async (req, res) => {
  const data = await Manager.find();
  res.json(data);
});

ManagerRouter.post("/manager", async (req, res) => {
  const { name, surname, patroname, mail, phone, viber, telegram, whatsapp } =
    req.body;
  const data = await Manager.create({
    name,
    surname,
    patroname,
    mail,
    phone,
    viber,
    telegram,
    whatsapp,
  });
  res.json(data);
});

ManagerRouter.delete("/manager", async (req, res) => {
  const data = await Manager.deleteOne().where({
    _id: req.body._id,
  });
  res.json(data);
});

ManagerRouter.put("/manager", async (req, res) => {
    const { name, surname, patroname, mail, phone, viber, telegram, whatsapp } =
    req.body;
  const data = await Manager.updateOne(
    {
      _id: req.body._id,
    },
    {
      $set: {
        name,
        surname,
        patroname,
        mail,
        phone,
        viber,
        telegram,
        whatsapp,
      },
    }
  );
  res.json(data);
});

export default ManagerRouter;
