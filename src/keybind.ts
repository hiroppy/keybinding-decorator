import * as Mousetrap from 'mousetrap';

interface KeybindWrapper {
  (): void;
  // unbind(): void;
}

/**
 * decorator wrapper
 * @param {string | string[]} key - keyboard
 */
export function outerDecorator(key: string | string[]) {
  return function innerDecorator(
    target: Object,
    name: string,
    descriptor: any // fix
  ) {
    return {
      configurable: true,
      enumerable: descriptor.enumerable,
      get: function getter(): KeybindWrapper {
        Reflect.defineProperty(this, key as any, {
          configurable: true,
          enumerable: descriptor.enumerable,
          value: keybind(descriptor.value, key)
        });

        // @ts-ignore
        return this[key];
      }
    };
  };
}

/**
 * keybind
 * @param {Function} cb - decorator's callback
 * @param {string | string[]} key - keyboard
 */
function keybind(cb: Function, key: string | string[]): KeybindWrapper {
  /**
   * wrapper
   * @param {Array} args - arguments from `apply`
   */
  function keybindWrapper(...args: Array<any>) {
    Mousetrap.bind(key, () => Reflect.apply(cb, this as any, args));
  }

  keybindWrapper.prototype.unbind = function unbind() {
    Mousetrap.unbind(key);
  };

  return keybindWrapper as any;
}
