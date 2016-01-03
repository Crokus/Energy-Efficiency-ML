import animate from 'gsap-promise';
import sendChange from 'value-event/change';
import domify from 'domify';
import select from 'dom-select';
import elementClass from 'element-class';

import addListener from '../lib/addListener';
import { state, currentState } from '../state';
import { root } from './default.css';

export default function Default(template, dataKey, opt = {}) {
  if (!template) {
    throw new Error('Invalid `template` argument.');
  }

  if (!dataKey) {
    throw new Error('Invalid `dataKey` argument');
  }

  if (!opt.outputFormat && typeof opt.outputFormat !== 'function') {
    opt.outputFormat = (v) => v;
  }

  const key = dataKey;
  const body = document.body;

  let el, icon;
  let inputListener, changeListener;

  return {
    init(req, done) {
      const { channels, ...data } = currentState;

      el = domify(template({
        selectOpts: opt.selectOpts || {},
        outputFormat: opt.outputFormat,
        data: {
          [key]: data[key]
        }
      }));

      elementClass(el).add(root);

      inputListener = addListener(
        select('.js-input', el),
        'input',
        sendChange(channels.updateState)
      );

      changeListener = addListener(
        select('.js-input', el),
        'change',
        sendChange(channels.updateState)
      );

      const output = select('.js-output', el);

      icon = select('.js-icon', el);

      elementClass(body).add('ofH');
      body.appendChild(el);

      state(function(newValue) {
        requestAnimationFrame(() => {
          output.textContent = opt.outputFormat(newValue[key]);
        });
      });

      done();
    },

    animateIn(req, done) {
      const animations = [
        animate.to(el, .9, {
          y: 0,
          autoAlpha: 1,
          ease: Expo.easeInOut // eslint-disable-line no-undef
        }),
        animate.fromTo(icon, .35, {
          opacity: 0,
          scale: 0
        }, {
          opacity: 1,
          scale: 1,
          delay: .5,
          ease: Expo.easeOut // eslint-disable-line no-undef
        })
      ];

      animate.all(animations).then(() => {
        elementClass(body).remove('ofH');

        const focus = select('[autofocus]', el);

        if (focus) {
          focus.focus();
        }

        done();
      });
    },

    animateOut(req, done) {
      animate.to(el, .6, {
        y: 100,
        autoAlpha: 0,
        ease: Expo.easeInOut // eslint-disable-line no-undef
      }).then(done);
    },

    destroy(req, done) {
      inputListener.destroy();
      changeListener.destroy();

      el.parentNode.removeChild(el);

      done();
    }
  };
}
