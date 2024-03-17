// const AppError = require('../lib/appError');
// const { ErrorCode } = require('../config/errorCode');

// AppError.setErrorCode(ErrorCode);

exports.apiResponse = function (payload) {
  this.json({
    status: 1,
    ...payload,
  });
};

exports.apiError = function (err) {
  console.error(err);

  // if (err instanceof AppError) {
  //   return this.json({
  //     status: -1,
  //     errorCode: err.code,
  //     errorMessage: err.message,
  //   });
  // }

  return this.json({
    status: -1,
    errorCode: 0,
    errorMessage: "unknown internal server error",
  });
};
