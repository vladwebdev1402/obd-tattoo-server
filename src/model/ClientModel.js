import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ClientSchema = new Schema({
  name: {type: String, default: ""},
  surname: {type: String, default: ""},
  patroname: {type: String, default: ""},
  phone: {type: String, default: ""},
  mail: {type: String, default: ""},
  apartament: {type: Number, default: 0},
  entrance: {type: Number, default: 0},
  floor: {type: Number, default: 0},
  intercom: {type: Number, default: 0},
  city: { type: Schema.Types.ObjectId, ref: "City" },
  street: { type: Schema.Types.ObjectId, ref: "Street" },
  
  role: {type: String, required: true, default: 'CLIENT'},
  login: {type: String, required: true},
  password: {type: String, required: true},

  
  basket: [
    { item: { type: Schema.Types.ObjectId, ref: "Item" }, 
    count: Number },
  ],
  favorites: [{ type: Schema.Types.ObjectId, ref: "Item" }],
});

const Client = model("Client", ClientSchema);
export default Client;
