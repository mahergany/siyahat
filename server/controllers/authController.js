const User = require('../models/user')
const {hashPassword, comparePassword} = require('../helpers/auth')
const { compare } = require('bcrypt')
const jwt = require('jsonwebtoken');

const test = (req, res) => {
    res.json('test is working')
}

//Register Endpoint
const registerUser = async(req, res) => {
    try{
        const{name, email, password} = req.body;
        //check if name was entered
        if(!name){
            return res.json({
                error: 'Name is required'
            })
        };
        //check if password is good
         // Check if password field is empty
         if (!password) {
            return res.json({
                error: 'Password is required'
            });
        }

        // Check if password is at least 6 characters long
        if (password.length < 6) {
            return res.json({
                error: 'Password should be at least 6 characters long'
            });
        }
        //check email
        const exist = await User.findOne({email});
        if(exist){
            return res.json({
                error: 'Email is already taken'
            })
        }

        const hashedPassword = await hashPassword(password)
        //create user in database
        const user = await User.create({
            name, email,
            password: hashedPassword,
        })

        return res.json(user)
    }
    catch(error){
        console.log(error)
    }
}

//Login Endpoint
const loginUser = async(req, res) => {
 try{
    const {email, password} = req.body;
    //check if user exists
    const user = await User.findOne({email});
    if(!user){
        return res.json({
            error: 'No user found!'
        })
    }
    //check if passwords match
    const match = await comparePassword(password, user.password)
    if(match){
        jwt.sign({email: user.email, id: user._id, name: user.name}, process.env.JWT_SECRET, {}, (err, token) => {
            if(err) throw err;
            res.cookie('token', token).json(user)
        } )
    }
    if(!match){
        res.json({
            error: "Incorrect password"
        })
    }
 }catch(error){
    console.log(error)
 }
}

const getProfile = async (req, res) => {
    try {
        // Fetch user profile data based on the user ID extracted from the JWT token
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
};


module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile
}