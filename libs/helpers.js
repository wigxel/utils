export const isBrowser = new Function("try {return this===window;}catch(e){ return false;}");

export const slugify = text => {
  const a = 'àáäâãåăæçèéëêǵḧìíïîḿńǹñòóöôœṕŕßśșțùúüûǘẃẍÿź·/_,:;';
  const b = 'aaaaaaaaceeeeghiiiimnnnoooooprssstuuuuuwxyz------';
  const p = new RegExp(a.split('').join('|'), 'g');

  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with ‘and’
    .replace(/[^\w-]+/g, '') // Remove all non-word characters
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
};

export const makeSlug = (name, id) => {
  if (name) {
    return `${slugify(name)}-${id}`;
  }

  return '';
};

// eslint-disable-next-line
export const filterKeys = (object = {}, keys = [], negate = false) => {
  return Object.entries(object).reduce((alloc, [key, value]) => {
    const cond = negate ? !keys.includes(key) : keys.includes(key);
    if (cond) alloc[key] = value;
    return alloc;
  }, {});
};

export const isImage = (mimeType = '') => {
  return /image\/(jpeg|png|jpg)/g.test(mimeType);
}

export const isEmail = (email) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);

export const hasProp = (obj, a) => Object.hasOwnProperty.call(obj, a);

export const compose = (...args) => x => args.reduceRight((a, fn) => {
  return fn(a);
}, x);

export const pipe = (...args) => x => args.reduce((a, fn) => {
  return fn(a);
}, x);

/**
 * Delays before running running
 * e.g await delay(3000)
 * 
 * @param {Integer} duration The duration of the delay
 * 
 * @return {Promise}  promise resolves after the duration
 */
export const delay = duration => new Promise((res) => {
  setTimeout(res, duration);
})