const mongoose = require("mongoose");

const identitySchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Please provide your username"],
            unique: true
        },
        userRole: {
            type: String,
            required: [true, "Please provide your user type"],
            unique: true
        },
        name: {
            type: String,
            required: [true, "Please provide your name"],
            unique: true
        },
        date: {
            type: String,
            required: [true, "Please provide your birth date"],
            unique: true
        },
        address: {
            type: String,
            required: [true, "Please provide your current address"],
            unique: true
        },
        number: {
            type: String,
            required: [true, "Please provide your number"],
            unique: true
        },
        whatsapp: {
            type: String,
            required: [true, "Please provide your whatsapp number"],
            unique: true
        },
        img: {
            type: String,
            required: [true, "Please provide your img url"]
        }
    },
    { timestamps: true }
);


const Identity = mongoose.model("Identity", identitySchema)
module.exports = Identity;