import mongoose from "mongoose";
const { Schema, model } = mongoose;

const OrderSchema = new Schema({
  date: { type: Date, required: true },
  number: { type: Number, required: true },
  basket: {
    type: [
      { item: { type: Schema.Types.ObjectId, ref: "Item" }, count: Number },
    ],
    default: [],
    required: true,
  },
  allPrice: { type: Number, required: true },
  countItems: { type: Number, required: true},
  contacts: {
    type: {
      name: { type: String, default: "", required: true },
      surname: { type: String, default: "", required: true },
      patroname: { type: String, default: "", required: true },
      phone: { type: String, default: "", required: true },
      mail: { type: String, default: "", required: true },
      apartament: { type: Number, default: 0, required: true },
      entrance: { type: Number, default: 0 },
      floor: { type: Number, default: 0 },
      intercom: { type: Number, default: 0 },
      city: { type: Schema.Types.ObjectId, ref: "City" },
      street: { type: Schema.Types.ObjectId, ref: "Street" },
    },
    required: true,
  },
  client: { type: Schema.Types.ObjectId, ref: "Client" },
  service: { type: Schema.Types.ObjectId, ref: "Service" },
  payment: { type: Schema.Types.ObjectId, ref: "Payment", required: true },
  delivery: { type: Schema.Types.ObjectId, ref: "Delivery", required: true },
  promocode: { type: Schema.Types.ObjectId, ref: "Promocode" },
  status: { type: Schema.Types.ObjectId, ref: "Status", required: true },
});

const Order = model("Order", OrderSchema);
export default Order;
