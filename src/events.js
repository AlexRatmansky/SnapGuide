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

const throttledPassMousePosition = _.throttle(passMousePosition, 100);
const throttledPassScrollPosition = _.throttle(passScrollPosition, 100);
const throttledPassUpdatedWindowSize = _.throttle(passUpdatedWindowSize, 100);

export default function () {
  console.log('initEvents');
  document.addEventListener('mousemove', (e) => { throttledPassMousePosition(e) }, { capture: true });
  document.addEventListener('scroll', () => { throttledPassScrollPosition() }, { capture: true });
  window.addEventListener('resize', () => { throttledPassUpdatedWindowSize() }, { capture: true });
}

