const Errorhandler = require("../utils/errorhandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server error";

  //wrong mongodb id error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new Errorhandler(message, 400);
  }

  //mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(error.keyValue)} entered`;
    err = new Errorhandler(message, 400);
  }

  //jwt error
  if (err.name === "JsonWebTokenError") {
    const message = `Json web token is invalid , Try again`;
    err = new Errorhandler(message, 400);
  }
  //jwt expire error
  if (err.name === "TokenExpireError") {
    const message = `Json web token is expired ,Try again`;
    err = new Errorhandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
