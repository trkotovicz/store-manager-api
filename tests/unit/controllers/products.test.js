const { expect } = require('chai');
const sinon = require('sinon');
const productsController = require('../../../controllers/products');
const productsService = require('../../../services/products');

const product = { id: 1, name: "Martelo de Thor" };
const newProduct = { id: 1, name: 'Novo Produto' };
const productNotFound = { message: 'Product not found' };
const nameIsRequired = { message: '"name" is required' };
const minLength = { message: '"name" length must be at least 5 characters long' };

describe('Products Controller', () => {
  beforeEach(() => sinon.restore());

  describe('getAll - Lista todos os produtos cadastrados', () => {

    it('Verifica se é retornado o res.status com valor 200', async () => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      sinon.stub(productsService, 'getAll').resolves(true);
      
      await productsController.getAll(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
    });
  });

  describe('getById - Busca um produto específico pelo ID', () => {

    it('Verifica se é retornado o status com valor 200 e o json com o objeto buscado', async () => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      req.params = { id: 1 };

      await productsController.getById(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(product)).to.be.equal(true);
    });

    it('Verifica se é retornado o status com valor 404 e o json com uma mensagem de erro', async () => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      req.params = { id: 1001 };

      await productsController.getById(req, res);

      expect(res.status.calledWith(404)).to.be.equal(true);
      expect(res.json.calledWith(productNotFound)).to.be.equal(true);
    });
  });

  describe('create - Cadastra um produto novo', () => {

    it('Verifica se é retornado o status 201 e o json com o objeto criado', async () => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      req.body = { name: newProduct.name };

      sinon.stub(productsService, 'create').resolves(newProduct);

      await productsController.create(req, res);

      expect(res.status.calledWith(201)).to.be.equal(true);
      expect(res.json.calledWith(newProduct)).to.be.equal(true);
    });

    it('É retornado um erro quando o "name" não é informado', async () => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      req.body = { };

      await productsController.create(req, res);

      expect(res.status.calledWith(400)).to.be.equal(true);
      expect(res.json.calledWith(nameIsRequired)).to.be.equal(true);
    });

    it('É retornado um erro quando o produto tem menos de 5 caracteres', async () => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      req.body = { name: 'a' };
      
      await productsController.create(req, res);

      expect(res.status.calledWith(422)).to.be.equal(true);
      expect(res.json.calledWith(minLength)).to.be.equal(true);
    });
  });
});