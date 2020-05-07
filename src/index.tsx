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

ReactDOM.render(
  <Provider store={store}>
    <SnapGuide />
  </Provider>,
  rootEl
)
setEventListeners()

// if (process.env.NODE_ENV === 'production') {
//     chrome.runtime.onMessage.addListener(function(msg, _, sendResponse) {
//         switch (msg) {
//             case 'toggleActive':
//                 store.commit(toggleActive);
//                 break;
//
//             default:
//                 break;
//         }
//     });
// }
