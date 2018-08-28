// rollup.config.js
//

const commonjs = require('rollup-plugin-commonjs');
const resolve = require('rollup-plugin-node-resolve');
const replace = require('rollup-plugin-replace');

const isProduction = false;
const isProfiling = false;

export default {
  input: './src/index',
  output: {
    file: './build/bundle.js',
    name: "SSR",
    format: 'iife'
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
