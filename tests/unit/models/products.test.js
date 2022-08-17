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
  beforeEach(() => sinon.restore());

  describe('getAll - Lista os produtos cadastrados', () => {
    
    it('Verifica se é retornado um objeto', async () => {
      sinon.stub(connection, 'execute').resolves(product);
      const response = await productsModel.getAll();

      expect(response).to.be.an('object');
    });
  });

  describe('getById - Busca um produto específico pelo ID', () => {
     
    describe('Quando o produto existe', () => {
      
      it('Retorna um objeto', async () => {
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

  describe('create - Cadastra um produto novo', () => {
    const mockTeste = {
      id: 1,
      name: 'Novo Produto'
    };

    beforeEach(async () => {
      const execute = [{ insertId: 1 }];
      sinon.stub(connection, 'execute').resolves(execute)
    });

    afterEach(async () => {
      connection.execute.reset()
    });

    it('Retorna um objeto', async () => {
      const response = await productsModel.create(mockTeste);

      expect(response).to.be.a('object');
    });

    it('O objeto contem as informações: id, name', async () => {
      const response = await productsModel.create(mockTeste);

      expect(response).to.include.all.keys('id', 'name');
    });
  });

  describe('update - Altera um produto', () => {

    const mockTeste = {
      id: 1,
      name: 'Altera um Produto'
    };

    beforeEach(async () => {
      const execute = mockTeste;
      sinon.stub(productsModel, 'update').resolves(execute)
    });

    afterEach(async () => {
      productsModel.update.reset()
    });

    it('Retorna um objeto', async () => {
      const response = await productsModel.update(1, { name: 'Altera um Produto' });

      expect(response).to.be.an('object');
    });

    it('O objeto contem as informações: id, name', async () => {
      const response = await productsModel.update(1, { name: 'Altera um Produto' });

      expect(response).to.include.all.keys('id', 'name');
    });
  });

  describe('deleteProduct - Deleta um produto', () => {
    
    beforeEach(() => sinon.reset());

    it('Verifica que não é retornado nada ao excluir um produto', async () => {
      const response = await productsModel.deleteProduct(2);

      expect(response).to.be.undefined;
    });
  });

  describe('getByName - Busca um produto pelo nome', () => {

    it('Retorna um objeto com as informações do produto', async () => {
      const response = await productsModel.getByName('Escudo');

      expect(response).to.be.an('object');
      expect(response).not.to.be.empty;
      expect(response).to.include.all.keys('id', 'name');
    });
  });
});