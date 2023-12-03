import mongoose from "mongoose";
const { Schema, model } = mongoose;

const PaymentSchema = new Schema({
    name: {type: String, required: true},
    promt: {type: String, required: true}
})

const Payment = model("Payment", PaymentSchema);
export default Payment;
