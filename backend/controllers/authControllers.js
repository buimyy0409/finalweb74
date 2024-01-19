const User = require("../models/User");
const bcrypt = require("bcrypt");
const { createAccessToken } = require("../utils/token");
const { validateEmail } = require("../utils/validation");

exports.signup = async (req, res) => {
  try {
    const { name, email: signupEmail, password } = req.body;

    if (!name || !signupEmail || !password) {
      return res.status(400).json({ msg: "Please fill in all the fields" });
    }

    if (typeof name !== "string" || typeof signupEmail !== "string" || typeof password !== "string") {
      return res.status(400).json({ msg: "Please send string values only" });
    }

    if (password.length < 4) {
      return res.status(400).json({ msg: "Password length must be at least 4 characters" });
    }

    if (!validateEmail(signupEmail)) {
      return res.status(400).json({ msg: "Invalid Email" });
    }

    const existingUser = await User.findOne({ email: signupEmail });
    if (existingUser) {
      return res.status(400).json({ msg: "This email is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email: signupEmail, password: hashedPassword });

    res.status(200).json({ msg: "Congratulations!! Account has been created for you.." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email: loginEmail, password } = req.body;

    if (!loginEmail || !password) {
      return res.status(400).json({ status: false, msg: "Please enter all details" });
    }

    const user = await User.findOne({ email: loginEmail });
    if (!user) {
      return res.status(400).json({ status: false, msg: "This email is not registered" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ status: false, msg: "Incorrect password" });
    }

    const token = createAccessToken({ id: user._id });
    const { _id, name, email } = user; // Extract relevant user data
    res.status(200).json({ token, user: { _id, name, email }, status: true, msg: "Login successful" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
};