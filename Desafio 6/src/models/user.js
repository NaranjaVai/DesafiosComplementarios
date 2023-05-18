const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user:     {type: String, unique: true, required: true },
    password: {type: String, required: true },
    rol:      {type: String, default: 'Usuario'},
    email:    {type: String, unique:true, required: true}
})

const userModel = mongoose.model('usuarios', userSchema)

module.exports = userModel;