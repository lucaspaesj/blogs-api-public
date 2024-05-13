const express = require('express');

const { user } = require('../controllers');

const middlewares = require('../middlewares');

const router = express.Router();

router.get('/', middlewares.validateJWT, user.getUsers);

router.post('/', user.createUser);

router.get('/:id', middlewares.validateJWT, user.findById);

router.delete('/me', middlewares.validateJWT, user.deleteUser);

module.exports = router;