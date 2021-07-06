const express = require('express')
const router = express.Router();

const {sayHello} = require('../controllers/user.controllers')

//routes
router.get("/", sayHello);

module.exports = router;