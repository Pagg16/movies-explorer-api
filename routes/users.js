const { celebrate, Joi } = require('celebrate');
const { Router } = require('express');
const { oneUser } = require('../controllers/users');
const { updateUser } = require('../controllers/users');

const userRouter = new Router();

userRouter.get('/users/me', oneUser);

userRouter.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2),
    email: Joi.string().min(2).email(),
  }),
}), updateUser);

module.exports = userRouter;
