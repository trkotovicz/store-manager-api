const connection = require('./connection');

// Passo 1 - cria o model (query)
const getAll = async () => {
  const query = 'SELECT * FROM StoreManager.products';
  const [products] = await connection.execute(query);
  
  return products;
};

const getById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id=?';
  const [product] = await connection.execute(query, [id]);

  return product[0];
};

module.exports = {
  getAll,
  getById,
};
