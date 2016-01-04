import tpl from 'lodash.template';

import Default from '../default';
import html from './template.html';

const template = tpl(html);

export default function RoofArea() {
  return Default(
    template,
    'roofArea'
  );
}
