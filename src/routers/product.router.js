const express = require('express');

const productValidateInsert = require('../middlewares/productValidateInsert');

const productController = require('../controllers/product.controller');

const router = express.Router();

router.get('/', productController.productsControllerGetAll);

router.get('/:id', productController.productsControllerById);

router.put('/:id', productValidateInsert, productController.productsControllerUpdateById);

router.delete('/:id', productController.productsControllerDeleteById);

router.post(
  '/',
  productValidateInsert,
  productController.productsControllerInsert,
);

module.exports = router;