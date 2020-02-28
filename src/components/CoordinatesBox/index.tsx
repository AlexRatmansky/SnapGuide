import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Store } from 'store';
import './style.scss';

export const CoordinatesBox: FC = () => {
  const { cursorPos } = useSelector((store: Store) => store);

  const cssObject = {
    left: this.cursorPos.x - this.$store.state.scrollPosition.scrollLeft + 'px',
    top: this.cursorPos.y - this.$store.state.scrollPosition.scrollTop + 'px',
  };

  return (
    <div className="coordinatesBoxContainer" style={cssObject}>
      <div className="coordinatesBox">
        <div className="horPosition">{cursorPos.x}</div>
        <div className="vertPosition">{cursorPos.y}</div>
      </div>
    </div>
  );
};
