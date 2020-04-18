import { directive } from '../compiler';
import { unRef } from '@shlim/fx';

directive('if', dir => {
  const { el, arg } = dir;
  const invert = arg == 'not';
  const ref = document.createComment('');
  let node: HTMLElement|Comment = el;

  return (pending) => {
    const value = unRef(pending);
    const newNode = (invert ? !value : !!value) ? el : ref;
    if (newNode !== node) {
      node.parentNode?.replaceChild(newNode, node);
      node = newNode;
    }
  };
});
