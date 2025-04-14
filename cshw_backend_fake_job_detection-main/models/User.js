const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:String,
    mail:String,
    password:String
})

const User = new mongoose.model("User",userSchema);

module.exports = User;