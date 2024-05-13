module.exports = (body) => {
  if (!body.name) return { type: 'MISSING_NAME', message: '"name" is required' };

  return { type: null, message: '' };
};
