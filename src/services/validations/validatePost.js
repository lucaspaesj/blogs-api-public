const { Category } = require('../../models');

const validateBody = (body) => {
  if (!body.title || !body.content || body.categoryIds === [] || !body.categoryIds) {
    return { type: 'MISSING_FIELDS', message: 'Some required fields are missing' };
  }

  return { type: null, message: '' };
};

const validateCategories = async (ids) => {
  const categories = await Category.findAll();

  if (ids.map((id) => categories.some((category) => category.id === id))
    .some((bool) => bool === false)) {
    return { type: 'INVALID_CATEGORY_ID', message: '"categoryIds" not found' };
  }

  return { type: null, message: '' };
};

module.exports = async (body) => {
  let error = validateBody(body);

  if (error.type) return error;
  
  error = await validateCategories(body.categoryIds);

  if (error.type) return error;

  return { type: null, message: '' };
};
