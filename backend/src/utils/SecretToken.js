const path = require("path");

//Directory that contains db.js on your local computer
__dirname = "C:/Users/mikey/OneDrive/Documents/Fantasy Swimming/fantasy_swim/backend/src/config"

require("dotenv").config({path: path.resolve(__dirname, '../../.env')});

const jwt = require("jsonwebtoken");

module.exports.createSecretToken = (id) => {
    // Returns token that expires in three days
    return jwt.sign({ id }, process.env.TOKEN_KEY, {
        expiresIn: 3 * 24 * 60 * 60,
    });
}