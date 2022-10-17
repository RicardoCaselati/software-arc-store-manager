const saleModel = require('../models/sale.model');

const salesServiceGetAll = async () => {
  const sales = await saleModel.salesModelGetAll();

  return sales;
};

const salesServiceGetById = async (productId) => {
  const product = await saleModel.salesModelGetById(productId);

  return product;
};

const salesServiceInsert = async (sale) => {
  const insertedSale = await saleModel.salesModelInsertProduct(sale);

  return insertedSale;
};

module.exports = {
  salesServiceInsert,
  salesServiceGetAll,
  salesServiceGetById,
};
