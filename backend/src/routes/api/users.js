const express = require('express');
const router = express.Router();
const { Signup, Login } = require("../../controllers/AuthController")

const User = require('../../models/User');

// @route   POST api/users/signup
// @desc    Signup user
// @access  Public
router.post("/signup", Signup);

// @route   POST api/users/login
// @desc    Log user in
// @access  Public
router.post("/login", Login);



module.exports = router;