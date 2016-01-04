import animate from 'gsap-promise';
import domify from 'domify';
import select from 'dom-select';
import elementClass from 'element-class';
import formatNumber from 'fnumber';
import tpl from 'lodash.template';

import request from '../../lib/request';
import { currentState } from '../../state';
import html from './template.html';
import { root } from '../default.css';

const template = tpl(html);
const body = document.body;

export default function Result() {
  let el, label;

  return {
    init(req, done) {
      const { channels, ...data } = currentState;

      const payload = {
        surfaceArea: parseFloat(data.surfaceArea),
        wallArea: parseFloat(data.wallArea),
        roofArea: parseFloat(data.roofArea),
        overallHeight: parseFloat(data.overallHeight),
        glazingArea: parseFloat(data.glazingArea)
      };

      request({
        url: 'http://localhost:57808/api/heatingload',
        method: 'POST',
        json: payload
      })
        .then((result) => {
          const efficiencyColors = {
            High: 'green100',
            Medium: 'orange100',
            Low: 'red100'
          };

          el = domify(template({
            result,
            data,
            formatNumber
          }));
          elementClass(el).add(root);

          label = select('.js-label', el);
          elementClass(label).add('fill-' + efficiencyColors[result.efficiency]);

          body.style.backgroundColor = '#fff';
          elementClass(body).add('ofH');
          body.appendChild(el);

          done();
        })
        .catch((err) => console.log(err)); // eslint-disable-line no-console
    },

    animateIn(req, done) {
      const d = .9;
      const animations = [
        animate.to(el, d, {
          y: 0,
          autoAlpha: 1,
          ease: Expo.easeInOut // eslint-disable-line no-undef
        }),
        animate.fromTo(label, .45, {
          opacity: 0,
          scale: 0
        }, {
          opacity: 1,
          scale: 1,
          delay: d,
          ease: Expo.easeOut // eslint-disable-line no-undef
        }),
        animate.fromTo(select('.js-consumption', el), .6, {
          opacity: 0,
          y: 50
        }, {
          opacity: 1,
          y: 0,
          delay: d * 2,
          ease: Expo.easeOut // eslint-disable-line no-undef
        }),
        animate.fromTo(select('.js-data', el), .6, {
          opacity: 0,
          y: 100
        }, {
          opacity: 1,
          y: 0,
          delay: d * 3,
          ease: Expo.easeOut // eslint-disable-line no-undef
        }),
        animate.to(body, .6, {
          backgroundColor: '#ebebe8',
          ease: Linear.easeNone // eslint-disable-line no-undef
        })
      ];

      animate.all(animations).then(() => {
        elementClass(body).remove('ofH');
        done();
      });
    },

    animateOut(req, done) {
      const animations = [
        animate.to(el, .6, {
          y: 100,
          autoAlpha: 0,
          ease: Expo.easeInOut // eslint-disable-line no-undef
        }),
        animate.to(body, .6, {
          backgroundColor: '#fff',
          ease: Linear.easeNone // eslint-disable-line no-undef
        })
      ];

      animate.all(animations).then(done);
    },

    destroy(req, done) {
      el.parentNode.removeChild(el);

      done();
    }
  };
}
