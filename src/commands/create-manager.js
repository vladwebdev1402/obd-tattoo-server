import Manager from "../model/ManagerModel.js";
import bcrypt from "bcrypt"
import mongoose from "mongoose";
import { URI } from "../../constants.js";

const login = randomString(10);
const password = randomString(10);
const role = "MANAGER";

try {

    await mongoose.connect(URI);
    
    const salt = bcrypt.genSaltSync(7);
    const hashPassword = bcrypt.hashSync(password, salt);

    const manager = await Manager.create({
        role,
        login,
        password: hashPassword,
        
    })
    
    console.log("Менеджер успешно создан");
    console.log("Логин: ", login);
    console.log("Пароль: ", password);

    await mongoose.disconnect();
} catch (err) {
    console.log("При создании менеджера произошла ошибка");
    console.log(err.message)
    await mongoose.disconnect();
}

function randomString(i) {
    var rnd = '';
    while (rnd.length < i) 
        rnd += Math.random().toString(36).substring(2);
    return rnd.substring(0, i);
};