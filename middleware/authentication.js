const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

const auth = async (req, res, next) => {
  const auth_header = req.headers.authorization;

  if (!auth_header || !auth_header.startsWith("Bearer ")) {
    res.status(StatusCodes.BAD_REQUEST).json("Authentication invalid");
  }

  const token = auth_header.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userID, name: payload.name };
    next();
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).json("Authentication invalid");
  }
};

module.exports = auth;
