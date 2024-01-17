const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const createError = require('http-errors');

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
    const { username, password } = req.body;
    try{
        
        const user = await User.findOne({ username })
        if (!user) {
            return res.status(404).send('Username already taken')
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) {
            return res.status(404).send('Username already taken')
        }

        //create token
        const token = jwt.sign({
            id: user._id,
            username : user.username
        },process.env.JWT_SECRET)

        res.cookie("token",token,{
            httpOnly: true
        }).status(200).json(user)
    }
    
    catch(err){
        console.log(err)
    }
}

const logout = async (req, res, next) => {
    res.clearCookie("token").status(200).json('Logout Successfully!')
}

const profile = async (req,res,next) => {
    const {token} = req.cookies

    if(!token){
        return res.status(200).json(null)
    }
   
    try{
        const data = jwt.verify(token,process.env.JWT_SECRET)
        const user = await User.findById(data.id)
        const {password,...otherData} = user._doc
        res.status(200).json({...otherData})
    }catch(err){
        next(createError(403,"Token is not valid!"))
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.id;

        const deleteUserId = await User.findById(userId);

        if(!deleteUserId) {
            return res.status(404).send('User ID not found!');
        }

        await User.findByIdAndDelete(userId);

        res.status(200).send({
            message: `Deleted ${userId} from database`
        });
    } catch(err) {
        console.log(err);
    }
}

const getUserByUsername= async (req, res, next) => {
    const { username } = req.body

    const { token } = req.cookies
    if(!token)
    {
        return res.status(404).send('User not loged in!')
    }

    const data = jwt.verify(token, process.env.JWT_SECRET)
    if(!data)
    {
        return res.status(404).send('You are not unauthorize!')
    }

    try {
        const user = await User.findOne({ username })
        if(!user)
        {
            return res.status(404).send('User not found!');
        }
        return res.status(200).json(user)
    } catch(err){
        console.log(err);
    }
}

module.exports = { login, register, logout, profile, deleteUser, getUserByUsername }