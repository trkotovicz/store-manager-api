const Joi = require('joi');
const productsModel = require('../models/products');

// Passo 2 - chama no services / faz validações

const validateBody = (name) => {
  const schema = Joi.object({
    name: Joi.string().required(),
  });

  const { error, value } = schema.validate(name);
  if (error) return null;
  
  return value;
};

const getAll = async () => {
  const products = await productsModel.getAll();
  return products;
};

const getById = async (id) => {
  const product = await productsModel.getById(id);
  return product;
};

const create = async ({ name }) => {
  const product = await productsModel.create({ name });
  return product;
};

// const validateName = (name) => {
//   if (!name) throw new Error('"name" is required');
//   if (name.length < 5) throw new Error('"name" length must be at least 5 characters long');
// };

// const isValid = (name) => {
//   const isValidName = validateName(name);
//   if (!isValidName) return false;
//   return true;
// };

module.exports = {
  getAll,
  getById,
  create,
  validateBody,
};
