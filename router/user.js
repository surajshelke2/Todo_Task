const { getMyProfile, login, register, logout } = require("../controller/user");

const express = require("express");
const isAuthenticated = require("../middleware/auth");

const router = express.Router();

router.post("/new", register);
router.post("/login", login);

router.get("/logout", logout);
router.get("/me", isAuthenticated, getMyProfile);

module.exports = router;
