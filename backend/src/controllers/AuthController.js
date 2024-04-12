const User = require("../models/User");
const { createSecretToken } = require("../utils/SecretToken");
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res, next) => {
    try {
        const { username, password, passwordConfirmation } = req.body;
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.json({message: "This username already exists"});
        }
        if (password != passwordConfirmation) {
            return res.json({message: "Passwords do not match"});
        }

        const user = await User.create({ username, password });
        const token = createSecretToken(user._id); //user._id automatically created by mongodb, unique to every user

        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false,
        });

        res
            .status(201)
            .json({ message: "User signed up successfully", success: true, user})
        
        next();
    } catch (error) {
        console.error(error);
    }
}

module.exports.Login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if(!username || !password) {
            return res.json({message: 'All fields required'});
        }

        const user = await User.findOne({ username });
        if(!user) {
            return res.json({message: 'Incorrect username'});
        }

        const auth = await bcrypt.compare(password, user.password)
        if(!auth) {
            return res.json({message: 'Incorrect password'});
        }

        const token = createSecretToken(user._id);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false,
        });

        res
            .status(201)
            .json({ message: 'User logged in successfully', success: true});

        next()
    } catch (error) {
        console.log(error);
    }
}