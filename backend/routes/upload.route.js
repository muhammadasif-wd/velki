const express = require("express");
const router = express.Router();
const uploadController = require("../controllers/upload.controller")
const uploader = require("../middlewares/uploader");

router.post(
    "/single-upload",
    uploader.single("img"),
    uploadController.fileUpload
);
router.post(
    "/multi-upload",
    uploader.array("img"),
    uploadController.multiUpload
);

module.exports = router;
