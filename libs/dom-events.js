import { log } from './debuggers.js';
import { hasProp } from './helpers.js';


const forEvent = (evt, fn, event_whitelist) => {
	if (evt !== null && hasProp(evt, 'type')) {
		if (event_whitelist.includes(evt.type)) {
			fn(evt);
		} else if (hasProp(evt, 'keyCode')) {
  		throw Error('Function only works on these events [' + event_whitelist.join(',') + ']');
		}
	} else {
		throw Error('Invalid event passed');
	}
}

const keyboard = fn => evt => forEvent(evt, fn, ['keypress', 'keydown', 'keyup'])

/**
 * triggers callback function when the Enter key is pressed
 * @param {Function} fn the callback function
 * @returns Function
 */
export const onEnter = fn => keyboard(evt => {
	if (!(fn instanceof Function)) throw Error('first argument should be of type `function`');
  if (evt.keyCode === 13) {
  		fn(evt);
  }
})

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