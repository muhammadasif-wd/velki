const express = require("express")
const PostComment = require("../controllers/postComment.controller")
const router = express.Router()

router.get("/", PostComment.getPostCommentController);
router.post("/", PostComment.createPostCommentController);
router
    .route("/:id")
    .get(PostComment.getPostCommentControllerByUsername).delete(PostComment.deletePostCommentById)
module.exports = router