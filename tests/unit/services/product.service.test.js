const { expect } = require('chai');
const sinon = require('sinon');

const { productsMock } = require('../mocks/product.mock');

const { productService } = require('../../../src/services');

describe('Testes da Camada Product Service', function () {
  beforeEach(function () {
    const { productModel } = require('../../../src/models');
    sinon.stub(productModel, 'productsModelGetAll').resolves(productsMock);
  });

  afterEach(function () {
    sinon.restore();
  });
  
  describe('Lista todos produtos', function () {
    it('com o tipo array', async function () {
      // const { productService } = require('../../../src/services');

      const products = await productService.productsServiceGetAll();
      expect(products).to.be.a('array');
      expect(products.length).to.equal(2);
    });

    it('com sucesso', async function () {
      // const { productService } = require('../../../src/services');
      
      const products = await productService.productsServiceGetAll();
      expect(products).to.deep.equal(productsMock);
    });
  })
})