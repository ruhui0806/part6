const mongoose = require('mongoose')

const User = new mongoose.Schema({
    username: { type: String, minLength: 3, required: true },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Person' }],
})
module.exports = mongoose.model('User', User)
