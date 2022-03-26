const express = require('express');
const login=require('../services/login');

const Users= require('../ApiService/users/route')


const router = express.Router();

router.use('/login', login.login);
router.use('/user', Users);



module.exports = router;