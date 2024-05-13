const errorMap = {
  INVALID_DISPLAY_NAME: 400,
  INVALID_EMAIL: 400,
  INVALID_PASSWORD: 400,
  ALREADY_REGISTERED: 409,
  UNKNOWN_USER: 404,
  MISSING_NAME: 400,
  MISSING_FIELDS: 400,
  INVALID_CATEGORY_ID: 400,
  NONEXISTENT_POST: 404,
  UNAUTHORIZED_USER: 401,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  errorMap,
  mapError,
};