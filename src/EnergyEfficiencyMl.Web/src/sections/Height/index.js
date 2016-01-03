import tpl from 'lodash.template';

import Default from '../default';
import html from './template.html';

const template = tpl(html);

export default function Height() {
  return Default(
    template,
    'overallHeight',
    {
      selectOpts: {
        'Small': 3.5,
        'Large': 7
      }
    }
  );
}
