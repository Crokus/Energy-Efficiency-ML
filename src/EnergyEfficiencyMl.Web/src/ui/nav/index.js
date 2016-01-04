import domify from 'domify';
import select from 'dom-select';
import elementClass from 'element-class';
import tpl from 'lodash.template';
import pluck from 'lodash.pluck';

import framework from '../../framework';
import addListener from '../../lib/addListener';
import { navRoutes } from '../../routes';

import html from './template.html';
import logoSrc from './logo.png';

const template = tpl(html);

export default function UiHeader() {
  let el;
  let navNextListener, navPrevListener, navCancelListener;

  return {
    init(req, done) {
      const traverse = traversePaths(navRoutes, req.route);
      const prevRoute = traverse.prev();
      const nextRoute = traverse.next();
      const currentRoute = req.route;
      const isFinalRoute = (currentRoute === navRoutes[navRoutes.length - 1].path);

      el = domify(template({
        logoSrc,
        navRoutes,
        prevRoute,
        nextRoute,
        currentRoute,
        isFinalRoute
      }));

      const prevButton = select('.js-navPrev', el);
      const nextButton = select('.js-navNext', el);
      const cancelButton = select('.js-navCancel', el);

      navNextListener = nextButton && addListener(
        nextButton,
        'click',
        function navNextHandler(e) {
          e.preventDefault();

          nextRoute && framework.go(nextRoute);
        }
      );

      navPrevListener = prevButton && addListener(
        prevButton,
        'click',
        function navPrevHandler(e) {
          e.preventDefault();

          prevRoute && framework.go(prevRoute);
        }
      );

      navCancelListener = cancelButton && addListener(
        cancelButton,
        'click',
        function navCancelHandler(e) {
          e.preventDefault();

          window.location.href = '/';
        }
      );

      document.body.appendChild(el);

      done();
    },

    animateIn(req, done) {
      elementClass(select('.js-currentRoute', el)).add('steps-label--is-active');

      done();
    },

    animateOut(req, done) {
      done();
    },

    destroy(req, done) {
      navNextListener && navNextListener.destroy();
      navPrevListener && navPrevListener.destroy();
      navCancelListener && navCancelListener.destroy();

      el.parentNode.removeChild(el);

      done();
    }
  };
}

function traversePaths(routes, startPath) {
  const i = pluck(routes, 'path').indexOf(startPath);

  return {
    next() {
      return i !== -1 && routes[i + 1] && routes[i + 1].path;
    },
    prev() {
      return i !== -1 && routes[i - 1] && routes[i - 1].path;
    }
  };
}
