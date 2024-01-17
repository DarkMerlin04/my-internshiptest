const Transaction = require('../models/transaction')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const transfer = async (req, res, next) => {
    const { sender, receiver, amount, type } = req.body

    const { token } = req.cookies
    if(!token)
    {
        return res.status(404).send('User not loged in!')
    }

    try {
        if(type != "Transfer")
        {
            return res.status(404).send('Type is not correct!')
        }

        const data = jwt.verify(token, process.env.JWT_SECRET)
        if(data.id != sender)
        {
            return res.status(404).send('You are not unauthorize!')
        }

        const senderUser = await User.findById(sender)
        const receiverUser = await User.findById(receiver)

        if(senderUser.balance < amount)
        {
            return res.status(404).send('Your balance is not enough!')
        }

        if(!receiverUser)
        {
            return res.status(404).send('Receiver is uncorrect')
        }

        await User.findByIdAndUpdate(
            { _id : senderUser._id },
            { balance : senderUser.balance - amount },
            { new : true }
        )

        await User.findByIdAndUpdate(
            { _id : receiverUser._id },
            { balance : receiverUser.balance + amount },
            { new : true }
        )

        const newTransaction = await Transaction.create({
            sender : senderUser._id,
            receiver : receiverUser._id,
            amount,
            type
        })

        return res.status(200).json(newTransaction)
    } catch(error) {
        console.log(error)
    }
}

const deposit = async (req, res, next) => {
    const { sender, receiver, amount, type } = req.body

    const { token } = req.cookies
    if(!token)
    {
        return res.status(404).send('User not loged in!')
    }
    
    try {
        if(type != "Deposit")
        {
            return res.status(404).send('Type is not correct!')
        }

        const data = jwt.verify(token, process.env.JWT_SECRET)
        console.log(data)
        console.log(sender)
        if(data.id != sender)
        {
            return res.status(404).send('You are not unauthorize!')
        }

        const senderUser = await User.findById(sender)
        const receiverUser = await User.findById(receiver)

        await User.findByIdAndUpdate(
            { _id : senderUser._id },
            { balance : senderUser.balance + amount },
            { new : true }
        )

        const newTransaction = await Transaction.create({
            sender : senderUser._id,
            receiver : receiverUser._id,
            amount,
            type
        })

        return res.status(200).json(newTransaction)
    } catch(error) {
        console.log(error)
    }

}

const withdraw = async (req, res, next) => {
    const { sender, receiver, amount, type } = req.body

    const { token } = req.cookies
    if(!token)
    {
        return res.status(404).send('User not loged in!')
    }
    
    try {
        if(type != "Withdraw")
        {
            return res.status(404).send('Type is not correct!')
        }

        const data = jwt.verify(token, process.env.JWT_SECRET)
        if(data.id != sender)
        {
            return res.status(404).send('You are not unauthorize!')
        }

        const senderUser = await User.findById(sender)
        const receiverUser = await User.findById(receiver)

        if(senderUser.balance < amount)
        {
            return res.status(404).send('Your balance is not enough!')
        }

        await User.findByIdAndUpdate(
            { _id : senderUser._id },
            { balance : senderUser.balance - amount },
            { new : true }
        )

        const newTransaction = await Transaction.create({
            sender : senderUser._id,
            receiver : receiverUser._id,
            amount,
            type
        })

        return res.status(200).json(newTransaction)
    } catch(error) {
        console.log(error)
    }
}

const getTransactions = async (req, res, next) => {
    const transaction = await Transaction.find().populate('sender').populate('receiver');
    res.status(200).json(transaction);
}

const deleteTransactions = async (req, res, next) => {
    try {
        const transactionId = req.params.id;

        const deleteTransactionId = await Transaction.findById(transactionId);
    
        if(!deleteTransactionId) {
            return res.status(404).send('Transaction ID not found!');
        }
    
        await Transaction.findByIdAndDelete(transactionId);

        res.status(200).send({
            message: `Deleted ${transactionId} from database`
        });
    } catch(error)
    {
        console.log(error)
    }
}
module.exports = { transfer, deposit, withdraw, getTransactions, deleteTransactions }