const express = require('express');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({ uploadDir: ''});

const controller = require('./post_cotroller');
const router = express.Router()

router.post('/create', controller.create_post);
router.post('/list', controller.list_postXid);
router.get('/list_coments/:id_post', controller.list_comentsXpost);
router.get('/likes/:id_post', controller.likes);


module.exports = router;