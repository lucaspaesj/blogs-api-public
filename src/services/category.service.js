const { Category } = require('../models');

const validations = require('./validations');

const createCategory = async (body) => {
  const error = validations.validateCategory(body);

  if (error.type) return error;

  await Category.create({ 
    name: body.name,
  });

  const createdCategory = await Category.findOne({ where: { name: body.name } });

  return { type: null, message: createdCategory };
};

const getCategories = async () => {
  const categories = await Category.findAll();
  
  return { type: null, message: categories };
};

module.exports = {
  createCategory,
  getCategories,
};
