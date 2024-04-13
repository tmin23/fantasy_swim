const express = require('express');
const router = express.Router();
const path = require("path");

const League = require('../models/League');
const User = require('../models/User');

require("dotenv").config({path: path.resolve(__dirname, '../../.env')});

const jwt = require("jsonwebtoken");

module.exports.getLeagues = async (req, res, next) => {

    const token = req.cookies.token;

    // If no token in cookies, then the user never logged in(shouldn't be possible, need to be logged in to access page)
    if(!token) {
        return res.json( {status:false, error: "Not signed in", message: "User not signed in" });
    }

    jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
        if (err) {
            return res.json({ status: false, message: "Failed to get leagues" });
        } else { //get the leagues that the user with data.id is in
            const user = await User.findById(data.id)
            leagues = user.leagues;
            
            let leagueInfo = [];

            for (let i = 0; i < leagues.length; i++) {
                const league = await League.findById(leagues[i]);

                leagueInfo.push({
                    "_id": league._id,
                    "name": league.name
                })
            }


            res.json({status: true, leagues: leagueInfo});
        }
    })
}