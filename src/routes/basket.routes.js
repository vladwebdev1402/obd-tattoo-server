import { Router } from "express";
import Client from "../model/ClientModel.js";
import Item from "../model/ItemModel.js";
const BasketRouter = Router();

BasketRouter.get("/basket", async (req, res) => {
  const data = await Client.find({
    _id: req.query.id,
  }).select("basket");
  res.json(data);
});

BasketRouter.post("/basket", async (req, res) => {
  const { client, item, count } = req.body;
  const shopItem = await Item.find({_id: item}).then(res => res[0]);
  if (count > 0 && shopItem !== undefined && count <= shopItem.count) {
    const data = await Client.updateOne(
        {
          _id: client,
        },
        {
          $push: {
            basket: {
              item,
              count,
            },
          }
        }
      );
      res.json(data);
  }
  else if (count == 0) {
    const data = await Client.updateOne({
        _id: client
    }, {$pull: {
        basket: {
            item
        }
    }})
    res.json(data);
  }
  else res.json({});
});

export default BasketRouter;
