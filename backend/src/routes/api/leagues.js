const express = require('express');
const router = express.Router();
const path = require("path");

const League = require('../../models/League');
const User = require('../../models/User');

const {getLeague} = require('../../controllers/LeagueController');

require("dotenv").config({path: path.resolve(__dirname, '../../.env')});

const jwt = require("jsonwebtoken");


// @route   GET api/leagues/:leagueId
// @desc    Get league info of this particular league
// @access  Public
router.get('/:leagueId', getLeague);


// @route   POST api/leagues
// @desc    Add league to database
// @access  Public
router.post("/", async (req, res) => {
    const token = req.cookies.token;

    const {name, meet_link, password} = req.body;

    if (!name || !meet_link) {
        return res.json({message: "All fields required"});
    }

    // If no token in cookies, then the user never logged in(shouldn't be possible, need to be logged in to access page)
    if(!token) {
        return res.json( {status:false, error: "Not signed in", message: "User not signed in" });
    }
    let league_owner = "";
    jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
        if (err) {
            return res.json({ status: false });
        } else { //Add id of user as owner
            league_owner = data.id;
        }
    })

    
    League.create({name, meet_link, password, league_owner})
        .then(league => { //adds league to user's list of leagues
            return User.updateOne(
                { _id: league_owner},
                { $addToSet: { leagues: league._id}});
            
        })
        .then(() => {
            return res.json({message: 'League added', success: true})
        })
        .catch(err => {
            console.log(err);
            console.log(req.body)
            return res.status(400).json({error:'unable to add league :('});
        })
  });


module.exports = router;