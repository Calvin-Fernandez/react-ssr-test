// rollup.config.js

const commonjs = require('rollup-plugin-commonjs');
const resolve = require('rollup-plugin-node-resolve');
const replace = require('rollup-plugin-replace');

const isProduction = false;
const isProfiling = false;

export default {
  input: './src/index',
  output: {
    file: './build/bundle.js',
    // hack so we don't have a silly namespace
    name: "window",
    format: 'iife',
    extend: true
  },
  plugins: [
    resolve(),
    commonjs(),
    replace({
      __DEV__: isProduction ? 'false' : 'true',
      __PROFILE__: isProfiling || !isProduction ? 'true' : 'false',
      'process.env.NODE_ENV': isProduction ? "'production'" : "'development'",
    })
  ]
};
