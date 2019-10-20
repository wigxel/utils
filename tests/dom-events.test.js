import test from 'tape';
import { onEnter } from '../libs/dom-events';

test('The onEnter function', (t) => {
	const pressEnter = { type: 'keypress', keyName: 'Enter', keyCode: 13, expects: true };
	const pressBackspace = { type: 'keyup', keyName: 'Backspace', keyCode: 8, expects: false };
	const click = { ...pressBackspace, type: 'click' };

	[pressEnter, pressBackspace].map((event) => {
		const msg = `The ${event.keyName} function works`
		onEnter(() => {
			event.expects ? t.pass(msg) : t.fail(msg);
		})(event)
	})

	t.throws(
		() => onEnter(null)(click),
		/works on these events/gi,
		'Throws error when event is incorrect.'
	)

	t.throws(
		() => onEnter(null)(pressBackspace),
		/of type `function`/gi,
		'Throws error when provided invalid callback.'
	)

	t.throws(
		() => onEnter(() => {})(null),
		/Invalid event passed/g,
		'Throws error when invalid event is passed.'		
	)

	t.end();
})