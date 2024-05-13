const express = require('express');

const { post } = require('../controllers');

const { validateJWT } = require('../middlewares');

const router = express.Router();

router.get('/search', validateJWT, post.findBySearch);

router.post('/', validateJWT, post.createPost);

router.get('/', validateJWT, post.getPosts);

router.get('/:id', validateJWT, post.getById);

router.put('/:id', validateJWT, post.updateById);

router.delete('/:id', validateJWT, post.deleteById);

module.exports = router;