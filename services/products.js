const Joi = require('joi');
const productsModel = require('../models/products');

const validateBody = (name) => {
  const schema = Joi.object({
    name: Joi.string().required().min(5),
  }).messages({
    'any.required': '{{#label}} is required',
    'string.empty': '{{#label}} is required',
  });
  
  const { error, value } = schema.validate(name);
  if (error) throw error;

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

const update = async (id, name) => {
  const existsId = await productsModel.getById(id);
  if (!existsId) return false;

  const product = await productsModel.update(id, name);
  return product;
};

const deleteProduct = async (id) => {
  const existsId = await productsModel.getById(id);
  if (!existsId) return false;

  await productsModel.deleteProduct(id);
};

const getByName = async (q) => {
  const products = await productsModel.getByName(q);
  return products;
};

module.exports = {
  getAll,
  getById,
  create,
  validateBody,
  update,
  deleteProduct,
  getByName,
};
