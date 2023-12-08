import { Router } from "express";
import Item from "../../model/ItemModel.js";
import { FileController } from "../../controllers/FileController.js";
import { ImageUrl } from "./ImageUrl.js";
import { AuthMiddleware } from "../../middleware/AuthMiddleware.js";
import { ItemFiltersMiddleware } from "../../middleware/ItemFiltersMiddleware.js";
const ItemRouter = Router();

ItemRouter.get("/item", ItemFiltersMiddleware, async (req, res) => {
  try {
    const mongoFilter = req.filters.mongoFilter; 
    const limit = req.filters.limit; 
   
    const data = await Item.find(mongoFilter).limit(limit);

    return res.json({data, message: "Товары успешно получены"})
  }
  catch (err) {
    console.log(err.message);
    return res.json({data: [], message: "Ошибка на сервере при получении товаров"});
  }
;
});

ItemRouter.post("/item", AuthMiddleware(["DATABASE_ADMIN"], {}), async (req, res) => {
  const {
    name,
    description,
    price,
    oldPrice,
    image,
    count,
    category,
    brand,
    marcers,
  } = req.body;
  const data = await Item.create({
    name,
    description,
    price,
    oldPrice,
    count,
    category,
    brand,
    image: ImageUrl + image,
    marcers: {
      no: count === 0 || false,
      new: marcers.new ?? false,
      promotion: marcers.promotion ?? false,
      discount: oldPrice !== 0 || false,
      hot: marcers.hot ?? false,
    },
  });
  return res.json({data, message: "Товар успешно создан"});
});

ItemRouter.delete("/item", AuthMiddleware(["DATABASE_ADMIN"], {}), async (req, res) => {
  const data = await Item.findOneAndDelete().where({
    _id: req.body._id,
  });
  FileController.deleteFile(data.image);
  return res.json({data, message: "Товар успешно удалён"});
});

ItemRouter.put("/item", AuthMiddleware(["DATABASE_ADMIN"], {}), async (req, res) => {
  const {
    _id,
    name,
    description,
    price,
    oldPrice,
    image,
    count,
    category,
    brand,
    marcers,
  } = req.body;

  const oldData = await Item.findOneAndUpdate(
    {
      _id: _id,
    },
    {
      $set: {
        name,
        description,
        price,
        oldPrice,
        image: ImageUrl + image,
        count,
        category,
        brand,
        marcers: {
          no: count === 0 || false,
          new: marcers.new ?? false,
          promotion: marcers.promotion ?? false,
          discount: oldPrice !== 0 || false,
          hot: marcers.hot ?? false,
        },
      },
    }
  );
  const data = await Item.findOne({ _id: req.body._id });
  if (data.image !== oldData.image) FileController.deleteFile(oldData.image);
  return res.json({data, message: "Товар успешно обновлён"});
});

export default ItemRouter;
