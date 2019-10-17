const iterate = fn => (alloc, cur) => alloc + (fn ? fn(cur) : cur);

export const sumArray = (arr, fn) => arr.reduce(iterate(fn), 0);