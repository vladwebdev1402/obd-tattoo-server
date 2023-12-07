import mongoose from "mongoose";

const {Schema, model} = mongoose;

const RoleSchema = new Schema({
    value: {type: String, required: true},
})
const Role = model("Role", RoleSchema);
export default Role;