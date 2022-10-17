const productsMock = [
  {
    id: 1,
    name: "Martelo de Thor"
  },
  {
    id: 2,
    name: "Traje de encolhimento"
  },
];

const productCreated = { id: 3, name: 'ProductX' };

const serviceReturnMock = {
  status: 200,
  message: productsMock
}

const errorErrorProductNotFound = {
  status: 404,
  message: 'Product not found'
}

module.exports = {
  productsMock,
  serviceReturnMock,
  errorErrorProductNotFound,
  productCreated,
}