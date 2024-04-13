const mongoose = require("mongoose");


//Team that is in league
const TeamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Types.ObjectId
    },
    roster: {
        type: [mongoose.Types.ObjectId], //ids of the swimmers that are on the roster
    }, 
    leagueId: {
        type: mongoose.Types.ObjectId //the id of the league that the team is in
    }}, {
    collection: 'teams'
});


module.exports = Team = mongoose.model('Team', TeamSchema);