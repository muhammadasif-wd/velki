const {
  createIdentityService,
  getIdentityService,
  getIdentityServiceByUsername,
  deleteIdentityServiceByUsername,
} = require("../service/identity.service");

// Get function create
exports.getIdentity = async (req, res) => {
  try {
    const filters = { ...req.query };
    const identity = await getIdentityService(filters);
    res.status(200).json({
      status: "success",
      message: "WoW! 😮 Successfully your Identity Fetched",
      data: identity,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Sorry! 😥 your Data Couldn't be Fetched",
    });
  }
};
// Get function create a username
exports.getIdentityByUsername = async (req, res, next) => {
  const { username } = req.query;
  try {
    const getUserData = await getIdentityServiceByUsername(username);
    res.status(200).json({
      status: "success",
      message: "WoW! 😮 Successfully your Identity Fetched",
      data: getUserData,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Sorry! 😥 your Data Couldn't be Fetched",
    });
  }
};

// Post function create
exports.createIdentity = async (req, res) => {
  try {
    const newIdentity = await createIdentityService(req.body);
    res.status(200).json({
      status: "success",
      message: "WoW! 😮 Successfully your Identity Submitted",
      data: newIdentity,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message:
        "Sorry! 😥 your Data Couldn't be Submitted || Please check your details again!",
    });
  }
};

// Delete function filter by a username
exports.deleteIdentity = async (req, res) => {
  const { username } = req.params;
  try {
    const deleteUserIdentity = await deleteIdentityServiceByUsername(username);
    res.status(200).json({
      status: "success",
      message: "WoW! 😮 Successfully your Identity Deleted",
      icon: "success",
      confirmButtonText: "Thank you!",
      data: deleteUserIdentity,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Sorry! 😥 your Data Couldn't be Deleted",
      icon: "error",
      confirmButtonText: "Try again!",
    });
  }
};
