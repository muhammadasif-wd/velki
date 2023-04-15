// here import all schema if you need check

const User = require("../models/user.model");

exports.checkWithIdService = async (id, User) => {
  const result = await User.findOne({ _id: id });
  if (result?.role) {
    return true;
  } else {
    return false;
  }
};
