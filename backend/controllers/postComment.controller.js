const { getPostCommentService, getUserIDServiceByUsername, createPostCommentService,  deletePostCommentById } = require("../service/postComment.service");


// Get function create
exports.getPostCommentController = async (req, res) => {
    try {
        const filters = { ...req.query };
        const identity = await getPostCommentService(filters);
        res.status(200).json({
            status: "success",
            message: "WoW! 😮 Successfully your Identity Fetched",
            data: identity
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: "Sorry! 😥 your Data Couldn't be Fetched"
        })
    }
}
// Get function create a username
exports.getPostCommentControllerByUsername = async (req, res, next) => {
    const { username } = req.query
    try {
        const getUserData = await getUserIDServiceByUsername(username);
        res.status(200).json({
            status: "success",
            message: "WoW! 😮 Successfully your Identity Fetched",
            data: getUserData
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: "Sorry! 😥 your Data Couldn't be Fetched"
        })
    }
};


// Post function create
exports.createPostCommentController = async (req, res) => {
    try {
        const newIdentity = await createPostCommentService(req.body)
        res.status(200).json({
            status: "success",
            message: "WoW! 😮 Successfully your Identity Submitted",
            data: newIdentity
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: "Sorry! 😥 your Data Couldn't be Submitted"
        })
    }

}

// Delete function filter by a username
exports.deletePostCommentById = async (req, res) => {
    const { id } = req.params

    try {
        const deleteUserIdentity = await deletePostCommentById(id);
        res.status(200).json({
            status: "success",
            message: "WoW! 😮 Successfully your Identity Deleted",
            icon: "success",
            confirmButtonText: "Thank you!",
            data: deleteUserIdentity
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: "Sorry! 😥 your Data Couldn't be Deleted",
            icon: "error",
            confirmButtonText: "Try again!",
        })
    }
};