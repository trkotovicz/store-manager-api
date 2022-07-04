const { expect, use } = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const salesModel = require('../../../models/sales');
const salesService = require('../../../services/sales');

use(chaiAsPromised);

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

describe('Sales Service', () => {
  beforeEach(() => sinon.restore());

  describe('getAll - Lista todas as vendas cadastradas', () => {

    it('Verifica se é retornado um array', async () => {
      sinon.stub(salesModel, 'getAll').resolves(mockSales);
      const response = await salesService.getAll();

      expect(response).to.be.an('array');
    });
  });

  describe('getById - Busca uma venda específica pelo ID', () => {

    describe('Quando o produto existe', () => {
      it('Retorna um array', async () => {
        const response = await salesService.getById(2);

        expect(response).to.be.an('array');
      });
      it('O Array não está vazio', async () => {
        const response = await salesService.getById(2);

        expect(response).not.to.be.empty;
      });
    });
  });
});
