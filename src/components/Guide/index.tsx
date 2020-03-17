import classNames from 'classnames';
import React, { FC, HTMLAttributes } from 'react';
import { useSelector } from 'react-redux';
import { Store } from '~/store';
import './style.scss';

export { Guide };

interface Guide extends HTMLAttributes<HTMLElement> {
  isVertical?: boolean;
  position?: number;
  crossGuide?: boolean;
}

const Guide: FC<Guide> = props => {
  const { isVertical, position, crossGuide } = props;
  const { scrollPosition, crossPos } = useSelector((store: Store) => store);

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
    ? {
        left: position - (!crossGuide && scrollPosition.scrollLeft) + 'px',
        transformOrigin: '50% ' + crossPos.y + 'px',
      }
    : {
        top: position - (!crossGuide && scrollPosition.scrollTop) + 'px',
        transformOrigin: crossPos.x + 'px 50%',
      };

  return (
    <div className={classList} style={cssObject}>
      <div className={'label'}>{text}</div>
    </div>
  );
};
