import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Store } from '../../store';
import { Guide } from '../Guide';
import './style.scss';

export const HorizontalGuides: FC = () => {
  const { horizontalGuides } = useSelector((store: Store) => store);

  return (
    <>
      {horizontalGuides.map(guide => (
        <Guide key={guide.position} isVertical={false} position={guide.position} />
      ))}
    </>
  );
};
