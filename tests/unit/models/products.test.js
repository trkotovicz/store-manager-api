const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const productsModel = require('../../../models/products');

const product = [
  {
    id: 1,
    name: "Martelo de Thor"
  }
];

describe('Products Model', () => {

  describe('getAll - Lista os produtos cadastrados', () => {
    beforeEach(() => sinon.restore());

    it('Verifica se é retornado um objeto', async () => {
      sinon.stub(connection, 'execute').resolves(product);
      const response = await productsModel.getAll();

      expect(response).to.be.an('object');
    });
  });

  describe('getById - Busca um produto específico pelo ID', () => {

    describe('Quando o produto existe', () => {
      it('Retorna um objeto', async() => {
        const response = await productsModel.getById(1);

        expect(response).to.be.an('object');
      });
      it('O objeto não está vazio', async () => {
        const response = await productsModel.getById(1);

        expect(response).not.to.be.empty;
      });
      it('O objeto contem as informações: id, name', async () => {
        const response = await productsModel.getById(1);

        expect(response).to.include.all.keys('id', 'name');
      });
    });
  });
});