import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ServiceSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: {
    required: true,
    type: {
      coin: Number,
      interest: Number,
    },
  },
  image: {type: String, required: true},
});

const Service = model("Service", ServiceSchema);
export default Service;
