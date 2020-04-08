import { Template, TemplateCompiler, TemplateCache, unroll } from './template';
import { isFunction, isObject } from '@shlim/shared';
export { defaultCompiler, TemplatePatcher } from './compiler';
import { clearNode } from './shared';
export { Template, TemplateCompiler };

type RootContainer = Element|ShadowRoot|DocumentFragment;
const rendered = new WeakMap<RootContainer, TemplateCache>();

const { html, svg, render } = customize();
export { html, svg, render };

type TemplateFor<T, R> = (item: T, idx: number) => R;
export interface TemplateLiteral {
  /**
   * Creates a template from a string literal
   */
  (strings: TemplateStringsArray, ...values: any[]): Template;

  /**
   * Creates templates from an iterable list of items
   * @param {*} items Array or any iterable
   * @param {Function} key Key function or templateFn if it's omitted.
   * @param {Function} [templateFn] Function to return a template for each item value
   */
  for<T>(
    items: Iterable<T>,
    key: TemplateFor<T, any>,
    templateFn?: TemplateFor<T, Template>
  ): (Node|Template)[];

  // Resolves promises and renders fallback content
  //until(...promises)
}

interface CustomizeOptions<T extends Partial<TemplateLiteral>> {
  compiler?: TemplateCompiler,
  literals?: T,
}

export function customize<T extends TemplateLiteral>(opts: CustomizeOptions<T> = {}) {
  const { compiler } = opts;

  function render(template: Template, root: RootContainer): void {
    if (template instanceof Template) {
      let cache = rendered.get(root);
      if (!cache) {
        rendered.set(root, (cache = new TemplateCache()));
      }

      const node = unroll(template, cache, compiler);
      if (cache.node != node) {
        cache.node = node;
        clearNode(root);
        root.appendChild(node.valueOf() as Node);
      }
    } else if (template == null) {
      const cache = rendered.get(root);

      // Cleanup root and clear node from cache
      if (cache) {
        cache.node = null;
        clearNode(root);
      }
    } else {
      throw new TypeError('Template renderer can expects a valid Template as it\'s first argument');
    }
  }

  return {
    /**
     * Renders a template to a specific root container
     * @param {Template} template
     * @param {HTMLElement|ShadowRoot|DocumentFragment} root
     */
    render,
    /**
     * Creates a template with html content
     */
    html: createLiteral<T>('html', opts),
    /**
     * Creates a template with svg content
     */
    svg: createLiteral<T>('svg', opts),
  }
}

function createLiteral<T extends TemplateLiteral>(
  type: string,
  opts: CustomizeOptions<T>
): T {
  const { compiler, literals } = opts;

  // Every literal has its own cache for keyed templates
  const keyed = new WeakMap<any, Record<any, TemplateCache>>();
  function template(strings: TemplateStringsArray, ...values: any[]): Template {
    return new Template(type, strings, values);
  }

  template.for = <T>(items: Iterable<T>, key: TemplateFor<T, any>, templateFn?: TemplateFor<T, Template>): (Node|Template)[] => {
    const list = Array.from(items);
    if (!isFunction(templateFn)) {
      // run as unkeyed (key is templateFn)
      return list.map(key);
    }

    // keyed, we map by a unique ID
    return list.map((item, idx) => {
      let memo = keyed.get(item);
      if (!memo) {
        keyed.set(item, (memo = Object.create(null)));
      }

      // keyed operations always re-use the same cache and unroll
      // the template and its interpolations right away
      const id = key(item, idx);
      const cache = memo[id] ?? (memo[id] = new TemplateCache());
      return unroll(templateFn(item, idx), cache, compiler);
    });
  };

  // Add extension methods to literal
  if (isObject(literals)) {
    for (let key of Object.keys(literals)) {
      if (key in template) {
        throw new Error('Cannot override properties in literals');
      }

      template[key] = literals[key];
    }
  }

  return template as T;
}
