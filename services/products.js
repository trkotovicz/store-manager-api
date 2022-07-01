// const Joi = require('joi');
const productsModel = require('../models/products');

// Passo 2 - chama no services / faz validações
const getAll = async () => {
  const products = await productsModel.getAll();
  return products;
};

const getById = async (id) => {
  const product = await productsModel.getById(id);
  return product;
};

const create = async (name) => {
  const product = await productsModel.create(name);
  return product;
};

module.exports = {
  getAll,
  getById,
  create,
};