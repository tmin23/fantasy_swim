const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const LeagueSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    meet_link: {
        type: String,
        required: true
    }, 
    password: {
        type: String, 
        required: true
    }, 
    league_owner: {
        type: mongoose.Types.ObjectId,
        required: true
    }
    }, {
    collection: 'leagues'
});

// encrypts password prior to saving to database
LeagueSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 12);
})

module.exports = League = mongoose.model('League', LeagueSchema);