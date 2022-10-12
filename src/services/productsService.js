const { productsModel } = require('../models/productsModel'); // importando de index.js

// const { validateNewDriver } = require('./validations/validationsInputValues')

const PRODUCT_ID = 1;

const getProducts = async () => { 
  const products = await productsModel.findAll();
  return products;
};

const getById = async () => {
  const product = await productsModel.findById(PRODUCT_ID);
  return product;
};

module.exports = {
  getProducts,
  getById,
};