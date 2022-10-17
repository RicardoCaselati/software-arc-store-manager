const productService = require('../services/product.service');

const message = { message: 'Product not found' };

const productsControllerGetAll = async (_req, res) => {
  const result = await productService.productsServiceGetAll();
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(404).json({ message: 'Product not found' });    
  }
};

const productsControllerById = async (req, res) => {
  const productId = Number(req.params.id);
  const result = await productService.productsServiceGetById(productId);

  if (!result) {
    res.status(404).json(message);
  } else {
    res.status(200).json(result);
  }
};

const productsControllerInsert = async (req, res) => {
  const { name } = req.body;
  const result = await productService.productsServiceInsert(name);

  if (!result) {
    res.status(404).json(message);
  } else {
    const productObject = {
      id: result,
      name,
    };

    res.status(201).json(productObject);
  }
};

const productsControllerUpdateById = async (req, res) => {
  const { name } = req.body;
  const productId = Number(req.params.id);
  const result = await productService.productsServiceUpdateById(productId, name);

  if (!result) {
    res.status(404).json(message);
  } else {
    res.status(200).json(result);
  }
};

const productsControllerDeleteById = async (req, res) => {
  const productId = Number(req.params.id);
  const affectedRows = await productService.productsServiceDeleteById(productId);

  if (affectedRows === 0) {
    res.status(404).json(message);
  } else {
    res.status(204).json();
  }
};

module.exports = {
  productsControllerGetAll,
  productsControllerById,
  productsControllerInsert,
  productsControllerUpdateById,
  productsControllerDeleteById,
};
