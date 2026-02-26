const express = require("express");
const { signup, login, getUserData, logout } = require("../controllers/User");
const { auth } = require("../middlewares/Auth");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/getUserData", auth, getUserData);
router.post("/logout", logout);

module.exports = router;
