const mongoose = require('mongoose')
const crypto = require('crypto')
const uuidv1 = require('uuid/v1')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        require:true,
        maxlength:32
    },
    email:{
        type:String,
        trim:true,
        require:true,
        unique:32
    },
    hashedPassword:{
        type:String,
        require:true
    },
    abou
})