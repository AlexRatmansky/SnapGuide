import { CONFIG } from '../config'

function checkTop(top, y) {
  return y <= top + CONFIG.SNAP_FACTOR && y >= top - CONFIG.SNAP_FACTOR
}

function checkBottom(bottom, y) {
  return y >= bottom - CONFIG.SNAP_FACTOR && y <= bottom + CONFIG.SNAP_FACTOR
}

function checkLeft(left, x) {
  return x <= left + CONFIG.SNAP_FACTOR && x >= left - CONFIG.SNAP_FACTOR
}

function checkRight(right, x) {
  return x >= right - CONFIG.SNAP_FACTOR && x <= right + CONFIG.SNAP_FACTOR
}

function getBaselineY(target) {

  if (!target.hasChildNodes()) return null;

  // TODO: подумать что можно сделать с таблицами>
  if (target.tagName === 'TABLE') return null;

  let children = target.childNodes;
  let child = null;

  for (let i = 0; i < children.length; ++i) {
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

  let newXPos;
  let newYPos;

  const top = Math.round(elemRect.top - bodyRect.top);
  const bottom = top + elemRect.height;
  const left = Math.round(elemRect.left - bodyRect.left);
  const right = left + elemRect.width;

  const paddingTop = parseInt(elemStyles.paddingTop);
  const paddingBottom = parseInt(elemStyles.paddingBottom);
  const paddingLeft = parseInt(elemStyles.paddingLeft);
  const paddingRight = parseInt(elemStyles.paddingRight);

  const baselinePosition = Math.round(getBaselineY(elem) - bodyRect.top);

  let isSnapped = false;

  if (checkTop(top, cursorPosY)) {
    newYPos = top;
    isSnapped = true;
  } else if (checkBottom(bottom, cursorPosY)) {
    newYPos = bottom;
    isSnapped = true;
  }

  if (checkLeft(left, cursorPosX)) {
    newXPos = left;
    isSnapped = true;
  } else if (checkRight(right, cursorPosX)) {
    newXPos = right;
    isSnapped = true;
  }

  if (checkTop(top + paddingTop, cursorPosY)) {
    newYPos = top + paddingTop;
    isSnapped = true;
  } else if (checkBottom(bottom - paddingBottom, cursorPosY)) {
    newYPos = bottom - paddingBottom;
    isSnapped = true;
  }

  if (checkLeft(left + paddingLeft, cursorPosX)) {
    newXPos = left + paddingLeft;
    isSnapped = true;
  } else if (checkRight(right - paddingRight, cursorPosX)) {
    newXPos = right - paddingRight;
    isSnapped = true;
  }

  if (cursorPosY >= baselinePosition - CONFIG.SNAP_FACTOR && cursorPosY <= baselinePosition + CONFIG.SNAP_FACTOR) {
    newYPos = getBaselineY(elem) - bodyRect.top;
    isSnapped = true;
  }

  return {
    xPos: newXPos,
    yPos: newYPos,
    isSnapped: isSnapped
  };
}