import mongoose from "mongoose";

const {Schema, model} = mongoose;

const StreetSchema = new Schema({
    name: {type: String, required: true},
    city: {type: Schema.Types.ObjectId, ref: "City", required: true}
})

const Street = model("Street", StreetSchema);
export default Street;