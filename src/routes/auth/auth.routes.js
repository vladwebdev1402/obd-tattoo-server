import { Router } from "express";
import Client from "../../model/ClientModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
import { SECRET_KEY } from "../../../constants.js";
const AuthRouter = Router();

const generateToken = (_id, role) => {
    const token = jwt.sign({_id, role}, SECRET_KEY, {expiresIn: "72h"});
    return token;
}
AuthRouter.post("/signup", [
    check("login", "Поле логин не может быть пустым").notEmpty(),
    check("password", "Поле пароль не может быть пустым").notEmpty(),
    check("password", "Пароль должен быть не короче 10-ти символов").isLength({min: 10, max: 100}),
    check("login", "Логин должен быть не короче 6-ти символов").isLength({min: 6, max: 100})
],async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({message: "Ошибка регистрации", successfully: false, errors })
    try {
        const {login, password} = req.body;
        const client = await Client.findOne({login});

    if (client) return res.status(401).json({message: "Пользователь с таким логином уже сущестувует", successfully: false});
    
    const salt = bcrypt.genSaltSync(7);
    const hashPassword = bcrypt.hashSync(password, salt);
     
    const newClient = await Client.create({login, password: hashPassword});
    
    return res.status(200).json({message: "Пользователь успешно зарегистрирован", successfully: true})

    } catch (err) {
        console.log(err)
        return res.status(400).json({message: "Ошибка регистрации", err, successfully: false})
    }
})

AuthRouter.post("/login", async (req, res) => {
    try {
        const {login, password} = req.body;

        const client = await Client.findOne({login});
        if (!client) return res.status(401).json({message: "Пользователь с таким логином не обнаружен", successfully: false});
        const hashPassword = client.password;
        if (bcrypt.compareSync(password, hashPassword)) {
            const token = generateToken(client._id, client.role);
            return res.status(200).json({message: "Пользователь успешно авторизирован", token, successfully: true});
        } else return res.status(401).json({message: "Пароли не совпадают", successfully: false});

    } catch (err) {
        return res.status(400).json({message: "Ошибка авторизации", successfully: false})
    }

})
export default AuthRouter;