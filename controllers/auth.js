const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");

class Auth {
  static Register = async (req, res) => {
    const { name, password, email } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const tempUser = { name, password: hashed, email };

    const user = await User.create({ ...tempUser });
    res.status(StatusCodes.CREATED).json({ user });
  };

  static Login = async (req, res) => {
    res.send("Login route");
  };
}

module.exports = Auth;
