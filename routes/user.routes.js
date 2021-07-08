const express = require('express');
const { requireSignin } = require('../controllers/auth.controllers');
const router = express.Router();

const {userById} = require('../controllers/user.controllers')


//routes
router.get("/test/:userId",requireSignin,(req,res)=>{
    res.json({
        user: req.profile
    })
})

router.param('userId',userById);


module.exports = router;