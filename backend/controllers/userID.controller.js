const { getUserIDService, getUserIDServiceByUsername, createUserIDService, deleteUserIDById } = require("../service/userID.service");


// Get function create
exports.getUserIDService = async (req, res) => {
    try {
        const filters = { ...req.query };
        const identity = await getUserIDService(filters);
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
exports.getUserIDServiceByUsername = async (req, res, next) => {
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
exports.createUserIDService = async (req, res) => {
    try {
        const newIdentity = await createUserIDService(req.body)
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
exports.deleteUserIDById = async (req, res) => {
    const { id } = req.params

    try {
        const deleteUserIdentity = await deleteUserIDById(id);
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