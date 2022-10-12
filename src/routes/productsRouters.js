const express = require('express');
const { productsControllers } = require('../controllers/productsControllers');

const router = express.Router();

router.get('/', productsControllers.getProducts);

router.get('/:id', productsControllers.getById);

module.exports = router;
