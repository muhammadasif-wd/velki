const Identity = require("../models/identity.model")



// get service function create
exports.getIdentityService = async (filter) => {
    const data = await Identity.find(filter);
    return data;
}

// post service function create
exports.createIdentityService = async (data) => {
    const identity = await Identity.create(data);
    return identity;
}
