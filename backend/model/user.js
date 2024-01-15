const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please enter username'],
        maxLength: [20, 'Username cannot exceed 20 characters']
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minLength: [6, 'Your password must be longer than 6 characters']
    },
    balance: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('User', userSchema)