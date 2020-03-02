import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Guide } from '~/components/Guide';
import { Store } from '~store';

export { PointerGuide };

const PointerGuide: FC = () => {
  const { crossPos } = useSelector((store: Store) => store);

  return (
    <>
      <Guide isVertical={true} position={crossPos.x} crossGuide={true} />
      <Guide isVertical={false} position={crossPos.y} crossGuide={true} />
    </>
  );
};
