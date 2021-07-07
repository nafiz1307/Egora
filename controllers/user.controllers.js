const User = require('../models/user.models')
const bcrypt = require('bcryptjs');
const {errorHandler} = require('../helpers/dbErrorHandler')
const {userSignupValidation} = require('../validator/index.validator')


exports.signup= async(req,res)=>{
    const {error}= userSignupValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Checking User Duplication
    const userExist = await User.findOne({email : req.body.email});
    if(userExist) return res.status(400).send('User Email already exists!')
    
    // Hashing Passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt);

    
    //Create a new User
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        gender: req.body.gender
    });
    try{
        const savedUser = await user.save();
        console.log(`${user.name} successfully registered`)
        res.json(savedUser);

    }catch(err){
        console.error(err.message)
    }
};