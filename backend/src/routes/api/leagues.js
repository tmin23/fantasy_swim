const express = require('express');
const router = express.Router();

const League = require('../../models/League');


// @route   GET api/leagues
// @desc    Get all leagues that user is in
// @access  Public
router.get('/', (req, res) => {
    League.find()
        .then(leagues => res.json(leagues))
        .catch(err => res.status(404).json({noleaguesfound: 'No leagues found'}));
});


// @route   POST api/leagues
// @desc    Add league to database
// @access  Public
router.post("/", async (req, res) => {
    League.create(req.body)
        .then(league => res.json({msg: 'League added'}))
        .catch(err => {
            console.log(err);
            console.log(req.body)
            return res.status(400).json({error:'unable to add league :('});
        })
  });

module.exports = router;