import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import EntrypointRoutes from "./routes/databaseRoutes/entrypoint.routes.js";
import AuthRouter from "./routes/auth/auth.routes.js";
import { URI } from "../constants.js";
const app = express();
app.use(express.json());
app.use(cors());
const PORT = 3050;
const main = async () => {
    try {
        await mongoose.connect(URI);
        app.use("/", EntrypointRoutes)
        app.use("/auth", AuthRouter)

        app.get("/", async (req, res) => {
            res.json("Server start on port " + PORT);
        })
        
        app.listen(PORT, async () => {
            console.log("Server start on port " + PORT);
        })
    } catch(e) {
        mongoose.disconnect();
        console.log(e);
        
    }
}

main()


