import { CONFIG } from '../config';

export function checkSnap(params) {
  const { bodyRect, elem, elemRect, elemStyles, cursorPosX, cursorPosY } = params;

  const top = Math.round(elemRect.top - bodyRect.top);
  const bottom = Math.round(top + elemRect.height);
  const left = Math.round(elemRect.left - bodyRect.left);
  const right = Math.round(left + elemRect.width);

  const paddingTop = parseInt(elemStyles.paddingTop);
  const paddingBottom = parseInt(elemStyles.paddingBottom);
  const paddingLeft = parseInt(elemStyles.paddingLeft);
  const paddingRight = parseInt(elemStyles.paddingRight);

  const baselinePosition = getBaselineY(elem).map(item => Math.round(item - bodyRect.top));

  const hKeyPoints = [left, left + paddingLeft, right - paddingRight, right];

  const vKeyPoints = [top, top + paddingTop, ...baselinePosition, bottom - paddingBottom, bottom];

  const newXPos = checkKeyPointsForSnapping(cursorPosX, hKeyPoints);
  const newYPos = checkKeyPointsForSnapping(cursorPosY, vKeyPoints);

  return {
    xPos: newXPos !== null ? newXPos : cursorPosX,
    yPos: newYPos !== null ? newYPos : cursorPosY,
    isSnapped: newXPos !== null || newYPos !== null,
  };
}

function getBaselineY(targetElement) {
  let textNode = getTextNode(targetElement);

  if (textNode === null) return [];

  const emptySpan = document.createElement('span');
  emptySpan.classList.add('empty-span');

  targetElement.insertBefore(emptySpan, textNode);

  const yPosition = emptySpan.getBoundingClientRect().top + 1;

  const lh = parseInt(getComputedStyle(targetElement).lineHeight);

  const times = Math.floor(targetElement.clientHeight / lh);

  const arr = Array.from({ length: times }, (value, i) => yPosition + i * lh);

  targetElement.removeChild(emptySpan);

  return arr;
}

function getTextNode(targetElement) {
  if (!targetElement.hasChildNodes()) return null;
  if (targetElement.tagName === 'TABLE') return null; // TODO: подумать, что можно сделать с таблицами

  let childNodes = targetElement.childNodes;
  let textNode = null;

  for (let i = 0, len = childNodes.length; i < len; i++) {
    if (childNodes[i].nodeType === Node.TEXT_NODE && childNodes[i].textContent.match(/^(?!\s*$).+/g) !== null) {
      textNode = childNodes[i];
      break;
    }
  }

  return textNode;
}

function checkKeyPointsForSnapping(pointPos, arr) {
  for (let i = 0, len = arr.length; i < len; ++i) {
    if (isInSnapArea(pointPos, arr[i])) {
      return arr[i];
    }
  }

  return null;
}

function isInSnapArea(point, target) {
  return point >= target - CONFIG.SNAP_FACTOR && point <= target + CONFIG.SNAP_FACTOR;
}
