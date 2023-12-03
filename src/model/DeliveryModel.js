import mongoose from "mongoose";
const { Schema, model } = mongoose;

const DeliverySchema = new Schema({
    name: {type: String, required: true},
    promt: {type: String, required: true}
})

const Delivery = model("Delivery", DeliverySchema);
export default Delivery;
