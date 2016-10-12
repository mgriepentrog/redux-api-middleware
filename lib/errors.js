'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Error class for an RSAA that does not conform to the RSAA definition
 *
 * @class InvalidRSAA
 * @access public
 * @param {array} validationErrors - an array of validation errors
 */
var InvalidRSAA = function (_Error) {
  _inherits(InvalidRSAA, _Error);

  function InvalidRSAA(validationErrors) {
    _classCallCheck(this, InvalidRSAA);

    var _this = _possibleConstructorReturn(this, (InvalidRSAA.__proto__ || Object.getPrototypeOf(InvalidRSAA)).call(this));

    _this.name = 'InvalidRSAA';
    _this.message = 'Invalid RSAA';
    _this.validationErrors = validationErrors;
    return _this;
  }

  return InvalidRSAA;
}(Error);

/**
 * Error class for a custom `payload` or `meta` function throwing
 *
 * @class InternalError
 * @access public
 * @param {string} message - the error message
 */


var InternalError = function (_Error2) {
  _inherits(InternalError, _Error2);

  function InternalError(message) {
    _classCallCheck(this, InternalError);

    var _this2 = _possibleConstructorReturn(this, (InternalError.__proto__ || Object.getPrototypeOf(InternalError)).call(this));

    _this2.name = 'InternalError';
    _this2.message = message;
    return _this2;
  }

  return InternalError;
}(Error);

/**
 * Error class for an error raised trying to make an API call
 *
 * @class RequestError
 * @access public
 * @param {string} message - the error message
 */


var RequestError = function (_Error3) {
  _inherits(RequestError, _Error3);

  function RequestError(message) {
    _classCallCheck(this, RequestError);

    var _this3 = _possibleConstructorReturn(this, (RequestError.__proto__ || Object.getPrototypeOf(RequestError)).call(this));

    _this3.name = 'RequestError';
    _this3.message = message;
    return _this3;
  }

  return RequestError;
}(Error);

/**
 * Error class for an API response outside the 200 range
 *
 * @class ApiError
 * @access public
 * @param {number} status - the status code of the API response
 * @param {string} statusText - the status text of the API response
 * @param {object} response - the parsed JSON response of the API server if the
 *  'Content-Type' header signals a JSON response
 */


var ApiError = function (_Error4) {
  _inherits(ApiError, _Error4);

  function ApiError(status, statusText, response) {
    _classCallCheck(this, ApiError);

    var _this4 = _possibleConstructorReturn(this, (ApiError.__proto__ || Object.getPrototypeOf(ApiError)).call(this));

    _this4.name = 'ApiError';
    _this4.status = status;
    _this4.statusText = statusText;
    _this4.response = response;
    _this4.message = status + ' - ' + statusText;
    return _this4;
  }

  return ApiError;
}(Error);

exports.InvalidRSAA = InvalidRSAA;
exports.InternalError = InternalError;
exports.RequestError = RequestError;
exports.ApiError = ApiError;