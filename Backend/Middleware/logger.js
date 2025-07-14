module.exports = function logger(req, res, next) {
  const log = `[${new Date().toISOString()}] ${req.method} ${req.url}`;
  require('fs').appendFileSync('access.log', log + '\n');
  next();
};
