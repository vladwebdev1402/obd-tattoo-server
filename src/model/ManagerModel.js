import mongoose from "mongoose";
const {Schema, model} = mongoose;

const ManagerSchema = new Schema({
    name: {type: String, default: ""},
    surname: {type: String, default: ""},
    patroname: {type: String, default: ""},
    mail: {type: String,  default: ""},
    phone: {type: String,  default: ""},
    viber: {type: String,  default: ""},
    telegram: {type: String, default: ""},
    whatsapp: {type: String, default: ""},
    login: {type: String, required: true},
    password: {type: String, required: true},
    image: {type: String,  default: ""},
    clients: [
        {type: Schema.Types.ObjectId, ref: "Client"}
    ]
})

const Manager = model("Manager", ManagerSchema);
export default Manager;