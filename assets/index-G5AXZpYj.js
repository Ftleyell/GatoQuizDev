(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const t of i)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function a(i){const t={};return i.integrity&&(t.integrity=i.integrity),i.referrerPolicy&&(t.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?t.credentials="include":i.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(i){if(i.ep)return;i.ep=!0;const t=a(i);fetch(i.href,t)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const st=globalThis,It=st.ShadowRoot&&(st.ShadyCSS===void 0||st.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,qt=Symbol(),Ut=new WeakMap;let ua=class{constructor(e,a,o){if(this._$cssResult$=!0,o!==qt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=a}get styleSheet(){let e=this.o;const a=this.t;if(It&&e===void 0){const o=a!==void 0&&a.length===1;o&&(e=Ut.get(a)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),o&&Ut.set(a,e))}return e}toString(){return this.cssText}};const Pa=g=>new ua(typeof g=="string"?g:g+"",void 0,qt),V=(g,...e)=>{const a=g.length===1?g[0]:e.reduce((o,i,t)=>o+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+g[t+1],g[0]);return new ua(a,g,qt)},La=(g,e)=>{if(It)g.adoptedStyleSheets=e.map(a=>a instanceof CSSStyleSheet?a:a.styleSheet);else for(const a of e){const o=document.createElement("style"),i=st.litNonce;i!==void 0&&o.setAttribute("nonce",i),o.textContent=a.cssText,g.appendChild(o)}},Vt=It?g=>g:g=>g instanceof CSSStyleSheet?(e=>{let a="";for(const o of e.cssRules)a+=o.cssText;return Pa(a)})(g):g;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Da,defineProperty:_a,getOwnPropertyDescriptor:za,getOwnPropertyNames:$a,getOwnPropertySymbols:Oa,getPrototypeOf:Ra}=Object,me=globalThis,Qt=me.trustedTypes,Ba=Qt?Qt.emptyScript:"",yt=me.reactiveElementPolyfillSupport,Re=(g,e)=>g,rt={toAttribute(g,e){switch(e){case Boolean:g=g?Ba:null;break;case Object:case Array:g=g==null?g:JSON.stringify(g)}return g},fromAttribute(g,e){let a=g;switch(e){case Boolean:a=g!==null;break;case Number:a=g===null?null:Number(g);break;case Object:case Array:try{a=JSON.parse(g)}catch{a=null}}return a}},Tt=(g,e)=>!Da(g,e),Gt={attribute:!0,type:String,converter:rt,reflect:!1,useDefault:!1,hasChanged:Tt};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),me.litPropertyMetadata??(me.litPropertyMetadata=new WeakMap);let Le=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,a=Gt){if(a.state&&(a.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((a=Object.create(a)).wrapped=!0),this.elementProperties.set(e,a),!a.noAccessor){const o=Symbol(),i=this.getPropertyDescriptor(e,o,a);i!==void 0&&_a(this.prototype,e,i)}}static getPropertyDescriptor(e,a,o){const{get:i,set:t}=za(this.prototype,e)??{get(){return this[a]},set(n){this[a]=n}};return{get:i,set(n){const l=i==null?void 0:i.call(this);t==null||t.call(this,n),this.requestUpdate(e,l,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Gt}static _$Ei(){if(this.hasOwnProperty(Re("elementProperties")))return;const e=Ra(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(Re("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Re("properties"))){const a=this.properties,o=[...$a(a),...Oa(a)];for(const i of o)this.createProperty(i,a[i])}const e=this[Symbol.metadata];if(e!==null){const a=litPropertyMetadata.get(e);if(a!==void 0)for(const[o,i]of a)this.elementProperties.set(o,i)}this._$Eh=new Map;for(const[a,o]of this.elementProperties){const i=this._$Eu(a,o);i!==void 0&&this._$Eh.set(i,a)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const a=[];if(Array.isArray(e)){const o=new Set(e.flat(1/0).reverse());for(const i of o)a.unshift(Vt(i))}else e!==void 0&&a.push(Vt(e));return a}static _$Eu(e,a){const o=a.attribute;return o===!1?void 0:typeof o=="string"?o:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(a=>this.enableUpdating=a),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(a=>a(this))}addController(e){var a;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((a=e.hostConnected)==null||a.call(e))}removeController(e){var a;(a=this._$EO)==null||a.delete(e)}_$E_(){const e=new Map,a=this.constructor.elementProperties;for(const o of a.keys())this.hasOwnProperty(o)&&(e.set(o,this[o]),delete this[o]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return La(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(a=>{var o;return(o=a.hostConnected)==null?void 0:o.call(a)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(a=>{var o;return(o=a.hostDisconnected)==null?void 0:o.call(a)})}attributeChangedCallback(e,a,o){this._$AK(e,o)}_$ET(e,a){var t;const o=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,o);if(i!==void 0&&o.reflect===!0){const n=(((t=o.converter)==null?void 0:t.toAttribute)!==void 0?o.converter:rt).toAttribute(a,o.type);this._$Em=e,n==null?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(e,a){var t,n;const o=this.constructor,i=o._$Eh.get(e);if(i!==void 0&&this._$Em!==i){const l=o.getPropertyOptions(i),r=typeof l.converter=="function"?{fromAttribute:l.converter}:((t=l.converter)==null?void 0:t.fromAttribute)!==void 0?l.converter:rt;this._$Em=i,this[i]=r.fromAttribute(a,l.type)??((n=this._$Ej)==null?void 0:n.get(i))??null,this._$Em=null}}requestUpdate(e,a,o){var i;if(e!==void 0){const t=this.constructor,n=this[e];if(o??(o=t.getPropertyOptions(e)),!((o.hasChanged??Tt)(n,a)||o.useDefault&&o.reflect&&n===((i=this._$Ej)==null?void 0:i.get(e))&&!this.hasAttribute(t._$Eu(e,o))))return;this.C(e,a,o)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,a,{useDefault:o,reflect:i,wrapped:t},n){o&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,n??a??this[e]),t!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||o||(a=void 0),this._$AL.set(e,a)),i===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(a){Promise.reject(a)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var o;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[t,n]of this._$Ep)this[t]=n;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[t,n]of i){const{wrapped:l}=n,r=this[t];l!==!0||this._$AL.has(t)||r===void 0||this.C(t,void 0,n,r)}}let e=!1;const a=this._$AL;try{e=this.shouldUpdate(a),e?(this.willUpdate(a),(o=this._$EO)==null||o.forEach(i=>{var t;return(t=i.hostUpdate)==null?void 0:t.call(i)}),this.update(a)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(a)}willUpdate(e){}_$AE(e){var a;(a=this._$EO)==null||a.forEach(o=>{var i;return(i=o.hostUpdated)==null?void 0:i.call(o)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(a=>this._$ET(a,this[a]))),this._$EM()}updated(e){}firstUpdated(e){}};Le.elementStyles=[],Le.shadowRootOptions={mode:"open"},Le[Re("elementProperties")]=new Map,Le[Re("finalized")]=new Map,yt==null||yt({ReactiveElement:Le}),(me.reactiveElementVersions??(me.reactiveElementVersions=[])).push("2.1.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Be=globalThis,lt=Be.trustedTypes,Ht=lt?lt.createPolicy("lit-html",{createHTML:g=>g}):void 0,pa="$lit$",fe=`lit$${Math.random().toFixed(9).slice(2)}$`,ga="?"+fe,Fa=`<${ga}>`,Se=document,Fe=()=>Se.createComment(""),Ne=g=>g===null||typeof g!="object"&&typeof g!="function",kt=Array.isArray,Na=g=>kt(g)||typeof(g==null?void 0:g[Symbol.iterator])=="function",bt=`[ 	
\f\r]`,Oe=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Wt=/-->/g,jt=/>/g,be=RegExp(`>|${bt}(?:([^\\s"'>=/]+)(${bt}*=${bt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Kt=/'/g,Yt=/"/g,fa=/^(?:script|style|textarea|title)$/i,ma=g=>(e,...a)=>({_$litType$:g,strings:e,values:a}),R=ma(1),Ua=ma(2),Me=Symbol.for("lit-noChange"),U=Symbol.for("lit-nothing"),Zt=new WeakMap,Ce=Se.createTreeWalker(Se,129);function va(g,e){if(!kt(g)||!g.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ht!==void 0?Ht.createHTML(e):e}const Va=(g,e)=>{const a=g.length-1,o=[];let i,t=e===2?"<svg>":e===3?"<math>":"",n=Oe;for(let l=0;l<a;l++){const r=g[l];let u,c,f=-1,p=0;for(;p<r.length&&(n.lastIndex=p,c=n.exec(r),c!==null);)p=n.lastIndex,n===Oe?c[1]==="!--"?n=Wt:c[1]!==void 0?n=jt:c[2]!==void 0?(fa.test(c[2])&&(i=RegExp("</"+c[2],"g")),n=be):c[3]!==void 0&&(n=be):n===be?c[0]===">"?(n=i??Oe,f=-1):c[1]===void 0?f=-2:(f=n.lastIndex-c[2].length,u=c[1],n=c[3]===void 0?be:c[3]==='"'?Yt:Kt):n===Yt||n===Kt?n=be:n===Wt||n===jt?n=Oe:(n=be,i=void 0);const s=n===be&&g[l+1].startsWith("/>")?" ":"";t+=n===Oe?r+Fa:f>=0?(o.push(u),r.slice(0,f)+pa+r.slice(f)+fe+s):r+fe+(f===-2?l:s)}return[va(g,t+(g[a]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),o]};class Ue{constructor({strings:e,_$litType$:a},o){let i;this.parts=[];let t=0,n=0;const l=e.length-1,r=this.parts,[u,c]=Va(e,a);if(this.el=Ue.createElement(u,o),Ce.currentNode=this.el.content,a===2||a===3){const f=this.el.content.firstChild;f.replaceWith(...f.childNodes)}for(;(i=Ce.nextNode())!==null&&r.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(const f of i.getAttributeNames())if(f.endsWith(pa)){const p=c[n++],s=i.getAttribute(f).split(fe),d=/([.?@])?(.*)/.exec(p);r.push({type:1,index:t,name:d[2],strings:s,ctor:d[1]==="."?Ga:d[1]==="?"?Ha:d[1]==="@"?Wa:pt}),i.removeAttribute(f)}else f.startsWith(fe)&&(r.push({type:6,index:t}),i.removeAttribute(f));if(fa.test(i.tagName)){const f=i.textContent.split(fe),p=f.length-1;if(p>0){i.textContent=lt?lt.emptyScript:"";for(let s=0;s<p;s++)i.append(f[s],Fe()),Ce.nextNode(),r.push({type:2,index:++t});i.append(f[p],Fe())}}}else if(i.nodeType===8)if(i.data===ga)r.push({type:2,index:t});else{let f=-1;for(;(f=i.data.indexOf(fe,f+1))!==-1;)r.push({type:7,index:t}),f+=fe.length-1}t++}}static createElement(e,a){const o=Se.createElement("template");return o.innerHTML=e,o}}function De(g,e,a=g,o){var n,l;if(e===Me)return e;let i=o!==void 0?(n=a._$Co)==null?void 0:n[o]:a._$Cl;const t=Ne(e)?void 0:e._$litDirective$;return(i==null?void 0:i.constructor)!==t&&((l=i==null?void 0:i._$AO)==null||l.call(i,!1),t===void 0?i=void 0:(i=new t(g),i._$AT(g,a,o)),o!==void 0?(a._$Co??(a._$Co=[]))[o]=i:a._$Cl=i),i!==void 0&&(e=De(g,i._$AS(g,e.values),i,o)),e}class Qa{constructor(e,a){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=a}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:a},parts:o}=this._$AD,i=((e==null?void 0:e.creationScope)??Se).importNode(a,!0);Ce.currentNode=i;let t=Ce.nextNode(),n=0,l=0,r=o[0];for(;r!==void 0;){if(n===r.index){let u;r.type===2?u=new We(t,t.nextSibling,this,e):r.type===1?u=new r.ctor(t,r.name,r.strings,this,e):r.type===6&&(u=new ja(t,this,e)),this._$AV.push(u),r=o[++l]}n!==(r==null?void 0:r.index)&&(t=Ce.nextNode(),n++)}return Ce.currentNode=Se,i}p(e){let a=0;for(const o of this._$AV)o!==void 0&&(o.strings!==void 0?(o._$AI(e,o,a),a+=o.strings.length-2):o._$AI(e[a])),a++}}class We{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,a,o,i){this.type=2,this._$AH=U,this._$AN=void 0,this._$AA=e,this._$AB=a,this._$AM=o,this.options=i,this._$Cv=(i==null?void 0:i.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const a=this._$AM;return a!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=a.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,a=this){e=De(this,e,a),Ne(e)?e===U||e==null||e===""?(this._$AH!==U&&this._$AR(),this._$AH=U):e!==this._$AH&&e!==Me&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Na(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==U&&Ne(this._$AH)?this._$AA.nextSibling.data=e:this.T(Se.createTextNode(e)),this._$AH=e}$(e){var t;const{values:a,_$litType$:o}=e,i=typeof o=="number"?this._$AC(e):(o.el===void 0&&(o.el=Ue.createElement(va(o.h,o.h[0]),this.options)),o);if(((t=this._$AH)==null?void 0:t._$AD)===i)this._$AH.p(a);else{const n=new Qa(i,this),l=n.u(this.options);n.p(a),this.T(l),this._$AH=n}}_$AC(e){let a=Zt.get(e.strings);return a===void 0&&Zt.set(e.strings,a=new Ue(e)),a}k(e){kt(this._$AH)||(this._$AH=[],this._$AR());const a=this._$AH;let o,i=0;for(const t of e)i===a.length?a.push(o=new We(this.O(Fe()),this.O(Fe()),this,this.options)):o=a[i],o._$AI(t),i++;i<a.length&&(this._$AR(o&&o._$AB.nextSibling,i),a.length=i)}_$AR(e=this._$AA.nextSibling,a){var o;for((o=this._$AP)==null?void 0:o.call(this,!1,!0,a);e&&e!==this._$AB;){const i=e.nextSibling;e.remove(),e=i}}setConnected(e){var a;this._$AM===void 0&&(this._$Cv=e,(a=this._$AP)==null||a.call(this,e))}}class pt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,a,o,i,t){this.type=1,this._$AH=U,this._$AN=void 0,this.element=e,this.name=a,this._$AM=i,this.options=t,o.length>2||o[0]!==""||o[1]!==""?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=U}_$AI(e,a=this,o,i){const t=this.strings;let n=!1;if(t===void 0)e=De(this,e,a,0),n=!Ne(e)||e!==this._$AH&&e!==Me,n&&(this._$AH=e);else{const l=e;let r,u;for(e=t[0],r=0;r<t.length-1;r++)u=De(this,l[o+r],a,r),u===Me&&(u=this._$AH[r]),n||(n=!Ne(u)||u!==this._$AH[r]),u===U?e=U:e!==U&&(e+=(u??"")+t[r+1]),this._$AH[r]=u}n&&!i&&this.j(e)}j(e){e===U?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Ga extends pt{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===U?void 0:e}}class Ha extends pt{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==U)}}class Wa extends pt{constructor(e,a,o,i,t){super(e,a,o,i,t),this.type=5}_$AI(e,a=this){if((e=De(this,e,a,0)??U)===Me)return;const o=this._$AH,i=e===U&&o!==U||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,t=e!==U&&(o===U||i);i&&this.element.removeEventListener(this.name,this,o),t&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var a;typeof this._$AH=="function"?this._$AH.call(((a=this.options)==null?void 0:a.host)??this.element,e):this._$AH.handleEvent(e)}}class ja{constructor(e,a,o){this.element=e,this.type=6,this._$AN=void 0,this._$AM=a,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(e){De(this,e)}}const xt=Be.litHtmlPolyfillSupport;xt==null||xt(Ue,We),(Be.litHtmlVersions??(Be.litHtmlVersions=[])).push("3.3.0");const Ka=(g,e,a)=>{const o=(a==null?void 0:a.renderBefore)??e;let i=o._$litPart$;if(i===void 0){const t=(a==null?void 0:a.renderBefore)??null;o._$litPart$=i=new We(e.insertBefore(Fe(),t),t,void 0,a??{})}return i._$AI(g),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const we=globalThis;let B=class extends Le{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var a;const e=super.createRenderRoot();return(a=this.renderOptions).renderBefore??(a.renderBefore=e.firstChild),e}update(e){const a=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Ka(a,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return Me}};var ha;B._$litElement$=!0,B.finalized=!0,(ha=we.litElementHydrateSupport)==null||ha.call(we,{LitElement:B});const Ct=we.litElementPolyfillSupport;Ct==null||Ct({LitElement:B});(we.litElementVersions??(we.litElementVersions=[])).push("4.2.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Q=g=>(e,a)=>{a!==void 0?a.addInitializer(()=>{customElements.define(g,e)}):customElements.define(g,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ya={attribute:!0,type:String,converter:rt,reflect:!1,hasChanged:Tt},Za=(g=Ya,e,a)=>{const{kind:o,metadata:i}=a;let t=globalThis.litPropertyMetadata.get(i);if(t===void 0&&globalThis.litPropertyMetadata.set(i,t=new Map),o==="setter"&&((g=Object.create(g)).wrapped=!0),t.set(a.name,g),o==="accessor"){const{name:n}=a;return{set(l){const r=e.get.call(this);e.set.call(this,l),this.requestUpdate(n,r,g)},init(l){return l!==void 0&&this.C(n,void 0,g,l),l}}}if(o==="setter"){const{name:n}=a;return function(l){const r=this[n];e.call(this,l),this.requestUpdate(n,r,g)}}throw Error("Unsupported decorator location: "+o)};function z(g){return(e,a)=>typeof a=="object"?Za(g,e,a):((o,i,t)=>{const n=i.hasOwnProperty(t);return i.constructor.createProperty(t,o),n?Object.getOwnPropertyDescriptor(i,t):void 0})(g,e,a)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function N(g){return z({...g,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Xa=(g,e,a)=>(a.configurable=!0,a.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(g,e,a),a);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ie(g,e){return(a,o,i)=>{const t=n=>{var l;return((l=n.renderRoot)==null?void 0:l.querySelector(g))??null};return Xa(a,o,{get(){return t(this)}})}}var Ja=Object.defineProperty,ei=Object.getOwnPropertyDescriptor,ya=(g,e,a,o)=>{for(var i=o>1?void 0:o?ei(e,a):e,t=g.length-1,n;t>=0;t--)(n=g[t])&&(i=(o?n(e,a,i):n(i))||i);return o&&i&&Ja(e,a,i),i};let ct=class extends B{constructor(){super(...arguments),this.visible=!1}render(){return R``}};ct.styles=V`
    :host {
      display: block; /* Cambiado de none para que la transición funcione */
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: var(--gq-backdrop-bg-color, rgba(17, 24, 39, 0.5)); /* Themed */
      backdrop-filter: blur(var(--gq-backdrop-blur-radius, 5px)); /* Themed */
      -webkit-backdrop-filter: blur(var(--gq-backdrop-blur-radius, 5px));
      opacity: 0;
      visibility: hidden; /* Oculto por defecto */
      transition: opacity 0.4s ease-in-out, visibility 0s linear 0.4s; /* Ocultar visibility después de opacidad */
      pointer-events: none;
      z-index: 100; /* Mantenemos el z-index original */
      will-change: opacity; /* Optimización para la transición */
    }

    :host([visible]) {
      opacity: 1;
      visibility: visible; /* Visible cuando el atributo está presente */
      transition: opacity 0.4s ease-in-out, visibility 0s linear 0s; /* Mostrar visibility inmediatamente */
      /* Mantenemos pointer-events: none; el backdrop nunca debe ser interactivo */
    }
  `;ya([z({type:Boolean,reflect:!0})],ct.prototype,"visible",2);ct=ya([Q("blur-backdrop-component")],ct);var Xt=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function ti(g){return g&&g.__esModule&&Object.prototype.hasOwnProperty.call(g,"default")?g.default:g}var ot={exports:{}};/*!
 * matter-js 0.20.0 by @liabru
 * http://brm.io/matter-js/
 * License MIT
 * 
 * The MIT License (MIT)
 * 
 * Copyright (c) Liam Brummitt and contributors.
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */var ai=ot.exports,Jt;function ii(){return Jt||(Jt=1,function(g,e){(function(o,i){g.exports=i()})(ai,function(){return function(a){var o={};function i(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return a[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}return i.m=a,i.c=o,i.d=function(t,n,l){i.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:l})},i.r=function(t){typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,n){if(n&1&&(t=i(t)),n&8||n&4&&typeof t=="object"&&t&&t.__esModule)return t;var l=Object.create(null);if(i.r(l),Object.defineProperty(l,"default",{enumerable:!0,value:t}),n&2&&typeof t!="string")for(var r in t)i.d(l,r,(function(u){return t[u]}).bind(null,r));return l},i.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(n,"a",n),n},i.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},i.p="",i(i.s=20)}([function(a,o){var i={};a.exports=i,function(){i._baseDelta=1e3/60,i._nextId=0,i._seed=0,i._nowStartTime=+new Date,i._warnedOnce={},i._decomp=null,i.extend=function(n,l){var r,u;typeof l=="boolean"?(r=2,u=l):(r=1,u=!0);for(var c=r;c<arguments.length;c++){var f=arguments[c];if(f)for(var p in f)u&&f[p]&&f[p].constructor===Object&&(!n[p]||n[p].constructor===Object)?(n[p]=n[p]||{},i.extend(n[p],u,f[p])):n[p]=f[p]}return n},i.clone=function(n,l){return i.extend({},l,n)},i.keys=function(n){if(Object.keys)return Object.keys(n);var l=[];for(var r in n)l.push(r);return l},i.values=function(n){var l=[];if(Object.keys){for(var r=Object.keys(n),u=0;u<r.length;u++)l.push(n[r[u]]);return l}for(var c in n)l.push(n[c]);return l},i.get=function(n,l,r,u){l=l.split(".").slice(r,u);for(var c=0;c<l.length;c+=1)n=n[l[c]];return n},i.set=function(n,l,r,u,c){var f=l.split(".").slice(u,c);return i.get(n,l,0,-1)[f[f.length-1]]=r,r},i.shuffle=function(n){for(var l=n.length-1;l>0;l--){var r=Math.floor(i.random()*(l+1)),u=n[l];n[l]=n[r],n[r]=u}return n},i.choose=function(n){return n[Math.floor(i.random()*n.length)]},i.isElement=function(n){return typeof HTMLElement<"u"?n instanceof HTMLElement:!!(n&&n.nodeType&&n.nodeName)},i.isArray=function(n){return Object.prototype.toString.call(n)==="[object Array]"},i.isFunction=function(n){return typeof n=="function"},i.isPlainObject=function(n){return typeof n=="object"&&n.constructor===Object},i.isString=function(n){return toString.call(n)==="[object String]"},i.clamp=function(n,l,r){return n<l?l:n>r?r:n},i.sign=function(n){return n<0?-1:1},i.now=function(){if(typeof window<"u"&&window.performance){if(window.performance.now)return window.performance.now();if(window.performance.webkitNow)return window.performance.webkitNow()}return Date.now?Date.now():new Date-i._nowStartTime},i.random=function(n,l){return n=typeof n<"u"?n:0,l=typeof l<"u"?l:1,n+t()*(l-n)};var t=function(){return i._seed=(i._seed*9301+49297)%233280,i._seed/233280};i.colorToNumber=function(n){return n=n.replace("#",""),n.length==3&&(n=n.charAt(0)+n.charAt(0)+n.charAt(1)+n.charAt(1)+n.charAt(2)+n.charAt(2)),parseInt(n,16)},i.logLevel=1,i.log=function(){console&&i.logLevel>0&&i.logLevel<=3&&console.log.apply(console,["matter-js:"].concat(Array.prototype.slice.call(arguments)))},i.info=function(){console&&i.logLevel>0&&i.logLevel<=2&&console.info.apply(console,["matter-js:"].concat(Array.prototype.slice.call(arguments)))},i.warn=function(){console&&i.logLevel>0&&i.logLevel<=3&&console.warn.apply(console,["matter-js:"].concat(Array.prototype.slice.call(arguments)))},i.warnOnce=function(){var n=Array.prototype.slice.call(arguments).join(" ");i._warnedOnce[n]||(i.warn(n),i._warnedOnce[n]=!0)},i.deprecated=function(n,l,r){n[l]=i.chain(function(){i.warnOnce("🔅 deprecated 🔅",r)},n[l])},i.nextId=function(){return i._nextId++},i.indexOf=function(n,l){if(n.indexOf)return n.indexOf(l);for(var r=0;r<n.length;r++)if(n[r]===l)return r;return-1},i.map=function(n,l){if(n.map)return n.map(l);for(var r=[],u=0;u<n.length;u+=1)r.push(l(n[u]));return r},i.topologicalSort=function(n){var l=[],r=[],u=[];for(var c in n)!r[c]&&!u[c]&&i._topologicalSort(c,r,u,n,l);return l},i._topologicalSort=function(n,l,r,u,c){var f=u[n]||[];r[n]=!0;for(var p=0;p<f.length;p+=1){var s=f[p];r[s]||l[s]||i._topologicalSort(s,l,r,u,c)}r[n]=!1,l[n]=!0,c.push(n)},i.chain=function(){for(var n=[],l=0;l<arguments.length;l+=1){var r=arguments[l];r._chained?n.push.apply(n,r._chained):n.push(r)}var u=function(){for(var c,f=new Array(arguments.length),p=0,s=arguments.length;p<s;p++)f[p]=arguments[p];for(p=0;p<n.length;p+=1){var d=n[p].apply(c,f);typeof d<"u"&&(c=d)}return c};return u._chained=n,u},i.chainPathBefore=function(n,l,r){return i.set(n,l,i.chain(r,i.get(n,l)))},i.chainPathAfter=function(n,l,r){return i.set(n,l,i.chain(i.get(n,l),r))},i.setDecomp=function(n){i._decomp=n},i.getDecomp=function(){var n=i._decomp;try{!n&&typeof window<"u"&&(n=window.decomp),!n&&typeof Xt<"u"&&(n=Xt.decomp)}catch{n=null}return n}}()},function(a,o){var i={};a.exports=i,function(){i.create=function(t){var n={min:{x:0,y:0},max:{x:0,y:0}};return t&&i.update(n,t),n},i.update=function(t,n,l){t.min.x=1/0,t.max.x=-1/0,t.min.y=1/0,t.max.y=-1/0;for(var r=0;r<n.length;r++){var u=n[r];u.x>t.max.x&&(t.max.x=u.x),u.x<t.min.x&&(t.min.x=u.x),u.y>t.max.y&&(t.max.y=u.y),u.y<t.min.y&&(t.min.y=u.y)}l&&(l.x>0?t.max.x+=l.x:t.min.x+=l.x,l.y>0?t.max.y+=l.y:t.min.y+=l.y)},i.contains=function(t,n){return n.x>=t.min.x&&n.x<=t.max.x&&n.y>=t.min.y&&n.y<=t.max.y},i.overlaps=function(t,n){return t.min.x<=n.max.x&&t.max.x>=n.min.x&&t.max.y>=n.min.y&&t.min.y<=n.max.y},i.translate=function(t,n){t.min.x+=n.x,t.max.x+=n.x,t.min.y+=n.y,t.max.y+=n.y},i.shift=function(t,n){var l=t.max.x-t.min.x,r=t.max.y-t.min.y;t.min.x=n.x,t.max.x=n.x+l,t.min.y=n.y,t.max.y=n.y+r}}()},function(a,o){var i={};a.exports=i,function(){i.create=function(t,n){return{x:t||0,y:n||0}},i.clone=function(t){return{x:t.x,y:t.y}},i.magnitude=function(t){return Math.sqrt(t.x*t.x+t.y*t.y)},i.magnitudeSquared=function(t){return t.x*t.x+t.y*t.y},i.rotate=function(t,n,l){var r=Math.cos(n),u=Math.sin(n);l||(l={});var c=t.x*r-t.y*u;return l.y=t.x*u+t.y*r,l.x=c,l},i.rotateAbout=function(t,n,l,r){var u=Math.cos(n),c=Math.sin(n);r||(r={});var f=l.x+((t.x-l.x)*u-(t.y-l.y)*c);return r.y=l.y+((t.x-l.x)*c+(t.y-l.y)*u),r.x=f,r},i.normalise=function(t){var n=i.magnitude(t);return n===0?{x:0,y:0}:{x:t.x/n,y:t.y/n}},i.dot=function(t,n){return t.x*n.x+t.y*n.y},i.cross=function(t,n){return t.x*n.y-t.y*n.x},i.cross3=function(t,n,l){return(n.x-t.x)*(l.y-t.y)-(n.y-t.y)*(l.x-t.x)},i.add=function(t,n,l){return l||(l={}),l.x=t.x+n.x,l.y=t.y+n.y,l},i.sub=function(t,n,l){return l||(l={}),l.x=t.x-n.x,l.y=t.y-n.y,l},i.mult=function(t,n){return{x:t.x*n,y:t.y*n}},i.div=function(t,n){return{x:t.x/n,y:t.y/n}},i.perp=function(t,n){return n=n===!0?-1:1,{x:n*-t.y,y:n*t.x}},i.neg=function(t){return{x:-t.x,y:-t.y}},i.angle=function(t,n){return Math.atan2(n.y-t.y,n.x-t.x)},i._temp=[i.create(),i.create(),i.create(),i.create(),i.create(),i.create()]}()},function(a,o,i){var t={};a.exports=t;var n=i(2),l=i(0);(function(){t.create=function(r,u){for(var c=[],f=0;f<r.length;f++){var p=r[f],s={x:p.x,y:p.y,index:f,body:u,isInternal:!1};c.push(s)}return c},t.fromPath=function(r,u){var c=/L?\s*([-\d.e]+)[\s,]*([-\d.e]+)*/ig,f=[];return r.replace(c,function(p,s,d){f.push({x:parseFloat(s),y:parseFloat(d)})}),t.create(f,u)},t.centre=function(r){for(var u=t.area(r,!0),c={x:0,y:0},f,p,s,d=0;d<r.length;d++)s=(d+1)%r.length,f=n.cross(r[d],r[s]),p=n.mult(n.add(r[d],r[s]),f),c=n.add(c,p);return n.div(c,6*u)},t.mean=function(r){for(var u={x:0,y:0},c=0;c<r.length;c++)u.x+=r[c].x,u.y+=r[c].y;return n.div(u,r.length)},t.area=function(r,u){for(var c=0,f=r.length-1,p=0;p<r.length;p++)c+=(r[f].x-r[p].x)*(r[f].y+r[p].y),f=p;return u?c/2:Math.abs(c)/2},t.inertia=function(r,u){for(var c=0,f=0,p=r,s,d,h=0;h<p.length;h++)d=(h+1)%p.length,s=Math.abs(n.cross(p[d],p[h])),c+=s*(n.dot(p[d],p[d])+n.dot(p[d],p[h])+n.dot(p[h],p[h])),f+=s;return u/6*(c/f)},t.translate=function(r,u,c){c=typeof c<"u"?c:1;var f=r.length,p=u.x*c,s=u.y*c,d;for(d=0;d<f;d++)r[d].x+=p,r[d].y+=s;return r},t.rotate=function(r,u,c){if(u!==0){var f=Math.cos(u),p=Math.sin(u),s=c.x,d=c.y,h=r.length,m,y,w,E;for(E=0;E<h;E++)m=r[E],y=m.x-s,w=m.y-d,m.x=s+(y*f-w*p),m.y=d+(y*p+w*f);return r}},t.contains=function(r,u){for(var c=u.x,f=u.y,p=r.length,s=r[p-1],d,h=0;h<p;h++){if(d=r[h],(c-s.x)*(d.y-s.y)+(f-s.y)*(s.x-d.x)>0)return!1;s=d}return!0},t.scale=function(r,u,c,f){if(u===1&&c===1)return r;f=f||t.centre(r);for(var p,s,d=0;d<r.length;d++)p=r[d],s=n.sub(p,f),r[d].x=f.x+s.x*u,r[d].y=f.y+s.y*c;return r},t.chamfer=function(r,u,c,f,p){typeof u=="number"?u=[u]:u=u||[8],c=typeof c<"u"?c:-1,f=f||2,p=p||14;for(var s=[],d=0;d<r.length;d++){var h=r[d-1>=0?d-1:r.length-1],m=r[d],y=r[(d+1)%r.length],w=u[d<u.length?d:u.length-1];if(w===0){s.push(m);continue}var E=n.normalise({x:m.y-h.y,y:h.x-m.x}),A=n.normalise({x:y.y-m.y,y:m.x-y.x}),v=Math.sqrt(2*Math.pow(w,2)),x=n.mult(l.clone(E),w),C=n.normalise(n.mult(n.add(E,A),.5)),b=n.sub(m,n.mult(C,v)),M=c;c===-1&&(M=Math.pow(w,.32)*1.75),M=l.clamp(M,f,p),M%2===1&&(M+=1);for(var S=Math.acos(n.dot(E,A)),I=S/M,q=0;q<M;q++)s.push(n.add(n.rotate(x,I*q),b))}return s},t.clockwiseSort=function(r){var u=t.mean(r);return r.sort(function(c,f){return n.angle(u,c)-n.angle(u,f)}),r},t.isConvex=function(r){var u=0,c=r.length,f,p,s,d;if(c<3)return null;for(f=0;f<c;f++)if(p=(f+1)%c,s=(f+2)%c,d=(r[p].x-r[f].x)*(r[s].y-r[p].y),d-=(r[p].y-r[f].y)*(r[s].x-r[p].x),d<0?u|=1:d>0&&(u|=2),u===3)return!1;return u!==0?!0:null},t.hull=function(r){var u=[],c=[],f,p;for(r=r.slice(0),r.sort(function(s,d){var h=s.x-d.x;return h!==0?h:s.y-d.y}),p=0;p<r.length;p+=1){for(f=r[p];c.length>=2&&n.cross3(c[c.length-2],c[c.length-1],f)<=0;)c.pop();c.push(f)}for(p=r.length-1;p>=0;p-=1){for(f=r[p];u.length>=2&&n.cross3(u[u.length-2],u[u.length-1],f)<=0;)u.pop();u.push(f)}return u.pop(),c.pop(),u.concat(c)}})()},function(a,o,i){var t={};a.exports=t;var n=i(3),l=i(2),r=i(7),u=i(0),c=i(1),f=i(11);(function(){t._timeCorrection=!0,t._inertiaScale=4,t._nextCollidingGroupId=1,t._nextNonCollidingGroupId=-1,t._nextCategory=1,t._baseDelta=1e3/60,t.create=function(s){var d={id:u.nextId(),type:"body",label:"Body",parts:[],plugin:{},angle:0,vertices:n.fromPath("L 0 0 L 40 0 L 40 40 L 0 40"),position:{x:0,y:0},force:{x:0,y:0},torque:0,positionImpulse:{x:0,y:0},constraintImpulse:{x:0,y:0,angle:0},totalContacts:0,speed:0,angularSpeed:0,velocity:{x:0,y:0},angularVelocity:0,isSensor:!1,isStatic:!1,isSleeping:!1,motion:0,sleepThreshold:60,density:.001,restitution:0,friction:.1,frictionStatic:.5,frictionAir:.01,collisionFilter:{category:1,mask:4294967295,group:0},slop:.05,timeScale:1,render:{visible:!0,opacity:1,strokeStyle:null,fillStyle:null,lineWidth:null,sprite:{xScale:1,yScale:1,xOffset:0,yOffset:0}},events:null,bounds:null,chamfer:null,circleRadius:0,positionPrev:null,anglePrev:0,parent:null,axes:null,area:0,mass:0,inertia:0,deltaTime:16.666666666666668,_original:null},h=u.extend(d,s);return p(h,s),h},t.nextGroup=function(s){return s?t._nextNonCollidingGroupId--:t._nextCollidingGroupId++},t.nextCategory=function(){return t._nextCategory=t._nextCategory<<1,t._nextCategory};var p=function(s,d){d=d||{},t.set(s,{bounds:s.bounds||c.create(s.vertices),positionPrev:s.positionPrev||l.clone(s.position),anglePrev:s.anglePrev||s.angle,vertices:s.vertices,parts:s.parts||[s],isStatic:s.isStatic,isSleeping:s.isSleeping,parent:s.parent||s}),n.rotate(s.vertices,s.angle,s.position),f.rotate(s.axes,s.angle),c.update(s.bounds,s.vertices,s.velocity),t.set(s,{axes:d.axes||s.axes,area:d.area||s.area,mass:d.mass||s.mass,inertia:d.inertia||s.inertia});var h=s.isStatic?"#14151f":u.choose(["#f19648","#f5d259","#f55a3c","#063e7b","#ececd1"]),m=s.isStatic?"#555":"#ccc",y=s.isStatic&&s.render.fillStyle===null?1:0;s.render.fillStyle=s.render.fillStyle||h,s.render.strokeStyle=s.render.strokeStyle||m,s.render.lineWidth=s.render.lineWidth||y,s.render.sprite.xOffset+=-(s.bounds.min.x-s.position.x)/(s.bounds.max.x-s.bounds.min.x),s.render.sprite.yOffset+=-(s.bounds.min.y-s.position.y)/(s.bounds.max.y-s.bounds.min.y)};t.set=function(s,d,h){var m;typeof d=="string"&&(m=d,d={},d[m]=h);for(m in d)if(Object.prototype.hasOwnProperty.call(d,m))switch(h=d[m],m){case"isStatic":t.setStatic(s,h);break;case"isSleeping":r.set(s,h);break;case"mass":t.setMass(s,h);break;case"density":t.setDensity(s,h);break;case"inertia":t.setInertia(s,h);break;case"vertices":t.setVertices(s,h);break;case"position":t.setPosition(s,h);break;case"angle":t.setAngle(s,h);break;case"velocity":t.setVelocity(s,h);break;case"angularVelocity":t.setAngularVelocity(s,h);break;case"speed":t.setSpeed(s,h);break;case"angularSpeed":t.setAngularSpeed(s,h);break;case"parts":t.setParts(s,h);break;case"centre":t.setCentre(s,h);break;default:s[m]=h}},t.setStatic=function(s,d){for(var h=0;h<s.parts.length;h++){var m=s.parts[h];d?(m.isStatic||(m._original={restitution:m.restitution,friction:m.friction,mass:m.mass,inertia:m.inertia,density:m.density,inverseMass:m.inverseMass,inverseInertia:m.inverseInertia}),m.restitution=0,m.friction=1,m.mass=m.inertia=m.density=1/0,m.inverseMass=m.inverseInertia=0,m.positionPrev.x=m.position.x,m.positionPrev.y=m.position.y,m.anglePrev=m.angle,m.angularVelocity=0,m.speed=0,m.angularSpeed=0,m.motion=0):m._original&&(m.restitution=m._original.restitution,m.friction=m._original.friction,m.mass=m._original.mass,m.inertia=m._original.inertia,m.density=m._original.density,m.inverseMass=m._original.inverseMass,m.inverseInertia=m._original.inverseInertia,m._original=null),m.isStatic=d}},t.setMass=function(s,d){var h=s.inertia/(s.mass/6);s.inertia=h*(d/6),s.inverseInertia=1/s.inertia,s.mass=d,s.inverseMass=1/s.mass,s.density=s.mass/s.area},t.setDensity=function(s,d){t.setMass(s,d*s.area),s.density=d},t.setInertia=function(s,d){s.inertia=d,s.inverseInertia=1/s.inertia},t.setVertices=function(s,d){d[0].body===s?s.vertices=d:s.vertices=n.create(d,s),s.axes=f.fromVertices(s.vertices),s.area=n.area(s.vertices),t.setMass(s,s.density*s.area);var h=n.centre(s.vertices);n.translate(s.vertices,h,-1),t.setInertia(s,t._inertiaScale*n.inertia(s.vertices,s.mass)),n.translate(s.vertices,s.position),c.update(s.bounds,s.vertices,s.velocity)},t.setParts=function(s,d,h){var m;for(d=d.slice(0),s.parts.length=0,s.parts.push(s),s.parent=s,m=0;m<d.length;m++){var y=d[m];y!==s&&(y.parent=s,s.parts.push(y))}if(s.parts.length!==1){if(h=typeof h<"u"?h:!0,h){var w=[];for(m=0;m<d.length;m++)w=w.concat(d[m].vertices);n.clockwiseSort(w);var E=n.hull(w),A=n.centre(E);t.setVertices(s,E),n.translate(s.vertices,A)}var v=t._totalProperties(s);s.area=v.area,s.parent=s,s.position.x=v.centre.x,s.position.y=v.centre.y,s.positionPrev.x=v.centre.x,s.positionPrev.y=v.centre.y,t.setMass(s,v.mass),t.setInertia(s,v.inertia),t.setPosition(s,v.centre)}},t.setCentre=function(s,d,h){h?(s.positionPrev.x+=d.x,s.positionPrev.y+=d.y,s.position.x+=d.x,s.position.y+=d.y):(s.positionPrev.x=d.x-(s.position.x-s.positionPrev.x),s.positionPrev.y=d.y-(s.position.y-s.positionPrev.y),s.position.x=d.x,s.position.y=d.y)},t.setPosition=function(s,d,h){var m=l.sub(d,s.position);h?(s.positionPrev.x=s.position.x,s.positionPrev.y=s.position.y,s.velocity.x=m.x,s.velocity.y=m.y,s.speed=l.magnitude(m)):(s.positionPrev.x+=m.x,s.positionPrev.y+=m.y);for(var y=0;y<s.parts.length;y++){var w=s.parts[y];w.position.x+=m.x,w.position.y+=m.y,n.translate(w.vertices,m),c.update(w.bounds,w.vertices,s.velocity)}},t.setAngle=function(s,d,h){var m=d-s.angle;h?(s.anglePrev=s.angle,s.angularVelocity=m,s.angularSpeed=Math.abs(m)):s.anglePrev+=m;for(var y=0;y<s.parts.length;y++){var w=s.parts[y];w.angle+=m,n.rotate(w.vertices,m,s.position),f.rotate(w.axes,m),c.update(w.bounds,w.vertices,s.velocity),y>0&&l.rotateAbout(w.position,m,s.position,w.position)}},t.setVelocity=function(s,d){var h=s.deltaTime/t._baseDelta;s.positionPrev.x=s.position.x-d.x*h,s.positionPrev.y=s.position.y-d.y*h,s.velocity.x=(s.position.x-s.positionPrev.x)/h,s.velocity.y=(s.position.y-s.positionPrev.y)/h,s.speed=l.magnitude(s.velocity)},t.getVelocity=function(s){var d=t._baseDelta/s.deltaTime;return{x:(s.position.x-s.positionPrev.x)*d,y:(s.position.y-s.positionPrev.y)*d}},t.getSpeed=function(s){return l.magnitude(t.getVelocity(s))},t.setSpeed=function(s,d){t.setVelocity(s,l.mult(l.normalise(t.getVelocity(s)),d))},t.setAngularVelocity=function(s,d){var h=s.deltaTime/t._baseDelta;s.anglePrev=s.angle-d*h,s.angularVelocity=(s.angle-s.anglePrev)/h,s.angularSpeed=Math.abs(s.angularVelocity)},t.getAngularVelocity=function(s){return(s.angle-s.anglePrev)*t._baseDelta/s.deltaTime},t.getAngularSpeed=function(s){return Math.abs(t.getAngularVelocity(s))},t.setAngularSpeed=function(s,d){t.setAngularVelocity(s,u.sign(t.getAngularVelocity(s))*d)},t.translate=function(s,d,h){t.setPosition(s,l.add(s.position,d),h)},t.rotate=function(s,d,h,m){if(!h)t.setAngle(s,s.angle+d,m);else{var y=Math.cos(d),w=Math.sin(d),E=s.position.x-h.x,A=s.position.y-h.y;t.setPosition(s,{x:h.x+(E*y-A*w),y:h.y+(E*w+A*y)},m),t.setAngle(s,s.angle+d,m)}},t.scale=function(s,d,h,m){var y=0,w=0;m=m||s.position;for(var E=0;E<s.parts.length;E++){var A=s.parts[E];n.scale(A.vertices,d,h,m),A.axes=f.fromVertices(A.vertices),A.area=n.area(A.vertices),t.setMass(A,s.density*A.area),n.translate(A.vertices,{x:-A.position.x,y:-A.position.y}),t.setInertia(A,t._inertiaScale*n.inertia(A.vertices,A.mass)),n.translate(A.vertices,{x:A.position.x,y:A.position.y}),E>0&&(y+=A.area,w+=A.inertia),A.position.x=m.x+(A.position.x-m.x)*d,A.position.y=m.y+(A.position.y-m.y)*h,c.update(A.bounds,A.vertices,s.velocity)}s.parts.length>1&&(s.area=y,s.isStatic||(t.setMass(s,s.density*y),t.setInertia(s,w))),s.circleRadius&&(d===h?s.circleRadius*=d:s.circleRadius=null)},t.update=function(s,d){d=(typeof d<"u"?d:1e3/60)*s.timeScale;var h=d*d,m=t._timeCorrection?d/(s.deltaTime||d):1,y=1-s.frictionAir*(d/u._baseDelta),w=(s.position.x-s.positionPrev.x)*m,E=(s.position.y-s.positionPrev.y)*m;s.velocity.x=w*y+s.force.x/s.mass*h,s.velocity.y=E*y+s.force.y/s.mass*h,s.positionPrev.x=s.position.x,s.positionPrev.y=s.position.y,s.position.x+=s.velocity.x,s.position.y+=s.velocity.y,s.deltaTime=d,s.angularVelocity=(s.angle-s.anglePrev)*y*m+s.torque/s.inertia*h,s.anglePrev=s.angle,s.angle+=s.angularVelocity;for(var A=0;A<s.parts.length;A++){var v=s.parts[A];n.translate(v.vertices,s.velocity),A>0&&(v.position.x+=s.velocity.x,v.position.y+=s.velocity.y),s.angularVelocity!==0&&(n.rotate(v.vertices,s.angularVelocity,s.position),f.rotate(v.axes,s.angularVelocity),A>0&&l.rotateAbout(v.position,s.angularVelocity,s.position,v.position)),c.update(v.bounds,v.vertices,s.velocity)}},t.updateVelocities=function(s){var d=t._baseDelta/s.deltaTime,h=s.velocity;h.x=(s.position.x-s.positionPrev.x)*d,h.y=(s.position.y-s.positionPrev.y)*d,s.speed=Math.sqrt(h.x*h.x+h.y*h.y),s.angularVelocity=(s.angle-s.anglePrev)*d,s.angularSpeed=Math.abs(s.angularVelocity)},t.applyForce=function(s,d,h){var m={x:d.x-s.position.x,y:d.y-s.position.y};s.force.x+=h.x,s.force.y+=h.y,s.torque+=m.x*h.y-m.y*h.x},t._totalProperties=function(s){for(var d={mass:0,area:0,inertia:0,centre:{x:0,y:0}},h=s.parts.length===1?0:1;h<s.parts.length;h++){var m=s.parts[h],y=m.mass!==1/0?m.mass:1;d.mass+=y,d.area+=m.area,d.inertia+=m.inertia,d.centre=l.add(d.centre,l.mult(m.position,y))}return d.centre=l.div(d.centre,d.mass),d}})()},function(a,o,i){var t={};a.exports=t;var n=i(0);(function(){t.on=function(l,r,u){for(var c=r.split(" "),f,p=0;p<c.length;p++)f=c[p],l.events=l.events||{},l.events[f]=l.events[f]||[],l.events[f].push(u);return u},t.off=function(l,r,u){if(!r){l.events={};return}typeof r=="function"&&(u=r,r=n.keys(l.events).join(" "));for(var c=r.split(" "),f=0;f<c.length;f++){var p=l.events[c[f]],s=[];if(u&&p)for(var d=0;d<p.length;d++)p[d]!==u&&s.push(p[d]);l.events[c[f]]=s}},t.trigger=function(l,r,u){var c,f,p,s,d=l.events;if(d&&n.keys(d).length>0){u||(u={}),c=r.split(" ");for(var h=0;h<c.length;h++)if(f=c[h],p=d[f],p){s=n.clone(u,!1),s.name=f,s.source=l;for(var m=0;m<p.length;m++)p[m].apply(l,[s])}}}})()},function(a,o,i){var t={};a.exports=t;var n=i(5),l=i(0),r=i(1),u=i(4);(function(){t.create=function(c){return l.extend({id:l.nextId(),type:"composite",parent:null,isModified:!1,bodies:[],constraints:[],composites:[],label:"Composite",plugin:{},cache:{allBodies:null,allConstraints:null,allComposites:null}},c)},t.setModified=function(c,f,p,s){if(c.isModified=f,f&&c.cache&&(c.cache.allBodies=null,c.cache.allConstraints=null,c.cache.allComposites=null),p&&c.parent&&t.setModified(c.parent,f,p,s),s)for(var d=0;d<c.composites.length;d++){var h=c.composites[d];t.setModified(h,f,p,s)}},t.add=function(c,f){var p=[].concat(f);n.trigger(c,"beforeAdd",{object:f});for(var s=0;s<p.length;s++){var d=p[s];switch(d.type){case"body":if(d.parent!==d){l.warn("Composite.add: skipped adding a compound body part (you must add its parent instead)");break}t.addBody(c,d);break;case"constraint":t.addConstraint(c,d);break;case"composite":t.addComposite(c,d);break;case"mouseConstraint":t.addConstraint(c,d.constraint);break}}return n.trigger(c,"afterAdd",{object:f}),c},t.remove=function(c,f,p){var s=[].concat(f);n.trigger(c,"beforeRemove",{object:f});for(var d=0;d<s.length;d++){var h=s[d];switch(h.type){case"body":t.removeBody(c,h,p);break;case"constraint":t.removeConstraint(c,h,p);break;case"composite":t.removeComposite(c,h,p);break;case"mouseConstraint":t.removeConstraint(c,h.constraint);break}}return n.trigger(c,"afterRemove",{object:f}),c},t.addComposite=function(c,f){return c.composites.push(f),f.parent=c,t.setModified(c,!0,!0,!1),c},t.removeComposite=function(c,f,p){var s=l.indexOf(c.composites,f);if(s!==-1){var d=t.allBodies(f);t.removeCompositeAt(c,s);for(var h=0;h<d.length;h++)d[h].sleepCounter=0}if(p)for(var h=0;h<c.composites.length;h++)t.removeComposite(c.composites[h],f,!0);return c},t.removeCompositeAt=function(c,f){return c.composites.splice(f,1),t.setModified(c,!0,!0,!1),c},t.addBody=function(c,f){return c.bodies.push(f),t.setModified(c,!0,!0,!1),c},t.removeBody=function(c,f,p){var s=l.indexOf(c.bodies,f);if(s!==-1&&(t.removeBodyAt(c,s),f.sleepCounter=0),p)for(var d=0;d<c.composites.length;d++)t.removeBody(c.composites[d],f,!0);return c},t.removeBodyAt=function(c,f){return c.bodies.splice(f,1),t.setModified(c,!0,!0,!1),c},t.addConstraint=function(c,f){return c.constraints.push(f),t.setModified(c,!0,!0,!1),c},t.removeConstraint=function(c,f,p){var s=l.indexOf(c.constraints,f);if(s!==-1&&t.removeConstraintAt(c,s),p)for(var d=0;d<c.composites.length;d++)t.removeConstraint(c.composites[d],f,!0);return c},t.removeConstraintAt=function(c,f){return c.constraints.splice(f,1),t.setModified(c,!0,!0,!1),c},t.clear=function(c,f,p){if(p)for(var s=0;s<c.composites.length;s++)t.clear(c.composites[s],f,!0);return f?c.bodies=c.bodies.filter(function(d){return d.isStatic}):c.bodies.length=0,c.constraints.length=0,c.composites.length=0,t.setModified(c,!0,!0,!1),c},t.allBodies=function(c){if(c.cache&&c.cache.allBodies)return c.cache.allBodies;for(var f=[].concat(c.bodies),p=0;p<c.composites.length;p++)f=f.concat(t.allBodies(c.composites[p]));return c.cache&&(c.cache.allBodies=f),f},t.allConstraints=function(c){if(c.cache&&c.cache.allConstraints)return c.cache.allConstraints;for(var f=[].concat(c.constraints),p=0;p<c.composites.length;p++)f=f.concat(t.allConstraints(c.composites[p]));return c.cache&&(c.cache.allConstraints=f),f},t.allComposites=function(c){if(c.cache&&c.cache.allComposites)return c.cache.allComposites;for(var f=[].concat(c.composites),p=0;p<c.composites.length;p++)f=f.concat(t.allComposites(c.composites[p]));return c.cache&&(c.cache.allComposites=f),f},t.get=function(c,f,p){var s,d;switch(p){case"body":s=t.allBodies(c);break;case"constraint":s=t.allConstraints(c);break;case"composite":s=t.allComposites(c).concat(c);break}return s?(d=s.filter(function(h){return h.id.toString()===f.toString()}),d.length===0?null:d[0]):null},t.move=function(c,f,p){return t.remove(c,f),t.add(p,f),c},t.rebase=function(c){for(var f=t.allBodies(c).concat(t.allConstraints(c)).concat(t.allComposites(c)),p=0;p<f.length;p++)f[p].id=l.nextId();return c},t.translate=function(c,f,p){for(var s=p?t.allBodies(c):c.bodies,d=0;d<s.length;d++)u.translate(s[d],f);return c},t.rotate=function(c,f,p,s){for(var d=Math.cos(f),h=Math.sin(f),m=s?t.allBodies(c):c.bodies,y=0;y<m.length;y++){var w=m[y],E=w.position.x-p.x,A=w.position.y-p.y;u.setPosition(w,{x:p.x+(E*d-A*h),y:p.y+(E*h+A*d)}),u.rotate(w,f)}return c},t.scale=function(c,f,p,s,d){for(var h=d?t.allBodies(c):c.bodies,m=0;m<h.length;m++){var y=h[m],w=y.position.x-s.x,E=y.position.y-s.y;u.setPosition(y,{x:s.x+w*f,y:s.y+E*p}),u.scale(y,f,p)}return c},t.bounds=function(c){for(var f=t.allBodies(c),p=[],s=0;s<f.length;s+=1){var d=f[s];p.push(d.bounds.min,d.bounds.max)}return r.create(p)}})()},function(a,o,i){var t={};a.exports=t;var n=i(4),l=i(5),r=i(0);(function(){t._motionWakeThreshold=.18,t._motionSleepThreshold=.08,t._minBias=.9,t.update=function(u,c){for(var f=c/r._baseDelta,p=t._motionSleepThreshold,s=0;s<u.length;s++){var d=u[s],h=n.getSpeed(d),m=n.getAngularSpeed(d),y=h*h+m*m;if(d.force.x!==0||d.force.y!==0){t.set(d,!1);continue}var w=Math.min(d.motion,y),E=Math.max(d.motion,y);d.motion=t._minBias*w+(1-t._minBias)*E,d.sleepThreshold>0&&d.motion<p?(d.sleepCounter+=1,d.sleepCounter>=d.sleepThreshold/f&&t.set(d,!0)):d.sleepCounter>0&&(d.sleepCounter-=1)}},t.afterCollisions=function(u){for(var c=t._motionSleepThreshold,f=0;f<u.length;f++){var p=u[f];if(p.isActive){var s=p.collision,d=s.bodyA.parent,h=s.bodyB.parent;if(!(d.isSleeping&&h.isSleeping||d.isStatic||h.isStatic)&&(d.isSleeping||h.isSleeping)){var m=d.isSleeping&&!d.isStatic?d:h,y=m===d?h:d;!m.isStatic&&y.motion>c&&t.set(m,!1)}}}},t.set=function(u,c){var f=u.isSleeping;c?(u.isSleeping=!0,u.sleepCounter=u.sleepThreshold,u.positionImpulse.x=0,u.positionImpulse.y=0,u.positionPrev.x=u.position.x,u.positionPrev.y=u.position.y,u.anglePrev=u.angle,u.speed=0,u.angularSpeed=0,u.motion=0,f||l.trigger(u,"sleepStart")):(u.isSleeping=!1,u.sleepCounter=0,f&&l.trigger(u,"sleepEnd"))}})()},function(a,o,i){var t={};a.exports=t;var n=i(3),l=i(9);(function(){var r=[],u={overlap:0,axis:null},c={overlap:0,axis:null};t.create=function(f,p){return{pair:null,collided:!1,bodyA:f,bodyB:p,parentA:f.parent,parentB:p.parent,depth:0,normal:{x:0,y:0},tangent:{x:0,y:0},penetration:{x:0,y:0},supports:[null,null],supportCount:0}},t.collides=function(f,p,s){if(t._overlapAxes(u,f.vertices,p.vertices,f.axes),u.overlap<=0||(t._overlapAxes(c,p.vertices,f.vertices,p.axes),c.overlap<=0))return null;var d=s&&s.table[l.id(f,p)],h;d?h=d.collision:(h=t.create(f,p),h.collided=!0,h.bodyA=f.id<p.id?f:p,h.bodyB=f.id<p.id?p:f,h.parentA=h.bodyA.parent,h.parentB=h.bodyB.parent),f=h.bodyA,p=h.bodyB;var m;u.overlap<c.overlap?m=u:m=c;var y=h.normal,w=h.tangent,E=h.penetration,A=h.supports,v=m.overlap,x=m.axis,C=x.x,b=x.y,M=p.position.x-f.position.x,S=p.position.y-f.position.y;C*M+b*S>=0&&(C=-C,b=-b),y.x=C,y.y=b,w.x=-b,w.y=C,E.x=C*v,E.y=b*v,h.depth=v;var I=t._findSupports(f,p,y,1),q=0;if(n.contains(f.vertices,I[0])&&(A[q++]=I[0]),n.contains(f.vertices,I[1])&&(A[q++]=I[1]),q<2){var T=t._findSupports(p,f,y,-1);n.contains(p.vertices,T[0])&&(A[q++]=T[0]),q<2&&n.contains(p.vertices,T[1])&&(A[q++]=T[1])}return q===0&&(A[q++]=I[0]),h.supportCount=q,h},t._overlapAxes=function(f,p,s,d){var h=p.length,m=s.length,y=p[0].x,w=p[0].y,E=s[0].x,A=s[0].y,v=d.length,x=Number.MAX_VALUE,C=0,b,M,S,I,q,T;for(q=0;q<v;q++){var P=d[q],k=P.x,_=P.y,D=y*k+w*_,$=E*k+A*_,F=D,G=$;for(T=1;T<h;T+=1)I=p[T].x*k+p[T].y*_,I>F?F=I:I<D&&(D=I);for(T=1;T<m;T+=1)I=s[T].x*k+s[T].y*_,I>G?G=I:I<$&&($=I);if(M=F-$,S=G-D,b=M<S?M:S,b<x&&(x=b,C=q,b<=0))break}f.axis=d[C],f.overlap=x},t._findSupports=function(f,p,s,d){var h=p.vertices,m=h.length,y=f.position.x,w=f.position.y,E=s.x*d,A=s.y*d,v=h[0],x=v,C=E*(y-x.x)+A*(w-x.y),b,M,S;for(S=1;S<m;S+=1)x=h[S],M=E*(y-x.x)+A*(w-x.y),M<C&&(C=M,v=x);return b=h[(m+v.index-1)%m],C=E*(y-b.x)+A*(w-b.y),x=h[(v.index+1)%m],E*(y-x.x)+A*(w-x.y)<C?(r[0]=v,r[1]=x,r):(r[0]=v,r[1]=b,r)}})()},function(a,o,i){var t={};a.exports=t;var n=i(16);(function(){t.create=function(l,r){var u=l.bodyA,c=l.bodyB,f={id:t.id(u,c),bodyA:u,bodyB:c,collision:l,contacts:[n.create(),n.create()],contactCount:0,separation:0,isActive:!0,isSensor:u.isSensor||c.isSensor,timeCreated:r,timeUpdated:r,inverseMass:0,friction:0,frictionStatic:0,restitution:0,slop:0};return t.update(f,l,r),f},t.update=function(l,r,u){var c=r.supports,f=r.supportCount,p=l.contacts,s=r.parentA,d=r.parentB;l.isActive=!0,l.timeUpdated=u,l.collision=r,l.separation=r.depth,l.inverseMass=s.inverseMass+d.inverseMass,l.friction=s.friction<d.friction?s.friction:d.friction,l.frictionStatic=s.frictionStatic>d.frictionStatic?s.frictionStatic:d.frictionStatic,l.restitution=s.restitution>d.restitution?s.restitution:d.restitution,l.slop=s.slop>d.slop?s.slop:d.slop,l.contactCount=f,r.pair=l;var h=c[0],m=p[0],y=c[1],w=p[1];(w.vertex===h||m.vertex===y)&&(p[1]=m,p[0]=m=w,w=p[1]),m.vertex=h,w.vertex=y},t.setActive=function(l,r,u){r?(l.isActive=!0,l.timeUpdated=u):(l.isActive=!1,l.contactCount=0)},t.id=function(l,r){return l.id<r.id?l.id.toString(36)+":"+r.id.toString(36):r.id.toString(36)+":"+l.id.toString(36)}})()},function(a,o,i){var t={};a.exports=t;var n=i(3),l=i(2),r=i(7),u=i(1),c=i(11),f=i(0);(function(){t._warming=.4,t._torqueDampen=1,t._minLength=1e-6,t.create=function(p){var s=p;s.bodyA&&!s.pointA&&(s.pointA={x:0,y:0}),s.bodyB&&!s.pointB&&(s.pointB={x:0,y:0});var d=s.bodyA?l.add(s.bodyA.position,s.pointA):s.pointA,h=s.bodyB?l.add(s.bodyB.position,s.pointB):s.pointB,m=l.magnitude(l.sub(d,h));s.length=typeof s.length<"u"?s.length:m,s.id=s.id||f.nextId(),s.label=s.label||"Constraint",s.type="constraint",s.stiffness=s.stiffness||(s.length>0?1:.7),s.damping=s.damping||0,s.angularStiffness=s.angularStiffness||0,s.angleA=s.bodyA?s.bodyA.angle:s.angleA,s.angleB=s.bodyB?s.bodyB.angle:s.angleB,s.plugin={};var y={visible:!0,lineWidth:2,strokeStyle:"#ffffff",type:"line",anchors:!0};return s.length===0&&s.stiffness>.1?(y.type="pin",y.anchors=!1):s.stiffness<.9&&(y.type="spring"),s.render=f.extend(y,s.render),s},t.preSolveAll=function(p){for(var s=0;s<p.length;s+=1){var d=p[s],h=d.constraintImpulse;d.isStatic||h.x===0&&h.y===0&&h.angle===0||(d.position.x+=h.x,d.position.y+=h.y,d.angle+=h.angle)}},t.solveAll=function(p,s){for(var d=f.clamp(s/f._baseDelta,0,1),h=0;h<p.length;h+=1){var m=p[h],y=!m.bodyA||m.bodyA&&m.bodyA.isStatic,w=!m.bodyB||m.bodyB&&m.bodyB.isStatic;(y||w)&&t.solve(p[h],d)}for(h=0;h<p.length;h+=1)m=p[h],y=!m.bodyA||m.bodyA&&m.bodyA.isStatic,w=!m.bodyB||m.bodyB&&m.bodyB.isStatic,!y&&!w&&t.solve(p[h],d)},t.solve=function(p,s){var d=p.bodyA,h=p.bodyB,m=p.pointA,y=p.pointB;if(!(!d&&!h)){d&&!d.isStatic&&(l.rotate(m,d.angle-p.angleA,m),p.angleA=d.angle),h&&!h.isStatic&&(l.rotate(y,h.angle-p.angleB,y),p.angleB=h.angle);var w=m,E=y;if(d&&(w=l.add(d.position,m)),h&&(E=l.add(h.position,y)),!(!w||!E)){var A=l.sub(w,E),v=l.magnitude(A);v<t._minLength&&(v=t._minLength);var x=(v-p.length)/v,C=p.stiffness>=1||p.length===0,b=C?p.stiffness*s:p.stiffness*s*s,M=p.damping*s,S=l.mult(A,x*b),I=(d?d.inverseMass:0)+(h?h.inverseMass:0),q=(d?d.inverseInertia:0)+(h?h.inverseInertia:0),T=I+q,P,k,_,D,$;if(M>0){var F=l.create();_=l.div(A,v),$=l.sub(h&&l.sub(h.position,h.positionPrev)||F,d&&l.sub(d.position,d.positionPrev)||F),D=l.dot(_,$)}d&&!d.isStatic&&(k=d.inverseMass/I,d.constraintImpulse.x-=S.x*k,d.constraintImpulse.y-=S.y*k,d.position.x-=S.x*k,d.position.y-=S.y*k,M>0&&(d.positionPrev.x-=M*_.x*D*k,d.positionPrev.y-=M*_.y*D*k),P=l.cross(m,S)/T*t._torqueDampen*d.inverseInertia*(1-p.angularStiffness),d.constraintImpulse.angle-=P,d.angle-=P),h&&!h.isStatic&&(k=h.inverseMass/I,h.constraintImpulse.x+=S.x*k,h.constraintImpulse.y+=S.y*k,h.position.x+=S.x*k,h.position.y+=S.y*k,M>0&&(h.positionPrev.x+=M*_.x*D*k,h.positionPrev.y+=M*_.y*D*k),P=l.cross(y,S)/T*t._torqueDampen*h.inverseInertia*(1-p.angularStiffness),h.constraintImpulse.angle+=P,h.angle+=P)}}},t.postSolveAll=function(p){for(var s=0;s<p.length;s++){var d=p[s],h=d.constraintImpulse;if(!(d.isStatic||h.x===0&&h.y===0&&h.angle===0)){r.set(d,!1);for(var m=0;m<d.parts.length;m++){var y=d.parts[m];n.translate(y.vertices,h),m>0&&(y.position.x+=h.x,y.position.y+=h.y),h.angle!==0&&(n.rotate(y.vertices,h.angle,d.position),c.rotate(y.axes,h.angle),m>0&&l.rotateAbout(y.position,h.angle,d.position,y.position)),u.update(y.bounds,y.vertices,d.velocity)}h.angle*=t._warming,h.x*=t._warming,h.y*=t._warming}}},t.pointAWorld=function(p){return{x:(p.bodyA?p.bodyA.position.x:0)+(p.pointA?p.pointA.x:0),y:(p.bodyA?p.bodyA.position.y:0)+(p.pointA?p.pointA.y:0)}},t.pointBWorld=function(p){return{x:(p.bodyB?p.bodyB.position.x:0)+(p.pointB?p.pointB.x:0),y:(p.bodyB?p.bodyB.position.y:0)+(p.pointB?p.pointB.y:0)}},t.currentLength=function(p){var s=(p.bodyA?p.bodyA.position.x:0)+(p.pointA?p.pointA.x:0),d=(p.bodyA?p.bodyA.position.y:0)+(p.pointA?p.pointA.y:0),h=(p.bodyB?p.bodyB.position.x:0)+(p.pointB?p.pointB.x:0),m=(p.bodyB?p.bodyB.position.y:0)+(p.pointB?p.pointB.y:0),y=s-h,w=d-m;return Math.sqrt(y*y+w*w)}})()},function(a,o,i){var t={};a.exports=t;var n=i(2),l=i(0);(function(){t.fromVertices=function(r){for(var u={},c=0;c<r.length;c++){var f=(c+1)%r.length,p=n.normalise({x:r[f].y-r[c].y,y:r[c].x-r[f].x}),s=p.y===0?1/0:p.x/p.y;s=s.toFixed(3).toString(),u[s]=p}return l.values(u)},t.rotate=function(r,u){if(u!==0)for(var c=Math.cos(u),f=Math.sin(u),p=0;p<r.length;p++){var s=r[p],d;d=s.x*c-s.y*f,s.y=s.x*f+s.y*c,s.x=d}}})()},function(a,o,i){var t={};a.exports=t;var n=i(3),l=i(0),r=i(4),u=i(1),c=i(2);(function(){t.rectangle=function(f,p,s,d,h){h=h||{};var m={label:"Rectangle Body",position:{x:f,y:p},vertices:n.fromPath("L 0 0 L "+s+" 0 L "+s+" "+d+" L 0 "+d)};if(h.chamfer){var y=h.chamfer;m.vertices=n.chamfer(m.vertices,y.radius,y.quality,y.qualityMin,y.qualityMax),delete h.chamfer}return r.create(l.extend({},m,h))},t.trapezoid=function(f,p,s,d,h,m){m=m||{},h>=1&&l.warn("Bodies.trapezoid: slope parameter must be < 1."),h*=.5;var y=(1-h*2)*s,w=s*h,E=w+y,A=E+w,v;h<.5?v="L 0 0 L "+w+" "+-d+" L "+E+" "+-d+" L "+A+" 0":v="L 0 0 L "+E+" "+-d+" L "+A+" 0";var x={label:"Trapezoid Body",position:{x:f,y:p},vertices:n.fromPath(v)};if(m.chamfer){var C=m.chamfer;x.vertices=n.chamfer(x.vertices,C.radius,C.quality,C.qualityMin,C.qualityMax),delete m.chamfer}return r.create(l.extend({},x,m))},t.circle=function(f,p,s,d,h){d=d||{};var m={label:"Circle Body",circleRadius:s};h=h||25;var y=Math.ceil(Math.max(10,Math.min(h,s)));return y%2===1&&(y+=1),t.polygon(f,p,y,s,l.extend({},m,d))},t.polygon=function(f,p,s,d,h){if(h=h||{},s<3)return t.circle(f,p,d,h);for(var m=2*Math.PI/s,y="",w=m*.5,E=0;E<s;E+=1){var A=w+E*m,v=Math.cos(A)*d,x=Math.sin(A)*d;y+="L "+v.toFixed(3)+" "+x.toFixed(3)+" "}var C={label:"Polygon Body",position:{x:f,y:p},vertices:n.fromPath(y)};if(h.chamfer){var b=h.chamfer;C.vertices=n.chamfer(C.vertices,b.radius,b.quality,b.qualityMin,b.qualityMax),delete h.chamfer}return r.create(l.extend({},C,h))},t.fromVertices=function(f,p,s,d,h,m,y,w){var E=l.getDecomp(),A,v,x,C,b,M,S,I,q,T,P;for(A=!!(E&&E.quickDecomp),d=d||{},x=[],h=typeof h<"u"?h:!1,m=typeof m<"u"?m:.01,y=typeof y<"u"?y:10,w=typeof w<"u"?w:.01,l.isArray(s[0])||(s=[s]),T=0;T<s.length;T+=1)if(M=s[T],C=n.isConvex(M),b=!C,b&&!A&&l.warnOnce("Bodies.fromVertices: Install the 'poly-decomp' library and use Common.setDecomp or provide 'decomp' as a global to decompose concave vertices."),C||!A)C?M=n.clockwiseSort(M):M=n.hull(M),x.push({position:{x:f,y:p},vertices:M});else{var k=M.map(function(O){return[O.x,O.y]});E.makeCCW(k),m!==!1&&E.removeCollinearPoints(k,m),w!==!1&&E.removeDuplicatePoints&&E.removeDuplicatePoints(k,w);var _=E.quickDecomp(k);for(S=0;S<_.length;S++){var D=_[S],$=D.map(function(O){return{x:O[0],y:O[1]}});y>0&&n.area($)<y||x.push({position:n.centre($),vertices:$})}}for(S=0;S<x.length;S++)x[S]=r.create(l.extend(x[S],d));if(h){var F=5;for(S=0;S<x.length;S++){var G=x[S];for(I=S+1;I<x.length;I++){var H=x[I];if(u.overlaps(G.bounds,H.bounds)){var W=G.vertices,Y=H.vertices;for(q=0;q<G.vertices.length;q++)for(P=0;P<H.vertices.length;P++){var ge=c.magnitudeSquared(c.sub(W[(q+1)%W.length],Y[P])),ee=c.magnitudeSquared(c.sub(W[q],Y[(P+1)%Y.length]));ge<F&&ee<F&&(W[q].isInternal=!0,Y[P].isInternal=!0)}}}}}return x.length>1?(v=r.create(l.extend({parts:x.slice(0)},d)),r.setPosition(v,{x:f,y:p}),v):x[0]}})()},function(a,o,i){var t={};a.exports=t;var n=i(0),l=i(8);(function(){t.create=function(r){var u={bodies:[],collisions:[],pairs:null};return n.extend(u,r)},t.setBodies=function(r,u){r.bodies=u.slice(0)},t.clear=function(r){r.bodies=[],r.collisions=[]},t.collisions=function(r){var u=r.pairs,c=r.bodies,f=c.length,p=t.canCollide,s=l.collides,d=r.collisions,h=0,m,y;for(c.sort(t._compareBoundsX),m=0;m<f;m++){var w=c[m],E=w.bounds,A=w.bounds.max.x,v=w.bounds.max.y,x=w.bounds.min.y,C=w.isStatic||w.isSleeping,b=w.parts.length,M=b===1;for(y=m+1;y<f;y++){var S=c[y],I=S.bounds;if(I.min.x>A)break;if(!(v<I.min.y||x>I.max.y)&&!(C&&(S.isStatic||S.isSleeping))&&p(w.collisionFilter,S.collisionFilter)){var q=S.parts.length;if(M&&q===1){var T=s(w,S,u);T&&(d[h++]=T)}else for(var P=b>1?1:0,k=q>1?1:0,_=P;_<b;_++)for(var D=w.parts[_],E=D.bounds,$=k;$<q;$++){var F=S.parts[$],I=F.bounds;if(!(E.min.x>I.max.x||E.max.x<I.min.x||E.max.y<I.min.y||E.min.y>I.max.y)){var T=s(D,F,u);T&&(d[h++]=T)}}}}}return d.length!==h&&(d.length=h),d},t.canCollide=function(r,u){return r.group===u.group&&r.group!==0?r.group>0:(r.mask&u.category)!==0&&(u.mask&r.category)!==0},t._compareBoundsX=function(r,u){return r.bounds.min.x-u.bounds.min.x}})()},function(a,o,i){var t={};a.exports=t;var n=i(0);(function(){t.create=function(l){var r={};return l||n.log("Mouse.create: element was undefined, defaulting to document.body","warn"),r.element=l||document.body,r.absolute={x:0,y:0},r.position={x:0,y:0},r.mousedownPosition={x:0,y:0},r.mouseupPosition={x:0,y:0},r.offset={x:0,y:0},r.scale={x:1,y:1},r.wheelDelta=0,r.button=-1,r.pixelRatio=parseInt(r.element.getAttribute("data-pixel-ratio"),10)||1,r.sourceEvents={mousemove:null,mousedown:null,mouseup:null,mousewheel:null},r.mousemove=function(u){var c=t._getRelativeMousePosition(u,r.element,r.pixelRatio),f=u.changedTouches;f&&(r.button=0,u.preventDefault()),r.absolute.x=c.x,r.absolute.y=c.y,r.position.x=r.absolute.x*r.scale.x+r.offset.x,r.position.y=r.absolute.y*r.scale.y+r.offset.y,r.sourceEvents.mousemove=u},r.mousedown=function(u){var c=t._getRelativeMousePosition(u,r.element,r.pixelRatio),f=u.changedTouches;f?(r.button=0,u.preventDefault()):r.button=u.button,r.absolute.x=c.x,r.absolute.y=c.y,r.position.x=r.absolute.x*r.scale.x+r.offset.x,r.position.y=r.absolute.y*r.scale.y+r.offset.y,r.mousedownPosition.x=r.position.x,r.mousedownPosition.y=r.position.y,r.sourceEvents.mousedown=u},r.mouseup=function(u){var c=t._getRelativeMousePosition(u,r.element,r.pixelRatio),f=u.changedTouches;f&&u.preventDefault(),r.button=-1,r.absolute.x=c.x,r.absolute.y=c.y,r.position.x=r.absolute.x*r.scale.x+r.offset.x,r.position.y=r.absolute.y*r.scale.y+r.offset.y,r.mouseupPosition.x=r.position.x,r.mouseupPosition.y=r.position.y,r.sourceEvents.mouseup=u},r.mousewheel=function(u){r.wheelDelta=Math.max(-1,Math.min(1,u.wheelDelta||-u.detail)),u.preventDefault(),r.sourceEvents.mousewheel=u},t.setElement(r,r.element),r},t.setElement=function(l,r){l.element=r,r.addEventListener("mousemove",l.mousemove,{passive:!0}),r.addEventListener("mousedown",l.mousedown,{passive:!0}),r.addEventListener("mouseup",l.mouseup,{passive:!0}),r.addEventListener("wheel",l.mousewheel,{passive:!1}),r.addEventListener("touchmove",l.mousemove,{passive:!1}),r.addEventListener("touchstart",l.mousedown,{passive:!1}),r.addEventListener("touchend",l.mouseup,{passive:!1})},t.clearSourceEvents=function(l){l.sourceEvents.mousemove=null,l.sourceEvents.mousedown=null,l.sourceEvents.mouseup=null,l.sourceEvents.mousewheel=null,l.wheelDelta=0},t.setOffset=function(l,r){l.offset.x=r.x,l.offset.y=r.y,l.position.x=l.absolute.x*l.scale.x+l.offset.x,l.position.y=l.absolute.y*l.scale.y+l.offset.y},t.setScale=function(l,r){l.scale.x=r.x,l.scale.y=r.y,l.position.x=l.absolute.x*l.scale.x+l.offset.x,l.position.y=l.absolute.y*l.scale.y+l.offset.y},t._getRelativeMousePosition=function(l,r,u){var c=r.getBoundingClientRect(),f=document.documentElement||document.body.parentNode||document.body,p=window.pageXOffset!==void 0?window.pageXOffset:f.scrollLeft,s=window.pageYOffset!==void 0?window.pageYOffset:f.scrollTop,d=l.changedTouches,h,m;return d?(h=d[0].pageX-c.left-p,m=d[0].pageY-c.top-s):(h=l.pageX-c.left-p,m=l.pageY-c.top-s),{x:h/(r.clientWidth/(r.width||r.clientWidth)*u),y:m/(r.clientHeight/(r.height||r.clientHeight)*u)}}})()},function(a,o,i){var t={};a.exports=t;var n=i(0);(function(){t._registry={},t.register=function(l){if(t.isPlugin(l)||n.warn("Plugin.register:",t.toString(l),"does not implement all required fields."),l.name in t._registry){var r=t._registry[l.name],u=t.versionParse(l.version).number,c=t.versionParse(r.version).number;u>c?(n.warn("Plugin.register:",t.toString(r),"was upgraded to",t.toString(l)),t._registry[l.name]=l):u<c?n.warn("Plugin.register:",t.toString(r),"can not be downgraded to",t.toString(l)):l!==r&&n.warn("Plugin.register:",t.toString(l),"is already registered to different plugin object")}else t._registry[l.name]=l;return l},t.resolve=function(l){return t._registry[t.dependencyParse(l).name]},t.toString=function(l){return typeof l=="string"?l:(l.name||"anonymous")+"@"+(l.version||l.range||"0.0.0")},t.isPlugin=function(l){return l&&l.name&&l.version&&l.install},t.isUsed=function(l,r){return l.used.indexOf(r)>-1},t.isFor=function(l,r){var u=l.for&&t.dependencyParse(l.for);return!l.for||r.name===u.name&&t.versionSatisfies(r.version,u.range)},t.use=function(l,r){if(l.uses=(l.uses||[]).concat(r||[]),l.uses.length===0){n.warn("Plugin.use:",t.toString(l),"does not specify any dependencies to install.");return}for(var u=t.dependencies(l),c=n.topologicalSort(u),f=[],p=0;p<c.length;p+=1)if(c[p]!==l.name){var s=t.resolve(c[p]);if(!s){f.push("❌ "+c[p]);continue}t.isUsed(l,s.name)||(t.isFor(s,l)||(n.warn("Plugin.use:",t.toString(s),"is for",s.for,"but installed on",t.toString(l)+"."),s._warned=!0),s.install?s.install(l):(n.warn("Plugin.use:",t.toString(s),"does not specify an install function."),s._warned=!0),s._warned?(f.push("🔶 "+t.toString(s)),delete s._warned):f.push("✅ "+t.toString(s)),l.used.push(s.name))}f.length>0&&n.info(f.join("  "))},t.dependencies=function(l,r){var u=t.dependencyParse(l),c=u.name;if(r=r||{},!(c in r)){l=t.resolve(l)||l,r[c]=n.map(l.uses||[],function(p){t.isPlugin(p)&&t.register(p);var s=t.dependencyParse(p),d=t.resolve(p);return d&&!t.versionSatisfies(d.version,s.range)?(n.warn("Plugin.dependencies:",t.toString(d),"does not satisfy",t.toString(s),"used by",t.toString(u)+"."),d._warned=!0,l._warned=!0):d||(n.warn("Plugin.dependencies:",t.toString(p),"used by",t.toString(u),"could not be resolved."),l._warned=!0),s.name});for(var f=0;f<r[c].length;f+=1)t.dependencies(r[c][f],r);return r}},t.dependencyParse=function(l){if(n.isString(l)){var r=/^[\w-]+(@(\*|[\^~]?\d+\.\d+\.\d+(-[0-9A-Za-z-+]+)?))?$/;return r.test(l)||n.warn("Plugin.dependencyParse:",l,"is not a valid dependency string."),{name:l.split("@")[0],range:l.split("@")[1]||"*"}}return{name:l.name,range:l.range||l.version}},t.versionParse=function(l){var r=/^(\*)|(\^|~|>=|>)?\s*((\d+)\.(\d+)\.(\d+))(-[0-9A-Za-z-+]+)?$/;r.test(l)||n.warn("Plugin.versionParse:",l,"is not a valid version or range.");var u=r.exec(l),c=Number(u[4]),f=Number(u[5]),p=Number(u[6]);return{isRange:!!(u[1]||u[2]),version:u[3],range:l,operator:u[1]||u[2]||"",major:c,minor:f,patch:p,parts:[c,f,p],prerelease:u[7],number:c*1e8+f*1e4+p}},t.versionSatisfies=function(l,r){r=r||"*";var u=t.versionParse(r),c=t.versionParse(l);if(u.isRange){if(u.operator==="*"||l==="*")return!0;if(u.operator===">")return c.number>u.number;if(u.operator===">=")return c.number>=u.number;if(u.operator==="~")return c.major===u.major&&c.minor===u.minor&&c.patch>=u.patch;if(u.operator==="^")return u.major>0?c.major===u.major&&c.number>=u.number:u.minor>0?c.minor===u.minor&&c.patch>=u.patch:c.patch===u.patch}return l===r||l==="*"}})()},function(a,o){var i={};a.exports=i,function(){i.create=function(t){return{vertex:t,normalImpulse:0,tangentImpulse:0}}}()},function(a,o,i){var t={};a.exports=t;var n=i(7),l=i(18),r=i(13),u=i(19),c=i(5),f=i(6),p=i(10),s=i(0),d=i(4);(function(){t._deltaMax=1e3/60,t.create=function(h){h=h||{};var m={positionIterations:6,velocityIterations:4,constraintIterations:2,enableSleeping:!1,events:[],plugin:{},gravity:{x:0,y:1,scale:.001},timing:{timestamp:0,timeScale:1,lastDelta:0,lastElapsed:0,lastUpdatesPerFrame:0}},y=s.extend(m,h);return y.world=h.world||f.create({label:"World"}),y.pairs=h.pairs||u.create(),y.detector=h.detector||r.create(),y.detector.pairs=y.pairs,y.grid={buckets:[]},y.world.gravity=y.gravity,y.broadphase=y.grid,y.metrics={},y},t.update=function(h,m){var y=s.now(),w=h.world,E=h.detector,A=h.pairs,v=h.timing,x=v.timestamp,C;m>t._deltaMax&&s.warnOnce("Matter.Engine.update: delta argument is recommended to be less than or equal to",t._deltaMax.toFixed(3),"ms."),m=typeof m<"u"?m:s._baseDelta,m*=v.timeScale,v.timestamp+=m,v.lastDelta=m;var b={timestamp:v.timestamp,delta:m};c.trigger(h,"beforeUpdate",b);var M=f.allBodies(w),S=f.allConstraints(w);for(w.isModified&&(r.setBodies(E,M),f.setModified(w,!1,!1,!0)),h.enableSleeping&&n.update(M,m),t._bodiesApplyGravity(M,h.gravity),m>0&&t._bodiesUpdate(M,m),c.trigger(h,"beforeSolve",b),p.preSolveAll(M),C=0;C<h.constraintIterations;C++)p.solveAll(S,m);p.postSolveAll(M);var I=r.collisions(E);u.update(A,I,x),h.enableSleeping&&n.afterCollisions(A.list),A.collisionStart.length>0&&c.trigger(h,"collisionStart",{pairs:A.collisionStart,timestamp:v.timestamp,delta:m});var q=s.clamp(20/h.positionIterations,0,1);for(l.preSolvePosition(A.list),C=0;C<h.positionIterations;C++)l.solvePosition(A.list,m,q);for(l.postSolvePosition(M),p.preSolveAll(M),C=0;C<h.constraintIterations;C++)p.solveAll(S,m);for(p.postSolveAll(M),l.preSolveVelocity(A.list),C=0;C<h.velocityIterations;C++)l.solveVelocity(A.list,m);return t._bodiesUpdateVelocities(M),A.collisionActive.length>0&&c.trigger(h,"collisionActive",{pairs:A.collisionActive,timestamp:v.timestamp,delta:m}),A.collisionEnd.length>0&&c.trigger(h,"collisionEnd",{pairs:A.collisionEnd,timestamp:v.timestamp,delta:m}),t._bodiesClearForces(M),c.trigger(h,"afterUpdate",b),h.timing.lastElapsed=s.now()-y,h},t.merge=function(h,m){if(s.extend(h,m),m.world){h.world=m.world,t.clear(h);for(var y=f.allBodies(h.world),w=0;w<y.length;w++){var E=y[w];n.set(E,!1),E.id=s.nextId()}}},t.clear=function(h){u.clear(h.pairs),r.clear(h.detector)},t._bodiesClearForces=function(h){for(var m=h.length,y=0;y<m;y++){var w=h[y];w.force.x=0,w.force.y=0,w.torque=0}},t._bodiesApplyGravity=function(h,m){var y=typeof m.scale<"u"?m.scale:.001,w=h.length;if(!(m.x===0&&m.y===0||y===0))for(var E=0;E<w;E++){var A=h[E];A.isStatic||A.isSleeping||(A.force.y+=A.mass*m.y*y,A.force.x+=A.mass*m.x*y)}},t._bodiesUpdate=function(h,m){for(var y=h.length,w=0;w<y;w++){var E=h[w];E.isStatic||E.isSleeping||d.update(E,m)}},t._bodiesUpdateVelocities=function(h){for(var m=h.length,y=0;y<m;y++)d.updateVelocities(h[y])}})()},function(a,o,i){var t={};a.exports=t;var n=i(3),l=i(0),r=i(1);(function(){t._restingThresh=2,t._restingThreshTangent=Math.sqrt(6),t._positionDampen=.9,t._positionWarming=.8,t._frictionNormalMultiplier=5,t._frictionMaxStatic=Number.MAX_VALUE,t.preSolvePosition=function(u){var c,f,p,s=u.length;for(c=0;c<s;c++)f=u[c],f.isActive&&(p=f.contactCount,f.collision.parentA.totalContacts+=p,f.collision.parentB.totalContacts+=p)},t.solvePosition=function(u,c,f){var p,s,d,h,m,y,w,E,A=t._positionDampen*(f||1),v=l.clamp(c/l._baseDelta,0,1),x=u.length;for(p=0;p<x;p++)s=u[p],!(!s.isActive||s.isSensor)&&(d=s.collision,h=d.parentA,m=d.parentB,y=d.normal,s.separation=d.depth+y.x*(m.positionImpulse.x-h.positionImpulse.x)+y.y*(m.positionImpulse.y-h.positionImpulse.y));for(p=0;p<x;p++)s=u[p],!(!s.isActive||s.isSensor)&&(d=s.collision,h=d.parentA,m=d.parentB,y=d.normal,E=s.separation-s.slop*v,(h.isStatic||m.isStatic)&&(E*=2),h.isStatic||h.isSleeping||(w=A/h.totalContacts,h.positionImpulse.x+=y.x*E*w,h.positionImpulse.y+=y.y*E*w),m.isStatic||m.isSleeping||(w=A/m.totalContacts,m.positionImpulse.x-=y.x*E*w,m.positionImpulse.y-=y.y*E*w))},t.postSolvePosition=function(u){for(var c=t._positionWarming,f=u.length,p=n.translate,s=r.update,d=0;d<f;d++){var h=u[d],m=h.positionImpulse,y=m.x,w=m.y,E=h.velocity;if(h.totalContacts=0,y!==0||w!==0){for(var A=0;A<h.parts.length;A++){var v=h.parts[A];p(v.vertices,m),s(v.bounds,v.vertices,E),v.position.x+=y,v.position.y+=w}h.positionPrev.x+=y,h.positionPrev.y+=w,y*E.x+w*E.y<0?(m.x=0,m.y=0):(m.x*=c,m.y*=c)}}},t.preSolveVelocity=function(u){var c=u.length,f,p;for(f=0;f<c;f++){var s=u[f];if(!(!s.isActive||s.isSensor)){var d=s.contacts,h=s.contactCount,m=s.collision,y=m.parentA,w=m.parentB,E=m.normal,A=m.tangent;for(p=0;p<h;p++){var v=d[p],x=v.vertex,C=v.normalImpulse,b=v.tangentImpulse;if(C!==0||b!==0){var M=E.x*C+A.x*b,S=E.y*C+A.y*b;y.isStatic||y.isSleeping||(y.positionPrev.x+=M*y.inverseMass,y.positionPrev.y+=S*y.inverseMass,y.anglePrev+=y.inverseInertia*((x.x-y.position.x)*S-(x.y-y.position.y)*M)),w.isStatic||w.isSleeping||(w.positionPrev.x-=M*w.inverseMass,w.positionPrev.y-=S*w.inverseMass,w.anglePrev-=w.inverseInertia*((x.x-w.position.x)*S-(x.y-w.position.y)*M))}}}}},t.solveVelocity=function(u,c){var f=c/l._baseDelta,p=f*f,s=p*f,d=-t._restingThresh*f,h=t._restingThreshTangent,m=t._frictionNormalMultiplier*f,y=t._frictionMaxStatic,w=u.length,E,A,v,x;for(v=0;v<w;v++){var C=u[v];if(!(!C.isActive||C.isSensor)){var b=C.collision,M=b.parentA,S=b.parentB,I=b.normal.x,q=b.normal.y,T=b.tangent.x,P=b.tangent.y,k=C.inverseMass,_=C.friction*C.frictionStatic*m,D=C.contacts,$=C.contactCount,F=1/$,G=M.position.x-M.positionPrev.x,H=M.position.y-M.positionPrev.y,W=M.angle-M.anglePrev,Y=S.position.x-S.positionPrev.x,ge=S.position.y-S.positionPrev.y,ee=S.angle-S.anglePrev;for(x=0;x<$;x++){var O=D[x],te=O.vertex,j=te.x-M.position.x,$e=te.y-M.position.y,oe=te.x-S.position.x,re=te.y-S.position.y,Z=G-$e*W,Aa=H+j*W,Ia=Y-re*ee,qa=ge+oe*ee,zt=Z-Ia,$t=Aa-qa,mt=I*zt+q*$t,de=T*zt+P*$t,Ot=C.separation+mt,vt=Math.min(Ot,1);vt=Ot<0?0:vt;var Rt=vt*_;de<-Rt||de>Rt?(A=de>0?de:-de,E=C.friction*(de>0?1:-1)*s,E<-A?E=-A:E>A&&(E=A)):(E=de,A=y);var Bt=j*q-$e*I,Ft=oe*q-re*I,Nt=F/(k+M.inverseInertia*Bt*Bt+S.inverseInertia*Ft*Ft),Je=(1+C.restitution)*mt*Nt;if(E*=Nt,mt<d)O.normalImpulse=0;else{var Ta=O.normalImpulse;O.normalImpulse+=Je,O.normalImpulse>0&&(O.normalImpulse=0),Je=O.normalImpulse-Ta}if(de<-h||de>h)O.tangentImpulse=0;else{var ka=O.tangentImpulse;O.tangentImpulse+=E,O.tangentImpulse<-A&&(O.tangentImpulse=-A),O.tangentImpulse>A&&(O.tangentImpulse=A),E=O.tangentImpulse-ka}var et=I*Je+T*E,tt=q*Je+P*E;M.isStatic||M.isSleeping||(M.positionPrev.x+=et*M.inverseMass,M.positionPrev.y+=tt*M.inverseMass,M.anglePrev+=(j*tt-$e*et)*M.inverseInertia),S.isStatic||S.isSleeping||(S.positionPrev.x-=et*S.inverseMass,S.positionPrev.y-=tt*S.inverseMass,S.anglePrev-=(oe*tt-re*et)*S.inverseInertia)}}}}})()},function(a,o,i){var t={};a.exports=t;var n=i(9),l=i(0);(function(){t.create=function(r){return l.extend({table:{},list:[],collisionStart:[],collisionActive:[],collisionEnd:[]},r)},t.update=function(r,u,c){var f=n.update,p=n.create,s=n.setActive,d=r.table,h=r.list,m=h.length,y=m,w=r.collisionStart,E=r.collisionEnd,A=r.collisionActive,v=u.length,x=0,C=0,b=0,M,S,I;for(I=0;I<v;I++)M=u[I],S=M.pair,S?(S.isActive&&(A[b++]=S),f(S,M,c)):(S=p(M,c),d[S.id]=S,w[x++]=S,h[y++]=S);for(y=0,m=h.length,I=0;I<m;I++)S=h[I],S.timeUpdated>=c?h[y++]=S:(s(S,!1,c),S.collision.bodyA.sleepCounter>0&&S.collision.bodyB.sleepCounter>0?h[y++]=S:(E[C++]=S,delete d[S.id]));h.length!==y&&(h.length=y),w.length!==x&&(w.length=x),E.length!==C&&(E.length=C),A.length!==b&&(A.length=b)},t.clear=function(r){return r.table={},r.list.length=0,r.collisionStart.length=0,r.collisionActive.length=0,r.collisionEnd.length=0,r}})()},function(a,o,i){var t=a.exports=i(21);t.Axes=i(11),t.Bodies=i(12),t.Body=i(4),t.Bounds=i(1),t.Collision=i(8),t.Common=i(0),t.Composite=i(6),t.Composites=i(22),t.Constraint=i(10),t.Contact=i(16),t.Detector=i(13),t.Engine=i(17),t.Events=i(5),t.Grid=i(23),t.Mouse=i(14),t.MouseConstraint=i(24),t.Pair=i(9),t.Pairs=i(19),t.Plugin=i(15),t.Query=i(25),t.Render=i(26),t.Resolver=i(18),t.Runner=i(27),t.SAT=i(28),t.Sleeping=i(7),t.Svg=i(29),t.Vector=i(2),t.Vertices=i(3),t.World=i(30),t.Engine.run=t.Runner.run,t.Common.deprecated(t.Engine,"run","Engine.run ➤ use Matter.Runner.run(engine) instead")},function(a,o,i){var t={};a.exports=t;var n=i(15),l=i(0);(function(){t.name="matter-js",t.version="0.20.0",t.uses=[],t.used=[],t.use=function(){n.use(t,Array.prototype.slice.call(arguments))},t.before=function(r,u){return r=r.replace(/^Matter./,""),l.chainPathBefore(t,r,u)},t.after=function(r,u){return r=r.replace(/^Matter./,""),l.chainPathAfter(t,r,u)}})()},function(a,o,i){var t={};a.exports=t;var n=i(6),l=i(10),r=i(0),u=i(4),c=i(12),f=r.deprecated;(function(){t.stack=function(p,s,d,h,m,y,w){for(var E=n.create({label:"Stack"}),A=p,v=s,x,C=0,b=0;b<h;b++){for(var M=0,S=0;S<d;S++){var I=w(A,v,S,b,x,C);if(I){var q=I.bounds.max.y-I.bounds.min.y,T=I.bounds.max.x-I.bounds.min.x;q>M&&(M=q),u.translate(I,{x:T*.5,y:q*.5}),A=I.bounds.max.x+m,n.addBody(E,I),x=I,C+=1}else A+=m}v+=M+y,A=p}return E},t.chain=function(p,s,d,h,m,y){for(var w=p.bodies,E=1;E<w.length;E++){var A=w[E-1],v=w[E],x=A.bounds.max.y-A.bounds.min.y,C=A.bounds.max.x-A.bounds.min.x,b=v.bounds.max.y-v.bounds.min.y,M=v.bounds.max.x-v.bounds.min.x,S={bodyA:A,pointA:{x:C*s,y:x*d},bodyB:v,pointB:{x:M*h,y:b*m}},I=r.extend(S,y);n.addConstraint(p,l.create(I))}return p.label+=" Chain",p},t.mesh=function(p,s,d,h,m){var y=p.bodies,w,E,A,v,x;for(w=0;w<d;w++){for(E=1;E<s;E++)A=y[E-1+w*s],v=y[E+w*s],n.addConstraint(p,l.create(r.extend({bodyA:A,bodyB:v},m)));if(w>0)for(E=0;E<s;E++)A=y[E+(w-1)*s],v=y[E+w*s],n.addConstraint(p,l.create(r.extend({bodyA:A,bodyB:v},m))),h&&E>0&&(x=y[E-1+(w-1)*s],n.addConstraint(p,l.create(r.extend({bodyA:x,bodyB:v},m)))),h&&E<s-1&&(x=y[E+1+(w-1)*s],n.addConstraint(p,l.create(r.extend({bodyA:x,bodyB:v},m))))}return p.label+=" Mesh",p},t.pyramid=function(p,s,d,h,m,y,w){return t.stack(p,s,d,h,m,y,function(E,A,v,x,C,b){var M=Math.min(h,Math.ceil(d/2)),S=C?C.bounds.max.x-C.bounds.min.x:0;if(!(x>M)){x=M-x;var I=x,q=d-1-x;if(!(v<I||v>q)){b===1&&u.translate(C,{x:(v+(d%2===1?1:-1))*S,y:0});var T=C?v*S:0;return w(p+T+v*m,A,v,x,C,b)}}})},t.newtonsCradle=function(p,s,d,h,m){for(var y=n.create({label:"Newtons Cradle"}),w=0;w<d;w++){var E=1.9,A=c.circle(p+w*(h*E),s+m,h,{inertia:1/0,restitution:1,friction:0,frictionAir:1e-4,slop:1}),v=l.create({pointA:{x:p+w*(h*E),y:s},bodyB:A});n.addBody(y,A),n.addConstraint(y,v)}return y},f(t,"newtonsCradle","Composites.newtonsCradle ➤ moved to newtonsCradle example"),t.car=function(p,s,d,h,m){var y=u.nextGroup(!0),w=20,E=-d*.5+w,A=d*.5-w,v=0,x=n.create({label:"Car"}),C=c.rectangle(p,s,d,h,{collisionFilter:{group:y},chamfer:{radius:h*.5},density:2e-4}),b=c.circle(p+E,s+v,m,{collisionFilter:{group:y},friction:.8}),M=c.circle(p+A,s+v,m,{collisionFilter:{group:y},friction:.8}),S=l.create({bodyB:C,pointB:{x:E,y:v},bodyA:b,stiffness:1,length:0}),I=l.create({bodyB:C,pointB:{x:A,y:v},bodyA:M,stiffness:1,length:0});return n.addBody(x,C),n.addBody(x,b),n.addBody(x,M),n.addConstraint(x,S),n.addConstraint(x,I),x},f(t,"car","Composites.car ➤ moved to car example"),t.softBody=function(p,s,d,h,m,y,w,E,A,v){A=r.extend({inertia:1/0},A),v=r.extend({stiffness:.2,render:{type:"line",anchors:!1}},v);var x=t.stack(p,s,d,h,m,y,function(C,b){return c.circle(C,b,E,A)});return t.mesh(x,d,h,w,v),x.label="Soft Body",x},f(t,"softBody","Composites.softBody ➤ moved to softBody and cloth examples")})()},function(a,o,i){var t={};a.exports=t;var n=i(9),l=i(0),r=l.deprecated;(function(){t.create=function(u){var c={buckets:{},pairs:{},pairsList:[],bucketWidth:48,bucketHeight:48};return l.extend(c,u)},t.update=function(u,c,f,p){var s,d,h,m=f.world,y=u.buckets,w,E,A=!1;for(s=0;s<c.length;s++){var v=c[s];if(!(v.isSleeping&&!p)&&!(m.bounds&&(v.bounds.max.x<m.bounds.min.x||v.bounds.min.x>m.bounds.max.x||v.bounds.max.y<m.bounds.min.y||v.bounds.min.y>m.bounds.max.y))){var x=t._getRegion(u,v);if(!v.region||x.id!==v.region.id||p){(!v.region||p)&&(v.region=x);var C=t._regionUnion(x,v.region);for(d=C.startCol;d<=C.endCol;d++)for(h=C.startRow;h<=C.endRow;h++){E=t._getBucketId(d,h),w=y[E];var b=d>=x.startCol&&d<=x.endCol&&h>=x.startRow&&h<=x.endRow,M=d>=v.region.startCol&&d<=v.region.endCol&&h>=v.region.startRow&&h<=v.region.endRow;!b&&M&&M&&w&&t._bucketRemoveBody(u,w,v),(v.region===x||b&&!M||p)&&(w||(w=t._createBucket(y,E)),t._bucketAddBody(u,w,v))}v.region=x,A=!0}}}A&&(u.pairsList=t._createActivePairsList(u))},r(t,"update","Grid.update ➤ replaced by Matter.Detector"),t.clear=function(u){u.buckets={},u.pairs={},u.pairsList=[]},r(t,"clear","Grid.clear ➤ replaced by Matter.Detector"),t._regionUnion=function(u,c){var f=Math.min(u.startCol,c.startCol),p=Math.max(u.endCol,c.endCol),s=Math.min(u.startRow,c.startRow),d=Math.max(u.endRow,c.endRow);return t._createRegion(f,p,s,d)},t._getRegion=function(u,c){var f=c.bounds,p=Math.floor(f.min.x/u.bucketWidth),s=Math.floor(f.max.x/u.bucketWidth),d=Math.floor(f.min.y/u.bucketHeight),h=Math.floor(f.max.y/u.bucketHeight);return t._createRegion(p,s,d,h)},t._createRegion=function(u,c,f,p){return{id:u+","+c+","+f+","+p,startCol:u,endCol:c,startRow:f,endRow:p}},t._getBucketId=function(u,c){return"C"+u+"R"+c},t._createBucket=function(u,c){var f=u[c]=[];return f},t._bucketAddBody=function(u,c,f){var p=u.pairs,s=n.id,d=c.length,h;for(h=0;h<d;h++){var m=c[h];if(!(f.id===m.id||f.isStatic&&m.isStatic)){var y=s(f,m),w=p[y];w?w[2]+=1:p[y]=[f,m,1]}}c.push(f)},t._bucketRemoveBody=function(u,c,f){var p=u.pairs,s=n.id,d;c.splice(l.indexOf(c,f),1);var h=c.length;for(d=0;d<h;d++){var m=p[s(f,c[d])];m&&(m[2]-=1)}},t._createActivePairsList=function(u){var c,f=u.pairs,p=l.keys(f),s=p.length,d=[],h;for(h=0;h<s;h++)c=f[p[h]],c[2]>0?d.push(c):delete f[p[h]];return d}})()},function(a,o,i){var t={};a.exports=t;var n=i(3),l=i(7),r=i(14),u=i(5),c=i(13),f=i(10),p=i(6),s=i(0),d=i(1);(function(){t.create=function(h,m){var y=(h?h.mouse:null)||(m?m.mouse:null);y||(h&&h.render&&h.render.canvas?y=r.create(h.render.canvas):m&&m.element?y=r.create(m.element):(y=r.create(),s.warn("MouseConstraint.create: options.mouse was undefined, options.element was undefined, may not function as expected")));var w=f.create({label:"Mouse Constraint",pointA:y.position,pointB:{x:0,y:0},length:.01,stiffness:.1,angularStiffness:1,render:{strokeStyle:"#90EE90",lineWidth:3}}),E={type:"mouseConstraint",mouse:y,element:null,body:null,constraint:w,collisionFilter:{category:1,mask:4294967295,group:0}},A=s.extend(E,m);return u.on(h,"beforeUpdate",function(){var v=p.allBodies(h.world);t.update(A,v),t._triggerEvents(A)}),A},t.update=function(h,m){var y=h.mouse,w=h.constraint,E=h.body;if(y.button===0){if(w.bodyB)l.set(w.bodyB,!1),w.pointA=y.position;else for(var A=0;A<m.length;A++)if(E=m[A],d.contains(E.bounds,y.position)&&c.canCollide(E.collisionFilter,h.collisionFilter))for(var v=E.parts.length>1?1:0;v<E.parts.length;v++){var x=E.parts[v];if(n.contains(x.vertices,y.position)){w.pointA=y.position,w.bodyB=h.body=E,w.pointB={x:y.position.x-E.position.x,y:y.position.y-E.position.y},w.angleB=E.angle,l.set(E,!1),u.trigger(h,"startdrag",{mouse:y,body:E});break}}}else w.bodyB=h.body=null,w.pointB=null,E&&u.trigger(h,"enddrag",{mouse:y,body:E})},t._triggerEvents=function(h){var m=h.mouse,y=m.sourceEvents;y.mousemove&&u.trigger(h,"mousemove",{mouse:m}),y.mousedown&&u.trigger(h,"mousedown",{mouse:m}),y.mouseup&&u.trigger(h,"mouseup",{mouse:m}),r.clearSourceEvents(m)}})()},function(a,o,i){var t={};a.exports=t;var n=i(2),l=i(8),r=i(1),u=i(12),c=i(3);(function(){t.collides=function(f,p){for(var s=[],d=p.length,h=f.bounds,m=l.collides,y=r.overlaps,w=0;w<d;w++){var E=p[w],A=E.parts.length,v=A===1?0:1;if(y(E.bounds,h))for(var x=v;x<A;x++){var C=E.parts[x];if(y(C.bounds,h)){var b=m(C,f);if(b){s.push(b);break}}}}return s},t.ray=function(f,p,s,d){d=d||1e-100;for(var h=n.angle(p,s),m=n.magnitude(n.sub(p,s)),y=(s.x+p.x)*.5,w=(s.y+p.y)*.5,E=u.rectangle(y,w,m,d,{angle:h}),A=t.collides(E,f),v=0;v<A.length;v+=1){var x=A[v];x.body=x.bodyB=x.bodyA}return A},t.region=function(f,p,s){for(var d=[],h=0;h<f.length;h++){var m=f[h],y=r.overlaps(m.bounds,p);(y&&!s||!y&&s)&&d.push(m)}return d},t.point=function(f,p){for(var s=[],d=0;d<f.length;d++){var h=f[d];if(r.contains(h.bounds,p))for(var m=h.parts.length===1?0:1;m<h.parts.length;m++){var y=h.parts[m];if(r.contains(y.bounds,p)&&c.contains(y.vertices,p)){s.push(h);break}}}return s}})()},function(a,o,i){var t={};a.exports=t;var n=i(4),l=i(0),r=i(6),u=i(1),c=i(5),f=i(2),p=i(14);(function(){var s,d;typeof window<"u"&&(s=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame||function(v){window.setTimeout(function(){v(l.now())},1e3/60)},d=window.cancelAnimationFrame||window.mozCancelAnimationFrame||window.webkitCancelAnimationFrame||window.msCancelAnimationFrame),t._goodFps=30,t._goodDelta=1e3/60,t.create=function(v){var x={engine:null,element:null,canvas:null,mouse:null,frameRequestId:null,timing:{historySize:60,delta:0,deltaHistory:[],lastTime:0,lastTimestamp:0,lastElapsed:0,timestampElapsed:0,timestampElapsedHistory:[],engineDeltaHistory:[],engineElapsedHistory:[],engineUpdatesHistory:[],elapsedHistory:[]},options:{width:800,height:600,pixelRatio:1,background:"#14151f",wireframeBackground:"#14151f",wireframeStrokeStyle:"#bbb",hasBounds:!!v.bounds,enabled:!0,wireframes:!0,showSleeping:!0,showDebug:!1,showStats:!1,showPerformance:!1,showBounds:!1,showVelocity:!1,showCollisions:!1,showSeparations:!1,showAxes:!1,showPositions:!1,showAngleIndicator:!1,showIds:!1,showVertexNumbers:!1,showConvexHulls:!1,showInternalEdges:!1,showMousePosition:!1}},C=l.extend(x,v);return C.canvas&&(C.canvas.width=C.options.width||C.canvas.width,C.canvas.height=C.options.height||C.canvas.height),C.mouse=v.mouse,C.engine=v.engine,C.canvas=C.canvas||y(C.options.width,C.options.height),C.context=C.canvas.getContext("2d"),C.textures={},C.bounds=C.bounds||{min:{x:0,y:0},max:{x:C.canvas.width,y:C.canvas.height}},C.controller=t,C.options.showBroadphase=!1,C.options.pixelRatio!==1&&t.setPixelRatio(C,C.options.pixelRatio),l.isElement(C.element)&&C.element.appendChild(C.canvas),C},t.run=function(v){(function x(C){v.frameRequestId=s(x),h(v,C),t.world(v,C),v.context.setTransform(v.options.pixelRatio,0,0,v.options.pixelRatio,0,0),(v.options.showStats||v.options.showDebug)&&t.stats(v,v.context,C),(v.options.showPerformance||v.options.showDebug)&&t.performance(v,v.context,C),v.context.setTransform(1,0,0,1,0,0)})()},t.stop=function(v){d(v.frameRequestId)},t.setPixelRatio=function(v,x){var C=v.options,b=v.canvas;x==="auto"&&(x=w(b)),C.pixelRatio=x,b.setAttribute("data-pixel-ratio",x),b.width=C.width*x,b.height=C.height*x,b.style.width=C.width+"px",b.style.height=C.height+"px"},t.setSize=function(v,x,C){v.options.width=x,v.options.height=C,v.bounds.max.x=v.bounds.min.x+x,v.bounds.max.y=v.bounds.min.y+C,v.options.pixelRatio!==1?t.setPixelRatio(v,v.options.pixelRatio):(v.canvas.width=x,v.canvas.height=C)},t.lookAt=function(v,x,C,b){b=typeof b<"u"?b:!0,x=l.isArray(x)?x:[x],C=C||{x:0,y:0};for(var M={min:{x:1/0,y:1/0},max:{x:-1/0,y:-1/0}},S=0;S<x.length;S+=1){var I=x[S],q=I.bounds?I.bounds.min:I.min||I.position||I,T=I.bounds?I.bounds.max:I.max||I.position||I;q&&T&&(q.x<M.min.x&&(M.min.x=q.x),T.x>M.max.x&&(M.max.x=T.x),q.y<M.min.y&&(M.min.y=q.y),T.y>M.max.y&&(M.max.y=T.y))}var P=M.max.x-M.min.x+2*C.x,k=M.max.y-M.min.y+2*C.y,_=v.canvas.height,D=v.canvas.width,$=D/_,F=P/k,G=1,H=1;F>$?H=F/$:G=$/F,v.options.hasBounds=!0,v.bounds.min.x=M.min.x,v.bounds.max.x=M.min.x+P*G,v.bounds.min.y=M.min.y,v.bounds.max.y=M.min.y+k*H,b&&(v.bounds.min.x+=P*.5-P*G*.5,v.bounds.max.x+=P*.5-P*G*.5,v.bounds.min.y+=k*.5-k*H*.5,v.bounds.max.y+=k*.5-k*H*.5),v.bounds.min.x-=C.x,v.bounds.max.x-=C.x,v.bounds.min.y-=C.y,v.bounds.max.y-=C.y,v.mouse&&(p.setScale(v.mouse,{x:(v.bounds.max.x-v.bounds.min.x)/v.canvas.width,y:(v.bounds.max.y-v.bounds.min.y)/v.canvas.height}),p.setOffset(v.mouse,v.bounds.min))},t.startViewTransform=function(v){var x=v.bounds.max.x-v.bounds.min.x,C=v.bounds.max.y-v.bounds.min.y,b=x/v.options.width,M=C/v.options.height;v.context.setTransform(v.options.pixelRatio/b,0,0,v.options.pixelRatio/M,0,0),v.context.translate(-v.bounds.min.x,-v.bounds.min.y)},t.endViewTransform=function(v){v.context.setTransform(v.options.pixelRatio,0,0,v.options.pixelRatio,0,0)},t.world=function(v,x){var C=l.now(),b=v.engine,M=b.world,S=v.canvas,I=v.context,q=v.options,T=v.timing,P=r.allBodies(M),k=r.allConstraints(M),_=q.wireframes?q.wireframeBackground:q.background,D=[],$=[],F,G={timestamp:b.timing.timestamp};if(c.trigger(v,"beforeRender",G),v.currentBackground!==_&&A(v,_),I.globalCompositeOperation="source-in",I.fillStyle="transparent",I.fillRect(0,0,S.width,S.height),I.globalCompositeOperation="source-over",q.hasBounds){for(F=0;F<P.length;F++){var H=P[F];u.overlaps(H.bounds,v.bounds)&&D.push(H)}for(F=0;F<k.length;F++){var W=k[F],Y=W.bodyA,ge=W.bodyB,ee=W.pointA,O=W.pointB;Y&&(ee=f.add(Y.position,W.pointA)),ge&&(O=f.add(ge.position,W.pointB)),!(!ee||!O)&&(u.contains(v.bounds,ee)||u.contains(v.bounds,O))&&$.push(W)}t.startViewTransform(v),v.mouse&&(p.setScale(v.mouse,{x:(v.bounds.max.x-v.bounds.min.x)/v.options.width,y:(v.bounds.max.y-v.bounds.min.y)/v.options.height}),p.setOffset(v.mouse,v.bounds.min))}else $=k,D=P,v.options.pixelRatio!==1&&v.context.setTransform(v.options.pixelRatio,0,0,v.options.pixelRatio,0,0);!q.wireframes||b.enableSleeping&&q.showSleeping?t.bodies(v,D,I):(q.showConvexHulls&&t.bodyConvexHulls(v,D,I),t.bodyWireframes(v,D,I)),q.showBounds&&t.bodyBounds(v,D,I),(q.showAxes||q.showAngleIndicator)&&t.bodyAxes(v,D,I),q.showPositions&&t.bodyPositions(v,D,I),q.showVelocity&&t.bodyVelocity(v,D,I),q.showIds&&t.bodyIds(v,D,I),q.showSeparations&&t.separations(v,b.pairs.list,I),q.showCollisions&&t.collisions(v,b.pairs.list,I),q.showVertexNumbers&&t.vertexNumbers(v,D,I),q.showMousePosition&&t.mousePosition(v,v.mouse,I),t.constraints($,I),q.hasBounds&&t.endViewTransform(v),c.trigger(v,"afterRender",G),T.lastElapsed=l.now()-C},t.stats=function(v,x,C){for(var b=v.engine,M=b.world,S=r.allBodies(M),I=0,q=55,T=44,P=0,k=0,_=0;_<S.length;_+=1)I+=S[_].parts.length;var D={Part:I,Body:S.length,Cons:r.allConstraints(M).length,Comp:r.allComposites(M).length,Pair:b.pairs.list.length};x.fillStyle="#0e0f19",x.fillRect(P,k,q*5.5,T),x.font="12px Arial",x.textBaseline="top",x.textAlign="right";for(var $ in D){var F=D[$];x.fillStyle="#aaa",x.fillText($,P+q,k+8),x.fillStyle="#eee",x.fillText(F,P+q,k+26),P+=q}},t.performance=function(v,x){var C=v.engine,b=v.timing,M=b.deltaHistory,S=b.elapsedHistory,I=b.timestampElapsedHistory,q=b.engineDeltaHistory,T=b.engineUpdatesHistory,P=b.engineElapsedHistory,k=C.timing.lastUpdatesPerFrame,_=C.timing.lastDelta,D=m(M),$=m(S),F=m(q),G=m(T),H=m(P),W=m(I),Y=W/D||0,ge=Math.round(D/_),ee=1e3/D||0,O=4,te=12,j=60,$e=34,oe=10,re=69;x.fillStyle="#0e0f19",x.fillRect(0,50,te*5+j*6+22,$e),t.status(x,oe,re,j,O,M.length,Math.round(ee)+" fps",ee/t._goodFps,function(Z){return M[Z]/D-1}),t.status(x,oe+te+j,re,j,O,q.length,_.toFixed(2)+" dt",t._goodDelta/_,function(Z){return q[Z]/F-1}),t.status(x,oe+(te+j)*2,re,j,O,T.length,k+" upf",Math.pow(l.clamp(G/ge||1,0,1),4),function(Z){return T[Z]/G-1}),t.status(x,oe+(te+j)*3,re,j,O,P.length,H.toFixed(2)+" ut",1-k*H/t._goodFps,function(Z){return P[Z]/H-1}),t.status(x,oe+(te+j)*4,re,j,O,S.length,$.toFixed(2)+" rt",1-$/t._goodFps,function(Z){return S[Z]/$-1}),t.status(x,oe+(te+j)*5,re,j,O,I.length,Y.toFixed(2)+" x",Y*Y*Y,function(Z){return(I[Z]/M[Z]/Y||0)-1})},t.status=function(v,x,C,b,M,S,I,q,T){v.strokeStyle="#888",v.fillStyle="#444",v.lineWidth=1,v.fillRect(x,C+7,b,1),v.beginPath(),v.moveTo(x,C+7-M*l.clamp(.4*T(0),-2,2));for(var P=0;P<b;P+=1)v.lineTo(x+P,C+7-(P<S?M*l.clamp(.4*T(P),-2,2):0));v.stroke(),v.fillStyle="hsl("+l.clamp(25+95*q,0,120)+",100%,60%)",v.fillRect(x,C-7,4,4),v.font="12px Arial",v.textBaseline="middle",v.textAlign="right",v.fillStyle="#eee",v.fillText(I,x+b,C-5)},t.constraints=function(v,x){for(var C=x,b=0;b<v.length;b++){var M=v[b];if(!(!M.render.visible||!M.pointA||!M.pointB)){var S=M.bodyA,I=M.bodyB,q,T;if(S?q=f.add(S.position,M.pointA):q=M.pointA,M.render.type==="pin")C.beginPath(),C.arc(q.x,q.y,3,0,2*Math.PI),C.closePath();else{if(I?T=f.add(I.position,M.pointB):T=M.pointB,C.beginPath(),C.moveTo(q.x,q.y),M.render.type==="spring")for(var P=f.sub(T,q),k=f.perp(f.normalise(P)),_=Math.ceil(l.clamp(M.length/5,12,20)),D,$=1;$<_;$+=1)D=$%2===0?1:-1,C.lineTo(q.x+P.x*($/_)+k.x*D*4,q.y+P.y*($/_)+k.y*D*4);C.lineTo(T.x,T.y)}M.render.lineWidth&&(C.lineWidth=M.render.lineWidth,C.strokeStyle=M.render.strokeStyle,C.stroke()),M.render.anchors&&(C.fillStyle=M.render.strokeStyle,C.beginPath(),C.arc(q.x,q.y,3,0,2*Math.PI),C.arc(T.x,T.y,3,0,2*Math.PI),C.closePath(),C.fill())}}},t.bodies=function(v,x,C){var b=C;v.engine;var M=v.options,S=M.showInternalEdges||!M.wireframes,I,q,T,P;for(T=0;T<x.length;T++)if(I=x[T],!!I.render.visible){for(P=I.parts.length>1?1:0;P<I.parts.length;P++)if(q=I.parts[P],!!q.render.visible){if(M.showSleeping&&I.isSleeping?b.globalAlpha=.5*q.render.opacity:q.render.opacity!==1&&(b.globalAlpha=q.render.opacity),q.render.sprite&&q.render.sprite.texture&&!M.wireframes){var k=q.render.sprite,_=E(v,k.texture);b.translate(q.position.x,q.position.y),b.rotate(q.angle),b.drawImage(_,_.width*-k.xOffset*k.xScale,_.height*-k.yOffset*k.yScale,_.width*k.xScale,_.height*k.yScale),b.rotate(-q.angle),b.translate(-q.position.x,-q.position.y)}else{if(q.circleRadius)b.beginPath(),b.arc(q.position.x,q.position.y,q.circleRadius,0,2*Math.PI);else{b.beginPath(),b.moveTo(q.vertices[0].x,q.vertices[0].y);for(var D=1;D<q.vertices.length;D++)!q.vertices[D-1].isInternal||S?b.lineTo(q.vertices[D].x,q.vertices[D].y):b.moveTo(q.vertices[D].x,q.vertices[D].y),q.vertices[D].isInternal&&!S&&b.moveTo(q.vertices[(D+1)%q.vertices.length].x,q.vertices[(D+1)%q.vertices.length].y);b.lineTo(q.vertices[0].x,q.vertices[0].y),b.closePath()}M.wireframes?(b.lineWidth=1,b.strokeStyle=v.options.wireframeStrokeStyle,b.stroke()):(b.fillStyle=q.render.fillStyle,q.render.lineWidth&&(b.lineWidth=q.render.lineWidth,b.strokeStyle=q.render.strokeStyle,b.stroke()),b.fill())}b.globalAlpha=1}}},t.bodyWireframes=function(v,x,C){var b=C,M=v.options.showInternalEdges,S,I,q,T,P;for(b.beginPath(),q=0;q<x.length;q++)if(S=x[q],!!S.render.visible)for(P=S.parts.length>1?1:0;P<S.parts.length;P++){for(I=S.parts[P],b.moveTo(I.vertices[0].x,I.vertices[0].y),T=1;T<I.vertices.length;T++)!I.vertices[T-1].isInternal||M?b.lineTo(I.vertices[T].x,I.vertices[T].y):b.moveTo(I.vertices[T].x,I.vertices[T].y),I.vertices[T].isInternal&&!M&&b.moveTo(I.vertices[(T+1)%I.vertices.length].x,I.vertices[(T+1)%I.vertices.length].y);b.lineTo(I.vertices[0].x,I.vertices[0].y)}b.lineWidth=1,b.strokeStyle=v.options.wireframeStrokeStyle,b.stroke()},t.bodyConvexHulls=function(v,x,C){var b=C,M,S,I;for(b.beginPath(),S=0;S<x.length;S++)if(M=x[S],!(!M.render.visible||M.parts.length===1)){for(b.moveTo(M.vertices[0].x,M.vertices[0].y),I=1;I<M.vertices.length;I++)b.lineTo(M.vertices[I].x,M.vertices[I].y);b.lineTo(M.vertices[0].x,M.vertices[0].y)}b.lineWidth=1,b.strokeStyle="rgba(255,255,255,0.2)",b.stroke()},t.vertexNumbers=function(v,x,C){var b=C,M,S,I;for(M=0;M<x.length;M++){var q=x[M].parts;for(I=q.length>1?1:0;I<q.length;I++){var T=q[I];for(S=0;S<T.vertices.length;S++)b.fillStyle="rgba(255,255,255,0.2)",b.fillText(M+"_"+S,T.position.x+(T.vertices[S].x-T.position.x)*.8,T.position.y+(T.vertices[S].y-T.position.y)*.8)}}},t.mousePosition=function(v,x,C){var b=C;b.fillStyle="rgba(255,255,255,0.8)",b.fillText(x.position.x+"  "+x.position.y,x.position.x+5,x.position.y-5)},t.bodyBounds=function(v,x,C){var b=C;v.engine;var M=v.options;b.beginPath();for(var S=0;S<x.length;S++){var I=x[S];if(I.render.visible)for(var q=x[S].parts,T=q.length>1?1:0;T<q.length;T++){var P=q[T];b.rect(P.bounds.min.x,P.bounds.min.y,P.bounds.max.x-P.bounds.min.x,P.bounds.max.y-P.bounds.min.y)}}M.wireframes?b.strokeStyle="rgba(255,255,255,0.08)":b.strokeStyle="rgba(0,0,0,0.1)",b.lineWidth=1,b.stroke()},t.bodyAxes=function(v,x,C){var b=C;v.engine;var M=v.options,S,I,q,T;for(b.beginPath(),I=0;I<x.length;I++){var P=x[I],k=P.parts;if(P.render.visible)if(M.showAxes)for(q=k.length>1?1:0;q<k.length;q++)for(S=k[q],T=0;T<S.axes.length;T++){var _=S.axes[T];b.moveTo(S.position.x,S.position.y),b.lineTo(S.position.x+_.x*20,S.position.y+_.y*20)}else for(q=k.length>1?1:0;q<k.length;q++)for(S=k[q],T=0;T<S.axes.length;T++)b.moveTo(S.position.x,S.position.y),b.lineTo((S.vertices[0].x+S.vertices[S.vertices.length-1].x)/2,(S.vertices[0].y+S.vertices[S.vertices.length-1].y)/2)}M.wireframes?(b.strokeStyle="indianred",b.lineWidth=1):(b.strokeStyle="rgba(255, 255, 255, 0.4)",b.globalCompositeOperation="overlay",b.lineWidth=2),b.stroke(),b.globalCompositeOperation="source-over"},t.bodyPositions=function(v,x,C){var b=C;v.engine;var M=v.options,S,I,q,T;for(b.beginPath(),q=0;q<x.length;q++)if(S=x[q],!!S.render.visible)for(T=0;T<S.parts.length;T++)I=S.parts[T],b.arc(I.position.x,I.position.y,3,0,2*Math.PI,!1),b.closePath();for(M.wireframes?b.fillStyle="indianred":b.fillStyle="rgba(0,0,0,0.5)",b.fill(),b.beginPath(),q=0;q<x.length;q++)S=x[q],S.render.visible&&(b.arc(S.positionPrev.x,S.positionPrev.y,2,0,2*Math.PI,!1),b.closePath());b.fillStyle="rgba(255,165,0,0.8)",b.fill()},t.bodyVelocity=function(v,x,C){var b=C;b.beginPath();for(var M=0;M<x.length;M++){var S=x[M];if(S.render.visible){var I=n.getVelocity(S);b.moveTo(S.position.x,S.position.y),b.lineTo(S.position.x+I.x,S.position.y+I.y)}}b.lineWidth=3,b.strokeStyle="cornflowerblue",b.stroke()},t.bodyIds=function(v,x,C){var b=C,M,S;for(M=0;M<x.length;M++)if(x[M].render.visible){var I=x[M].parts;for(S=I.length>1?1:0;S<I.length;S++){var q=I[S];b.font="12px Arial",b.fillStyle="rgba(255,255,255,0.5)",b.fillText(q.id,q.position.x+10,q.position.y-10)}}},t.collisions=function(v,x,C){var b=C,M=v.options,S,I,q,T;for(b.beginPath(),q=0;q<x.length;q++)if(S=x[q],!!S.isActive)for(I=S.collision,T=0;T<S.contactCount;T++){var P=S.contacts[T],k=P.vertex;b.rect(k.x-1.5,k.y-1.5,3.5,3.5)}for(M.wireframes?b.fillStyle="rgba(255,255,255,0.7)":b.fillStyle="orange",b.fill(),b.beginPath(),q=0;q<x.length;q++)if(S=x[q],!!S.isActive&&(I=S.collision,S.contactCount>0)){var _=S.contacts[0].vertex.x,D=S.contacts[0].vertex.y;S.contactCount===2&&(_=(S.contacts[0].vertex.x+S.contacts[1].vertex.x)/2,D=(S.contacts[0].vertex.y+S.contacts[1].vertex.y)/2),I.bodyB===I.supports[0].body||I.bodyA.isStatic===!0?b.moveTo(_-I.normal.x*8,D-I.normal.y*8):b.moveTo(_+I.normal.x*8,D+I.normal.y*8),b.lineTo(_,D)}M.wireframes?b.strokeStyle="rgba(255,165,0,0.7)":b.strokeStyle="orange",b.lineWidth=1,b.stroke()},t.separations=function(v,x,C){var b=C,M=v.options,S,I,q,T,P;for(b.beginPath(),P=0;P<x.length;P++)if(S=x[P],!!S.isActive){I=S.collision,q=I.bodyA,T=I.bodyB;var k=1;!T.isStatic&&!q.isStatic&&(k=.5),T.isStatic&&(k=0),b.moveTo(T.position.x,T.position.y),b.lineTo(T.position.x-I.penetration.x*k,T.position.y-I.penetration.y*k),k=1,!T.isStatic&&!q.isStatic&&(k=.5),q.isStatic&&(k=0),b.moveTo(q.position.x,q.position.y),b.lineTo(q.position.x+I.penetration.x*k,q.position.y+I.penetration.y*k)}M.wireframes?b.strokeStyle="rgba(255,165,0,0.5)":b.strokeStyle="orange",b.stroke()},t.inspector=function(v,x){v.engine;var C=v.selected,b=v.render,M=b.options,S;if(M.hasBounds){var I=b.bounds.max.x-b.bounds.min.x,q=b.bounds.max.y-b.bounds.min.y,T=I/b.options.width,P=q/b.options.height;x.scale(1/T,1/P),x.translate(-b.bounds.min.x,-b.bounds.min.y)}for(var k=0;k<C.length;k++){var _=C[k].data;switch(x.translate(.5,.5),x.lineWidth=1,x.strokeStyle="rgba(255,165,0,0.9)",x.setLineDash([1,2]),_.type){case"body":S=_.bounds,x.beginPath(),x.rect(Math.floor(S.min.x-3),Math.floor(S.min.y-3),Math.floor(S.max.x-S.min.x+6),Math.floor(S.max.y-S.min.y+6)),x.closePath(),x.stroke();break;case"constraint":var D=_.pointA;_.bodyA&&(D=_.pointB),x.beginPath(),x.arc(D.x,D.y,10,0,2*Math.PI),x.closePath(),x.stroke();break}x.setLineDash([]),x.translate(-.5,-.5)}v.selectStart!==null&&(x.translate(.5,.5),x.lineWidth=1,x.strokeStyle="rgba(255,165,0,0.6)",x.fillStyle="rgba(255,165,0,0.1)",S=v.selectBounds,x.beginPath(),x.rect(Math.floor(S.min.x),Math.floor(S.min.y),Math.floor(S.max.x-S.min.x),Math.floor(S.max.y-S.min.y)),x.closePath(),x.stroke(),x.fill(),x.translate(-.5,-.5)),M.hasBounds&&x.setTransform(1,0,0,1,0,0)};var h=function(v,x){var C=v.engine,b=v.timing,M=b.historySize,S=C.timing.timestamp;b.delta=x-b.lastTime||t._goodDelta,b.lastTime=x,b.timestampElapsed=S-b.lastTimestamp||0,b.lastTimestamp=S,b.deltaHistory.unshift(b.delta),b.deltaHistory.length=Math.min(b.deltaHistory.length,M),b.engineDeltaHistory.unshift(C.timing.lastDelta),b.engineDeltaHistory.length=Math.min(b.engineDeltaHistory.length,M),b.timestampElapsedHistory.unshift(b.timestampElapsed),b.timestampElapsedHistory.length=Math.min(b.timestampElapsedHistory.length,M),b.engineUpdatesHistory.unshift(C.timing.lastUpdatesPerFrame),b.engineUpdatesHistory.length=Math.min(b.engineUpdatesHistory.length,M),b.engineElapsedHistory.unshift(C.timing.lastElapsed),b.engineElapsedHistory.length=Math.min(b.engineElapsedHistory.length,M),b.elapsedHistory.unshift(b.lastElapsed),b.elapsedHistory.length=Math.min(b.elapsedHistory.length,M)},m=function(v){for(var x=0,C=0;C<v.length;C+=1)x+=v[C];return x/v.length||0},y=function(v,x){var C=document.createElement("canvas");return C.width=v,C.height=x,C.oncontextmenu=function(){return!1},C.onselectstart=function(){return!1},C},w=function(v){var x=v.getContext("2d"),C=window.devicePixelRatio||1,b=x.webkitBackingStorePixelRatio||x.mozBackingStorePixelRatio||x.msBackingStorePixelRatio||x.oBackingStorePixelRatio||x.backingStorePixelRatio||1;return C/b},E=function(v,x){var C=v.textures[x];return C||(C=v.textures[x]=new Image,C.src=x,C)},A=function(v,x){var C=x;/(jpg|gif|png)$/.test(x)&&(C="url("+x+")"),v.canvas.style.background=C,v.canvas.style.backgroundSize="contain",v.currentBackground=x}})()},function(a,o,i){var t={};a.exports=t;var n=i(5),l=i(17),r=i(0);(function(){t._maxFrameDelta=1e3/15,t._frameDeltaFallback=1e3/60,t._timeBufferMargin=1.5,t._elapsedNextEstimate=1,t._smoothingLowerBound=.1,t._smoothingUpperBound=.9,t.create=function(c){var f={delta:16.666666666666668,frameDelta:null,frameDeltaSmoothing:!0,frameDeltaSnapping:!0,frameDeltaHistory:[],frameDeltaHistorySize:100,frameRequestId:null,timeBuffer:0,timeLastTick:null,maxUpdates:null,maxFrameTime:33.333333333333336,lastUpdatesDeferred:0,enabled:!0},p=r.extend(f,c);return p.fps=0,p},t.run=function(c,f){return c.timeBuffer=t._frameDeltaFallback,function p(s){c.frameRequestId=t._onNextFrame(c,p),s&&c.enabled&&t.tick(c,f,s)}(),c},t.tick=function(c,f,p){var s=r.now(),d=c.delta,h=0,m=p-c.timeLastTick;if((!m||!c.timeLastTick||m>Math.max(t._maxFrameDelta,c.maxFrameTime))&&(m=c.frameDelta||t._frameDeltaFallback),c.frameDeltaSmoothing){c.frameDeltaHistory.push(m),c.frameDeltaHistory=c.frameDeltaHistory.slice(-c.frameDeltaHistorySize);var y=c.frameDeltaHistory.slice(0).sort(),w=c.frameDeltaHistory.slice(y.length*t._smoothingLowerBound,y.length*t._smoothingUpperBound),E=u(w);m=E||m}c.frameDeltaSnapping&&(m=1e3/Math.round(1e3/m)),c.frameDelta=m,c.timeLastTick=p,c.timeBuffer+=c.frameDelta,c.timeBuffer=r.clamp(c.timeBuffer,0,c.frameDelta+d*t._timeBufferMargin),c.lastUpdatesDeferred=0;var A=c.maxUpdates||Math.ceil(c.maxFrameTime/d),v={timestamp:f.timing.timestamp};n.trigger(c,"beforeTick",v),n.trigger(c,"tick",v);for(var x=r.now();d>0&&c.timeBuffer>=d*t._timeBufferMargin;){n.trigger(c,"beforeUpdate",v),l.update(f,d),n.trigger(c,"afterUpdate",v),c.timeBuffer-=d,h+=1;var C=r.now()-s,b=r.now()-x,M=C+t._elapsedNextEstimate*b/h;if(h>=A||M>c.maxFrameTime){c.lastUpdatesDeferred=Math.round(Math.max(0,c.timeBuffer/d-t._timeBufferMargin));break}}f.timing.lastUpdatesPerFrame=h,n.trigger(c,"afterTick",v),c.frameDeltaHistory.length>=100&&(c.lastUpdatesDeferred&&Math.round(c.frameDelta/d)>A?r.warnOnce("Matter.Runner: runner reached runner.maxUpdates, see docs."):c.lastUpdatesDeferred&&r.warnOnce("Matter.Runner: runner reached runner.maxFrameTime, see docs."),typeof c.isFixed<"u"&&r.warnOnce("Matter.Runner: runner.isFixed is now redundant, see docs."),(c.deltaMin||c.deltaMax)&&r.warnOnce("Matter.Runner: runner.deltaMin and runner.deltaMax were removed, see docs."),c.fps!==0&&r.warnOnce("Matter.Runner: runner.fps was replaced by runner.delta, see docs."))},t.stop=function(c){t._cancelNextFrame(c)},t._onNextFrame=function(c,f){if(typeof window<"u"&&window.requestAnimationFrame)c.frameRequestId=window.requestAnimationFrame(f);else throw new Error("Matter.Runner: missing required global window.requestAnimationFrame.");return c.frameRequestId},t._cancelNextFrame=function(c){if(typeof window<"u"&&window.cancelAnimationFrame)window.cancelAnimationFrame(c.frameRequestId);else throw new Error("Matter.Runner: missing required global window.cancelAnimationFrame.")};var u=function(c){for(var f=0,p=c.length,s=0;s<p;s+=1)f+=c[s];return f/p||0}})()},function(a,o,i){var t={};a.exports=t;var n=i(8),l=i(0),r=l.deprecated;(function(){t.collides=function(u,c){return n.collides(u,c)},r(t,"collides","SAT.collides ➤ replaced by Collision.collides")})()},function(a,o,i){var t={};a.exports=t,i(1);var n=i(0);(function(){t.pathToVertices=function(l,r){typeof window<"u"&&!("SVGPathSeg"in window)&&n.warn("Svg.pathToVertices: SVGPathSeg not defined, a polyfill is required.");var u,c,f,p,s,d,h,m,y,w,E=[],A,v,x=0,C=0,b=0;r=r||15;var M=function(I,q,T){var P=T%2===1&&T>1;if(!y||I!=y.x||q!=y.y){y&&P?(A=y.x,v=y.y):(A=0,v=0);var k={x:A+I,y:v+q};(P||!y)&&(y=k),E.push(k),C=A+I,b=v+q}},S=function(I){var q=I.pathSegTypeAsLetter.toUpperCase();if(q!=="Z"){switch(q){case"M":case"L":case"T":case"C":case"S":case"Q":C=I.x,b=I.y;break;case"H":C=I.x;break;case"V":b=I.y;break}M(C,b,I.pathSegType)}};for(t._svgPathToAbsolute(l),f=l.getTotalLength(),d=[],u=0;u<l.pathSegList.numberOfItems;u+=1)d.push(l.pathSegList.getItem(u));for(h=d.concat();x<f;){if(w=l.getPathSegAtLength(x),s=d[w],s!=m){for(;h.length&&h[0]!=s;)S(h.shift());m=s}switch(s.pathSegTypeAsLetter.toUpperCase()){case"C":case"T":case"S":case"Q":case"A":p=l.getPointAtLength(x),M(p.x,p.y,0);break}x+=r}for(u=0,c=h.length;u<c;++u)S(h[u]);return E},t._svgPathToAbsolute=function(l){for(var r,u,c,f,p,s,d=l.pathSegList,h=0,m=0,y=d.numberOfItems,w=0;w<y;++w){var E=d.getItem(w),A=E.pathSegTypeAsLetter;if(/[MLHVCSQTA]/.test(A))"x"in E&&(h=E.x),"y"in E&&(m=E.y);else switch("x1"in E&&(c=h+E.x1),"x2"in E&&(p=h+E.x2),"y1"in E&&(f=m+E.y1),"y2"in E&&(s=m+E.y2),"x"in E&&(h+=E.x),"y"in E&&(m+=E.y),A){case"m":d.replaceItem(l.createSVGPathSegMovetoAbs(h,m),w);break;case"l":d.replaceItem(l.createSVGPathSegLinetoAbs(h,m),w);break;case"h":d.replaceItem(l.createSVGPathSegLinetoHorizontalAbs(h),w);break;case"v":d.replaceItem(l.createSVGPathSegLinetoVerticalAbs(m),w);break;case"c":d.replaceItem(l.createSVGPathSegCurvetoCubicAbs(h,m,c,f,p,s),w);break;case"s":d.replaceItem(l.createSVGPathSegCurvetoCubicSmoothAbs(h,m,p,s),w);break;case"q":d.replaceItem(l.createSVGPathSegCurvetoQuadraticAbs(h,m,c,f),w);break;case"t":d.replaceItem(l.createSVGPathSegCurvetoQuadraticSmoothAbs(h,m),w);break;case"a":d.replaceItem(l.createSVGPathSegArcAbs(h,m,E.r1,E.r2,E.angle,E.largeArcFlag,E.sweepFlag),w);break;case"z":case"Z":h=r,m=u;break}(A=="M"||A=="m")&&(r=h,u=m)}}})()},function(a,o,i){var t={};a.exports=t;var n=i(6);i(0),function(){t.create=n.create,t.add=n.add,t.remove=n.remove,t.clear=n.clear,t.addComposite=n.addComposite,t.addBody=n.addBody,t.addConstraint=n.addConstraint}()}])})}(ot)),ot.exports}var ni=ii();const L=ti(ni),at=1,si=2,K=60,ea=70;class oi{constructor(e,a,o){console.log("PhysicsManager Creado"),this.catManager=e,this.catFoodManager=a,this.gameManager=o,this.resizeListener=this.handleResize.bind(this),this.collisionHandler=this.handleCollisions.bind(this),this.speedLimitHandler=this.limitAllCatSpeeds.bind(this)}init(e){if(console.log("PhysicsManager: init"),!e)throw console.error("PhysicsManager CRITICAL: catDisplayAreaElement es nulo en init()."),new Error("PhysicsManager requiere un catDisplayAreaElement para inicializar.");this.catDisplayAreaElement=e,this.engine=L.Engine.create(),this.world=this.engine.world,this.runner=L.Runner.create(),this.engine.gravity.y=.8,this.engine.gravity.x=0,this.engine.enableSleeping=!0,console.log("Matter.js Engine, World, Runner creados."),this.createWalls(),this.setupMouseConstraint(this.catDisplayAreaElement),console.log("PhysicsManager: Añadiendo listeners de eventos del motor..."),L.Events.on(this.engine,"collisionStart",this.collisionHandler),L.Events.on(this.engine,"beforeUpdate",this.speedLimitHandler),window.addEventListener("resize",this.resizeListener),console.log("PhysicsManager: init completado.")}createWalls(){const e=window.innerWidth,a=window.innerHeight;this.ground=L.Bodies.rectangle(e/2,a+K/2,e,K,{isStatic:!0,label:"ground",collisionFilter:{category:at}}),this.leftWall=L.Bodies.rectangle(-60/2,a/2,K,a,{isStatic:!0,label:"leftWall",collisionFilter:{category:at}}),this.rightWall=L.Bodies.rectangle(e+K/2,a/2,K,a,{isStatic:!0,label:"rightWall",collisionFilter:{category:at}}),this.topWall=L.Bodies.rectangle(e/2,-60/2,e,K,{isStatic:!0,label:"topWall",collisionFilter:{category:at}}),L.World.add(this.world,[this.ground,this.leftWall,this.rightWall,this.topWall]),console.log("PhysicsManager: Paredes creadas.")}setupMouseConstraint(e){const a=L.Mouse.create(e);this.mouseConstraint=L.MouseConstraint.create(this.engine,{mouse:a,constraint:{stiffness:.1,render:{visible:!1}}}),this.mouseConstraint.collisionFilter.mask=si,L.World.add(this.world,this.mouseConstraint),this.updateMouseConstraintOffset(),console.log("PhysicsManager: MouseConstraint configurado sobre",e),L.Events.on(this.mouseConstraint,"startdrag",o=>{const i=o.body;i&&i.label==="cat"&&(console.log("PhysicsManager: Cat drag started"),this.gameManager.setCatDragState(!0))}),L.Events.on(this.mouseConstraint,"enddrag",o=>{const i=o.body;i&&i.label==="cat"&&(console.log("PhysicsManager: Cat drag ended"),this.gameManager.setCatDragState(!1))})}updateMouseConstraintOffset(){if(this.mouseConstraint&&this.mouseConstraint.mouse.element){const e=this.mouseConstraint.mouse.element.getBoundingClientRect();L.Mouse.setOffset(this.mouseConstraint.mouse,{x:-e.left,y:-e.top})}}handleCollisions(e){var o,i;const a=e.pairs;for(let t=0;t<a.length;t++){const n=a[t],l=n.bodyA,r=n.bodyB,u=l==null?void 0:l.label,c=r==null?void 0:r.label;if(u==="cat"&&c==="cat"){const f=((o=this.mouseConstraint)==null?void 0:o.body)===l,p=((i=this.mouseConstraint)==null?void 0:i.body)===r;if(f!==p)if(typeof l.id<"u"&&typeof r.id<"u"){const s=f?l.id:r.id;this.catManager.processPlayerInitiatedCollision(l.id,r.id,s)}else console.error("Error: IDs indefinidos en colisión gato-gato.")}else if(u==="cat"&&c==="foodPellet"||u==="foodPellet"&&c==="cat"){const f=u==="cat"?l:r,p=u==="foodPellet"?l:r;typeof f.id<"u"&&p?this.catFoodManager.processCatFoodCollision(f.id,p):console.warn("Colisión Gato-Comida detectada pero falta ID de gato o cuerpo de comida.")}}}limitAllCatSpeeds(){if(!this.world)return;const e=L.Composite.allBodies(this.world);for(let a=0;a<e.length;a++){const o=e[a];if(!o.isStatic&&o.label==="cat"&&L.Vector.magnitude(o.velocity)>ea){const t=L.Vector.normalise(o.velocity),n=L.Vector.mult(t,ea);L.Body.setVelocity(o,n)}}}handleResize(){if(!this.ground||!this.leftWall||!this.rightWall||!this.topWall||!this.catDisplayAreaElement)return;const e=window.innerWidth,a=window.innerHeight;L.Body.setPosition(this.ground,{x:e/2,y:a+K/2}),L.Body.setVertices(this.ground,L.Vertices.fromPath(`L 0 0 L ${e} 0 L ${e} ${K} L 0 ${K}`,this.ground)),L.Body.setPosition(this.leftWall,{x:-60/2,y:a/2}),L.Body.setVertices(this.leftWall,L.Vertices.fromPath(`L 0 0 L ${K} 0 L ${K} ${a} L 0 ${a}`,this.leftWall)),L.Body.setPosition(this.rightWall,{x:e+K/2,y:a/2}),L.Body.setVertices(this.rightWall,L.Vertices.fromPath(`L 0 0 L ${K} 0 L ${K} ${a} L 0 ${a}`,this.rightWall)),L.Body.setPosition(this.topWall,{x:e/2,y:-60/2}),L.Body.setVertices(this.topWall,L.Vertices.fromPath(`L 0 0 L ${e} 0 L ${e} ${K} L 0 ${K}`,this.topWall)),this.updateMouseConstraintOffset(),console.log("PhysicsManager: Límites y mouse constraint actualizados en resize.")}start(){if(!this.engine||!this.runner){console.error("PhysicsManager: init() debe ser llamado antes de start().");return}L.Runner.run(this.runner,this.engine),console.log("PhysicsManager: Runner iniciado.")}stop(){if(!this.runner){console.warn("PhysicsManager: Runner no inicializado.");return}L.Runner.stop(this.runner),console.log("PhysicsManager: Runner detenido.")}shutdown(){console.log("PhysicsManager: shutdown"),this.stop(),this.engine?(L.Events.off(this.engine,"collisionStart",this.collisionHandler),L.Events.off(this.engine,"beforeUpdate",this.speedLimitHandler),this.mouseConstraint&&(L.Events.off(this.mouseConstraint,"startdrag"),L.Events.off(this.mouseConstraint,"enddrag")),L.World.clear(this.world,!1),L.Engine.clear(this.engine),console.log("PhysicsManager: Listeners de engine removidos y mundo limpiado.")):console.warn("PhysicsManager shutdown: Engine no encontrado."),window.removeEventListener("resize",this.resizeListener),this.mouseConstraint=void 0,console.log("PhysicsManager: shutdown completo.")}getEngine(){if(!this.engine)throw new Error("PhysicsManager no inicializado.");return this.engine}getWorld(){if(!this.world)throw new Error("PhysicsManager no inicializado.");return this.world}}class ri{constructor(){this.allQuestions=[],this.availableQuestions=[],this.currentQuestion=null,this.isLoading=!1,this.lastError=null}async loadQuestionsData(e){if(this.isLoading)return console.warn("QuizSystem: Ya hay una carga en progreso."),!1;this.isLoading=!0,this.lastError=null,this.allQuestions=[];try{if(!Array.isArray(e))throw new Error("Los datos de preguntas proporcionados no son un array válido.");return this.allQuestions=e,this.resetAvailableQuestions(),console.log(`QuizSystem: ${this.allQuestions.length} preguntas procesadas exitosamente desde datos pre-cargados.`),this.isLoading=!1,!0}catch(a){return console.error("QuizSystem: Error al procesar los datos de preguntas:",a),this.lastError=a instanceof Error?a.message:String(a),this.isLoading=!1,this.allQuestions=[],this.availableQuestions=[],!1}}selectNextQuestion(e){if(this.allQuestions.length===0&&!this.isLoading)return console.error("QuizSystem: No hay preguntas cargadas o procesadas."),null;if(this.isLoading)return console.warn("QuizSystem: Las preguntas aún se están procesando."),null;let a=this.availableQuestions;if(e&&(a=a.filter(i=>String(i.difficulty)===String(e))),a.length===0&&(console.warn("QuizSystem: No quedan preguntas disponibles"+(e?` con dificultad '${e}'.`:".")+" Reseteando lista..."),this.resetAvailableQuestions(),a=this.availableQuestions,e&&(a=a.filter(i=>String(i.difficulty)===String(e))),a.length===0))return console.error(`QuizSystem: No se encontraron preguntas con dificultad '${e}' incluso después de resetear.`),null;const o=Math.floor(Math.random()*a.length);return this.currentQuestion=a[o],this.availableQuestions=this.availableQuestions.filter(i=>{var t;return i.id!==((t=this.currentQuestion)==null?void 0:t.id)}),this.currentQuestion}validateAnswer(e,a){const o=this.allQuestions.find(t=>t.id===e);return o?a===null?!1:o.correctAnswerKey===a:(console.error(`QuizSystem: No se encontró la pregunta con ID '${e}' para validar.`),null)}getCurrentQuestion(){return this.currentQuestion}resetAvailableQuestions(){this.availableQuestions=[...this.allQuestions],this.currentQuestion=null}getLastError(){return this.lastError}isLoadingQuestions(){return this.isLoading}getTotalQuestionsCount(){return this.allQuestions.length}getAvailableQuestionsCount(){return this.availableQuestions.length}}class li{constructor(){this.states=new Map,this.currentState=null,this.currentStateName=null,this.isTransitioning=!1,this.animationContainer=null,this.wipeComponent=null}setAnimationContainer(e){this.animationContainer=e}setWipeComponent(e){var a;this.wipeComponent=e,console.log("[StateMachine] Wipe component seteado:",e),(a=this.wipeComponent)==null||a.reset()}addState(e,a){this.states.has(e)&&console.warn(`[StateMachine] El estado '${e}' ya existe. Sobrescribiendo.`),this.states.set(e,a)}async changeState(e,a,o,i){var c,f,p,s;if(console.log(`[StateMachine] Solicitud para cambiar a estado '${e}'. Estado actual: '${this.currentStateName}', isTransitioning: ${this.isTransitioning}`),this.isTransitioning){console.warn(`[StateMachine] Transición a '${e}' ignorada, otra transición ya está en progreso.`);return}const t=this.states.get(e);if(!t){console.error(`[StateMachine] Estado '${e}' no existe. Estados disponibles:`,Array.from(this.states.keys())),this.isTransitioning=!1;return}if(this.currentStateName===e&&!o&&!i){console.warn(`[StateMachine] Ya en estado '${e}' y sin forzar animación.`);return}this.isTransitioning=!0,console.log(`[StateMachine] INICIO TRANSICIÓN: de '${this.currentStateName||"ninguno"}' a '${e}'. isTransitioning = true.`);const n=this.currentState,l=this.currentStateName,r=o||((c=n==null?void 0:n.getPreferredExitAnimation)==null?void 0:c.call(n))||"gq-fade-out",u=i||((f=t==null?void 0:t.getPreferredEnterAnimation)==null?void 0:f.call(t))||"gq-fade-in";try{if(this.wipeComponent&&(r==="gq-wipe-transition"||u==="gq-wipe-transition"))console.log(`[StateMachine] Usando BARRIDO de '${l||"ninguno"}' a '${e}'.`),console.log("[StateMachine]   BARRIDO: Llamando wipeComponent.playIn() para cubrir pantalla..."),await this.wipeComponent.playIn(),console.log("[StateMachine]   BARRIDO: wipeComponent.playIn() COMPLETADO."),n!=null&&n.exit&&(console.log(`[StateMachine]   BARRIDO: Llamando oldState.exit() para '${l}'.`),n.exit()),this.animationContainer&&(console.log("[StateMachine]   BARRIDO: Limpiando animationContainer (innerHTML = '')."),this.animationContainer.innerHTML=""),this.currentState=t,this.currentStateName=e,(p=this.currentState)!=null&&p.enter&&(console.log(`[StateMachine]   BARRIDO: Llamando currentState.enter() para '${this.currentStateName}'.`),this.currentState.enter(a)),console.log(`[StateMachine]   BARRIDO: Llamando wipeComponent.playOut() para revelar '${this.currentStateName}'...`),await this.wipeComponent.playOut(),console.log("[StateMachine]   BARRIDO: wipeComponent.playOut() COMPLETADO."),this.wipeComponent.reset(),console.log(`[StateMachine] Transición de BARRIDO a '${this.currentStateName}' finalizada exitosamente.`);else{console.log(`[StateMachine] Usando animación ESTÁNDAR ('${r}' -> '${u}') de '${l||"ninguno"}' a '${e}'.`);const d=this.animationContainer||document.getElementById("app");if(!d){console.error("[StateMachine] Contenedor de animación estándar no encontrado. Realizando cambio directo."),n!=null&&n.exit&&n.exit(),this.currentState=t,this.currentStateName=e,this.currentState.enter&&this.currentState.enter(a),console.log(`[StateMachine] Cambio directo a '${e}' completado (sin contenedor).`);return}await new Promise(h=>{const m=()=>{var x;d.removeEventListener("animationend",w),y&&clearTimeout(y),d.classList.remove("gq-state-is-exiting",...wt(d)),console.log(`[StateMachine]   ESTÁNDAR: Animación de salida '${r}' para '${l}' finalizada.`),n!=null&&n.exit&&(console.log(`[StateMachine]   ESTÁNDAR: Llamando oldState.exit() para '${l}'.`),n.exit()),r.includes("fade")&&(console.log("[StateMachine]   ESTÁNDAR: Limpiando container.innerHTML por animación fade."),d.innerHTML=""),this.currentState=t,this.currentStateName=e,(x=this.currentState)!=null&&x.enter&&(console.log(`[StateMachine]   ESTÁNDAR: Llamando currentState.enter() para '${this.currentStateName}'.`),this.currentState.enter(a)),console.log(`[StateMachine]   ESTÁNDAR: Aplicando animación de entrada '${u}' para '${this.currentStateName}'.`),d.classList.add("gq-state-is-entering",u);const E=ta(d,u);let A=window.setTimeout(()=>{console.warn(`[StateMachine]   ESTÁNDAR: Fallback para animationend de entrada en '${this.currentStateName}'.`),d.removeEventListener("animationend",v),d.classList.remove("gq-state-is-entering",...wt(d)),console.log(`[StateMachine] Transición ESTÁNDAR a '${this.currentStateName}' completada (fallback).`),h()},E+150);const v=C=>{C.target===d&&C.animationName===aa(u)&&(A&&clearTimeout(A),A=void 0,d.removeEventListener("animationend",v),d.classList.remove("gq-state-is-entering",...wt(d)),console.log(`[StateMachine] Transición ESTÁNDAR a '${this.currentStateName}' completada (evento).`),h())};d.addEventListener("animationend",v)};let y,w;if(n){console.log(`[StateMachine]   ESTÁNDAR: Aplicando animación de salida '${r}' a '${l}'.`),d.classList.add("gq-state-is-exiting",r);const E=ta(d,r);y=window.setTimeout(()=>{console.warn(`[StateMachine]   ESTÁNDAR: Fallback para animationend de salida en '${l}'.`),m()},E+150),w=A=>{A.target===d&&A.animationName===aa(r)&&m()},d.addEventListener("animationend",w)}else console.log("[StateMachine]   ESTÁNDAR: No hay estado antiguo, procediendo directamente a la entrada."),m()})}}catch(d){console.error(`[StateMachine] ERROR CRÍTICO durante la transición de '${l||"ninguno"}' a '${e}':`,d),(s=this.wipeComponent)==null||s.reset()}finally{this.isTransitioning=!1,console.log(`[StateMachine] FIN TRANSICIÓN: a '${e}'. isTransitioning = false. Estado final: '${this.currentStateName}'.`)}}update(e){var a;if(!this.isTransitioning&&((a=this.currentState)!=null&&a.update))try{this.currentState.update(e)}catch(o){console.error(`[StateMachine] Error en update() de '${this.currentStateName}':`,o)}}getCurrentStateName(){return this.currentStateName}getCurrentState(){return this.currentState}}function ta(g,e){const a=g.className;g.className=`${a} ${e}`.trim();const o=getComputedStyle(g).animationDuration||"0s";g.className=a;const i=parseFloat(o);return o.toLowerCase().includes("ms")?i:i*1e3}function aa(g){if(g.startsWith("anim-"))return g;const e=g.split("-");return e.length>1&&e[0]==="gq"?`anim-${e.slice(1).join("-")}`:g}function wt(g){const e=["gq-fade","gq-slide","gq-wipe","anim-"];return Array.from(g.classList).filter(a=>e.some(o=>a.startsWith(o)))}class ci{constructor(){this.audioCtx=null,this.isInitialized=!1,this.masterGainNode=null,console.log("AudioManager Creado (sin inicializar)")}init(){if(!this.isInitialized)try{this.audioCtx=new(window.AudioContext||window.webkitAudioContext),this.masterGainNode=this.audioCtx.createGain(),this.masterGainNode.connect(this.audioCtx.destination),this.audioCtx.state==="suspended"?this.audioCtx.resume().then(()=>{console.log("AudioManager: AudioContext reanudado exitosamente."),this.isInitialized=!0}).catch(e=>console.error("AudioManager: Error al reanudar AudioContext:",e)):this.isInitialized=!0}catch(e){console.error("AudioManager: Error al crear AudioContext:",e),this.audioCtx=null,this.masterGainNode=null,this.isInitialized=!1}}playSound(e){if(!((!this.isInitialized||!this.audioCtx||!this.masterGainNode)&&(this.isInitialized||this.init(),!this.isInitialized||!this.audioCtx||!this.masterGainNode))){if(this.audioCtx.state!=="running"){this.audioCtx.state==="suspended"&&this.audioCtx.resume().catch(a=>console.error("Error reanudando AudioContext en playSound:",a));return}try{const a=this.audioCtx.createOscillator(),o=this.audioCtx.createGain();a.connect(o),o.connect(this.masterGainNode);const i=this.audioCtx.currentTime,t=(n,l,r)=>{n.onended=()=>{try{n.numberOfOutputs>0&&n.disconnect(),r&&r.numberOfOutputs>0&&r.disconnect(),l.numberOfOutputs>0&&l.disconnect()}catch{}}};switch(e){case"correct":a.type="sine",a.frequency.setValueAtTime(440,i),o.gain.setValueAtTime(.001,i),o.gain.exponentialRampToValueAtTime(.4,i+.05),a.frequency.exponentialRampToValueAtTime(880,i+.15),o.gain.exponentialRampToValueAtTime(1e-4,i+.3),t(a,o),a.start(i),a.stop(i+.35);break;case"incorrect":a.type="square",a.frequency.setValueAtTime(110,i),o.gain.setValueAtTime(.001,i),o.gain.exponentialRampToValueAtTime(.3,i+.02),o.gain.exponentialRampToValueAtTime(1e-4,i+.2),t(a,o),a.start(i),a.stop(i+.25);break;case"eat":a.type="sawtooth",a.frequency.setValueAtTime(150,i),o.gain.setValueAtTime(.001,i),o.gain.exponentialRampToValueAtTime(.15,i+.03),a.frequency.exponentialRampToValueAtTime(50,i+.1),o.gain.exponentialRampToValueAtTime(1e-4,i+.15),t(a,o),a.start(i),a.stop(i+.2);break;case"draw_start":a.type="triangle",a.frequency.setValueAtTime(330,i),o.gain.setValueAtTime(.001,i),o.gain.exponentialRampToValueAtTime(.1,i+.02),o.gain.exponentialRampToValueAtTime(1e-4,i+.1),t(a,o),a.start(i),a.stop(i+.15);break;case"draw_end":a.type="sine",a.frequency.setValueAtTime(220,i),o.gain.setValueAtTime(.001,i),o.gain.exponentialRampToValueAtTime(.15,i+.03),o.gain.exponentialRampToValueAtTime(1e-4,i+.15),t(a,o),a.start(i),a.stop(i+.2);break;case"clear_ink":a.type="sawtooth",a.frequency.setValueAtTime(800,i),o.gain.setValueAtTime(.001,i),o.gain.exponentialRampToValueAtTime(.2,i+.05),a.frequency.exponentialRampToValueAtTime(200,i+.2),o.gain.exponentialRampToValueAtTime(1e-4,i+.3),t(a,o),a.start(i),a.stop(i+.35);break;case"game_over":a.type="square",a.frequency.setValueAtTime(220,i),o.gain.setValueAtTime(.001,i),o.gain.exponentialRampToValueAtTime(.3,i+.05),a.frequency.exponentialRampToValueAtTime(110,i+.15),o.gain.exponentialRampToValueAtTime(1e-4,i+.4),t(a,o),a.start(i),a.stop(i+.45);break;case"purchase":a.type="triangle",a.frequency.setValueAtTime(660,i),o.gain.setValueAtTime(.001,i),o.gain.exponentialRampToValueAtTime(.3,i+.03),a.frequency.exponentialRampToValueAtTime(1320,i+.1),o.gain.exponentialRampToValueAtTime(1e-4,i+.2),t(a,o),a.start(i),a.stop(i+.25);break;case"shield_break":a.type="sawtooth";const n=this.audioCtx.createBiquadFilter();n.type="bandpass",n.frequency.setValueAtTime(1500,i),n.Q.setValueAtTime(15,i),a.connect(n),n.connect(o),o.gain.setValueAtTime(.001,i),o.gain.exponentialRampToValueAtTime(.5,i+.02),o.gain.exponentialRampToValueAtTime(1e-4,i+.3),t(a,o,n),a.start(i),a.stop(i+.3);break;case"hint_used":a.type="sine",a.frequency.setValueAtTime(900,i),o.gain.setValueAtTime(.001,i),o.gain.exponentialRampToValueAtTime(.1,i+.02),o.gain.exponentialRampToValueAtTime(1e-4,i+.1),t(a,o),a.start(i),a.stop(i+.15);break;case"ui_confirm":a.type="sine",a.frequency.setValueAtTime(523.25,i),o.gain.setValueAtTime(.001,i),o.gain.exponentialRampToValueAtTime(.25,i+.02),a.frequency.linearRampToValueAtTime(659.25,i+.05),o.gain.exponentialRampToValueAtTime(1e-4,i+.15),t(a,o),a.start(i),a.stop(i+.2);break;default:console.warn(`AudioManager: Tipo de sonido desconocido: '${e}'`);return}}catch(a){console.error(`AudioManager: Error al reproducir sonido '${e}':`,a)}}}setVolume(e){if(!this.isInitialized||!this.audioCtx||!this.masterGainNode)return;const a=Math.max(0,Math.min(1,e));this.masterGainNode.gain.setValueAtTime(a,this.audioCtx.currentTime)}getVolume(){return!this.isInitialized||!this.masterGainNode?0:this.masterGainNode.gain.value}isReady(){return this.isInitialized&&this.audioCtx!==null&&this.audioCtx.state==="running"}}class ba{constructor(e){this.type="PhysicsComponent",this.body=null,this.body=e??null}}class xa{constructor(e){this.type="RenderComponent",this.element=null,this.isVisible=!0,this.element=e??null}}class Ca{constructor(e=0,a=0,o=0,i=0){this.type="ValueComponent",this.rarity=0,this.scoreValue=0,this.currentSize=0,this.growthLevel=0,this.rarity=e,this.scoreValue=a,this.currentSize=o,this.growthLevel=i}}class di{constructor(e,a,o,i){this.id=e,this.physics=a,this.render=o,this.value=i}getComponent(e){if(e===this.physics.type&&this.physics instanceof ba)return this.physics;if(e===this.render.type&&this.render instanceof xa)return this.render;if(e===this.value.type&&this.value instanceof Ca)return this.value}}var hi=Object.defineProperty,ui=Object.getOwnPropertyDescriptor,je=(g,e,a,o)=>{for(var i=o>1?void 0:o?ui(e,a):e,t=g.length-1,n;t>=0;t--)(n=g[t])&&(i=(o?n(e,a,i):n(i))||i);return o&&i&&hi(e,a,i),i};let Ee=class extends B{constructor(){super(...arguments),this.size=50,this.imageUrl="",this.backgroundColorFallback="var(--gq-cat-fallback-bg, #ccc)",this.glowClass=""}updated(g){if(super.updated(g),g.has("glowClass")){const e=g.get("glowClass");e&&e!==this.glowClass&&this.classList.remove(e),this.glowClass&&this.classList.add(this.glowClass)}}render(){return this.style.width=`${this.size}px`,this.style.height=`${this.size}px`,this.style.backgroundImage=this.imageUrl?`url('${this.imageUrl}')`:"none",this.style.backgroundColor=this.imageUrl?"transparent":this.backgroundColorFallback,R``}};Ee.styles=V`
    :host {
      display: block; 
      position: absolute; 
      border-radius: 50%;
      background-size: cover;
      background-position: center;
      cursor: grab;
      pointer-events: auto; 
      user-select: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      will-change: transform, width, height, box-shadow, opacity; /* Añadido opacity */
      box-shadow: var(--gq-cat-base-shadow, inset -2px -2px 5px rgba(0,0,0,0.3));
      /* Estilos iniciales para animación de aparición */
      opacity: 0;
      transform: scale(0.5) translate(-100%, -100%); /* Moverlo fuera de la vista inicial y escalado */
      transition: opacity 0.3s ease-out, transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), 
                  box-shadow 0.3s ease-out, width 0.3s ease-out, height 0.3s ease-out;
    }

    /* Estado cuando el gato ha aparecido */
    :host(.spawned) {
      opacity: 1;
      /* El transform de posición y rotación se aplicará directamente en el style por CatManager */
      /* Solo necesitamos resetear la escala de la animación de aparición */
      transform: scale(1); 
    }
    
    /* Clase intermedia para asegurar que la posición se aplique antes de la animación */
    :host(.appearing) {
        opacity: 0;
        /* Mantenemos la escala pequeña, pero la posición ya estará correcta */
        transform: scale(0.5); 
    }


    /* Estilos de Brillo (Glow) */
    :host(.glow-gray) {
      box-shadow: var(--gq-cat-base-shadow, inset -3px -3px 8px rgba(0,0,0,0.4)),
                  var(--gq-cat-outline-shadow, 1px 1px 3px rgba(0,0,0,0.2)),
                  0 0 var(--gq-cat-glow-gray-blur, 10px) var(--gq-cat-glow-gray-spread, 4px) var(--gq-cat-glow-gray-color, rgba(180, 180, 180, 0.7));
    }
    :host(.glow-green) {
      box-shadow: var(--gq-cat-base-shadow, inset -3px -3px 8px rgba(0,0,0,0.4)),
                  var(--gq-cat-outline-shadow, 1px 1px 3px rgba(0,0,0,0.2)),
                  0 0 var(--gq-cat-glow-green-blur, 12px) var(--gq-cat-glow-green-spread, 5px) var(--gq-cat-glow-green-color, rgba(0, 255, 0, 0.7));
    }
    :host(.glow-blue) {
      box-shadow: var(--gq-cat-base-shadow, inset -3px -3px 8px rgba(0,0,0,0.4)),
                  var(--gq-cat-outline-shadow, 1px 1px 3px rgba(0,0,0,0.2)),
                  0 0 var(--gq-cat-glow-blue-blur, 12px) var(--gq-cat-glow-blue-spread, 5px) var(--gq-cat-glow-blue-color, rgba(0, 150, 255, 0.7));
    }
    :host(.glow-violet) {
      box-shadow: var(--gq-cat-base-shadow, inset -3px -3px 8px rgba(0,0,0,0.4)),
                  var(--gq-cat-outline-shadow, 1px 1px 3px rgba(0,0,0,0.2)),
                  0 0 var(--gq-cat-glow-violet-blur, 14px) var(--gq-cat-glow-violet-spread, 6px) var(--gq-cat-glow-violet-color, rgba(180, 0, 255, 0.65));
    }
    :host(.glow-orange) {
      box-shadow: var(--gq-cat-base-shadow, inset -3px -3px 8px rgba(0,0,0,0.4)),
                  var(--gq-cat-outline-shadow, 1px 1px 3px rgba(0,0,0,0.2)),
                  0 0 var(--gq-cat-glow-orange-blur, 15px) var(--gq-cat-glow-orange-spread, 7px) var(--gq-cat-glow-orange-color, rgba(255, 140, 0, 0.7));
    }
  `;je([z({type:Number})],Ee.prototype,"size",2);je([z({type:String,attribute:"image-url"})],Ee.prototype,"imageUrl",2);je([z({type:String,attribute:"background-color-fallback"})],Ee.prototype,"backgroundColorFallback",2);je([z({type:String,attribute:"glow-class"})],Ee.prototype,"glowClass",2);Ee=je([Q("cat-entity-display")],Ee);const pi=1,ia=2,gi=4,fi=8,mi=1.15,na=300,vi=1.02,sa={0:null,1:"glow-gray",2:"glow-green",3:"glow-blue",4:"glow-violet",5:"glow-orange"},yi=10;class bi{constructor(e,a){this.cats=new Map,this.bodyIdToEntityIdMap=new Map,this.nextCatIdCounter=0,this.templates=new Map,this.audioManager=e,this.gameManager=a,console.log("CatManager Creado (esperando CatDisplayArea y PhysicsManager).")}setPhysicsManager(e){this.physicsManager=e,console.log("CatManager: PhysicsManager seteado.")}setCatDisplayArea(e){e instanceof B&&typeof e.clearAllEntityElements=="function"?(this.catDisplayArea=e,console.log("CatManager: CatDisplayArea seteado correctamente y es una instancia válida de CatDisplayArea (LitElement con clearAllEntityElements).",this.catDisplayArea)):(console.error("CatManager CRITICAL: Se intentó setear un CatDisplayArea inválido o nulo.",e),!this.catDisplayArea&&e===null||(e?console.error("CatManager: displayArea NO es una instancia válida de CatDisplayArea o no tiene clearAllEntityElements. Tipo recibido:",typeof e,"Tiene clearAllEntityElements:",typeof e.clearAllEntityElements):console.error("CatManager: displayArea es null/undefined.")))}loadTemplates(e){if(this.templates.clear(),!Array.isArray(e)){console.error("CatManager: Formato inválido de plantillas.");return}e.forEach(a=>{a!=null&&a.id?((typeof a.spawnWeight!="number"||a.spawnWeight<=0)&&(a.spawnWeight=1),this.templates.set(a.id,a)):console.warn("CatManager: Plantilla inválida o sin ID.",a)}),console.log(`CatManager: ${this.templates.size} plantillas cargadas.`)}getSpawnableTemplatesWeighted(){const e=[];return this.templates.forEach(a=>{const o=a.spawnWeight&&a.spawnWeight>0?a.spawnWeight:1;e.push({id:a.id,weight:o})}),e}addCat(e,a){if(!this.gameManager)return console.error("CatManager: GameManager no disponible."),null;if(!this.catDisplayArea)return console.error("CatManager: CatDisplayArea no está seteado o es inválido. No se puede añadir gato."),null;if(typeof this.catDisplayArea.addEntityElement!="function")return console.error("CatManager: this.catDisplayArea no tiene el método addEntityElement. Tipo actual:",typeof this.catDisplayArea,this.catDisplayArea),null;const o=this.cats.size,i=this.gameManager.getPlayerData().getMaxCatsAllowed();if(o>=i)return null;if(!this.physicsManager)return console.error("CatManager: PhysicsManager no está seteado."),null;const t=this.templates.get(e);if(!t)return console.error(`CatManager: Plantilla '${e}' no encontrada.`),null;const n=`cat_entity_${this.nextCatIdCounter++}`,l=t.initialSize,r=t.rarity,u=t.scoreValue??0,c=l/2+5,f=(a==null?void 0:a.x)??Math.random()*(window.innerWidth-l-c*2)+c,p=(a==null?void 0:a.y)??Math.max(c,Math.min(window.innerHeight-c,yi+l/2)),d={...{restitution:.6,friction:.1,frictionAir:.01,density:.005,slop:.01},...t.physicsOptions??{},label:"cat",collisionFilter:{category:ia,mask:pi|ia|gi|fi},plugin:{entityId:n,rarity:r,currentSize:l}},h=L.Bodies.circle(f,p,l/2,d);L.Body.setAngularVelocity(h,(Math.random()-.5)*.2);const m=new ba(h);this.bodyIdToEntityIdMap.set(h.id,n);const y=document.createElement("cat-entity-display");y.id=n,y.size=l,y.classList.add("appearing");const w=t.renderOptions??{},E=w.backgroundColor??"var(--gq-cat-fallback-bg, #ccc)";let A=w.imageUrl;if(!A){const M=Number.isFinite(l)&&l>0?Math.round(l):50;A=`https://cataas.com/cat/says/Miaw!_${n.slice(-2)}?${Date.now()}&width=${M}&height=${M}&type=square`}y.imageUrl=A,y.backgroundColorFallback=E,y.glowClass=w.glowClass??sa[r]??"";const v=new Image;v.onload=()=>{},v.onerror=()=>{console.warn(`CatManager: Falló la carga de la imagen del gato: ${A}. Usando color de fallback.`),y&&(y.imageUrl="")},A&&(v.src=A);try{this.catDisplayArea.addEntityElement(y),y.offsetWidth,requestAnimationFrame(()=>{y.classList.remove("appearing"),y.classList.add("spawned")})}catch(M){return console.error("CatManager: Error añadiendo catDisplayElement a catDisplayArea:",M),this.bodyIdToEntityIdMap.delete(h.id),null}const x=new xa(y),C=new Ca(r,u,l,0),b=new di(n,m,x,C);try{if(!this.physicsManager.getWorld())throw new Error("PhysicsManager world no disponible al añadir gato.");L.World.add(this.physicsManager.getWorld(),h)}catch(M){return console.error(`CatManager: Error añadiendo cuerpo físico ${n} al mundo:`,M),this.catDisplayArea&&typeof this.catDisplayArea.removeEntityElement=="function"&&this.catDisplayArea.removeEntityElement(y),this.bodyIdToEntityIdMap.delete(h.id),null}return this.cats.set(n,b),b}removeCat(e){var i;const a=String(e),o=this.cats.get(a);if(o){const t=o.physics.body;if(t){this.bodyIdToEntityIdMap.delete(t.id);try{(i=this.physicsManager)!=null&&i.getWorld&&L.Composite.get(this.physicsManager.getWorld(),t.id,"body")&&L.World.remove(this.physicsManager.getWorld(),t)}catch(n){console.warn(`Error eliminando cuerpo físico gato ${a}:`,n)}}o.render.element&&(this.catDisplayArea&&typeof this.catDisplayArea.removeEntityElement=="function"?this.catDisplayArea.removeEntityElement(o.render.element):(console.warn("CatManager: catDisplayArea no disponible o sin removeEntityElement al intentar remover gato del DOM."),o.render.element.parentNode&&o.render.element.parentNode.removeChild(o.render.element))),this.cats.delete(a)}}processPlayerInitiatedCollision(e,a,o){const i=this.bodyIdToEntityIdMap.get(e),t=this.bodyIdToEntityIdMap.get(a);if(i&&t){const n=this.cats.get(i),l=this.cats.get(t);if(n&&l){const r=e===o?n:l,u=e===o?l:n;r&&u?this.handleCatVsCatCollision(r,u):console.error("Error: No se pudo determinar dragger/target cat en colisión.")}}}handleCatVsCatCollision(e,a){if(!e.physics.body||!e.value||!a.physics.body||!a.value||!this.gameManager){console.warn("handleCatVsCatCollision: Faltan componentes necesarios en dragger o target.");return}if(e.id===a.id)return;const o=e.value.currentSize,i=e.value.rarity,t=a.value.currentSize,n=a.value.rarity,l=this.gameManager.getPlayerData().getCurrentMaxSizeLimit(),r=o>=l;let u=!1,c=!1,f=!1;o>t*vi&&(r?i<n&&(u=!0,f=!1,c=!0):(u=!0,f=!0,c=i<n)),u&&this.performEat(e,a,c,f)}performEat(e,a,o,i){if(!e.physics.body||!e.value||!(e.render.element instanceof B)||!a.value||!this.gameManager){console.warn("performEat: Faltan componentes o el elemento de render no es CatEntityDisplay.");return}const t=e.render.element,n=a.id,l=a.value.rarity;if(this.removeCat(n),i){const r=e.value.currentSize,u=this.gameManager.getPlayerData().getCurrentMaxSizeLimit();let c=Math.min(u,na,r*mi);const f=c/r;if(f>1.001){e.value.currentSize=c;try{if(this.physicsManager.getWorld&&L.Composite.get(this.physicsManager.getWorld(),e.physics.body.id,"body"))L.Body.scale(e.physics.body,f,f),e.physics.body.plugin&&(e.physics.body.plugin.currentSize=c);else throw new Error("Body not found in world during scaling")}catch(p){console.error(`Error scaling body ${e.id}:`,p),e.value.currentSize=r,e.physics.body.plugin&&(e.physics.body.plugin.currentSize=r)}t.size=c}}o&&l>e.value.rarity&&(e.value.rarity=l,e.physics.body.plugin&&(e.physics.body.plugin.rarity=l),t.glowClass=sa[l]??"");try{this.audioManager.playSound("eat")}catch(r){console.error("Error playing 'eat' sound:",r)}}updateCats(e){this.cats.forEach(a=>{const o=a.physics.body,i=a.render.element,t=a.value;if(!o||!i||!(i instanceof B)||!t)return;const n=i,l=t.currentSize;if(a.render.isVisible){n.style.display==="none"&&(n.style.display="");const r=l/2;n.style.transform=`translate(${o.position.x-r}px, ${o.position.y-r}px) rotate(${o.angle}rad)`,n.size!==l&&(n.size=l)}else n.style.display!=="none"&&(n.style.display="none")})}getCat(e){return this.cats.get(e)}getAllCats(){return Array.from(this.cats.values())}removeAllCats(){var a;console.log(`CatManager: Intentando remover todos los ${this.cats.size} gatos...`),this.catDisplayArea&&typeof this.catDisplayArea.clearAllEntityElements=="function"?this.catDisplayArea.clearAllEntityElements():console.error("CatManager: catDisplayArea no está disponible o no es una instancia válida de CatDisplayArea con clearAllEntityElements al intentar removeAllCats. Tipo actual:",typeof this.catDisplayArea,this.catDisplayArea);const e=(a=this.physicsManager)==null?void 0:a.getWorld();if(e){const o=Array.from(this.cats.values()).map(i=>i.physics.body).filter(i=>i&&L.Composite.get(e,i.id,"body"));if(o.length>0)try{L.World.remove(e,o)}catch(i){console.warn("CatManager: Error removiendo algunos cuerpos de gatos del mundo físico:",i)}}else console.warn("CatManager: PhysicsManager world no disponible durante removeAllCats.");this.cats.clear(),this.bodyIdToEntityIdMap.clear(),this.nextCatIdCounter=0,console.log("CatManager: Lógica interna de gatos y mapeos limpiados.")}growExistingCats(e,a){let o=0;this.cats.forEach(i=>{if(!i.value||!i.physics.body||!(i.render.element instanceof B)||!this.physicsManager||!this.gameManager||i.value.rarity!==0)return;const t=i.render.element;if(i.value.growthLevel<a){const n=i.value.currentSize,l=this.gameManager.getPlayerData().getCurrentMaxSizeLimit();let r=Math.min(l,na,n+e);const u=r/n;if(u>1.0001){i.value.growthLevel++,i.value.currentSize=r;try{const c=i.physics.body;if(this.physicsManager.getWorld&&L.Composite.get(this.physicsManager.getWorld(),c.id,"body"))L.Body.scale(c,u,u),c.plugin&&(c.plugin.currentSize=r),o++;else throw new Error("Body not found in world for growth scaling")}catch(c){console.error(` -> Error escalando gato común ${i.id} (crecimiento por acierto):`,c),i.value.growthLevel--,i.value.currentSize=n,i.physics.body.plugin&&(i.physics.body.plugin.currentSize=n)}t.size=r}}})}}var xi=Object.defineProperty,Ci=Object.getOwnPropertyDescriptor,ke=(g,e,a,o)=>{for(var i=o>1?void 0:o?Ci(e,a):e,t=g.length-1,n;t>=0;t--)(n=g[t])&&(i=(o?n(e,a,i):n(i))||i);return o&&i&&xi(e,a,i),i};let he=class extends B{constructor(){super(),this.itemId="",this.icon="❓",this.isDisabled=!1,this.isPurchased=!1,this.isMaxLevel=!1,this.isSelected=!1,this.addEventListener("click",this._handleClick),this.addEventListener("touchstart",this._handleClick,{passive:!1})}render(){return R`
      <span class="shop-item-icon" part="icon">${this.icon}</span>
    `}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("click",this._handleClick),this.removeEventListener("touchstart",this._handleClick)}_handleClick(g){g.stopPropagation(),g.type==="touchstart"&&g.preventDefault(),this.isDisabled||this.isPurchased||this.isMaxLevel||this.dispatchEvent(new CustomEvent("item-selected",{detail:{itemId:this.itemId},bubbles:!0,composed:!0}))}};he.styles=V`
    :host {
      display: flex; 
      justify-content: center;
      align-items: center;
      aspect-ratio: 1 / 1;
      width: 100%;
      max-width: var(--gq-shop-card-max-width, 6rem); /* Puede ser variable */
      box-sizing: border-box;
      position: relative;
      cursor: pointer;
      border-radius: var(--gq-shop-card-border-radius, 0.75rem);
      background-color: var(--gq-shop-card-bg, rgba(55, 65, 81, 0.7));
      border: var(--gq-shop-card-border, 2px solid #4b5563);
      box-shadow: var(--gq-shop-card-box-shadow, 0 0.125rem 0.25rem rgba(0,0,0,0.3));
      transition: transform 0.2s ease, background-color 0.2s ease,
                  border-color 0.2s ease, box-shadow 0.2s ease,
                  opacity 0.2s ease;
      -webkit-tap-highlight-color: transparent;
      overflow: hidden;
    }

    .shop-item-icon {
      font-size: var(--gq-shop-card-icon-font-size, clamp(1.2rem, 5vmin, 1.8rem));
      line-height: 1;
      user-select: none;
      color: var(--gq-shop-card-icon-color, inherit); /* Permite tematizar color del icono */
    }

    :host(:not([isDisabled]):not([isPurchased]):not([isMaxLevel]):not([isSelected]):hover) {
      background-color: var(--gq-shop-card-hover-bg, rgba(75, 85, 99, 0.8));
      border-color: var(--gq-shop-card-hover-border-color, var(--gq-shop-card-border-color, #60a5fa)); /* Ejemplo de un color de borde en hover */
    }

    :host(:not([isDisabled]):not([isPurchased]):not([isMaxLevel]):not([isSelected]):active) {
      transform: scale(0.95);
      background-color: var(--gq-shop-card-active-bg, rgba(75, 85, 99, 0.9));
    }

    :host([isDisabled]) {
      opacity: var(--gq-shop-card-disabled-opacity, 0.5);
      cursor: default;
      border-color: var(--gq-shop-card-disabled-border-color, #374151);
      background-color: var(--gq-shop-card-disabled-bg, var(--gq-shop-card-bg)); /* Mantener bg o cambiarlo */
    }
    :host([isDisabled]:active), :host([isDisabled]:hover) {
      transform: none;
      background-color: var(--gq-shop-card-disabled-bg, var(--gq-shop-card-bg));
      border-color: var(--gq-shop-card-disabled-border-color, #374151);
      box-shadow: var(--gq-shop-card-box-shadow, 0 0.125rem 0.25rem rgba(0,0,0,0.3));
    }

    :host([isPurchased]) {
      opacity: var(--gq-shop-card-purchased-opacity, 0.7);
      cursor: default;
      border-color: var(--gq-shop-card-purchased-border-color, #f59e0b);
    }
    /* ... (estados :active y :hover para [isPurchased] y [isMaxLevel] de forma similar a [isDisabled]) ... */

    :host([isMaxLevel]) {
      opacity: var(--gq-shop-card-maxlevel-opacity, 0.8);
      cursor: default;
      border-color: var(--gq-shop-card-maxlevel-border-color, #34d399);
    }
    
    :host([isDisabled]:not([isPurchased]):not([isMaxLevel])) {
       border-color: var(--gq-shop-card-disabled-nootherstate-border-color, #374151);
       opacity: var(--gq-shop-card-disabled-nootherstate-opacity, 0.5);
    }

    :host([isSelected]) {
      border-color: var(--gq-shop-card-selected-border-color, #facc15);
      box-shadow: var(--gq-shop-card-selected-box-shadow, 0 0 0.5rem rgba(250, 204, 21, 0.6), 0 0.25rem 0.5rem rgba(0,0,0,0.4));
      transform: scale(1.05);
      background-color: var(--gq-shop-card-selected-bg, var(--gq-shop-card-hover-bg)); /* Un fondo ligeramente diferente para seleccionado */
    }
     :host([isSelected]:active) {
       transform: scale(1.02);
     }

     @media (max-width: 480px) {
        :host {
            border-radius: var(--gq-shop-card-mobile-border-radius, 0.5rem);
        }
        .shop-item-icon {
            font-size: var(--gq-shop-card-mobile-icon-font-size, clamp(1rem, 4.5vmin, 1.5rem));
        }
     }
  `;ke([z({type:String})],he.prototype,"itemId",2);ke([z({type:String})],he.prototype,"icon",2);ke([z({type:Boolean,reflect:!0})],he.prototype,"isDisabled",2);ke([z({type:Boolean,reflect:!0})],he.prototype,"isPurchased",2);ke([z({type:Boolean,reflect:!0})],he.prototype,"isMaxLevel",2);ke([z({type:Boolean,reflect:!0})],he.prototype,"isSelected",2);he=ke([Q("shop-item-card")],he);var wi=Object.defineProperty,Si=Object.getOwnPropertyDescriptor,ne=(g,e,a,o)=>{for(var i=o>1?void 0:o?Si(e,a):e,t=g.length-1,n;t>=0;t--)(n=g[t])&&(i=(o?n(e,a,i):n(i))||i);return o&&i&&wi(e,a,i),i};const Mi="Selecciona un ítem para ver sus detalles.";let X=class extends B{constructor(){super(...arguments),this.itemData=null,this.playerDataSnapshot=null,this._itemName="...",this._itemLevelText="",this._itemEffectText=Mi,this._itemCostText="",this._itemStatusText="",this._isBuyButtonDisabled=!0,this._buyButtonIcon="💰",this._isEmpty=!0}updated(g){super.updated(g);let e=!1;(g.has("itemData")||g.has("playerDataSnapshot"))&&(e=!0),e&&(this._updateInternalState(),this.toggleAttribute("empty",this._isEmpty))}_updateInternalState(){if(this._isEmpty=!this.itemData,this._isEmpty||!this.playerDataSnapshot)this._itemName="",this._itemLevelText="",this._itemEffectText="",this._itemCostText="",this._itemStatusText="",this._isBuyButtonDisabled=!0,this._buyButtonIcon="🐈";else{const g=this.itemData,e=this.playerDataSnapshot,a=this._calculateItemCost(g,e),o=e.score>=a,i=this._checkItemIsPurchased(g,e),t=this._checkItemCanPurchase(g,e),n=this._getItemLevel(g,e),l=g.isLeveled&&typeof g.maxLevel=="number"&&n>=g.maxLevel,r=!l&&!(i&&!g.isLeveled)&&t&&o;this._itemName=g.name,this._itemEffectText=this._formatEffectText(g,e),this._itemLevelText=g.isLeveled&&n>=0?`Nivel: ${n}`:"",this._itemCostText=l?"Nivel Máximo":`Costo: ${a}`;let u="";l?u="Nivel Máximo Alcanzado":i&&!g.isLeveled?u="Ya comprado / Activo":!t&&!l?u="No disponible":o||(u="Puntos insuficientes"),this._itemStatusText=u,this._isBuyButtonDisabled=!r,this._buyButtonIcon=l||i&&!g.isLeveled?"✔️":"💰"}}_calculateItemCost(g,e){const a=g.cost;let o=a.base;if(g.isLeveled){const i=g.levelRef,t=i?e[i]??0:0;a.type==="exponential"&&typeof a.multiplier=="number"?o=a.base*Math.pow(a.multiplier,t):o=a.base+(a.perLevel??0)*t}else if(a.levelRef&&typeof a.perLevel=="number"){const i=e[a.levelRef]??0;o=a.base+a.perLevel*i}return Math.round(o)}_formatEffectText(g,e){var o,i,t;let a=g.effectTemplate;if(a=a.replace("{lives}",e.lives.toString()),a.includes("{isActive}")){const n=(o=g.isPurchasedCheck)==null?void 0:o.valueRef,l=n?!!e[n]:!1;a=a.replace("{isActive}",l?"(Activo)":"")}if(a.includes("{isUnlocked}")){const n=(i=g.isPurchasedCheck)==null?void 0:i.valueRef,l=n?!!e[n]:!1;a=a.replace("{isUnlocked}",l?"(Desbloqueado)":"")}if(a.includes("{charges}")){const n=(t=g.isPurchasedCheck)==null?void 0:t.valueRef,l=n?e[n]??0:0;a=a.replace("{charges}",l>0?`(Cargas: ${l})`:"")}if(a.includes("{currentValue}")){let n="?";g.id==="comboMultiplier"?n=e.getCurrentComboMultiplier().toFixed(1):g.id==="inkCostReduction"?n=e.getCurrentInkCostPerPixel().toFixed(2):g.id==="extraCat"?n=e.getCatsPerCorrectAnswer():g.id==="maxCats"?n=e.getMaxCatsAllowed():g.id==="maxCatSize"?n=e.getCurrentMaxSizeLimit():g.id==="refillCatFood"&&(n=e.currentCatFood),a=a.replace("{currentValue}",n.toString())}return a}_checkItemIsPurchased(g,e){if(!g.isPurchasedCheck)return!1;const a=g.isPurchasedCheck,o=a.valueRef,i=e[o];if(typeof i>"u")return!1;switch(a.condition){case"isTrue":return i===!0;case"isFalse":return i===!1;case"greaterThan":return typeof i=="number"&&typeof a.limit=="number"&&i>a.limit;default:return!1}}_checkItemCanPurchase(g,e){if(!g.purchaseCheck)return!0;const a=g.purchaseCheck,o=a.valueRef,i=e[o];if(typeof i>"u")return!1;switch(a.condition){case"lessThan":return typeof i=="number"&&typeof a.limit=="number"&&i<a.limit;case"lessThanOrEqual":return typeof i=="number"&&typeof a.limit=="number"&&i<=a.limit;case"isFalse":return i===!1;case"isTrue":return i===!0;case"greaterThan":return typeof i=="number"&&typeof a.limit=="number"&&i>a.limit;case"greaterThanOrEqual":return typeof i=="number"&&typeof a.limit=="number"&&i>=a.limit;default:return!1}}_getItemLevel(g,e){return!g.isLeveled||!g.levelRef?-1:e[g.levelRef]??0}_handleBuyClick(g){g.stopPropagation(),g.type==="touchstart"&&g.preventDefault(),!(this._isBuyButtonDisabled||this._isEmpty||!this.itemData)&&this.dispatchEvent(new CustomEvent("buy-item-requested",{detail:{itemId:this.itemData.id},bubbles:!0,composed:!0}))}render(){const g=this._itemLevelText?R`<span class="tooltip-item-level" part="level">${this._itemLevelText}</span>`:U,e=this._itemCostText?R`<span class="tooltip-item-cost" part="cost">${this._itemCostText}</span>`:U,a=this._itemStatusText?R`<span class="tooltip-item-status" part="status">${this._itemStatusText}</span>`:U;return R`
      <div part="content-area">
        <span class="tooltip-item-name" part="name">${this._itemName}</span>
        ${g}
        <span class="tooltip-item-effect" part="effect">${this._itemEffectText}</span>
        ${e}
        ${a}
      </div>
      <button
        class="tooltip-buy-btn"
        part="buy-button"
        ?disabled=${this._isBuyButtonDisabled||this._isEmpty}
        @click=${this._handleBuyClick}
        @touchstart=${this._handleBuyClick}
      >
        ${this._buyButtonIcon}
      </button>
    `}};X.styles=V`
    :host {
      /* --- ESTILOS MODIFICADOS --- */
      display: block; /* Siempre visible estructuralmente */
      position: relative;
      background-color: var(--gq-shop-tooltip-bg, rgba(31, 41, 55, 0.98));
      border: var(--gq-shop-tooltip-border, 1px solid #6b7280);
      border-radius: var(--gq-shop-tooltip-border-radius, 0.85rem);
      color: var(--gq-shop-tooltip-text-color, #d1d5db);
      font-family: var(--gq-shop-tooltip-font-family, var(--gq-font-primary, 'Poppins', sans-serif));
      font-size: var(--gq-shop-tooltip-font-size, 0.75rem);
      text-align: left;
      box-shadow: var(--gq-shop-tooltip-box-shadow, 0 -0.3125rem 0.625rem rgba(0,0,0,0.2));
      box-sizing: border-box;
      padding: var(--gq-shop-tooltip-padding-y, 0.6rem) var(--gq-shop-tooltip-padding-x, 0.8rem);
      /* Asegurar padding derecho para el botón */
      padding-right: calc(var(--gq-shop-tooltip-buy-btn-min-width, 5.5rem) + var(--gq-shop-tooltip-padding-x, 1rem));
      /* Altura mínima para dimensiones consistentes */
      min-height: 5rem; /* Ajusta este valor según necesites */
      /* Quitar transiciones de visibilidad */
      pointer-events: auto; /* Siempre interactivo */
      /* --- FIN ESTILOS MODIFICADOS --- */
    }

    /* --- ESTILOS PARA ESTADO VACÍO --- */
    :host([empty]) .tooltip-item-name {
        color: var(--gq-shop-tooltip-empty-name-color, var(--gq-shop-tooltip-name-text-color, #ababab)); /* Un color más tenue */
        font-style: italic;
    }
    :host([empty]) .tooltip-item-effect {
        color: var(--gq-shop-tooltip-empty-effect-color, var(--gq-shop-tooltip-text-color, #9ca3af)); /* Un color más tenue */
        font-style: italic;
        text-align: center; /* Centrar mensaje vacío */
        margin-top: 0.5rem; /* Espacio extra */
    }
    :host([empty]) .tooltip-item-level,
    :host([empty]) .tooltip-item-cost,
    :host([empty]) .tooltip-item-status {
      display: none; /* Ocultar elementos irrelevantes */
    }
    :host([empty]) .tooltip-buy-btn {
      opacity: 0.3; /* Hacer el botón de compra muy tenue */
      cursor: default;
      pointer-events: none; /* Deshabilitar interacción */
      /* Puedes añadir más estilos si quieres */
    }
    /* --- FIN ESTILOS ESTADO VACÍO --- */

    /* Estilos internos */
    .tooltip-item-name {
      font-size: var(--gq-shop-tooltip-name-font-size, 0.9rem);
      font-weight: var(--gq-shop-tooltip-name-font-weight, 600);
      color: var(--gq-shop-tooltip-name-text-color, #f9fafb);
      margin-bottom: 0.15rem; display: block;
    }
    .tooltip-item-level {
      font-size: var(--gq-shop-tooltip-level-font-size, 0.7rem);
      font-weight: var(--gq-shop-tooltip-level-font-weight, 700);
      color: var(--gq-shop-tooltip-level-text-color, #6ee7b7);
      margin-bottom: 0.15rem; display: block;
    }
    .tooltip-item-level[hidden] { display: none; } /* Mantenido por si acaso */

    .tooltip-item-effect {
      font-size: var(--gq-shop-tooltip-effect-font-size, 0.7rem);
      margin-bottom: 0.3rem; display: block; line-height: 1.3;
    }
    .tooltip-item-cost {
      font-size: var(--gq-shop-tooltip-cost-font-size, 0.8rem);
      font-weight: var(--gq-shop-tooltip-cost-font-weight, 600);
      color: var(--gq-shop-tooltip-cost-text-color, #facc15);
      display: block;
    }
    .tooltip-item-status {
      font-size: var(--gq-shop-tooltip-status-font-size, 0.75rem);
      font-style: italic;
      color: var(--gq-shop-tooltip-status-text-color, #fca5a5);
      margin-top: 0.3rem; display: block;
    }
     .tooltip-item-status[hidden] { display: none; } /* Mantenido por si acaso */

    .tooltip-buy-btn {
      position: absolute; top: 0; right: 0; bottom: 0;
      min-width: var(--gq-shop-tooltip-buy-btn-min-width, 5.5rem);
      width: auto; height: 100%;
      padding: 0 var(--gq-shop-tooltip-buy-btn-padding-x, 1rem);
      margin: 0; transform: none; display: flex;
      justify-content: center; align-items: center;
      background-color: var(--gq-shop-tooltip-buy-btn-bg, #4b5563);
      color: var(--gq-shop-tooltip-buy-btn-icon-color, #facc15);
      border: none;
      border-left: var(--gq-shop-tooltip-buy-btn-border-left, 1px solid rgba(107, 114, 128, 0.7));
      border-radius: 0 var(--gq-shop-tooltip-border-radius, 0.85rem) var(--gq-shop-tooltip-border-radius, 0.85rem) 0;
      box-shadow: var(--gq-shop-tooltip-buy-btn-box-shadow, inset 1px 0 2px rgba(0,0,0,0.2));
      cursor: pointer;
      transition: background-color 0.2s ease, color 0.2s ease, opacity 0.2s ease, box-shadow 0.2s ease;
      font-size: var(--gq-shop-tooltip-buy-btn-icon-size, 3.4rem);
      font-weight: bold; line-height: 1;
      -webkit-tap-highlight-color: transparent;
      z-index: 1; opacity: 1;
      appearance: none; -webkit-appearance: none;
    }

    .tooltip-buy-btn[disabled]:not(:host([empty]) *) { /* Aplicar estilos disabled solo si no está vacío */
      background-color: var(--gq-shop-tooltip-buy-btn-disabled-bg, rgba(55, 65, 81, 0.6));
      color: var(--gq-shop-tooltip-buy-btn-disabled-icon-color, #6b7280);
      cursor: not-allowed; box-shadow: none;
      border-left-color: var(--gq-shop-tooltip-buy-btn-disabled-border-left, rgba(75, 85, 99, 0.5));
    }

    /* Estilos hover y active solo si no está deshabilitado y el host no está vacío */
    .tooltip-buy-btn:not([disabled]):not(:host([empty]) *):hover {
      background-color: var(--gq-shop-tooltip-buy-btn-hover-bg, #5a6677);
      color: var(--gq-shop-tooltip-buy-btn-hover-icon-color, #fff);
      box-shadow: var(--gq-shop-tooltip-buy-btn-hover-box-shadow, inset 1px 0 3px rgba(0,0,0,0.3));
    }
    .tooltip-buy-btn:not([disabled]):not(:host([empty]) *):active {
      background-color: var(--gq-shop-tooltip-buy-btn-active-bg, #6b778a);
      box-shadow: var(--gq-shop-tooltip-buy-btn-active-box-shadow, inset 1px 0 2px rgba(0,0,0,0.3));
    }
  `;ne([z({type:Object})],X.prototype,"itemData",2);ne([z({type:Object})],X.prototype,"playerDataSnapshot",2);ne([N()],X.prototype,"_itemName",2);ne([N()],X.prototype,"_itemLevelText",2);ne([N()],X.prototype,"_itemEffectText",2);ne([N()],X.prototype,"_itemCostText",2);ne([N()],X.prototype,"_itemStatusText",2);ne([N()],X.prototype,"_isBuyButtonDisabled",2);ne([N()],X.prototype,"_buyButtonIcon",2);ne([N()],X.prototype,"_isEmpty",2);X=ne([Q("shop-tooltip")],X);var Ei=Object.defineProperty,Ai=Object.getOwnPropertyDescriptor,ve=(g,e,a,o)=>{for(var i=o>1?void 0:o?Ai(e,a):e,t=g.length-1,n;t>=0;t--)(n=g[t])&&(i=(o?n(e,a,i):n(i))||i);return o&&i&&Ei(e,a,i),i};const Ii=["consumable","unlockable","upgradeable","general"],qi={consumable:"Consumibles",unlockable:"Desbloqueables",upgradeable:"Mejorables",general:"General"};let le=class extends B{constructor(){super(...arguments),this.items=[],this.playerDataSnapshot=null,this.isVisible=!1,this._selectedItemId=null,this._itemsByCategory={},this._selectedItemData=null}connectedCallback(){super.connectedCallback(),this.addEventListener("click",this._handleHostClick)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("click",this._handleHostClick)}updated(g){super.updated(g),g.has("items")&&this._groupItemsByCategory(),g.has("_selectedItemId")&&this._updateTooltipData()}_groupItemsByCategory(){const g={};this.items.forEach(e=>{const a=e.category||"general";g[a]||(g[a]=[]),g[a].push(e)});for(const e in g)g[e].sort((a,o)=>a.name.localeCompare(o.name));this._itemsByCategory=g}_updateTooltipData(){this._selectedItemData=this._selectedItemId?this.items.find(g=>g.id===this._selectedItemId)??null:null}_handleItemSelection(g){var a;const e=(a=g.detail)==null?void 0:a.itemId;this._selectedItemId===e?this._selectedItemId=null:this._selectedItemId=e}_handleBuyRequest(g){var a;const e=(a=g.detail)==null?void 0:a.itemId;e&&this.dispatchEvent(new CustomEvent("buy-item-requested",{detail:{itemId:e},bubbles:!0,composed:!0}))}_handleCloseClick(){this.dispatchEvent(new CustomEvent("close-requested",{bubbles:!0,composed:!0}))}_handleHostClick(g){g.target===this&&this.dispatchEvent(new CustomEvent("close-requested",{bubbles:!0,composed:!0}))}render(){var g;return R`
          <div class="shop-content-box">
            <button class="shop-close-btn" @click=${this._handleCloseClick} title="Cerrar Tienda (Esc)">&times;</button>
            <h2 class="shop-title-text">Tienda de Mejoras</h2>
            <p class="shop-score-text">Puntos: ${((g=this.playerDataSnapshot)==null?void 0:g.score)??0}</p>

            <div class="shop-items-container">
              ${Ii.map(e=>this._itemsByCategory[e]?R`
                <h3 class="shop-section-title">${qi[e]||e}</h3>
                <div class="shop-section-items">
                  ${this._itemsByCategory[e].map(a=>{const o=this._calculateItemCost(a,this.playerDataSnapshot),i=this.playerDataSnapshot.score>=o,t=this._checkItemIsPurchased(a,this.playerDataSnapshot),n=this._checkItemCanPurchase(a,this.playerDataSnapshot),l=this._getItemLevel(a,this.playerDataSnapshot),r=a.isLeveled&&typeof a.maxLevel=="number"&&l>=a.maxLevel,u=r||t&&!a.isLeveled||!n||!i;return R`
                      <shop-item-card
                        .itemId=${a.id}
                        .icon=${a.icon||"❓"}
                        ?isDisabled=${u}
                        ?isPurchased=${t&&!a.isLeveled}
                        ?isMaxLevel=${r}
                        ?isSelected=${this._selectedItemId===a.id}
                        @item-selected=${this._handleItemSelection}
                      ></shop-item-card>
                    `})}
                </div>
              `:U)}
            </div>

            <shop-tooltip
              .itemData=${this._selectedItemData}
              .playerDataSnapshot=${this.playerDataSnapshot}
              @buy-item-requested=${this._handleBuyRequest}
            ></shop-tooltip>
          </div>
        `}_calculateItemCost(g,e){const a=g.cost;let o=a.base;if(g.isLeveled){const i=g.levelRef,t=i?e[i]??0:0;a.type==="exponential"&&typeof a.multiplier=="number"?o=a.base*Math.pow(a.multiplier,t):o=a.base+(a.perLevel??0)*t}else if(a.levelRef&&typeof a.perLevel=="number"){const i=e[a.levelRef]??0;o=a.base+a.perLevel*i}return Math.round(o)}_checkItemIsPurchased(g,e){if(!g.isPurchasedCheck)return!1;const a=g.isPurchasedCheck,o=a.valueRef,i=e[o];if(typeof i>"u")return!1;switch(a.condition){case"isTrue":return i===!0;case"isFalse":return i===!1;case"greaterThan":return typeof i=="number"&&typeof a.limit=="number"&&i>a.limit;default:return!1}}_checkItemCanPurchase(g,e){if(!g.purchaseCheck)return!0;const a=g.purchaseCheck,o=a.valueRef,i=e[o];if(typeof i>"u")return!1;switch(a.condition){case"lessThan":return typeof i=="number"&&typeof a.limit=="number"&&i<a.limit;case"lessThanOrEqual":return typeof i=="number"&&typeof a.limit=="number"&&i<=a.limit;case"isFalse":return i===!1;case"isTrue":return i===!0;case"greaterThan":return typeof i=="number"&&typeof a.limit=="number"&&i>a.limit;case"greaterThanOrEqual":return typeof i=="number"&&typeof a.limit=="number"&&i>=a.limit;default:return!1}}_getItemLevel(g,e){return!g.isLeveled||!g.levelRef?-1:e[g.levelRef]??0}};le.styles=V`
    :host {
      /* El :host es el overlay que ocupa toda la pantalla */
      display: none;
      opacity: 0;
      visibility: hidden;
      position: fixed;
      top: 0; left: 0; width: 100%; height: 100%;
      justify-content: center; /* Centra .shop-content-box horizontalmente */
      align-items: center; /* Centra .shop-content-box verticalmente */
      text-align: center;
      transition: opacity 0.4s ease-in-out, visibility 0s linear 0.4s; /* Ajuste en transition */
      z-index: 101; /* Debe estar por encima del backdrop */
      padding: 1rem; /* Espacio para que el contenido no toque los bordes */
      box-sizing: border-box;
      pointer-events: none; /* Por defecto, no intercepta clics */
      overflow-y: auto; /* Permite scroll si el contenido es muy alto */
      font-family: var(--gq-shop-popup-font-family, var(--gq-font-primary, 'Poppins', sans-serif));
      /* El backdrop se maneja globalmente por GameManager/UIManager */
    }

    :host([visible]) {
      display: flex; /* Cambiado a flex para que align-items y justify-content funcionen */
      opacity: 1;
      visibility: visible;
      pointer-events: auto; /* Cuando está visible, el :host puede interceptar clics */
      transition: opacity 0.4s ease-in-out, visibility 0s linear 0s; /* Ajuste en transition */
    }

    .shop-content-box {
      /* Estilos del contenido de la tienda */
      background-color: var(--gq-shop-popup-bg, rgba(17, 24, 39, 0.97));
      border-radius: var(--gq-shop-popup-border-radius, 1rem);
      border: var(--gq-shop-popup-border, 1px solid #4b5563);
      box-shadow: var(--gq-shop-popup-box-shadow, 0 0.625rem 1.875rem rgba(0, 0, 0, 0.6));
      width: 90%;
      max-width: var(--gq-shop-popup-max-width, 30.125rem);
      position: relative; /* Para el botón de cierre absoluto */
      color: var(--gq-shop-popup-text-color, #e5e7eb);
      max-height: 85vh; /* Limitar altura máxima */
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      overflow: hidden; /* El scroll interno lo maneja .shop-items-container */
      margin: auto; /* Asegura centrado si el host es flex */
      pointer-events: auto; /* Asegurar que el contenido también reciba eventos */
    }
    .shop-close-btn {
      position: absolute;
      top: var(--gq-shop-popup-close-btn-top, 0.25rem);
      right: var(--gq-shop-popup-close-btn-right, 0.5rem);
      background: none; border: none;
      color: var(--gq-shop-popup-close-btn-text-color, #9ca3af);
      font-size: var(--gq-shop-popup-close-btn-font-size, 2rem);
      line-height: 1; cursor: pointer;
      transition: color 0.2s ease, transform 0.1s ease;
      padding: 0.25rem; z-index: 10;
      -webkit-tap-highlight-color: transparent;
    }
    .shop-close-btn:hover {
      color: var(--gq-shop-popup-close-btn-hover-text-color, var(--gq-shop-popup-text-color, #e5e7eb));
      transform: scale(1.1);
    }
    .shop-close-btn:active { transform: scale(0.95); }

    .shop-title-text, .shop-score-text, .shop-section-title {
      text-align: center; flex-shrink: 0;
      padding-left: 1rem; padding-right: 1rem; box-sizing: border-box;
    }
    .shop-title-text {
      font-family: var(--gq-shop-popup-title-font-family, var(--gq-shop-popup-font-family));
      font-size: var(--gq-shop-popup-title-font-size, 1.4rem);
      font-weight: var(--gq-shop-popup-title-font-weight, 700);
      margin-top: 0.8rem;
      margin-bottom: 0.4rem;
      color: var(--gq-shop-popup-title-text-color, var(--gq-shop-popup-text-color, #e5e7eb));
    }
    .shop-score-text {
      font-family: var(--gq-shop-popup-score-font-family, var(--gq-shop-popup-font-family));
      font-size: var(--gq-shop-popup-score-font-size, 0.9rem);
      font-weight: var(--gq-shop-popup-score-font-weight, 600);
      margin-bottom: 0.4rem;
      color: var(--gq-shop-popup-score-text-color, #a5b4fc);
    }
    .shop-items-container {
      overflow-y: auto; flex-grow: 1; display: flex; flex-direction: column;
      gap: 0.4rem; padding: 0 0.5rem 0.5rem 0.5rem; box-sizing: border-box;
      margin-bottom: 0; scrollbar-width: none; -ms-overflow-style: none;
    }
    .shop-items-container::-webkit-scrollbar { display: none; }
    .shop-section-title {
      font-family: var(--gq-shop-popup-section-title-font-family, var(--gq-shop-popup-font-family));
      font-size: var(--gq-shop-popup-section-title-font-size, 1rem);
      font-weight: var(--gq-shop-popup-section-title-font-weight, 600);
      color: var(--gq-shop-popup-section-title-color, #9ca3af);
      text-transform: uppercase;
      letter-spacing: 0.05em; margin-top: 0.5rem; margin-bottom: calc(0.4rem * 1.5);
      padding-bottom: 0.25rem;
      border-bottom: var(--gq-shop-popup-section-title-border-bottom, 1px solid #4b5563);
      padding-left: 0.5rem; padding-right: 0.5rem;
    }
    .shop-section-title:first-of-type { margin-top: 0; }
    .shop-section-items {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(4.5rem, 1fr));
      gap: 0.5rem; align-items: center; justify-items: center; padding: 0 0.3rem;
    }
    shop-tooltip {
      margin: var(--gq-shop-popup-tooltip-margin, 0.5rem);
      flex-shrink: 0;
    }
    @media (max-width: 768px) { /* Ajustado para tablets y móviles */
       :host { padding: 2vh 0.5rem; align-items: center; /* Mantener centrado vertical */ }
       .shop-content-box { max-height: 90vh; }
       .shop-section-items { grid-template-columns: repeat(auto-fill, minmax(4rem, 1fr)); gap: 0.4rem; }
       shop-tooltip { margin: var(--gq-shop-popup-tooltip-tablet-margin, var(--gq-shop-popup-tooltip-margin, 0.4rem)); }
    }
  `;ve([z({type:Array})],le.prototype,"items",2);ve([z({type:Object})],le.prototype,"playerDataSnapshot",2);ve([z({type:Boolean,reflect:!0,attribute:"visible"})],le.prototype,"isVisible",2);ve([N()],le.prototype,"_selectedItemId",2);ve([N()],le.prototype,"_itemsByCategory",2);ve([N()],le.prototype,"_selectedItemData",2);ve([ie(".shop-content-box")],le.prototype,"_shopContentBox",2);le=ve([Q("shop-popup")],le);const Ti="shop-popup";class ki{constructor(e,a){this.items=new Map,this.shopPopupElement=null,this.buyRequestListener=o=>this.handleBuyRequest(o),this.closeRequestListener=()=>this.closeShop(),this.handleBuyRequest=o=>{var n;const t=(n=o.detail)==null?void 0:n.itemId;t?this.executePurchaseAction(t):console.warn("ShopManager: Evento 'buy-item-requested' capturado sin itemId.")},this.playerData=e,this.gameManager=a}init(e){if(this.items.clear(),!Array.isArray(e)){console.error("ShopManager: Datos de ítems de tienda inválidos.");return}e.forEach(a=>{a!=null&&a.id&&typeof a.id=="string"?this.items.set(a.id,a):console.warn("ShopManager: Ítem inválido o sin ID.",a)})}getShopPopupElement(){return(!this.shopPopupElement||!document.body.contains(this.shopPopupElement))&&(this.shopPopupElement=document.getElementById(Ti),this.shopPopupElement?(this.shopPopupElement.removeEventListener("close-requested",this.closeRequestListener),this.shopPopupElement.removeEventListener("buy-item-requested",this.buyRequestListener),this.shopPopupElement.addEventListener("close-requested",this.closeRequestListener),this.shopPopupElement.addEventListener("buy-item-requested",this.buyRequestListener)):console.error("ShopManager CRITICAL: Componente <shop-popup> con ID 'shop-popup' NO encontrado en el DOM.")),this.shopPopupElement}isShopOpen(){const e=this.getShopPopupElement();return(e==null?void 0:e.isVisible)||!1}openShop(){const e=this.getShopPopupElement();if(!e){console.error("ShopManager: No se pudo abrir la tienda, el elemento popup no existe.");return}try{e.items=Array.from(this.items.values()),e.playerDataSnapshot=this.playerData,e.isVisible=!0;const a=document.getElementById("blur-backdrop");a?a.visible=!0:console.warn("ShopManager: Componente <blur-backdrop-component> no encontrado al abrir la tienda.")}catch(a){console.error("[ShopManager] Error estableciendo props o visibilidad en <shop-popup>:",a),e&&(e.isVisible=!1);const o=document.getElementById("blur-backdrop");o&&(o.visible=!1)}}closeShop(){var i;const e=this.getShopPopupElement();if(!e||!e.isVisible)return;e.isVisible=!1;const a=document.getElementById("blur-backdrop"),o=((i=this.gameManager.getUIManager())==null?void 0:i.isExplanationVisible())??!1;a&&!o&&(a.visible=!1)}updateShopUI(){if(!this.playerData)return;const e=this.getShopPopupElement();e&&e.isVisible&&(e.playerDataSnapshot=this.playerData)}executePurchaseAction(e){const a=this.items.get(e);if(!a)return console.error(`ShopManager: Ítem con ID '${e}' no encontrado.`),!1;const o=this._calculateItemCost(a,this.playerData),i=this.playerData.score>=o,t=this._checkItemCanPurchase(a,this.playerData),n=this._getItemLevel(a,this.playerData),l=a.isLeveled&&typeof a.maxLevel=="number"&&n>=a.maxLevel,r=this._checkItemIsPurchased(a,this.playerData)&&!a.isLeveled;if(l||r||!t||!i)return this.updateShopUI(),this.gameManager.getAudioManager().playSound("incorrect"),!1;this.playerData.score-=o,this.gameManager.updateExternalScoreUI();let u=!1;const c=a.actionId;try{switch(c){case"purchaseLife":u=this.purchaseLifeAction();break;case"purchaseShield":u=this.purchaseShieldAction();break;case"purchaseHint":u=this.purchaseHintAction();break;case"purchaseUnlockDrawing":u=this.purchaseUnlockDrawingAction();break;case"purchaseUnlockCatFood":u=this.purchaseUnlockCatFoodAction();break;case"purchaseRefillCatFood":u=this.purchaseRefillCatFoodAction();break;case"purchaseComboMultiplier":u=this.purchaseComboMultiplierAction();break;case"purchaseInkCostReduction":u=this.purchaseInkCostReductionAction();break;case"purchaseExtraCatSpawn":u=this.purchaseExtraCatSpawnAction();break;case"purchaseMaxCatsIncrease":u=this.purchaseMaxCatsIncreaseAction();break;case"purchaseMaxCatSize":u=this.purchaseMaxCatSizeAction();break;default:console.error(`ShopManager: Acción desconocida: ${c}`),u=!1}}catch(f){console.error(`ShopManager: Error ejecutando acción ${c}:`,f),u=!1}return u?this.gameManager.getAudioManager().playSound("purchase"):(this.playerData.score+=o,this.gameManager.updateExternalScoreUI(),console.warn(`ShopManager: Acción ${c} falló o no aplicó. Costo revertido.`),this.gameManager.getAudioManager().playSound("incorrect")),this.updateShopUI(),u}purchaseLifeAction(){return this.playerData.lives++,this.gameManager.updateExternalLivesUI(),!0}purchaseShieldAction(){return this.playerData.hasShield?!1:(this.playerData.hasShield=!0,this.gameManager.updateExternalShieldUI(!0),!0)}purchaseHintAction(){return this.playerData.hintCharges++,this.gameManager.updateExternalHintUI(this.playerData.hintCharges),!0}purchaseUnlockDrawingAction(){if(this.playerData.isDrawingUnlocked)return!1;this.playerData.isDrawingUnlocked=!0;let e=!1;try{e=this.gameManager.enableDrawingFeature()}catch{e=!1}return e?!0:(this.playerData.isDrawingUnlocked=!1,!1)}purchaseComboMultiplierAction(){return this.playerData.comboMultiplierLevel++,!0}purchaseInkCostReductionAction(){return this.playerData.inkCostReductionLevel++,this.gameManager.updateInkUI(),!0}purchaseExtraCatSpawnAction(){return this.playerData.extraCatSpawnLevel++,!0}purchaseMaxCatsIncreaseAction(){return this.playerData.maxCatsLevel++,!0}purchaseMaxCatSizeAction(){return this.playerData.maxCatSizeLevel++,!0}purchaseUnlockCatFoodAction(){return this.playerData.isCatFoodUnlocked?!1:(this.playerData.isCatFoodUnlocked=!0,this.playerData.refillCatFood(),this.gameManager.enableCatFoodFeature(),!0)}purchaseRefillCatFoodAction(){return this.playerData.currentCatFood>=this.playerData.getMaxCatFood()?!1:(this.playerData.refillCatFood(),this.gameManager.updateCatFoodUI(),!0)}_calculateItemCost(e,a){const o=e.cost;let i=o.base;if(e.isLeveled){const t=e.levelRef,n=t?a[t]??0:0;o.type==="exponential"&&typeof o.multiplier=="number"?i=o.base*Math.pow(o.multiplier,n):i=o.base+(o.perLevel??0)*n}else if(o.levelRef&&typeof o.perLevel=="number"){const t=a[o.levelRef]??0;i=o.base+o.perLevel*t}return Math.round(i)}_checkItemIsPurchased(e,a){if(!e.isPurchasedCheck)return!1;const o=e.isPurchasedCheck,i=o.valueRef,t=a[i];if(typeof t>"u")return!1;switch(o.condition){case"isTrue":return t===!0;case"isFalse":return t===!1;case"greaterThan":return typeof t=="number"&&typeof o.limit=="number"&&t>o.limit;default:return!1}}_checkItemCanPurchase(e,a){if(!e.purchaseCheck)return!0;const o=e.purchaseCheck,i=o.valueRef,t=a[i];if(typeof t>"u")return!1;switch(o.condition){case"lessThan":return typeof t=="number"&&typeof o.limit=="number"&&t<o.limit;case"lessThanOrEqual":return typeof t=="number"&&typeof o.limit=="number"&&t<=o.limit;case"isFalse":return t===!1;case"isTrue":return t===!0;case"greaterThan":return typeof t=="number"&&typeof o.limit=="number"&&t>o.limit;case"greaterThanOrEqual":return typeof t=="number"&&typeof o.limit=="number"&&t>=o.limit;default:return!1}}_getItemLevel(e,a){return!e.isLeveled||!e.levelRef?-1:a[e.levelRef]??0}destroy(){const e=this.getShopPopupElement();e&&(e.removeEventListener("close-requested",this.closeRequestListener),e.removeEventListener("buy-item-requested",this.buyRequestListener)),this.items.clear(),this.shopPopupElement=null,console.log("ShopManager destruido.")}}class Pi{constructor(){this.score=0,this.lives=3,this.isDrawingUnlocked=!1,this.isCatFoodUnlocked=!1,this.hasShield=!1,this.hintCharges=0,this.currentInk=0,this.INK_BAR_CAPACITY=1e3,this.inkSpentSinceLastClear=0,this.currentCatFood=0,this.MAX_CAT_FOOD=25,this.comboMultiplierLevel=0,this.inkCostReductionLevel=0,this.extraCatSpawnLevel=0,this.maxCatsLevel=0,this.maxCatSizeLevel=0,this.BASE_MAX_CAT_SIZE_LIMIT=150,this.MAX_CAT_SIZE_INCREMENT_PER_LEVEL=25,console.log("PlayerData Instanciado.")}getCurrentComboMultiplier(){return 1+this.comboMultiplierLevel*.15}getCurrentInkCostPerPixel(){return .4*Math.pow(.9,this.inkCostReductionLevel)}getCatsPerCorrectAnswer(){return 1+this.extraCatSpawnLevel*1}getMaxCatsAllowed(){return 50+this.maxCatsLevel*25}getCurrentMaxSizeLimit(){return this.BASE_MAX_CAT_SIZE_LIMIT+this.maxCatSizeLevel*this.MAX_CAT_SIZE_INCREMENT_PER_LEVEL}spendInk(e){return this.currentInk>=e?(this.currentInk-=e,this.inkSpentSinceLastClear+=e,!0):!1}gainInk(e){this.currentInk+=e}recoverSpentInk(){console.log(`[PlayerData] Recovering ${this.inkSpentSinceLastClear.toFixed(0)} ink.`),this.gainInk(this.inkSpentSinceLastClear),this.inkSpentSinceLastClear=0}getMaxCatFood(){return this.MAX_CAT_FOOD}spendCatFoodUnit(){return this.isCatFoodUnlocked&&this.currentCatFood>0?(this.currentCatFood--,!0):!1}refillCatFood(){this.isCatFoodUnlocked&&(this.currentCatFood=this.getMaxCatFood())}reset(){console.log("PlayerData: Reseteando datos..."),this.score=0,this.lives=3,this.isDrawingUnlocked=!1,this.isCatFoodUnlocked=!1,this.hasShield=!1,this.hintCharges=0,this.currentInk=0,this.inkSpentSinceLastClear=0,this.currentCatFood=0,this.comboMultiplierLevel=0,this.inkCostReductionLevel=0,this.extraCatSpawnLevel=0,this.maxCatsLevel=0,this.maxCatSizeLevel=0}}var Li=Object.defineProperty,Di=Object.getOwnPropertyDescriptor,gt=(g,e,a,o)=>{for(var i=o>1?void 0:o?Di(e,a):e,t=g.length-1,n;t>=0;t--)(n=g[t])&&(i=(o?n(e,a,i):n(i))||i);return o&&i&&Li(e,a,i),i};let _e=class extends B{constructor(){super(...arguments),this._canvasContext=null,this.isActive=!1,this.isPointerLockdown=!1}firstUpdated(){this._canvasElement&&(this._canvasContext=this._canvasElement.getContext("2d"),this._canvasContext||console.error("DrawingCanvasLayer: No se pudo obtener el contexto 2D."),this.dispatchEvent(new CustomEvent("canvas-ready",{bubbles:!0,composed:!0}))),this.resizeCanvas()}getCanvasElement(){return this._canvasElement??null}getContext(){return this._canvasContext??null}resizeCanvas(){this._canvasElement&&(this._canvasElement.width=window.innerWidth,this._canvasElement.height=window.innerHeight,this.dispatchEvent(new CustomEvent("canvas-resized",{bubbles:!0,composed:!0})))}render(){return R`<canvas></canvas>`}};_e.styles=V`
        :host {
          display: block;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none; /* Por defecto, no interactivo */
          z-index: var(--gq-drawing-canvas-z-default, 15); 
          background-color: transparent;
        }
    
        /* Cuando el pincel está activo Y no hay un bloqueo de puntero */
        :host([isActive]:not([isPointerLockdown])) {
          pointer-events: auto;
          cursor: var(--gq-drawing-canvas-cursor-active, crosshair);
          z-index: var(--gq-drawing-canvas-z-active, 25); 
        }
    
        /* Cuando hay un bloqueo de puntero (ej. arrastrando un gato), siempre no interactivo */
        :host([isPointerLockdown]) {
          pointer-events: none !important; 
          cursor: default; 
        }
    
        canvas {
          width: 100%;
          height: 100%;
          display: block; 
        }
      `;gt([ie("canvas")],_e.prototype,"_canvasElement",2);gt([z({type:Boolean,reflect:!0})],_e.prototype,"isActive",2);gt([z({type:Boolean,reflect:!0})],_e.prototype,"isPointerLockdown",2);_e=gt([Q("drawing-canvas-layer")],_e);const oa=25,ra=8,_i="#E5E7EB",zi=150,$i=4,Oi=2,Ri=Oi;class Bi{constructor(e){this.drawingCanvasLayer=null,this.actualCanvasElement=null,this.drawingCtx=null,this.isBrushActive=!1,this.isDrawing=!1,this.currentPath=[],this.lastPoint=null,this.drawnPaths=[],this.isInitialized=!1,this.generalListeners=[],this.lastToggleTime=0,this.BRUSH_TOGGLE_DEBOUNCE=200,this.gameManager=e;try{this.playerData=e.getPlayerData()}catch(a){console.error("InkManager: Error en constructor al obtener PlayerData.",a)}}setPhysicsManager(e){this.physicsManager=e}init(){if(this.isInitialized){this.updateInkUI();return}try{if(!this.physicsManager&&(this.physicsManager=this.gameManager.getPhysicsManager(),!this.physicsManager))throw new Error("PhysicsManager no disponible.");if(!this.playerData&&(this.playerData=this.gameManager.getPlayerData(),!this.playerData))throw new Error("PlayerData no disponible.");if(this.drawingCanvasLayer=document.getElementById("drawing-canvas-layer-main"),!this.drawingCanvasLayer)throw new Error("<drawing-canvas-layer id='drawing-canvas-layer-main'> no encontrado en el DOM.");if(this.actualCanvasElement=this.drawingCanvasLayer.getCanvasElement(),this.drawingCtx=this.drawingCanvasLayer.getContext(),!this.actualCanvasElement||!this.drawingCtx)throw new Error("No se pudo obtener el canvas o el contexto 2D desde drawing-canvas-layer.");this.setupDrawingCanvas(),this.initDrawingListeners(),this.isInitialized=!0,this.updateInkUI()}catch(e){console.error("InkManager: Error CRÍTICO en inicialización:",e),this.isInitialized=!1}}initDrawingListeners(){if(this.removeDrawingListeners(),this.actualCanvasElement){const e=this.startDrawing.bind(this),a=this.draw.bind(this),o=this.stopDrawing.bind(this);this.addListener(this.actualCanvasElement,"mousedown",e),this.addListener(this.actualCanvasElement,"mousemove",a),this.addListener(this.actualCanvasElement,"mouseup",o),this.addListener(this.actualCanvasElement,"mouseleave",o),this.addListener(this.actualCanvasElement,"touchstart",e,{passive:!1}),this.addListener(this.actualCanvasElement,"touchmove",a,{passive:!1}),this.addListener(this.actualCanvasElement,"touchend",o),this.addListener(this.actualCanvasElement,"touchcancel",o)}this.addListener(window,"resize",this.handleResize.bind(this))}addListener(e,a,o,i){e.addEventListener(a,o,i),this.generalListeners.push({element:e,type:a,handler:o,options:i})}removeDrawingListeners(){this.generalListeners.forEach(({element:e,type:a,handler:o,options:i})=>{try{e.removeEventListener(a,o,i)}catch{}}),this.generalListeners=[]}setupDrawingCanvas(){this.drawingCtx&&this.drawingCanvasLayer&&(this.drawingCanvasLayer.resizeCanvas(),this.applyContextStyles(),this.clearCanvas(),this.redrawPaths())}applyContextStyles(){this.drawingCtx&&(this.drawingCtx.strokeStyle=_i,this.drawingCtx.lineWidth=ra,this.drawingCtx.lineCap="round",this.drawingCtx.lineJoin="round")}handleResize(){this.drawingCanvasLayer&&(this.drawingCanvasLayer.resizeCanvas(),this.drawingCtx=this.drawingCanvasLayer.getContext(),this.drawingCtx&&(this.applyContextStyles(),this.redrawPaths()))}clearCanvas(){this.drawingCtx&&this.actualCanvasElement&&this.drawingCtx.clearRect(0,0,this.actualCanvasElement.width,this.actualCanvasElement.height)}redrawPaths(){this.clearCanvas(),this.drawingCtx&&this.drawnPaths.forEach(e=>{this.drawPathPoints(e.points)})}drawPathPoints(e){if(!(!this.drawingCtx||e.length<2)){this.drawingCtx.beginPath(),this.drawingCtx.moveTo(e[0].x,e[0].y);for(let a=1;a<e.length;a++)this.drawingCtx.lineTo(e[a].x,e[a].y);this.drawingCtx.stroke()}}updateInkUI(){if(!this.isInitialized||!this.playerData)return;const e=this.playerData.isDrawingUnlocked;this.gameManager.getUIManager().updateInkVisibility(e),this.gameManager.getUIManager().updateInkBar(),e&&this.playerData.currentInk<=0&&this.isBrushActive?this.toggleBrush(!1):this.gameManager.updateToolButtonStates()}toggleBrush(e){if(!this.isInitialized)return;const a=Date.now();if(e===void 0&&a-this.lastToggleTime<this.BRUSH_TOGGLE_DEBOUNCE)return;this.lastToggleTime=a;const o=e!==void 0?e:!this.isBrushActive;if(o===!0&&(!this.playerData.isDrawingUnlocked||this.playerData.currentInk<=0)){this.isBrushActive&&(this.isBrushActive=!1,this.gameManager.setQuizUiFaded(!1),this.updateCanvasActiveState(),this.gameManager.updateToolButtonStates());return}o!==this.isBrushActive&&(this.isBrushActive=o,!this.isBrushActive&&this.isDrawing&&this.stopDrawing(null),this.gameManager.setQuizUiFaded(this.isBrushActive),this.updateCanvasActiveState(),this.gameManager.updateToolButtonStates())}updateCanvasActiveState(){this.drawingCanvasLayer&&(this.drawingCanvasLayer.isActive=this.isBrushActive)}clearInkLines(){var a;if(!this.isInitialized||!this.playerData.isDrawingUnlocked||this.playerData.inkSpentSinceLastClear<=0)return;const e=this.drawnPaths.flatMap(o=>o.bodies);if((a=this.physicsManager)!=null&&a.getWorld&&e.length>0)try{const o=this.physicsManager.getWorld(),i=e.filter(t=>L.Composite.get(o,t.id,"body"));i.length>0&&L.World.remove(o,i)}catch(o){console.error("InkManager: Error removiendo cuerpos de tinta:",o)}this.drawnPaths=[],this.clearCanvas(),this.playerData.recoverSpentInk(),this.updateInkUI(),this.gameManager.getAudioManager().playSound("clear_ink")}gainInkOnCorrectAnswer(){!this.isInitialized||!this.playerData.isDrawingUnlocked||(this.playerData.gainInk(zi),this.updateInkUI())}destroy(){this.removeDrawingListeners(),this.isInitialized=!1,this.isBrushActive=!1,this.isDrawing=!1,this.currentPath=[],this.drawnPaths=[],this.clearCanvas(),this.drawingCanvasLayer&&(this.drawingCanvasLayer.isActive=!1,this.drawingCanvasLayer.isPointerLockdown=!1),this.drawingCtx=null,this.actualCanvasElement=null,this.drawingCanvasLayer=null}startDrawing(e){if(!this.isInitialized||!this.isBrushActive||!this.drawingCtx||!this.actualCanvasElement||this.playerData.currentInk<=0)return;e.preventDefault(),this.isDrawing=!0;const a=this.getMousePos(e);this.currentPath=[a],this.lastPoint=a,this.drawingCtx.beginPath(),this.drawingCtx.moveTo(a.x,a.y),this.gameManager.getAudioManager().playSound("draw_start")}draw(e){if(!this.isDrawing||!this.isBrushActive||!this.drawingCtx)return;e.preventDefault();const a=this.getMousePos(e),o=this.lastPoint?this.distanceSq(this.lastPoint,a):oa;if(o>=oa){const t=Math.sqrt(o)*this.playerData.getCurrentInkCostPerPixel();this.playerData.spendInk(t)?(this.currentPath.push(a),this.drawingCtx.lineTo(a.x,a.y),this.drawingCtx.stroke(),this.drawingCtx.beginPath(),this.drawingCtx.moveTo(a.x,a.y),this.lastPoint=a,this.updateInkUI()):(this.stopDrawing(e),this.playerData.currentInk<=0&&this.toggleBrush(!1))}}stopDrawing(e){var a;if(this.isDrawing){if(e==null||e.preventDefault(),this.isDrawing=!1,this.gameManager.getAudioManager().playSound("draw_end"),this.currentPath.length>1){const o=this.createInkBodySegments(this.currentPath);if(o.length>0&&((a=this.physicsManager)!=null&&a.getWorld))try{L.World.add(this.physicsManager.getWorld(),o),this.drawnPaths.push({points:[...this.currentPath],bodies:o})}catch(i){console.error("InkManager: Error añadiendo cuerpos:",i)}else this.physicsManager||console.error("InkManager: PhysicsManager no disponible.")}this.currentPath=[],this.lastPoint=null}}getMousePos(e){if(!this.actualCanvasElement)return{x:0,y:0};const a=this.actualCanvasElement.getBoundingClientRect();let o=0,i=0;return e instanceof MouseEvent?(o=e.clientX,i=e.clientY):e.touches&&e.touches.length>0?(o=e.touches[0].clientX,i=e.touches[0].clientY):e.changedTouches&&e.changedTouches.length>0&&(o=e.changedTouches[0].clientX,i=e.changedTouches[0].clientY),{x:o-a.left,y:i-a.top}}distanceSq(e,a){const o=e.x-a.x,i=e.y-a.y;return o*o+i*i}createInkBodySegments(e){const a=[];if(e.length<2||!this.physicsManager)return a;for(let o=1;o<e.length;o++){const i=e[o-1],t=e[o],n=t.x-i.x,l=t.y-i.y,r=n*n+l*l;if(r<1)continue;const u=Math.sqrt(r),c=Math.atan2(l,n),f=i.x+n/2,p=i.y+l/2;try{const s=L.Bodies.rectangle(f,p,u,ra,{isStatic:!0,angle:c,label:"inkLine",friction:.5,restitution:.1,collisionFilter:{category:$i,mask:Ri},render:{visible:!1}});s&&a.push(s)}catch(s){console.error("InkManager: Error creando cuerpo:",s)}}return a}}const Fi=1,Ni=4;class xe{constructor(e){this.currentQuestion=null,this.nextQuestionTimeoutId=null,this.consecutiveCorrectAnswers=0,this.hintAppliedToQuestionId=null,this.isWaitingForExplanationConfirm=!1,this.lastAnswerResultType=null,this.isExitingOrChangingState=!1,this.BASE_POINTS_PER_CORRECT=15,this.DIFFICULTY_BONUS={easy:10,1:10,2:20,medium:30,3:30,hard:45,4:45,5:65},this.gameManager=e;try{this.uiManager=e.getUIManager(),this.quizSystem=e.getQuizSystem()}catch(a){throw console.error("QuizGameplayState: Error crítico obteniendo UIManager o QuizSystem.",a),a}}selectRandomCatTemplateId(){var n,l;const a=this.gameManager.getCatManager().getSpawnableTemplatesWeighted();if(a.length===0)return"common_cat";const o=a.reduce((r,u)=>r+u.weight,0);if(o<=0)return((n=a[0])==null?void 0:n.id)??"common_cat";const i=Math.random()*o;let t=0;for(const r of a)if(t+=r.weight,i<t)return r.id;return((l=a[a.length-1])==null?void 0:l.id)??"common_cat"}enter(e){console.log("[QuizGameplayState] enter() INICIADO.",e),this.isExitingOrChangingState=!1,this.gameManager.setBodyStateClass("quizgameplay"),this.gameManager.getPlayerData().reset(),console.log("[QuizGameplayState] PlayerData reseteado."),this.consecutiveCorrectAnswers=0,this.hintAppliedToQuestionId=null,this.isWaitingForExplanationConfirm=!1,this.lastAnswerResultType=null,this.nextQuestionTimeoutId&&(clearTimeout(this.nextQuestionTimeoutId),this.nextQuestionTimeoutId=null,console.warn("[QuizGameplayState] Timeout pendiente cancelado en enter().")),this.displayNextQuestion(),console.log("[QuizGameplayState] enter() FINALIZADO.")}exit(){console.log("[QuizGameplayState] exit() INICIADO."),this.isExitingOrChangingState=!0;const e=this.gameManager.getContainerElement();this.uiManager.clearQuizInterface(e),this.nextQuestionTimeoutId&&(clearTimeout(this.nextQuestionTimeoutId),this.nextQuestionTimeoutId=null,console.log("[QuizGameplayState] Timeout para siguiente pregunta cancelado en exit().")),this.uiManager.updateComboVisuals(0),document.body.style.backgroundColor="";const a=document.documentElement;a.style.removeProperty("--element-glow-intensity"),a.style.removeProperty("--flare-intensity"),a.style.removeProperty("--difficulty-glow-color"),a.style.removeProperty("--difficulty-glow-blur"),this.isWaitingForExplanationConfirm=!1,this.hintAppliedToQuestionId=null,this.currentQuestion=null,this.lastAnswerResultType=null,console.log("[QuizGameplayState] exit() FINALIZADO.")}update(e){}calculateScore(e,a){const o=a+1,i=this.BASE_POINTS_PER_CORRECT*o,t=this.DIFFICULTY_BONUS[e]??this.DIFFICULTY_BONUS[1]??0,n=this.gameManager.getPlayerData().getCurrentComboMultiplier(),l=Math.max(0,(i+t)*(n-1));return{totalPoints:Math.round(i+t+l),basePoints:i,difficultyBonus:t,comboBonus:Math.round(l)}}handleCorrectAnswer(e){if(console.log("[QuizGameplayState] handleCorrectAnswer() INICIADO."),this.isExitingOrChangingState){console.log("[QuizGameplayState] handleCorrectAnswer() abortado: isExitingOrChangingState es true.");return}this.lastAnswerResultType="correct";const a=this.calculateScore(e,this.consecutiveCorrectAnswers);this.consecutiveCorrectAnswers++,this.gameManager.getPlayerData().score+=a.totalPoints,this.gameManager.getInkManager().gainInkOnCorrectAnswer(),this.uiManager.updateScoreDisplay(this.gameManager.getPlayerData().score),this.uiManager.updateComboVisuals(this.consecutiveCorrectAnswers),this.uiManager.updateInkBar();let o=`¡+${a.totalPoints} Pts!`,i=`(Base: ${a.basePoints}, Dif: +${a.difficultyBonus}`;const t=this.gameManager.getPlayerData().getCurrentComboMultiplier();a.comboBonus>0&&(i+=`, Combo x${t.toFixed(1)}: +${a.comboBonus}`),i+=")",o+=` ${i}`,this.uiManager.updateFeedback(o,"correct");try{this.gameManager.getAudioManager().playSound("correct")}catch(r){console.error("Error sonido 'correct':",r)}try{this.gameManager.getCatManager().growExistingCats(Fi,Ni)}catch(r){console.error("Error llamando a catManager.growExistingCats:",r)}const n=this.gameManager.getPlayerData().getCatsPerCorrectAnswer(),l=this.selectRandomCatTemplateId();if(l)for(let r=0;r<n;r++)try{this.gameManager.getCatManager().addCat(l)}catch(u){console.error(`Error al llamar a catManager.addCat (iteración ${r+1}/${n}):`,u)}console.log("[QuizGameplayState] handleCorrectAnswer() llamando a proceedToNextStep()."),this.proceedToNextStep()}handleIncorrectAnswer(){if(console.log("[QuizGameplayState] handleIncorrectAnswer() INICIADO."),this.isExitingOrChangingState){console.log("[QuizGameplayState] handleIncorrectAnswer() abortado: isExitingOrChangingState es true.");return}this.lastAnswerResultType="incorrect";const e=this.gameManager.getPlayerData();let a=!1;e.hasShield?(e.hasShield=!1,this.uiManager.updateFeedback("¡Escudo Roto!","shield"),this.uiManager.updateShieldIcon(!1),this.gameManager.getAudioManager().playSound("shield_break"),this.lastAnswerResultType="shield",console.log("[QuizGameplayState] Escudo usado.")):(this.consecutiveCorrectAnswers=0,this.gameManager.decrementLives(),this.uiManager.updateComboVisuals(this.consecutiveCorrectAnswers),this.gameManager.getAudioManager().playSound("incorrect"),e.hintCharges>0&&(console.log("[QuizGameplayState] Respuesta incorrecta (sin escudo), reseteando cargas de pista."),e.hintCharges=0,this.uiManager.updateHintIcon(0)),this.gameManager.getLives()<=0&&(a=!0,console.log("[QuizGameplayState] VIDAS AGOTADAS - GAME OVER."))),this.hintAppliedToQuestionId=null,a?(this.isExitingOrChangingState=!0,console.log("[QuizGameplayState] Procesando Game Over..."),this.uiManager.updateFeedback("¡Has perdido!","incorrect"),this.nextQuestionTimeoutId&&(clearTimeout(this.nextQuestionTimeoutId),this.nextQuestionTimeoutId=null,console.log("[QuizGameplayState] Timeout para siguiente pregunta cancelado por Game Over.")),setTimeout(()=>{console.log("[QuizGameplayState] Timeout de Game Over: Verificando estado antes de cambiar..."),this.gameManager.getStateMachine().getCurrentStateName()==="QuizGameplay"?(console.log("[QuizGameplayState] Timeout de Game Over: Cambiando a estado GameOverState."),this.gameManager.getStateMachine().changeState("GameOver",{score:e.score},"gq-wipe-transition")):console.log("[QuizGameplayState] Timeout de Game Over: Estado ya cambió, no se transiciona a GameOverState.")},1500)):(console.log("[QuizGameplayState] handleIncorrectAnswer() (no game over) llamando a proceedToNextStep()."),this.proceedToNextStep())}proceedToNextStep(){var i,t;const e=((i=this.currentQuestion)==null?void 0:i.id)||"N/A";if(console.log(`[QuizGameplayState] proceedToNextStep() INICIADO para pregunta ${e}. isExiting: ${this.isExitingOrChangingState}, isWaitingExpl: ${this.isWaitingForExplanationConfirm}`),this.isExitingOrChangingState){console.log(`[QuizGameplayState] proceedToNextStep() abortado (pregunta ${e}): isExitingOrChangingState es true.`);return}if(this.isWaitingForExplanationConfirm){console.log(`[QuizGameplayState] proceedToNextStep() (pregunta ${e}): Ya esperando confirmación de explicación. NO SE HACE NADA MÁS.`);return}const a=(t=this.currentQuestion)==null?void 0:t.explanation,o=()=>{console.log(`[QuizGameplayState] scheduleNext() INTERNO llamado (después de pregunta ${e}). Programando siguiente pregunta.`),this.lastAnswerResultType=null;const n=a?500:1500;this.scheduleNextQuestion(n)};if(a){console.log(`[QuizGameplayState] Pregunta ${e}: Mostrando explicación. SET isWaitingForExplanationConfirm = true.`),this.isWaitingForExplanationConfirm=!0;const n=()=>{if(console.log(`[QuizGameplayState] ** explanationCallback EJECUTADO ** (pregunta ${e}). SET isWaitingForExplanationConfirm = false.`),this.isExitingOrChangingState){console.log(`[QuizGameplayState] explanationCallback abortado (pregunta ${e}): isExitingOrChangingState es true.`),this.isWaitingForExplanationConfirm=!1;return}this.isWaitingForExplanationConfirm=!1,o()};try{console.log(`[QuizGameplayState] Llamando a uiManager.showExplanation para pregunta ${e}.`),this.uiManager.showExplanation(a,n,this.lastAnswerResultType)}catch(l){console.error("[QuizGameplayState] Error llamando a uiManager.showExplanation:",l),this.isWaitingForExplanationConfirm=!1,o()}}else console.log(`[QuizGameplayState] Pregunta ${e}: No hay explicación. Llamando a scheduleNext directamente.`),o();console.log(`[QuizGameplayState] proceedToNextStep() FINALIZADO para pregunta ${e}.`)}scheduleNextQuestion(e){var o;const a=((o=this.currentQuestion)==null?void 0:o.id)||"N/A (previa)";if(console.log(`[QuizGameplayState] scheduleNextQuestion() INICIADO para pregunta ${a} con delay: ${e}ms. isExiting: ${this.isExitingOrChangingState}`),this.isExitingOrChangingState){console.log("[QuizGameplayState] scheduleNextQuestion() abortado: isExitingOrChangingState es true.");return}this.nextQuestionTimeoutId&&(console.log(`[QuizGameplayState] Limpiando timeout anterior: ${this.nextQuestionTimeoutId} antes de programar para ${a}.`),clearTimeout(this.nextQuestionTimeoutId)),this.nextQuestionTimeoutId=window.setTimeout(()=>{const i=this.nextQuestionTimeoutId;this.nextQuestionTimeoutId=null,console.log(`[QuizGameplayState] TIMEOUT EJECUTADO (ID: ${i}) para scheduleNextQuestion. Pregunta previa: ${a}`),!this.isExitingOrChangingState&&this.gameManager.getStateMachine().getCurrentStateName()==="QuizGameplay"?(console.log("[QuizGameplayState] Timeout: Llamando a displayNextQuestion."),requestAnimationFrame(()=>{!this.isExitingOrChangingState&&this.gameManager.getStateMachine().getCurrentStateName()==="QuizGameplay"?this.displayNextQuestion():console.log("[QuizGameplayState] displayNextQuestion abortado en rAF porque el estado cambió o se está saliendo.")})):console.log("[QuizGameplayState] displayNextQuestion abortado en timeout porque el estado cambió o se está saliendo. Estado FSM:",this.gameManager.getStateMachine().getCurrentStateName())},e),console.log(`[QuizGameplayState] Nueva pregunta programada con timeout ID: ${this.nextQuestionTimeoutId} para después de pregunta ${a}. Delay: ${e}ms.`)}displayNextQuestion(){var a;if(console.log(`[QuizGameplayState] displayNextQuestion() INICIADO. isExiting: ${this.isExitingOrChangingState}`),this.isExitingOrChangingState){console.log("[QuizGameplayState] displayNextQuestion abortado porque se está saliendo del estado.");return}try{this.currentQuestion=this.quizSystem.selectNextQuestion(),console.log(`[QuizGameplayState] Siguiente pregunta seleccionada: ID ${((a=this.currentQuestion)==null?void 0:a.id)||"NINGUNA"}`)}catch(o){console.error("[QuizGameplayState] Error seleccionando la siguiente pregunta:",o),this.uiManager.updateFeedback("Error al cargar la siguiente pregunta.","info");return}if(!this.currentQuestion){console.log("[QuizGameplayState] No quedan más preguntas disponibles. Transicionando a ResultsState."),this.isExitingOrChangingState=!0,this.uiManager.updateFeedback("¡Has completado todas las preguntas!","correct"),setTimeout(()=>{if(console.log("[QuizGameplayState] Timeout de fin de preguntas: Verificando estado antes de cambiar a Results..."),this.gameManager.getStateMachine().getCurrentStateName()==="QuizGameplay"){console.log("[QuizGameplayState] Timeout de fin de preguntas: Cambiando a estado ResultsState.");const o=this.quizSystem.getTotalQuestionsCount(),i=this.gameManager.getPlayerData();console.warn("[QuizGameplayState] Estimando respuestas correctas basado en puntaje. Implementar conteo real.");const t=Math.round(i.score/(this.BASE_POINTS_PER_CORRECT*1.2));this.gameManager.getStateMachine().changeState("Results",{score:i.score,correct:t,total:o},"gq-wipe-transition")}else console.log("[QuizGameplayState] Timeout de fin de preguntas: Estado ya cambió, no se transiciona a ResultsState.")},1500);return}this.hintAppliedToQuestionId=null;const e=this.gameManager.getContainerElement();if(!e){console.error("[QuizGameplayState] Contenedor #app no encontrado para displayNextQuestion.");return}try{console.log(`[QuizGameplayState] Llamando a uiManager.buildQuizInterface para pregunta ID: ${this.currentQuestion.id}`),this.uiManager.buildQuizInterface(this.currentQuestion,e,this.handleOptionClick.bind(this),this.consecutiveCorrectAnswers),this.gameManager.getPlayerData().hintCharges>0&&this.currentQuestion&&(console.log("[QuizGameplayState] Aplicando visuales de pista."),this.uiManager.applyHintVisuals(this.currentQuestion.correctAnswerKey),this.hintAppliedToQuestionId=this.currentQuestion.id),console.log(`[QuizGameplayState] displayNextQuestion() FINALIZADO para pregunta ID: ${this.currentQuestion.id}`)}catch(o){console.error("[QuizGameplayState] Error construyendo la interfaz del quiz:",o),this.uiManager.updateFeedback("Error al mostrar la pregunta.","info")}}handleOptionClick(e){var t;const a=((t=this.currentQuestion)==null?void 0:t.id)||"N/A";if(console.log(`[QuizGameplayState] handleOptionClick() INICIADO con key: ${e} para pregunta ${a}. isExiting: ${this.isExitingOrChangingState}, isWaitingExpl: ${this.isWaitingForExplanationConfirm}, timeoutId: ${this.nextQuestionTimeoutId}`),!this.currentQuestion||this.isExitingOrChangingState||this.isWaitingForExplanationConfirm||this.nextQuestionTimeoutId!==null){console.warn(`[QuizGameplayState] handleOptionClick IGNORADO (pregunta ${a}): noCurrentQ=${!this.currentQuestion}, isExiting=${this.isExitingOrChangingState}, isWaitingExpl=${this.isWaitingForExplanationConfirm}, timeoutPending=${this.nextQuestionTimeoutId!==null}`);return}console.log(`[QuizGameplayState] handleOptionClick: PROCEDIENDO con validación para pregunta ${a}.`),this.uiManager.disableOptions(),console.log(`[QuizGameplayState] Opciones deshabilitadas para pregunta ${a}.`);const o=this.quizSystem.validateAnswer(this.currentQuestion.id,e),i=this.gameManager.getPlayerData();this.hintAppliedToQuestionId===this.currentQuestion.id&&(i.hintCharges>0&&(i.hintCharges--,this.uiManager.updateHintIcon(i.hintCharges),console.log("[QuizGameplayState] Carga de pista descontada.")),this.hintAppliedToQuestionId=null),o===!0?(console.log(`[QuizGameplayState] Respuesta CORRECTA (pregunta ${a}). Llamando a handleCorrectAnswer.`),this.handleCorrectAnswer(this.currentQuestion.difficulty)):o===!1?(console.log(`[QuizGameplayState] Respuesta INCORRECTA (pregunta ${a}). Llamando a handleIncorrectAnswer.`),this.handleIncorrectAnswer()):(console.error(`[QuizGameplayState] Error al validar la respuesta (isCorrect es null) para pregunta ${a}.`),this.uiManager.updateFeedback("Error al validar la respuesta.","info"),this.hintAppliedToQuestionId=null,this.proceedToNextStep()),console.log(`[QuizGameplayState] handleOptionClick() FINALIZADO para key: ${e} (pregunta ${a}).`)}rebuildInterface(){if(console.log(`[QuizGameplayState] rebuildInterface() INICIADO. isExitingOrChangingState: ${this.isExitingOrChangingState}`),this.isExitingOrChangingState)return;const e=this.gameManager.getContainerElement();if(this.currentQuestion&&e){console.log("[QuizGameplayState] Reconstruyendo interfaz para pregunta ID:",this.currentQuestion.id);const a=this.uiManager.isExplanationVisible(),o=this.uiManager.externalConfirmCallback,i=this.lastAnswerResultType;if(this.uiManager.buildQuizInterface(this.currentQuestion,e,this.handleOptionClick.bind(this),this.consecutiveCorrectAnswers),this.hintAppliedToQuestionId===this.currentQuestion.id&&this.uiManager.applyHintVisuals(this.currentQuestion.correctAnswerKey),a&&this.currentQuestion.explanation){console.log("[UIManager] Reconstruyendo interfaz: Restaurando explicación visible.");const t=o??(()=>{this.gameManager.getStateMachine().getCurrentStateName()==="QuizGameplay"&&this.proceedToNextStep()});this.uiManager.showExplanation(this.currentQuestion.explanation,t,i)}}else console.warn("[QuizGameplayState] No se puede reconstruir, falta pregunta actual o contenedor.")}getPreferredEnterAnimation(){return"gq-wipe-transition"}getPreferredExitAnimation(){return"gq-wipe-transition"}}var Ui=Object.defineProperty,Vi=Object.getOwnPropertyDescriptor,Ke=(g,e,a,o)=>{for(var i=o>1?void 0:o?Vi(e,a):e,t=g.length-1,n;t>=0;t--)(n=g[t])&&(i=(o?n(e,a,i):n(i))||i);return o&&i&&Ui(e,a,i),i};let Ae=class extends B{constructor(){super(...arguments),this.optionKey="",this.optionText="Opción",this.disabled=!1,this.hinted=!1}render(){return R`
      <button
        class="option-button-internal" 
        ?disabled=${this.disabled||this.hinted}
        @click=${this._handleClick}
        @touchstart=${this._handleClick}
        part="button"
      >
        ${this.optionText}
      </button>
    `}_handleClick(g){g.type==="touchstart"&&g.preventDefault(),!(this.disabled||this.hinted)&&this.dispatchEvent(new CustomEvent("option-selected",{detail:{key:this.optionKey},bubbles:!0,composed:!0}))}};Ae.styles=V`
    :host {
      display: block;
      width: 100%;
      outline: none;
      -webkit-tap-highlight-color: transparent;
    }

    .option-button-internal {
      /* Layout y Alineación */
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      min-height: var(--gq-opt-btn-min-height, 3rem);
      height: auto;
      padding: var(--gq-opt-btn-padding, 0.8rem 0.8rem);
      box-sizing: border-box;

      /* Texto */
      text-align: center;
      white-space: normal;
      word-wrap: break-word;
      word-break: break-word;
      line-height: var(--gq-opt-btn-line-height, 1.3);
      font-family: var(--gq-opt-btn-font-family, 'Poppins', sans-serif);
      font-weight: var(--gq-opt-btn-font-weight, 600);
      font-size: var(--gq-opt-btn-font-size, 0.95rem);
      color: var(--gq-opt-btn-text-color, #FFFFFF);

      /* Apariencia Base */
      border: var(--gq-opt-btn-border, none);
      border-radius: var(--gq-opt-btn-border-radius, 0.6rem);
      cursor: pointer;
      background: var(--gq-opt-btn-bg, linear-gradient(to right, #3b82f6, #2563eb));
      box-shadow: var(--gq-opt-btn-box-shadow, 0 4px 10px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.1));

      /* Transiciones */
      transition: background-image 0.3s ease, background-color 0.3s ease,
                  color 0.3s ease, border 0.3s ease, box-shadow 0.3s ease,
                  transform 0.15s ease, opacity 0.2s ease;
      opacity: 1;
    }

    /* Hover (no deshabilitado, no hinted) */
    /* Usamos :host para los estados reflejados */
    :host(:not([disabled]):not([hinted])) .option-button-internal:hover {
      background: var(--gq-opt-btn-hover-bg, linear-gradient(to right, #60a5fa, #3b82f6));
      transform: var(--gq-opt-btn-hover-transform, translateY(-2px));
      box-shadow: var(--gq-opt-btn-hover-box-shadow, 0 6px 15px rgba(0, 0, 0, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.1));
      color: var(--gq-opt-btn-hover-text-color, var(--gq-opt-btn-text-color, #FFFFFF)); /* Permite sobreescribir color de texto en hover */
    }

    /* Active (no deshabilitado, no hinted) */
    :host(:not([disabled]):not([hinted])) .option-button-internal:active {
      background: var(--gq-opt-btn-active-bg, var(--gq-opt-btn-bg, linear-gradient(to right, #2563eb, #1d4ed8))); /* Fallback a bg normal si active-bg no está */
      transform: var(--gq-opt-btn-active-transform, translateY(0px) scale(0.98));
      box-shadow: var(--gq-opt-btn-active-box-shadow, 0 2px 5px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(0, 0, 0, 0.1));
    }

    /* Estado Deshabilitado */
    :host([disabled]) .option-button-internal {
      cursor: not-allowed;
      opacity: var(--gq-opt-btn-disabled-opacity, 0.6) !important;
      transform: none !important;
      background: var(--gq-opt-btn-disabled-bg, linear-gradient(to right, #9ca3af, #6b7280));
      box-shadow: var(--gq-opt-btn-disabled-box-shadow, 0 2px 4px rgba(0, 0, 0, 0.1));
      color: var(--gq-opt-btn-disabled-text-color, var(--gq-opt-btn-text-color, #FFFFFF));
      border: var(--gq-opt-btn-disabled-border, var(--gq-opt-btn-border, none));
    }

    /* Estado Hinted */
    :host([hinted]) .option-button-internal {
      cursor: not-allowed;
      opacity: var(--gq-opt-btn-hinted-opacity, 0.45) !important;
      transform: none !important;
      background: var(--gq-opt-btn-hinted-bg, linear-gradient(to right, #6b7280, #4b5563));
      box-shadow: var(--gq-opt-btn-hinted-box-shadow, var(--gq-opt-btn-disabled-box-shadow, 0 2px 4px rgba(0, 0, 0, 0.1)));
      color: var(--gq-opt-btn-hinted-text-color, var(--gq-opt-btn-disabled-text-color, var(--gq-opt-btn-text-color, #FFFFFF)));
      border: var(--gq-opt-btn-hinted-border, var(--gq-opt-btn-disabled-border, var(--gq-opt-btn-border, none)));
    }

    /* Media Queries para Desktop (usando variables específicas si existen) */
    @media (min-width: 768px) {
      .option-button-internal {
        padding: var(--gq-opt-btn-desktop-padding, var(--gq-opt-btn-padding, 0.9rem 1rem));
        min-height: var(--gq-opt-btn-desktop-min-height, var(--gq-opt-btn-min-height, 3.5rem));
        font-size: var(--gq-opt-btn-desktop-font-size, var(--gq-opt-btn-font-size, 1rem));
        border-radius: var(--gq-opt-btn-desktop-border-radius, var(--gq-opt-btn-border-radius, 0.75rem));
      }
    }
  `;Ke([z({type:String})],Ae.prototype,"optionKey",2);Ke([z({type:String})],Ae.prototype,"optionText",2);Ke([z({type:Boolean,reflect:!0})],Ae.prototype,"disabled",2);Ke([z({type:Boolean,reflect:!0})],Ae.prototype,"hinted",2);Ae=Ke([Q("quiz-option-button")],Ae);var Qi=Object.defineProperty,Gi=Object.getOwnPropertyDescriptor,pe=(g,e,a,o)=>{for(var i=o>1?void 0:o?Gi(e,a):e,t=g.length-1,n;t>=0;t--)(n=g[t])&&(i=(o?n(e,a,i):n(i))||i);return o&&i&&Qi(e,a,i),i};const St=1,Hi=10;let ae=class extends B{constructor(){super(...arguments),this.score=0,this.combo=0,this._flareIntensity=0,this._shouldPulse=!1,this._scoreColor="var(--gq-scoredisp-text-color-base, #f3f4f6)",this._scoreWeight=800}updated(g){super.updated(g),g.has("combo")&&this._calculateEffects(),g.has("score")&&g.get("score")!==void 0&&this._triggerPulseAnimation()}_calculateEffects(){this._flareIntensity=this.combo<St?0:Math.min((this.combo-St+1)/(Hi-St+1),1),this._shouldPulse=this._flareIntensity>.3;const g=Math.min(this.combo/10,1),e=parseFloat(getComputedStyle(this).getPropertyValue("--gq-scoredisp-font-weight-base").trim()||"700"),a=parseFloat(getComputedStyle(this).getPropertyValue("--gq-scoredisp-font-weight-increment").trim()||"100"),o=parseFloat(getComputedStyle(this).getPropertyValue("--gq-scoredisp-font-weight-max-steps").trim()||"2");this._scoreWeight=e+Math.floor(g*o)*a;const i=getComputedStyle(this).getPropertyValue("--gq-scoredisp-text-color-base").trim()||"#f3f4f6",t=parseFloat(getComputedStyle(this).getPropertyValue("--gq-scoredisp-text-color-combo-hue-offset").trim()||"180"),n=getComputedStyle(this).getPropertyValue("--gq-scoredisp-text-color-combo-saturation").trim()||"80%",l=parseFloat(getComputedStyle(this).getPropertyValue("--gq-scoredisp-text-color-combo-lightness-base").trim()||"90"),r=parseFloat(getComputedStyle(this).getPropertyValue("--gq-scoredisp-text-color-combo-lightness-factor").trim()||"10"),u=parseFloat(getComputedStyle(this).getPropertyValue("--gq-body-bg-combo-hue-base").trim()||"220"),c=l+g*r,p=((u+this.combo*parseFloat(getComputedStyle(this).getPropertyValue("--gq-combo-color-hue-increment").trim()||"10"))%360+t)%360;this._scoreColor=this.combo<2?i:`hsl(${p}, ${n}, ${c}%)`}_triggerPulseAnimation(){this._scorePulseElement&&(this._scorePulseElement.classList.remove("pulsing"),this._scorePulseElement.offsetWidth,this._scorePulseElement.classList.add("pulsing"))}render(){return R`
          <style>
            :host {
              /* Inyectar las variables finales para la animación del texto */
              /* Estas variables locales usan las globales definidas en themes.json o base.css */
              --final-flare-shadow: ${this._flareIntensity>0?`
          0 0 5px var(--gq-score-flare-color-1, transparent),
          0 0 10px var(--gq-score-flare-color-2, transparent),
          0 0 15px var(--gq-score-flare-color-3, transparent),
          0 0 20px var(--gq-score-flare-color-4, transparent)
        `:"none"};
              --final-flare-shadow-pulse: ${this._flareIntensity>0?`
          0 0 5px var(--gq-score-flare-pulse-color-1, transparent),
          0 0 12px var(--gq-score-flare-pulse-color-2, transparent),
          0 0 18px var(--gq-score-flare-pulse-color-3, transparent),
          0 0 24px var(--gq-score-flare-pulse-color-4, transparent)
        `:"none"};
            }
            #score-text-internal {
              font-weight: ${this._scoreWeight};
              color: ${this._scoreColor};
              text-shadow: var(--final-flare-shadow); /* Usa la variable local */
            }
          </style>
          <span class="score-emoji" part="emoji">⭐</span>
          <span
            id="score-text-internal"
            part="text"
            class="${this._shouldPulse?"score-pulsing":""}"
          >
            ${this.score}
          </span>
          <div id="score-pulse-internal" part="pulse-effect"></div>
        `}};ae.styles=V`
        :host {
          display: inline-flex;
          align-items: center;
          position: relative;
          font-family: var(--gq-scoredisp-font-family, var(--gq-font-primary, 'Poppins', sans-serif));
        }
    
        .score-emoji {
          font-size: var(--gq-scoredisp-emoji-size, 1.5rem);
          line-height: 1;
          margin-right: var(--gq-scoredisp-emoji-margin-right, 0.3rem);
          user-select: none;
        }
    
        #score-text-internal {
          transition: color 0.5s ease, font-weight 0.5s ease, text-shadow 0.6s ease-out;
          font-size: var(--gq-scoredisp-text-font-size, var(--score-font-size, 2rem)); /* Usa var global o local */
          line-height: var(--gq-scoredisp-text-line-height, var(--score-line-height, 1.1)); /* Usa var global o local */
          text-align: center;
          min-width: 1ch;
          user-select: none;
          /* font-weight y color se aplican dinámicamente */
          /* text-shadow se aplica dinámicamente mediante variables CSS inyectadas en render() */
        }
    
        /* Animación movida desde base.css y adaptada */
        @keyframes pulseFlareInternal { /* Renombrada para evitar colisión si base.css aún la tiene */
          0%, 100% { text-shadow: var(--final-flare-shadow); opacity: 1; }
          50% { text-shadow: var(--final-flare-shadow-pulse); opacity: 0.85; }
        }
    
        #score-text-internal.score-pulsing {
          animation: pulseFlareInternal 1.5s infinite ease-in-out;
        }
    
        #score-pulse-internal {
          position: absolute;
          left: 50%; top: 50%;
          transform: translate(-50%, -50%) scale(0);
          width: 1px; height: 1px;
          border-radius: 50%;
          background-color: var(--gq-scoredisp-pulse-effect-bg, rgba(255, 255, 255, 0.7));
          opacity: 0;
          z-index: -1;
          pointer-events: none;
        }
    
        /* Animación movida desde base.css */
        @keyframes scorePulseAnimInternal { /* Renombrada */
          0% { transform: translate(-50%, -50%) scale(0); opacity: 0.7; }
          100% { transform: translate(-50%, -50%) scale(200); opacity: 0; }
        }
    
        #score-pulse-internal.pulsing {
           animation: scorePulseAnimInternal 0.6s ease-out forwards;
        }
    
        @media (max-width: 768px) {
          .score-emoji { font-size: var(--gq-scoredisp-emoji-tablet-size, var(--gq-scoredisp-emoji-size, 1.3rem)); }
          #score-text-internal { font-size: var(--gq-scoredisp-text-tablet-font-size, var(--gq-scoredisp-text-font-size, 1.8rem)); }
        }
        @media (max-width: 480px) {
          .score-emoji { 
            font-size: var(--gq-scoredisp-emoji-mobile-size, var(--gq-scoredisp-emoji-tablet-size, 1.2rem));
            margin-right: var(--gq-scoredisp-emoji-mobile-margin-right, var(--gq-scoredisp-emoji-margin-right, 0.2rem));
          }
          #score-text-internal { font-size: var(--gq-scoredisp-text-mobile-font-size, var(--gq-scoredisp-text-tablet-font-size, 1.6rem)); }
        }
      `;pe([z({type:Number})],ae.prototype,"score",2);pe([z({type:Number})],ae.prototype,"combo",2);pe([N()],ae.prototype,"_flareIntensity",2);pe([N()],ae.prototype,"_shouldPulse",2);pe([N()],ae.prototype,"_scoreColor",2);pe([N()],ae.prototype,"_scoreWeight",2);pe([ie("#score-text-internal")],ae.prototype,"_scoreTextElement",2);pe([ie("#score-pulse-internal")],ae.prototype,"_scorePulseElement",2);ae=pe([Q("score-display")],ae);var Wi=Object.defineProperty,ji=Object.getOwnPropertyDescriptor,ft=(g,e,a,o)=>{for(var i=o>1?void 0:o?ji(e,a):e,t=g.length-1,n;t>=0;t--)(n=g[t])&&(i=(o?n(e,a,i):n(i))||i);return o&&i&&Wi(e,a,i),i};let ze=class extends B{constructor(){super(...arguments),this.lives=3,this.hasShield=!1,this.hintCharges=0}render(){const g=this.hintCharges>0;return R`
          <span class="life-emoji" part="heart-icon">❤️</span>
          <span id="lives-count-internal" part="count">${this.lives}</span>
          <span
            class="status-icon shield-icon"
            part="shield-icon"
            ?hidden=${!this.hasShield}
            title="Escudo Activo"
          >🛡️</span>
          <span
            class="status-icon hint-icon"
            part="hint-icon"
            ?hidden=${!g}
            title="Pista Disponible"
          >💡</span>
        `}};ze.styles=V`
        :host {
          display: inline-flex;
          align-items: center;
          gap: var(--gq-livesdisp-gap, 0.3rem);
          font-family: var(--gq-livesdisp-font-family, var(--gq-font-primary, 'Poppins', sans-serif));
          color: var(--gq-livesdisp-text-color, #f3f4f6);
          user-select: none;
        }
    
        .life-emoji {
          font-size: var(--gq-livesdisp-icon-size, 1.3rem);
          line-height: 1;
          color: var(--gq-livesdisp-heart-color, #f43f5e);
          animation: pulseHeart 1.5s infinite ease-in-out; /* Animación aplicada aquí */
          user-select: none;
        }
    
        /* Animación movida desde base.css */
        @keyframes pulseHeart {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }
    
        #lives-count-internal {
          font-size: var(--gq-livesdisp-count-font-size, 1.3rem);
          font-weight: var(--gq-livesdisp-count-font-weight, 700);
          min-width: 1ch;
          text-align: left;
        }
    
        .status-icon {
          font-size: var(--gq-livesdisp-icon-size, 1.3rem);
          line-height: 1;
          margin-left: var(--gq-livesdisp-status-icon-margin-left, 0.3rem);
          display: inline-block;
          user-select: none;
        }
    
        .shield-icon {
          filter: drop-shadow(0 0 3px var(--gq-livesdisp-shield-icon-shadow-color, rgba(59, 130, 246, 0.7)));
          animation: shieldPulse 2s infinite ease-in-out; /* Animación aplicada aquí */
        }
    
        .hint-icon {
          filter: drop-shadow(0 0 3px var(--gq-livesdisp-hint-icon-shadow-color, rgba(250, 204, 21, 0.7)));
          animation: hintPulse 1.8s infinite ease-in-out; /* Animación aplicada aquí */
        }
    
        /* Animaciones movidas desde base.css */
        @keyframes shieldPulse {
          0%, 100% { transform: scale(1); opacity: 0.9; }
          50% { transform: scale(1.1); opacity: 1; }
        }
        @keyframes hintPulse {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.85; }
          50% { transform: scale(1.08) rotate(5deg); opacity: 1; }
        }
    
        [hidden] { display: none !important; }
    
        @media (max-width: 768px) {
          .life-emoji, #lives-count-internal, .status-icon {
            font-size: var(--gq-livesdisp-icon-tablet-size, var(--gq-livesdisp-icon-size, 1.1rem));
          }
          :host {
             gap: var(--gq-livesdisp-tablet-gap, var(--gq-livesdisp-gap, 0.2rem));
          }
           .status-icon {
             margin-left: var(--gq-livesdisp-status-icon-tablet-margin-left, var(--gq-livesdisp-status-icon-margin-left, 0.2rem));
          }
        }
        @media (max-width: 480px) {
          .life-emoji, #lives-count-internal, .status-icon {
            font-size: var(--gq-livesdisp-icon-mobile-size, var(--gq-livesdisp-icon-tablet-size, 1rem));
          }
        }
      `;ft([z({type:Number})],ze.prototype,"lives",2);ft([z({type:Boolean})],ze.prototype,"hasShield",2);ft([z({type:Number})],ze.prototype,"hintCharges",2);ze=ft([Q("lives-display")],ze);var Ki=Object.defineProperty,Yi=Object.getOwnPropertyDescriptor,Ye=(g,e,a,o)=>{for(var i=o>1?void 0:o?Yi(e,a):e,t=g.length-1,n;t>=0;t--)(n=g[t])&&(i=(o?n(e,a,i):n(i))||i);return o&&i&&Ki(e,a,i),i};let Ie=class extends B{constructor(){super(...arguments),this.currentInk=0,this.maxInkPerBar=1e3,this._fullBarsCompleted=0,this._currentBarPercentage=0}updated(g){super.updated(g),(g.has("currentInk")||g.has("maxInkPerBar"))&&(this._calculateBarState(),this.requestUpdate())}_getRainbowColor(g,e){return getComputedStyle(this).getPropertyValue(`--gq-inkbar-rainbow-color-${g+1}`).trim()||e}_calculateBarState(){const g=Math.max(0,this.currentInk),e=this.maxInkPerBar>0?this.maxInkPerBar:1e3;this._fullBarsCompleted=Math.floor(g/e);const a=g%e;g===0?(this._currentBarPercentage=0,this._fullBarsCompleted=0):a===0?(this._currentBarPercentage=100,this._fullBarsCompleted=Math.max(0,Math.floor(g/e)-1)):this._currentBarPercentage=a/e*100}render(){const g=getComputedStyle(this).getPropertyValue("--gq-inkbar-bg-default").trim()||"#374151",e=getComputedStyle(this).getPropertyValue("--gq-inkbar-rainbow-color-1").trim()||"#a78bfa",a=7,o=this._fullBarsCompleted>0?this._getRainbowColor((this._fullBarsCompleted-1)%a,g):g,i=this._getRainbowColor(this._fullBarsCompleted%a,e);return R`
      <style>
        :host {
          /* Estas variables son locales al shadow DOM y se usan por los estilos estáticos */
          --final-container-bg-color: ${o};
          --final-segment-bg-color: ${i};
        }
      </style>
      <div
        class="ink-bar-segment"
        part="segment"
        style="width: ${this._currentBarPercentage}%;"
      ></div>
    `}};Ie.styles=V`
    :host {
      display: block;
      width: var(--gq-inkbar-width, 120px);
      height: var(--gq-inkbar-height, 12px);
      border-radius: var(--gq-inkbar-border-radius, 6px);
      overflow: hidden;
      position: relative;
      border: var(--gq-inkbar-border, 1px solid #4b5563);
      /* background-color se establece dinámicamente a través de --final-container-bg-color */
      transition: background-color 0.3s ease-out;
      box-sizing: border-box;
      background-color: var(--final-container-bg-color); /* Variable que se actualizará en render */
    }

    .ink-bar-segment {
      position: absolute;
      top: 0; left: 0;
      height: 100%;
      border-radius: inherit;
      /* background-color se establece dinámicamente a través de --final-segment-bg-color */
      width: 0%; /* Se actualiza con style property */
      transition: width 0.3s ease-out, background-color 0.3s ease-out;
      background-color: var(--final-segment-bg-color); /* Variable que se actualizará en render */
    }
  `;Ye([z({type:Number})],Ie.prototype,"currentInk",2);Ye([z({type:Number})],Ie.prototype,"maxInkPerBar",2);Ye([N()],Ie.prototype,"_fullBarsCompleted",2);Ye([N()],Ie.prototype,"_currentBarPercentage",2);Ie=Ye([Q("ink-bar")],Ie);var Zi=Object.defineProperty,Xi=Object.getOwnPropertyDescriptor,Ze=(g,e,a,o)=>{for(var i=o>1?void 0:o?Xi(e,a):e,t=g.length-1,n;t>=0;t--)(n=g[t])&&(i=(o?n(e,a,i):n(i))||i);return o&&i&&Zi(e,a,i),i};const it={1:{name:"COMÚN",classSuffix:"1"},2:{name:"POCO COMÚN",classSuffix:"2"},3:{name:"RARA",classSuffix:"3"},4:{name:"ÉPICA",classSuffix:"4"},5:{name:"LEGENDARIA",classSuffix:"5"},easy:{name:"FÁCIL",classSuffix:"easy"},medium:{name:"MEDIO",classSuffix:"medium"},hard:{name:"DIFÍCIL",classSuffix:"hard"}};let qe=class extends B{constructor(){super(...arguments),this.difficulty="1",this.questionText="Cargando pregunta...",this._difficultyName=it[1].name,this._difficultyClassSuffix=it[1].classSuffix}updated(g){super.updated(g),g.has("difficulty")&&this._updateDifficultyDisplayData()}_updateDifficultyDisplayData(){const g=it[this.difficulty]||it[1];this._difficultyName=g.name,this._difficultyClassSuffix=g.classSuffix}render(){const g=`difficulty-level-${this._difficultyClassSuffix}`;return R`
          <div class="question-box-internal">
            <div class="card__content">
              <span
                class="difficulty-label ${g}"
                part="difficulty"
              >
                Pregunta: ${this._difficultyName}
              </span>
              <p class="question-text" part="text">
                ${this.questionText}
              </p>
            </div>
          </div>
        `}};qe.styles=V`
        :host {
          display: block;
          width: 100%;
          margin-bottom: var(--gq-qbox-margin-bottom, 1.5rem);
          box-sizing: border-box;
        }
    
        .question-box-internal {
          width: 100%;
          min-height: var(--gq-qbox-min-height, 5em);
          height: auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-radius: var(--gq-qbox-border-radius, 0.75rem);
          padding: var(--gq-qbox-padding, 1rem);
          gap: var(--gq-qbox-gap, 0.4rem);
          box-sizing: border-box;
          background-color: var(--gq-qbox-bg, rgba(17, 24, 39, 0.85));
          border: var(--gq-qbox-border, 1px solid rgba(75, 85, 99, 0.5));
          box-shadow: var(--gq-qbox-inset-shadow, inset 0 1px 2px rgba(0,0,0,0.2)),
                      0 0 var(--gq-element-glow-blur-radius, calc(var(--element-glow-intensity, 0) * 18px)) var(--gq-element-glow-spread-radius, calc(var(--element-glow-intensity, 0) * 4px)) var(--gq-element-glow-color, hsla(50, 100%, 60%, calc(var(--element-glow-intensity, 0) * 0.6)));
          transition: box-shadow 0.5s ease-out, background-color 0.3s ease, border 0.3s ease;
          overflow: hidden; 
          position: relative; 
        }
        
        .card__content {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: inherit;
          position: relative; 
          z-index: 2; 
        }
    
        .difficulty-label {
          text-align: center;
          display: block;
          margin-left: auto;
          margin-right: auto;
          width: fit-content;
          font-family: var(--gq-qbox-diff-label-font-family, var(--gq-font-primary, 'Poppins', sans-serif));
          font-size: var(--gq-qbox-diff-label-font-size, 0.65rem);
          font-weight: var(--gq-qbox-diff-label-font-weight, 700);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: var(--gq-qbox-diff-label-padding, 0.1rem 0.4rem);
          border-radius: var(--gq-qbox-diff-label-border-radius, 0.25rem);
          line-height: 1.2;
          transition: color 0.3s ease, background-color 0.3s ease, text-shadow 0.3s ease;
          text-shadow: 0 0 var(--gq-difficulty-label-glow-blur, var(--difficulty-glow-blur, 0px)) var(--gq-difficulty-label-glow-color, var(--difficulty-glow-color, transparent)), /* Usar variables globales o locales */
                       0 0 calc(var(--gq-difficulty-label-glow-blur, var(--difficulty-glow-blur, 0px)) * 1.5) var(--gq-difficulty-label-glow-color, var(--difficulty-glow-color, transparent));
          flex-shrink: 0;
          margin-bottom: var(--gq-qbox-diff-label-margin-bottom, 0.3rem);
          /* Considerar una animación de pulso si es necesario */
          /* animation: var(--gq-qbox-diff-label-animation, none); */
        }
    
        /* Animación de pulso (si un tema lo define mediante variables o si se activa por clase) */
        @keyframes difficultyPulse { /* Movida aquí */
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.9; }
        }
        /* .difficulty-label.pulse-animation { animation: difficultyPulse 1.2s infinite ease-in-out; } */
    
        .difficulty-level-1 { color: var(--gq-qbox-diff-1-text-color, #9ca3af); background-color: var(--gq-qbox-diff-1-bg-color, rgba(107, 114, 128, 0.2)); }
        .difficulty-level-2 { color: var(--gq-qbox-diff-2-text-color, #34d399); background-color: var(--gq-qbox-diff-2-bg-color, rgba(16, 185, 129, 0.2)); }
        .difficulty-level-3 { color: var(--gq-qbox-diff-3-text-color, #60a5fa); background-color: var(--gq-qbox-diff-3-bg-color, rgba(59, 130, 246, 0.2)); }
        .difficulty-level-4 { color: var(--gq-qbox-diff-4-text-color, #c4b5fd); background-color: var(--gq-qbox-diff-4-bg-color, rgba(167, 139, 250, 0.2)); }
        .difficulty-level-5 { color: var(--gq-qbox-diff-5-text-color, #fbbf24); background-color: var(--gq-qbox-diff-5-bg-color, rgba(245, 158, 11, 0.2)); }
        .difficulty-level-easy { color: var(--gq-qbox-diff-easy-text-color, var(--gq-qbox-diff-2-text-color, #34d399)); background-color: var(--gq-qbox-diff-easy-bg-color, var(--gq-qbox-diff-2-bg-color, rgba(16, 185, 129, 0.2))); }
        .difficulty-level-medium { color: var(--gq-qbox-diff-medium-text-color, var(--gq-qbox-diff-3-text-color, #60a5fa)); background-color: var(--gq-qbox-diff-medium-bg-color, var(--gq-qbox-diff-3-bg-color, rgba(59, 130, 246, 0.2))); }
        .difficulty-level-hard { color: var(--gq-qbox-diff-hard-text-color, var(--gq-qbox-diff-4-text-color, #c4b5fd)); background-color: var(--gq-qbox-diff-hard-bg-color, var(--gq-qbox-diff-4-bg-color, rgba(167, 139, 250, 0.2))); }
            
        .question-text {
          font-family: var(--gq-qbox-text-font-family, var(--gq-font-primary, 'Poppins', sans-serif));
          font-size: var(--gq-qbox-text-font-size, 1.1rem);
          font-weight: var(--gq-qbox-text-font-weight, 600);
          line-height: var(--gq-qbox-text-line-height, 1.5);
          color: var(--gq-qbox-text-color, #e5e7eb);
          text-align: center;
          width: 100%;
          word-break: break-word;
          hyphens: auto;
          flex-grow: 1;
        }
    
        @media (max-width: 768px) {
          .question-box-internal { 
            padding: var(--gq-qbox-tablet-padding, var(--gq-qbox-padding, 0.8rem));
            min-height: var(--gq-qbox-tablet-min-height, var(--gq-qbox-min-height, 4.5em));
          }
          .difficulty-label { 
            font-size: var(--gq-qbox-diff-label-tablet-font-size, var(--gq-qbox-diff-label-font-size, 0.6rem));
            padding: var(--gq-qbox-diff-label-tablet-padding, var(--gq-qbox-diff-label-padding, 0.1rem 0.35rem));
          }
          .question-text { 
            font-size: var(--gq-qbox-text-tablet-font-size, var(--gq-qbox-text-font-size, 1rem));
            line-height: var(--gq-qbox-text-tablet-line-height, var(--gq-qbox-text-line-height, 1.4));
          }
        }
         @media (max-width: 480px) {
          .question-box-internal { 
            padding: var(--gq-qbox-mobile-padding, var(--gq-qbox-tablet-padding, 0.6rem));
            min-height: var(--gq-qbox-mobile-min-height, var(--gq-qbox-tablet-min-height, 4em));
          }
          .difficulty-label { 
            font-size: var(--gq-qbox-diff-label-mobile-font-size, var(--gq-qbox-diff-label-tablet-font-size, 0.55rem));
          }
          .question-text { 
            font-size: var(--gq-qbox-text-mobile-font-size, var(--gq-qbox-text-tablet-font-size, 0.9rem));
          }
        }
      `;Ze([z({type:String})],qe.prototype,"difficulty",2);Ze([z({type:String})],qe.prototype,"questionText",2);Ze([N()],qe.prototype,"_difficultyName",2);Ze([N()],qe.prototype,"_difficultyClassSuffix",2);qe=Ze([Q("quiz-question-display")],qe);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ji={ATTRIBUTE:1},en=g=>(...e)=>({_$litDirective$:g,values:e});class tn{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,a,o){this._$Ct=e,this._$AM=a,this._$Ci=o}_$AS(e,a){return this.update(e,a)}update(e,a){return this.render(...a)}}/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const wa=en(class extends tn{constructor(g){var e;if(super(g),g.type!==Ji.ATTRIBUTE||g.name!=="class"||((e=g.strings)==null?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(g){return" "+Object.keys(g).filter(e=>g[e]).join(" ")+" "}update(g,[e]){var o,i;if(this.st===void 0){this.st=new Set,g.strings!==void 0&&(this.nt=new Set(g.strings.join(" ").split(/\s/).filter(t=>t!=="")));for(const t in e)e[t]&&!((o=this.nt)!=null&&o.has(t))&&this.st.add(t);return this.render(e)}const a=g.element.classList;for(const t of this.st)t in e||(a.remove(t),this.st.delete(t));for(const t in e){const n=!!e[t];n===this.st.has(t)||(i=this.nt)!=null&&i.has(t)||(n?(a.add(t),this.st.add(t)):(a.remove(t),this.st.delete(t)))}return Me}});var an=Object.defineProperty,nn=Object.getOwnPropertyDescriptor,Pt=(g,e,a,o)=>{for(var i=o>1?void 0:o?nn(e,a):e,t=g.length-1,n;t>=0;t--)(n=g[t])&&(i=(o?n(e,a,i):n(i))||i);return o&&i&&an(e,a,i),i};let Ve=class extends B{constructor(){super(...arguments),this.message="",this.type=null}render(){const g={"feedback-text":!0,correct:this.type==="correct",incorrect:this.type==="incorrect",shield:this.type==="shield",info:this.type==="info"};return R`
      <div class=${wa(g)} part="text">
        ${this.message||""}
      </div>
    `}};Ve.styles=V`
    :host {
      display: block;
      margin-top: var(--gq-feedback-margin-top, 1rem);
      height: var(--gq-feedback-height, 2rem);
      box-sizing: border-box;
      transition: opacity 0.3s ease-out;
      opacity: 1;
    }

    :host(:empty) .feedback-text { /* Ocultar si el mensaje está vacío */
        opacity: 0;
    }
    :host([message=""]) .feedback-text { /* Alternativa si :empty no funciona bien con slots/propiedades */
        opacity: 0;
    }


    .feedback-text {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: var(--gq-feedback-font-family, var(--gq-font-primary, 'Poppins', sans-serif));
      font-size: var(--gq-feedback-font-size, 1.125rem);
      font-weight: var(--gq-feedback-font-weight, 700);
      text-align: center;
      line-height: 1;
      transition: color 0.3s ease, opacity 0.3s ease; /* Añadido opacity */
      opacity: 1; /* Visible por defecto si tiene mensaje */
    }

    /* Aplicar color basado en el tipo usando una clase o directamente la variable */
    .feedback-text.correct { color: var(--gq-feedback-text-color-correct, #4ade80); }
    .feedback-text.incorrect { color: var(--gq-feedback-text-color-incorrect, #f87171); }
    .feedback-text.shield { color: var(--gq-feedback-text-color-shield, #60a5fa); }
    .feedback-text.info { color: var(--gq-feedback-text-color-info, #9ca3af); }
    .feedback-text:not(.correct):not(.incorrect):not(.shield):not(.info) {
        color: var(--gq-feedback-text-color-default, var(--gq-body-text-color, #e5e7eb)); /* Un color por defecto */
    }


    @media (max-width: 768px) {
        .feedback-text {
            font-size: var(--gq-feedback-desktop-font-size, var(--gq-feedback-font-size, 1rem));
        }
    }
  `;Pt([z({type:String})],Ve.prototype,"message",2);Pt([z({type:String})],Ve.prototype,"type",2);Ve=Pt([Q("feedback-area")],Ve);var sn=Object.defineProperty,on=Object.getOwnPropertyDescriptor,Sa=(g,e,a,o)=>{for(var i=o>1?void 0:o?on(e,a):e,t=g.length-1,n;t>=0;t--)(n=g[t])&&(i=(o?n(e,a,i):n(i))||i);return o&&i&&sn(e,a,i),i};let dt=class extends B{constructor(){super(...arguments),this.isFaded=!1}render(){return R`
      <div class="top-ui-container-internal" part="top-ui-container">
        <div class="status-row-internal" part="status-row">
            <slot name="lives-display"></slot>
            <slot name="score-display"></slot>
        </div>
        <div class="ink-area-internal" part="ink-area">
            <slot name="ink-label"></slot>
            <slot name="ink-bar"></slot>
        </div>
      </div>

      <div class="quiz-content-wrapper-internal" part="quiz-content-wrapper">
        <div class="quiz-scrollable-content-internal" part="quiz-scrollable-content">
          <slot name="question-display"></slot>
          <div class="options-container-internal" part="options-container">
            <slot name="options"></slot>
          </div>
          <slot name="feedback-area"></slot>
        </div>
      </div>
    `}};dt.styles=V`
    :host {
      /* Estilos base que antes estaban en .game-container de layout.css */
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      width: 90%;
      max-width: 600px; /* O usar variable CSS de theme.json */
      box-sizing: border-box;
      padding: 0 1rem; /* Ajustar según sea necesario o usar variables */
      margin-top: 2vh;  /* Ajustar según sea necesario o usar variables */
      background-color: transparent; /* El fondo lo da el body o el tema */
      transition: opacity 0.25s ease-in-out;
      /* Por defecto, el contenedor es interactivo */
      pointer-events: auto;
    }

    :host([isFaded]) {
      opacity: 0.3;
      pointer-events: none;
    }

    /* Estructura interna similar a la que generaba UIManager */
    .top-ui-container-internal {
      /* Estilos para el contenedor de score, vidas, tinta */
      width: 100%;
      display: flex;
      flex-direction: column; /* O row, según el diseño de .top-ui-container */
      align-items: center;
      margin-bottom: 1rem; /* Espacio antes de la pregunta */
      /* background-color: var(--gq-top-ui-bg, transparent); */ /* Ejemplo de variable de tema */
    }

    .status-row-internal {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem 0;
        gap: 0.5rem;
         /* background-color: var(--gq-status-row-bg, transparent); */
    }
    
    .ink-area-internal {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.2rem;
        margin-top: 0.5rem;
        /* background-color: var(--gq-ink-area-bg, transparent); */
    }


    .quiz-content-wrapper-internal {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .quiz-scrollable-content-internal {
      width: 100%;
    }

    .options-container-internal {
      /* Estilos para el contenedor de opciones si son necesarios aquí */
      display: flex;
      flex-direction: column;
      gap: var(--gq-options-gap, 0.75rem); /* Usar variable de tema */
      width: 100%;
      margin-top: var(--gq-options-margin-top, 1rem);
      margin-bottom: var(--gq-options-margin-bottom, 1rem);
    }

    /* Media queries para responsiveness dentro del componente */
    @media (max-width: 768px) {
      :host {
        padding: 0 0.5rem;
        width: 100%;
        max-width: none;
        margin-top: 7vh; /* Ajustado de layout.css */
      }
      .top-ui-container-internal {
        /* Ajustes si son necesarios */
      }
    }
     @media (max-width: 480px) {
       :host {
         margin-top: 5vh; /* Ajustado de layout.css */
       }
     }
  `;Sa([z({type:Boolean,reflect:!0})],dt.prototype,"isFaded",2);dt=Sa([Q("quiz-ui-container")],dt);var rn=Object.defineProperty,ln=Object.getOwnPropertyDescriptor,ye=(g,e,a,o)=>{for(var i=o>1?void 0:o?ln(e,a):e,t=g.length-1,n;t>=0;t--)(n=g[t])&&(i=(o?n(e,a,i):n(i))||i);return o&&i&&rn(e,a,i),i};let ce=class extends B{constructor(){super(...arguments),this.explanationText="",this.resultType=null,this.isVisible=!1,this._statusText="",this._statusIcon="",this._statusClass="",this._handleConfirm=g=>{if(!this.isVisible)return;const e=(g instanceof MouseEvent||g instanceof TouchEvent)&&g.target===this,a=g instanceof KeyboardEvent;if(!(!a&&!e)){if(a){const o=g.key;if(o!=="Enter"&&o!==" "&&o!=="Escape")return}g.stopPropagation(),(g.type==="touchstart"||g.type==="click")&&g.preventDefault(),this.dispatchEvent(new CustomEvent("confirm-clicked",{bubbles:!0,composed:!0}))}}}updated(g){super.updated(g),g.has("resultType")&&this._updateStatusContent(),g.has("isVisible")&&(g.get("isVisible"),this.isVisible?this.setAttribute("visible",""):this.removeAttribute("visible"),this._handleVisibilityChange())}_updateStatusContent(){switch(this.resultType){case"correct":this._statusText="¡Respuesta Correcta!",this._statusIcon="✅",this._statusClass="status-correct";break;case"incorrect":this._statusText="Respuesta Incorrecta",this._statusIcon="❌",this._statusClass="status-incorrect";break;case"shield":this._statusText="¡Escudo Activado!",this._statusIcon="🛡️",this._statusClass="status-shield";break;default:this._statusText="",this._statusIcon="",this._statusClass=""}}_handleVisibilityChange(){const g=this._handleConfirm,e=window,a=this;this.isVisible?this.hasAttribute("listeners-added")||(a.addEventListener("click",g),a.addEventListener("touchstart",g,{passive:!1}),e.addEventListener("keydown",g),this.setAttribute("listeners-added","")):this.hasAttribute("listeners-added")&&(a.removeEventListener("click",g),a.removeEventListener("touchstart",g),e.removeEventListener("keydown",g),this.removeAttribute("listeners-added"))}disconnectedCallback(){if(super.disconnectedCallback(),this.hasAttribute("listeners-added")){const g=this._handleConfirm;this.removeEventListener("click",g),this.removeEventListener("touchstart",g),window.removeEventListener("keydown",g),this.removeAttribute("listeners-added")}}render(){const g={"explanation-status-base":!0,[this._statusClass]:!!this._statusClass};return R`
      <div class="overlay-content-wrapper" part="wrapper">
        ${this._statusText?R`
          <p class=${wa(g)} part="status">
            ${this._statusIcon} ${this._statusText}
          </p>
        `:U}
        <div class="explanation-text" part="text" tabindex="0"> ${this.explanationText}
        </div>
        <p class="continue-prompt" part="prompt">(Toca para continuar ...)</p> </div>
    `}};ce.styles=V`
    :host {
      /* El host cubre toda la pantalla dinámica y tiene padding */
      display: flex; position: fixed; inset: 0; width: 100%; height: 100dvh;
      justify-content: center; align-items: center; text-align: center;
      z-index: 101; padding: 1rem; box-sizing: border-box;
      opacity: 0; visibility: hidden; pointer-events: none;
      transition: opacity 0.4s ease-in-out, visibility 0s linear 0.4s;
      font-family: var(--gq-font-primary, 'Poppins', sans-serif);
    }
    :host([visible]) {
      opacity: 1; visibility: visible; pointer-events: auto;
      transition: opacity 0.4s ease-in-out, visibility 0s linear 0s;
    }

    /* --- INICIO CAMBIOS CSS --- */
    .overlay-content-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 90%;
      max-width: 650px;
      /* Cambiamos max-height a porcentaje relativo al host (que tiene padding) */
      max-height: 90%;
      /* min-height: 150px; /* Quitamos min-height para simplificar */
      box-sizing: border-box;
      pointer-events: auto;
      background-color: var(--gq-expl-bg, rgba(17, 24, 39, 0.85));
      border: var(--gq-expl-border, 1px solid rgba(75, 85, 99, 0.5));
      padding: clamp(1rem, 3vh, 1.5rem) clamp(1rem, 4vw, 2rem);
      border-radius: var(--gq-expl-border-radius, 0.75rem);
      /* overflow: hidden; /* Quitamos esto */
    }

    .explanation-status-base {
      flex-shrink: 0; /* Evita que el estado se encoja */
      width: auto;
      max-width: 100%;
      box-sizing: border-box;
      font-size: clamp(1.1rem, 3vw + 0.5rem, 1.4rem); font-weight: 800; margin-bottom: clamp(0.6rem, 2.5vh, 0.8rem);
      padding: 0.3rem 0.8rem; border-radius: 0.5rem; display: inline-block;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5); line-height: 1.3;
      color: var(--gq-expl-text-color, white); position: relative; z-index: 1;
    }
    /* ... Clases status-correct, status-incorrect, status-shield ... */
    .status-correct { background-color: var(--gq-expl-status-correct-bg, rgba(16, 185, 129, 0.8)); border: var(--gq-expl-status-correct-border, 1px solid #34d399); }
    .status-incorrect { background-color: var(--gq-expl-status-incorrect-bg, rgba(239, 68, 68, 0.8)); border: var(--gq-expl-status-incorrect-border, 1px solid #f87171); }
    .status-shield { background-color: var(--gq-expl-status-shield-bg, rgba(59, 130, 246, 0.8)); border: var(--gq-expl-status-shield-border, 1px solid #93c5fd); }


    .explanation-text {
      flex-grow: 1; /* Debe crecer */
      flex-shrink: 1; /* Debe poder encogerse */
      min-height: 0;  /* Fundamental para que flex-shrink funcione */
      overflow-y: auto; /* Scroll interno vertical */
      width: 100%;
      box-sizing: border-box;
      position: relative; z-index: 1;
      pointer-events: auto;
      color: var(--gq-expl-text-color, white); font-size: clamp(0.9rem, 2.5vw + 0.4rem, 1.1rem);
      line-height: 1.5; font-weight: 600; text-shadow: var(--gq-expl-text-shadow, 1px 1px 3px rgba(0,0,0,0.7));
      background-color: transparent; border: none;
      padding-top: 0.5rem; padding-bottom: 0.5rem; /* Padding interno para el scroll */
      scrollbar-width: thin;
      scrollbar-color: rgba(150,150,150,0.5) transparent;
    }
    .explanation-text::-webkit-scrollbar { width: 6px; }
    .explanation-text::-webkit-scrollbar-thumb { background-color: rgba(150,150,150,0.5); border-radius: 3px; }
    .explanation-text::-webkit-scrollbar-track { background: transparent; }

    .continue-prompt {
      flex-shrink: 0; /* Evita que el prompt se encoja */
      margin-top: clamp(0.8rem, 3vh, 1.2rem); font-size: clamp(0.7rem, 1.5vw + 0.3rem, 0.85rem);
      color: var(--gq-expl-prompt-text-color, rgba(229, 231, 235, 0.7)); font-weight: 400;
      text-shadow: 1px 1px 2px rgba(0,0,0,0.5); animation: fadeInOut 2s infinite ease-in-out;
      position: relative; z-index: 1;
      pointer-events: none;
    }
    /* --- FIN CAMBIOS CSS --- */

    @keyframes fadeInOut { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
  `;ye([z({type:String})],ce.prototype,"explanationText",2);ye([z({type:String})],ce.prototype,"resultType",2);ye([z({type:Boolean})],ce.prototype,"isVisible",2);ye([N()],ce.prototype,"_statusText",2);ye([N()],ce.prototype,"_statusIcon",2);ye([N()],ce.prototype,"_statusClass",2);ye([ie(".overlay-content-wrapper")],ce.prototype,"_contentWrapper",2);ce=ye([Q("explanation-overlay-component")],ce);const Mt=1,cn=10,Et=2,dn=10,la=1,hn=20;class un{constructor(e){this.currentUIElements={},this.optionClickCallback=null,this.explanationConfirmListener=null,this.externalConfirmCallback=null,this.lastShownResultType=null,this.gameManager=e,console.log("UIManager Creado.")}buildQuizInterface(e,a,o,i){var r;if(!e){console.error("UIManager: Intento de construir UI sin pregunta.");return}this.clearQuizInterface(a),this.optionClickCallback=o;const t={optionButtons:[]},n=this.gameManager.getPlayerData();try{const u=document.createElement("quiz-ui-container");a.appendChild(u),t.quizUiContainer=u;const c=document.createElement("lives-display");c.lives=this.gameManager.getLives(),c.hasShield=n.hasShield,c.hintCharges=n.hintCharges,c.slot="lives-display",u.appendChild(c),t.livesDisplay=c;const f=document.createElement("score-display");f.score=n.score,f.combo=i,f.slot="score-display",u.appendChild(f),t.scoreDisplay=f;const p=document.createElement("div");p.id="ink-label",p.className="ink-label-base hidden",p.textContent="Tinta",p.slot="ink-label",u.appendChild(p),t.inkLabel=p;const s=document.createElement("ink-bar");s.currentInk=n.currentInk,s.maxInkPerBar=n.INK_BAR_CAPACITY,s.classList.add("hidden"),s.slot="ink-bar",u.appendChild(s),t.inkBarContainer=s;const d=document.createElement("quiz-question-display");d.difficulty=e.difficulty,d.questionText=e.text,d.slot="question-display",u.appendChild(d),t.questionBox=d;const h=[...e.options];for(let y=h.length-1;y>0;y--){const w=Math.floor(Math.random()*(y+1));[h[y],h[w]]=[h[w],h[y]]}console.log(`[UIManager] Opciones mezcladas para pregunta ${e.id}. Orden original:`,e.options.map(y=>y.key),"Orden mezclado:",h.map(y=>y.key)),h.forEach(y=>{if(!(y!=null&&y.key)||typeof y.text>"u"){console.warn("Opción de pregunta inválida:",y);return}const w=document.createElement("quiz-option-button");w.optionKey=y.key,w.optionText=y.text,w.disabled=!1,w.hinted=!1,w.slot="options",w.addEventListener("option-selected",E=>{var v;const A=E;this.optionClickCallback&&((v=A.detail)!=null&&v.key)&&this.optionClickCallback(A.detail.key)}),u.appendChild(w),t.optionButtons.push(w)});const m=document.createElement("feedback-area");m.slot="feedback-area",u.appendChild(m),t.feedbackArea=m,t.explanationOverlayComponent=document.getElementById("explanation-overlay-component"),t.blurBackdrop=document.getElementById("blur-backdrop"),console.log(`[UIManager] buildQuizInterface: explanationOverlayComponent encontrado? ${!!t.explanationOverlayComponent}, blurBackdrop encontrado? ${!!t.blurBackdrop}`),t.explanationOverlayComponent&&console.log(`[UIManager] buildQuizInterface: Overlay Instance ID: ${t.explanationOverlayComponent.id}`),t.blurBackdrop?t.blurBackdrop instanceof HTMLElement&&"visible"in t.blurBackdrop||(console.error("UIManager: El elemento #blur-backdrop NO es una instancia válida de BlurBackdropComponent."),t.blurBackdrop=null):console.warn("UIManager: Componente <blur-backdrop-component> no encontrado al construir UI.")}catch(u){console.error("Error crítico construyendo la interfaz del quiz:",u),a.innerHTML='<p style="color: red; text-align: center; padding: 1rem;">Error al construir la interfaz. Revisa consola.</p>';return}this.currentUIElements=t,this.updateScoreDisplay(n.score),this.updateLivesDisplay(this.gameManager.getLives()),this.updateShieldIcon(n.hasShield),this.updateHintIcon(n.hintCharges),this.updateInkBar(),this.updateInkVisibility(n.isDrawingUnlocked),t.questionBox&&this.updateDifficultyLabel(e.difficulty),this.updateComboVisuals(i),this.updateCatFoodBar(n.currentCatFood,n.getMaxCatFood()),this.toggleCatFoodUIVisibility(n.isCatFoodUnlocked),this.updateFeedback("",null);const l=(r=this.gameManager.getThemeManager())==null?void 0:r.getActiveTheme();this.applyThemeStylesToNonLitElements(l?l.elements:null)}applyThemeStylesToNonLitElements(e){const a=this.currentUIElements.inkLabel;if(a&&(e!=null&&e.inkLabel)){const o=e.inkLabel;if(o.themeClass){a.className="ink-label-base";const i=a.classList.contains("hidden");o.themeClass.split(" ").filter(t=>t).forEach(t=>{a.classList.contains(t)||a.classList.add(t)}),i&&a.classList.add("hidden")}o.text!==void 0&&a.textContent!==o.text&&(a.textContent=o.text),this.updateInkVisibility(this.gameManager.getPlayerData().isDrawingUnlocked)}}clearQuizInterface(e){this.removeExplanationListener(),this.currentUIElements={},this.optionClickCallback=null;const a=e.querySelector("quiz-ui-container");a&&e.removeChild(a)}updateComboVisuals(e){var E;const a=document.documentElement,o=document.querySelector("combo-counter"),i=(E=this.currentUIElements)==null?void 0:E.scoreDisplay;if(!a)return;const t=e<Mt?0:Math.min((e-Mt+1)/(cn-Mt+1),1);a.style.setProperty("--flare-intensity",t.toFixed(3));const n=e<Et?0:Math.min((e-Et+1)/(dn-Et+1),1);a.style.setProperty("--element-glow-intensity",n.toFixed(3)),o&&(o.combo=e),i&&(i.combo=e);const l=Math.min(Math.max(0,e-la)/(hn-la),1),r=l*l,u=getComputedStyle(a),c=parseFloat(u.getPropertyValue("--gq-body-bg-combo-hue-base").trim()||"220"),f=parseFloat(u.getPropertyValue("--gq-body-bg-combo-saturation-base").trim()||"30"),p=parseFloat(u.getPropertyValue("--gq-body-bg-combo-saturation-factor").trim()||"50"),s=parseFloat(u.getPropertyValue("--gq-body-bg-combo-lightness-base").trim()||"10"),d=parseFloat(u.getPropertyValue("--gq-body-bg-combo-lightness-factor").trim()||"15"),h=parseFloat(u.getPropertyValue("--gq-combo-color-hue-increment").trim()||"10"),m=(c+e*h)%360,y=f+r*p,w=s+r*d;document.body.style.backgroundColor=`hsl(${m.toFixed(0)}, ${y.toFixed(0)}%, ${w.toFixed(0)}%)`}updateScoreDisplay(e){var a,o;(o=(a=this.currentUIElements)==null?void 0:a.scoreDisplay)==null||o.setAttribute("score",e.toString())}updateLivesDisplay(e){var a,o;(o=(a=this.currentUIElements)==null?void 0:a.livesDisplay)==null||o.setAttribute("lives",e.toString())}updateShieldIcon(e){var a,o;(o=(a=this.currentUIElements)==null?void 0:a.livesDisplay)==null||o.toggleAttribute("hasShield",e)}updateHintIcon(e){var a,o;(o=(a=this.currentUIElements)==null?void 0:a.livesDisplay)==null||o.setAttribute("hintCharges",e.toString())}updateInkBar(){var a;const e=(a=this.currentUIElements)==null?void 0:a.inkBarContainer;e&&(e.currentInk=this.gameManager.getPlayerData().currentInk)}updateInkVisibility(e){var a,o,i,t;(o=(a=this.currentUIElements)==null?void 0:a.inkLabel)==null||o.classList.toggle("hidden",!e),(t=(i=this.currentUIElements)==null?void 0:i.inkBarContainer)==null||t.classList.toggle("hidden",!e)}updateDifficultyLabel(e){var a,o;(o=(a=this.currentUIElements)==null?void 0:a.questionBox)==null||o.setAttribute("difficulty",String(e))}updateFeedback(e,a){var i;const o=(i=this.currentUIElements)==null?void 0:i.feedbackArea;o&&(o.message=e,o.type=a),this.lastShownResultType=a}disableOptions(){var e;(e=this.currentUIElements.optionButtons)==null||e.forEach(a=>{a&&(a.disabled=!0)})}enableOptions(){var e;(e=this.currentUIElements.optionButtons)==null||e.forEach(a=>{a&&(a.disabled=a.hinted)})}applyHintVisuals(e){let a=0;const o=1,i=this.currentUIElements.optionButtons;if(!i||i.length<=1)return;[...i].sort(()=>.5-Math.random()).forEach(n=>{a>=o||n&&n.optionKey!==e&&!n.hinted&&(n.hinted=!0,a++)})}toggleCatFoodUIVisibility(e){const a=this.gameManager.getControlElements().catFoodUiContainer;a&&a.classList.toggle("hidden",!e)}updateCatFoodBar(e,a){const o=this.gameManager.getControlElements().catFoodToolButton;if(o){const i=a>0?Math.max(0,Math.min(100,e/a*100)):0;o.progressPercentage=i}}showExplanation(e,a,o){var n,l;console.log("[UIManager] showExplanation llamada.");const i=(n=this.currentUIElements)==null?void 0:n.explanationOverlayComponent,t=(l=this.currentUIElements)==null?void 0:l.blurBackdrop;if(i){this.externalConfirmCallback=a;const r=o==="info"||o===void 0?null:o;i.explanationText=e,i.resultType=r,i.isVisible=!0,console.log("[UIManager] Añadiendo listener 'confirm-clicked' a overlayComponent..."),this.addExplanationListener(i),t?t.visible=!0:console.warn("[UIManager] BackdropComponent no encontrado al intentar hacerlo visible."),console.log("[UIManager] showExplanation: Propiedad isVisible del overlay establecida a true.")}else console.warn("UIManager: Componente de explicación no encontrado, confirmando directamente."),a()}hideExplanation(){var i,t,n;console.log("[UIManager] --> hideExplanation() LLAMADA <--");const e=(i=this.currentUIElements)==null?void 0:i.explanationOverlayComponent,a=(t=this.currentUIElements)==null?void 0:t.blurBackdrop;console.log("[UIManager] hideExplanation: Removiendo listener..."),this.removeExplanationListener();const o=((n=this.gameManager.getShopManager())==null?void 0:n.isShopOpen())??!1;a&&!o?(console.log("[UIManager] hideExplanation: Estableciendo backdrop.visible = false"),a.visible=!1):a?o&&console.log("[UIManager] hideExplanation: No ocultando backdrop porque la tienda está visible."):console.warn("[UIManager] hideExplanation: backdropComponent no encontrado."),e?e.isVisible=!1:console.warn("[UIManager] hideExplanation: overlayComponent no encontrado."),console.log("[UIManager] hideExplanation FINALIZADA.")}addExplanationListener(e){if(this.removeExplanationListener(),!e||!this.externalConfirmCallback){console.warn("[UIManager] No se pudo añadir listener: overlayComponent o externalConfirmCallback es null.");return}this.explanationConfirmListener=()=>{if(console.log("[UIManager] >> LISTENER 'confirm-clicked' RECIBIDO <<"),this.externalConfirmCallback)try{console.log("[UIManager] Llamando a externalConfirmCallback..."),this.externalConfirmCallback(),console.log("[UIManager] externalConfirmCallback finalizado.")}catch(a){console.error("[UIManager] Error en callback onConfirm:",a)}else console.warn("[UIManager] 'confirm-clicked' recibido pero externalConfirmCallback es null.");this.hideExplanation()},e.addEventListener("confirm-clicked",this.explanationConfirmListener),console.log("[UIManager] Listener 'confirm-clicked' AÑADIDO a:",e.id)}removeExplanationListener(){var a;const e=(a=this.currentUIElements)==null?void 0:a.explanationOverlayComponent;e&&this.explanationConfirmListener&&(e.removeEventListener("confirm-clicked",this.explanationConfirmListener),console.log("[UIManager] Listener 'confirm-clicked' REMOVIDO de:",e.id)),this.explanationConfirmListener=null}isExplanationVisible(){var a;const e=(a=this.currentUIElements)==null?void 0:a.explanationOverlayComponent;return(e==null?void 0:e.isVisible)??!1}rebuildInterface(){const e=this.gameManager.getCurrentState();if(e instanceof xe&&e.currentQuestion){const a=this.gameManager.getContainerElement();if(a){const o=this.isExplanationVisible(),i=this.externalConfirmCallback,t=this.lastShownResultType;if(this.buildQuizInterface(e.currentQuestion,a,e.handleOptionClick.bind(e),e.consecutiveCorrectAnswers),e.hintAppliedToQuestionId===e.currentQuestion.id&&this.gameManager.getPlayerData().hintCharges>0&&this.applyHintVisuals(e.currentQuestion.correctAnswerKey),o&&e.currentQuestion.explanation){console.log("[UIManager] Reconstruyendo interfaz: Restaurando explicación visible.");const l=i??(()=>{console.warn("[UIManager] Callback por defecto ejecutado al reconstruir interfaz con expl visible.");const r=this.gameManager.getStateMachine().getCurrentState();r instanceof xe&&r.proceedToNextStep()});this.showExplanation(e.currentQuestion.explanation,l,t)}}}}}class pn{constructor(e="body"){this.themes=[],this.activeThemeIndex=0,this.defaultThemeId="default-clean",this.isLoading=!1,this.lastError=null,this.rootElement=document.body,this.masterCssVariableList=[],console.log("ThemeManager Creado.");const a=document.querySelector(e);a instanceof HTMLElement?this.rootElement=a:(console.warn(`ThemeManager: Elemento raíz '${e}' no encontrado, usando document.body.`),this.rootElement=document.body)}async loadThemesData(e){if(this.isLoading)return console.warn("ThemeManager: Ya hay una carga en progreso."),!1;console.log("ThemeManager: Procesando datos de temas pre-cargados..."),this.isLoading=!0,this.lastError=null,this.themes=[];try{if(!Array.isArray(e)||e.length===0)throw new Error("Los datos de temas proporcionados no son un array válido o están vacíos.");for(const o of e){if(!o.id||!o.name||!o.cssVariables||typeof o.cssVariables!="object"){console.warn("ThemeManager: Tema inválido o sin cssVariables, omitiendo:",o);continue}this.themes.push(o)}if(this.themes.length===0)throw new Error("No se cargaron temas válidos (todos carecían de cssVariables).");const a=this.themes.find(o=>o.id===this.defaultThemeId)||this.themes[0];return a!=null&&a.cssVariables?(this.masterCssVariableList=Object.keys(a.cssVariables),console.log(`ThemeManager: Lista maestra de ${this.masterCssVariableList.length} variables CSS generada desde el tema '${a.id}'.`)):console.warn("ThemeManager: No se pudo generar la lista maestra de variables CSS (primer tema válido sin cssVariables)."),this.activeThemeIndex=Math.max(0,this.themes.findIndex(o=>o.id===this.defaultThemeId)),this.themes.findIndex(o=>o.id===this.defaultThemeId)===-1&&this.themes.length>0&&(console.warn(`ThemeManager: Tema por defecto '${this.defaultThemeId}' no encontrado. Usando el primer tema de la lista.`),this.activeThemeIndex=0),console.log(`ThemeManager: ${this.themes.length} temas procesados exitosamente.`),this.isLoading=!1,this.applyActiveTheme(),!0}catch(a){return console.error("ThemeManager: Error al procesar los datos de temas:",a),this.lastError=a instanceof Error?a.message:String(a),this.isLoading=!1,this.themes=[],this.activeThemeIndex=0,!1}}applyActiveTheme(){const e=this.getActiveTheme();this._applyThemeCssVariables(e),this._applyRootThemeClass(e),this._dispatchThemeChangedEvent(e)}_applyThemeCssVariables(e){for(const a of this.masterCssVariableList)this.rootElement.style.removeProperty(a);if(e!=null&&e.cssVariables){console.log(`ThemeManager: Aplicando ${Object.keys(e.cssVariables).length} variables CSS para el tema '${e.id}'.`);for(const[a,o]of Object.entries(e.cssVariables))this.rootElement.style.setProperty(a,o)}else console.log("ThemeManager: No hay variables CSS para aplicar (tema null o sin cssVariables), se usarán fallbacks de componentes.")}_applyRootThemeClass(e){var o,i;this.rootElement.className.split(" ").forEach(t=>{t.startsWith("theme-id-")&&this.rootElement.classList.remove(t)});const a=(i=(o=e==null?void 0:e.elements)==null?void 0:o.quizWrapper)==null?void 0:i.themeClass;a&&(this.rootElement.classList.add(a),console.log(`ThemeManager: Clase de tema global '${a}' aplicada a ${this.rootElement.tagName}.`))}_dispatchThemeChangedEvent(e){const a=new CustomEvent("theme-changed",{detail:{themeId:e==null?void 0:e.id,theme:e},bubbles:!0,composed:!0});document.dispatchEvent(a),console.log(`ThemeManager: Evento 'theme-changed' despachado para el tema '${(e==null?void 0:e.id)??"null"}'.`)}getActiveTheme(){return this.themes.length===0?null:this.themes[this.activeThemeIndex]??null}getActiveThemeId(){var e;return((e=this.getActiveTheme())==null?void 0:e.id)??null}cycleTheme(){if(this.themes.length<=1)return;this.activeThemeIndex=(this.activeThemeIndex+1)%this.themes.length,this.applyActiveTheme();const e=this.getActiveTheme();console.log(`ThemeManager: Tema ciclado a '${(e==null?void 0:e.name)??"N/A"}' (ID: ${(e==null?void 0:e.id)??"N/A"})`)}setActiveTheme(e){var o;const a=this.themes.findIndex(i=>i.id===e);return a!==-1?(this.activeThemeIndex===a||(this.activeThemeIndex=a,this.applyActiveTheme(),console.log(`ThemeManager: Tema establecido a '${(o=this.getActiveTheme())==null?void 0:o.name}' (ID: ${e})`)),!0):(console.warn(`ThemeManager: No se encontró el tema con ID '${e}'.`),!1)}getThemes(){return[...this.themes]}getLastError(){return this.lastError}isLoadingThemes(){return this.isLoading}}var gn=Object.getOwnPropertyDescriptor,fn=(g,e,a,o)=>{for(var i=o>1?void 0:o?gn(e,a):e,t=g.length-1,n;t>=0;t--)(n=g[t])&&(i=n(i)||i);return i};let At=class extends B{render(){return R``}};At.styles=V`
    :host {
      display: block; 
      position: absolute; 
      width: var(--gq-food-pellet-size, 8px);
      height: var(--gq-food-pellet-size, 8px);
      background-color: var(--gq-food-pellet-bg-color, #A0522D); 
      border-radius: 50%;
      z-index: var(--gq-food-pellet-z-index, 12);
      pointer-events: none; 
      box-shadow: var(--gq-food-pellet-shadow, 0px 1px 2px rgba(0, 0, 0, 0.5));
      will-change: transform, opacity; /* Añadido opacity */

      /* Estilos iniciales para animación de aparición */
      opacity: 0;
      transform: scale(0.3) translate(-166%, -166%); /* Moverlo fuera de la vista inicial y escalado pequeño */
                                                     /* El translate es -100% / 0.3 (escala) para compensar */
      transition: opacity 0.25s ease-out, transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    /* Estado cuando el pellet ha aparecido */
    :host(.spawned) {
      opacity: 1;
      /* El transform de posición se aplicará directamente en el style por CatFoodManager */
      /* Solo necesitamos resetear la escala de la animación de aparición */
      transform: scale(1); 
    }

    /* Clase intermedia para asegurar que la posición se aplique antes de la animación */
    :host(.appearing) {
        opacity: 0;
        /* Mantenemos la escala pequeña, pero la posición ya estará correcta (aplicada por style.transform) */
        transform: scale(0.3); 
    }
  `;At=fn([Q("food-pellet-display")],At);const ca=8,mn=3500,vn=8,yn=2,bn=4e-4,xn=500*500,Cn=1,wn=300;class Sn{constructor(e){this.isInitializedSuccessfully=!1,this.isEnabled=!1,this.isActive=!1,this.activePellets=new Map,this.nextPelletId=0,this.clickListener=null,this.lastToggleTime=0,this.CATFOOD_TOGGLE_DEBOUNCE=200,this.gameManager=e}setCatDisplayArea(e){if(!e)throw console.error("CatFoodManager CRITICAL: Se intentó setear un CatDisplayArea nulo."),new Error("CatDisplayArea es nulo y es requerido por CatFoodManager.");this.catDisplayArea=e}init(){this.isInitializedSuccessfully=!1;try{if(this.physicsManager=this.gameManager.getPhysicsManager(),this.playerData=this.gameManager.getPlayerData(),this.catManager=this.gameManager.getCatManager(),this.audioManager=this.gameManager.getAudioManager(),!this.catDisplayArea)throw new Error("CatDisplayArea no ha sido seteado en CatFoodManager.");if(!this.physicsManager)throw new Error("PhysicsManager no disponible en CatFoodManager.");if(!this.playerData)throw new Error("PlayerData no disponible en CatFoodManager.");if(!this.catManager)throw new Error("CatManager no disponible en CatFoodManager.");if(!this.audioManager)throw new Error("AudioManager no disponible en CatFoodManager.");this.isInitializedSuccessfully=!0}catch(e){console.error("CatFoodManager: Error CRÍTICO durante la inicialización de dependencias:",e),this.isEnabled=!1}}enable(){if(!this.isInitializedSuccessfully){console.error("CatFoodManager: No se puede habilitar, la inicialización falló o las dependencias no están listas.");return}this.isEnabled||(this.isEnabled=!0,console.log("CatFoodManager: Funcionalidad de comida para gatos habilitada."))}toggleActive(e){if(!this.isEnabled||!this.isInitializedSuccessfully||!this.playerData)return;const a=Date.now();if(e===void 0&&a-this.lastToggleTime<this.CATFOOD_TOGGLE_DEBOUNCE)return;this.lastToggleTime=a;const o=e!==void 0?e:!this.isActive;if(o===!0&&this.playerData.currentCatFood<=0){this.isActive&&(this.isActive=!1,this.gameManager.setQuizUiFaded(!1),this.updateListenerAndCursor(),this.gameManager.updateToolButtonStates());return}o!==this.isActive&&(this.isActive=o,this.gameManager.setQuizUiFaded(this.isActive),this.updateListenerAndCursor(),this.gameManager.updateToolButtonStates())}updateListenerAndCursor(){this.catDisplayArea&&(this.catDisplayArea.style.cursor=this.isActive?"copy":""),this.isActive?this.addClickListener():this.removeClickListener()}addClickListener(){if(this.clickListener||!this.isInitializedSuccessfully||!this.catDisplayArea)return;const e=this.catDisplayArea;this.clickListener=a=>{if(!this.isActive||!this.isEnabled||!this.playerData)return;const o=this.catDisplayArea.getInternalContainer();if(!(a.target!==e&&a.target!==o))if(a.preventDefault(),this.playerData.currentCatFood>0){const i=this.getClickPosition(a,e);this.spawnFoodPellet(i),this.applyAttractionForce(i),this.playerData.spendCatFoodUnit()?this.gameManager.updateCatFoodUI():this.toggleActive(!1)}else this.toggleActive(!1)},e.addEventListener("mousedown",this.clickListener),e.addEventListener("touchstart",this.clickListener,{passive:!1})}removeClickListener(){if(!this.clickListener||!this.catDisplayArea)return;const e=this.catDisplayArea;e.removeEventListener("mousedown",this.clickListener),e.removeEventListener("touchstart",this.clickListener),this.clickListener=null,e.style.cursor=""}getClickPosition(e,a){const o=a.getBoundingClientRect();let i=0,t=0;return e instanceof MouseEvent?(i=e.clientX,t=e.clientY):e.touches&&e.touches.length>0?(i=e.touches[0].clientX,t=e.touches[0].clientY):e.changedTouches&&e.changedTouches.length>0&&(i=e.changedTouches[0].clientX,t=e.changedTouches[0].clientY),{x:i-o.left,y:t-o.top}}applyAttractionForce(e){var i;if(!this.catManager||!((i=this.physicsManager)!=null&&i.getWorld))return;const a=this.catManager.getAllCats(),o=this.physicsManager.getWorld();a.forEach(t=>{if(t.physics.body&&!t.physics.body.isStatic&&L.Composite.get(o,t.physics.body.id,"body")){const n=t.physics.body,l=L.Vector.sub(e,n.position),r=L.Vector.magnitudeSquared(l);if(r>1&&r<xn){const u=Math.sqrt(r),c=bn*n.mass/(u*.1+1),f=L.Vector.mult(L.Vector.normalise(l),c);try{L.Body.applyForce(n,n.position,f)}catch{}}}})}spawnFoodPellet(e){var l,r;if(!this.isInitializedSuccessfully||!((l=this.physicsManager)!=null&&l.getWorld)||!this.catDisplayArea||!this.playerData){console.warn("CatFoodManager: No se puede crear pellet, no inicializado o faltan dependencias.");return}const a=`food_pellet_entity_${this.nextPelletId++}`,o=parseInt(getComputedStyle(document.documentElement).getPropertyValue("--gq-food-pellet-size").trim())||ca,i=L.Bodies.circle(e.x,e.y,o/2,{label:"foodPellet",isSensor:!0,density:1e-4,frictionAir:.02,collisionFilter:{category:vn,mask:yn},plugin:{pelletId:a}});try{L.World.add(this.physicsManager.getWorld(),i)}catch(u){console.error("CatFoodManager: Error añadiendo pellet al mundo físico:",u);return}const t=document.createElement("food-pellet-display");t.id=a;const n=o/2;t.style.transform=`translate(${e.x-n}px, ${e.y-n}px)`,t.classList.add("appearing");try{this.catDisplayArea.addEntityElement(t),t.offsetWidth,requestAnimationFrame(()=>{t.classList.remove("appearing"),t.classList.add("spawned")})}catch(u){console.error("CatFoodManager: Error añadiendo pellet visual a catDisplayArea:",u);try{L.World.remove(this.physicsManager.getWorld(),i)}catch{}return}this.activePellets.set(a,{body:i,element:t,creationTime:performance.now(),id:a}),(r=this.audioManager)==null||r.playSound("draw_end")}update(e){if(!this.isEnabled||!this.isInitializedSuccessfully||this.activePellets.size===0)return;const a=performance.now(),o=[];this.activePellets.forEach(i=>{if(a-i.creationTime>mn)o.push(i.id);else if(i.element&&i.body&&i.element.classList.contains("spawned")){const n=(i.element.offsetWidth||parseInt(getComputedStyle(document.documentElement).getPropertyValue("--gq-food-pellet-size").trim())||ca)/2;i.element.style.transform=`translate(${i.body.position.x-n}px, ${i.body.position.y-n}px)`}}),o.forEach(i=>this.removeFoodPellet(i))}removeFoodPellet(e,a=!1){var i;const o=this.activePellets.get(e);if(o){if((i=this.physicsManager)!=null&&i.getWorld&&o.body)try{L.Composite.get(this.physicsManager.getWorld(),o.body.id,"body")&&L.World.remove(this.physicsManager.getWorld(),o.body)}catch{}this.catDisplayArea&&o.element&&this.catDisplayArea.removeEntityElement(o.element),this.activePellets.delete(e)}}processCatFoodCollision(e,a){var f,p,s;const o=(f=a.plugin)==null?void 0:f.pelletId;if(!o||!this.activePellets.has(o)||!this.catManager||!this.playerData||!this.audioManager||!((p=this.physicsManager)!=null&&p.getWorld))return;const i=this.catManager.bodyIdToEntityIdMap.get(e);if(!i)return;const t=this.catManager.getCat(i);if(!(t!=null&&t.value)||!t.physics.body||!(((s=t.render)==null?void 0:s.element)instanceof B))return;const n=t.render.element,l=t.value.currentSize,r=this.playerData.getCurrentMaxSizeLimit();let u=Math.min(r,wn,l+Cn);const c=u/l;if(c>1.0001){t.value.currentSize=u;try{if(L.Composite.get(this.physicsManager.getWorld(),t.physics.body.id,"body"))L.Body.scale(t.physics.body,c,c),t.physics.body.plugin&&(t.physics.body.plugin.currentSize=u);else throw new Error("Cuerpo del gato no encontrado en el mundo para escalar");n&&typeof n.size=="number"&&(n.size=u)}catch(d){console.error("CatFoodManager: Error al escalar gato después de comer:",d),t.value.currentSize=l,t.physics.body.plugin&&(t.physics.body.plugin.currentSize=l)}}this.audioManager.playSound("eat"),this.removeFoodPellet(o,!0)}destroy(){this.removeClickListener(),Array.from(this.activePellets.keys()).forEach(a=>this.removeFoodPellet(a)),this.activePellets.clear(),this.isEnabled=!1,this.isActive=!1,this.isInitializedSuccessfully=!1,this.catDisplayArea&&(this.catDisplayArea.style.cursor="")}}class Mn{constructor(e){this.gameManager=e}enter(e){console.log("LoadingState: enter",e),this.gameManager.setBodyStateClass("loading")}exit(){console.log("LoadingState: exit")}update(e){}}var En=Object.defineProperty,An=Object.getOwnPropertyDescriptor,se=(g,e,a,o)=>{for(var i=o>1?void 0:o?An(e,a):e,t=g.length-1,n;t>=0;t--)(n=g[t])&&(i=(o?n(e,a,i):n(i))||i);return o&&i&&En(e,a,i),i};let J=class extends B{constructor(){super(...arguments),this.gameData={title:"GatoQuiz Interactivo",version:"1.0.0",highScore:0,lastScore:0},this.loadingMessages=["Desenredando la diversión...","Preparando las croquetas virtuales...","Afilando las garras para el quiz..."],this._isLoading=!1,this._contentFadingOut=!1,this._currentLoadingMessage="Cargando...",this.sparkleIntervalId=null,this.hasStarted=!1}firstUpdated(g){super.firstUpdated(g),this.shadowRoot&&this.startSparkleEffect(),this.ensureFontsLoaded()}connectedCallback(){if(super.connectedCallback(),typeof CSS<"u"&&CSS.registerProperty)try{CSS.registerProperty({name:"--hue1",syntax:"<angle>",initialValue:"0deg",inherits:!1}),CSS.registerProperty({name:"--hue2",syntax:"<angle>",initialValue:"300deg",inherits:!1})}catch(g){console.warn(" mainMenuScreen: Error registrando @property CSS:",g)}this._selectRandomLoadingMessage()}disconnectedCallback(){super.disconnectedCallback(),this.sparkleIntervalId&&(clearTimeout(this.sparkleIntervalId),this.sparkleIntervalId=null)}_selectRandomLoadingMessage(){if(this.loadingMessages&&this.loadingMessages.length>0){const g=Math.floor(Math.random()*this.loadingMessages.length);this._currentLoadingMessage=this.loadingMessages[g]}else this._currentLoadingMessage="Cargando..."}async _handleScreenClick(g){if(this.hasStarted)return;this.hasStarted=!0,g.type==="touchstart"&&g.preventDefault(),console.log("MainMenuScreen: Click/Tap detectado. Iniciando secuencia de carga..."),this._selectRandomLoadingMessage(),this.sparkleIntervalId&&(clearTimeout(this.sparkleIntervalId),this.sparkleIntervalId=null),this._sparkleContainer&&(this._sparkleContainer.innerHTML=""),this._pawWrapper&&this._pawWrapper.classList.add("content-hidden"),this._titleAmpersand&&this._titleAmpersand.classList.add("content-hidden");const e=500;await new Promise(o=>setTimeout(o,e)),this._loadingMessageContainer&&this._loadingMessageContainer.classList.add("visible"),console.log("MainMenuScreen: Contenido principal oculto, mostrando spinner.");const a=2500;await new Promise(o=>setTimeout(o,a)),console.log("MainMenuScreen: Duración de carga artificial completada. Solicitando inicio del juego."),this.dispatchEvent(new CustomEvent("start-game-requested",{bubbles:!0,composed:!0}))}startSparkleEffect(){const g=()=>{if(!this._sparkleContainer||!this._sparkleSvgTemplate)return;const a=this._sparkleSvgTemplate.cloneNode(!0);a.removeAttribute("id"),a.style.display="block",a.classList.add("sparkle-instance");const o=this.getBoundingClientRect(),i=o.width,t=o.height,n=this._sparkleContainer.appendChild(a.cloneNode(!0)),l=getComputedStyle(n),r=parseFloat(l.width),u=parseFloat(l.height);this._sparkleContainer.removeChild(n);const c=Math.random()*(t-u),f=Math.random()*(i-r);a.style.position="absolute",a.style.top=`${c}px`,a.style.left=`${f}px`,this._sparkleContainer.appendChild(a),setTimeout(()=>{a.parentNode===this._sparkleContainer&&this._sparkleContainer.removeChild(a)},500)},e=()=>{if(!this.isConnected)return;g();const a=Math.random()*150+50;this.sparkleIntervalId=window.setTimeout(e,a)};this.sparkleIntervalId&&clearTimeout(this.sparkleIntervalId),e()}ensureFontsLoaded(){document.fonts&&Promise.all([document.fonts.load("1em Pacifico"),document.fonts.load("1em Geist"),document.fonts.load("1em Poppins")]).then(()=>{}).catch(g=>{console.warn("MainMenuScreen: Error esperando fuentes:",g)})}render(){const g=Ua`
      <svg id="sparkle-svg-template-internal" style="display: none;" width="50px" height="50px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <defs><style>.cls-sparkle-internal{fill:none;stroke-miterlimit:10; stroke: #fff845; stroke-width: 2px;}</style></defs>
        <line class="cls-sparkle-internal" x1="12" y1="0.5" x2="12" y2="5.29"></line>
        <line class="cls-sparkle-internal" x1="12" y1="18.71" x2="12" y2="23.5"></line>
        <line class="cls-sparkle-internal" x1="23.5" y1="12" x2="18.71" y2="12"></line>
        <line class="cls-sparkle-internal" x1="5.29" y1="12" x2="0.5" y2="12"></line>
        <line class="cls-sparkle-internal" x1="20.13" y1="3.87" x2="16.74" y2="7.26"></line>
        <line class="cls-sparkle-internal" x1="7.26" y1="16.74" x2="3.87" y2="20.13"></line>
        <line class="cls-sparkle-internal" x1="20.13" y1="20.13" x2="16.74" y2="16.74"></line>
        <line class="cls-sparkle-internal" x1="7.26" y1="7.26" x2="3.87" y2="3.87"></line>
      </svg>
    `;return R`
      <div class="paw-wrapper" @click=${this._handleScreenClick} @touchstart=${this._handleScreenClick}>
        <div class="rainbow-circle">
          <div class="circle-content"></div>
        </div>
        <div class="container-invisible">
          <div class="title-container">
            <h1 class="title-shadow">Whiskers</h1>
            <h1 class="title-shadow">Wisdom</h1>
            <span class="animate-paw-wiggle paw-1">🐾</span>
            <span class="animate-paw-wiggle paw-2">🐾</span>
          </div>
          <div class="fading-click-text"> &lt;HAZ CLICK O TOCA&gt;</div>
        </div>
        <div id="sparkle-container-internal"></div>
        ${g}
      </div>

      <div class="loading-message-container">
          <div class="yarn-spinner"></div>
          <span class="loading-text">${this._currentLoadingMessage}</span>
      </div>

      <span class="title-ampersand">&</span>
    `}};J.styles=V`
    :host {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      overflow: hidden;
      cursor: pointer;
      font-family: "Geist", sans-serif;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      pointer-events: auto;
      z-index: 10;
      --hue1: 0deg;
      --hue2: 300deg;
      background-image:
        linear-gradient(
          in oklch longer hue to right,
          oklch(0.93 0.08 var(--hue1) / 50%),
          oklch(0.93 0.08 var(--hue2) / 50%)
        ),
        linear-gradient(
          in oklch longer hue to bottom,
          oklch(0.93 0.08 var(--hue1) / 50%),
          oklch(0.93 0.08 var(--hue2) / 50%)
        );
      background-size: 100% 100%;
      animation-name: anim_bg_host;
      animation-duration: 5s;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
      text-align: center;
      padding: 0.5rem;
      box-sizing: border-box;
    }

    :host::before {
      content: "";
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M64.6 15.4c-1.1-1.1-2.9-1.1-4 0L50 26.1 39.4 15.4c-1.1-1.1-2.9-1.1-4 0-1.1 1.1-1.1 2.9 0 4L46.1 30 35.4 40.6c-1.1 1.1-1.1 2.9 0 4 0.5 0.5 1.2 0.8 2 0.8s1.5-0.3 2-0.8L50 33.9l10.6 10.6c0.5 0.5 1.2 0.8 2 0.8s1.5-0.3 2-0.8c1.1-1.1 1.1-2.9 0-4L53.9 30 64.6 19.4C65.7 18.3 65.7 16.5 64.6 15.4z M24 40c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8S28.4 40 24 40z M40 56c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8S44.4 56 40 56z M56 40c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8S60.4 40 56 40z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E");
      background-size: 120px 120px;
      animation: fallingPaws_host 20s linear infinite;
      z-index: -2;
      opacity: 0.5;
      pointer-events: none;
    }
    :host::after {
      content: "";
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150'%3E%3Cdefs%3E%3Cmask id='pawMaskHost'%3E%3Crect width='100%25' height='100%25' fill='white'/%3E%3Cg fill='black' transform='translate(75 75) scale(0.15)'%3E%3Cpath d='M205.116,153.078c31.534,11.546,69.397-12.726,84.58-54.209c15.174-41.484,1.915-84.462-29.614-96.001 c-31.541-11.53-69.4,12.735-84.582,54.218C160.325,98.57,173.584,141.548,205.116,153.078z'/%3E%3Cpath d='M85.296,219.239c32.987-2.86,56.678-40.344,52.929-83.75c-3.757-43.391-33.545-76.253-66.532-73.409 c-32.984,2.869-56.674,40.36-52.921,83.759C22.53,189.23,52.313,222.091,85.296,219.239z'/%3E%3Cpath d='M342.196,217.768c28.952,17.017,70.552-0.073,92.926-38.154c22.374-38.106,17.041-82.758-11.915-99.774 c-28.951-17.001-70.56,0.097-92.93,38.178C307.905,156.117,313.245,200.768,342.196,217.768z'/%3E%3Cpath d='M497.259,262.912c-18.771-27.271-63.07-29.379-98.954-4.694c-35.892,24.701-49.762,66.822-30.996,94.101 c18.766,27.27,63.069,29.38,98.954,4.686C502.143,332.312,516.021,290.191,497.259,262.912z'/%3E%3Cpath d='M304.511,268.059c-3.58-24.773-18.766-47.366-43.039-58.824c-24.268-11.45-51.365-8.807-72.758,4.169 c-23.646,14.35-38.772,33.096-59.138,41.29c-20.363,8.193-77.4-16.209-112.912,48.278c-25.081,45.548-2.057,103.128,44.962,125.315 c35.738,16.864,64.023,14.981,84.788,24.774c20.762,9.793,37.29,32.83,73.025,49.692c47.018,22.188,106.1,3.362,125.315-44.957 c27.206-68.407-27.897-96.922-34.522-117.85C303.613,319.021,308.47,295.426,304.511,268.059z'/%3E%3C/g%3E%3Cg fill='black' transform='translate(25 30) scale(0.09) rotate(-20)'%3E%3Cpath d='M205.116,153.078c31.534,11.546,69.397-12.726,84.58-54.209c15.174-41.484,1.915-84.462-29.614-96.001 c-31.541-11.53-69.4,12.735-84.582,54.218C160.325,98.57,173.584,141.548,205.116,153.078z'/%3E%3Cpath d='M85.296,219.239c32.987-2.86,56.678-40.344,52.929-83.75c-3.757-43.391-33.545-76.253-66.532-73.409 c-32.984,2.869-56.674,40.36-52.921,83.759C22.53,189.23,52.313,222.091,85.296,219.239z'/%3E%3Cpath d='M342.196,217.768c28.952,17.017,70.552-0.073,92.926-38.154c22.374-38.106,17.041-82.758-11.915-99.774 c-28.951-17.001-70.56,0.097-92.93,38.178C307.905,156.117,313.245,200.768,342.196,217.768z'/%3E%3Cpath d='M497.259,262.912c-18.771-27.271-63.07-29.379-98.954-4.694c-35.892,24.701-49.762,66.822-30.996,94.101 c18.766,27.27,63.069,29.38,98.954,4.686C502.143,332.312,516.021,290.191,497.259,262.912z'/%3E%3Cpath d='M304.511,268.059c-3.58-24.773-18.766-47.366-43.039-58.824c-24.268-11.45-51.365-8.807-72.758,4.169 c-23.646,14.35-38.772,33.096-59.138,41.29c-20.363,8.193-77.4-16.209-112.912,48.278c-25.081,45.548-2.057,103.128,44.962,125.315 c35.738,16.864,64.023,14.981,84.788,24.774c20.762,9.793,37.29,32.83,73.025,49.692c47.018,22.188,106.1,3.362,125.315-44.957 c27.206-68.407-27.897-96.922-34.522-117.85C303.613,319.021,308.47,295.426,304.511,268.059z'/%3E%3C/g%3E%3C/mask%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='white' mask='url(%23pawMaskHost)'/%3E%3C/svg%3E");
      background-size: 150px 150px;
      animation: scrollPawTemplate_host 15s linear infinite;
      z-index: -1;
      pointer-events: none;
    }

    @keyframes anim_bg_host {
      0% { --hue1: 0deg; --hue2: 300deg; }
      100% { --hue1: 360deg; --hue2: 660deg; }
    }
    @keyframes fallingPaws_host {
        0% { background-position: 0px 0px; }
        100% { background-position: 0px 600px; }
    }
    @keyframes scrollPawTemplate_host {
        0% { background-position: 0px 0px; }
        100% { background-position: 300px 300px; }
    }
    @keyframes rainbowRotate {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    @keyframes pawWiggleAbsolute {
      0%, 100% { transform: translate(-50%, -50%) rotate(-5deg) scale(1); }
      50% { transform: translate(-50%, -50%) rotate(5deg) scale(1.05); }
    }
    @keyframes fadeInOut {
      0%, 100% { opacity: 0.4; }
      50% { opacity: 1; }
    }
    @keyframes spin-yarn {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    @keyframes clickSparkle {
      0% { opacity: 0; transform: scale(0); }
      50% { opacity: 1; transform: scale(1.2); }
      100% { opacity: 0; transform: scale(0.8); }
    }

    .paw-wrapper {
      position: relative;
      width: 100%;
      max-width: 45rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      z-index: 1;
      box-sizing: border-box;
      transition: opacity 0.5s ease-out, visibility 0s linear 0.5s;
      opacity: 1;
      visibility: visible;
    }
    .paw-wrapper.content-hidden {
      opacity: 0;
      visibility: hidden;
    }

    .rainbow-circle {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 80vmin;
      height: 80vmin;
      max-width: 90vw;
      max-height: 90vh;
      z-index: -1;
      border-radius: 50%;
      padding: 6px;
      overflow: hidden;
    }
    .rainbow-circle::before {
      content: '';
      display: block;
      position: absolute;
      width: 200%;
      height: 200%;
      top: -50%;
      left: -50%;
      background-image: conic-gradient(from 0deg at 50% 50%, transparent 50%, #fff845, #1cc98c, #24cbde, #57a9f7, #bd52f9, #ebb347);
      animation: rainbowRotate 4s linear infinite;
      z-index: -1;
    }
    .circle-content {
      width: 100%;
      height: 100%;
      background: #fffefa;
      border-radius: 50%;
      position: relative;
      z-index: 1;
      box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.1);
    }

    .container-invisible {
      background: transparent;
      position: relative;
      z-index: 1;
      width: 100%;
      padding: 1rem;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-height: auto;
      box-sizing: border-box;
    }

    .title-container {
      position: relative;
      display: block;
      width: 100%;
      z-index: 1;
      margin-bottom: 0;
      text-align: center;
      line-height: 0.9;
    }
    .title-shadow {
      font-family: 'Pacifico', cursive;
      text-shadow: 2px 2px 0px rgba(255, 255, 255, 0.8), 4px 4px 6px rgba(0, 0, 0, 0.1);
      font-size: clamp(3rem, 16vmin, 11rem);
      position: relative;
      z-index: 1;
      margin: 0;
      color: #ea580c;
      display: block;
      word-break: break-word;
      overflow-wrap: break-word;
      hyphens: auto;
    }

    .title-ampersand {
      font-family: 'Pacifico', cursive;
      font-size: clamp(1.8rem, 11vmin, 5.4rem);
      color: #000000;
      position: fixed;
      top: 50%;
      left: 50%;
      transform-origin: center center;
      animation: pawWiggleAbsolute 1.5s ease-in-out infinite;
      z-index: 3;
      pointer-events: none;
      transition: opacity 0.5s ease-out, visibility 0s linear 0.5s;
      opacity: 1;
      visibility: visible;
    }
    .title-ampersand.content-hidden {
      opacity: 0;
      visibility: hidden;
    }

    .animate-paw-wiggle {
      animation: pawWiggleAbsolute 1.5s ease-in-out infinite;
      position: absolute;
      top: 50%;
      left: 50%;
      transform-origin: center center;
      font-size: clamp(15rem, 60vmin, 30rem);
      line-height: 1;
      z-index: 0;
      pointer-events: none;
    }
    .animate-paw-wiggle.paw-1 {
      color: #ffffff;
      text-shadow: 0 0 15px #fb7185, 0 0 25px #fb7185, 0 0 40px #f472b6;
      transform: translate(-50%, -50%) rotate(-10deg) scale(1);
    }
    .animate-paw-wiggle.paw-2 {
      color: #fb7185;
      opacity: 0.5;
      text-shadow: none;
      transform: translate(-50%, -50%) rotate(15deg) scale(0.95);
      animation-delay: 0.3s;
    }

    .fading-click-text {
      font-family: 'Poppins', sans-serif;
      font-size: clamp(1rem, 4vmin, 1.8rem);
      font-weight: 700;
      color: #000000;
      text-transform: uppercase;
      margin-top: 1.5rem;
      animation: fadeInOut 2.5s infinite ease-in-out;
      position: relative;
      z-index: 1;
    }

    .loading-message-container {
      display: none;
      opacity: 0;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 5;
      transition: opacity 0.3s ease-in;
    }
    .loading-message-container.visible {
      display: flex;
      opacity: 1;
    }

    .yarn-spinner {
      width: clamp(25px, 8vmin, 40px);
      height: clamp(25px, 8vmin, 40px);
      border: clamp(3px, 1.5vmin, 6px) dotted #f97316;
      border-radius: 50%;
      display: inline-block;
      animation: spin-yarn 1.3s linear infinite;
      margin-bottom: 0.5rem;
    }
    .loading-text {
      font-family: "Geist", sans-serif;
      font-size: clamp(1rem, 4vmin, 1.5rem);
      font-weight: 600;
      color: #c2410c;
    }

    #sparkle-container-internal {
      position: absolute;
      top: 0; left: 0;
      width: 100%; height: 100%;
      pointer-events: none;
      z-index: 2;
      overflow: hidden;
    }
    .sparkle-instance {
      position: absolute;
      width: clamp(25px, 10vmin, 50px);
      height: clamp(25px, 10vmin, 50px);
      opacity: 0;
      transform: scale(0);
      pointer-events: none;
      z-index: inherit;
      transition: none;
      animation: clickSparkle 0.5s ease-out forwards;
    }

    @media (max-width: 480px) {
      .animate-paw-wiggle.paw-2 {
        display: none;
      }
      :host::before {
        background-size: 90px 90px;
        opacity: 0.3;
      }
      :host::after {
        background-size: 100px 100px;
      }
    }
  `;se([z({type:Object})],J.prototype,"gameData",2);se([z({type:Array})],J.prototype,"loadingMessages",2);se([N()],J.prototype,"_isLoading",2);se([N()],J.prototype,"_contentFadingOut",2);se([N()],J.prototype,"_currentLoadingMessage",2);se([ie("#sparkle-container-internal")],J.prototype,"_sparkleContainer",2);se([ie("#sparkle-svg-template-internal")],J.prototype,"_sparkleSvgTemplate",2);se([ie(".paw-wrapper")],J.prototype,"_pawWrapper",2);se([ie(".title-ampersand")],J.prototype,"_titleAmpersand",2);se([ie(".loading-message-container")],J.prototype,"_loadingMessageContainer",2);J=se([Q("main-menu-screen")],J);class da{constructor(e){this.startListener=null,this.containerElement=null,this.gameManager=e}enter(e){if(console.log("MainMenuState: enter",e),this.gameManager.setBodyStateClass("mainmenu-whiskers"),this.containerElement=this.gameManager.getContainerElement(),!this.containerElement){console.error("MainMenuState: Contenedor principal #app no encontrado.");return}this.containerElement.innerHTML="";const a=document.createElement("main-menu-screen");a.loadingMessages=this.gameManager.getLoadingMessages(),this.containerElement.appendChild(a),a?(this.startListener=()=>{console.log("MainMenuState: Evento 'start-game-requested' recibido desde <main-menu-screen>."),this.gameManager.getAudioManager().playSound("ui_confirm"),this.removeStartListeners(),this.gameManager.start(),console.log("MainMenuState: Iniciando transición con BARRIDO a QuizGameplay..."),this.gameManager.getStateMachine().changeState("QuizGameplay",void 0,"gq-wipe-transition")},a.addEventListener("start-game-requested",this.startListener,{once:!0}),console.log("MainMenuState: Listener 'start-game-requested' añadido a <main-menu-screen>.")):console.error("MainMenuState: Error al encontrar <main-menu-screen> después de añadirlo al DOM.")}removeStartListeners(){var a;const e=(a=this.containerElement)==null?void 0:a.querySelector("main-menu-screen");e&&this.startListener&&(e.removeEventListener("start-game-requested",this.startListener),console.log("MainMenuState: Listener 'start-game-requested' removido de <main-menu-screen>.")),this.startListener=null}exit(){console.log("MainMenuState: exit"),this.removeStartListeners(),this.containerElement&&(this.containerElement.style.cursor="")}update(e){}getPreferredExitAnimation(){return"gq-wipe-transition"}getPreferredEnterAnimation(){return"gq-wipe-transition"}}var In=Object.defineProperty,qn=Object.getOwnPropertyDescriptor,Xe=(g,e,a,o)=>{for(var i=o>1?void 0:o?qn(e,a):e,t=g.length-1,n;t>=0;t--)(n=g[t])&&(i=(o?n(e,a,i):n(i))||i);return o&&i&&In(e,a,i),i};let Te=class extends B{constructor(){super(...arguments),this.finalScore=0,this.correctAnswers=0,this.totalQuestions=0,this.isNewHighScore=!1}_handleContinueClick(){this.dispatchEvent(new CustomEvent("continue-requested",{bubbles:!0,composed:!0}))}render(){const g=this.totalQuestions>0?(this.correctAnswers/this.totalQuestions*100).toFixed(0):0;return R`
      <h1 class="results-title">Resultados</h1>
      <div class="stats-container">
        <div class="stat-item">
          <span class="stat-label">Puntaje Final</span>
          <span class="stat-value score">${this.finalScore}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Precisión</span>
          <span class="stat-value accuracy">${g}%</span>
          <span class="stat-label" style="font-size: 0.8rem; color: #6b7280;">(${this.correctAnswers} / ${this.totalQuestions})</span>
        </div>
      </div>
      ${this.isNewHighScore?R`
        <span class="new-highscore-indicator">¡Nuevo Récord! 🏆</span>
      `:""}
      <button class="action-button continue-button" @click=${this._handleContinueClick}>
        Continuar
      </button>
    `}};Te.styles=V`
    :host {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      position: relative;
      padding: 2rem;
      box-sizing: border-box;
      text-align: center;
      background-color: var(--gq-results-bg, rgba(31, 41, 55, 0.95));
      color: var(--gq-results-text-color, #e5e7eb);
      font-family: var(--gq-results-font-primary, var(--gq-font-primary, 'Poppins', sans-serif));
      gap: 1.5rem;
      -webkit-tap-highlight-color: transparent;
    }

    .results-title {
      font-family: var(--gq-results-font-display, var(--gq-font-display, 'Pacifico', cursive));
      font-size: clamp(2.8rem, 14vmin, 5.5rem);
      color: var(--gq-results-title-color, #6ee7b7);
      text-shadow: 1px 1px 4px rgba(0,0,0,0.4); /* Podría ser variable: --gq-results-title-shadow */
      margin-bottom: 0.5rem;
      line-height: 1.1;
    }

    .stats-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      background-color: var(--gq-results-stats-bg, rgba(17, 24, 39, 0.6));
      padding: 1.5rem 2rem;
      border-radius: 0.75rem; /* Variable: --gq-results-stats-border-radius */
      border: var(--gq-results-stats-border, 1px solid #4b5563);
    }

    .stat-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.2rem;
    }

    .stat-label {
      font-size: 1rem;
      font-weight: 600;
      color: var(--gq-results-stat-label-color, #9ca3af);
    }

    .stat-value {
      font-size: clamp(1.8rem, 7vmin, 2.8rem);
      font-weight: 700;
      line-height: 1;
    }

    .stat-value.score { color: var(--gq-results-stat-value-score-color, #facc15); }
    .stat-value.accuracy { color: var(--gq-results-stat-value-accuracy-color, #6ee7b7); }

    .new-highscore-indicator {
      font-size: 1rem; font-weight: 700;
      color: var(--gq-results-highscore-text-color, var(--gq-gameover-highscore-text-color, #4ade80));
      background-color: var(--gq-results-highscore-bg, var(--gq-gameover-highscore-bg, rgba(16, 185, 129, 0.2)));
      padding: 0.3rem 0.8rem; border-radius: 0.5rem;
      border: var(--gq-results-highscore-border, var(--gq-gameover-highscore-border, 1px solid #34d399));
      margin-top: 1rem;
      animation: pulseGreenResults 1.8s infinite ease-in-out; /* Podría usar la misma anim de gameover */
    }

    @keyframes pulseGreenResults {
      0%, 100% { transform: scale(1); box-shadow: 0 0 5px var(--gq-results-highscore-glow-color, var(--gq-gameover-highscore-glow-color, rgba(74, 222, 128, 0.5))); }
      50% { transform: scale(1.05); box-shadow: 0 0 10px var(--gq-results-highscore-glow-color-pulse, var(--gq-gameover-highscore-glow-color-pulse, rgba(74, 222, 128, 0.8))); }
    }
    
    .continue-button {
      font-family: var(--gq-results-continue-btn-font-family, var(--gq-font-primary, 'Poppins', sans-serif));
      font-size: var(--gq-results-continue-btn-font-size, 1.1rem);
      font-weight: var(--gq-results-continue-btn-font-weight, 600);
      padding: var(--gq-results-continue-btn-padding, 0.9rem 2rem);
      border-radius: var(--gq-results-continue-btn-border-radius, 0.5rem);
      border: none;
      cursor: pointer; 
      transition: background-color 0.2s ease, transform 0.1s ease, box-shadow 0.2s ease;
      box-shadow: var(--gq-results-continue-btn-box-shadow, 0 3px 6px rgba(0,0,0,0.2));
      background-color: var(--gq-results-continue-btn-bg, #60a5fa);
      color: var(--gq-results-continue-btn-text-color, #1e3a8a);
      margin-top: 1rem;
      -webkit-tap-highlight-color: transparent;
    }
    .continue-button:hover {
       transform: var(--gq-results-continue-btn-hover-transform, translateY(-2px));
       box-shadow: var(--gq-results-continue-btn-hover-box-shadow, 0 5px 10px rgba(0,0,0,0.3));
       background-color: var(--gq-results-continue-btn-hover-bg, #93c5fd);
    }
     .continue-button:active {
       transform: var(--gq-results-continue-btn-active-transform, translateY(0px) scale(0.98));
       box-shadow: var(--gq-results-continue-btn-active-box-shadow, 0 2px 4px rgba(0,0,0,0.2));
    }

     @media (max-width: 480px) {
        :host { gap: 1rem; padding: 1.5rem 1rem; }
        .results-title { font-size: clamp(2.2rem, 12vmin, 4.5rem); }
        .stats-container { padding: 1rem 1.5rem; gap: 0.8rem; }
        .stat-label { font-size: 0.9rem; }
        .stat-value { font-size: clamp(1.5rem, 6vmin, 2.2rem); }
        .new-highscore-indicator { font-size: 0.9rem; margin-top: 0.8rem; }
        .continue-button { 
            width: 80%; 
            font-size: var(--gq-results-continue-btn-mobile-font-size, 1rem);
            padding: var(--gq-results-continue-btn-mobile-padding, 0.8rem 1.5rem);
        }
     }
  `;Xe([z({type:Number})],Te.prototype,"finalScore",2);Xe([z({type:Number})],Te.prototype,"correctAnswers",2);Xe([z({type:Number})],Te.prototype,"totalQuestions",2);Xe([z({type:Boolean})],Te.prototype,"isNewHighScore",2);Te=Xe([Q("results-screen")],Te);class Tn{constructor(e){this.finalScore=0,this.correctAnswers=0,this.totalQuestions=0,this.isNewHighScore=!1,this.resultsScreenElement=null,this.continueHandler=null,this.gameManager=e}enter(e){console.log("ResultsState: enter",e),this.finalScore=(e==null?void 0:e.score)??0,this.correctAnswers=(e==null?void 0:e.correct)??0,this.totalQuestions=(e==null?void 0:e.total)??0,this.isNewHighScore=(e==null?void 0:e.isNewHighScore)??!1,this.gameManager.setBodyStateClass("results");const a=this.gameManager.getContainerElement();if(!a){console.error("ResultsState: Contenedor principal no encontrado.");return}a.innerHTML="",this.resultsScreenElement=document.createElement("results-screen"),this.resultsScreenElement.finalScore=this.finalScore,this.resultsScreenElement.correctAnswers=this.correctAnswers,this.resultsScreenElement.totalQuestions=this.totalQuestions,this.resultsScreenElement.isNewHighScore=this.isNewHighScore,this.continueHandler=()=>{console.log("ResultsState: Evento 'continue-requested' recibido."),this.gameManager.getAudioManager().playSound("ui_confirm"),this.gameManager.create()},this.resultsScreenElement.addEventListener("continue-requested",this.continueHandler),a.appendChild(this.resultsScreenElement),this.gameManager.getAudioManager().playSound("level_complete")}exit(){console.log("ResultsState: exit"),this.resultsScreenElement&&this.continueHandler&&this.resultsScreenElement.removeEventListener("continue-requested",this.continueHandler),this.resultsScreenElement=null,this.continueHandler=null}update(e){}}var kn=Object.defineProperty,Pn=Object.getOwnPropertyDescriptor,Lt=(g,e,a,o)=>{for(var i=o>1?void 0:o?Pn(e,a):e,t=g.length-1,n;t>=0;t--)(n=g[t])&&(i=(o?n(e,a,i):n(i))||i);return o&&i&&kn(e,a,i),i};let Qe=class extends B{constructor(){super(...arguments),this.finalScore=0,this.isNewHighScore=!1}_handleRestartClick(){this.dispatchEvent(new CustomEvent("restart-game-requested",{bubbles:!0,composed:!0}))}_handleMenuClick(){this.dispatchEvent(new CustomEvent("main-menu-requested",{bubbles:!0,composed:!0}))}render(){return R`
      <h1 class="game-over-title">¡Fin del Juego!</h1>
      <div class="score-container">
        <span class="final-score-label">Puntaje Final</span>
        <span class="final-score-value">${this.finalScore}</span>
        ${this.isNewHighScore?R`
          <span class="new-highscore-indicator">¡Nuevo Récord! 🏆</span>
        `:""}
      </div>
      <div class="button-container">
        <button class="action-button restart-button" @click=${this._handleRestartClick}>
          Reiniciar Juego
        </button>
        </div>
    `}};Qe.styles=V`
    :host {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      position: relative;
      padding: 2rem;
      box-sizing: border-box;
      text-align: center;
      background-color: var(--gq-gameover-bg, rgba(17, 24, 39, 0.9));
      color: var(--gq-gameover-text-color, #e5e7eb);
      font-family: var(--gq-gameover-font-primary, var(--gq-font-primary, 'Poppins', sans-serif));
      gap: 1.5rem;
      -webkit-tap-highlight-color: transparent;
      pointer-events: auto; /* <-- AÑADIR ESTA LÍNEA */
    }

    .game-over-title {
      font-family: var(--gq-gameover-font-display, var(--gq-font-display, 'Pacifico', cursive));
      font-size: clamp(3rem, 15vmin, 6rem);
      color: var(--gq-gameover-title-color, #f87171);
      text-shadow: var(--gq-gameover-title-shadow, 2px 2px 5px rgba(0,0,0,0.5));
      margin-bottom: 0.5rem;
      line-height: 1.1;
    }

    .score-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
    }

    .final-score-label {
      font-size: 1.2rem;
      font-weight: 600;
      color: var(--gq-gameover-score-label-color, #9ca3af);
    }

    .final-score-value {
      font-size: clamp(2.5rem, 10vmin, 4rem);
      font-weight: 700;
      color: var(--gq-gameover-score-value-color, #facc15);
      line-height: 1;
    }

    .new-highscore-indicator {
      font-size: 1rem;
      font-weight: 700;
      color: var(--gq-gameover-highscore-text-color, #4ade80);
      background-color: var(--gq-gameover-highscore-bg, rgba(16, 185, 129, 0.2));
      padding: 0.3rem 0.8rem;
      border-radius: 0.5rem;
      border: var(--gq-gameover-highscore-border, 1px solid #34d399);
      margin-top: 0.5rem;
      animation: pulseGreen 1.8s infinite ease-in-out;
    }

    @keyframes pulseGreen { /* Se puede mantener local o globalizar si se usa en más sitios */
      0%, 100% { transform: scale(1); box-shadow: 0 0 5px var(--gq-gameover-highscore-glow-color, rgba(74, 222, 128, 0.5)); }
      50% { transform: scale(1.05); box-shadow: 0 0 10px var(--gq-gameover-highscore-glow-color-pulse, rgba(74, 222, 128, 0.8)); }
    }

    .button-container {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
             pointer-events: auto;
    }

    .action-button {
      font-family: var(--gq-gameover-button-font-family, var(--gq-font-primary, 'Poppins', sans-serif));
      font-size: var(--gq-gameover-button-font-size, 1rem);
      font-weight: var(--gq-gameover-button-font-weight, 600);
      padding: var(--gq-gameover-button-padding, 0.8rem 1.5rem);
      border-radius: var(--gq-gameover-button-border-radius, 0.5rem);
      border: none;
      cursor: pointer;
      transition: background-color 0.2s ease, transform 0.1s ease, box-shadow 0.2s ease;
      box-shadow: var(--gq-gameover-button-box-shadow, 0 3px 6px rgba(0,0,0,0.2));
      -webkit-tap-highlight-color: transparent;
             pointer-events: auto;

    }
    .action-button:hover {
       transform: var(--gq-gameover-button-hover-transform, translateY(-2px));
       box-shadow: var(--gq-gameover-button-hover-box-shadow, 0 5px 10px rgba(0,0,0,0.3));
    }
     .action-button:active {
       transform: var(--gq-gameover-button-active-transform, translateY(0px) scale(0.98));
       box-shadow: var(--gq-gameover-button-active-box-shadow, 0 2px 4px rgba(0,0,0,0.2));
    }

    .restart-button {
      background-color: var(--gq-gameover-restart-btn-bg, #34d399);
      color: var(--gq-gameover-restart-btn-text-color, #064e3b);
    }
    .restart-button:hover { background-color: var(--gq-gameover-restart-btn-hover-bg, #6ee7b7); }

    .menu-button {
      background-color: var(--gq-gameover-menu-btn-bg, #60a5fa);
      color: var(--gq-gameover-menu-btn-text-color, #1e3a8a);
    }
     .menu-button:hover { background-color: var(--gq-gameover-menu-btn-hover-bg, #93c5fd); }

     @media (max-width: 480px) {
        /* Las media queries pueden ajustar fallbacks o usar variables específicas para móvil */
        :host { gap: 1rem; padding: 1rem; }
        .game-over-title { font-size: clamp(2.5rem, 13vmin, 5rem); }
        .final-score-label { font-size: 1rem; }
        .final-score-value { font-size: clamp(2rem, 9vmin, 3.5rem); }
        .new-highscore-indicator { font-size: 0.9rem; }
        .button-container { flex-direction: column; width: 80%; }
        .action-button { 
            width: 100%; 
            font-size: var(--gq-gameover-button-mobile-font-size, 0.9rem);
            padding: var(--gq-gameover-button-mobile-padding, 0.7rem 1rem);
        }
     }
  `;Lt([z({type:Number})],Qe.prototype,"finalScore",2);Lt([z({type:Boolean})],Qe.prototype,"isNewHighScore",2);Qe=Lt([Q("game-over-screen")],Qe);class Ln{constructor(e){this.finalScore=0,this.isNewHighScore=!1,this.gameOverScreenElement=null,this.restartHandler=null,this.gameManager=e}enter(e){console.log("GameOverState: enter",e),this.finalScore=(e==null?void 0:e.score)??0,this.isNewHighScore=(e==null?void 0:e.isNewHighScore)??!1,this.gameManager.setBodyStateClass("gameover");const a=this.gameManager.getContainerElement();if(!a){console.error("GameOverState: Contenedor principal no encontrado.");return}a.innerHTML="",this.gameOverScreenElement=document.createElement("game-over-screen"),this.gameOverScreenElement.finalScore=this.finalScore,this.gameOverScreenElement.isNewHighScore=this.isNewHighScore,this.restartHandler=()=>{console.log("GameOverState: Evento 'restart-game-requested' recibido. Forzando recarga de página."),this.gameManager.getAudioManager().playSound("ui_confirm"),window.location.reload()},this.gameOverScreenElement.addEventListener("restart-game-requested",this.restartHandler),a.appendChild(this.gameOverScreenElement),this.gameManager.getAudioManager().playSound("game_over")}exit(){console.log("GameOverState: exit"),this.gameOverScreenElement&&this.restartHandler&&this.gameOverScreenElement.removeEventListener("restart-game-requested",this.restartHandler),this.gameOverScreenElement=null,this.restartHandler=null}update(e){}}var Dn=Object.defineProperty,_n=Object.getOwnPropertyDescriptor,Pe=(g,e,a,o)=>{for(var i=o>1?void 0:o?_n(e,a):e,t=g.length-1,n;t>=0;t--)(n=g[t])&&(i=(o?n(e,a,i):n(i))||i);return o&&i&&Dn(e,a,i),i};let ue=class extends B{constructor(){super(),this.toolId="",this.icon="❓",this.titleText="",this.disabled=!1,this.active=!1,this.progressPercentage=0,this._isProcessingInteraction=!1}render(){const g=this.toolId==="cat-food"&&!this.disabled?R`
          <div class="cat-food-bar-container" part="cat-food-bar-container">
            <div
              class="cat-food-bar-fill"
              part="cat-food-bar-fill"
              style="width: ${this.progressPercentage}%;"
            ></div>
          </div>
        `:U;return R`
      <button
        class="tool-button-internal"
        title=${this.titleText||this.toolId}
        ?disabled=${this.disabled}
        @click=${this._handleClick}
        @touchstart=${this._handleClick}
        part="button"
        aria-label=${this.titleText||this.toolId}
        tabindex="-1"
      >
        ${this.icon}
      </button>
      ${g}
    `}_handleClick(g){g.type==="touchstart"&&g.preventDefault(),!(this._isProcessingInteraction||this.disabled)&&(this._isProcessingInteraction=!0,this.dispatchEvent(new CustomEvent("tool-activated",{detail:{toolId:this.toolId},bubbles:!0,composed:!0})),requestAnimationFrame(()=>{this._isProcessingInteraction=!1}))}};ue.styles=V`
    :host {
      display: inline-flex; justify-content: center; align-items: center;
      width: var(--gq-toolbtn-size, 3rem);
      height: var(--gq-toolbtn-size, 3rem);
      box-sizing: border-box;
      -webkit-tap-highlight-color: transparent;
      cursor: pointer;
      background-color: var(--gq-toolbtn-bg, rgba(17, 24, 39, 0.8));
      color: var(--gq-toolbtn-text-color, #e5e7eb);
      border: var(--gq-toolbtn-border, 2px solid #4b5563);
      border-radius: var(--gq-toolbtn-border-radius, 0.5rem);
      padding: var(--gq-toolbtn-padding, 0.5rem);
      font-size: var(--gq-toolbtn-font-size, 1.1rem);
      line-height: 1;
      transition: background-color 0.2s ease, border-color 0.2s ease,
                  box-shadow 0.2s ease, transform 0.1s ease,
                  opacity 0.2s ease;
      box-shadow: var(--gq-toolbtn-box-shadow, 0 2px 4px rgba(0,0,0,0.3));
      position: relative; /* Necesario para la barra de progreso interna */
      overflow: hidden; /* Para que la barra no se salga del borde redondeado */
    }

    .tool-button-internal {
      appearance: none; -webkit-appearance: none; -moz-appearance: none;
      background: transparent; border: none; padding: 0; margin: 0;
      font: inherit; color: inherit; cursor: inherit; outline: none;
      width: 100%; height: 100%; display: flex;
      justify-content: center; align-items: center;
      position: relative; /* Para que el icono esté sobre la barra */
      z-index: 1; /* Icono encima de la barra */
    }

    /* Hover general */
    :host(:not([disabled]):not([active]):hover) {
      background-color: var(--gq-toolbtn-hover-bg, rgba(31, 41, 55, 0.9));
      border-color: var(--gq-toolbtn-hover-border-color, #6b7280);
    }

    /* Active general (presionado, no el estado "activo" de la herramienta) */
    :host(:not([disabled]):active) { /* Se aplica si no está deshabilitado, incluso si está "active" */
      transform: scale(0.95);
      background-color: var(--gq-toolbtn-pressed-bg, rgba(55, 65, 81, 0.9));
    }

    /* Estado deshabilitado */
    :host([disabled]) {
      opacity: var(--gq-toolbtn-disabled-opacity, 0.5);
      cursor: not-allowed;
      transform: none !important;
      background-color: var(--gq-toolbtn-disabled-bg, var(--gq-toolbtn-bg, rgba(17, 24, 39, 0.8)));
      border-color: var(--gq-toolbtn-disabled-border-color, var(--gq-toolbtn-border-color, #4b5563));
      box-shadow: var(--gq-toolbtn-box-shadow, 0 2px 4px rgba(0,0,0,0.3));
    }
     :host([disabled]:hover) { /* Evitar cambios en hover si está deshabilitado */
       background-color: var(--gq-toolbtn-disabled-bg, var(--gq-toolbtn-bg, rgba(17, 24, 39, 0.8)));
       border-color: var(--gq-toolbtn-disabled-border-color, var(--gq-toolbtn-border-color, #4b5563));
     }

    /* --- ESTILOS DE ESTADO ACTIVO (Herramienta seleccionada) --- */
    :host([active]) {
      border-color: var(--gq-toolbtn-active-border-color, #a78bfa);
      box-shadow: var(--gq-toolbtn-active-box-shadow, 0 0 8px rgba(167, 139, 250, 0.5));
      background-color: var(--gq-toolbtn-active-bg-color, rgba(167, 139, 250, 0.3));
    }

    /* Pincel Activo */
    :host([toolId="brush"][active]) {
        border-color: var(--gq-toolbtn-brush-active-border-color, var(--gq-toolbtn-active-border-color, #a78bfa));
        box-shadow: var(--gq-toolbtn-brush-active-box-shadow, var(--gq-toolbtn-active-box-shadow, 0 0 8px rgba(167, 139, 250, 0.5)));
        background-color: var(--gq-toolbtn-brush-active-bg-color, var(--gq-toolbtn-active-bg-color, rgba(167, 139, 250, 0.3)));
    }

     /* Comida Activa */
     :host([toolId="cat-food"][active]) {
        border-color: var(--gq-toolbtn-catfood-active-border-color, rgb(245, 99, 31));
        background-color: var(--gq-toolbtn-catfood-active-bg-color, rgba(245, 136, 63, 0.8));
        box-shadow: var(--gq-toolbtn-catfood-active-box-shadow, 0 0 8px rgba(223, 167, 12, 0.5));
     }

    /* Estilos para estado presionado MIENTRAS está activo (toolId genérico) */
     :host([active]:active) {
       background-color: var(--gq-toolbtn-active-pressed-bg, rgba(140, 110, 240, 0.5));
     }
      /* Comida Activa y Presionada */
      :host([toolId="cat-food"][active]:active) {
        background-color: var(--gq-toolbtn-catfood-active-pressed-bg, var(--gq-toolbtn-catfood-active-bg-color, rgba(245, 136, 63, 0.8)));
      }
      /* Pincel Activo y Presionado */
      :host([toolId="brush"][active]:active) {
        background-color: var(--gq-toolbtn-brush-active-pressed-bg, var(--gq-toolbtn-active-pressed-bg, rgba(140, 110, 240, 0.5)));
      }

    /* --- INICIO: Estilos de cat_food.css integrados para la barra --- */
    .cat-food-bar-container {
      position: absolute;
      /* Ajustar estos valores según sea necesario o hacerlos variables CSS */
      bottom: var(--gq-catfood-bar-bottom-offset, 0.2rem); /* Reducido para mejor ajuste */
      left: var(--gq-catfood-bar-left-offset, 0.25rem);   /* Reducido para mejor ajuste */
      right: var(--gq-catfood-bar-right-offset, 0.25rem);  /* Reducido para mejor ajuste */
      height: var(--gq-catfood-bar-height, 0.5rem);    /* Reducido para mejor ajuste */
      background-color: var(--gq-catfood-bar-bg, #374151);
      /* Usar el mismo borde que el botón padre, o uno específico */
      border: var(--gq-catfood-bar-border, 1px solid #4b5563);
      border-radius: var(--gq-catfood-bar-border-radius, 0.25rem); /* Un poco menos redondeado que el botón */
      overflow: hidden;
      pointer-events: none; /* Para que no interfiera con el click del botón */
      z-index: 0; /* Detrás del contenido del botón (.tool-button-internal) */
    }

    .cat-food-bar-fill {
      height: 100%;
      background: var(--gq-catfood-bar-fill-bg, linear-gradient(to right, #f97316, #fcd34d));
      border-radius: inherit; /* Heredar el redondeo del contenedor de la barra */
      transition: width 0.3s ease-out;
    }
    /* --- FIN: Estilos de cat_food.css integrados --- */

    @media (min-width: 768px) {
      :host {
        width: var(--gq-toolbtn-desktop-size, var(--gq-toolbtn-size, 3.5rem));
        height: var(--gq-toolbtn-desktop-size, var(--gq-toolbtn-size, 3.5rem));
        font-size: var(--gq-toolbtn-desktop-font-size, var(--gq-toolbtn-font-size, 1.2rem));
        padding: var(--gq-toolbtn-desktop-padding, var(--gq-toolbtn-padding, 0.6rem));
      }
       /* Los estilos para :active y :hover ya están definidos globalmente */
    }
  `;Pe([z({type:String})],ue.prototype,"toolId",2);Pe([z({type:String})],ue.prototype,"icon",2);Pe([z({type:String})],ue.prototype,"titleText",2);Pe([z({type:Boolean,reflect:!0})],ue.prototype,"disabled",2);Pe([z({type:Boolean,reflect:!0})],ue.prototype,"active",2);Pe([z({type:Number,attribute:"progress-percentage"})],ue.prototype,"progressPercentage",2);ue=Pe([Q("tool-button")],ue);var zn=Object.defineProperty,$n=Object.getOwnPropertyDescriptor,Dt=(g,e,a,o)=>{for(var i=o>1?void 0:o?$n(e,a):e,t=g.length-1,n;t>=0;t--)(n=g[t])&&(i=(o?n(e,a,i):n(i))||i);return o&&i&&zn(e,a,i),i};let Ge=class extends B{constructor(){super(...arguments),this.combo=0,this._isVisible=!1}updated(g){super.updated(g),g.has("combo")&&this._updateVisuals()}_updateVisuals(){this._isVisible=this.combo>0,this.toggleAttribute("visible",this._isVisible);let g=parseFloat(getComputedStyle(this).getPropertyValue("--gq-combo-font-size-base").trim()||"3.0"),e="transparent";if(this._isVisible){const o=parseFloat(getComputedStyle(this).getPropertyValue("--gq-combo-font-size-increment").trim()||"0.5"),i=Math.min(Math.max(0,this.combo-1),10);g=parseFloat(getComputedStyle(this).getPropertyValue("--gq-combo-font-size-base").trim()||"3.0")+i*o;const t=parseFloat(getComputedStyle(this).getPropertyValue("--gq-combo-color-hue-increment").trim()||"35"),n=getComputedStyle(this).getPropertyValue("--gq-combo-color-saturation").trim()||"100%",l=getComputedStyle(this).getPropertyValue("--gq-combo-color-lightness").trim()||"65%";e=`hsl(${this.combo*t%360}, ${n}, ${l})`}this.style.fontSize=`${g}rem`,this.style.color=e}render(){return R`${this._isVisible?`x${this.combo}`:""}`}};Ge.styles=V`
    :host {
      position: fixed;
      bottom: var(--gq-combo-position-bottom, 0.5rem);
      left: var(--gq-combo-position-left, 0.5rem);
      z-index: 2;
      pointer-events: none;
      transition: font-size 0.4s cubic-bezier(0.22, 1, 0.36, 1),
                  color 0.4s ease-out,
                  opacity 0.3s ease-out,
                  transform 0.3s ease-out;
      font-family: var(--gq-combo-font-family, var(--gq-font-primary, 'Poppins', sans-serif));
      font-weight: var(--gq-combo-font-weight, 900);
      text-shadow: var(--gq-combo-text-shadow, 1px 1px 5px rgba(0,0,0,0.5));
      white-space: nowrap;
      opacity: 0;
      transform: scale(0.8) translateY(10px);
      will-change: transform, opacity, font-size, color;
      /* font-size y color se aplican en _updateVisuals */
    }

    :host([visible]) {
      opacity: 1;
      transform: scale(1) translateY(0);
    }

    @media (min-width: 768px) {
       :host {
         bottom: var(--gq-combo-desktop-position-bottom, var(--gq-combo-position-bottom, 1rem));
         left: var(--gq-combo-desktop-position-left, var(--gq-combo-position-left, 1rem));
       }
    }
  `;Dt([z({type:Number})],Ge.prototype,"combo",2);Dt([N()],Ge.prototype,"_isVisible",2);Ge=Dt([Q("combo-counter")],Ge);var On=Object.defineProperty,Rn=Object.getOwnPropertyDescriptor,Ma=(g,e,a,o)=>{for(var i=o>1?void 0:o?Rn(e,a):e,t=g.length-1,n;t>=0;t--)(n=g[t])&&(i=(o?n(e,a,i):n(i))||i);return o&&i&&On(e,a,i),i};let ht=class extends B{firstUpdated(){this._internalContainer||console.error("CatDisplayArea: El contenedor interno '.entities-host-container' no fue encontrado en el shadow DOM después del primer renderizado.")}addEntityElement(g){this._internalContainer?this._internalContainer.appendChild(g):console.error("CatDisplayArea: _internalContainer no está disponible. No se pudo añadir el elemento:",g)}removeEntityElement(g){var e;this._internalContainer&&this._internalContainer.contains(g)?this._internalContainer.removeChild(g):(e=this.shadowRoot)!=null&&e.contains(g)&&(console.warn("CatDisplayArea: Elemento no encontrado en _internalContainer, intentando remover del shadowRoot."),this.shadowRoot.removeChild(g))}clearAllEntityElements(){this._internalContainer?(this._internalContainer.innerHTML="",console.log("CatDisplayArea: Todos los elementos de entidad han sido limpiados.")):console.warn("CatDisplayArea: _internalContainer no disponible al intentar clearAllEntityElements.")}getInternalContainer(){return this._internalContainer||null}render(){return R`
      <div class="entities-host-container">
        </div>
    `}};ht.styles=V`
    :host {
      display: block;
      position: fixed; /* Ocupa toda la pantalla y está detrás de otros elementos UI */
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      /* Permite eventos de puntero por defecto. 
        Esto es importante para que Matter.js MouseConstraint funcione si se adjunta aquí,
        o para que los eventos de clic para soltar comida (si se manejan aquí) funcionen.
        Los elementos individuales de gato (cat-entity-display) tendrán su propio pointer-events: auto.
      */
      pointer-events: auto; 
      z-index: var(--gq-cat-display-z-index, 10); /* Ajusta según sea necesario, debe estar detrás de la UI principal */
      overflow: hidden; /* Evita barras de scroll si los gatos se salen un poco */
    }

    .entities-host-container {
      width: 100%;
      height: 100%;
      position: relative; /* Necesario para posicionar los gatos absolutamente dentro */
      /* Si este contenedor necesita ser clickeable (ej. para soltar comida), 
        asegúrate que no esté cubierto por otros elementos transparentes
        que bloqueen los clics.
      */
    }
  `;Ma([ie(".entities-host-container")],ht.prototype,"_internalContainer",2);ht=Ma([Q("cat-display-area")],ht);var Bn=Object.defineProperty,Fn=Object.getOwnPropertyDescriptor,_t=(g,e,a,o)=>{for(var i=o>1?void 0:o?Fn(e,a):e,t=g.length-1,n;t>=0;t--)(n=g[t])&&(i=(o?n(e,a,i):n(i))||i);return o&&i&&Bn(e,a,i),i};let He=class extends B{constructor(){super(...arguments),this.titleText="Abrir Tienda (S)",this.disabled=!1}render(){return R`
      <button
        class="shop-button-internal"
        title=${this.titleText}
        ?disabled=${this.disabled}
        @click=${this._handleClick}
        @touchstart=${this._handleClick}
        part="button"
        aria-label=${this.titleText}
        tabindex="0"
      >
        </button>
    `}_handleClick(g){g.type==="touchstart"&&g.preventDefault(),!this.disabled&&this.dispatchEvent(new CustomEvent("shop-button-interaction",{bubbles:!0,composed:!0}))}};He.styles=V`
    :host {
      /* --- INICIO: Posicionamiento Fijo (Se mantiene) --- */
      position: fixed;
      top: var(--gq-shopbtn-pos-top, 0.8rem); /* Ajustado para estar más arriba */
      right: var(--gq-shopbtn-pos-right, 0.8rem); /* Ajustado */
      z-index: var(--gq-shopbtn-z-index, 31);
      pointer-events: auto;
      /* --- FIN: Posicionamiento Fijo --- */

      display: inline-flex;
      justify-content: center;
      align-items: center;
      /* --- INICIO: Estilos de Apariencia (Usando vars --gq-toolbtn como fallback/base) --- */
      width: var(--gq-shopbtn-size, var(--gq-toolbtn-size, 3rem)); /* Usa var de toolbtn como fallback */
      height: var(--gq-shopbtn-size, var(--gq-toolbtn-size, 3rem));
      box-sizing: border-box;
      -webkit-tap-highlight-color: transparent;
      cursor: pointer;
      background-color: var(--gq-shopbtn-bg, var(--gq-toolbtn-bg, rgba(17, 24, 39, 0.8)));
      color: var(--gq-shopbtn-text-color, var(--gq-toolbtn-text-color, #e5e7eb));
      border: var(--gq-shopbtn-border, var(--gq-toolbtn-border, 2px solid #4b5563));
      border-radius: var(--gq-shopbtn-border-radius, var(--gq-toolbtn-border-radius, 0.5rem));
      padding: var(--gq-shopbtn-padding, var(--gq-toolbtn-padding, 0.5rem));
      font-size: var(--gq-shopbtn-font-size, var(--gq-toolbtn-font-size, 1.1rem));
      line-height: 1;
      transition: background-color 0.2s ease, border-color 0.2s ease,
                  box-shadow 0.2s ease, transform 0.1s ease,
                  opacity 0.2s ease;
      box-shadow: var(--gq-shopbtn-box-shadow, var(--gq-toolbtn-box-shadow, 0 2px 4px rgba(0,0,0,0.3)));
      /* --- FIN: Estilos de Apariencia --- */
    }

    .shop-button-internal {
      appearance: none; -webkit-appearance: none; -moz-appearance: none;
      background: transparent; border: none; padding: 0; margin: 0;
      font: inherit; color: inherit; cursor: inherit; outline: none;
      width: 100%; height: 100%; display: flex;
      justify-content: center; align-items: center;
    }

    /* Contenido del icono (se mantiene igual) */
    .shop-button-internal::before {
      content: var(--gq-shop-button-icon-content, '🛒'); /* Icono por defecto */
      font-family: var(--gq-shop-button-font-family, inherit);
    }

    /* Hover (usando vars de toolbtn como fallback) */
    :host(:not([disabled]):hover) {
      background-color: var(--gq-shopbtn-hover-bg, var(--gq-toolbtn-hover-bg, rgba(31, 41, 55, 0.9)));
      border-color: var(--gq-shopbtn-hover-border-color, var(--gq-toolbtn-hover-border-color, #6b7280)));
      /* Opcional: Añadir un ligero scale en hover si se desea */
      /* transform: scale(1.05); */
    }

    /* Active (presionado) (usando vars de toolbtn como fallback) */
    :host(:not([disabled]):active) {
      transform: scale(0.95); /* Similar a tool-button */
      background-color: var(--gq-shopbtn-pressed-bg, var(--gq-toolbtn-pressed-bg, rgba(55, 65, 81, 0.9)));
    }

    /* Estado deshabilitado (usando vars de toolbtn como fallback) */
    :host([disabled]) {
      opacity: var(--gq-shopbtn-disabled-opacity, var(--gq-toolbtn-disabled-opacity, 0.5));
      cursor: not-allowed;
      transform: none !important;
      background-color: var(--gq-shopbtn-disabled-bg, var(--gq-toolbtn-disabled-bg, var(--gq-toolbtn-bg, rgba(17, 24, 39, 0.8))));
      border-color: var(--gq-shopbtn-disabled-border-color, var(--gq-toolbtn-disabled-border-color, var(--gq-toolbtn-border, 2px solid #4b5563)));
      box-shadow: var(--gq-shopbtn-box-shadow, var(--gq-toolbtn-box-shadow, 0 2px 4px rgba(0,0,0,0.3)));
    }
     :host([disabled]:hover) { /* Evitar cambios en hover si está deshabilitado */
       background-color: var(--gq-shopbtn-disabled-bg, var(--gq-toolbtn-disabled-bg, var(--gq-toolbtn-bg)));
       border-color: var(--gq-shopbtn-disabled-border-color, var(--gq-toolbtn-disabled-border-color));
     }

    /* --- INICIO: Media Queries (Adaptado de tool-button) --- */
    /* Desktop/Tablet (usando vars desktop de toolbtn como fallback) */
    @media (min-width: 769px) { /* Umbral mayor para asegurar que no choque con los controles centrales en tablet */
      :host {
        width: var(--gq-shopbtn-desktop-size, var(--gq-toolbtn-desktop-size, 3.5rem));
        height: var(--gq-shopbtn-desktop-size, var(--gq-toolbtn-desktop-size, 3.5rem));
        font-size: var(--gq-shopbtn-desktop-font-size, var(--gq-toolbtn-desktop-font-size, 1.2rem));
        padding: var(--gq-shopbtn-desktop-padding, var(--gq-toolbtn-desktop-padding, 0.6rem));
         /* Mantener posición fija */
        top: var(--gq-shopbtn-pos-top-desktop, var(--gq-shopbtn-pos-top, 0.8rem));
        right: var(--gq-shopbtn-pos-right-desktop, var(--gq-shopbtn-pos-right, 0.8rem));
      }
    }

    /* Tablet (puede heredar de base o usar vars específicas si existen) */
     @media (min-width: 481px) and (max-width: 768px) {
        :host {
            /* Usar valores base o definir --gq-shopbtn-size-tablet, etc. si es necesario */
            /* Mantener posición fija */
            top: var(--gq-shopbtn-pos-top-tablet, var(--gq-shopbtn-pos-top, 0.6rem));
            right: var(--gq-shopbtn-pos-right-tablet, var(--gq-shopbtn-pos-right, 0.6rem));
        }
     }

    /* Móvil (usando vars mobile de toolbtn como fallback) */
    @media (max-width: 480px) {
      :host {
        width: var(--gq-shopbtn-size-mobile, var(--gq-toolbtn-size, 3rem));
        height: var(--gq-shopbtn-size-mobile, var(--gq-toolbtn-size, 3rem));
        font-size: var(--gq-shopbtn-font-size-mobile, var(--gq-toolbtn-font-size, 1.1rem));
        padding: var(--gq-shopbtn-padding-mobile, var(--gq-toolbtn-padding, 0.5rem));
        /* Mantener posición fija */
        top: var(--gq-shopbtn-pos-top-mobile, 0.1rem);
        right: var(--gq-shopbtn-pos-right-mobile, 0.1rem);
      }
    }
    /* --- FIN: Media Queries --- */
  `;_t([z({type:String})],He.prototype,"titleText",2);_t([z({type:Boolean,reflect:!0})],He.prototype,"disabled",2);He=_t([Q("shop-button-component")],He);var Nn=Object.defineProperty,Un=Object.getOwnPropertyDescriptor,Ea=(g,e,a,o)=>{for(var i=o>1?void 0:o?Un(e,a):e,t=g.length-1,n;t>=0;t--)(n=g[t])&&(i=(o?n(e,a,i):n(i))||i);return o&&i&&Nn(e,a,i),i};const Vn="sweep-in-tl-to-br",Qn="sweep-out-towards-br";let ut=class extends B{constructor(){super(...arguments),this.visible=!1}async playIn(){return console.log("[DiagonalWipe] playIn() INICIADO."),new Promise(g=>{this.classList.remove("animate-out"),this.style.clipPath="polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)",this.visible=!0,this.offsetWidth;const e=a=>{a.animationName===Vn?(this.removeEventListener("animationend",e),this.style.clipPath="polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",console.log("[DiagonalWipe] playIn() FINALIZADO - Promesa resuelta."),g()):console.log(`[DiagonalWipe] playIn() animationend para OTRA animación: ${a.animationName}`)};this.addEventListener("animationend",e),this.classList.add("animate-in"),console.log('[DiagonalWipe] Clase "animate-in" añadida.')})}async playOut(){return console.log("[DiagonalWipe] playOut() INICIADO."),new Promise(g=>{if(!this.visible){console.log("[DiagonalWipe] playOut() llamado pero no visible, resolviendo inmediatamente."),g();return}this.classList.remove("animate-in"),this.style.clipPath="polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",this.offsetWidth;const e=a=>{a.animationName===Qn?(this.removeEventListener("animationend",e),this.reset(),console.log("[DiagonalWipe] playOut() FINALIZADO - Promesa resuelta."),g()):console.log(`[DiagonalWipe] playOut() animationend para OTRA animación: ${a.animationName}`)};this.addEventListener("animationend",e),this.classList.add("animate-out"),console.log('[DiagonalWipe] Clase "animate-out" añadida.')})}reset(){console.log("[DiagonalWipe] reset() llamado."),this.classList.remove("animate-in","animate-out"),this.style.clipPath="polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)",this.visible=!1}render(){return R``}};ut.styles=V`
    :host {
      display: block; 
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: var(--gq-wipe-color, #2c3e50); 
      z-index: var(--gq-wipe-z-index, 1000); 
      pointer-events: none; 
      clip-path: polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%);
      visibility: hidden; 
    }

    :host([visible]) {
      visibility: visible; 
    }

    :host(.animate-in) {
      animation-name: sweep-in-tl-to-br; /* Nombre literal de la animación */
      animation-duration: var(--gq-wipe-in-duration, 0.6s);
      animation-timing-function: linear;
      animation-fill-mode: forwards;
    }

    :host(.animate-out) {
      animation-name: sweep-out-towards-br; /* Nombre literal de la animación */
      animation-duration: var(--gq-wipe-out-duration, 0.6s);
      animation-timing-function: linear;
      animation-fill-mode: forwards;
    }
  `;Ea([z({type:Boolean,reflect:!0})],ut.prototype,"visible",2);ut=Ea([Q("diagonal-wipe")],ut);class Gn{constructor(e){this.drawingCanvasLayerElement=null,this.gameUiContainer=null,this.diagonalWipeElement=null,this.lastTimestamp=0,this.isRunning=!1,this.keydownListener=null,this.themeChangeListener=null,this.shopButtonInstance=null,this.shopButtonInteractionListener=null,this.shopCloseRequestListener=null,this.loadingMessages=["Desenredando la diversión..."],this._lastToolToggleTime=0,this.TOOL_TOGGLE_DEBOUNCE_MS=300,this.setupToolButtonListeners=()=>{var o,i,t;(o=this.controlElements.brushToolButton)==null||o.addEventListener("tool-activated",()=>this.activateBrush()),(i=this.controlElements.clearInkToolButton)==null||i.addEventListener("tool-activated",()=>{this.playerData.isDrawingUnlocked&&this.playerData.inkSpentSinceLastClear>0&&this.inkManager.clearInkLines()}),(t=this.controlElements.catFoodToolButton)==null||t.addEventListener("tool-activated",()=>this.activateCatFood())},this.containerElement=e,this.audioManager=new ci,this.quizSystem=new ri,this.playerData=new Pi,this.themeManager=new pn("body"),this.catManager=new bi(this.audioManager,this),this.uiManager=new un(this),this.shopManager=new ki(this.playerData,this),this.inkManager=new Bi(this),this.catFoodManager=new Sn(this),this.physicsManager=new oi(this.catManager,this.catFoodManager,this),this.stateMachine=new li,this.stateMachine.setAnimationContainer(this.containerElement),this.diagonalWipeElement=document.getElementById("diagonal-wipe-transition-element"),(!this.diagonalWipeElement||!(this.diagonalWipeElement instanceof HTMLElement&&"playIn"in this.diagonalWipeElement))&&(console.error("GameManager CRITICAL: Componente <diagonal-wipe id='diagonal-wipe-transition-element'> no encontrado o inválido."),this.diagonalWipeElement=null),this.stateMachine.setWipeComponent(this.diagonalWipeElement);const a=document.getElementById("cat-display-area-main");if(!a||!(a instanceof HTMLElement&&"clearAllEntityElements"in a))throw console.error("GameManager CRITICAL: <cat-display-area id='cat-display-area-main'> no encontrado o inválido."),new Error("<cat-display-area> no encontrado y es esencial.");this.catDisplayAreaElement=a,this.drawingCanvasLayerElement=document.getElementById("drawing-canvas-layer-main"),this.drawingCanvasLayerElement&&!(this.drawingCanvasLayerElement instanceof HTMLElement&&"resizeCanvas"in this.drawingCanvasLayerElement)&&console.warn("GameManager: drawingCanvasLayerElement no parece ser una instancia válida de DrawingCanvasLayer."),this.catManager.setCatDisplayArea(this.catDisplayAreaElement),this.catFoodManager.setCatDisplayArea(this.catDisplayAreaElement),this.catManager.setPhysicsManager(this.physicsManager),this.inkManager.setPhysicsManager(this.physicsManager),this.controlElements={controlsContainer:document.getElementById("right-controls"),drawingButtonsContainer:document.getElementById("drawing-buttons-container"),catFoodUiContainer:document.getElementById("cat-food-ui-container"),brushToolButton:document.querySelector('tool-button[toolId="brush"]'),clearInkToolButton:document.querySelector('tool-button[toolId="clear-ink"]'),catFoodToolButton:document.querySelector('tool-button[toolId="cat-food"]')},(!this.controlElements.controlsContainer||!this.controlElements.drawingButtonsContainer||!this.controlElements.catFoodUiContainer||!this.controlElements.brushToolButton||!this.controlElements.clearInkToolButton||!this.controlElements.catFoodToolButton)&&console.warn("GameManager: Uno o más elementos de control UI no fueron encontrados en el DOM."),this.setupStates()}setBodyStateClass(e){const a=document.body;a.className.split(" ").forEach(o=>{o.startsWith("state-")&&a.classList.remove(o)}),e&&a.classList.add(`state-${e.toLowerCase()}`)}async init(){this.playerData.reset(),this.physicsManager.init(this.catDisplayAreaElement),this.catFoodManager.init(),this.hideToolControls(),this.hideShopButton(),this.addThemeChangeListener(),await this.preload(),this.setupToolButtonListeners(),this.addKeyboardListener()}create(){console.log("GameManager: create() - Iniciando reseteo..."),this.quizSystem.resetAvailableQuestions(),this.catManager.removeAllCats(),this.shopManager?(this.shopManager.closeShop(),console.log("GameManager: create() - ShopManager.closeShop() llamado.")):console.warn("GameManager: create() - ShopManager no disponible para cerrar tienda."),this.hideToolControls(),this.hideShopButton(),document.querySelector("combo-counter")||document.body.appendChild(document.createElement("combo-counter")),this.stateMachine.changeState("MainMenu",void 0,"gq-wipe-transition"),console.log("GameManager: create() - Reseteo completado, transicionando a MainMenu.")}setupStates(){const e=new Mn(this),a=new da(this),o=new xe(this),i=new Tn(this),t=new Ln(this),n=(r,u,c)=>{const f=r.enter.bind(r);return p=>{try{f(p)}catch(s){console.error(`Error en enter() para ${r.constructor.name}:`,s)}if(r instanceof xe)this.gameUiContainer=this.containerElement.querySelector("quiz-ui-container");else if(r instanceof da){const s=this.containerElement.querySelector("main-menu-screen");s&&(s.loadingMessages=this.getLoadingMessages())}u?this.showShopButton():this.hideShopButton(),c?(this.showToolControls(),r instanceof xe&&this.updateCatFoodUI()):this.hideToolControls()}},l=r=>{const u=r.exit.bind(r);return()=>{try{u()}catch(c){console.error(`Error en exit() para ${r.constructor.name}:`,c)}r instanceof xe&&(this.gameUiContainer=null)}};e.enter=n(e,!1,!1),e.exit=l(e),a.enter=n(a,!1,!1),a.exit=l(a),o.enter=n(o,!0,!0),o.exit=l(o),i.enter=n(i,!1,!1),i.exit=l(i),t.enter=n(t,!1,!1),t.exit=l(t),this.stateMachine.addState("Loading",e),this.stateMachine.addState("MainMenu",a),this.stateMachine.addState("QuizGameplay",o),this.stateMachine.addState("Results",i),this.stateMachine.addState("GameOver",t),this.stateMachine.addState("__shutdown__",{enter:()=>{this.hideToolControls(),this.hideShopButton()},exit:()=>{},update:()=>{}})}async preload(){const e="/GatoQuizDev/",a=e.endsWith("/")?e.slice(0,-1):e,o={questions:`${a}/data/questions.json`,templates:`${a}/data/cat_templates.json`,shopItems:`${a}/data/shop_items.json`,themes:`${a}/data/themes.json`,loadingMessages:`${a}/data/loading_messages.json`};console.log("GameManager: Preload - URLs a cargar:",o);try{const i=await Promise.all(Object.values(o).map(c=>fetch(c)));i.forEach((c,f)=>{if(!c.ok)throw new Error(`HTTP ${c.status} cargando ${Object.values(o)[f]}`)});const[t,n,l,r,u]=await Promise.all(i.map(c=>c.json()));if(!Array.isArray(t)||!Array.isArray(n)||!Array.isArray(l)||!Array.isArray(r)||!Array.isArray(u))throw new Error("Formato de datos JSON inválido.");if(!await this.quizSystem.loadQuestionsData(t))throw new Error("Fallo al procesar preguntas.");if(this.catManager.loadTemplates(n),this.shopManager.init(l),!await this.themeManager.loadThemesData(r))throw new Error("Fallo al procesar temas.");this.loadingMessages=u,this.loadingMessages.length===0&&(this.loadingMessages=["Cargando michi-diversión..."]),console.log("GameManager: Preload completado exitosamente.")}catch(i){throw console.error("GameManager: Error durante preload:",i),this.containerElement.innerHTML=`Error cargando assets: ${i.message}. Revisa la consola.`,i}}start(){this.isRunning||(this.isRunning=!0,this.lastTimestamp=performance.now(),this.physicsManager.start(),this.gameLoopRequestId=requestAnimationFrame(this.gameLoop.bind(this)),console.log("GameManager: Ciclo de juego iniciado."))}stop(){this.isRunning&&(this.isRunning=!1,this.gameLoopRequestId&&cancelAnimationFrame(this.gameLoopRequestId),this.gameLoopRequestId=void 0,this.physicsManager.stop(),console.log("GameManager: Ciclo de juego detenido."))}gameLoop(e){if(!this.isRunning)return;const a=(e-this.lastTimestamp)/1e3;this.lastTimestamp=e;const o=Math.min(a,.1);this.update(o),this.gameLoopRequestId=requestAnimationFrame(this.gameLoop.bind(this))}update(e){try{this.stateMachine.update(e),this.catManager.updateCats(e),this.catFoodManager.update(e)}catch(a){console.error("Error en gameLoop update:",a),this.stop()}}shutdown(){var a,o,i;console.log("GameManager: Iniciando shutdown..."),this.stop(),this.hideToolControls(),this.hideShopButton(),this.removeKeyboardListener(),this.removeThemeChangeListener(),this.physicsManager.shutdown();const e=this.stateMachine.getCurrentStateName();if(e&&e!=="__shutdown__")try{(a=this.stateMachine.getCurrentState())==null||a.exit()}catch(t){console.warn("Error en exit() del estado durante shutdown:",t)}this.stateMachine.changeState("__shutdown__"),this.catManager.removeAllCats(),this.inkManager.destroy(),this.shopManager.destroy(),this.catFoodManager.destroy(),this.containerElement.innerHTML="",this.gameUiContainer=null,this.setBodyStateClass(null),(o=document.querySelector("combo-counter"))==null||o.remove(),(i=this.diagonalWipeElement)==null||i.reset(),console.log("GameManager: Shutdown completado.")}getUIManager(){if(!this.uiManager)throw new Error("UIManager no inicializado en GameManager.");return this.uiManager}getQuizUiContainerElement(){return(!this.gameUiContainer||!this.containerElement.contains(this.gameUiContainer))&&(this.gameUiContainer=this.containerElement.querySelector("quiz-ui-container")),this.gameUiContainer}setQuizUiFaded(e){const a=this.getQuizUiContainerElement();a&&(a.isFaded=e)}setCatDragState(e){this.setQuizUiFaded(e),this.drawingCanvasLayerElement&&(this.drawingCanvasLayerElement.isPointerLockdown=e,!e&&this.inkManager&&this.inkManager.updateCanvasActiveState())}resetGame(){var e;console.log("GameManager: resetGame() - Iniciando reseteo completo..."),this.stop(),this.playerData?(this.playerData.reset(),console.log("GameManager: resetGame() - PlayerData reseteado.")):console.warn("GameManager: resetGame() - PlayerData no disponible para resetear."),this.quizSystem?(this.quizSystem.resetAvailableQuestions(),console.log("GameManager: resetGame() - QuizSystem reseteado.")):console.warn("GameManager: resetGame() - QuizSystem no disponible para resetear."),this.catManager?(this.catManager.removeAllCats(),console.log("GameManager: resetGame() - CatManager.removeAllCats() llamado.")):console.warn("GameManager: resetGame() - CatManager no disponible."),this.inkManager?(this.inkManager.destroy(),console.log("GameManager: resetGame() - InkManager.destroy() llamado.")):console.warn("GameManager: resetGame() - InkManager no disponible."),this.catFoodManager?(this.catFoodManager.destroy(),console.log("GameManager: resetGame() - CatFoodManager.destroy() llamado.")):console.warn("GameManager: resetGame() - CatFoodManager no disponible."),this.physicsManager&&console.log("GameManager: resetGame() - Asumiendo que removeAllCats limpió los cuerpos físicos."),this.shopManager?(this.shopManager.closeShop(),console.log("GameManager: resetGame() - ShopManager.closeShop() llamado.")):console.warn("GameManager: resetGame() - ShopManager no disponible."),this.hideToolControls(),this.hideShopButton(),this.gameUiContainer=null,(e=document.querySelector("combo-counter"))==null||e.remove(),console.log("GameManager: resetGame() - Transicionando a MainMenuState..."),this.stateMachine.changeState("MainMenu",void 0,"gq-wipe-transition")}showShopButton(){if(!this.shopButtonInstance){const a=document.createElement("shop-button-component");a.id="shop-button-global",a.titleText="Abrir Tienda (S)",document.body.appendChild(a),this.shopButtonInstance=a,this.shopButtonInteractionListener=()=>this.handleShopButtonInteraction(),a.addEventListener("shop-button-interaction",this.shopButtonInteractionListener)}this.shopButtonInstance.classList.remove("hidden");const e=this.shopManager.getShopPopupElement();e&&this.addShopCloseListener(e),this.updateShopButtonState()}hideShopButton(){if(this.shopButtonInstance){this.shopButtonInstance.classList.add("hidden"),this.removeShopButtonListener();const e=this.shopManager.getShopPopupElement();e&&this.removeShopCloseListener(e)}}handleShopButtonInteraction(){const e=this.getAudioManager();e.isReady()||e.init(),this.shopManager.isShopOpen()||(this.openShop(),e==null||e.playSound("ui_confirm"))}removeShopButtonListener(){this.shopButtonInstance&&this.shopButtonInteractionListener&&(this.shopButtonInstance.removeEventListener("shop-button-interaction",this.shopButtonInteractionListener),this.shopButtonInteractionListener=null)}handleShopCloseRequest(){this.closeShop(),this.getAudioManager().playSound("ui_cancel")}addShopCloseListener(e){this.removeShopCloseListener(e),this.shopCloseRequestListener=()=>this.handleShopCloseRequest(),e.addEventListener("close-requested",this.shopCloseRequestListener)}removeShopCloseListener(e){e&&this.shopCloseRequestListener&&(e.removeEventListener("close-requested",this.shopCloseRequestListener),this.shopCloseRequestListener=null)}openShop(){this.shopManager?(this.shopManager.openShop(),this.updateShopButtonState()):console.warn("GameManager: openShop() llamado pero ShopManager no está disponible.")}closeShop(){this.shopManager?(this.shopManager.closeShop(),queueMicrotask(()=>{this.updateShopButtonState()})):console.warn("GameManager: closeShop() llamado pero ShopManager no está disponible.")}updateShopButtonState(){if(this.shopButtonInstance&&this.shopManager){const e=this.shopManager.isShopOpen(),a=this.stateMachine.getCurrentStateName()==="QuizGameplay";this.shopButtonInstance.disabled=e||!a}}showToolControls(){const e=this.controlElements.controlsContainer;e?(e.classList.remove("hidden"),this.updateControlVisibilityBasedOnUnlocks()):console.warn("[GameManager] Contenedor de controles (#right-controls) no encontrado.")}hideToolControls(){const e=this.controlElements.controlsContainer;e&&e.classList.add("hidden")}updateControlVisibilityBasedOnUnlocks(){const e=this.playerData.isDrawingUnlocked,a=this.playerData.isCatFoodUnlocked;this.controlElements.drawingButtonsContainer&&this.controlElements.drawingButtonsContainer.classList.toggle("hidden",!e),this.controlElements.catFoodUiContainer&&this.controlElements.catFoodUiContainer.classList.toggle("hidden",!a),this.updateToolButtonStates()}addThemeChangeListener(){this.removeThemeChangeListener(),this.themeChangeListener=e=>{this.stateMachine.getCurrentState()instanceof xe&&this.uiManager.rebuildInterface(),this.shopManager.isShopOpen()&&this.shopManager.updateShopUI()},document.addEventListener("theme-changed",this.themeChangeListener)}removeThemeChangeListener(){this.themeChangeListener&&(document.removeEventListener("theme-changed",this.themeChangeListener),this.themeChangeListener=null)}addKeyboardListener(){this.removeKeyboardListener(),this.keydownListener=e=>{if(e.key==="Escape"){if(this.shopManager.isShopOpen()){this.closeShop(),this.audioManager.playSound("ui_cancel");return}if(this.uiManager.isExplanationVisible())return}if(this.shopManager.isShopOpen()||this.uiManager.isExplanationVisible())return;const a=this.stateMachine.getCurrentStateName();if(a==="QuizGameplay")switch(e.key.toLowerCase()){case"b":this.activateBrush();break;case"c":this.playerData.isDrawingUnlocked&&this.playerData.inkSpentSinceLastClear>0&&this.inkManager.clearInkLines();break;case"f":this.activateCatFood();break;case"s":this.shopButtonInstance&&!this.shopButtonInstance.disabled&&this.handleShopButtonInteraction();break;case"t":this.themeManager.cycleTheme();break}else["MainMenu","GameOver","Results"].includes(a||"")&&e.key.toLowerCase()==="t"&&this.themeManager.cycleTheme()},window.addEventListener("keydown",this.keydownListener)}removeKeyboardListener(){this.keydownListener&&(window.removeEventListener("keydown",this.keydownListener),this.keydownListener=null)}getLives(){return this.playerData.lives}decrementLives(){this.playerData.lives>0&&(this.playerData.lives--,this.updateExternalLivesUI())}incrementLives(){this.playerData.lives++,this.updateExternalLivesUI()}enableDrawingFeature(){try{return this.inkManager.init(),this.updateInkUI(),this.updateControlVisibilityBasedOnUnlocks(),!0}catch(e){return console.error("GameManager: Error habilitando dibujo:",e),!1}}enableCatFoodFeature(){try{this.catFoodManager.enable(),this.updateCatFoodUI(),this.updateControlVisibilityBasedOnUnlocks()}catch(e){console.error("GameManager: Error habilitando comida:",e)}}updateInkUI(){this.uiManager.updateInkVisibility(this.playerData.isDrawingUnlocked),this.uiManager.updateInkBar(),this.updateToolButtonStates()}updateExternalLivesUI(){this.uiManager.updateLivesDisplay(this.playerData.lives)}updateExternalShieldUI(e){this.uiManager.updateShieldIcon(e)}updateExternalHintUI(e){this.uiManager.updateHintIcon(e)}updateExternalScoreUI(){this.uiManager.updateScoreDisplay(this.playerData.score)}updateCatFoodUI(){this.uiManager.updateCatFoodBar(this.playerData.currentCatFood,this.playerData.getMaxCatFood()),this.updateToolButtonStates()}activateBrush(){const e=Date.now();e-this._lastToolToggleTime<this.TOOL_TOGGLE_DEBOUNCE_MS||(this._lastToolToggleTime=e,this.playerData.isDrawingUnlocked&&(this.catFoodManager.isActive&&this.catFoodManager.toggleActive(!1),this.inkManager.toggleBrush()))}activateCatFood(){const e=Date.now();e-this._lastToolToggleTime<this.TOOL_TOGGLE_DEBOUNCE_MS||(this._lastToolToggleTime=e,this.playerData.isCatFoodUnlocked&&(this.inkManager.isBrushActive&&this.inkManager.toggleBrush(!1),this.catFoodManager.toggleActive()))}updateToolButtonStates(){this.controlElements.brushToolButton&&(this.controlElements.brushToolButton.active=this.inkManager.isBrushActive,this.controlElements.brushToolButton.disabled=!this.playerData.isDrawingUnlocked||this.playerData.currentInk<=0&&!this.inkManager.isBrushActive),this.controlElements.clearInkToolButton&&(this.controlElements.clearInkToolButton.disabled=!this.playerData.isDrawingUnlocked||this.playerData.inkSpentSinceLastClear<=0),this.controlElements.catFoodToolButton&&(this.controlElements.catFoodToolButton.active=this.catFoodManager.isActive,this.controlElements.catFoodToolButton.disabled=!this.playerData.isCatFoodUnlocked||this.playerData.currentCatFood<=0&&!this.catFoodManager.isActive,this.uiManager.updateCatFoodBar(this.playerData.currentCatFood,this.playerData.getMaxCatFood())),this.updateShopButtonState()}getQuizSystem(){return this.quizSystem}getPhysicsManager(){return this.physicsManager}getStateMachine(){return this.stateMachine}getAudioManager(){return this.audioManager}getCatManager(){return this.catManager}getShopManager(){return this.shopManager}getPlayerData(){return this.playerData}getInkManager(){return this.inkManager}getThemeManager(){return this.themeManager}getCatFoodManager(){return this.catFoodManager}getContainerElement(){return this.containerElement}getCurrentState(){return this.stateMachine.getCurrentState()}getControlElements(){return this.controlElements}getCatDisplayArea(){return this.catDisplayAreaElement}getDrawingCanvasLayer(){return this.drawingCanvasLayerElement}getLoadingMessages(){return this.loadingMessages.length>0?this.loadingMessages:["Cargando..."]}}console.log("DOM Cargado. Iniciando Quiz Felino...");const nt=document.getElementById("app");if(!nt)console.error("Error: Elemento #app no encontrado en el DOM.");else{nt.innerHTML="",console.log("Preparado para inicializar GameManager.");const g=new Gn(nt);window.gameManager=g,console.log("GameManager expuesto como window.gameManager para depuración.");const e=()=>{const a=g.getAudioManager();a.isReady()||(console.log("User interaction detected, attempting to initialize audio..."),a.init()),document.body.removeEventListener("click",e,{capture:!0}),document.body.removeEventListener("touchstart",e,{capture:!0}),console.log("One-time audio init listeners removed.")};console.log("Adding one-time listeners for audio initialization..."),document.body.addEventListener("click",e,{once:!0,capture:!0}),document.body.addEventListener("touchstart",e,{once:!0,capture:!0,passive:!1}),g.init().then(()=>{g.create(),g.start(),console.log("GameManager inicializado y arrancado.")}).catch(a=>{console.error("Error durante la inicialización del juego:",a),nt.innerHTML=`Error al cargar el juego: ${a.message}. Revisa la consola.`})}
