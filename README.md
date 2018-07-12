<div align="center">
  <h1>keybinding-decorator</h1>
</div>

<div align="center">
  <strong>Decorator for Keybinding</strong>
</div>

[![Build Status](https://travis-ci.org/abouthiroppy/keybinding-decorator.svg?branch=master)](https://travis-ci.org/abouthiroppy/keybinding-decorator)
[![npm version](https://badge.fury.io/js/keybinding-decorator.svg)](https://badge.fury.io/js/keybinding-decorator)

keybinding-decorator is using [Mousetrap](https://github.com/ccampbell/mousetrap).

Decorators offer a convenient declarative syntax to modify the shape of class declarations.  
see: https://tc39.github.io/proposal-decorators/

You must use `babel-plugin-transform-decorators-legacy`.

## Install

```
$ npm install keybinding-decorator --save
```

## Usage

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import keybind from 'keybinding-decorator';

class Main extends React.Component {
  constructor() {
    super();

    this.state = { current: '' };

    // init
    Reflect.apply(this.csk, this, []);
    Reflect.apply(this.esc, this, []);
  }

  @keybind('command+shift+k')
  csk() {
    this.setState({ current: 'command+shift+k' });
  }

  @keybind('esc')
  esc() {
    this.setState({ current: 'esc' });
  }

  componentWillUnmount() {
    this.esc.unbind();
    this.csk.unbind();
  }

  render() {
    return <div>current: {this.state.current}</div>;
  }
}

const root = () => <Main />;

ReactDOM.render(root(), document.getElementById('root'));
```

## Method

### unbind()

A method binded by `decorator` has `unbind` method.  
Release this function from Mousetrap.
