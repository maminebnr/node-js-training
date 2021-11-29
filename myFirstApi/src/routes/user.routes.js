const express = require('express');

const router = express.Router();

const userContoller = require('../controllers/user.controllers');


//create a new user 
router.post('/create',userContoller.create)



module.exports = router