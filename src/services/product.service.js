const productModel = require('../models/product.model');

const productsServiceGetAll = async () => {
  const products = await productModel.productsModelGetAll();

  return products;
};

const productsServiceGetById = async (productId) => {
  const product = await productModel.productsModelGetById(productId);

  return product;
};

const productsServiceInsert = async (name) => {
  const insertedProduct = await productModel.productsModelInsert({ name });

  return insertedProduct;
};

const productsServiceUpdateById = async (productId, dataToUpdate) => {
  const updatedProduct = await productModel.productsModelUpdateById(productId, dataToUpdate);

  return updatedProduct;
};

const productsServiceDeleteById = async (productId) => {
  const affectedRows = await productModel.productsModelDeleteById(productId);

  return affectedRows;
};

module.exports = {
  productsServiceGetAll,
  productsServiceGetById,
  productsServiceInsert,
  productsServiceUpdateById,
  productsServiceDeleteById,
};
