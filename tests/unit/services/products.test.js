const { expect } = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../models/products');
const productsService = require('../../../services/products');

const product = [
  {
    id: 1,
    name: "Martelo de Thor"
  }
];

describe('Products Service', () => {

  describe('getAll - Lista todos os produtos cadastrados', () => {
    beforeEach(() => sinon.restore());

    it('Verifica se é retornado um objeto', async () => {
      sinon.stub(productsModel, 'getAll').resolves(product);
      const productsList = await productsService.getAll();

      expect(productsList).to.be.an('object');
    });
  });

  describe('getById - Busca um produto específico pelo ID', () => {

    describe('Quando o produto existe', () => {
      it('Retorna um objeto', async() => {
        const response = await productsService.getById(1);

        expect(response).to.be.an('object');
      });
      it('O objeto não está vazio', async () => {
        const response = await productsService.getById(1);

        expect(response).not.to.be.empty;
      });
      it('O objeto contem as informações: id, name', async () => {
        const response = await productsService.getById(1);

        expect(response).to.include.all.keys('id', 'name');
      });
    });
  });
});