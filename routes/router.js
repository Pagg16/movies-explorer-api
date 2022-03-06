const { Router } = require('express');
const moviesRouter = require('./movie');
const userRouter = require('./users');

const router = new Router();

router.use('/movies', moviesRouter);
router.use('/users', userRouter);

module.exports = router;
