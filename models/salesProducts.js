const connection = require('./connection');

const addSalesProducts = async (saleId, products) => {
  const query = 'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES ?';
  const rows = products.map((product) => [
    saleId,
    product.productId,
    product.quantity,
  ]);
  await connection.execute(query, [rows]);
};

module.exports = {
  addSalesProducts,
};
