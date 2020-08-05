[![Build Status](https://travis-ci.org/wigxel/utils.svg?branch=dev)](https://travis-ci.org/wigxel/utils)
# utils
#### A collection of functions that makes building components a breeze.

### Setup
```bash
npm install --save @wigxel/utils
```
To enable logging do well to set the NODE_ENV variable to development. For example
```
#.env
NODE_ENV=development
```
OR
```json
{
	"scripts": {
		"dev": "NODE_ENV=development npm run start",
		"start": "...."
	}
}
```

### Transformers
#### Object to FormData
```javascript
	const formData = makeFormData({
		firstname: 'John',
		lastname: 'Philip',
		email: "john.philip",
		avatar: File,
	})
```