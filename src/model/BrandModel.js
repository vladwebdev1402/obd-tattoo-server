import mongoose from "mongoose";
const {Schema, model} = mongoose;

const BrandSchema = new Schema({
    name: {type: String, required: true},
    image: {type: String, required: true}
})

const Brand = model("Brand", BrandSchema);
export default Brand;