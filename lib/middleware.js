'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apiMiddleware = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _lodash = require('lodash.isplainobject');

var _lodash2 = _interopRequireDefault(_lodash);

var _RSAA = require('./RSAA');

var _RSAA2 = _interopRequireDefault(_RSAA);

var _validation = require('./validation');

var _errors = require('./errors');

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * A Redux middleware that processes RSAA actions.
 *
 * @type {ReduxMiddleware}
 * @access public
 */
function apiMiddleware(_ref) {
  var _this = this;

  var getState = _ref.getState;

  return function (next) {
    return function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(action) {
        var validationErrors, _callAPI, _requestType, callAPI, endpoint, headers, method, body, credentials, bailout, types, _normalizeTypeDescrip, _normalizeTypeDescrip2, requestType, successType, failureType, res;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if ((0, _validation.isRSAA)(action)) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt('return', next(action));

              case 2:

                // Try to dispatch an error request FSA for invalid RSAAs
                validationErrors = (0, _validation.validateRSAA)(action);

                if (!validationErrors.length) {
                  _context.next = 7;
                  break;
                }

                _callAPI = action[_RSAA2.default];

                if (_callAPI.types && Array.isArray(_callAPI.types)) {
                  _requestType = _callAPI.types[0];

                  if (_requestType && _requestType.type) {
                    _requestType = _requestType.type;
                  }
                  next({
                    type: _requestType,
                    payload: new _errors.InvalidRSAA(validationErrors),
                    error: true
                  });
                }
                return _context.abrupt('return');

              case 7:

                // Parse the validated RSAA action
                callAPI = action[_RSAA2.default];
                endpoint = callAPI.endpoint;
                headers = callAPI.headers;
                method = callAPI.method;
                body = callAPI.body;
                credentials = callAPI.credentials;
                bailout = callAPI.bailout;
                types = callAPI.types;
                _normalizeTypeDescrip = (0, _util.normalizeTypeDescriptors)(types);
                _normalizeTypeDescrip2 = _slicedToArray(_normalizeTypeDescrip, 3);
                requestType = _normalizeTypeDescrip2[0];
                successType = _normalizeTypeDescrip2[1];
                failureType = _normalizeTypeDescrip2[2];

                // Should we bail out?

                _context.prev = 20;

                if (!(typeof bailout === 'boolean' && bailout || typeof bailout === 'function' && bailout(getState()))) {
                  _context.next = 23;
                  break;
                }

                return _context.abrupt('return');

              case 23:
                _context.next = 31;
                break;

              case 25:
                _context.prev = 25;
                _context.t0 = _context['catch'](20);
                _context.next = 29;
                return (0, _util.actionWith)(_extends({}, requestType, {
                  payload: new _errors.RequestError('[RSAA].bailout function failed'),
                  error: true
                }), [action, getState()]);

              case 29:
                _context.t1 = _context.sent;
                return _context.abrupt('return', next(_context.t1));

              case 31:
                if (!(typeof endpoint === 'function')) {
                  _context.next = 42;
                  break;
                }

                _context.prev = 32;

                endpoint = endpoint(getState());
                _context.next = 42;
                break;

              case 36:
                _context.prev = 36;
                _context.t2 = _context['catch'](32);
                _context.next = 40;
                return (0, _util.actionWith)(_extends({}, requestType, {
                  payload: new _errors.RequestError('[RSAA].endpoint function failed'),
                  error: true
                }), [action, getState()]);

              case 40:
                _context.t3 = _context.sent;
                return _context.abrupt('return', next(_context.t3));

              case 42:
                if (!(typeof headers === 'function')) {
                  _context.next = 53;
                  break;
                }

                _context.prev = 43;

                headers = headers(getState());
                _context.next = 53;
                break;

              case 47:
                _context.prev = 47;
                _context.t4 = _context['catch'](43);
                _context.next = 51;
                return (0, _util.actionWith)(_extends({}, requestType, {
                  payload: new _errors.RequestError('[RSAA].headers function failed'),
                  error: true
                }), [action, getState()]);

              case 51:
                _context.t5 = _context.sent;
                return _context.abrupt('return', next(_context.t5));

              case 53:
                _context.next = 55;
                return (0, _util.actionWith)(requestType, [action, getState()]);

              case 55:
                _context.t6 = _context.sent;
                next(_context.t6);
                _context.prev = 57;
                _context.next = 60;
                return fetch(endpoint, { method: method, body: body, credentials: credentials, headers: headers });

              case 60:
                res = _context.sent;
                _context.next = 69;
                break;

              case 63:
                _context.prev = 63;
                _context.t7 = _context['catch'](57);
                _context.next = 67;
                return (0, _util.actionWith)(_extends({}, requestType, {
                  payload: new _errors.RequestError(_context.t7.message),
                  error: true
                }), [action, getState()]);

              case 67:
                _context.t8 = _context.sent;
                return _context.abrupt('return', next(_context.t8));

              case 69:
                if (!res.ok) {
                  _context.next = 76;
                  break;
                }

                _context.next = 72;
                return (0, _util.actionWith)(successType, [action, getState(), res]);

              case 72:
                _context.t9 = _context.sent;
                return _context.abrupt('return', next(_context.t9));

              case 76:
                _context.next = 78;
                return (0, _util.actionWith)(_extends({}, failureType, {
                  error: true
                }), [action, getState(), res]);

              case 78:
                _context.t10 = _context.sent;
                return _context.abrupt('return', next(_context.t10));

              case 80:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this, [[20, 25], [32, 36], [43, 47], [57, 63]]);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }();
  };
}

exports.apiMiddleware = apiMiddleware;