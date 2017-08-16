import React from 'react';
import { mount } from 'enzyme';
import keybind from '../src';

class C extends React.Component {
  constructor() {
    super();

    this.state = { ans: '' };

    Reflect.apply(this.esc, this, []);
  }

  @keybind('esc')
  esc() {
    console.log('aaa');
    this.setState({ ans: 'esc' });
  }

  render() {
    return (
      <span id="res">{this.state.ans}</span>
    );
  }
}

test.skip('press ESC key', () => {
  const wrapper = mount(<C />);

  // expect(wrapper.find('#res').props().children).toBe('');
  wrapper.simulate('keyDown', {
    key: 'Escape'
  });

  console.log('=======');
  console.log(wrapper.find('#res').props().children);
  expect(wrapper.find('#res').props().children).toBe('');
});
