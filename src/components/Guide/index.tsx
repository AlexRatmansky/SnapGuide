import classNames from 'classnames';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Store } from '~store';
import './style.scss';

export { Guide };

interface Guide {
  isVertical?: boolean;
  position?: number;
  crossGuide?: boolean;
}

const Guide: FC<Guide> = props => {
  const { isVertical, position, crossGuide } = props;
  const { scrollPosition } = useSelector((store: Store) => store);

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
      <div className={'label'}>{text}</div>
    </div>
  );
};
