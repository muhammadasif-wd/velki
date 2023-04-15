const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide your username"],
      unique: true,
      trim: true,
    },
    code: {
      type: String,
      required: [true, "Please provide your betset code"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      validate: [validator.isStrongPassword, { message: "password {VALUE} is not strong enough." }],
    },
    confirmPassword: {
      type: String,
      required: [true, "password is required"],
      validate: [validator.isStrongPassword, { message: "password {VALUE} is not strong enough." }],
    },
    role: {
      type: String,
      enum: ["user", "admin", "stuff"],
      default: "user",
    },
    status: {
      type: String,
      enum: ["active", "inactive", "blocked"],
      default: "active",
    },
  },
  { timestamps: true },
  { collection: "users" }
);

userSchema.pre("save", function (next) {
  const password = this.password;
  const hashedPassword = bcrypt.hashSync(password);
  this.password = hashedPassword;
  this.confirmPassword = undefined;
  next();
});

userSchema.methods.comparePassword = function (password, hash) {
  const isPasswordValid = bcrypt.compareSync(password, hash);
  return isPasswordValid;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
