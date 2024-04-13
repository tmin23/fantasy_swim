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
    collection: 'swimmers'
});


module.exports = Swimmer = mongoose.model('Swimmer', SwimmerSchema);