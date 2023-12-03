import mongoose from "mongoose";
const {Schema, model} = mongoose;

const ManagerSchema = new Schema({
    name: {type: String, required: true},
    surname: {type: String, required: true},
    patroname: {type: String, required: true},
    mail: {type: String, required: true},
    phone: {type: String, required: true},
    viber: {type: String, required: true},
    telegram: {type: String, required: true},
    whatsapp: {type: String, required: true},

    clients: [
        {type: Schema.Types.ObjectId, ref: "Client"}
    ]
})

const Manager = model("Manager", ManagerSchema);
export default Manager;