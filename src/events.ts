import { checkSnap } from 'helpers/snapping'
import {
  arrowPositioning,
  clearGuides,
  Direction,
  store,
  toggleActive,
  toggleHorizontalRule,
  toggleLegend,
  toggleVerticalRule,
  updateCrossPos,
  updateCursorPos,
  updateElem,
  updateScrollPosition,
  updateWindowSize,
} from 'store'

function passMousePosition(eventData) {
  if (eventData === undefined) return

  const currElement = eventData.path[0] || undefined
  const bodyRect = document.body.getBoundingClientRect()
  const elemRect = currElement.getBoundingClientRect()
  const elemStyles = window.getComputedStyle(currElement)

  const scrollPosition = {
    scrollTop: window.pageYOffset,
    scrollLeft: window.pageXOffset,
  }

  const snapObj = checkSnap({
    elem: currElement,
    elemRect: elemRect,
    bodyRect: bodyRect,
    cursorPosX: eventData.pageX,
    cursorPosY: eventData.pageY,
    elemStyles: elemStyles,
  })

  const cursorPos = {
    x: Math.round(snapObj.xPos),
    y: Math.round(snapObj.yPos),
  }

  const crossPos = {
    x: Math.round(snapObj.xPos + bodyRect.left),
    y: Math.round(snapObj.yPos + bodyRect.top),
  }

  const elem = {
    top: Math.round(elemRect.top) + scrollPosition.scrollTop,
    left: Math.round(elemRect.left) + scrollPosition.scrollLeft,
    right: Math.round(elemRect.right) + scrollPosition.scrollLeft,
    bottom: Math.round(elemRect.bottom) + scrollPosition.scrollTop,
    width: elemRect.width,
    height: elemRect.height,
    style: {
      paddingTop: elemStyles.paddingTop,
      paddingLeft: elemStyles.paddingLeft,
      paddingRight: elemStyles.paddingRight,
      paddingBottom: elemStyles.paddingBottom,
    },
  }

  store.dispatch(updateCursorPos(cursorPos))
  store.dispatch(updateCrossPos(crossPos))
  store.dispatch(updateElem(elem))
}

function passScrollPosition() {
  const ScrollPosition = {
    scrollTop: window.pageYOffset,
    scrollLeft: window.pageXOffset,
  }

  store.dispatch(updateScrollPosition(ScrollPosition))
}

const passUpdatedWindowSize = () => {
  const windowSize = {
    width: window.innerWidth,
    height: window.innerHeight,
  }

  store.dispatch(updateWindowSize(windowSize))
}

function passKeyPressEvent(e) {
  switch (e.code) {
    // v - for vertical
    case 'KeyV':
      e.preventDefault()
      store.dispatch(toggleVerticalRule())
      break

    // h - for horizontal
    case 'KeyH':
      e.preventDefault()
      store.dispatch(toggleHorizontalRule())
      break

    // q - for clean
    case 'KeyQ':
      e.preventDefault()
      store.dispatch(clearGuides())
      break

    // Arrow keys
    case 'ArrowUp':
      e.preventDefault()
      store.dispatch(
        arrowPositioning({
          direction: Direction.UP,
          shiftKey: e.shiftKey,
        })
      )
      break

    case 'ArrowDown':
      e.preventDefault()
      store.dispatch(
        arrowPositioning({
          direction: Direction.DOWN,
          shiftKey: e.shiftKey,
        })
      )
      break

    case 'ArrowLeft':
      e.preventDefault()
      store.dispatch(
        arrowPositioning({
          direction: Direction.LEFT,
          shiftKey: e.shiftKey,
        })
      )
      break

    case 'ArrowRight':
      e.preventDefault()
      store.dispatch(
        arrowPositioning({
          direction: Direction.RIGHT,
          shiftKey: e.shiftKey,
        })
      )
      break

    // Space - for vertical
    case 'Space':
      e.preventDefault()
      store.dispatch(toggleLegend())
      break

    default:
      break
  }
}

const delayedPassMousePosition = (e) => requestAnimationFrame(() => passMousePosition(e))
const delayedPassScrollPosition = () => requestAnimationFrame(() => passScrollPosition())
const delayedPassUpdatedWindowSize = () => requestAnimationFrame(() => passUpdatedWindowSize())

export function setEventListeners() {
  document.addEventListener('keydown', passKeyPressEvent, { capture: true })
  document.addEventListener('mousemove', delayedPassMousePosition, { capture: true })
  document.addEventListener('scroll', delayedPassScrollPosition, { capture: true })
  window.addEventListener('resize', delayedPassUpdatedWindowSize, { capture: true })
}

if (process.env.NODE_ENV === 'production') {
  chrome.runtime.onMessage.addListener((msg) => {
    switch (msg) {
      case 'toggleActive':
        store.dispatch(toggleActive())
        if (store.getState().showApp) {
          document.addEventListener('keydown', passKeyPressEvent, { capture: true })
          document.addEventListener('mousemove', delayedPassMousePosition, { capture: true })
          document.addEventListener('scroll', delayedPassScrollPosition, { capture: true })
          window.addEventListener('resize', delayedPassUpdatedWindowSize, { capture: true })
        } else {
          document.removeEventListener('keydown', passKeyPressEvent, { capture: true })
          document.removeEventListener('mousemove', delayedPassMousePosition, { capture: true })
          document.removeEventListener('scroll', delayedPassScrollPosition, { capture: true })
          window.removeEventListener('resize', delayedPassUpdatedWindowSize, { capture: true })
        }
        break

      default:
        break
    }
  })
}
