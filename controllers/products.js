const productsService = require('../services/products');

// Passo 3 - cria o middleware da rota
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
  const { name } = req.body;
  const product = await productsService.create(name);
  // if (product === null) {
  //   return res.status(400).json({ message: '"name" is required' });
  // }
  // if (product.name.length < 5) {
  //   return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  // }
  res.status(201).json(product);
};

module.exports = {
  getAll,
  getById,
  create,
};
