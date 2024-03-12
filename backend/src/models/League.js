const mongoose = require('mongoose');

const LeagueSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    meet_link: {
        type: String,
        required: true
    }
    }, {
    collection: 'leagues'
});

module.exports = League = mongoose.model('League', LeagueSchema);