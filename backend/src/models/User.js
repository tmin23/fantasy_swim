const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
    }, {
    collection: 'users'
});

module.exports = League = mongoose.model('User', UserSchema);