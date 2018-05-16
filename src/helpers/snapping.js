import { CONFIG } from '../config'

function isInSnapArea(point, target) {
  return (point >= target - CONFIG.SNAP_FACTOR) && (point <= target + CONFIG.SNAP_FACTOR);
}

function getBaselineY(target) {

  if (!target.hasChildNodes()) return null;
  if (target.tagName === 'TABLE') return null; // TODO: подумать что можно сделать с таблицами

  let children = target.childNodes;
  let child = null;

  for (let i = 0, len = children.length; i < len; ++i) {
    if (children[i].nodeType === Node.TEXT_NODE) {
      child = children[i];
      break;
    }
  }

  if (child === null) return null;

  let emptySpan = document.createElement('span');

  emptySpan.style.setAttribute('class', 'empty-span');

  target.insertBefore(emptySpan, child);

  let y = emptySpan.getBoundingClientRect().top + 1;

  target.removeChild(emptySpan);

  return y;
}

export function checkSnap(params) {

  const {
    bodyRect,
    elem,
    elemRect,
    elemStyles,
    cursorPosX,
    cursorPosY
  } = params;

  const top = Math.round(elemRect.top - bodyRect.top);
  const bottom = top + elemRect.height;
  const left = Math.round(elemRect.left - bodyRect.left);
  const right = left + elemRect.width;

  const paddingTop = parseInt(elemStyles.paddingTop);
  const paddingBottom = parseInt(elemStyles.paddingBottom);
  const paddingLeft = parseInt(elemStyles.paddingLeft);
  const paddingRight = parseInt(elemStyles.paddingRight);

  const baselinePosition = Math.round(getBaselineY(elem) - bodyRect.top);

  let newXPos;
  let newYPos;
  let isSnapped = false;

  if (isInSnapArea(cursorPosY, top)) {
    newYPos = top;
    isSnapped = true;
  } else if (isInSnapArea(cursorPosY, bottom)) {
    newYPos = bottom;
    isSnapped = true;
  } else if (isInSnapArea(cursorPosY, top + paddingTop)) {
    newYPos = top + paddingTop;
    isSnapped = true;
  } else if (isInSnapArea(cursorPosY, bottom - paddingBottom)) {
    newYPos = bottom - paddingBottom;
    isSnapped = true;
  }

  if (isInSnapArea(cursorPosX, left)) {
    newXPos = left;
    isSnapped = true;
  } else if (isInSnapArea(cursorPosX, right)) {
    newXPos = right;
    isSnapped = true;
  } else if (isInSnapArea(cursorPosX, left + paddingLeft)) {
    newXPos = left + paddingLeft;
    isSnapped = true;
  } else if (isInSnapArea(cursorPosX, right - paddingRight)) {
    newXPos = right - paddingRight;
    isSnapped = true;
  }

  if (isInSnapArea(cursorPosY, baselinePosition)) {
    newYPos = baselinePosition;
    isSnapped = true;
  }

  return {
    xPos: newXPos,
    yPos: newYPos,
    isSnapped: isSnapped
  };
}