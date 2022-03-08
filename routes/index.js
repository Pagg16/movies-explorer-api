const { Router } = require('express');
const moviesRouter = require('./movie');
const userRouter = require('./users');
const NotFound = require('../errors/not-found');

const router = new Router();

router.use('/users', userRouter);
router.use('/movies', moviesRouter);
router.use((req, res, next) => {
  next(new NotFound('данные отсутствуют по указанному роуту'));
});

module.exports = router;
