require('dotenv/config');
const { Op } = require('sequelize');

const secret = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');

const { BlogPost } = require('../models');
const { User } = require('../models');
const { PostCategory } = require('../models');
const { Category } = require('../models');

const validations = require('./validations');

const alterData = (id, { title, content, userId, published, updated }) => ({
  id,
  title,
  content,
  userId,
  updated,
  published,
});

const insertPostsCategories = async (categoryIds, postId) => {
  const promises = categoryIds.map(async (id) => {
    await PostCategory.create({ postId, categoryId: id });
    return id;
  });
  await Promise.all(promises);
};

const createPost = async (body, token) => {
  const error = await validations.validatePost(body);
  if (error.type) return error;
  const decoded = jwt.verify(token, secret);
  const userData = await User.findOne({ where: { email: decoded.data.email } });
  const user = userData.dataValues;
  const result = await BlogPost.create({
    title: body.title,
    content: body.content,
    userId: user.id,
    published: `${new Date()}`,
    updated: `${new Date()}`,
  });
  await insertPostsCategories(body.categoryIds, result.null);
  return { type: null, message: alterData(result.null, result.dataValues) };
};

const getPosts = async () => {
  const result = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return { type: null, message: result };
};

const getById = async (id) => {
  const post = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  if (!post) return { type: 'NONEXISTENT_POST', message: 'Post does not exist' };

  return { type: null, message: post };
};

const updateById = async (id, title, content, token) => {
  const { user } = await BlogPost.findOne({
    where: { id },
    include: [{ model: User, as: 'user', attributes: { exclude: 'password' } }],
  });
  const { data: { email } } = jwt.verify(token, secret);
  if (user.email !== email) return { type: 'UNAUTHORIZED_USER', message: 'Unauthorized user' };
  if (!title || !content) {
    return { type: 'MISSING_FIELDS', message: 'Some required fields are missing' };
  }
  await BlogPost.update({ title, content }, { where: { id } });
  const postUpdated = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return { type: null, message: postUpdated };
};

const deleteById = async (id, token) => {
  const post = await BlogPost.findOne({
    where: { id },
  });
  if (!post) return { type: 'NONEXISTENT_POST', message: 'Post does not exist' };
  const { user } = await BlogPost.findOne({
    where: { id },
    include: [{ model: User, as: 'user', attributes: { exclude: 'password' } }],
  });
  const { data: { email } } = jwt.verify(token, secret);
  if (user.email !== email) return { type: 'UNAUTHORIZED_USER', message: 'Unauthorized user' };
  await BlogPost.destroy({ where: { id } });
  return { type: null, message: '' };
};

const findBySearch = async (search) => {
  if (!search) {
    const result = await BlogPost.findAll({
      include: [
        { model: User, as: 'user', attributes: { exclude: 'password' } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });
    return { type: null, message: result };
  }
  const query = `%${search}%`;
  const results = await BlogPost.findAll({
    where: { [Op.or]: [{ TITLE: { [Op.like]: query } }, { CONTENT: { [Op.like]: query } }] },
    include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return { type: null, message: results };
};

module.exports = {
  createPost,
  getPosts,
  getById,
  updateById,
  deleteById,
  findBySearch,
};
