import store from './store'
import _ from 'lodash';

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

const throttledPassScrollPosition = _.throttle(passScrollPosition, 100);
const throttledPassUpdatedWindowSize = _.throttle(passUpdatedWindowSize, 100);

export default function () {
  console.log('initEvents');
  document.addEventListener('scroll', () => { throttledPassScrollPosition() }, { capture: true });
  window.addEventListener('resize', () => { throttledPassUpdatedWindowSize() }, { capture: true });
}

