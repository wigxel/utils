'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var ramda = require('ramda');
var _ = _interopDefault(require('lodash'));

var iterate = function iterate(fn) {
  return function (alloc, cur) {
    return alloc + (fn ? fn(cur) : cur);
  };
};

var sumArray = function sumArray(arr, fn) {
  return arr.reduce(iterate(fn), 0);
};

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

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

var isBrowser = new Function("try {return this===window;}catch(e){ return false;}");
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
/**
 * Delays before running running
 * e.g await delay(3000)
 * 
 * @param {Integer} duration The duration of the delay
 * 
 * @return {Promise}  promise resolves after the duration
 */

var delay = function delay(duration) {
  return new Promise(function (res) {
    setTimeout(res, duration);
  });
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

var metaLen = ramda.lensPath(["meta"]);
var itemsLen = ramda.lensPath(["items"]);

var _isLastPage = function isLastPage(pager) {
  return pager.meta.currentPage === pager.meta.totalPages;
};

var isBeforeLastPage = function isBeforeLastPage(_ref) {
  var meta = _ref.meta;
  return meta.currentPage < meta.totalPages;
};

var isFirstFetch = ramda.compose(ramda.equals(0), ramda.path(["meta", "currentPage"]));
var setCurrentPage = ramda.set(ramda.lensPath(["meta", "currentPage"]));

var setTotals = function setTotals(obj) {
  return function (pager) {
    if (isFirstFetch(pager)) {
      var pickTotals = ramda.pick(["totalPages", "totalItems"]);
      var value = ramda.merge(pickTotals(obj), ramda.view(metaLen, pager));
      return ramda.set(metaLen, value, pager);
    }

    return pager;
  };
};

var setChunk = function setChunk(page, items, pager) {
  var chunkMap = ramda.view(itemsLen, pager);
  return ramda.set(itemsLen, chunkMap.set(page, items));
};

var handlerFns = {
  onFail: function onFail(err) {
    return console.error(err);
  },
  onSuccess: function onSuccess(x) {
    return x;
  },
  extractMeta: function extractMeta(x) {
    return x;
  },
  getCurrentItems: function getCurrentItems() {
    return this.items.get(this.meta.currentPage);
  },
  isLastPage: function isLastPage() {
    return _isLastPage(this);
  }
};
var meta = {
  limit: 30,
  totalPages: 1,
  totalItems: 1,
  currentPage: 0
};
var Pager = function Pager(obj) {
  return _objectSpread2({
    __proto__: handlerFns,
    endpoint: Promise.resolve(),
    items: new Map([]),
    name: "Pager"
  }, obj, {
    meta: _objectSpread2({
      __proto__: meta
    }, obj.meta)
  });
}; //  page

var guessPage = function guessPage(context, action) {
  var page = context.meta.currentPage;

  if (action === "INCREMENT") {
    if (isFirstFetch(context) || isBeforeLastPage(context)) {
      return page + 1;
    }
  }

  if (action === "DECREMENT" && page > 1) {
    return page - 1;
  }

  return page;
};

var fetchData =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(pager, page) {
    var endpoint, limit, data, newPager;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            endpoint = pager.endpoint, limit = pager.meta.limit;
            _context.prev = 1;
            _context.next = 4;
            return endpoint({
              page: page,
              limit: limit
            });

          case 4:
            data = _context.sent;
            newPager = ramda.compose(Pager, setChunk(page, pager.onSuccess(data), pager), setCurrentPage(page), ramda.compose(setTotals, pager.extractMeta)(data));
            return _context.abrupt("return", newPager(pager));

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](1);
            pager.onError(_context.t0);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 9]]);
  }));

  return function fetchData(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}(); // executes an action

var commit = function commit(action) {
  return (
    /*#__PURE__*/
    function () {
      var _ref3 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(pager) {
        var page, _pager;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                page = guessPage(pager, action);

                if (!(action === "UPDATE")) {
                  _context2.next = 4;
                  break;
                }

                _pager = ramda.set(itemsLen, new Map([]), pager);
                return _context2.abrupt("return", fetchData(_pager, 1));

              case 4:
                if (!(pager.items.has(page) && action !== "REFRESH")) {
                  _context2.next = 6;
                  break;
                }

                return _context2.abrupt("return", setCurrentPage(page, pager));

              case 6:
                _context2.next = 8;
                return fetchData(pager, page);

              case 8:
                return _context2.abrupt("return", _context2.sent);

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x3) {
        return _ref3.apply(this, arguments);
      };
    }()
  );
};

