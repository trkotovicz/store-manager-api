const salesService = require('../services/sales');

const getAll = async (_req, res) => {
  const sales = await salesService.getAll();
  res.status(200).json(sales);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const sale = await salesService.getById(id);

  if (!sale || sale.length === 0) {
    return res.status(404).json({ message: 'Sale not found' });
  }
  res.status(200).json(sale);
};

const create = async (req, res) => {
  const data = await salesService.validateSaleBody(req.body);
  const saleId = await salesService.create(data);
  const saleData = await salesService.getById(saleId);
  res.status(201).json(saleData);
};

module.exports = {
  getAll,
  getById,
  create,
};