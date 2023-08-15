const express = require("express");
const router = express.Router();

const Auth = require("../controllers/auth");

router.post("/register", Auth.Register);
router.post("/login", Auth.Login);

module.exports = router;
