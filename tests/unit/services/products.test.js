const { expect, use } = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const productsModel = require('../../../models/products');
const productsService = require('../../../services/products');

use(chaiAsPromised);

const product = { id: 1, name: "Martelo de Thor" };
const updateProduct = { name: 'Altera um produto' };

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
      expect(response).to.be.an('object');
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

  describe('update - Altera um produto existente', () => {
    const mockTest = { id: 1, name: 'Altera um produto' };

    before(async () => {
      const execute = mockTest;
      sinon.stub(productsModel, 'update').resolves(execute)
    });
    after(async () => productsModel.update.restore);

    it('Retorna um objeto', async () => {
      const response = await productsService.update(1, updateProduct);
      expect(response).to.be.an('object');
    });

    it('Quando é inserido dado inválido retorna "false"', async () => {
      const response = await productsService.update(1001, updateProduct);
      expect(response).to.equal(false);
    });
  });

  describe('deleteProduct - Deleta um produto', () => {
    
    it('Verifica que não é retornado nada ao excluir um produto', async () => {
      const response = await productsService.deleteProduct(2);

      expect(response).to.be.false;
    });

    it('Quando é inserido dado inválido retorna "false"', async () => {
      const response = await productsService.deleteProduct(1001);

      expect(response).to.equal(false);
    });
  });

  describe('getByName - Busca um produto pelo nome', () => {
      
    it('Retorna um objeto com as informações do produto', async () => {
      const response = await productsService.getByName('Escudo');

      expect(response).to.be.an('object');
      expect(response).not.to.be.empty;
      expect(response).to.include.all.keys('id', 'name');
    });
  });  
});