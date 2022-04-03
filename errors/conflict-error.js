const { CONFLICT } = require('./errors');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CONFLICT;
    this.statusCode = 409;
  }
}

module.exports = ConflictError;
