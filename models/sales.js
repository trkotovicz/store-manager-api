const connection = require('./connection');

const getAll = async () => {
  const query = `SELECT
    s.id AS saleId,
    s.date AS date,
    sp.product_id AS productId,
    sp.quantity
  FROM StoreManager.sales AS s
  INNER JOIN StoreManager.sales_products AS sp
  ON s.id = sp.sale_id
  ORDER BY saleId, productId`;
  const [sales] = await connection.execute(query);
  
  return sales;
};

const getById = async (id) => {
  const query = `SELECT
    s.date AS date,
    sp.product_id AS productId,
    sp.quantity
  FROM StoreManager.sales AS s
  INNER JOIN StoreManager.sales_products AS sp
  ON s.id = sp.sale_id
  WHERE sale_id=?`;
  const [sale] = await connection.execute(query, [id]);

  return sale;
};

module.exports = {
  getAll,
  getById,
};