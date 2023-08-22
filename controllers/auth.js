const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");

class Auth {
  static Register = async (req, res) => {
    const user = await User.create({ ...req.body });
    const token = user.createJWT();

    res.status(StatusCodes.CREATED).json({ token, user: { name: user.name } });
  };

  static Login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "please provide both email and password" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "Invalid credentials" });
    }

    const isPassword_correct = await user.checkPass(password);
    if (isPassword_correct) {
      const token = user.createJWT();
      return res
        .status(StatusCodes.OK)
        .json({ user: { name: user.name }, token });
    } else {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Incorrect password" });
    }
  };
}

module.exports = Auth;
