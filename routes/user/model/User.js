//brings in mongoose
const mongoose = require('mongoose')
//creates a cookie cutter for data
const userSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
});
//exports data structure to users
module.exports = mongoose.model('user', userSchema)