const { expect } = require('chai');
const sinon = require('sinon');
// const { ValidationError } = require('joi');
const salesController = require('../../../controllers/sales');
const salesService = require('../../../services/sales');

const saleNotFound = { message: 'Sale not found' };

describe('Sales Controller', () => {
  beforeEach(() => sinon.restore());

  describe('getAll - Lista todas as vendas cadastradas', () => {

    it('Verifica se é retornado o res.status com o valor 200', async () => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      sinon.stub(salesService, 'getAll').resolves(true);
      
      await salesController.getAll(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
    });
  });

  describe('getById - Busca uma venda específica pelo ID', () => {

    it('Verifica se é retornado o status com o valor 200 e o json com o objeto buscaso', async () => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      req.params = { id: 2 };

      await salesController.getById(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
    });
    it('Verifica se é retornado o status com valor 404 e o json com uma mensagem de erro', async () => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      req.params = { id: 1001 };

      await salesController.getById(req, res);

      expect(res.status.calledWith(404)).to.be.equal(true);
      expect(res.json.calledWith(saleNotFound)).to.be.equal(true);
    });
  });
});