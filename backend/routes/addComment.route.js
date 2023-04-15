const express = require("express")
const addComment = require("../controllers/addComment.controller")
const router = express.Router()

router.get("/", addComment.getAddComment);
router.post("/", addComment.createAddComment);
router.route('/:id').get(addComment.getAddCommentById)
router
    .route("/:username")
    .get(addComment.getAddCommentByUsername).delete(addComment.deleteAddComment)
module.exports = router