const express = require('express');
const router = express.Router();
const path = require("path");
const ObjectId = require('mongoose').Types.ObjectId;

const League = require('../models/League');
const User = require('../models/User');

require("dotenv").config({path: path.resolve(__dirname, '../../.env')});
const jwt = require("jsonwebtoken");



module.exports.getLeague = async (req, res) => {
    leagueId = req.params.leagueId;

    const league = await League.findById(leagueId);

    return res.json({name: league.name});
}

module.exports.getTeam = async (req, res) => {
    leagueId = req.params.leagueId;
    userId = null;
    const token = req.cookies.token;

    // If no token in cookies, then the user never logged in
    if(!token) {
        return res.json( {status:false });
    }
    //get the user's id and find the team based on that and leagueId
    jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
        if (err) {
            return res.json({ status: false });
        } else {
            userId = new ObjectId(data.id);
            league_id = new ObjectId(leagueId);
            console.log(league_id);
            const team = await Team.findOne({ owner: userId, leagueId: league_id })
            console.log(team);
            if (team) return res.json({ status: true, team: team.name });
            else return res.json({ status: false });
        }
    })

    
}