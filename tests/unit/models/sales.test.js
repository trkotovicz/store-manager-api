const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const salesModel = require('../../../models/sales');

const mockSales = [
  {
    saleId: 1,
    date: "2022-07-04T19:56:11.000Z",
    productId: 1,
    quantity: 5
  },
  {
    saleId: 1,
    date: "2022-07-04T19:56:11.000Z",
    productId: 2,
    quantity: 10
  },
  {
    saleId: 2,
    date: "2022-07-04T19:56:11.000Z",
    productId: 3,
    quantity: 15
  }
];

describe('Sales Model', () => {
  beforeEach(() => sinon.restore());

  describe('getAll - lista as vendas cadastradas', () => {

    it('Verifica se é retornado um array', async () => {
      sinon.stub(connection, 'execute').resolves(mockSales);
      const response = await salesModel.getAll();

      expect(response).to.be.an('object');
    });
  });

  describe('getById - Busca uma venda específica pelo ID', () => {

    describe('Quando a venda existe', () => {

      it('Retorna um array', async () => {
        const response = await salesModel.getById(2);

        expect(response).to.be.an('array');
      });
      it('O array não está vazio', async () => {
        const response = await salesModel.getById(2);

        expect(response).not.to.be.empty;
      });
    });
  });
});
