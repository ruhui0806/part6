const mongoose = require('mongoose')

const Person = new mongoose.Schema({
    name: { type: String, required: true, minLength: 5 },
    phone: { type: String, minLength: 5 },
    street: { type: String, required: true, minLength: 5 },
    city: { type: String, required: true, minLength: 3 },
    friendsOf: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
})
module.exports = mongoose.model('Person', Person)
