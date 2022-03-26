const express = require('express');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({ uploadDir: ''});


const controller = require('./user_controller');
const router = express.Router()


router.post('/newUser', controller.logup);
router.post('/login', controller.login);
