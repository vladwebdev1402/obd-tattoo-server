import mongoose from "mongoose";
const {Schema, model} = mongoose;

const OrderSchema = new Schema({
    date: {type: Date, required: true},
    number: {type: Number, required: true},
    basket: [
        { item: { type: Schema.Types.ObjectId, ref: "Item" }, 
        count: Number },
      ],
    
    client: { type: Schema.Types.ObjectId, ref: "Client", required: true },
    service: { type: Schema.Types.ObjectId, ref: "Service" },
    payment: { type: Schema.Types.ObjectId, ref: "Payment", required: true },
    delivery: { type: Schema.Types.ObjectId, ref: "Delivery", required: true },
    promocode: { type: Schema.Types.ObjectId, ref: "Promocode" },
    status: { type: Schema.Types.ObjectId, ref: "Status", required: true },
    
})

const Order = model("Order", OrderSchema);
export default Order;