import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Guide } from 'components/Guide';
import styled from 'styled-components';

const Component: FC = () => {
  const { cursorPos, crossPos, elem, showLegend, verticalGuides, horizontalGuides, showApp } = useSelector(
    store => store
  );

  return (
    showApp && (
      <div inert>
        <Guide />
        <SG_Guide is-vertical="true" position="crossPos.x" cross-guide="true" />
        <SG_Guide is-vertical="false" position="crossPos.y" cross-guide="true" />

        <TransitionGroup name="list_vert" tag="div">
          <SG_Guide
            v-for="guidePos in verticalGuides"
            key="guidePos.position"
            position="guidePos.position"
            is-vertical="true"
          />
        </TransitionGroup>

        <TransitionGroup name="list_hor" tag="div">
          {horizontalGuides.map(guidePos => (
            <SG_Guide key="guidePos.position" position="guidePos.position" is-vertical="false" />
          ))}
        </TransitionGroup>

        <SG_CoordinatesBox />

        <SG_ElementHighlighter element-props="elem" />

        {showLegend && <SG_Legend />}
      </div>
    )
  );
};

export const SnapGuide = styled(Component)`
  pointer-events: none !important;
  font-family: Menlo, Consolas, Courier, monospace !important;
  font-size: 12px !important;
  will-change: transform;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 999999;

  & * {
    pointer-events: none !important;
  }
`;
