import { Router } from "express";
import Brand from "../model/BrandModel.js";
import multer from "multer";
import slugify from "slugify";
import { ImageUrl } from "./ImageUrl.js";

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'images/');
    },
    filename: function(req, file, cb) {
        const origName = file.originalname;
        const slugName = slugify(origName, { lower: true });
      cb(null, Date.now() + '-brand-' + slugName);
    }
});

// Initialize upload
const upload = multer({ storage: storage });

const BrandRouter = Router();
BrandRouter.get("/brand", async (req, res) => {
    const data = await Brand.find();
    res.json(data);
})

BrandRouter.post("/brand", async (req, res) => {
    const { name, image } = req.body;
    const data = await Brand.create(
        {
            name, image: ImageUrl + image
        }
    );
    res.json(data);
})

BrandRouter.delete("/brand", async (req, res) => {
    const data = await Brand.deleteOne().where(
        {
            _id: req.body._id
        }
    );
    res.json(data);
})

BrandRouter.put("/brand",  async (req, res) => {
    const {name, image} = req.body;
    await Brand.updateOne(
        {
            _id: req.body._id
        },
        {$set: {
            name, image: ImageUrl + image
        }}
    );
    const data = await Brand.findOne({_id: req.body._id});
    res.json(data);
})

BrandRouter.post("/brand/image", upload.single('file'), async (req, res) => {
    const filename = req.file.filename;
    console.log(filename)
    res.json(filename);
})




export default BrandRouter;