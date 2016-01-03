import framework from './framework';

framework.init();

if (module.hot) {
  module.hot.accept();
}
