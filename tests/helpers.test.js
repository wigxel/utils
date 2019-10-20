import test from "tape";
import { hasProp } from '../libs/helpers';

test('the hasProp fn', (t) => {
	const foo = {
		a: 'Whe sent the fish',
		b: null,
		c: false,
	}

	t.plan(2)
	t.equals(hasProp(foo, 'a'), true, "The props exist")
	t.equals(hasProp(foo, 'd'), false, "The props doesn't exist")
})