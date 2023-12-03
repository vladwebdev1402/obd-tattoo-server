import { Router } from "express";
import Payment from "../model/PaymentModel.js";
const PaymentRouter = Router();

PaymentRouter.get("/payment", async (req, res) => {
  const data = await Payment.find();
  res.json(data);
});

PaymentRouter.post("/payment", async (req, res) => {
  const { name, promt } = req.body;
  const data = await Payment.create({
    name,
    promt,
  });
  res.json(data);
});

PaymentRouter.delete("/payment", async (req, res) => {
  const data = await Payment.deleteOne().where({
    _id: req.body._id,
  });
  res.json(data);
});

PaymentRouter.put("/payment", async (req, res) => {
  const { name, promt } = req.body;
  const data = await Payment.updateOne(
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
  res.json(data);
});

export default PaymentRouter;
