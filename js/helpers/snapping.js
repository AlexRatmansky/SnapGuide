import {CONFIG}from '../config'

export function checkSnap(element, xPos, yPos) {

  const bodyRect = document.body.getBoundingClientRect();
  const elemRect = element.getBoundingClientRect();
  const elemStyles = window.getComputedStyle(element);

  const top = Math.round(elemRect.top - bodyRect.top);
  const left = Math.round(elemRect.left - bodyRect.left);
  const right = left + elemRect.width;
  const bottom = top + elemRect.height;

  const paddingTop = parseInt(elemStyles.paddingTop);
  const paddingLeft = parseInt(elemStyles.paddingLeft);
  const paddingRight = parseInt(elemStyles.paddingRight);
  const paddingBottom = parseInt(elemStyles.paddingBottom);

  let newXPos = xPos;
  let newYPos = yPos;

  let isSnapped = false;
  const snapFactor = CONFIG.SNAP_FACTOR;

  if (checkTop(top, yPos)) {
    newYPos = top;
    isSnapped = true;
  }
  if (checkLeft(left, xPos)) {
    newXPos = left;
    isSnapped = true;
  }
  if (checkRight(right, xPos)) {
    newXPos = right;
    isSnapped = true;
  }
  if (checkBottom(bottom, yPos)) {
    newYPos = bottom;
    isSnapped = true;
  }
  if (checkTop(top + paddingTop, yPos)) {
    newYPos = top + paddingTop;
    isSnapped = true;
  }
  if (checkLeft(left + paddingLeft, xPos)) {
    newXPos = left + paddingLeft;
    isSnapped = true;
  }
  if (checkRight(right - paddingRight, xPos)) {
    newXPos = right - paddingRight;
    isSnapped = true;
  }
  if (checkBottom(bottom - paddingBottom, yPos)) {
    newYPos = bottom - paddingBottom;
    isSnapped = true;
  }

  if (getBaselineY(element)) {
    newYPos = getBaselineY(element) - bodyRect.top;
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
