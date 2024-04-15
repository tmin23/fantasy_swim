const mongoose = require('mongoose');

const SwimmerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    team: {
        type: String,
    }, 
    swimmer_ID: { //from swimcloud.com
        type: String
    },
    team_ID: { //from swimcloud.com
        type: String
    },
    hometown_city: { //from swimcloud.com
        type: String
    }, 
    hometown_state: { //from swimcloud.com
        type: String
    },
    finascore: {
        type: String, 
    }, 
    leagueId: {
        type: mongoose.Types.ObjectId, //the id of the league that the swimmer is in
        required: true
    }},{
    collection: 'swimmers'
});


module.exports = Swimmer = mongoose.model('Swimmer', SwimmerSchema);