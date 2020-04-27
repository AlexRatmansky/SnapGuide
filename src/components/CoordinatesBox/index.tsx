import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { Store } from '../../store'
import style from './style.scss'

export { CoordinatesBox }

const CoordinatesBox: FC = () => {
  const { cursorPos, scrollPosition } = useSelector((store: Store) => store)

  const cssObject = {
    left: cursorPos.x - scrollPosition.scrollLeft + 'px',
    top: cursorPos.y - scrollPosition.scrollTop + 'px',
  }

  return (
    <div className={style.coordinatesBoxContainer} style={cssObject}>
      <div className={style.coordinatesBox}>
        <div className={style.horPosition}>{cursorPos.x}</div>
        <div className={style.vertPosition}>{cursorPos.y}</div>
      </div>
    </div>
  )
}
