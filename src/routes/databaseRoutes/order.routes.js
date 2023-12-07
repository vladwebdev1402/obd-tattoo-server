import Order from "../../model/OrderModel.js";
import { Router } from "express";

const OrderRouter = Router();

OrderRouter.get("/order", async (req, res) => {
  const data = await Order.find();
  res.json(data);
});


OrderRouter.get("/order/client", async (req, res) => {
  const data = await Order.find({client: req.query.client});
  res.json(data);
});

OrderRouter.post("/order", async (req, res) => {
  const date = new Date();

  const number = getUniqueNumber();
  const { basket, client, service, payment, delivery, promocode } = req.body;
  const data = await Order.create({
    date,
    number, 
    basket,
    client,
    service,
    payment,
    delivery,
    promocode,
    status: "655f6146a4d2868df197b7be",
  });
  res.json(data);
});

OrderRouter.delete("/order", async (req, res) => {
  const data = await Order.deleteOne().where({
    _id: req.body._id,
  });
  res.json(data);
});

OrderRouter.put("/order", async (req, res) => {
  const { basket, client, service, payment, delivery, promocode, status } =
    req.body;
  const data = await Order.updateOne(
    {
      _id: req.body._id,
    },
    {
      $set: {
        basket,
        client,
        service,
        payment,
        delivery,
        promocode,
        status,
      },
    }
  );
  res.json(data);
});

export default OrderRouter;

function getUniqueNumber() {
  let number = "";
  number += Math.round(Math.random() * 999);
  number += Math.round(Math.random() * 999);
  number += new Date().getTime().toString().slice(-2);
  return number
}