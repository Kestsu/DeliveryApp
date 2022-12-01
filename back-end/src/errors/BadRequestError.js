class BadRequestError extends Error {
  constructor(message) {
    super(message || 'Bad request');
    this.status = 400;
  }
}
module.exports = BadRequestError;
