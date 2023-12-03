import mongoose from "mongoose";
const { Schema, model } = mongoose;

const PromocodeSchema = new Schema({
    name: {type: String, required: true},
    promocode: {type: String, required: true},
    description: {type: String, required: true},
    discount: {type: Number, required: true},
    image: {type: String, required: true},
})

const Promocode = model("Promocode", PromocodeSchema);
export default Promocode;
