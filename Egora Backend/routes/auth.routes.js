const express = require('express')
const router = express.Router();

const {signup,signin,signout,requireSignin} = require('../controllers/auth.controllers')
// const{userSignupValidator} = require('../validator/index.validator')

//routes
router.post("/signup",signup);
router.post("/signin",signin);
router.get("/signout",signout);

// router.get('/hello',requireSignin,(req,res)=>{
//     res.send("Hello user")
// })

module.exports = router;