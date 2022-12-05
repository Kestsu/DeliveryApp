class UnexpectedError extends Error {
  constructor(message) {
    super(message || 'Unexpected');
    this.status = 500;
  }
}

module.exports = UnexpectedError;
