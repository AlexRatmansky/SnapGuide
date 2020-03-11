import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Guide } from '~/components/Guide';
import { Store } from '~/store';

export { PointerGuide };

const PointerGuide: FC = () => {
  const { crossPos } = useSelector((store: Store) => store);

  let direction = getDirection(crossPos);

  return (
    <>
      {['left', 'right'].includes(direction) ? (
        <Guide isVertical={true} position={crossPos.x} crossGuide />
      ) : (
        <Guide isVertical={false} position={crossPos.y} crossGuide />
      )}
    </>
  );
};

let oldX = 0;
let oldY = 0;
let oldDirection = 0;

const getDirection = crossPos => {
  let direction;
  let directionX;
  let directionY;
  let diffX = 0;
  let diffY = 0;

  if (crossPos.x < oldX) {
    directionX = 'left';
    diffX = oldX - crossPos.x;
  } else if (crossPos.x > oldX) {
    directionX = 'right';
    diffX = crossPos.x - oldX;
  }

  if (crossPos.y < oldY) {
    directionY = 'top';
    diffY = oldY - crossPos.y;
  } else if (crossPos.y > oldY) {
    directionY = 'bottom';
    diffY = crossPos.y - oldY;
  }

  oldX = crossPos.x;
  oldY = crossPos.y;

  direction = diffX > diffY ? directionX : diffY > diffX ? directionY : oldDirection;
  oldDirection = direction;

  return direction;
};
