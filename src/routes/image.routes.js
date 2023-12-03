import { Router } from "express";
import fs from "fs"
import path from 'path';
import { fileURLToPath } from 'url';
const ImageRouter = Router();

ImageRouter.get("/image/:imagename", (req, res) => {
    const imagename = req.params.imagename;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    res.download(__dirname + "../../../images/" + imagename);
})


export default ImageRouter;