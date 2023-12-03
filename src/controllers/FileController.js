import fs from "fs";
import path from 'path';
import { fileURLToPath } from 'url';
import multer from "multer";
import slugify from "slugify";


export class FileController {

    static  getRootDirname = () => {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        return __dirname + "../../../";
    }
    
    static deleteFile = (urlFile) => {
        const filename = urlFile.split("/").at(-1);
        const __dirname = this.getRootDirname() + "/images/" + filename;
        if (fs.existsSync(__dirname)) {
            fs.unlinkSync(__dirname);
        }
    }

    static getMulterUpload = () => {
        const storage = multer.diskStorage({
            destination: function(req, file, cb) {
              cb(null, 'images/');
            },
            filename: function(req, file, cb) {
                const origName = file.originalname;
                const slugName = slugify(origName, { lower: true });
              cb(null, Date.now() + "-" + slugName);
            }
        });

        const upload = multer({ storage: storage });
        return upload;
    }
}
