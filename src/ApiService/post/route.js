const express = require('express');
const multipart = require('connect-multiparty');
const multipartMiddleware_post = multipart({ uploadDir: './src/public/img_post'});

const controller = require('./post_cotroller');
const router = express.Router()

router.post('/create', multipartMiddleware_post, controller.create_post);
router.post('/list', controller.list_postXid);
router.get('/likes/:id_post', controller.likes);
// comentarios del post
router.get('/list_coments/:id_post', controller.list_comentsXpost);
router.post('/create_coment/:id_post', controller.create_coment);


module.exports = router;