const express = require('express');
const login=require('../services/login');


const router = express.Router();

router.post('/login', login.login);
router.post('/logup', login.logup);



module.exports = router;