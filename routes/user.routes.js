const express = require('express')
const router = express.Router();

const {signup} = require('../controllers/user.controllers')
const{userSignupValidator} = require('../validator/index.validator')

//routes
router.post("/signup", signup);

module.exports = router;