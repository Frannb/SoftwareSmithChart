'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

exports.formatNum = formatNum;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _parseunit = require('parseunit');

var _parseunit2 = _interopRequireDefault(_parseunit);

var PREFIXES = {
    '24': 'Y',
    '21': 'Z',
    '18': 'E',
    '15': 'P',
    '12': 'T',
    '9': 'G',
    '6': 'M',
    '3': 'k',
    '0': '',
    '-3': 'm',
    '-6': 'µ',
    '-9': 'n',
    '-12': 'p',
  };

function formatNum(num) {
  if (num === 0) {
    return '0';
  }
  var sig = Math.abs(num); // significand
  var exponent = 0;
  while (sig >= 1000 && exponent < 24) {
    sig /= 1000;
    exponent += 3;
  }
  while (sig < 1 && exponent > -12) {
    sig *= 1000;
    exponent -= 3;
  }

  var signPrefix = num < 0 ? '-' : '';
  if (sig > 1000) {
    // exponent == 24
    // significand can be arbitrarily long
    return signPrefix + sig.toFixed(0) + PREFIXES_CAP[exponent];
  }
  return signPrefix + parseFloat(sig.toPrecision(3)) + PREFIXES[exponent];
}
