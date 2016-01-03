function runWebpack(config) {
  const webpack = require('webpack');

  return new Promise((resolve, reject) => {
    webpack(config, (err, stats) => {
      if (err) {
        return reject(err);
      }

      resolve(stats.toString(config.stats));
    });
  });
}

export function webpackBuild() {
  const webpackConfig = require('../conf/makeWebpackConfig')();

  return runWebpack(webpackConfig);
}

export function webpackWatch() {
  const webpackConfig = require('../conf/makeWebpackConfig')({ WATCH: true });

  return runWebpack(webpackConfig);
}
