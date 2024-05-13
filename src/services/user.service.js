require('dotenv/config');

const secret = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');

const { User } = require('../models');

const validations = require('./validations');

const createUser = async (body) => {
  const error = await validations.validateUser(body);

  if (error.type) return error;

  const result = await User.create({
    displayName: body.displayName,
    email: body.email,
    password: body.password,
    image: body.image || null,
  });

  return { type: null, message: { id: result.null, ...result } };
};

const getByEmail = (email) => User.findOne({ where: { email } });

const findAll = () => User.findAll({
  attributes: { exclude: 'password' },
});

const findById = async (id) => {
  const user = await User.findOne({ where: { id }, attributes: { exclude: 'password' } });

  if (!user) return { type: 'UNKNOWN_USER', message: 'User does not exist' };

  return { type: null, message: user };
};

const deleteUser = async (token) => {
  const { data: { email } } = jwt.verify(token, secret);
  const { dataValues: { id } } = await User.findOne({ where: { email } });
  await User.destroy({ where: { id } });
  return { type: null, message: '' };
};

module.exports = {
  getByEmail,
  createUser,
  findAll,
  findById,
  deleteUser,
};
