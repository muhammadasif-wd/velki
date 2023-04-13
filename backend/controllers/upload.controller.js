exports.fileUpload = async (req, res) => {
    try {
        res.json({
            status: "success",
            url: `${process.env.multer_url}/${req.file.filename}`,
        });
    } catch (err) { }
};
exports.multiUpload = async (req, res) => {
    try {
        const uploadURL = [];
        req.files.forEach((img) => {
            uploadURL.push(`${process.env.multer_url}/${img.filename}`);
        });
        res.status(200).json({
            status: "success",
            uploadURL: uploadURL,
        });
    } catch (err) { }
};
