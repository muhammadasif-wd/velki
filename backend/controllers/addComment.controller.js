const { getAddCommentService, getAddCommentByUsername, createAddCommentService, deleteAddCommentByUsername, getAddCommentById } = require("../service/addComment.service");



// Get function create
exports.getAddComment = async (req, res) => {
    try {
        const filters = { ...req.query };
        const AddComment = await getAddCommentService(filters);
        res.status(200).json({
            status: "success",
            message: "WoW! 😮 Successfully your AddComment Fetched",
            data: AddComment
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: "Sorry! 😥 your Data Couldn't be Fetched"
        })
    }
}
// Get function create a username
exports.getAddCommentByUsername = async (req, res, next) => {
    const { username } = req.query
    try {
        const getUserData = await getAddCommentByUsername(username);
        res.status(200).json({
            status: "success",
            message: "WoW! 😮 Successfully your AddComment Fetched",
            data: getUserData
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: "Sorry! 😥 your Data Couldn't be Fetched"
        })
    }
};
// Get function create a id
exports.getAddCommentById = async (req, res, next) => {
    const { id } = req.params
    try {
        const getUserData = await getAddCommentById(id);
        res.status(200).json({
            status: "success",
            message: "WoW! 😮 Successfully your AddComment Fetched",
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
exports.createAddComment = async (req, res) => {
    try {
        const newAddComment = await createAddCommentService(req.body)
        res.status(200).json({
            status: "success",
            message: "WoW! 😮 Successfully your AddComment Submitted",
            data: newAddComment
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: "Sorry! 😥 your Data Couldn't be Submitted || Please check your id and lottery name again! => Duplicate not allow"
        })
    }

}

// Delete function filter by a username
exports.deleteAddComment = async (req, res) => {
    const { username } = req.params
    try {
        const deleteUserAddComment = await deleteAddCommentByUsername(username);
        res.status(200).json({
            status: "success",
            message: "WoW! 😮 Successfully your AddComment Deleted",
            icon: "success",
            confirmButtonText: "Thank you!",
            data: deleteUserAddComment
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