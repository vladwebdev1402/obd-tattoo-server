import { AuthMiddleware } from "../../middleware/AuthMiddleware.js";
import Manager from "../../model/ManagerModel.js";
import { Router } from "express";

const ManagerRouter = Router();

ManagerRouter.get("/manager", async (req, res) => {
  const data = await Manager.find();
  return res.json({data, message: "Менеджеры успешно получены"});
});

ManagerRouter.post("/manager", AuthMiddleware(["DATABASE_ADMIN"], {}), async (req, res) => {
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
  return res.json({data, message: "Менеджер успешно создан"});
});

ManagerRouter.delete("/manager", AuthMiddleware(["DATABASE_ADMIN"], {}), async (req, res) => {
  const data = await Manager.findOneAndDelete().where({
    _id: req.body._id,
  });
  return res.json({data, message: "Менеджер успешно удалён"});
});

ManagerRouter.put("/manager", AuthMiddleware(["DATABASE_ADMIN"], {}), async (req, res) => {
    const { name, surname, patroname, mail, phone, viber, telegram, whatsapp } =
    req.body;
  const data = await Manager.findOneAndUpdate(
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
  return res.json({data, message: "Менеджер успешно обновлён"});
});

export default ManagerRouter;
