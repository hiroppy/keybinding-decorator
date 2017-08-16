import React from 'react';
import ReactDOM from 'react-dom';
import keybind from '../lib';

class Main extends React.Component {
  constructor() {
    super();

    this.state = {
      current: ''
    };

    // init
    // this.esc.apply(this);
    // this.csk.apply(this);

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
    return (
      <div>current: {this.state.current}</div>
    );
  }
}

const root = () => (
  <Main />
);

ReactDOM.render(
  root(),
  document.getElementById('root')
);
