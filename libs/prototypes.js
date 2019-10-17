import _ from 'lodash'

export const buildFromProto = (proto, obj) => Object.assign(
  Object.create(proto),
  obj,
)

export const Visible = data => ({
  ...data,
  visible: true,
});

export const hasPrice = data => ({
  ...data,
  getPrice(precision = 2) {
    return _.round(parseFloat(this.price.$numberDecimal || this.price), precision)
  },
  getFormattedPrice(precision) {
    return `&#x20A6; ${this.getPrice(precision)}`;
  },
});

export const Checkable = data => ({
  ...data,
  checked: false,
});

export const Editable = data => ({
  ...data,
  edit: false,
  toggleEdit() {
    this.edit = !this.edit;
  },
});