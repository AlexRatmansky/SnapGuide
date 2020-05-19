import classNames from 'classnames'
import React, { FC, HTMLAttributes } from 'react'
import { useSelector } from 'react-redux'
import { Store } from 'store'
import style from './style.scss'

export { Guide }

interface Guide extends HTMLAttributes<HTMLElement> {
  isVertical?: boolean
  position?: number
  crossGuide?: boolean
}

const Guide: FC<Guide> = (props) => {
  const { isVertical, position, crossGuide } = props
  const { scrollPosition, crossPos } = useSelector((store: Store) => store)

  const text = crossGuide
    ? isVertical
      ? position + scrollPosition.scrollLeft
      : position + scrollPosition.scrollTop
    : position

  const classList = classNames({
    [style.guide]: true,
    [style.vertical]: isVertical,
    [style.horizontal]: !isVertical,
    [style.crossGuide]: crossGuide,
  })

  const cssObject = isVertical
    ? {
        left: position - (!crossGuide && scrollPosition.scrollLeft) + 'px',
        transformOrigin: '50% ' + crossPos.y + 'px',
      }
    : {
        top: position - (!crossGuide && scrollPosition.scrollTop) + 'px',
        transformOrigin: crossPos.x + 'px 50%',
      }

  return (
    <div className={classList} style={cssObject}>
      <div className={style.label}>{text}</div>
    </div>
  )
}
