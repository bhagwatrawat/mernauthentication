const User = require("../models/User");
const bcrypt = require("bcryptjs");
exports.register = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({
      username,
      email,
      password,
    });
    res.status(201).json({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "User not created",
      err: err.message,
    });
  }
};
exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({
      success: false,
      message: "Please enter all fields",
    });
  }
  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      res.status(404).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    const isMatch = await user.matchPasswords(password);
    if (!isMatch) {
      res.status(404).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    res.status(200).json({
      success: true,
      token: "fkdfjkdkh3",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};
exports.forgotpassword = (req, res, next) => {
  res.send("forgot pass route");
};
exports.resetpassword = (req, res, next) => {
  res.send("reset pass route");
};
