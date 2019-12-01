import _ from 'lodash'
import { pipe, hasProp } from './helpers';
import { log, trace } from './debuggers';
import { currency, numberFormat } from './numbers/currency';

const ProtoBuilderError = msg => new Error("ProtoBuildError: " + msg);

const throwIf = (validate, name = "ProtoBuilder") => a => {
  if (validate(a)) {
    throw ProtoBuilderError(`Invalid argument provided.
      Checker: ${name}
      Value: ${a}
    `);
  }

  return a;
};

const onlyObject = throwIf(a => !_.isObject(a), "Object Checker");

const notNull = throwIf(a => _.isNull(a) || _.isUndefined(a), "Null Checker");

/**
 * default type checking functions
 * @param {Function} cb 
 * 
 */
const checkDefault = cb => pipe(notNull, onlyObject, cb);

export const buildFromProto = (proto, obj) => Object.assign(
  Object.create(proto),
  obj,
)

const doToggle = (prop) => function doToggle() {
  this[prop] = !this[prop];
}

export const Visibility = checkDefault(data => ({
  visible: true,
  toggleVisibility: doToggle('visible'),
  ...data,
}));

/**
 * @param {Object} item
 * @returns 
 */
const checkForPrice = data => { 
  if (!hasProp(data, "getPrice"))
    throw ProtoBuilderError(
      "HasPrice proto requires a [getPrice] method, none provide"
    ); 

  if (!_.isFunction(data.getPrice))
    throw ProtoBuilderError('HasPrice requires [getPrice] to be a Function');

  return data;
};

export const hasPrice = pipe(notNull, onlyObject, checkForPrice, data => ({
  ...data,
  _getPrice(precision = 2) {
    return _.round(
      _.toNumber(this.getPrice()), 
      precision
    );
  },
  getFormattedPrice(precision) {    
    return numberFormat(this._getPrice(precision));
  },
}));

export const Checkable = checkDefault(data => ({
  checked: false,
  toggleCheck: doToggle('checked'),
  ...data,
}));

export const Editable = checkDefault((data) => ({
    edit: false,
    toggleEdit: doToggle('edit'),
    ...data,
  }))