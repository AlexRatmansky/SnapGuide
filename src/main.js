import Vue from 'vue';
import store from './store';
import SnapGuide from './components/SnapGuide.vue';
import '../css/style.less';
import initEvents from './events.js';

initEvents();

let rootEl = document.createElement('div');
rootEl.id = 'app';
document.body.appendChild(rootEl);

new Vue({
  el: rootEl,
  store: store,
  template: '<SnapGuide />',
  components: { SnapGuide },
});

if (process.env.NODE_ENV === 'production') {
  chrome.runtime.onMessage.addListener(function(msg, _, sendResponse) {
    switch (msg) {
      case 'toggleActive':
        store.commit(toggleActive);
        break;

      default:
        break;
    }
  });
}
