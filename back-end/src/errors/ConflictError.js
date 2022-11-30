class ConflictError extends Error {
  constructor(message) {
    super(message || 'Conflict');
    this.status = 409;
  }
}

module.exports = ConflictError;
