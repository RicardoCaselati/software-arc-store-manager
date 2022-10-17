const express = require('express');

const saleValidateDataInsert = require('../middlewares/saleValidateDataInsert');

const saleController = require('../controllers/sale.controller');

const router = express.Router();

router.post(
  '/',
  saleValidateDataInsert,
  saleController.salesControllerInsert,
);

router.get(
  '/',
  saleController.salesControllerGetAll,
);

router.get('/:id', saleController.salesControllerGetById);

module.exports = router;
