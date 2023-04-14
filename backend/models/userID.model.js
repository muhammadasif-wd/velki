const mongoose = require("mongoose");

const UserIDSchema = mongoose.Schema(
    {
        id: {
            type: String,
            required: [true, "Please provide your id"]
        },
        identity: {
            type: String,
            required: [true, { message: "Please provide your identity!" }]
        },
        username: {
            type: String,
            required: [true, { message: "Please provide your username!" }]
        },
        role: {
            type: String,
            required: [true, { message: "Please provide your role!" }]
        }
    },
    { timestamps: true }
);

const UserID = mongoose.model("UserID", UserIDSchema)
module.exports = UserID;