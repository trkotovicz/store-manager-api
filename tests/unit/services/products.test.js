const { expect, use } = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const productsModel = require('../../../models/products');
const productsService = require('../../../services/products');

use(chaiAsPromised);

const product = { id: 1, name: "Martelo de Thor" };

describe('Products Service', () => {
  beforeEach(() => sinon.restore());

  describe('getAll - Lista todos os produtos cadastrados', () => {

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

  describe('create - Cadastra um produto novo', () => {
    const newProduct = { name: "Novo Produto" };

    before(async () => {
      const ID = 1;
      sinon.stub(productsModel, 'create').resolves({ id: ID })
    });
    after(async () => productsModel.create.restore);

    it('Retorna um objeto', async () => {
      const response = await productsService.create(newProduct);
      expect(response).to.be.a('object');
    });

    it('O produto é adicionado com sucesso', async () => {
      const response = await productsService.create(newProduct);
      expect(response).to.include.all.keys('id', 'name');
    });
  });

  describe('validateBody - Valida as informações do body', () => {

    it('Ao mandar um objeto inválido retorna um erro', () => {
      const invalidData = { name: '' };

      expect(() => productsService.validateBody(invalidData))
        .to.throws('"name" is required');
    });
  });
});