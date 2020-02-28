import classNames from 'classnames';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import './style.scss';

interface Guide {
  isVertical: boolean;
  position: number;
  guideAction: string;
  crossGuide: boolean;
}

export const Guide: FC<Guide> = props => {
  const { isVertical, position, guideAction, crossGuide } = props;
  const { scrollPosition } = useSelector(store => store);

  const text = isVertical
    ? position + (crossGuide && scrollPosition.scrollLeft)
    : position + (crossGuide && scrollPosition.scrollTop);

  const classList = classNames({
    ['guide']: true,
    ['vertical']: isVertical,
    ['horizontal']: !isVertical,
    ['crossGuide']: crossGuide,
  });

  const cssObject = isVertical
    ? { left: position - (!crossGuide && scrollPosition.scrollLeft) + 'px' }
    : { top: position - (!crossGuide && scrollPosition.scrollTop) + 'px' };

  return (
    <div className={classList} style={cssObject}>
      <div className={'label'}>{{ text }}</div>
    </div>
  );
};
