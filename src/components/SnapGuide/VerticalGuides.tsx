import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Store } from '../../store';
import { Guide } from '../Guide';
import './style.scss';

export const VerticalGuides: FC = () => {
  const { verticalGuides } = useSelector((store: Store) => store);

  return (
    <>
      {verticalGuides.map(guide => (
        <Guide key={guide.position} isVertical position={guide.position} />
      ))}
    </>
  );
};
