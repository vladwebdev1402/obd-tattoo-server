import mongoose from "mongoose";
const {Schema, model} = mongoose;

const ItemSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    oldPrice: {type: Number, required: true},
    image: {type: String, required: true},
    count: {type: Number, required: true},
    marcers: {
        new: Boolean,
        hot: Boolean,
        promotion: Boolean,
        discount: Boolean,
        no: Boolean,
    },
    category: {type: Schema.Types.ObjectId, ref: "Category", required: true},
    brand: {type: Schema.Types.ObjectId, ref: "Brand", required: true},
})

const Item = model("Item", ItemSchema);
export default Item;