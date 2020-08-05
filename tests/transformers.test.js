import test from "tape";
import { makeFormData } from '../libs/transformers';

test('Object to FormData Transformer', (t) => {
	t.plan(1)
	const foo = {
		a: 'Whe sent the fish',
		b: null,
		c: false,
	}

	try {
		makeFormData({ name: 'John', age: 40 })
	} catch(err) {
		t.equals(err.message, '`makeFormData` works only in browser enviroment.', "Error message should match")
	}
})