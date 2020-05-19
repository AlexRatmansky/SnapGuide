import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { Store } from 'store'
import style from './style.scss'

export { CoordinatesBox }

const CoordinatesBox: FC = () => {
  const { crossPos, scrollPosition } = useSelector((store: Store) => store)

  const cssObject = {
    left: crossPos.x + 'px',
    top: crossPos.y + 'px',
  }

  return (
    <div className={style.coordinatesBoxContainer} style={cssObject}>
      <div className={style.coordinatesBox}>
        <div className={style.horPosition}>{crossPos.x + scrollPosition.scrollLeft}</div>
        <div className={style.vertPosition}>{crossPos.y + scrollPosition.scrollTop}</div>
      </div>
    </div>
  )
}
