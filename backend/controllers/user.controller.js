const User = require("../models/user.model");
const bcrypt = require("bcryptjs");


const {
  createSignUpService,
  findUserByUsername,
  getUserService,
  getUserByIdService,
  deleteUserService,
  updateUserService,
  getUserPasswordService,
} = require("../service/user.service");
const { checkWithIdService } = require("../utils/checkWithID");
const { generateToken } = require("../utils/token");

exports.singUp = async (req, res, next) => {
  try {
    const user = await createSignUpService(req.body);
    //here we can make new profile

    res.status(200).json({
      status: "success",
      message: "successfully signup",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};

exports.logIn = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(401).json({
        status: "fail",
        message: "Please provide your credential",
      });
    }

    const user = await findUserByUsername(username);
    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: "No user Found. Please Create an account",
      });
    }

    const isPasswordValid = user.comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(403).json({
        status: "fail",
        message: "phone or password are not correct",
      });
    }
    /* 
    if (user.status != "active") {
      return res.status(401).json({
        status: "fail",
        message: "Your Account is not active yet! Please contact with admin.",
      });
    } */

    //- generate token


    
    const { password: pwd, ...others } = user.toObject();

    const token = generateToken(user);
    res.status(200).json({
      status: "success",
      message: "successfully logged in",
      data: { token, user: others },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await findUserByUsername(req?.user?.phone);

    const { password, ...others } = user.toObject();

    res.status(200).json({
      status: "success",
      data: {
        data: others,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

// ---------get users--------

exports.getUsers = async (req, res) => {
  try {
    let filters = { ...req.query };
    const excludesFields = ["search"];

    excludesFields.forEach((field) => {
      delete filters[field];
    });

    if (req.query.search) {
      filters = {
        $or: [
          { username: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
          { phone: { $regex: req.query.search, $options: "i" } },
        ],
      };
    }

    const user = await getUserService(filters);

    res.status(200).json({
      status: "success",
      data: {
        data: user,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "internal error",
      error: error.message,
    });
  }
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const isIdAvailable = await checkWithIdService(id, User);
    if (!isIdAvailable) {
      return res.status(400).json({
        status: "fail",
        message: "couldn't find user",
      });
    }

    const user = await getUserByIdService(id);

    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "internal error",
      error: error.message,
    });
  }
};
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const isIdAvailable = await checkWithIdService(id, User);
    if (!isIdAvailable) {
      return res.status(400).json({
        status: "fail",
        message: "couldn't delete user",
      });
    }

    const result = await deleteUserService(id);

    res.status(200).json({
      status: "success",
      message: "user deleted successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "internal error. couldn't delete user ",
      error: error.message,
    });
  }
};
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const incomingChangeData = req.body;
    if (incomingChangeData.phone || incomingChangeData.password) {
      return res.status(400).json({
        status: "fail",
        message: "Couldn't change your phone number",
      });
    }

    const isIdAvailable = await checkWithIdService(id, User);
    if (!isIdAvailable) {
      return res.status(400).json({
        status: "fail",
        message: "couldn't update",
      });
    }

    const result = await updateUserService(id, req.body);

    if (!result.modifiedCount) {
      return res.status(400).json({
        status: "fail",
        message: "couldn't update",
      });
    }
    res.status(200).json({
      status: "success",
      message: "User updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Internal error. couldn't update user ",
      error: error.message,
    });
  }
};
// change password
exports.changePassword = async (req, res) => {
  const { id } = req.params;
  try {
    const incomingChangeData = req.body;

    const isIdAvailable = await checkWithIdService(id, User);
    if (!isIdAvailable) {
      return res.status(400).json({
        status: "fail",
        message: "couldn't update",
      });
    }
    const user = await getUserPasswordService(id);

    const isPasswordValid = bcrypt.compareSync(
      incomingChangeData.oldPassword,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        status: "fail",
        message: "Your old password is wrong.Please Try again!",
      });
    }

    const newPassword = req.body.password;

    const passwordRegex = new RegExp(
      "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
    );
    if (!passwordRegex.test(newPassword)) {
      return res.status(401).json({
        status: "fail",
        message: "New Password not strong enough!",
      });
    }

    const hashedPassword = bcrypt.hashSync(newPassword);

    // const result = await updateUserService(id, req.body);
    const result = await updateUserService(id, { password: hashedPassword });

    if (!result.modifiedCount) {
      return res.status(400).json({
        status: "fail",
        message: "Password no changed.",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Password Changed Successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Internal error. couldn't update user ",
      error: error.message,
    });
  }
};
