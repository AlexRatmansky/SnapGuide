import {
  arrowPositioning,
  clearGuides,
  store,
  toggleHorizontalRule,
  toggleLegend,
  toggleVerticalRule,
  updateMousePosition,
  updateScrollPosition,
  updateWindowSize,
} from './store';

function passMousePosition(eventData) {
  store.dispatch(updateMousePosition(eventData));
}

function passScrollPosition() {
  store.dispatch(
    updateScrollPosition({
      scrollTop: window.pageYOffset,
      scrollLeft: window.pageXOffset,
    })
  );
}

function passUpdatedWindowSize() {
  store.dispatch(
    updateWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  );
}

function passKeyPressEvent(e) {
  switch (e.code) {
    // v - for vertical
    case 'KeyV':
      e.preventDefault();
      store.dispatch(toggleVerticalRule());
      break;

    // h - for horizontal
    case 'KeyH':
      e.preventDefault();
      store.dispatch(toggleHorizontalRule());
      break;

    // q - for clean
    case 'KeyQ':
      e.preventDefault();
      store.dispatch(clearGuides());
      break;

    // Arrow keys
    case 'ArrowUp':
      e.preventDefault();
      store.dispatch(
        arrowPositioning({
          direction: 'up',
          shiftKey: e.shiftKey,
        })
      );
      break;

    case 'ArrowDown':
      e.preventDefault();
      store.dispatch(
        arrowPositioning({
          direction: 'down',
          shiftKey: e.shiftKey,
        })
      );
      break;

    case 'ArrowLeft':
      e.preventDefault();
      store.dispatch(
        arrowPositioning({
          direction: 'left',
          shiftKey: e.shiftKey,
        })
      );
      break;

    case 'ArrowRight':
      e.preventDefault();
      store.dispatch(
        arrowPositioning({
          direction: 'right',
          shiftKey: e.shiftKey,
        })
      );
      break;

    // Space - for vertical
    case 'Space':
      e.preventDefault();
      store.dispatch(toggleLegend());
      break;

    default:
      break;
  }
}

export const events = () => {
  document.addEventListener('keydown', e => requestAnimationFrame(() => passKeyPressEvent(e)), { capture: true });
  document.addEventListener('mousemove', e => requestAnimationFrame(() => passMousePosition(e)), { capture: true });
  document.addEventListener('scroll', () => requestAnimationFrame(passScrollPosition), { capture: true });
  window.addEventListener('resize', () => requestAnimationFrame(passUpdatedWindowSize), { capture: true });
};
