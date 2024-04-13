const express = require('express');
const router = express.Router();
const { Signup, Login } = require("../../controllers/AuthController")
const { userVerification } = require("../../middlewares/AuthMiddleware");
const { getLeagues } = require('../../controllers/UserController')

const User = require('../../models/User');

// @route   POST api/users/signup
// @desc    Signup user
// @access  Public
router.post("/signup", Signup);

// @route   POST api/users/login
// @desc    Log user in
// @access  Public
router.post("/login", Login);

// @route   POST api/users/auth
// @desc    Check if user is logged in
// @access  Public
router.post("/auth", userVerification);



// @route   POST api/users/leagues
// @desc    Gets basic league info of all the leagues the user is in
// @access  Public
router.get("/leagues", getLeagues)



module.exports = router;