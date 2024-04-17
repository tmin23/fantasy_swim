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
    const leagueId = req.params.leagueId;

    const league = await League.findById(leagueId);

    return res.json(league);
}

module.exports.getTeam = async (req, res) => {
    const leagueId = req.params.leagueId;
    let userId = null;
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
            const team = await Team.findOne({ owner: userId, leagueId: league_id })
            if (team) return res.json(team);
            else return res.json({ status: false });
        }
    })

    
}

module.exports.getTeams = async (req, res) => {
    const leagueId = req.params.leagueId;
    
    const league = await League.findById(leagueId);
    const teamIds = league.teams;

    const teams = await Team.find({
        '_id': { $in: teamIds}
    })

    if (teams) return res.json(teams);
    else return res.json({ status: false});

}

module.exports.getSwimmers = async (req, res) => {
    leagueId = req.params.leagueId;

    const league = await League.findById(leagueId);

    const swimmers = league.swimmers;

    let swimmerData = []

    for (i=0; i < swimmers.length; i++) {
        const swimmer = await Swimmer.findById(swimmers[i]);
        
        swimmerData.push(swimmer);
    }

    return res.json(swimmerData);
}

module.exports.getRoster = async (req, res) => {
    const leagueId = req.params.leagueId;
    let userId = null;
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
            const team = await Team.findOne({ owner: userId, leagueId: league_id })
           
            const swimmerIds = team.roster;

            const swimmers = await Swimmer.find({
                '_id': { $in: swimmerIds}
            })

            if(swimmers){
                return res.json({swimmers});
            }
            else {
                return res.json({message: "failed"});
            }
        }
    })
}

module.exports.draftSwimmer = async (req, res) => {
    const leagueId = req.params.leagueId;
    const swimmer = req.body;
    let swimmerId = swimmer._id;

    const token = req.cookies.token;

    // If no token in cookies, then the user never logged in
    if(!token) {
        return res.json( {status:false, message: "Nooooooo" });
    }
    //get the user's id and find the team based on that and leagueId

    try {
        const data = jwt.verify(token, process.env.TOKEN_KEY);
        try {
            const league = await League.findById(leagueId);
            if (!league) {
                return res.json({ message: "League not found" });
            }
    
            const teams = await Team.find({ '_id': { $in: league.teams } });
            const teamNamesWithSwimmer = teams.filter(team => team.roster.includes(swimmerId)).map(team => team.name);
    
            if (teamNamesWithSwimmer.length > 0) {
                return res.json({ message: `This swimmer is already on ${teamNamesWithSwimmer.join(', ')}'s roster` });
            }
    
            const userId = new ObjectId(data.id);
            const updateResult = await Team.updateOne(
                { owner: userId, leagueId: leagueId },
                { $addToSet: { roster: swimmerId } }
            );
    
            if (updateResult.modifiedCount === 1) {
                return res.json({ success: true, message: "Swimmer drafted successfully" });
            } else if (updateResult.matchedCount === 1 && updateResult.modifiedCount === 0) {
                return res.json({ message: "This swimmer is already on your roster" });
            } else {
                return res.json({ message: "Failed to draft swimmer" });
            }
        } catch (error) {
            console.error("Error processing the draft:", error);
            return res.json({ message: "Error processing the draft" });
        }
    } catch (err) {
        console.error("JWT verification failed:", err);
        return res.json({ status: false, message: "JWT verification failed" });
    }
}
