import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { Guide } from '../../components/Guide'
import { Store } from '../../store'
import './style.scss'

export { HorizontalGuides }

const HorizontalGuides: FC = () => {
  const { horizontalGuides } = useSelector((store: Store) => store)

  return (
    <>
      {horizontalGuides.map((guide) => (
        <Guide key={guide.position} isVertical={false} position={guide.position} />
      ))}
    </>
  )
}
