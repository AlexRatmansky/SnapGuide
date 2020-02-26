import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface Props {
  name: string;
}

class App extends React.Component<Props> {
  render() {
    const { name } = this.props;
    return <div>Hello {name}</div>;
  }
}

let rootEl = document.createElement('div');
rootEl.id = 'app';
document.body.appendChild(rootEl);

ReactDOM.render(<App name="Jane" />, rootEl);
