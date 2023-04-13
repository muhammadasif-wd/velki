const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: "img/",
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + "-" + file.originalname);
    },
});

const uploader = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const supportedImage = /png|jpg|jpeg|pdf|webp/;
        const extension = path.extname(file.originalname);
        if (supportedImage.test(extension)) {
            cb(null, true);
        } else {
            cb(new Error("Must be select a png|jpg|jpeg|pdf|webp file."));
        }
    },
    limits: {
        fileSize: 2000000,
    },
});

module.exports = uploader;