const mongoose = require("mongoose");

const addCommentSchema = mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        commentData: {
            type: Array,
            required: true,
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
    { timestamps: true },
    { collection: "addcomments" }
);

const AddComment = mongoose.model("AddComment", addCommentSchema)
module.exports = AddComment;