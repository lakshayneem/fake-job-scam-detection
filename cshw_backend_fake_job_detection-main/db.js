const mongoose = require('mongoose')
const connection = mongoose.connect('mongodb://localhost:27017/fakeJob').then(()=>{
    console.log("Connected to database");
})

module.exports = connection;