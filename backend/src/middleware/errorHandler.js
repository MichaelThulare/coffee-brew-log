export function notFoundHandler(req, res) {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
}

export function errorHandler(error, req, res, next) {
  console.error(error);

  if (error.name === 'SequelizeValidationError') {
    const errors = Object.fromEntries(
      error.errors.map((item) => [item.path, item.message])
    );
    return res.status(400).json({ message: 'Validation failed', errors });
  }

  return res.status(500).json({ message: 'An unexpected server error occurred' });
}
