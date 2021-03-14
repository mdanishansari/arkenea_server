const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: {
        type: String, required: true
    },
    lastname: {
        type: String, required: true
    },
    email: {
        type: String, required: true
    },
    phone: {
        type: Number, required: true
    },
    profile: {
        type: String
    }
})

module.exports = mongoose.model('User', userSchema)