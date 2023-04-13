const Identity = require("../models/identity.model")


// get service function create
exports.getIdentityService = async (filter) => {
    const data = await Identity.find(filter);
    return data;
}

// fetch user data a username
exports.getIdentityByUsername = async (username) => {
    const result = await Identity.findOne({ username: username });
    return result;
};
// post service function create
exports.createIdentityService = async (data) => {
    const identity = await Identity.create(data);
    return identity;
}
// Delete Identity by a username
exports.deleteIdentityByUsername = async (username) => {
    return await Identity.deleteOne({ username: username });
};