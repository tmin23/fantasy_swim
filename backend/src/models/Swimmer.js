const mongoose = require('mongoose');

const SwimmerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    team: {
        type: String,
    }, 
    finascore: {
        type: String, 
    }, 
    leagueId: {
        type: mongoose.Types.ObjectId //the id of the league that the swimmer is in
    },
    collection: 'swimmers'
});


module.exports = Swimmer = mongoose.model('Swimmer', SwimmerSchema);