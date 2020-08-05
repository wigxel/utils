import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

export default {
  input: './libs/all.js',
  output: {
    file: './index.js',
    format: 'cjs'
  },
  external: ['lodash'],
  plugins: [
    babel({
    	runtimeHelpers: true,
      exclude: "node_modules/**"
    }),
    resolve(),
  ]
};