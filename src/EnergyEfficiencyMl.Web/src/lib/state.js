import extend from 'xtend';
import Observ from 'observ';
import ObservStruct from 'observ-struct';

import { Delegator } from './delegator';

function defineChannels(funcs, ctx) {
  return Object.keys(funcs).reduce((acc, name) => {
    const handle = Delegator.allocateHandle(funcs[name].bind(null, ctx));
    acc[name] = handle;
    
    return acc;
  }, {});
}

export default function defineState(data) {
  const copy = extend(data);
  const $channels = copy.channels;

  copy.channels = Observ(null);

  const observable = ObservStruct(copy);
  
  if ($channels) {
    observable.channels.set(defineChannels($channels, observable));
  }
  
  return observable;
}
