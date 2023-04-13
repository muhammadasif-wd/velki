const { createIdentityService, getIdentityService } = require("../service/identity.service");
const { logIn } = require("./user.controller");


// Get function create
exports.getIdentity = async (req, res) => {
    try {
        const filters = { ...req.query };
        const identity = await getIdentityService(filters);
        res.status(200).json({
            status: "success",
            message: "WoW! 😮 Successfully your Identity Fetched",
            data: identity
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: "Sorry! 😥 your Data Couldn't be Submitted"
        })
    }
}
// Get function create a username
exports.getIdentityByUsername = async (req, res, next) => {
    const userInfo = req.query
    console.log(userInfo);
    try {
        const getUserData = await getIdentityByUsername(id);
        res.status(200).json({
            status: "success",
            message: "WoW! 😮 Successfully your Identity Fetched",
            data: getUserData
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: "Sorry! 😥 your Data Couldn't be Submitted"
        })
    }
};


// Post function create
exports.createIdentity = async (req, res) => {
    try {
        const newIdentity = await createIdentityService(req.body)
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