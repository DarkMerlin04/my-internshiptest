const User = require('../models/user')
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
    const { email, password } = req.body;
    try{
        const user = await User.findOne({ email })
        if (!user) {
            return next(createError(404, "User not found!"))
        }
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if (!isPasswordCorrect) {
            return next(createError(400, "Wrong password !"))
        }

        //create token
        const token = jwt.sign({
            id: user._id,
            email : user.email
        },process.env.JWT_SECRET)

        const {password,...otherData} = user._doc;

        res.cookie("token",token,{
            httpOnly: true
        }).status(200).json({...otherData})
    }
    
    catch(err){
        console.log(err)
        next(createError(400, "Login fail !"));      
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

module.exports = { login, register, logout, profile }