import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Store } from '../../store';
import { CoordinatesBox } from '../CoordinatesBox';
import { ElementHighlighter } from '../ElementHighlighter';
import { Legend } from '../Legend';
import { PointerGuide } from '../PointerGuide';
import { HorizontalGuides } from './HorizontalGuides';
import './style.scss';
import { VerticalGuides } from './VerticalGuides';

export const SnapGuide: FC = () => {
  const { elem, showLegend, showApp } = useSelector((store: Store) => store);

  return (
    showApp && (
      <div className={'snapGuide'}>
        <PointerGuide />

        <VerticalGuides />

        <HorizontalGuides />

        <CoordinatesBox />

        <ElementHighlighter elementProps={elem} />

        {showLegend && <Legend />}
      </div>
    )
  );
};
