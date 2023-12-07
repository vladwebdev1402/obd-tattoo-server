import { Router } from "express";
import Review from "../../model/ReviewModel.js";
import { AuthMiddleware } from "../../middleware/AuthMiddleware.js";
const ReviewRouter = Router();

ReviewRouter.get("/review", async (req, res) => {
  const data = await Review.find();
  return res.json({data, message: "Отзывы успешно получены"});
});

ReviewRouter.post("/review", AuthMiddleware(["DATABASE_ADMIN", "CLIENT"], {}), async (req, res) => {
  const { client, description } = req.body;
  const data = await Review.create({
    client,
    description,
  });
  return res.json({data, message: "Отзыв успешно создан"});
});

ReviewRouter.delete("/review", AuthMiddleware(["DATABASE_ADMIN", "CLIENT"], {}), async (req, res) => {
  const data = await Review.findOneAndDelete().where({
    _id: req.body._id,
  });
  return res.json({data, message: "Отзыв успешно удалён"});
});

ReviewRouter.put("/review", AuthMiddleware(["DATABASE_ADMIN", "CLIENT"], {}), async (req, res) => {
  const { client, description } = req.body;
  const data = await Review.findOneAndUpdate(
    {
      _id: req.body._id,
    },
    {
      $set: {
        client,
        description,
      },
    }
  );
  return res.json({data, message: "Отзыв успешно отредактирован"});
});

export default ReviewRouter;
