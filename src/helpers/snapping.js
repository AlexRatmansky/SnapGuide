import { CONFIG } from '../config'

function isInSnapArea(point, target) {
  return (point >= target - CONFIG.SNAP_FACTOR) && (point <= target + CONFIG.SNAP_FACTOR);
}

function checkKeyPointsForSnapping(pointPos, arr) {

  for (let i = 0, len = arr.length; i < len; i++) {
    if (isInSnapArea(pointPos, arr[i])) return arr[i]
  }

  return null;
}

function getBaselineY(target) {

  if (!target.hasChildNodes()) return null;
  if (target.tagName === 'TABLE') return null; // TODO: подумать что можно сделать с таблицами

  let childNodes = target.childNodes;
  let textNode = null;

  for (let i = 0, len = childNodes.length; i < len; ++i) {
    if (childNodes[i].nodeType === Node.TEXT_NODE) {
      textNode = childNodes[i];
      break;
    }
  }

  if (textNode === null) return null;

  let emptySpan;
  let yPosition;

  emptySpan = document.createElement('span');
  emptySpan.classList.add('empty-span');

  target.insertBefore(emptySpan, textNode);

  yPosition = emptySpan.getBoundingClientRect().top + 1;

  target.removeChild(emptySpan);

  return yPosition;
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
  const bottom = Math.round(top + elemRect.height);
  const left = Math.round(elemRect.left - bodyRect.left);
  const right = Math.round(left + elemRect.width);

  const paddingTop = parseInt(elemStyles.paddingTop);
  const paddingBottom = parseInt(elemStyles.paddingBottom);
  const paddingLeft = parseInt(elemStyles.paddingLeft);
  const paddingRight = parseInt(elemStyles.paddingRight);

  const baselinePosition = Math.round(getBaselineY(elem) - bodyRect.top);

  const hKeyPoints = [
    left,
    left + paddingLeft,
    right - paddingRight,
    right
  ];

  const vKeyPoints = [
    top,
    top + paddingTop,
    baselinePosition,
    bottom - paddingBottom,
    bottom
  ];

  const newXPos = checkKeyPointsForSnapping(cursorPosX, hKeyPoints);
  const newYPos = checkKeyPointsForSnapping(cursorPosY, vKeyPoints);

  const isSnapped = newXPos !== null || newYPos !== null;

  return {
    xPos: isSnapped ? newXPos : cursorPosX,
    yPos: isSnapped ? newYPos : cursorPosY,
    isSnapped: isSnapped
  };
}