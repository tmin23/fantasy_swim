const express = require('express');
const router = express.Router();
const path = require("path");
const ObjectId = require('mongoose').Types.ObjectId;
const bcrypt = require("bcryptjs");

const League = require('../models/League');
const User = require('../models/User');
const Swimmer = require('../models/Swimmer');
const Team = require('../models/Team');

require("dotenv").config({path: path.resolve(__dirname, '../../.env')});
const jwt = require("jsonwebtoken");


module.exports.joinLeague = async (req, res) => {
    const token = req.cookies.token;
    const {name, password, teamName} = req.body;

    let exists = await League.exists({name: name});
    if(!exists) {
        return res.json({message: "No league with this name exists"});
    }

    const league = await League.findOne({name: name});

    const auth = await bcrypt.compare(password, league.password)
        if(!auth) {
            return res.json({message: 'Incorrect password'});
        }

    jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
        if (err) {
            return res.json({ status: false });
        } else {
            let userId = data.id;
            let league_id = league._id;
            const user = await User.findById(userId);
            const userLeagues = user.leagues;
            // Check if user is already in this league
            if (userLeagues.includes(league_id)) {
                return res.json({ message: "You're already in this league" });
            }

            // Add league to user's list of leagues
            try {
                await User.updateOne({ _id: userId }, { $addToSet: { leagues: league_id } });

                // Create team and add it to the league
                const team = await Team.create({ name: teamName, owner: userId, leagueId: league_id });
                await League.updateOne({ _id: league_id }, { $addToSet: { teams: team._id } });

                return res.json({ message: 'League Joined', success: true, id: league_id.toString() });
            } catch (err) {
                console.log(err);
                return res.status(400).json({ error: 'Unable to join league' });
            }
        
        }
    });
    
}

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

module.exports.getSwimmers = async (req, res) => {
    leagueId = req.params.leagueId;

    const league = await League.findById(leagueId);

    console.log(league);

    const swimmers = league.swimmers;
    console.log('swimmers = ', swimmers);

    let swimmerData = []

    for (i=0; i < swimmers.length; i++) {
        const swimmer = await Swimmer.findById(swimmers[i]);
        
        swimmerData.push(swimmer);
    }

    return res.json(swimmerData);
}
