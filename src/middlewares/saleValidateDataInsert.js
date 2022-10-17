module.exports = (req, res, next) => {
  const sale = req.body;

  // valida a não existência de ID
  const noProductId = sale.some((anySale) => anySale.quantity && !anySale.productId);
  if (noProductId) {
    return res.status(400).json({ message: '"productId" is required' });
  }

  // valida se quantity é menos ou igual a zero
  const lowProductQuantity = sale.some((anySale) => anySale.quantity <= 0);
  if (lowProductQuantity) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }

  // valida a não existência do quantity
  const noProductQuantity = sale.some((anySale) => anySale.productId && !anySale.quantity);
  if (noProductQuantity) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  return next();
};
