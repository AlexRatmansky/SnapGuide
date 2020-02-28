import { CoordinatesBox } from 'components/CoordinatesBox';
import { ElementHighlighter } from 'components/ElementHighlighter';
import { Guide } from 'components/Guide';
import { Legend } from 'components/Legend';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Store } from 'store';
import './style';

export const SnapGuide: FC = () => {
  const { crossPos, elem, showLegend, verticalGuides, horizontalGuides, showApp } = useSelector(
    (store: Store) => store
  );

  return (
    showApp && (
      <div className={'snapGuide'}>
        <Guide isVertical={true} position={crossPos.x} crossGuide={true} />
        <Guide isVertical={false} position={crossPos.y} crossGuide={true} />

        {verticalGuides.map(x => (
          <Guide key={x.position} isVertical position={x.position} />
        ))}

        {horizontalGuides.map(x => (
          <Guide key={x.position} isVertical={false} position={x.position} />
        ))}

        <CoordinatesBox />

        <ElementHighlighter elementProps={elem} />

        {showLegend && <Legend />}
      </div>
    )
  );
};
