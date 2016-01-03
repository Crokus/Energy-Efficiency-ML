const paths = [
  {
    src: 'src/assets',
    dest: 'dist/assets'
  }
];

export function copyAssets() {
  const cpr = require('cpr');

  return new Promise((rootResolve, rootReject) => {
    return Promise.all(
      paths.map((path) => {
        return new Promise((resolve, reject) => {
          cpr(path.src, path.dest, (err) => err ? reject(err) : resolve());
        });
      })
    )
    .then(rootResolve)
    .catch(rootResolve);
  });
}
