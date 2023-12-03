import mongoose from "mongoose";
const { Schema, model } = mongoose;

const StatusSchema = new Schema({
    name: {type: String, required: true}
})

const Status = model("Status", StatusSchema);
export default Status;
