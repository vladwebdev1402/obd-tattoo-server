import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ClientSchema = new Schema({
  name: String,
  surname: String,
  patroname: String,
  phone: String,
  mail: String,
  apartament: Number,
  entrance: Number,
  floor: Number,
  intercom: Number,

  city: { type: Schema.Types.ObjectId, ref: "City" },
  street: { type: Schema.Types.ObjectId, ref: "Street" },
  basket: [
    { item: { type: Schema.Types.ObjectId, ref: "Item" }, 
    count: Number },
  ],
  favorites: [{ type: Schema.Types.ObjectId, ref: "Item" }],
});

const Client = model("Client", ClientSchema);
export default Client;
