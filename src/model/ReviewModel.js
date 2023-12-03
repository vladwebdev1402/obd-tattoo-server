import mongoose from "mongoose";
const {Schema, model} = mongoose;

const ReviewSchema = new Schema({
    description: {type: String, required: true},
    client: {type: Schema.Types.ObjectId, ref: "Client", required: true}
})
const Review = model("Review", ReviewSchema);
export default Review;
