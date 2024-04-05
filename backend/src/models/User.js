const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }, 
    leagues: {
        type: [mongoose.Types.ObjectId]
    }
    }, {
    collection: 'users'
});

// encrypts password prior to saving to database
UserSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 12);
})

module.exports = League = mongoose.model('User', UserSchema);