export function cleanDist() {
  const del = require('del');

  return del([ 'dist/' ]);
}
