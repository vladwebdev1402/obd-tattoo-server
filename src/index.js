import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import EndpointRoutes from "./routes/endpoint.routes.js";
const app = express();
app.use(express.json());
app.use(cors());
const PORT = 3050;
const URI = "mongodb://127.0.0.1:27017/tattoo"
const main = async () => {
    try {
        await mongoose.connect(URI);
        app.use("/", EndpointRoutes)

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


