import store from './store'
import _ from 'lodash';

function passMousePosition(eventData) {
  store.commit('updateMousePosition', eventData);
}

function passScrollPosition() {
  console.log('passScrollPosition');
  store.commit('updateScrollPosition', {
    scrollTop: window.pageYOffset,
    scrollLeft: window.pageXOffset
  });
}

function passUpdatedWindowSize() {
  console.log('passUpdatedWindowSize');
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

    // Space - for vertical
    case 'Space':
      e.preventDefault();
      store.commit('toggleLegend');
      break;

    default:
      break;
  }
}

const throttledPassMousePosition = _.throttle(passMousePosition, 100);
const throttledPassScrollPosition = _.throttle(passScrollPosition, 100);
const throttledPassUpdatedWindowSize = _.throttle(passUpdatedWindowSize, 100);
const throttledPassKeyPressEvent = _.throttle(passKeyPressEvent, 100);

export default function () {
  document.addEventListener('keydown', (e) => { throttledPassKeyPressEvent(e) }, { capture: true });
  document.addEventListener('mousemove', (e) => { throttledPassMousePosition(e) }, { capture: true });
  document.addEventListener('scroll', () => { throttledPassScrollPosition() }, { capture: true });
  window.addEventListener('resize', () => { throttledPassUpdatedWindowSize() }, { capture: true });
}

