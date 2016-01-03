export function makeDist() {
  const mkdirp = require('mkdirp');

  return new Promise((resolve, reject) => {
    mkdirp('dist/', (err) => err ? reject(err) : resolve());
  });
}
