import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

export default [{
	input: 'src/browser.js',
	output: [{
		format: 'umd',
		file: pkg.unpkg,
		name: "Mfers",
		sourcemap: false,
		plugins: [terser()]
	}, {
		format: 'esm',
		file: pkg.browser,
		sourcemap: false,
	}, {
		format: 'esm',
		file: 'dist/es.min.js',
		sourcemap: false,
		plugins: [terser()]
	}],
	external: {
		...require('module').builtinModules,
		...Object.keys(pkg.dependencies || {}),
		...Object.keys(pkg.peerDependencies || {}),
	}
}, {
  input: 'src/node.js',
  output: [{
		format: 'esm',
		file: pkg.module,
		sourcemap: false,
	}, {
		format: 'cjs',
		file: pkg.main,
		sourcemap: false,
	}],
	external: [
		...require('module').builtinModules,
		...Object.keys(pkg.dependencies || {}),
		...Object.keys(pkg.peerDependencies || {}),
	]
}]
