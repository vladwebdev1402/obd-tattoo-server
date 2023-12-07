import { Router } from "express";
import Role from "../../model/RoleModel.js";
import { AuthMiddleware } from "../../middleware/AuthMiddleware.js";

const RoleRouter = Router();

RoleRouter.get("/role", AuthMiddleware(["SUPER_ADMIN"], []), async (req, res) => {
    try {
        const data = await Role.find();
        return res.json({data, message: "Роли успешно получены"});
    } catch (err) {
    
        res.json({message: err.message});
    }

    
})

RoleRouter.post("/role", AuthMiddleware(["SUPER_ADMIN"], {}), async (req, res) => {
    try {
        const value = req.body.value;

        const data = await Role.create({
            value
        });
    
        return res.json({data, message: "Роль успешно создана"});
    } catch (err) {
    
        res.json({message: err.message});
    }
   
})

RoleRouter.put("/role", AuthMiddleware(["SUPER_ADMIN"], {}), async (req, res) => {
    try {
        const {_id, value} = req.body;

        const data = await Role.findOneAndUpdate({
            _id
        }, {$set: {value}});
    
        return res.json({data, message: "Роль успешно обновлена"});

    } catch (err) {
    
        res.json({message: err.message});
    }
   
})

RoleRouter.delete("/role", AuthMiddleware(["SUPER_ADMIN"], {}), async (req, res) => {
    try {
        const {_id } = req.body;

    const data = await Role.findOneAndDelete({
        _id
    });

    return res.json({data, message: "Роль успешно удалена"});

    } catch (err) {
    
        res.json({message: err.message});
    }
    
})

export default RoleRouter;