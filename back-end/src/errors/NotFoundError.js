class NotFoundError extends Error {
    constructor(message) {
      super(message || 'Not found');
      this.status = 404;
    }
  }
module.exports = NotFoundError;  