const express = require('express');
const router = express.Router();
const path = require("path");

const League = require('../models/League');
const User = require('../models/User');


module.exports.getLeague = async (req, res) => {
    leagueId = req.params.leagueId;

    const league = await League.findById(leagueId);

    return res.json({name: league.name});
}