import { Router } from "express";
import Client from "../../model/ClientModel.js";
import Item from "../../model/ItemModel.js";
import { AuthMiddleware } from "../../middleware/AuthMiddleware.js";
const BasketRouter = Router();

BasketRouter.get("/basket", AuthMiddleware(["DATABASE_ADMIN", "CLIENT"], []), async (req, res) => {
  const data = await Client.find({
    _id: req.user_id,
  }).select(["basket", "-_id"]);
  return res.json({data: data[0].basket, message: "Корзина получена"});
});

BasketRouter.post("/basket", AuthMiddleware(["DATABASE_ADMIN", "CLIENT"], {}), async (req, res) => {
  const { item, count } = req.body;
  const shopItem = (await Item.find({_id: item}))[0];
  const basket = (await Client.find({_id: req.user_id}))[0].basket;
  const itemInBasket = basket.filter(basketItem => basketItem.item == shopItem._id.toString())[0];

  // если в корзине есть товар и меняется количество товара
  if (count > 0 && shopItem !== undefined && itemInBasket !== undefined && count <= shopItem.count) {
    const newBasket = basket.map(basketItem => {
      if (basketItem.item.toString() == item) return {item, count};
      return basketItem;
    })

    await Client.updateOne({
      _id: req.user_id,
    }, {
      $set: {
        basket: newBasket
      }
    })

    return res.json({data: newBasket, message: 'Товары добавлены'});
  }

  //если в корзине нет товара
  else if (shopItem !== undefined && count !== 0 && itemInBasket === undefined) {
    const newBasket = [...basket, {item, count}];
    await Client.updateOne({
      _id: req.user_id,
    }, {
      $set: {
        basket: newBasket
      }
    })
    return res.json({data: newBasket, message: 'В корзину добавлены новые товары'});
  }

  // если хотим удалить товар
  else if (count <= 0) {
    const newBasket = basket.filter(basketItem => basketItem.item.toString() != item);
    await Client.updateOne({
      _id: req.user_id,
    }, {
      $set: {
        basket: newBasket
      }
    })
    return res.json({data: newBasket, message: 'Товар удалён'});
  }
  else return res.json({data: basket, message: "Такое количество товаров отсутствует на складе"});
});

export default BasketRouter;
