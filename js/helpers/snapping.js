import {CONFIG}from '../config'

// elem
// elemRect
// bodyRect
// cursorPosX
// cursorPosY
export function checkSnap(params) {

  const bodyRect = params.bodyRect;
  const elemRect = params.elemRect;
  const elemStyles = window.getComputedStyle(params.elem);

  const top = Math.round(elemRect.top - bodyRect.top);
  const left = Math.round(elemRect.left - bodyRect.left);
  const right = left + elemRect.width;
  const bottom = top + elemRect.height;

  const paddingTop = parseInt(elemStyles.paddingTop);
  const paddingLeft = parseInt(elemStyles.paddingLeft);
  const paddingRight = parseInt(elemStyles.paddingRight);
  const paddingBottom = parseInt(elemStyles.paddingBottom);

  let newXPos = params.cursorPosX;
  let newYPos = params.cursorPosY;

  let isSnapped = false;
  const snapFactor = CONFIG.SNAP_FACTOR;

  if (checkTop(top, params.cursorPosY)) {
    newYPos = top;
    isSnapped = true;
  }
  if (checkLeft(left, params.cursorPosX)) {
    newXPos = left;
    isSnapped = true;
  }
  if (checkRight(right, params.cursorPosX)) {
    newXPos = right;
    isSnapped = true;
  }
  if (checkBottom(bottom, params.cursorPosY)) {
    newYPos = bottom;
    isSnapped = true;
  }
  if (checkTop(top + paddingTop, params.cursorPosY)) {
    newYPos = top + paddingTop;
    isSnapped = true;
  }
  if (checkLeft(left + paddingLeft, params.cursorPosX)) {
    newXPos = left + paddingLeft;
    isSnapped = true;
  }
  if (checkRight(right - paddingRight, params.cursorPosX)) {
    newXPos = right - paddingRight;
    isSnapped = true;
  }
  if (checkBottom(bottom - paddingBottom, params.cursorPosY)) {
    newYPos = bottom - paddingBottom;
    isSnapped = true;
  }

  if (getBaselineY(params.element)) {
    newYPos = getBaselineY(params.element) - bodyRect.top;
    isSnapped = true;
  }

  function checkTop(top, y) {
    return y <= top + snapFactor && y >= top - snapFactor
  }

  function checkLeft(left, x) {
    return x <= left + snapFactor && x >= left - snapFactor
  }

  function checkRight(right, x) {
    return x >= right - snapFactor && x <= right + snapFactor
  }

  function checkBottom(bottom, y) {
    return y >= bottom - snapFactor && y <= bottom + snapFactor
  }

  return {
    xPos: newXPos,
    yPos: newYPos,
    isSnapped: isSnapped
  };
}

function getBaselineY(target) {
  // TODO: подумать что можно сделать с таблицами>
  if (!target.hasChildNodes() || target.tagName === 'TABLE') {
    return null;
  }

  let children = target.childNodes;
  let child = null;

  for (let i = 0; i < children.length; ++i) {
    if (children[i].nodeType === Node.TEXT_NODE) {
      child = children[i];
      break;
    }
  }

  if (child === null) {
    return null;
  }

  let txt = document.createElement('span');

  txt.style.setProperty('display', 'inline-block', 'important');
  txt.style.setProperty('position', 'static', 'important');
  txt.style.setProperty('height', '1px', 'important');
  txt.style.setProperty('width', '1px', 'important');
  txt.style.setProperty('padding', '0', 'important');
  txt.style.setProperty('margin', '0', 'important');
  txt.style.setProperty('background-color', 'green', 'important');

  target.insertBefore(txt, child);

  let y = txt.getBoundingClientRect().top + 1;

  target.removeChild(txt);

  return y;
}
