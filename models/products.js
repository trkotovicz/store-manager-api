const connection = require('./connection');

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

const create = async ({ name }) => {
  const query = 'INSERT INTO StoreManager.products (name) VALUES (?)';
  const [product] = await connection.execute(query, [name]);

  return { id: product.insertId, name };
};

const update = async (id, name) => {
  const query = 'UPDATE StoreManager.products SET name=? WHERE id=?';
  await connection.execute(query, [name, id]);
  
  const product = { id, name };
  return product;
};

const deleteProduct = async (id) => {
  const query = 'DELETE FROM StoreManager.products WHERE id=?';
  await connection.execute(query, [id]);
};

const getByName = async (q) => {
  const query = 'SELECT * FROM StoreManager.products WHERE name LIKE ?';
  const [[products]] = await connection.execute(query, [`%${q}%`]);
  
  return products;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteProduct,
  getByName,
};
