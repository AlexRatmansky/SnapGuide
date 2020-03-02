import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Store } from '../../store';
import { Guide } from '../Guide';

export const PointerGuide: FC = () => {
  const { crossPos } = useSelector((store: Store) => store);

  return (
    <>
      <Guide isVertical={true} position={crossPos.x} crossGuide={true} />
      <Guide isVertical={false} position={crossPos.y} crossGuide={true} />
    </>
  );
};
