const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: [true, 'Please enter the transaction amount'],
        min: [0.01, 'Amount must be greater than 0']
    },
    type: {
        type: String,
        enum: ['Deposit', 'Withdraw', 'Transfer'],
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Transaction', transactionSchema)