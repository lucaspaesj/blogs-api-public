require('dotenv/config');
const jwt = require('jsonwebtoken');
const userService = require('../services/user.service');
const errorMap = require('../utils/errorMap');

const secret = process.env.JWT_SECRET;

const createUser = async (req, res) => {
  try {
    const { body } = req;
    const { type, message } = await userService.createUser(body);
    if (type) return res.status(errorMap.mapError(type)).json({ message });
    const jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };
    const token = jwt.sign({ data: { email: message.dataValues.email } }, secret, jwtConfig);
    return res.status(201).json({ token });
  } catch (e) {
    res.status(500).json({ message: 'Erro interno', error: e.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await userService.findAll();
    res.status(200).json(users);
  } catch (e) {
    res.status(500).json({ message: 'Erro interno', error: e.message });
  }
};

const findById = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, message } = await userService.findById(id);
    if (type) return res.status(errorMap.mapError(type)).json({ message });
    res.status(200).json(message);
  } catch (e) {
    res.status(500).json({ message: 'Erro interno', error: e.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const token = req.header('Authorization');
    const { type, message } = await userService.deleteUser(token);
    if (type) return res.status(errorMap.mapError(type)).json({ message });
    res.status(204).json();
  } catch (e) {
    res.status(500).json({ message: 'Erro interno', error: e.message });
  }
};

module.exports = {
  createUser,
  getUsers,
  findById,
  deleteUser,
};