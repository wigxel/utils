'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _ = _interopDefault(require('lodash'));

var iterate = function iterate(fn) {
  return function (alloc, cur) {
    return alloc + (fn ? fn(cur) : cur);
  };
};

var sumArray = function sumArray(arr, fn) {
  return arr.reduce(iterate(fn), 0);
};

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
    return;
  }

  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

var slugify = function slugify(text) {
  var a = 'àáäâãåăæçèéëêǵḧìíïîḿńǹñòóöôœṕŕßśșțùúüûǘẃẍÿź·/_,:;';
  var b = 'aaaaaaaaceeeeghiiiimnnnoooooprssstuuuuuwxyz------';
  var p = new RegExp(a.split('').join('|'), 'g');
  return text.toString().toLowerCase().replace(/\s+/g, '-') // Replace spaces with -
  .replace(p, function (c) {
    return b.charAt(a.indexOf(c));
  }) // Replace special characters
  .replace(/&/g, '-and-') // Replace & with ‘and’
  .replace(/[^\w-]+/g, '') // Remove all non-word characters
  .replace(/--+/g, '-') // Replace multiple - with single -
  .replace(/^-+/, '') // Trim - from start of text
  .replace(/-+$/, ''); // Trim - from end of text
};
var makeSlug = function makeSlug(name, id) {
  if (name) {
    return "".concat(slugify(name), "-").concat(id);
  }

  return '';
}; // eslint-disable-next-line

var filterKeys = function filterKeys() {
  var object = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var keys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var negate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  return Object.entries(object).reduce(function (alloc, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    var cond = negate ? !keys.includes(key) : keys.includes(key);
    if (cond) alloc[key] = value;
    return alloc;
  }, {});
};
var isImage = function isImage() {
  var mimeType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return /image\/(jpeg|png|jpg)/g.test(mimeType);
};
var isEmail = function isEmail(email) {
  return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
};
var hasProp = function hasProp(obj, a) {
  return Object.hasOwnProperty.call(obj, a);
};
var compose = function compose() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return function (x) {
    return args.reduceRight(function (a, fn) {
      return fn(a);
    }, x);
  };
};
var pipe = function pipe() {
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  return function (x) {
    return args.reduce(function (a, fn) {
      return fn(a);
    }, x);
  };
};
var delay = function delay(duration) {
  return new Promise(function (res) {
    setTimeout(res, duration);
  });
};

var pageMeta = function pageMeta(_ref) {
  var currentPage = _ref.currentPage,
      totalPages = _ref.totalPages;
  return {
    totalPages: totalPages,
    currentPage: currentPage,
    totalItems: 1,
    getCurrentPage: function getCurrentPage() {
      return currentPage || 0;
    },
    setCurrentPage: function setCurrentPage(value) {
      this.currentPage = value;
    },
    isBeforeLastPage: function isBeforeLastPage() {
      return this.currentPage < this.totalPages;
    },
    isFirstFetch: function isFirstFetch() {
      return this.currentPage === 0;
    },
    isLastPage: function isLastPage() {
      return this.currentPage === this.totalPages;
    }
  };
};

var defaultProps = {
  limit: 30,
  items: new Map([]),
  urlParams: {},
  prefetch: false,
  isFetching: false,
  pager: pageMeta({
    currentPage: 0,
    totalPages: 1
  }),
  getParams: function getParams() {
    return {
      limit: this.limit
    };
  },
  setMeta: function setMeta(_ref4) {
    var tp = _ref4.totalPages,
        totalItems = _ref4.totalItems;
    this.pager.totalPages = tp;
    this.pager.totalItems = totalItems;
  },
  onFail: function onFail(x) {
    return x;
  },
  onSuccess: function onSuccess(x) {
    return x;
  },
  metaHandler: function metaHandler(x) {
    return x;
  }
};
var poll = function poll(getter, setter, duration) {
  var handle = setInterval(function () {
    return getter().update().then(setter);
  }, duration);
  return function () {
    clearInterval(handle);
  };
};

var cStyle = "\n  background-color: dodgerblue; \n  color: white;\n  padding: 0 .5rem;\n  border-radius: 3px;\n"; // eslint-disable-next-line

var isDevelopment = function isDevelopment() {
  return process.env.NODE_ENV === 'development';
};

var logError = function logError(err) {
  // eslint-disable-next-line
  if (process.browser) console.error(err);
};
var debug = function debug(a) {
  // eslint-disable-next-line
  debugger;
  return a;
};
var trace = function trace() {
  var info = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var style = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : cStyle;
  return function (x) {
    if (isDevelopment()) {
      // eslint-disable-next-line
      if (process.browser) {
        console.info("%c".concat(info), style, x);
      } else {
        console.info(info, x);
      }
    }

    return x;
  };
};
var log = function log(x, msg) {
  return trace(msg)(x);
};
var startStop = function startStop() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'HPION';
  console.time(name);
  var count = 0;

  var reset = function reset() {
    return count = 0;
  };

  return [function () {
    count += 1;
  }, function () {
    console.timeEnd(name);
    var countBeforeReset = count;
    reset();
    return countBeforeReset;
  }];
};

