const express = require('express');
const login=require('../services/login');

const Users= require('../ApiService/users/route');
const Post=require('../ApiService/post/route');


const router = express.Router();

//path user y login

router.use('/login', login.login);
router.use('/user', Users);

// path post 

router.use('/post', Post);



module.exports = router;