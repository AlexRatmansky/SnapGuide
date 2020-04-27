import React, { FC } from 'react'
import style from './style.scss'

export { Legend }

const Legend: FC = () => (
  <div className={style.legendBoard}>
    <LegendLine code={'V'} description={'add vertical rule'} />
    <LegendLine code={'H'} description={'add horizontal rule'} />
    <LegendLine code={'Q'} description={'remove all guides'} />
    <LegendLine code={'←, ↑, →, ↓'} description={'move cursor 1px (+ Shift 10px)'} />
    <LegendLine code={'Space'} description={'toggle help'} />
  </div>
)

interface LegendLine {
  code: string
  description: string
}

const LegendLine: FC<LegendLine> = ({ code, description }) => (
  <div className={style.textLine}>
    <code>{code}</code> – {description}
  </div>
)
