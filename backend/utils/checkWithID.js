const User = require("../models/user.model");
exports.checkWithIdService = async (id, modelName) => {
    const result = await modelName.findOne({ _id: id });
    if (result?.role) {
        return true;
    } else {
        return false;
    }
};