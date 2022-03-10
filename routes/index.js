const { Router } = require('express');
const moviesRouter = require('./movie');
const userRouter = require('./users');
const NotFound = require('../errors/not-found');

const router = new Router();

router.use(userRouter);
router.use(moviesRouter);
router.use((req, res, next) => {
  next(new NotFound('данные отсутствуют по указанному роуту'));
});

module.exports = router;
