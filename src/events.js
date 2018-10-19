import store from './store';
import _ from 'lodash';

function passMousePosition(eventData) {
  store.commit('updateMousePosition', eventData);
}

function passScrollPosition() {
  store.commit('updateScrollPosition', {
    scrollTop: window.pageYOffset,
    scrollLeft: window.pageXOffset
  });
}

function passUpdatedWindowSize() {
  store.commit('updateWindowSize', {
    width: window.innerWidth,
    height: window.innerHeight
  });
}

function passKeyPressEvent(e) {
  switch (e.code) {
    // v - for vertical
    case 'KeyV':
      e.preventDefault();
      store.commit('toggleVerticalRule');
      break;

    // h - for horizontal
    case 'KeyH':
      e.preventDefault();
      store.commit('toggleHorizontalRule');
      break;

    // q - for clean
    case 'KeyQ':
      e.preventDefault();
      store.commit('clearGuides');
      break;

    // Arrow keys
    case 'ArrowUp':
      e.preventDefault();
      store.commit('arrowPositioning', {
        direction: 'up',
        shiftKey: e.shiftKey
      });
      break;

    case 'ArrowDown':
      e.preventDefault();
      store.commit('arrowPositioning', {
        direction: 'down',
        shiftKey: e.shiftKey
      });
      break;

    case 'ArrowLeft':
      e.preventDefault();
      store.commit('arrowPositioning', {
        direction: 'left',
        shiftKey: e.shiftKey
      });
      break;

    case 'ArrowRight':
      e.preventDefault();
      store.commit('arrowPositioning', {
        direction: 'right',
        shiftKey: e.shiftKey
      });
      break;

    // Space - for vertical
    case 'Space':
      e.preventDefault();
      store.commit('toggleLegend');
      break;

    default:
      break;
  }
}

const throttledPassMousePosition = _.throttle(passMousePosition, 60);
const throttledPassScrollPosition = _.throttle(passScrollPosition, 60);
const throttledPassUpdatedWindowSize = _.throttle(passUpdatedWindowSize, 60);
const throttledPassKeyPressEvent = _.throttle(passKeyPressEvent, 60);

export default function () {
  document.addEventListener('keydown', (e) => { throttledPassKeyPressEvent(e) }, { capture: true });
  document.addEventListener('mousemove', (e) => { throttledPassMousePosition(e) }, { capture: true });
  document.addEventListener('scroll', () => { throttledPassScrollPosition() }, { capture: true });
  window.addEventListener('resize', () => { throttledPassUpdatedWindowSize() }, { capture: true });
}