var refresh = commit("UPDATE");

var _next = commit("INCREMENT");

var _prev = commit("DECREMENT"); // Vuex Helpers

var setItems = function setItems(commit) {
  return function (paginator) {
    var itemGroup = log(paginator.getCurrentItems(), "Fetched " + paginator.name);
    commit("set_paginator", paginator);
    commit("set_items", itemGroup);
    return itemGroup;
  };
};

var mapPaginationActions = function mapPaginationActions() {
  return {
    fetch: function () {
      var _fetch = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(_ref4) {
        var state, commit;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                state = _ref4.state, commit = _ref4.commit;
                return _context3.abrupt("return", _next(state.paginator).then(setItems(commit)));

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function fetch(_x4) {
        return _fetch.apply(this, arguments);
      }

      return fetch;
    }(),
    next: function () {
      var _next2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(_ref5) {
        var state, commit;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                state = _ref5.state, commit = _ref5.commit;
                return _context4.abrupt("return", _next(state.paginator).then(setItems(commit)));

              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function next(_x5) {
        return _next2.apply(this, arguments);
      }

      return next;
    }(),
    prev: function () {
      var _prev2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(_ref6) {
        var state, commit;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                state = _ref6.state, commit = _ref6.commit;
                return _context5.abrupt("return", _prev(state.paginator).then(setItems(commit)));

              case 2:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function prev(_x6) {
        return _prev2.apply(this, arguments);
      }

      return prev;
    }(),
    update: function () {
      var _update = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(_ref7) {
        var state, commit;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                state = _ref7.state, commit = _ref7.commit;
                return _context6.abrupt("return", refresh(state.paginator).then(setItems(commit)));

              case 2:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function update(_x7) {
        return _update.apply(this, arguments);
      }

      return update;
    }()
  };
};
/**
 * Polls the paginator by interval
 * @param  {Function} paginator   The paginator
 * @param  {Function} setter   Update callback
 * @param  {Integer} duration Poll interval
 * @return {Function}  to stop the poll
 */

var poll = function poll(paginator, setter) {
  var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 15000;
  var handle = setInterval(function () {
    return paginator.update().then(setter);
  }, duration);
  return function () {
    clearInterval(handle);
  };
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

/**
 * Transform an Object to FormData
 * @param  {Object} formObj The Object
 * @return {FormData}
 */

var makeFormData = function makeFormData(formObj) {
  if (!isBrowser()) throw Error("`makeFormData` works only in browser enviroment.");
  var form = new FormData();

  for (var _i = 0, _Object$entries = Object.entries(formObj); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
        key = _Object$entries$_i[0],
        value = _Object$entries$_i[1];

    form.append(key, value);
  }

  return form;
};

exports.Checkable = Checkable;
exports.Editable = Editable;
exports.Pager = Pager;
exports.Visibility = Visibility;
exports.buildFromProto = buildFromProto;
exports.compose = compose;
exports.currency = currency;
exports.debug = debug;
exports.delay = delay;
exports.euro = euro;
exports.fetchData = fetchData;
exports.filterKeys = filterKeys;
exports.hasPrice = hasPrice;
exports.hasProp = hasProp;
exports.isBrowser = isBrowser;
exports.isDevelopment = isDevelopment;
exports.isEmail = isEmail;
exports.isImage = isImage;
exports.log = log;
exports.logError = logError;
exports.makeFormData = makeFormData;
exports.makeSlug = makeSlug;
exports.mapPaginationActions = mapPaginationActions;
exports.naira = naira;
exports.next = _next;
exports.numberFormat = numberFormat;
exports.onBackspace = onBackspace;
exports.onEnter = onEnter;
exports.pipe = pipe;
exports.poll = poll;
exports.prev = _prev;
exports.refresh = refresh;
exports.slugify = slugify;
exports.startStop = startStop;
exports.sumArray = sumArray;
exports.trace = trace;
exports.usd = usd;
