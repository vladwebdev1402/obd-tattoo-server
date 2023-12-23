import { Router } from "express";
import Category from "../../model/CategoryModel.js"
import { AuthMiddleware } from "../../middleware/AuthMiddleware.js";
const CategoryRouter = Router();

CategoryRouter.get("/category", async (req, res) => {
    const data = await Category.find();
    return res.json({data, message: "Категории получены"});
})

CategoryRouter.post("/category", AuthMiddleware(["DATABASE_ADMIN"], {}), async (req, res) => {
    const data = await Category.create(
        {
            name: req.body.name
        }
    );
    return res.json({data, message: "Категория успешно создана"});
})

CategoryRouter.delete("/category", AuthMiddleware(["DATABASE_ADMIN"], {}), async (req, res) => {
    const data = await Category.findOneAndDelete().where(
        {
            _id: req.body._id
        }
    );
    return res.json({data, message: "Категория успешно удалена"});
})

CategoryRouter.put("/category", AuthMiddleware(["DATABASE_ADMIN"], {}), async (req, res) => {
    await Category.updateOne(
        {
            _id: req.body._id
        },
        {$set: {
            name: req.body.name
        }}
    );
  const data = await Category.findOne({_id: req.body._id,})
  return res.json({data, message: "Категория успешно обновлена"});
})




export default CategoryRouter;