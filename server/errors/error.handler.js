const ApiError = require("./ApiError");

function _mainErrorHandler(err, req, res, next) {
  res.status(err.status || 500).json({
    message: err.message || "Server error",
    status: err.status,
    data: {},
  });
}
function notFoundError(req, res, next) {
  next(new ApiError("Not found", 404));
}

module.exports = {
  _mainErrorHandler,
  notFoundError,
};