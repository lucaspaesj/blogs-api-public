require('dotenv/config');
const categoryService = require('../services/category.service');
const errorMap = require('../utils/errorMap');

const createCategory = async (req, res) => {
  try {
    const { body } = req;
    const { type, message } = await categoryService.createCategory(body);
    if (type) return res.status(errorMap.mapError(type)).json({ message });
    res.status(201).json(message);
  } catch (e) {
    res.status(500).json({ message: 'Erro interno', error: e.message });
  }
};

const getCategories = async (req, res) => {
  try {
    const { type, message } = await categoryService.getCategories();
    if (type) return res.status(errorMap.mapError(type)).json({ message });
    res.status(200).json(message);
  } catch (e) {
    res.status(500).json({ message: 'Erro interno', error: e.message });
  }
};

module.exports = {
  createCategory,
  getCategories,
};
