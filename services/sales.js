const Joi = require('joi');
const salesModel = require('../models/sales');
const salesProductsModel = require('../models/salesProducts');

const validateSaleBody = (data) => {
  const schema = Joi.array().items(Joi.object({
    productId: Joi.number().required(),
    quantity: Joi.number().required().min(1),
  }));
  
  const { error, value } = schema.validate(data);
  if (error) throw error;

  return value;
};

const getAll = async () => {
  const sales = await salesModel.getAll();
  return sales;
};

const getById = async (id) => {
  const sale = await salesModel.getById(id);
  return sale;
};

const create = async (data) => {
  const { products, ...saleData } = data;
  const saleId = await salesModel.create(saleData);
  await salesProductsModel.addSalesProducts(saleId, products);
  return saleId;
};

module.exports = {
  getAll,
  getById,
  create,
  validateSaleBody,
};
