const validator = require('validator');
const { celebrate, Joi } = require('celebrate');
const { Router } = require('express');
const { oneUser } = require('../controllers/users');
const { updateUser } = require('../controllers/users');

const userRouter = new Router();

userRouter.get('/me', oneUser);

userRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().min(2).custom((value) => {
      if (!validator.isURL(value, { require_protocol: true })) {
        throw new Error('Неправильный формат ссылки');
      }
      return value;
    }),
  }),
}), updateUser);

module.exports = userRouter;
