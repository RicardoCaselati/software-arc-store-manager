// const { expect } = require('chai');
const expect = require('chai').expect;
const sinon = require('sinon');

const productModel = require('../../../src/models/product.model')

const productMocks = require('../mocks/product.mock');
const productsMock = productMocks.productsMock;
const productMock = productsMock[0];

const connection = require('../../../src/models/connection');

describe('Testes da Camada Product Model', function () {
  
  describe('Lista todos produtos', function () {
    beforeEach(function () {
      sinon.stub(connection, 'execute').resolves([productsMock]);
    });

    afterEach(function () {
      connection.execute.restore();
    });

    it('com o tipo array', async function () {
      const response = await productModel.productsModelGetAll();

      expect(response).to.be.a('array');
    });

    it('com sucesso', async function () {
      const expected = [
        {
          "id": 1,
          "name": "Martelo de Thor"
        },
        {
          "id": 2,
          "name": "Traje de encolhimento"
        },
      ];

      const response = await productModel.productsModelGetAll();
      expect(response).to.deep.equal(expected);
    });
  })

  describe('Encontra um produto pelo id', function () {
    beforeEach(function () {
      sinon.stub(connection, 'execute').resolves([[productMock]]);
    });

    afterEach(function () {
      connection.execute.restore();
    });

    const searchedId = 1;

    it('Retorna o produto como objeto', async function () {

      const product = await productModel.productsModelGetById(Number(searchedId));

      expect(product).to.be.a('object');
    });

    it('com sucesso', async function () {

      const response = await productModel.productsModelGetById(searchedId);

      expect(response).to.deep.equal(productMock);
    });
  });
})