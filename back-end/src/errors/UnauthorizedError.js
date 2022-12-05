class UnauthorizedError extends Error {
  constructor(message) {
    super(message || 'Unauthorized');
    this.status = 401;
  }
}

module.exports = UnauthorizedError;
