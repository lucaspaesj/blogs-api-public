const postService = require('../services/post.service');
const errorMap = require('../utils/errorMap');

const internalError = 'Erro interno';

const createPost = async (req, res) => {
  try {
    const token = req.header('Authorization');
    const { body } = req;
    const { type, message } = await postService.createPost(body, token);
    if (type) return res.status(errorMap.mapError(type)).json({ message });
    res.status(201).json(message);
  } catch (e) {
    res.status(500).json({ message: internalError, error: e.message });
  }
};

const getPosts = async (req, res) => {
  try {
    const { type, message } = await postService.getPosts();
    if (type) return res.status(errorMap.mapError(type)).json({ message });
    res.status(200).json(message);
  } catch (e) {
    res.status(500).json({ message: internalError, error: e.message });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, message } = await postService.getById(id);
    if (type) return res.status(errorMap.mapError(type)).json({ message });
    res.status(200).json(message);
  } catch (e) {
    res.status(500).json({ message: internalError, error: e.message });
  }
};

const updateById = async (req, res) => {
  try {
    const token = req.header('Authorization');
    const { id } = req.params;
    const { title, content } = req.body;
    const { type, message } = await postService.updateById(id, title, content, token);
    if (type) return res.status(errorMap.mapError(type)).json({ message });
    res.status(200).json(message);
  } catch (e) {
    res.status(500).json({ message: internalError, error: e.message });
  }
};

const deleteById = async (req, res) => {
  try {
    const token = req.header('Authorization');
    const { id } = req.params;
    const { type, message } = await postService.deleteById(id, token);
    if (type) return res.status(errorMap.mapError(type)).json({ message });
    res.status(204).json();
  } catch (e) {
    res.status(500).json({ message: internalError, error: e.message });
  }
};

const findBySearch = async (req, res) => {
  try {
    const { q } = req.query;
    const { type, message } = await postService.findBySearch(q);
    if (type) return res.status(errorMap.mapError(type)).json({ message });
    res.status(200).json(message);
  } catch (e) {
    res.status(500).json({ message: internalError, error: e.message });
  }
};

module.exports = {
  createPost,
  getPosts,
  getById,
  updateById,
  deleteById,
  findBySearch,
};
