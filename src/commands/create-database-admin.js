import Client from "../model/ClientModel.js";
import bcrypt from "bcrypt"
import mongoose from "mongoose";
import { URI } from "../../constants.js";

const login = "jfsjdsdfsijkodsaodso";
const password = "89=xawr9w3nacieosfn;{qweqwe}";
const role = "DATABASE_ADMIN";

try {

    await mongoose.connect(URI);
    const oldAdmin = await Client.findOne({
        role
    })
    
    if (oldAdmin) {
        console.log("Администратор базы данных уже существует");
    }
    
    else {
        const salt = bcrypt.genSaltSync(7);
        const hashPassword = bcrypt.hashSync(password, salt);

        const admin = await Client.create({
            role,
            login,
            password: hashPassword
        })
    
        console.log("Администратор успешно создан");
        console.log(admin);
    }

    await mongoose.disconnect();
} catch (err) {
    console.log("При создании произошла ошибка");
    console.log(err.message)
    await mongoose.disconnect();
}