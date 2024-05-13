const userService = require('../services/user.service');

const validateLogin = async (req, res, next) => {
  const { body } = req;

  if (!body.email || !body.password) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  const user = await userService.getByEmail(body.email);

  console.log(user);

  if (!user || user.password !== body.password) {
    return res.status(400).json({ message: 'Invalid fields' });
  }

  return next();
};

module.exports = validateLogin;