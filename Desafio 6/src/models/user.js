const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName : String,
    lastName : String,
    email: { type: String, unique: true},
    age: Number,
    password : String
})

const userModel = mongoose.model('usuarios', userSchema)

module.exports = userModel;