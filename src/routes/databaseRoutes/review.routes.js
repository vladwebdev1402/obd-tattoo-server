import { Router } from "express";
import Review from "../../model/ReviewModel.js";
const ReviewRouter = Router();

ReviewRouter.get("/review", async (req, res) => {
  const data = await Review.find();
  res.json(data);
});

ReviewRouter.post("/review", async (req, res) => {
  const { client, description } = req.body;
  const data = await Review.create({
    client,
    description,
  });
  res.json(data);
});

ReviewRouter.delete("/review", async (req, res) => {
  const data = await Review.deleteOne().where({
    _id: req.body._id,
  });
  res.json(data);
});

ReviewRouter.put("/review", async (req, res) => {
  const { client, description } = req.body;
  const data = await Review.updateOne(
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
  res.json(data);
});

export default ReviewRouter;
