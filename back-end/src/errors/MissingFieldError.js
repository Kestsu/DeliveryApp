class MissingFieldError extends Error {
  constructor(message) {
    super(message || 'MissingFieldError');
    this.status = 422;
  }
}
module.exports = MissingFieldError;  