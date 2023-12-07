import { Router } from "express";
import Client from "../../model/ClientModel.js";
import Item from "../../model/ItemModel.js";
import { AuthMiddleware } from "../../middleware/AuthMiddleware.js";
const BasketRouter = Router();

BasketRouter.get("/basket", AuthMiddleware(["DATABASE_ADMIN", "CLIENT"], []), async (req, res) => {
  const data = await Client.find({
    _id: req.query.id,
  }).select("basket");
  return res.json({data, message: "Корзина получена"});
});

BasketRouter.post("/basket", AuthMiddleware(["DATABASE_ADMIN", "CLIENT"], {}), async (req, res) => {
  const { client, item, count } = req.body;
  const shopItem = await Item.find({_id: item}).then(res => res[0]);
  if (count > 0 && shopItem !== undefined && count <= shopItem.count) {
    const data = await Client.findOneAndUpdate(
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
      return res.json({data, message: 'Товары добавлены'});
  }
  else if (count == 0) {
    const data = await Client.updateOne({
        _id: client
    }, {$pull: {
        basket: {
            item
        }
    }})
    return res.json({data, message: 'Товары удалён'});
  }
  else return res.json({data: {}, message: "Такое количество товаров отсутствует на складе"});
});

export default BasketRouter;
