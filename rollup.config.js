import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import sourceMaps from 'rollup-plugin-sourcemaps';
import json from 'rollup-plugin-json';
import typescript from 'rollup-plugin-typescript2';

const prettier = require('rollup-plugin-prettier');
import tslint from 'rollup-plugin-tslint';
import pkg from './package.json';

export default {
  input: 'src/main.ts',
  output: [
    {file: pkg.main, format: 'cjs'},
    {file: pkg.module, format: 'es'},
  ],
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  external: [],
  watch: {
    include: 'src/**',
  },
  plugins: [
    // Allow json resolution
    json(),
    prettier({
      tabWidth: 2,
      parser: 'babel',
      singleQuote: false,
    }),
    tslint(),
    // Compile TypeScript files
    typescript({useTsconfigDeclarationDir: true}),
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs(),
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    resolve(),

    // Resolve source maps to the original source
    sourceMaps(),
  ],
};
