const { celebrate, Joi } = require('celebrate');
const { Router } = require('express');
const { createUser } = require('../controllers/users');
const { login } = require('../controllers/users');

const singinSingup = new Router();

singinSingup.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6).max(20),
  }),
}), login);

singinSingup.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6).max(20),
    name: Joi.string().required().min(2).max(30),
  }),
}), createUser);

module.exports = singinSingup;
