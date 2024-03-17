const middlewareCore = require("./apiResponse");
const _ = require("lodash");

module.exports = exports = _.extend({}, middlewareCore);

exports.responder = function () {
  return (req, res, next) => {
    // res.renderPage = exports.renderPage.bind(res);
    // res.renderError = exports.renderError.bind(res);
    res.apiResponse = exports.apiResponse.bind(res);
    res.apiError = exports.apiError.bind(res);
    next();
  };
};
