const Lottery = require("../models/lottery.model");

// get service function create
exports.getLotteryService = async (filter) => {
    const data = await Lottery.find(filter);
    return data;
}
// fetch user data a id
exports.getLotteryServiceById = async (id) => {
    const result = await Lottery.findOne({ _id: id });
    return result;
};
// post service function create
exports.createLotteryService = async (data) => {
    const identity = await Lottery.create(data);
    return identity;
}
// Delete Identity by a username
exports.deleteLotteryById = async (id) => {
    return await Lottery.deleteOne({ _id: id });
};