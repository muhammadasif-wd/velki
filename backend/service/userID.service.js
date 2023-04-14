const UserID = require("../models/userID.model");

// get service function create
exports.getUserIDService = async (filter) => {
    const data = await UserID.find(filter);
    return data;
}
// fetch user data a username
exports.getUserIDServiceByUsername = async (username) => {
    const result = await UserID.findOne({ username: username });
    return result;
};
// post service function create
exports.createUserIDService = async (data) => {
    const identity = await UserID.create(data);
    return identity;
}
// Delete Identity by a username
exports.deleteUserIDById = async (id) => {
    return await UserID.deleteOne({ _id: id });
};