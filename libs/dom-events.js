/**
 * triggers callback function when the Enter key is pressed
 * @param {Function} fn the callback function
 * @returns Function
 */
export const onEnter = fn => evt => {
  if (evt.keyCode === 13) fn(evt);
};

/**
 * triggers callback function when the Enter key is pressed
 * @param {Function} fn the callback function
 * @returns Function
 */
export const onBackspace = fn => evt => {
  if (evt.keyCode === 8) fn(evt);
};

export default {
	onEnter,
	onBackspace
}