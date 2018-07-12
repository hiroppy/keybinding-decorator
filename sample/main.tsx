import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { keybind } from '../lib';

interface State {
  current: string;
}

class Main extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      current: ''
    };

    // init
    Reflect.apply(this.csk, this, []);
    Reflect.apply(this.esc, this, []);
  }

  componentWillUnmount() {
    this.esc.unbind();
    this.csk.unbind();
  }

  @keybind('command+shift+k')
  csk() {
    this.setState({ current: 'command+shift+k' });
  }

  @keybind('esc')
  esc() {
    this.setState({ current: 'esc' });
  }

  render() {
    return <div>current: {this.state.current}</div>;
  }
}

const root = () => <Main />;

ReactDOM.render(root(), document.body);
