import animate from 'gsap-promise';
import domify from 'domify';
import tpl from 'lodash.template';

import request from '../../lib/request';
import { currentState } from '../../state';
import html from './template.html';

const template = tpl(html);

export default function Result() {
  let el;

  return {
    init(req, done) {
      const { channels, ...data } = currentState;

      const jsonPayLoad = {
        surfaceArea: parseFloat(data.surfaceArea),
        wallArea: parseFloat(data.wallArea),
        roofArea: parseFloat(data.roofArea),
        overallHeight: parseFloat(data.overallHeight),
        glazingArea: parseFloat(data.glazingArea)
      };

      console.log(jsonPayLoad);

      request({
        url: 'https://ee.local.powelasa.powel.com/api/heatingload',
        method: 'POST',
        json: jsonPayLoad
      })
        .then((result) => {
          console.log(result);
          el = domify(template({ result, data }));

          el.style.opacity = 0;

          document.body.appendChild(el);

          done();
        })
        .catch((err) => console.log(err)); // eslint-disable-line no-console
    },

    animateIn(req, done) {
      animate.to(el, .9, {
        y: 0,
        autoAlpha: 1,
        ease: Expo.easeInOut // eslint-disable-line no-undef
      }).then(done);
    },

    animateOut(req, done) {
      animate.to(el, .6, {
        y: 100,
        autoAlpha: 0,
        ease: Expo.easeInOut // eslint-disable-line no-undef
      }).then(done);
    },

    destroy(req, done) {
      el.parentNode.removeChild(el);

      done();
    }
  };
}
