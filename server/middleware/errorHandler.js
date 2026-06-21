/**
 * Global error handling middleware
 */
export function errorHandler(err, req, res, next) {
  console.error('Server error:', err.message);

  res.status(err.status || 500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong',
  });
}
