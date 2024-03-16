const mongoose = require("mongoose");
const userModel = require("../model/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const AppError = require("../utils/appError");

const signToken = function (id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRESIN,
  });
};

exports.signup = async function (req, res, next) {
  try {
    const newUser = await userModel.create(req.body);

    res.status(201).json({
      status: "Account created successfully",
      newUser,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.login = async function (req, res, next) {
  const user = await userModel.findOne({ email: req.body.email });
  // 1. Credentials
  const correct = await bcrypt.compare(user.password, req.body.password);

  if (!user || !correct)
    return next(new AppError("email or password is incorrect", 400));

  // 2. Sign JWT
  const token = signToken(user._id);

  res.cookie("userCookie", token).status(201).json({
    status: "success",
    message: "User logged in successfullly",
  });
};
