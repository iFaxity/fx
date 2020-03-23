import { directive } from './';
import { isObject, warn } from '@shlim/shared';

directive('bind', dir => {
  const { el } = dir;

  return (newValue: any) => {
    if (!isObject(newValue)) {
      return warn('Directive requires the expression value to be an object', 'v-bind (directive)');
    }

    for (const [key, value] of Object.entries(newValue)) {
      if (value) {
        const attr = el.getAttributeNode(key) ?? document.createAttribute(key);
        attr.value = value;
      } else {
        el.removeAttribute(key);
      }
    }
  };
});