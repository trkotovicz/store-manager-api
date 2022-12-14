const productsService = require('../services/products');

const getAll = async (_req, res) => {
  const products = await productsService.getAll();
  res.status(200).json(products);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const product = await productsService.getById(id);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.status(200).json(product);
};

const create = async (req, res) => {
  const value = productsService.validateBody(req.body);
  const product = await productsService.create(value);

  res.status(201).json(product);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  await productsService.validateBody(req.body);
  const product = await productsService.update(id, name);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.status(200).json(product);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const product = await productsService.deleteProduct(id);

  if (product === false) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.status(204).end();
};

const getByName = async (req, res) => {
  const { q } = req.query;
  const products = await productsService.getByName(q);
  
  res.status(200).json(products);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteProduct,
  getByName,
};
