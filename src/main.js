import Vue from 'vue'
import store from './store'
import SnapGuide from './components/SnapGuide.vue'
import _ from 'lodash';
import '../css/style.less';

let rootEl = document.createElement('div');
rootEl.id = 'app';
document.body.appendChild(rootEl);

let App = new Vue({

  el: '#app',
  store: store,
  data: {
    eventData: {},
    eventName: '',
    scrollPosition: {
      scrollTop: window.pageYOffset,
      scrollLeft: window.pageXOffset
    },
    windowSize: {
      width: window.innerWidth,
      height: window.innerHeight
    },
    count: store.state.count
  },

  template: '<SnapGuide :event-data=eventData :event-name=eventName :scroll-position=scrollPosition :window-size=windowSize />',

  components: { SnapGuide }
});

console.log(App);

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

document.addEventListener('mousemove', (e) => { passMousePosition(e) }, { capture: true });
document.addEventListener('scroll', () => { passScrollPosition() }, { capture: true });
document.addEventListener('resize', () => { passUpdatedWindowSize() }, { capture: true });
document.onkeydown = (e) => { passKeyPressEvent(e) };

passMousePosition = _.throttle(passMousePosition, 30);
passScrollPosition = _.throttle(passScrollPosition, 30);
passUpdatedWindowSize = _.throttle(passUpdatedWindowSize, 30);
passKeyPressEvent = _.throttle(passKeyPressEvent, 50);

function passMousePosition(eventData) {
  App.eventData = eventData;
}

function passScrollPosition() {
  App.scrollPosition = {
    scrollTop: window.pageYOffset,
    scrollLeft: window.pageXOffset
  }
}

function passUpdatedWindowSize() {
  App.windowSize = {
    width: window.innerWidth,
    height: window.innerHeight
  }
}

function passKeyPressEvent(e) {

  switch (e.code) {
    // Space - for vertical
    case 'Space':
      e.preventDefault();
      App.eventName = {
        name: 'toggleLegend'
      };
      break;

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