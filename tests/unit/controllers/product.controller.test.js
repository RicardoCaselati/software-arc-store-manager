const { expect } = require('chai');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const {
  serviceReturnMock,
  productsMock,
  productCreated,
  updatedProduct,
} = require('../../unit/mocks/product.mock');

const productService = require('../../../src/services/product.service');

const productController = require('../../../src/controllers/product.controller');

chai.use(sinonChai);

describe('Testes da Camada Product Controller', function () {
  afterEach(sinon.restore);

  describe('listagem de todos os produtos', function () {
    it('Se lista todos os produtos', async function () {
      sinon.stub(productService, 'productsServiceGetAll').resolves(serviceReturnMock);

      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productController.productsControllerGetAll(req, res);

      expect(res.status).to.have.been.calledOnceWith(200);
      expect(res.json).to.have.been.calledOnceWith(serviceReturnMock);
    });
  });

  describe('listagem de produtos por id', function () {
    it('Se lista produto procurado', async function () {
      sinon.stub(productService, 'productsServiceGetById').resolves(productsMock[0]);

      const res = {};
      const req = {
        params: {
          id: [1],
        },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productController.productsControllerById(req, res);

      expect(res.status).to.have.been.calledOnceWith(200);
      expect(res.json).to.have.been.calledOnceWith(productsMock[0]);
    });
  });

  describe('Cadastra um novo produto', function () {
    sinon
      .stub(productService, 'productsServiceInsert')
      .resolves(productCreated);

    it('é chamado o status com o código 201', async function () {
      const res = {};
      const req = {
        body: {
          name: 'ProductX',
        },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productController.productsControllerInsert(req, res);

      expect(res.status).to.have.been.calledOnceWith(201);
    });
  });

  // describe('Atualiza um produto pelo ID', function () {
  //   sinon
  //     .stub(productService, 'productsServiceUpdateById')
  //     .resolves(updatedProduct);

  //   it('é chamado o status com o código 200', async function () {
  //     const res = {};
  //     const req = {
  //       body: {
  //         name: 'Martelo do Batman',
  //       },
  //     };

  //     res.status = sinon.stub().returns(res);
  //     res.json = sinon.stub().returns();

  //     await productController.productsControllerInsert(req, res);
  //     // console.log(res.status);
  //     // expect(res.status).to.have.been.calledOnceWith(200);
  //     expect(res.json).to.have.been.calledOnceWith(updatedProduct);
  //   });
  // });
});