require('intl');

require("intl/locale-data/jsonp/en");

var defaultConfig = {
  style: 'currency',
  currencyDisplay: 'symbol',
  maximumFractionDigits: 2
};
var currency = function currency() {
  var lang = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'en-US';
  return function () {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return new Intl.NumberFormat(lang, _objectSpread2({}, defaultConfig, {}, config)).format;
  };
};
var numberFormat = currency('en-US')({
  style: 'decimal'
});
var usd = currency('en-US')({
  currency: 'USD'
});
var euro = currency('en-US')({
  currency: 'EUR'
});
var naira = currency('en-US')({
  currency: 'NGN'
});

var ProtoBuilderError = function ProtoBuilderError(msg) {
  return new Error("ProtoBuildError: " + msg);
};

var throwIf = function throwIf(validate) {
  var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "ProtoBuilder";
  return function (a) {
    if (validate(a)) {
      throw ProtoBuilderError("Invalid argument provided.\n      Checker: ".concat(name, "\n      Value: ").concat(a, "\n    "));
    }

    return a;
  };
};

var onlyObject = throwIf(function (a) {
  return !_.isObject(a);
}, "Object Checker");
var notNull = throwIf(function (a) {
  return _.isNull(a) || _.isUndefined(a);
}, "Null Checker");
/**
 * default type checking functions
 * @param {Function} cb 
 * 
 */

var checkDefault = function checkDefault(cb) {
  return pipe(notNull, onlyObject, cb);
};

var buildFromProto = function buildFromProto(proto, obj) {
  return Object.assign(Object.create(proto), obj);
};

var doToggle = function doToggle(prop) {
  return function doToggle() {
    this[prop] = !this[prop];
  };
};

var Visibility = checkDefault(function (data) {
  return _objectSpread2({
    visible: true,
    toggleVisibility: doToggle('visible')
  }, data);
});
/**
 * @param {Object} item
 * @returns 
 */

var checkForPrice = function checkForPrice(data) {
  if (!hasProp(data, "getPrice")) throw ProtoBuilderError("HasPrice proto requires a [getPrice] method, none provide");
  if (!_.isFunction(data.getPrice)) throw ProtoBuilderError('HasPrice requires [getPrice] to be a Function');
  return data;
};

var hasPrice = pipe(notNull, onlyObject, checkForPrice, function (data) {
  return _objectSpread2({}, data, {
    _getPrice: function _getPrice() {
      var precision = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;
      return _.round(_.toNumber(this.getPrice()), precision);
    },
    getFormattedPrice: function getFormattedPrice(precision) {
      return numberFormat(this._getPrice(precision));
    }
  });
});
var Checkable = checkDefault(function (data) {
  return _objectSpread2({
    checked: false,
    toggleCheck: doToggle('checked')
  }, data);
});
var Editable = checkDefault(function (data) {
  return _objectSpread2({
    edit: false,
    toggleEdit: doToggle('edit')
  }, data);
});

var forEvent = function forEvent(evt, fn, event_whitelist) {
  if (evt !== null && hasProp(evt, 'type')) {
    if (event_whitelist.includes(evt.type)) {
      fn(evt);
    } else {
      throw Error('Function only works on these events [' + event_whitelist.join(',') + ']');
    }
  } else {
    throw Error('Invalid event passed');
  }
};

var keyboard = function keyboard(fn) {
  return function (evt) {
    return forEvent(evt, fn, ['keypress', 'keydown', 'keyup']);
  };
};
/**
 * triggers callback function when the Enter key is pressed
 * @param {Function} fn the callback function
 * @returns Function
 */


var onEnter = function onEnter(fn) {
  return keyboard(function (evt) {
    if (!(fn instanceof Function)) throw Error('first argument should be of type `function`');

    if (evt.keyCode === 13) {
      fn(evt);
    }
  });
};
/**
 * triggers callback function when the Enter key is pressed
 * @param {Function} fn the callback function
 * @returns Function
 */

var onBackspace = function onBackspace(fn) {
  return function (evt) {
    if (evt.keyCode === 8) fn(evt);
  };
};

exports.Checkable = Checkable;
exports.Editable = Editable;
exports.Visibility = Visibility;
exports.buildFromProto = buildFromProto;
exports.compose = compose;
exports.currency = currency;
exports.debug = debug;
exports.delay = delay;
exports.euro = euro;
exports.filterKeys = filterKeys;
exports.hasPrice = hasPrice;
exports.hasProp = hasProp;
exports.isEmail = isEmail;
exports.isImage = isImage;
exports.log = log;
exports.logError = logError;
exports.makeSlug = makeSlug;
exports.naira = naira;
exports.numberFormat = numberFormat;
exports.onBackspace = onBackspace;
exports.onEnter = onEnter;
exports.pipe = pipe;
exports.poll = poll;
exports.slugify = slugify;
exports.startStop = startStop;
exports.sumArray = sumArray;
exports.trace = trace;
exports.usd = usd;
