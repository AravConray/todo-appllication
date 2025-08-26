const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  const status = err.status || err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  const response = { status, error: message };
  if (process.env.NODE_ENV !== 'production') {
    response.stack = err.stack;
  }
  // Optional: log the error for debugging purposes
  console.warn(`[${new Date().toISOString()}] ${status} - ${message}`);
  res.status(status).json(response);
};
module.exports = errorHandler;
