const { getLotteryService, createLotteryService, deleteLotteryById, getLotteryServiceById } = require("../service/lottery.service");


// Get function create
exports.getLotteryService = async (req, res) => {
    try {
        const filters = { ...req.query };
        const Data = await getLotteryService(filters);
        res.status(200).json({
            status: "success",
            message: "WoW! 😮 Successfully your Data Fetched",
            data: Data
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: "Sorry! 😥 your Data Couldn't be Fetched"
        })
    }
}
// Get function create a id
exports.getLotteryServiceByID = async (req, res, next) => {
    const { id } = req.params
    try {
        const getUserData = await getLotteryServiceById(id);
        res.status(200).json({
            status: "success",
            message: "WoW! 😮 Successfully your Data Fetched",
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
exports.createLotteryService = async (req, res) => {
    try {
        const newData = await createLotteryService(req.body)
        res.status(200).json({
            status: "success",
            message: "WoW! 😮 Successfully your Data Submitted",
            data: newData
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: "Sorry! 😥 your Data Couldn't be Submitted"
        })
    }

}

// Delete function filter by a username
exports.deleteLotteryById = async (req, res) => {
    const { id } = req.params

    try {
        const deleteLottery = await deleteLotteryById(id);
        res.status(200).json({
            status: "success",
            message: "WoW! 😮 Successfully your Data Deleted",
            icon: "success",
            confirmButtonText: "Thank you!",
            data: deleteLottery
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