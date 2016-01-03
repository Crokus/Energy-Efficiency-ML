export function browserSync() {
  const Browsersync = require('browser-sync');
  const spa = require('browser-sync-spa');
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackConfig = require('../conf/makeWebpackConfig')({ WATCH: true });

  return new Promise((resolve) => {
    const bundler = webpack(webpackConfig);
    const bs = Browsersync.create();
    
    bs.use(spa());

    bs.init({
      server: {
        baseDir: 'dist',
        middleware: [
          webpackDevMiddleware(bundler, {
            publicPath: webpackConfig.output.publicPath,
            stats: webpackConfig.stats
          }),
          webpackHotMiddleware(bundler)
        ]
      },

      // no need to watch '*.js' here, webpack will take care of it
      files: []
    }, () => {
      resolve(bs);
    });
  });
}
