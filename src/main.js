import Vue from 'vue'
import store from './store'
import SnapGuide from './components/SnapGuide.vue'
import _ from 'lodash';
import '../css/style.less';
import initEvents from './events.js'

initEvents();

let rootEl = document.createElement('div');
rootEl.id = 'app';
document.body.appendChild(rootEl);

let App = new Vue({

  el: '#app',
  store: store,
  data: {
    eventName: ''
  },

  template: '<SnapGuide :event-name=eventName />',

  components: { SnapGuide }
});

if (process.env.NODE_ENV === 'production') {
  chrome.runtime.onMessage.addListener(function (msg, _, sendResponse) {

    switch (msg) {
      case 'toggleActive':
        App.eventName = {
          name: 'toggleActive'
        };
        break;

      default:
        break;
    }

  });
}

function passKeyPressEvent(e) {

  switch (e.code) {
    // v - for vertical
    case 'KeyV':
      e.preventDefault();
      App.eventName = {
        name: 'toggleVerticalRule'
      };
      break;

    // h - for horizontal
    case 'KeyH':
      e.preventDefault();
      App.eventName = {
        name: 'toggleHorizontalRule'
      };
      App.$store.commit('increment');
      break;

    // q - for clean
    case 'KeyQ':
      e.preventDefault();
      App.eventName = {
        name: 'clearGuides'
      };
      break;

    // Arrow keys
    case 'ArrowUp':
      e.preventDefault();
      App.eventName = {
        name: 'arrowPositioning',
        direction: 'up',
        shiftKey: e.shiftKey
      };
      break;

    case 'ArrowDown':
      e.preventDefault();
      App.eventName = {
        name: 'arrowPositioning',
        direction: 'down',
        shiftKey: e.shiftKey
      };
      break;

    case 'ArrowLeft':
      e.preventDefault();
      App.eventName = {
        name: 'arrowPositioning',
        direction: 'left',
        shiftKey: e.shiftKey
      };
      break;

    case 'ArrowRight':
      e.preventDefault();
      App.eventName = {
        name: 'arrowPositioning',
        direction: 'right',
        shiftKey: e.shiftKey
      };
      break;

    default:
      break;
  }
}

const throttledPassKeyPressEvent = _.throttle(passKeyPressEvent, 100);

document.addEventListener('keydown', (e) => { throttledPassKeyPressEvent(e) }, { capture: true });
