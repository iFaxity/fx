import domdiff from 'udomdiff';

/**
 * This "hack" tells the library if the browser is IE11 or old Edge
 * @const {boolean}
 */
const IE = document.importNode.length != 1;

/**
 * Node filter for createWalker
 * @const {number}
 */
const filter = NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT;

/**
 * Node type of a persistent document fragment
 * @const {number}
 */
const PERSIST_NODE_TYPE = 123;

/**
 * IE11 and old Edge have a different createTreeWalker signature that
 * has been deprecated in other browsers. This export is needed only
 * to guarantee the TreeWalker doesn't show warnings and, ultimately, works
 * @const {() => TreeWalker}
 * @private
 */
export const createWalker = IE
  ? node => document.createTreeWalker(node, filter, null, false)
  : node => document.createTreeWalker(node, filter);

/**
 * @param {Node} node
 * @private
 */
function remove(node: Node): Node {
  const { firstChild } = node;
  const parent = firstChild.parentNode;
  while (parent.firstChild != parent.lastChild) {
    parent.lastChild.remove();
  }
  return firstChild;
}

/**
 * Clears all the content of the node
 * @param {Node} node
 * @private
 */
export function clearNode(node: Node): void {
  // Check if node is already empty
  if (!node.lastChild) return;
  node.textContent = '';
}

/**
 * Differ function for domdiff to handle persistent fragments
 * @param {Node} node Node to diff
 * @param {number} operation Diffing operation, see udomdiff for more info
 * @private
 */
function diffable(node: Node, operation: number) {
  if (node.nodeType === PERSIST_NODE_TYPE) {
    if (1 / operation < 0) {
      return operation ? remove(node) : node.lastChild;
    }
    return operation ? node.valueOf() : node.firstChild;
  }

  return node;
}

/**
 * creates a persistent document fragment
 * @param {DocumentFragment} frag
 * @returns {Node}
 * @private
 */
export function persistent(frag: DocumentFragment): Node {
  const children = frag.childNodes;
  // no content, return undefined (or first child)
  if (children.length < 2) return children[0];

  const nodes = Array.from(children);
  const nodeType = PERSIST_NODE_TYPE;
  function valueOf() {
    if (children.length !== nodes.length) {
      nodes.forEach(n => frag.appendChild(n));
    }
    return frag;
  }

  //@ts-ignore
  return { nodeType, valueOf, firstChild: nodes[0] };
}

/**
 * Diffs content after a specific reference node, from old content to new content
 * @param {Node} ref Reference node, where to set content after
 * @param {Node[]} oldNodes Current content of the node
 * @param {Node[]} newNodes New nodes to replace the current content with
 * @returns {Node[]}
 * @private
 */
export function diff(ref: Node, oldNodes: Node[], newNodes: Node[]): Node[] {
  // TODO: there is a possible edge case where a node has been
  //       removed manually, or it was a keyed one, attached
  //       to a shared reference between renders.
  //       In this case udomdiff might fail at removing such node
  //       as its parent won't be the expected one.
  //       The best way to avoid this issue is to filter oldNodes
  //       in search of those not live, or not in the current parent
  //       anymore, but this would require both a change to uwire,
  //       exposing a parentNode from the firstChild, as example,
  //       but also a filter per each diff that should exclude nodes
  //       that are not in there, penalizing performance quite a lot.
  //       As this has been also a potential issue with domdiff,
  //       and both lighterhtml and hyperHTML might fail with this
  //       very specific edge case, I might as well document this possible
  //       "diffing shenanigan" and call it a day.
  return domdiff(ref.parentNode, oldNodes, newNodes, diffable, ref);
}

/**
 * Creates a template element from HTML or SVG markup
 * @param {boolean} svg Set to true to parse within the SVG namespace
 * @param {string} markup Markup, either HTML or SVG
 * @returns {HTMLTemplateElement}
 * @private
 */
export function createTemplate(svg: boolean, markup: string): HTMLTemplateElement {
  const template = document.createElement('template');

  if (svg) {
    // Wrap in a svg element and then hoist the child nodes back to the root
    template.innerHTML = `<svg>${markup}</svg>`;

    const { content } = template;
    const svg = content.firstChild;
    content.removeChild(svg);

    while (svg.firstChild) {
      content.appendChild(svg.firstChild);
    }
  } else {
    template.innerHTML = markup;
  }
  return template;
}

