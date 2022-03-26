const express = require('express');
const login=require('../services/login');


const router = express.Router();

router.use('/login', login.login);
router.use('/logup', login.logup);



module.exports = router;