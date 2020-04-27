import { checkSnap } from './helpers/snapping'
import {
  arrowPositioning,
  clearGuides,
  store,
  toggleHorizontalRule,
  toggleLegend,
  toggleVerticalRule,
  updateCrossPos,
  updateCursorPos,
  updateElem,
  updateScrollPosition,
  updateWindowSize,
} from './store'

function passMousePosition(eventData) {
  if (eventData === undefined) return

  const currElement = eventData.path[0] || undefined
  const bodyRect = document.body.getBoundingClientRect()
  const elemRect = currElement.getBoundingClientRect()
  const elemStyles = window.getComputedStyle(currElement)

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

  let left = Math.round(elemRect.left)
  let top = Math.round(elemRect.top)

  const elem = {
    top: top,
    left: left,
    right: left + elemRect.width,
    bottom: top + elemRect.height,
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
          direction: 'up',
          shiftKey: e.shiftKey,
        })
      )
      break

    case 'ArrowDown':
      e.preventDefault()
      store.dispatch(
        arrowPositioning({
          direction: 'down',
          shiftKey: e.shiftKey,
        })
      )
      break

    case 'ArrowLeft':
      e.preventDefault()
      store.dispatch(
        arrowPositioning({
          direction: 'left',
          shiftKey: e.shiftKey,
        })
      )
      break

    case 'ArrowRight':
      e.preventDefault()
      store.dispatch(
        arrowPositioning({
          direction: 'right',
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

export const setEventListeners = () => {
  document.addEventListener('keydown', (e) => requestAnimationFrame(() => passKeyPressEvent(e)), { capture: true })
  document.addEventListener('mousemove', (e) => requestAnimationFrame(() => passMousePosition(e)), { capture: true })
  document.addEventListener('scroll', () => requestAnimationFrame(passScrollPosition), { capture: true })
  window.addEventListener('resize', () => requestAnimationFrame(passUpdatedWindowSize), { capture: true })
}
