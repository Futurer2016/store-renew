"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reduce = exports.renew = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * store renew utils
 * @param {*} state
 * @param {*} keyPath
 * @param {*} data
 */
var renew = function renew(state, keyPath, data, config) {
  var keyArr = keyPath.split('.');

  if (keyArr.length === 1) {
    // array
    if (Array.isArray(state)) {
      var copyState = state.slice();
      typeof data === 'undefined' ? copyState.splice(keyPath, 1) : copyState.splice(keyPath, 1, data);
      return copyState;
    } // object below
    // delete


    if (typeof data === 'undefined') {
      return Object.keys(state).reduce(function (pre, key) {
        if (key !== keyPath) {
          pre[key] = state[key];
        }

        return pre;
      }, {});
    } // replace


    return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, keyPath, data));
  }

  var property = keyArr[0];
  var s = state[property]; // state 空值处理

  if (typeof s === 'undefined') {
    if (config && config.types) {
      var type = config.types[0];

      switch (type) {
        case 'array':
          s = [];
          break;

        default:
          s = {};
      }
    } else {
      s = {};
    }
  }

  var newConf = config;

  if (newConf) {
    newConf = _objectSpread(_objectSpread({}, newConf), {}, {
      types: newConf.types.slice(1)
    });
  }

  var newState = renew(s, keyArr.slice(1).join('.'), data, newConf);

  if (newState === s) {
    return state;
  }

  if (Array.isArray(state)) {
    return state.map(function (item, index) {
      return String(index) === property ? newState : item;
    });
  }

  return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, property, newState));
}; // store reducer proxy


exports.renew = renew;

var reduce = function reduce(reducer, config) {
  return function (state, action) {
    var _reducer = reducer(state, action),
        _reducer2 = _slicedToArray(_reducer, 2),
        keyPath = _reducer2[0],
        newState = _reducer2[1];

    return renew(state, keyPath, newState, config);
  };
};

exports.reduce = reduce;