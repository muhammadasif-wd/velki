const User = require("../models/user.model");

exports.createSignUpService = async (data) => {
  const result = await User.create(data);
  return result;
};
exports.getUserService = async (filters) => {
  const result = await User.find(filters).select("-password ");
  return result;
};

exports.findUserByUsername = async (username) => {
  return await User.findOne({ username });
};

exports.getUserByIdService = async (id) => {
  const result = await User.findOne({ _id: id }).select("-password ");
  return result;
};
exports.deleteUserService = async (id) => {
  const result = await User.deleteOne({ _id: id });
  return result;
};
exports.updateUserService = async (id, data) => {
  const result = await User.updateOne({ _id: id }, data, {
    runValidators: true,
  });
  return result;
};
exports.getUserPasswordService = async (id) => {
  const result = await User.findOne({ _id: id }).select("password");
  return result;
};