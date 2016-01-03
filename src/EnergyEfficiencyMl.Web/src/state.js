import Observ from 'observ';
import ObservThunk from 'observ-thunk';

import defineState from './lib/state';

// State - an observable, immutable model
const state = defineState({
  surfaceArea: Observ(0),
  wallArea: Observ(0),
  roofArea: Observ(0),
  glazingArea: Observ(0),
  overallHeight: Observ(3.5),

  // All state mutations that flow from UI events can only flow through channels
  channels: {
    updateState(state, data) {
      const key = Object.keys(data)[0];
      state[key].set(data[key] || 0);
    }
  }
});

let currentState = state();

state(ObservThunk(function(current) {
  currentState = current;
}));

export { state, currentState };
