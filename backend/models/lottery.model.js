const mongoose = require("mongoose");

const lotterySchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        prize: {
            type: String,
            required: true
        },
        winner: {
            type: String,
            required: true
        }
    },
    { timestamps: true },
    { collection: "lotteryResults" }
);

const Lottery = mongoose.model("Lottery", lotterySchema)
module.exports = Lottery;