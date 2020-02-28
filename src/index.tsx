import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { SnapGuide } from 'components/SnapGuide';
import { store } from 'store';

let rootEl = document.createElement('div');
rootEl.id = 'app';
document.body.appendChild(rootEl);

ReactDOM.render(
  <Provider store={store}>
    <SnapGuide />
  </Provider>,
  rootEl
);
