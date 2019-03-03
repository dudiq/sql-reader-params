import path from 'path';

import commonjs from 'rollup-plugin-commonjs';

import pkg from './package.json';

function resolveFile(file) {
  return path.resolve(__dirname, file);
}

const outputConf = {
  exports: 'named',
};

export default {
  input: resolveFile('./src/index.js'),
  plugins: [
    commonjs(),
  ],
  output: [
    {
      ...outputConf,
      file: resolveFile(pkg.main),
      name: pkg.name,
      format: 'cjs',
    },
    {
      ...outputConf,
      file: resolveFile(pkg.module),
      format: 'esm',
    },
  ],
};
