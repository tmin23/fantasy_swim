const express = require('express');
const router = express.Router();
const path = require("path");
const ObjectId = require('mongoose').Types.ObjectId;
const {spawn} = require('child_process');

const League = require('../../models/League');
const User = require('../../models/User');
const Team = require('../../models/Team');
const Swimmer = require('../../models/Swimmer');

const {getLeague, getTeam, getSwimmers, joinLeague, getTeams, draftSwimmer, getRoster} = require('../../controllers/LeagueController');

require("dotenv").config({path: path.resolve(__dirname, '../../.env')});

const jwt = require("jsonwebtoken");


// @route   GET api/leagues/:leagueId
// @desc    Get league info of this particular league
// @access  Public
router.get('/:leagueId', getLeague);

// @route   GET api/leagues/:leagueId/team
// @desc    Get league info of this particular league
// @access  Public
router.get('/:leagueId/team', getTeam);

// @route   GET api/leagues/:leagueId/getSwimmers
// @desc    Get all of the swimmers in a league
// @access  Public
router.get('/:leagueId/getSwimmers', getSwimmers);

// @route   GET api/leagues/:leagueId/getTeams
// @desc    Get all of the teams in a league
// @access  Public
router.get('/:leagueId/getTeams', getTeams);

// @route   POST api/leagues/:leagueId/draftSwimmer
// @desc    Add swimmer to user's team roster in league
// @access  Public
router.post('/:leagueId/draftSwimmer', draftSwimmer);

// @route   GET api/leagues/:leagueId/getRoster
// @desc    Get the roster of the user in league
// @access  Public
router.get('/:leagueId/getRoster', getRoster);

// @route   POST api/leagues/join
// @desc    Join league
// @access  Public
router.post('/join', joinLeague);


// @route   POST api/leagues
// @desc    Add league to database, populate league with swimmers(if the meet is populated)
// @access  Public
router.post("/", async (req, res) => {
    const token = req.cookies.token;

    const {name, meet_link, password, teamName} = req.body;

    if (!name || !meet_link) {
        return res.json({message: "All fields required"});
    }

    let exists = await League.exists({name: name});
    if(exists) {
        return res.json({message: "A league with this name already exists, choose another name"});
    }

    // Check if the meet_link is valid

    if (meet_link.substring(0, 34) != "https://www.swimcloud.com/results/") {
        return res.json({ message: "not a valid swimcloud meet link"});
    }

    let meetURL;
    try {
        meetURL = new URL(meet_link);
    } catch (error) {
        return res.json({ message: "invalid meet url" });
    }

    const scriptPath = path.resolve(__dirname, '../../scripts/scraptest.py');

    function runScraper(meet_link) {
        return new Promise((resolve, reject) => {
            let scraperData = '';
            const swimscraper = spawn('py', [scriptPath, meet_link]);

            swimscraper.stdout.on('data', function (data) {
                scraperData += data.toString();
            })

            swimscraper.on('close', (code) => {
                resolve(scraperData);
            })
            swimscraper.on('error', function (err) {reject(err)})
        })
        
    }

    runScraper(meet_link).then(
        (scraperData) => {
            //console.log(scraperData);
            data = scraperData.split('\r\n');
            if (data[0] === "Invalid meet link") {
                return res.json( {message: 'ERROR: the meet page that you entered does not exist, or has no teams entered'})
            }
            else {

                data.splice(data.length-1, 1);

                const dataJson = data.map((str) => JSON.parse(str.replace(/'/g, '"')));

                const attributesToRemove = ['grade', 'swimmer_name', 'team_name'];

                const modifiedDataJson = dataJson.map(obj => {
                    
                    const newObj = { ...obj };
                    
                    newObj.name = obj.swimmer_name;
                    newObj.team = obj.team_name;

                    attributesToRemove.forEach(attr => delete newObj[attr]);

                    return newObj;
                });
                
                addLeague(modifiedDataJson);

            }
            
           
        },
        (error) => {console.error(error)}
    )
    
    
    
    function addLeague(swimmers) {

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

        let league_id = null;
        
        League.create({name, meet_link, password, league_owner})
            .then(league => { //adds league to user's list of leagues
                league_id = new ObjectId(league._id);

                const swimmers_ = swimmers.map(obj => {
                    const newObj = {... obj};
                    newObj.leagueId = league_id;

                    return newObj;
                });

                //adds all swimmers to swimmer collection
                return Swimmer.insertMany(swimmers_)
                
            })
            .then((data) => {

                console.log("data = ", data);
                const updatePromises = [];
                for (let i = 0; i < data.length; i++) {
                    // Push each update operation promise to the array
                    updatePromises.push(
                        League.updateOne(
                            { _id: league_id }, 
                            { $addToSet: { swimmers: data[i]._id }}
                        )
                    );
                }
                // Wait for all update operations to complete
                return Promise.all(updatePromises);
            })
            .then(() => {

                return User.updateOne(
                    { _id: league_owner},
                    { $addToSet: { leagues: league_id}});
            })
            .then(() => {

                //add team to database
                Team.create({name:teamName, owner:league_owner, leagueId: league_id})
                .then(team => {
                    return League.updateOne(
                        {_id: league_id},
                        { $addToSet: {teams: team._id}});
                })
                .then(() => {
                    return res.json({message: 'League added', success: true, id: league_id.toString()})
                })
                .catch(err => {
                    console.log(err);
                    return res.status(400).json({error: 'unable to add league (team issue)'});
                })

            })
            .catch(err => {
                console.log(err);
                console.log(req.body)
                return res.status(400).json({error:'unable to add league :('});
            })
        
        return league_id;

        }
    
  });


module.exports = router;