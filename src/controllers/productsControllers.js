const { productsService } = require('../services');

const getProducts = async (_req, res) => {
  const productsList = await productsService.getProducts();

  res.status(200).json(productsList);
};

const getById = async (req, res) => {
  const productId = Number(req.params.id);

  const result = await productsService.getById(productId);
  if (!result) return res.status(404).json({ message: 'Product not found' });
  res.status(200).json(result);
};

module.exports = {
  getProducts,
  getById,
};
