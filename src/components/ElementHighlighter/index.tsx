import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { Store } from 'store'
import style from './style.scss'

export { ElementHighlighter }

interface ElementHighlighter {
  elementProps?: any
}

const ElementHighlighter: FC<ElementHighlighter> = (props) => {
  const { elementProps } = props
  const { scrollPosition } = useSelector((store: Store) => store)

  const borderBox =
    (elementProps !== undefined && {
      top: elementProps.top - scrollPosition.scrollTop,
      left: elementProps.left - scrollPosition.scrollLeft,
      width: elementProps.width,
      height: elementProps.height,
    }) ||
    undefined

  const paddingBox =
    (elementProps !== undefined &&
      elementProps.style && {
        top: elementProps.style.paddingTop || 0,
        left: elementProps.style.paddingLeft || 0,
        right: elementProps.style.paddingRight || 0,
        bottom: elementProps.style.paddingBottom || 0,
      }) ||
    undefined

  return (
    <div className={style.element} style={borderBox}>
      <div className={style.paddingBox} style={paddingBox} />
    </div>
  )
}
