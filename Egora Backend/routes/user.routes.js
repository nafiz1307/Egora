const express = require('express');
const { requireSignin,isAuth,isAdmin } = require('../controllers/auth.controllers');
const router = express.Router();

const {userById,read,update} = require('../controllers/user.controllers')


//routes
router.get("/test/:userId",requireSignin,isAuth, isAdmin,(req,res)=>{
    res.json({
        user: req.profile
    })
})

router.get('/user/:userId' ,requireSignin,isAuth,read)
router.put('/user/:userId' ,requireSignin,isAuth,update)

router.param('userId',userById);


module.exports = router;