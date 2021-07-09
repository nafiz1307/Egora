const User = require('../models/user.models')
const jwt = require('jsonwebtoken');
const expressJwt = require ('express-jwt')
const bcrypt = require('bcryptjs');
const {errorHandler} = require('../helpers/dbErrorHandler')
const {userSignupValidation,loginValidation} = require('../validator/index.validator')


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

//Login Route

exports.signin= async (req,res)=>{
    //Data Validation before user Input
    const {error}= loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    //Checking if User exists
    const user = await User.findOne({email : req.body.email});
    if(!user) return res.status(400).send('Email does not exist!');
    //Checking if password is correct
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send ('Email and Password do not match!')

    //generate signed token with user id and secret
    const token = jwt.sign({_id : user._id},process.env.JWT_SECRET)
    //persist toekn as 't' in cookie with expiry date
    res.cookie('t',token,{expire:new Date()+9999})
    //return response with user and token to frontend client
    const {_id,name,email,role} = user
    return res.json({token, user: {_id,email,name,role}});

    // console.log(`${user.name} logged in`)
}

exports.signout =(req,res) =>{
    res.clearCookie('t')
    res.json({message : "Signed Out"});
}


exports.requireSignin = expressJwt({
    secret : process.env.JWT_SECRET,
    algorithms: ["HS256"],
    userProperty : "auth"
});


exports.isAuth=(req,res,next)=>{
    let user = req.profile && req.auth && req.profile._id==req.auth._id
    if(!user){
        return res.status(403).json({
            error:"Access denied"
        })
    }
    next();
}

exports.isAdmin =(req,res,next)=>{
    if(req.profile.role===0){
        return res.status(403).json({
            error:"Admin Access Denied!"
        });
    }
    next();
}