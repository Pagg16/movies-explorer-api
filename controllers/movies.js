const movieSchems = require('../models/movie');
const BadRequestError = require('../errors/bad-request-error');
const NotFound = require('../errors/not-found');
const ForbiddenError = require('../errors/forbidden-error');

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    trailerLink,
    thumbnail,
    movieId,
  } = req.body;
  movieSchems
    .create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailer,
      nameRU,
      nameEN,
      trailerLink,
      thumbnail,
      movieId,
      owner: req.user._id,
    })
    .then((movie) => res.status(200).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(
          new BadRequestError('Переданы некорректные данные при создании фильма'),
        );
      } else {
        next(err);
      }
    });
};

module.exports.allMovies = (req, res, next) => {
  movieSchems
    .find({ owner: req.user._id })
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

module.exports.delMovie = (req, res, next) => {
  const { id } = req.params;

  movieSchems
    .findById(id)
    .orFail(() => new NotFound('Фильм с указанным id не найден'))
    .then((movieToDel) => {
      const owner = String(movieToDel.owner);

      const uderId = String(req.user._id);

      if (owner !== uderId) {
        throw new ForbiddenError('Фильм с указанным _id не принадлежит вам');
      }

      movieToDel.remove().then(() => res.status(200).send(movieToDel));
    })
    .catch((err) => {
      if (err.message === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};
