import mongoose from "mongoose";
const {Schema, model} = mongoose;

const CitySchema = new Schema({
    name: {type: String, required: true}
})
const City = model("City", CitySchema);
export default City;
