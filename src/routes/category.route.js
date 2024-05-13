const express = require('express');

const { category } = require('../controllers');

const { validateJWT } = require('../middlewares');

const router = express.Router();

router.post('/', validateJWT, category.createCategory);

router.get('/', validateJWT, category.getCategories);

module.exports = router;