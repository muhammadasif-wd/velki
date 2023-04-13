const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const colors = require("colors");
const app = require("./app");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
// database connection
mongoose.connect(process.env.DATABASE).then(() => {
  console.log(`Database connection is successful`.red.italic.bold);
});

// server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`App is running on port ${port}`.yellow.italic.bold);
});