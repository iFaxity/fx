/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const e=new WeakMap,t=t=>"function"==typeof t&&e.has(t),n=void 0!==window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,s=(e,t,n=null)=>{for(;t!==n;){const n=t.nextSibling;e.removeChild(t),t=n}},i={},r={},o=`{{lit-${String(Math.random()).slice(2)}}}`,l=`\x3c!--${o}--\x3e`,a=new RegExp(`${o}|${l}`);class c{constructor(e,t){this.parts=[],this.element=t;const n=[],s=[],i=document.createTreeWalker(t.content,133,null,!1);let r=0,l=-1,c=0;const{strings:h,values:{length:m}}=e;for(;c<m;){const e=i.nextNode();if(null!==e){if(l++,1===e.nodeType){if(e.hasAttributes()){const t=e.attributes,{length:n}=t;let s=0;for(let e=0;e<n;e++)u(t[e].name,"$lit$")&&s++;for(;s-- >0;){const t=h[c],n=p.exec(t)[2],s=n.toLowerCase()+"$lit$",i=e.getAttribute(s);e.removeAttribute(s);const r=i.split(a);this.parts.push({type:"attribute",index:l,name:n,strings:r}),c+=r.length-1}}"TEMPLATE"===e.tagName&&(s.push(e),i.currentNode=e.content)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(o)>=0){const s=e.parentNode,i=t.split(a),r=i.length-1;for(let t=0;t<r;t++){let n,r=i[t];if(""===r)n=d();else{const e=p.exec(r);null!==e&&u(e[2],"$lit$")&&(r=r.slice(0,e.index)+e[1]+e[2].slice(0,-"$lit$".length)+e[3]),n=document.createTextNode(r)}s.insertBefore(n,e),this.parts.push({type:"node",index:++l})}""===i[r]?(s.insertBefore(d(),e),n.push(e)):e.data=i[r],c+=r}}else if(8===e.nodeType)if(e.data===o){const t=e.parentNode;null!==e.previousSibling&&l!==r||(l++,t.insertBefore(d(),e)),r=l,this.parts.push({type:"node",index:l}),null===e.nextSibling?e.data="":(n.push(e),l--),c++}else{let t=-1;for(;-1!==(t=e.data.indexOf(o,t+1));)this.parts.push({type:"node",index:-1}),c++}}else i.currentNode=s.pop()}for(const e of n)e.parentNode.removeChild(e)}}const u=(e,t)=>{const n=e.length-t.length;return n>=0&&e.slice(n)===t},h=e=>-1!==e.index,d=()=>document.createComment(""),p=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class m{constructor(e,t,n){this.__parts=[],this.template=e,this.processor=t,this.options=n}update(e){let t=0;for(const n of this.__parts)void 0!==n&&n.setValue(e[t]),t++;for(const e of this.__parts)void 0!==e&&e.commit()}_clone(){const e=n?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),t=[],s=this.template.parts,i=document.createTreeWalker(e,133,null,!1);let r,o=0,l=0,a=i.nextNode();for(;o<s.length;)if(r=s[o],h(r)){for(;l<r.index;)l++,"TEMPLATE"===a.nodeName&&(t.push(a),i.currentNode=a.content),null===(a=i.nextNode())&&(i.currentNode=t.pop(),a=i.nextNode());if("node"===r.type){const e=this.processor.handleTextExpression(this.options);e.insertAfterNode(a.previousSibling),this.__parts.push(e)}else this.__parts.push(...this.processor.handleAttributeExpressions(a,r.name,r.strings,this.options));o++}else this.__parts.push(void 0),o++;return n&&(document.adoptNode(e),customElements.upgrade(e)),e}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const f=` ${o} `;class g{constructor(e,t,n,s){this.strings=e,this.values=t,this.type=n,this.processor=s}getHTML(){const e=this.strings.length-1;let t="",n=!1;for(let s=0;s<e;s++){const e=this.strings[s],i=e.lastIndexOf("\x3c!--");n=(i>-1||n)&&-1===e.indexOf("--\x3e",i+1);const r=p.exec(e);t+=null===r?e+(n?f:l):e.substr(0,r.index)+r[1]+r[2]+"$lit$"+r[3]+o}return t+=this.strings[e],t}getTemplateElement(){const e=document.createElement("template");return e.innerHTML=this.getHTML(),e}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const v=e=>null===e||!("object"==typeof e||"function"==typeof e),w=e=>Array.isArray(e)||!(!e||!e[Symbol.iterator]);class _{constructor(e,t,n){this.dirty=!0,this.element=e,this.name=t,this.strings=n,this.parts=[];for(let e=0;e<n.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new y(this)}_getValue(){const e=this.strings,t=e.length-1;let n="";for(let s=0;s<t;s++){n+=e[s];const t=this.parts[s];if(void 0!==t){const e=t.value;if(v(e)||!w(e))n+="string"==typeof e?e:String(e);else for(const t of e)n+="string"==typeof t?t:String(t)}}return n+=e[t],n}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class y{constructor(e){this.value=void 0,this.committer=e}setValue(e){e===i||v(e)&&e===this.value||(this.value=e,t(e)||(this.committer.dirty=!0))}commit(){for(;t(this.value);){const e=this.value;this.value=i,e(this)}this.value!==i&&this.committer.commit()}}class E{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(d()),this.endNode=e.appendChild(d())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=d()),e.__insert(this.endNode=d())}insertAfterPart(e){e.__insert(this.startNode=d()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){for(;t(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=i,e(this)}const e=this.__pendingValue;e!==i&&(v(e)?e!==this.value&&this.__commitText(e):e instanceof g?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):w(e)?this.__commitIterable(e):e===r?(this.value=r,this.clear()):this.__commitText(e))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){const t=this.startNode.nextSibling,n="string"==typeof(e=null==e?"":e)?e:String(e);t===this.endNode.previousSibling&&3===t.nodeType?t.data=n:this.__commitNode(document.createTextNode(n)),this.value=e}__commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value instanceof m&&this.value.template===t)this.value.update(e.values);else{const n=new m(t,e.processor,this.options),s=n._clone();n.update(e.values),this.__commitNode(s),this.value=n}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let n,s=0;for(const i of e)n=t[s],void 0===n&&(n=new E(this.options),t.push(n),0===s?n.appendIntoPart(this):n.insertAfterPart(t[s-1])),n.setValue(i),n.commit(),s++;s<t.length&&(t.length=s,this.clear(n&&n.endNode))}clear(e=this.startNode){s(this.startNode.parentNode,e.nextSibling,this.endNode)}}class x extends _{constructor(e,t,n){super(e,t,n),this.single=2===n.length&&""===n[0]&&""===n[1]}_createPart(){return new N(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class N extends y{}let T=!1;try{const e={get capture(){return T=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */function b(e){let t=V.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},V.set(e.type,t));let n=t.stringsArray.get(e.strings);if(void 0!==n)return n;const s=e.strings.join(o);return n=t.keyString.get(s),void 0===n&&(n=new c(e,e.getTemplateElement()),t.keyString.set(s,n)),t.stringsArray.set(e.strings,n),n}const V=new Map,A=new WeakMap;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.1.2");const k=[Map,Set,WeakMap,WeakSet];function O(e){return null!=e&&"object"==typeof e}function C(e){return"function"==typeof e}function M(e){return k.some(t=>e instanceof t)}function S(e){return O(e)||M(e)}function D(e,t){return Object.entries(t).reduce((t,[n,s])=>{let[i,r]=e(n,s);return t[i]=r,t},{})}function P(e){return e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").replace(/([A-Z])([A-Z])(?=[a-z])/g,"$1-$2").toLowerCase()}class ${constructor(e,t,n){if(this.value=void 0,2!==n.length||""!==n[0]||""!==n[1])throw new Error("Conditional attributes can only contain a single expression");this.element=e,this.name=t,this.strings=n}setValue(e){if(!O(e))throw new TypeError("Bind can only work with Object");this.value=e}commit(){Object.entries(this.value).forEach(([e,t])=>{t?this.element.setAttribute(e,t.toString()):this.element.removeAttribute(e)})}}const R=new WeakMap;var U;!function(e){e.SET="set",e.ADD="add",e.DELETE="delete",e.CLEAR="clear"}(U||(U={}));const L=Symbol("iterate"),F=[];let B=null;class H{constructor(e,t={}){this.active=!0,this.deps=[],this.options=t,this.raw=H.isFx(e)?e.raw:e,t.lazy||this.run()}static isFx(e){return e instanceof H}static track(e,t){if(!B)return;let n=R.get(e);n||(n=new Map,R.set(e,n));let s=n.get(t);s||(s=new Set,n.set(t,s)),s.has(B)||(s.add(B),B.deps.push(s))}static trigger(e,t,n){const s=R.get(e);if(!s)return;const i=new Set,r=new Set,o=e=>{e&&e.forEach(e=>(e.options.computed?r:i).add(e))};if(t==U.CLEAR)s.forEach(o);else if(n&&o(s.get(n)),t==U.ADD||t==U.DELETE){const t=Array.isArray(e)?"length":L;o(s.get(t))}r.forEach(e=>e.scheduleRun()),i.forEach(e=>e.scheduleRun())}run(...e){if(!this.active)return this.raw(...e);if(!F.includes(this)){this.cleanup();try{return F.push(this),B=this,this.raw(...e)}finally{F.pop(),B=F[F.length-1]}}}cleanup(){const{deps:e}=this;if(e.length){for(let t=0;t<e.length;t++)e[t].delete(this);e.length=0}}scheduleRun(){this.options.scheduler?this.options.scheduler(this.run):this.run()}stop(){this.active&&(this.cleanup(),this.active=!1)}}const j=Symbol("ref"),W=new WeakMap;function z(e){return O(e)?ne(e):e}function q(e){return(e[j]=!0)&&e}function I(e){return{get(t,n){const s=t[n];return K(s)?s.value:(H.track(t,n),O(s)?e?se(s):ne(s):s)},set(t,n,s){if(e)throw new TypeError("Collection is readonly");const i=t[n];return s=J(s),K(i)&&!K(s)?(i.value=s,!0):(t[n]=s,t.hasOwnProperty(n)?s===i||s!=s&&i!=i||H.trigger(t,U.SET,n):H.trigger(t,U.ADD,n),!0)},deleteProperty(t,n){if(e)throw new TypeError("Collection is readonly");const s=delete t[n];return s&&t.hasOwnProperty(n)&&H.trigger(t,U.DELETE,n),s},has:(e,t)=>(H.track(e,t),t in e),ownKeys:e=>(H.track(e,L),Reflect.ownKeys(e))}}function Z(e){const t={get(e){const t=J(this);return e=J(e),H.track(t,e),z(t.get(e))},get size(){const e=J(this);return H.track(e,L),e.size},has(e){const t=J(this);return e=J(e),H.track(t,e),t.has(e)},add(t){if(e)throw new TypeError("Collection is readonly");t=J(t);const n=J(this),s=n.has(t),i=n.add(t);return s||H.trigger(n,U.ADD,t),i},set(t,n){if(e)throw new TypeError("Collection is readonly");n=J(n),t=J(t);const s=J(this),i=s.has(t),r=s.set(t,n),o=s.get(t);return i?n===o||n!=n&&o!=o||H.trigger(s,U.SET,t):H.trigger(s,U.ADD,t),r},delete(t){if(e)throw new TypeError("Collection is readonly");t=J(t);const n=J(this),s=n.has(t),i=n.delete(t);return s&&H.trigger(n,U.DELETE,t),i},clear(){if(e)throw new TypeError("Collection is readonly");const t=J(this),n=0!=t.size,s=t.clear();return n&&H.trigger(t,U.CLEAR),s},forEach(e,t){const n=J(this);return H.track(n,L),n.forEach((t,n)=>e.call(this,z(t),z(n),this),t)}};return{get:(e,n)=>(t.hasOwnProperty(n)&&n in e?t:e)[n]}}function K(e){return null!=e&&!!e[j]}function G(e){return W.has(e)}function J(e){var t;return null!=(t=W.get(e))?t:e}function Q(e){return K(e)?e.value:J(e)}function X(e,t){return q({get value(){return e[t]},set value(n){e[t]=n}})}function Y(e){return D(t=>[t,X(e,t)],e)}function ee(e){if(K(e))return e;let t=z(e);const n={get value(){return H.track(n,"value"),t},set value(e){t=z(e),H.trigger(n,U.SET,"value")}};return q(n)}function te(e){let t,n,s;if(C(e))n=e,t=()=>{};else{if(!O(e))throw new TypeError("");{const s=e;n=s.get,t=s.set}}let i=!0;const r=new H(n,{lazy:!0,computed:!0,scheduler:()=>{i=!0}});return q({get value(){if(i&&(s=r.run(),i=!1),null!=B)for(const e of r.deps)e.has(B)||(e.add(B),B.deps.push(e));return s},set value(e){t(e)}})}function ne(e){let t=W.get(e);if(!t){let n;if(M(e))n=Z(!1);else{if(!S(e))throw new TypeError("target is not observable");n=I(!1)}t=new Proxy(e,n)}return t}function se(e){let t=W.get(e);if(!t){let n;if(M(e))n=Z(!0);else{if(!S(e))throw new TypeError("target is not observable");n=I(!0)}t=new Proxy(e,n)}return t}function ie(e){if(!C(e))throw new TypeError("watch can an only watch functions");new H(e,{lazy:!1,computed:!1})}ne({kek:"",lel:0}),ee(0);class re{constructor(e,t,n){if(this.value=void 0,this.__pendingValue=void 0,2!=n.length||""!==n[0]||""!==n[1])throw new Error("Conditional attributes can only contain a single expression");this.element=e,this.name=t,this.strings=n,this.comment=document.createComment("")}setValue(e){this.__pendingValue=Q(e)}commit(){for(var e;t(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=i,e(this)}if(this.__pendingValue===i)return;const{element:n,comment:s}=this,r=!!this.__pendingValue,o="not"==this.name?!r:r;if(this.value!==o){const t=o?s:n,i=o?n:s;null===(e=t.parentNode)||void 0===e||e.replaceChild(i,t),this.value=o}this.__pendingValue=i}}const oe=()=>{};class le{constructor(e,t,n){this.hasMods=!1,this.__pendingValue=void 0;const[s,...i]=t.split("."),r=i.includes("prevent"),o=i.includes("stop"),l=i.includes("self");this.value=oe,this.element=e,this.eventName=s,this.hasMods=r||o,this.options={capture:i.includes("capture"),once:i.includes("once"),passive:i.includes("passive")},this.boundListener=t=>{l&&t.target!==e||(r&&t.preventDefault(),o&&t.stopPropagation(),this.value.call(null!=n?n:e,t))}}setValue(e){const t=null!=e?e:oe;if(!C(t))throw new TypeError("Lit: Events can only be bound to functions");this.__pendingValue=t}commit(){for(;t(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=i,e(this)}if(this.__pendingValue==i)return;const e=this.__pendingValue||oe;this.value==oe||e!=oe||this.hasMods||this.element.removeEventListener(this.eventName,this.boundListener,this.options),(this.value==oe&&e!=oe||this.hasMods)&&this.element.addEventListener(this.eventName,this.boundListener,this.options),this.value=this.__pendingValue,this.__pendingValue=i}}function ae(e){return D((e,t)=>{var n,s,i,r;const o={default:void 0,validator:null,required:!1,cast:!1};if(null==t?o.type=null:C(t)?o.type=[t]:Array.isArray(t)?o.type=t:O(t)&&(o.type=null!=(n=t.type)?n:null,o.default=null!=(s=t.default)?s:void 0,o.validator=null!=(i=t.validator)?i:null,o.required=!!t.required),!(null===(r=o.type)||void 0===r?void 0:r.every(C)))throw new TypeError(`Type invalid in prop '${e}'!`);return[e,o]},e)}function ce(e,t,n){const{type:s,required:i,validator:r,cast:o}=e[t];if(null!=n&&!s.some(e=>Object.getPrototypeOf(n)==e.prototype))throw new Error(`Type error in prop '${t}'.`);if(i&&void 0===n)throw new Error(`Value required in prop '${t}'.`);if(r&&!r(n))throw new Error(`Validation error in prop '${t}'.`);if(o)if(s[0]===Boolean)null==n||"false"==n?n=!1:""!==n&&"true"!=n||(n=!0);else if(s[0]===Number){let e=+n;isNaN(e)||(n=e)}return n}const ue=[];let he=null;function de(){for(;ue.length;){ue.pop()()}}function pe(e){0==ue.length&&(he=requestAnimationFrame(de)),ue.push(e)}let me=null;const fe=[],ge=new WeakMap;var ve;!function(e){e.BEFORE_MOUNT="beforeMount",e.MOUNTED="mounted",e.BEFORE_UPDATE="beforeUpdate",e.UPDATED="updated",e.BEFORE_UNMOUNT="beforeUnmount",e.UNMOUNTED="unmounted"}(ve||(ve={}));class we{constructor(e,t){this.el=e,this.model=t.model,this.attrs=t.attrs,this.props=t.props}emit(e,t){let n=void 0!==t?new CustomEvent(e,{detail:t}):new Event(e);this.el.dispatchEvent(n)}}class _e{constructor(e,t){if(this.rendering=!1,this.mounted=!1,this.options=t,this.ctx=new we(e,t),this.hooks=D((e,t)=>[t,[]],ve),this.renderOptions={templateFactory:b,eventContext:e},this.fx=new H(this.render.bind(this),{lazy:!0,computed:!1,scheduler:this.scheduleRender.bind(this)}),this.props=ne(D((e,t)=>{const{type:n,default:s}=t;let i=C(s)?s():s;return null!=n&&void 0===s&&1==n.length&&n[0]==Boolean&&(i=!0),[e,i]},t.props)),this.shadowRoot=e.attachShadow({mode:t.closed?"closed":"open"}),this.renderTemplate=t.setup.call(void 0,Y(this.props),this.ctx),!C(this.renderTemplate))throw new TypeError("Setup functions must return a function which return a TemplateResult")}callHooks(e){var t;const n=this.hooks[e];(null===(t=n)||void 0===t?void 0:t.length)&&n.forEach(e=>C(e)&&e())}scheduleRender(e){this.rendering||(this.rendering=!0,pe(()=>{this.mounted&&this.callHooks(ve.BEFORE_UPDATE),e.call(this.fx),this.mounted&&this.callHooks(ve.UPDATED),this.rendering=!1,this.mounted=!0}))}render(){const{shadowRoot:e,mounted:t,options:n}=this,i=this.renderTemplate();if(!(i instanceof g))throw new Error("FxElement.render() must return a TemplateResult");if(((e,t,n)=>{let i=A.get(t);void 0===i&&(s(t,t.firstChild),A.set(t,i=new E(Object.assign({templateFactory:b},n))),i.appendInto(t)),i.setValue(e),i.commit()})(i,e,this.renderOptions),!t&&"string"==typeof n.styles){const t=document.createElement("style");t.textContent=n.styles,e.insertBefore(t,e.firstChild)}}}function ye(e){const t=function(e){var t,n,s,i,r,o,l;const{setup:a,model:c}=e,u=null!=(t=e.props)?t:{};return{name:P(e.name),closed:(n=e.closed,null!=n&&n),props:e.props?ae(u):u,attrs:D(e=>[P(e),e],u),model:{prop:(i=null===(s=c)||void 0===s?void 0:s.prop,null!=i?i:"value"),event:(o=null===(r=c)||void 0===r?void 0:r.event,null!=o?o:"input")},setup:null!=a?a:null,styles:(l=e.styles,null!=l?l:null)}}(e),n=Object.keys(t.attrs);t.name.includes("-")||console.warn("Fx: Component names should include a hyphen (-) or be camelised with at least 2 uppser case characters.");const s=class extends Ee{static get is(){return t.name}static get observedAttributes(){return n}constructor(){super(t)}};return window.customElements.define(t.name,s),s}class Ee extends HTMLElement{constructor(e){var t;super(),me=this,fe.push(this);const n=new _e(this,e);ge.set(this,n),t=fe[fe.length-1],me=null!=t?t:null;const{props:s}=n.options,i=n.props;for(let e of Object.keys(s)){if(this.hasOwnProperty(e))throw new Error(`Prop ${e} is reserved, please use another.`);ce(s,e,i[e]),Object.defineProperty(this,e,{get:()=>i[e],set:t=>{i[e]=ce(s,e,t)}})}n.fx.scheduleRun()}connectedCallback(){const e=ge.get(this);e.callHooks(ve.BEFORE_MOUNT),e.callHooks(ve.MOUNTED)}disconnectedCallback(){const e=ge.get(this);e.callHooks(ve.BEFORE_UNMOUNT),e.callHooks(ve.UNMOUNTED)}attributeChangedCallback(e,t,n){if(t!==n){const t=ge.get(this),{attrs:s,props:i}=t.options,r=s[e];this[r]=ce(i,r,n)}}}class xe{constructor(e,t){let n,s,[i,...r]=t.split(".");if(this.element=e,this.commit=()=>{this.element[i]=this.ref.value},""===i){const t=e.tagName.toLowerCase(),o=e.type,l="input"==t;if("select"==t)n="change",s=this.selectHandler,this.commit=this.selectCommit;else if(l&&"checkbox"==o)n="change",s=this.checkboxHandler,this.commit=this.checkboxCommit;else if(l&&"radio"==o)n="change",i="value",this.commit=this.radioCommit;else if(l||"textarea"==t)n=r.includes("lazy")?"change":"input",i="value";else{if(!(e instanceof Ee))throw new Error(`Model not supported for element '${t}'.`);{const t=ge.get(e);n=t.options.model.event,i=t.options.model.prop}}}const o=r.includes("number"),l=r.includes("trim");e.addEventListener(null!=n?n:`fxsync:${i}`,e=>{e.stopPropagation();let t=C(s)?s():this.element[i];if("string"==typeof t&&(l&&(t=t.trim()),o)){const e=parseFloat(t);isNaN(e)||(t=e)}this.ref.value=t},!1)}setValue(e){if(!K(e))throw new TypeError("Sync attributes values requires a ref as their value!");this.ref=e}selectHandler(){var e;const t=this.element,n=t.selectedOptions;let s;return s=t.multiple?n.length?Array.from(n).map(e=>e.value):[]:null===(e=n[0])||void 0===e?void 0:e.value,s}selectCommit(){const e=this.element,{options:t}=e,n=this.value;if(e.multiple){const e=n;for(let n of t)n.selected=e.includes(n.value)}else for(let e of t)e.selected=e.value===n}radioCommit(){const e=this.element;e.checked=this.ref.value===e.value}checkboxHandler(){const e=this.element,t=this.ref.value,{value:n,checked:s}=e;if(Array.isArray(t)){const e=t.indexOf(n);return e>=0?t.splice(e,1):t.push(n),t}return null!=n?n:s}checkboxCommit(){const e=this.element,t=this.ref.value;if(Array.isArray(t)){const n=t;e.checked=n.includes(e.value)}else e.checked=t===e.value}}class Ne extends y{constructor(e,t){super(e),this.name=t,this.mapValue="class"==t||"style"==t}setValue(e){let t=Q(e);this.mapValue&&(Array.isArray(t)?t=t.filter(e=>e).join(" "):O(t)&&(t=Object.entries(t).reduce((e,[t,n])=>(n&&e.push(t),e),[]).join(" "))),super.setValue(t)}}class Te extends E{setValue(e){super.setValue(Q(e))}}class be extends class{constructor(e,t,n){if(this.value=void 0,this.__pendingValue=void 0,2!==n.length||""!==n[0]||""!==n[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=n}setValue(e){this.__pendingValue=e}commit(){for(;t(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=i,e(this)}if(this.__pendingValue===i)return;const e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=i}}{setValue(e){super.setValue(Q(e))}}class Ve extends _{_createPart(){return new Ne(this,this.name)}}class Ae extends x{_createPart(){return new Ne(this,null)}}const ke=new Map([[".",(e,t,n)=>new Ae(e,t,n).parts],["@",(e,t,n,s)=>[new le(e,t,s.eventContext)]],["?",(e,t,n)=>[new be(e,t,n)]],["&",(e,t)=>[new xe(e,t)]],["!",(e,t,n)=>[new re(e,t,n)]],[":",(e,t,n)=>[new $(e,t,n)]]]);const Oe=new class{handleAttributeExpressions(e,t,n,s){const i=t[0];if(ke.has(i)){return ke.get(i)(e,t.slice(1),n,s)}return new Ve(e,t,n).parts}handleTextExpression(e){return new Te(e)}};function Ce(e,t){if(me)throw new Error("No active element instance!");ge.get(me).hooks[e].push(t)}function Me(e){Ce(ve.BEFORE_MOUNT,e)}function Se(e){Ce(ve.MOUNTED,e)}function De(e){Ce(ve.BEFORE_UPDATE,e)}function Pe(e){Ce(ve.UPDATED,e)}function $e(e){Ce(ve.BEFORE_UNMOUNT,e)}function Re(e){Ce(ve.UNMOUNTED,e)}const Ue=(e,...t)=>new g(e,t,"html",Oe),Le=(e,...t)=>new g(e,t,"svg",Oe);export{te as computed,ye as defineElement,Ue as html,G as isReactive,K as isRef,Me as onBeforeMount,$e as onBeforeUnmount,De as onBeforeUpdate,Se as onMounted,Re as onUnmounted,Pe as onUpdated,ne as reactive,se as readonly,ee as ref,Le as svg,J as toRaw,Q as toRawValue,X as toRef,Y as toRefs,ie as watch};
//# sourceMappingURL=index.esm.js.map
