const routes = {
  '/': '/surfaceArea',
  '404': '/surfaceArea',
  '/surfaceArea': {
    section: [
      require('./ui/nav'),
      require('./sections/SurfaceArea')
    ],
    title: 'Surface area'
  },
  '/wallArea': {
    section: [
      require('./ui/nav'),
      require('./sections/WallArea')
    ],
    title: 'Wall area'
  },
  '/roofArea': {
    section: [
      require('./ui/nav'),
      require('./sections/RoofArea')
    ],
    title: 'Roof area'
  },
  '/glazingArea': {
    section: [
      require('./ui/nav'),
      require('./sections/GlazingArea')
    ],
    title: 'Glazing area'
  },
  '/height': {
    section: [
      require('./ui/nav'),
      require('./sections/Height')
    ],
    title: 'Height'
  },
  '/result': {
    section: [
      require('./ui/nav'),
      require('./sections/Result')
    ],
    title: 'Result',
    useURL: false
  }
};

const navRoutes = Object.keys(routes).reduce((prev, routePath) => {
  if (routePath !== '/' && routePath !== '404') {
    prev.push({
      path: routePath,
      title: routes[routePath].title
    });
  }

  return prev;
}, []);

export {
  routes,
  navRoutes
};
