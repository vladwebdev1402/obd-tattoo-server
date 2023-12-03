import mongoose from "mongoose";
const {Schema, model} = mongoose;

const Marcerchema = new Schema({
    name: String
})

const Marcer = model("Marcer", Marcerchema);
export default Marcer;