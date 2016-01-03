export { cleanDist } from './clean';
export { makeDist } from './make';
export { copyAssets } from './copy';
export { webpackBuild, webpackWatch } from './webpack';
export { browserSync } from './browserSync';
export { eslint } from './lint';

export const setup = [
  exports.cleanDist,
  exports.makeDist,
  exports.copyAssets
];

export const build = [
  ...setup,
  exports.webpackBuild
];

export const dev = [
  ...setup,
  exports.webpackWatch,
  exports.browserSync
];
