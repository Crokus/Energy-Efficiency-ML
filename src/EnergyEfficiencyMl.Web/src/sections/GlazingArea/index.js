import tpl from 'lodash.template';

import Default from '../default';
import html from './template.html';

const template = tpl(html);

export default function GlazingArea() {
  return Default(
    template,
    'glazingArea',
    {
      selectOpts: {
        '0%': 0,
        '10%': .1,
        '25%': .25,
        '40%': .4
      },
      outputFormat: (v) => v * 100
    }
  );
}
