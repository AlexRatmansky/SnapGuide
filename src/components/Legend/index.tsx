import React, { FC } from 'react';
import './style.scss';

export const Legend: FC = () => {
  return (
    <div className={'legendBoard'}>
      <div className={'textLine'}>
        <code>V</code> – add vertical rule
      </div>
      <div className={'textLine'}>
        <code>H</code> – add horizontal rule
      </div>
      <div className={'textLine'}>
        <code>Q</code> – remove all guides
      </div>
      <div className={'textLine'}>
        <code>←</code>,<code>↑</code>,<code>→</code>,<code>↓</code> – move cursor 1px (+<code>Shift</code> 10px)
      </div>
      <div className={'textLine'}>
        <code>Space</code> – toggle help
      </div>
    </div>
  );
};
