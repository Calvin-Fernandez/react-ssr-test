// rollup.config.js

const commonjs = require('rollup-plugin-commonjs');
const resolve = require('rollup-plugin-node-resolve');
const replace = require('rollup-plugin-replace');

const isProduction = false;
const isProfiling = false;

const { lstatSync, readdirSync, mkdirSync, existsSync } = require('fs')
const { join, parse } = require('path')

const isDirectory = source => lstatSync(source).isDirectory()
const getDirectories = source =>
  readdirSync(source)
	.map(name => join(source, name))
	.filter(isDirectory);

export default getDirectories('./test/')
	.map(dirname => {
    const dirnameWithoutTest = dirname.split('/').slice(1);

    const buildPath = './build/' + dirnameWithoutTest;
    const buildFile = buildPath + '/index.js';

    if (!existsSync(buildPath)) {
      mkdirSync(buildPath);
    }

    return {
      input: './' + dirname + '/index',
      output: {
        file: buildFile,
        // hack so we don't have a silly namespace
        name: "window",
        format: 'iife',
        extend: true,
        strict: false,
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
    }
  });
