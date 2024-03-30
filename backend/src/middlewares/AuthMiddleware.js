const User = require('../models/User');
const path = require('path');

//Directory that contains db.js on your local computer
__dirname = "C:/Users/mikey/OneDrive/Documents/Fantasy Swimming/fantasy_swim/backend/src/config"

require("dotenv").config({path: path.resolve(__dirname, '../../.env')});

const jwt = require("jsonwebtoken");

module.exports.userVerification = (req, res) => {
    const token = req.cookies.token;

    // If no token in cookies, then the user never logged in
    if(!token) {
        return res.json( {status:false });
    }

    jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
        if (err) {
            return res.json({ status: false });
        } else {
            const user = await User.findById(data.id);
            if (user) return res.json({ status: true, user: user.username });
            else return res.json({ status: false });
        }
    })
}