import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { Store } from 'store'
import style from './style.scss'

export { DebugDot }

const DebugDot: FC = () => {
  const { scrollPosition, crossPos } = useSelector((store: Store) => store)

  const cssObject = {
    top: crossPos.y - scrollPosition.scrollTop + 'px',
    left: crossPos.x - scrollPosition.scrollLeft + 'px',
  }

  return <div className={style['debug-dot']} style={cssObject} />
}
