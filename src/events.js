import store from './store'
import _ from 'lodash';

// function passMousePosition(eventData) {
//   App.eventData = eventData;
// }

export function passScrollPosition() {
  console.log('scrollPosition');
  store.commit('updateScrollPosition', {
    scrollTop: window.pageYOffset,
    scrollLeft: window.pageXOffset
  });
}

export function passUpdatedWindowSize() {
  console.log('updateWindowSize');
  store.commit('updateWindowSize', {
    width: window.innerWidth,
    height: window.innerHeight
  });
}

// function passKeyPressEvent(e) {

//   switch (e.code) {
//     // Space - for vertical
//     case 'Space':
//       e.preventDefault();
//       App.eventName = {
//         name: 'toggleLegend'
//       };
//       break;

//     // v - for vertical
//     case 'KeyV':
//       e.preventDefault();
//       App.eventName = {
//         name: 'toggleVerticalRule'
//       };
//       break;

//     // h - for horizontal
//     case 'KeyH':
//       e.preventDefault();
//       App.eventName = {
//         name: 'toggleHorizontalRule'
//       };
//       store.commit('increment');
//       break;

//     // q - for clean
//     case 'KeyQ':
//       e.preventDefault();
//       App.eventName = {
//         name: 'clearGuides'
//       };
//       break;

//     // Arrow keys
//     case 'ArrowUp':
//       e.preventDefault();
//       App.eventName = {
//         name: 'arrowPositioning',
//         direction: 'up',
//         shiftKey: e.shiftKey
//       };
//       break;

//     case 'ArrowDown':
//       e.preventDefault();
//       App.eventName = {
//         name: 'arrowPositioning',
//         direction: 'down',
//         shiftKey: e.shiftKey
//       };
//       break;

//     case 'ArrowLeft':
//       e.preventDefault();
//       App.eventName = {
//         name: 'arrowPositioning',
//         direction: 'left',
//         shiftKey: e.shiftKey
//       };
//       break;

//     case 'ArrowRight':
//       e.preventDefault();
//       App.eventName = {
//         name: 'arrowPositioning',
//         direction: 'right',
//         shiftKey: e.shiftKey
//       };
//       break;

//     default:
//       break;
//   }
// }

// passMousePosition = _.throttle(passMousePosition, 30);
passScrollPosition = _.throttle(passScrollPosition, 100);
passUpdatedWindowSize = _.throttle(passUpdatedWindowSize, 100);
// passKeyPressEvent = _.throttle(passKeyPressEvent, 100);

// document.addEventListener('mousemove', (e) => { passMousePosition(e) }, { capture: true });
document.addEventListener('scroll', () => { passScrollPosition() }, { capture: true });
window.addEventListener('resize', () => { passUpdatedWindowSize() }, { capture: true });
// document.onkeydown = (e) => { passKeyPressEvent(e) };
