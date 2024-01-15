const User = require('../model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const register = async (req, res, next) => {
    const { username, password } = req.body

    try {
        const user = await User.findOne({ username })
        if(user)
        {
            return res.status(404).send('Username already taken')
        }
        const newUser = await User.create({
            username,
            password:bcrypt.hashSync(password, 10)
        })

        res.status(200).json(newUser)
    } catch(error) {
        console.log(error);
    }
}

const login = async (req, res, next) => {
    const { username, password } = req.body
    
    try {
        const user = await User.findOne({ username })
        if(!user)
        {
            return res.status(404).send('User not found!')
        }

        if(!bcrypt.compare(req.body.password, user.password))
        {
            return res.status(404).send('Password is incorrect!')
        }
        
        const token = jwt.sign({
            id : user._id,
            username : user.username
        },process.env.JWT_SECRET)

        res.cookie("token", token, { httpOnly : true }).status(200).json(user)
    } catch(error) {
        console.log(error);
    }
}

const logout = async (req, res, next) => {
    res.clearCookie("token").status(200).json('Logout Successfully!')
}

module.exports = { login, register, logout }