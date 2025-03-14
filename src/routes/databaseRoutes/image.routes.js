import { Router } from "express";
import { FileController } from "../../controllers/FileController.js";
import fs from "fs";
import { AuthMiddleware } from "../../middleware/AuthMiddleware.js";
const upload = FileController.getMulterUpload();

const ImageRouter = Router();

ImageRouter.get("/image/:imagename", (req, res) => {
  const imagename = req.params.imagename;
  const filePath = FileController.getRootDirname() + "/images/";
  if (fs.existsSync(filePath + imagename)) {
    res.download(filePath + imagename);
  } else res.download(filePath + "filed.png");
});

ImageRouter.post(
  "/image",
  AuthMiddleware(["DATABASE_ADMIN"], "Ошибка загрузки файла"),
  upload.single("file"),
  (req, res) => {
    const filename = req.file.filename;
    res.json({ filename, message: "Файл успешно создан" });
  }
);

export default ImageRouter;
