import { Router } from "express";

const AuthRouter = Router();

AuthRouter.post("/signup", (req, res) => {
    try {

    const {login, password} = req.body;
    } catch (err) {
        res.status(400).json({message: "Ошибка регистрации"})
    }


})

export default AuthRouter;