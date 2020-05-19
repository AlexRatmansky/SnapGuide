import { SnapGuide } from 'components/SnapGuide'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from 'store'
import { setEventListeners } from './events'

import './style.scss'

let rootEl = document.createElement('div')
rootEl.id = 'app'
document.body.appendChild(rootEl)

setEventListeners()

ReactDOM.render(
  <Provider store={store}>
    <SnapGuide />
  </Provider>,
  rootEl
)
