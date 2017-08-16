// @flow

import Mousetrap from 'mousetrap';

/**
 * decorator wrapper
 * @param {string} key - keyboard
 */
function outerDecorator(key: string) {
  return function innerDecorator(
    target: Object,
    name: string,
    descriptor: any // fix
  ) {
    return {
      configurable: true,
      enumerable  : descriptor.enumerable,
      get         : function getter() {
        Reflect.defineProperty(this, key, {
          configurable: true,
          enumerable  : descriptor.enumerable,
          value       : keybind(descriptor.value, key)
        });

        return this[key];
      }
    };
  };
}

/**
 * keybind
 * @param {Function} cb - decorator's callback
 * @param {string} key - keyboard
 */
function keybind(cb: Function, key: string) {

  /**
   * wrapper
   * @param {Array} args - arguments from `apply`
   */
  function keybindWrapper(...args: Array<any>) {
    Mousetrap.bind(key, () => Reflect.apply(cb, this, args));
  }

  return keybindWrapper;
}

export default outerDecorator;
