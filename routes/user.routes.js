const express = require('express');
const { requireSignin,isAuth,isAdmin } = require('../controllers/auth.controllers');
const router = express.Router();

const {userById} = require('../controllers/user.controllers')


//routes
router.get("/test/:userId",requireSignin,isAuth, isAdmin,(req,res)=>{
    res.json({
        user: req.profile
    })
})

router.param('userId',userById);


module.exports = router;