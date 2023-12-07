import { Router } from "express";
import Role from "../../model/RoleModel.js";

const RoleRouter = Router();

RoleRouter.get("/role", async (req, res) => {
    try {
        const data = await Role.find();
        res.json(data);
    } catch (err) {
    
        res.json({message: err.message});
    }

    
})

RoleRouter.post("/role", async (req, res) => {
    try {
        const value = req.body.value;

        const data = await Role.create({
            value
        });
    
        res.json(data);
    } catch (err) {
    
        res.json({message: err.message});
    }
   
})

RoleRouter.put("/role", async (req, res) => {
    try {
        const {_id, value} = req.body;

        const data = await Role.findOneAndUpdate({
            _id
        }, {$set: {value}});
    
        res.json(data);

    } catch (err) {
    
        res.json({message: err.message});
    }
   
})

RoleRouter.delete("/role", async (req, res) => {
    try {
        const {_id } = req.body;

    const data = await Role.findOneAndDelete({
        _id
    });

    res.json(data);

    } catch (err) {
    
        res.json({message: err.message});
    }
    
})

export default RoleRouter;