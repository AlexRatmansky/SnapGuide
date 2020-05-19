import { Guide } from 'components/Guide'
import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { Store } from 'store'
import './style.scss'

export { HorizontalGuides }

const HorizontalGuides: FC = () => {
  const { horizontalGuides } = useSelector((store: Store) => store)

  return (
    <TransitionGroup>
      {horizontalGuides.map((guide) => (
        <CSSTransition key={guide.position} timeout={250} classNames={'list_hor'}>
          <Guide isVertical={false} position={guide.position} />
        </CSSTransition>
      ))}
    </TransitionGroup>
  )
}
