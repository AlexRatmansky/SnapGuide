import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { CoordinatesBox } from '../../components/CoordinatesBox'
import { ElementHighlighter } from '../../components/ElementHighlighter'
import { Legend } from '../../components/Legend'
import { PointerGuide } from '../../components/PointerGuide'
import { Store } from '../../store'
import { HorizontalGuides } from './HorizontalGuides'
import style from './style.scss'
import { VerticalGuides } from './VerticalGuides'

export { SnapGuide }

const SnapGuide: FC = () => {
  const { elem, showLegend, showApp } = useSelector((store: Store) => store)

  return (
    showApp && (
      <div className={style.snapGuide}>
        <PointerGuide />

        <VerticalGuides />

        <HorizontalGuides />

        <CoordinatesBox />

        <ElementHighlighter elementProps={elem} />

        {showLegend && <Legend />}

        {/* <DebugDot /> */}
      </div>
    )
  )
}
