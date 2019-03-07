import * as React from 'react';
import { mount } from 'enzyme';
import { keybind } from '../src';

interface Props {}
interface State {
  ans: string;
}

class C extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { ans: '' };

    Reflect.apply(this.esc, this, []);
  }

  @keybind('esc')
  // @ts-ignore
  esc() {
    console.log('aaa');
    this.setState({ ans: 'esc' });
  }

  render() {
    return <span id="res">{this.state.ans}</span>;
  }
}

test('press ESC key', () => {
  const wrapper = mount(<C />);

  expect(wrapper.find('#res').props().children).toBe('');
  wrapper.simulate('keyDown', {
    key: 'Escape'
  });

  expect(wrapper.find('#res').props().children).toBe('');
});
