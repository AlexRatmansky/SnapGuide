import { Guide } from 'components/Guide'
import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { Store } from 'store'
import './style.scss'

export { VerticalGuides }

const VerticalGuides: FC = () => {
  const { verticalGuides } = useSelector((store: Store) => store)

  return (
    <TransitionGroup>
      {verticalGuides.map((guide) => (
        <CSSTransition key={guide.position} timeout={250} classNames={'list_vert'}>
          <Guide key={guide.position} isVertical position={guide.position} />
        </CSSTransition>
      ))}
    </TransitionGroup>
  )
}
