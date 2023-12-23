import { Router } from "express";
import Payment from "../../model/PaymentModel.js";
import { AuthMiddleware } from "../../middleware/AuthMiddleware.js";
const PaymentRouter = Router();

PaymentRouter.get("/payment", AuthMiddleware(["DATABASE_ADMIN", "CLIENT"], []), async (req, res) => {
  const data = await Payment.find();
  return res.json({data, message: "Категории оплаты успешно получены"});
});

PaymentRouter.post("/payment", AuthMiddleware(["DATABASE_ADMIN"], {}), async (req, res) => {
  const { name, promt } = req.body;
  const data = await Payment.create({
    name,
    promt,
  });
  return res.json({data, message: "Категория оплаты успешно создана"});
});

PaymentRouter.delete("/payment", AuthMiddleware(["DATABASE_ADMIN"], {}), async (req, res) => {
  const data = await Payment.findOneAndDelete().where({
    _id: req.body._id,
  });
  return res.json({data, message: "Категория оплаты успешно удалена"});
});

PaymentRouter.put("/payment", AuthMiddleware(["DATABASE_ADMIN"], {}), async (req, res) => {
  const { name, promt } = req.body;
  await Payment.updateOne(
    {
      _id: req.body._id,
    },
    {
      $set: {
        name,
        promt,
      },
    }
  );
  const data = await Payment.findOne({_id: req.body._id,})
  return res.json({data, message: "Категория оплаты успешно обновлена"});
});

export default PaymentRouter;
