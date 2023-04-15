const mongoose = require("mongoose");

const PostCommentSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide your lottery name"]
        },
        number: {
            type: String,
            required: [true, { message: "Please provide your lottery number" }]
        },
        code: {
            type: String,
            required: [true, { message: "Please provide your comment code" }]
        },
        link: {
            type: String,
            required: [true, { message: "Please provide your comment link" }]
        }
    },
    { timestamps: true }
);

const PostComment = mongoose.model("PostComment", PostCommentSchema)
module.exports = PostComment;