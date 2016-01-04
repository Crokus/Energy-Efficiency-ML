import bigwheel from 'bigwheel';

const framework = bigwheel((done) => {
  done({
    overlap: false,
    routes: require('./routes').routes
  });
});

export default framework;
