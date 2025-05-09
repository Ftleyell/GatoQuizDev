(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const t of i)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function a(i){const t={};return i.integrity&&(t.integrity=i.integrity),i.referrerPolicy&&(t.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?t.credentials="include":i.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(i){if(i.ep)return;i.ep=!0;const t=a(i);fetch(i.href,t)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ot=globalThis,At=ot.ShadowRoot&&(ot.ShadyCSS===void 0||ot.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,qt=Symbol(),Vt=new WeakMap;let ga=class{constructor(e,a,s){if(this._$cssResult$=!0,s!==qt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=a}get styleSheet(){let e=this.o;const a=this.t;if(At&&e===void 0){const s=a!==void 0&&a.length===1;s&&(e=Vt.get(a)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&Vt.set(a,e))}return e}toString(){return this.cssText}};const La=f=>new ga(typeof f=="string"?f:f+"",void 0,qt),V=(f,...e)=>{const a=f.length===1?f[0]:e.reduce((s,i,t)=>s+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+f[t+1],f[0]);return new ga(a,f,qt)},Da=(f,e)=>{if(At)f.adoptedStyleSheets=e.map(a=>a instanceof CSSStyleSheet?a:a.styleSheet);else for(const a of e){const s=document.createElement("style"),i=ot.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=a.cssText,f.appendChild(s)}},Gt=At?f=>f:f=>f instanceof CSSStyleSheet?(e=>{let a="";for(const s of e.cssRules)a+=s.cssText;return La(a)})(f):f;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:_a,defineProperty:$a,getOwnPropertyDescriptor:za,getOwnPropertyNames:Oa,getOwnPropertySymbols:Ba,getPrototypeOf:Ra}=Object,ve=globalThis,Qt=ve.trustedTypes,Fa=Qt?Qt.emptyScript:"",yt=ve.reactiveElementPolyfillSupport,Be=(f,e)=>f,rt={toAttribute(f,e){switch(e){case Boolean:f=f?Fa:null;break;case Object:case Array:f=f==null?f:JSON.stringify(f)}return f},fromAttribute(f,e){let a=f;switch(e){case Boolean:a=f!==null;break;case Number:a=f===null?null:Number(f);break;case Object:case Array:try{a=JSON.parse(f)}catch{a=null}}return a}},Tt=(f,e)=>!_a(f,e),Ht={attribute:!0,type:String,converter:rt,reflect:!1,useDefault:!1,hasChanged:Tt};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),ve.litPropertyMetadata??(ve.litPropertyMetadata=new WeakMap);let Le=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,a=Ht){if(a.state&&(a.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((a=Object.create(a)).wrapped=!0),this.elementProperties.set(e,a),!a.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(e,s,a);i!==void 0&&$a(this.prototype,e,i)}}static getPropertyDescriptor(e,a,s){const{get:i,set:t}=za(this.prototype,e)??{get(){return this[a]},set(n){this[a]=n}};return{get:i,set(n){const l=i==null?void 0:i.call(this);t==null||t.call(this,n),this.requestUpdate(e,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Ht}static _$Ei(){if(this.hasOwnProperty(Be("elementProperties")))return;const e=Ra(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(Be("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Be("properties"))){const a=this.properties,s=[...Oa(a),...Ba(a)];for(const i of s)this.createProperty(i,a[i])}const e=this[Symbol.metadata];if(e!==null){const a=litPropertyMetadata.get(e);if(a!==void 0)for(const[s,i]of a)this.elementProperties.set(s,i)}this._$Eh=new Map;for(const[a,s]of this.elementProperties){const i=this._$Eu(a,s);i!==void 0&&this._$Eh.set(i,a)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const a=[];if(Array.isArray(e)){const s=new Set(e.flat(1/0).reverse());for(const i of s)a.unshift(Gt(i))}else e!==void 0&&a.push(Gt(e));return a}static _$Eu(e,a){const s=a.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(a=>this.enableUpdating=a),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(a=>a(this))}addController(e){var a;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((a=e.hostConnected)==null||a.call(e))}removeController(e){var a;(a=this._$EO)==null||a.delete(e)}_$E_(){const e=new Map,a=this.constructor.elementProperties;for(const s of a.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Da(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(a=>{var s;return(s=a.hostConnected)==null?void 0:s.call(a)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(a=>{var s;return(s=a.hostDisconnected)==null?void 0:s.call(a)})}attributeChangedCallback(e,a,s){this._$AK(e,s)}_$ET(e,a){var t;const s=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,s);if(i!==void 0&&s.reflect===!0){const n=(((t=s.converter)==null?void 0:t.toAttribute)!==void 0?s.converter:rt).toAttribute(a,s.type);this._$Em=e,n==null?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(e,a){var t,n;const s=this.constructor,i=s._$Eh.get(e);if(i!==void 0&&this._$Em!==i){const l=s.getPropertyOptions(i),r=typeof l.converter=="function"?{fromAttribute:l.converter}:((t=l.converter)==null?void 0:t.fromAttribute)!==void 0?l.converter:rt;this._$Em=i,this[i]=r.fromAttribute(a,l.type)??((n=this._$Ej)==null?void 0:n.get(i))??null,this._$Em=null}}requestUpdate(e,a,s){var i;if(e!==void 0){const t=this.constructor,n=this[e];if(s??(s=t.getPropertyOptions(e)),!((s.hasChanged??Tt)(n,a)||s.useDefault&&s.reflect&&n===((i=this._$Ej)==null?void 0:i.get(e))&&!this.hasAttribute(t._$Eu(e,s))))return;this.C(e,a,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,a,{useDefault:s,reflect:i,wrapped:t},n){s&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,n??a??this[e]),t!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||s||(a=void 0),this._$AL.set(e,a)),i===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(a){Promise.reject(a)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var s;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[t,n]of this._$Ep)this[t]=n;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[t,n]of i){const{wrapped:l}=n,r=this[t];l!==!0||this._$AL.has(t)||r===void 0||this.C(t,void 0,n,r)}}let e=!1;const a=this._$AL;try{e=this.shouldUpdate(a),e?(this.willUpdate(a),(s=this._$EO)==null||s.forEach(i=>{var t;return(t=i.hostUpdate)==null?void 0:t.call(i)}),this.update(a)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(a)}willUpdate(e){}_$AE(e){var a;(a=this._$EO)==null||a.forEach(s=>{var i;return(i=s.hostUpdated)==null?void 0:i.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(a=>this._$ET(a,this[a]))),this._$EM()}updated(e){}firstUpdated(e){}};Le.elementStyles=[],Le.shadowRootOptions={mode:"open"},Le[Be("elementProperties")]=new Map,Le[Be("finalized")]=new Map,yt==null||yt({ReactiveElement:Le}),(ve.reactiveElementVersions??(ve.reactiveElementVersions=[])).push("2.1.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Re=globalThis,lt=Re.trustedTypes,Wt=lt?lt.createPolicy("lit-html",{createHTML:f=>f}):void 0,fa="$lit$",me=`lit$${Math.random().toFixed(9).slice(2)}$`,ma="?"+me,Ua=`<${ma}>`,we=document,Fe=()=>we.createComment(""),Ue=f=>f===null||typeof f!="object"&&typeof f!="function",kt=Array.isArray,Na=f=>kt(f)||typeof(f==null?void 0:f[Symbol.iterator])=="function",bt=`[ 	
\f\r]`,Oe=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,jt=/-->/g,Kt=/>/g,be=RegExp(`>|${bt}(?:([^\\s"'>=/]+)(${bt}*=${bt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Yt=/'/g,Xt=/"/g,va=/^(?:script|style|textarea|title)$/i,ya=f=>(e,...a)=>({_$litType$:f,strings:e,values:a}),B=ya(1),Va=ya(2),Ee=Symbol.for("lit-noChange"),N=Symbol.for("lit-nothing"),Zt=new WeakMap,Ce=we.createTreeWalker(we,129);function ba(f,e){if(!kt(f)||!f.hasOwnProperty("raw"))throw Error("invalid template strings array");return Wt!==void 0?Wt.createHTML(e):e}const Ga=(f,e)=>{const a=f.length-1,s=[];let i,t=e===2?"<svg>":e===3?"<math>":"",n=Oe;for(let l=0;l<a;l++){const r=f[l];let g,c,p=-1,u=0;for(;u<r.length&&(n.lastIndex=u,c=n.exec(r),c!==null);)u=n.lastIndex,n===Oe?c[1]==="!--"?n=jt:c[1]!==void 0?n=Kt:c[2]!==void 0?(va.test(c[2])&&(i=RegExp("</"+c[2],"g")),n=be):c[3]!==void 0&&(n=be):n===be?c[0]===">"?(n=i??Oe,p=-1):c[1]===void 0?p=-2:(p=n.lastIndex-c[2].length,g=c[1],n=c[3]===void 0?be:c[3]==='"'?Xt:Yt):n===Xt||n===Yt?n=be:n===jt||n===Kt?n=Oe:(n=be,i=void 0);const o=n===be&&f[l+1].startsWith("/>")?" ":"";t+=n===Oe?r+Ua:p>=0?(s.push(g),r.slice(0,p)+fa+r.slice(p)+me+o):r+me+(p===-2?l:o)}return[ba(f,t+(f[a]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),s]};class Ne{constructor({strings:e,_$litType$:a},s){let i;this.parts=[];let t=0,n=0;const l=e.length-1,r=this.parts,[g,c]=Ga(e,a);if(this.el=Ne.createElement(g,s),Ce.currentNode=this.el.content,a===2||a===3){const p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(i=Ce.nextNode())!==null&&r.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(const p of i.getAttributeNames())if(p.endsWith(fa)){const u=c[n++],o=i.getAttribute(p).split(me),d=/([.?@])?(.*)/.exec(u);r.push({type:1,index:t,name:d[2],strings:o,ctor:d[1]==="."?Ha:d[1]==="?"?Wa:d[1]==="@"?ja:pt}),i.removeAttribute(p)}else p.startsWith(me)&&(r.push({type:6,index:t}),i.removeAttribute(p));if(va.test(i.tagName)){const p=i.textContent.split(me),u=p.length-1;if(u>0){i.textContent=lt?lt.emptyScript:"";for(let o=0;o<u;o++)i.append(p[o],Fe()),Ce.nextNode(),r.push({type:2,index:++t});i.append(p[u],Fe())}}}else if(i.nodeType===8)if(i.data===ma)r.push({type:2,index:t});else{let p=-1;for(;(p=i.data.indexOf(me,p+1))!==-1;)r.push({type:7,index:t}),p+=me.length-1}t++}}static createElement(e,a){const s=we.createElement("template");return s.innerHTML=e,s}}function De(f,e,a=f,s){var n,l;if(e===Ee)return e;let i=s!==void 0?(n=a._$Co)==null?void 0:n[s]:a._$Cl;const t=Ue(e)?void 0:e._$litDirective$;return(i==null?void 0:i.constructor)!==t&&((l=i==null?void 0:i._$AO)==null||l.call(i,!1),t===void 0?i=void 0:(i=new t(f),i._$AT(f,a,s)),s!==void 0?(a._$Co??(a._$Co=[]))[s]=i:a._$Cl=i),i!==void 0&&(e=De(f,i._$AS(f,e.values),i,s)),e}class Qa{constructor(e,a){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=a}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:a},parts:s}=this._$AD,i=((e==null?void 0:e.creationScope)??we).importNode(a,!0);Ce.currentNode=i;let t=Ce.nextNode(),n=0,l=0,r=s[0];for(;r!==void 0;){if(n===r.index){let g;r.type===2?g=new We(t,t.nextSibling,this,e):r.type===1?g=new r.ctor(t,r.name,r.strings,this,e):r.type===6&&(g=new Ka(t,this,e)),this._$AV.push(g),r=s[++l]}n!==(r==null?void 0:r.index)&&(t=Ce.nextNode(),n++)}return Ce.currentNode=we,i}p(e){let a=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,a),a+=s.strings.length-2):s._$AI(e[a])),a++}}class We{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,a,s,i){this.type=2,this._$AH=N,this._$AN=void 0,this._$AA=e,this._$AB=a,this._$AM=s,this.options=i,this._$Cv=(i==null?void 0:i.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const a=this._$AM;return a!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=a.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,a=this){e=De(this,e,a),Ue(e)?e===N||e==null||e===""?(this._$AH!==N&&this._$AR(),this._$AH=N):e!==this._$AH&&e!==Ee&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Na(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==N&&Ue(this._$AH)?this._$AA.nextSibling.data=e:this.T(we.createTextNode(e)),this._$AH=e}$(e){var t;const{values:a,_$litType$:s}=e,i=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=Ne.createElement(ba(s.h,s.h[0]),this.options)),s);if(((t=this._$AH)==null?void 0:t._$AD)===i)this._$AH.p(a);else{const n=new Qa(i,this),l=n.u(this.options);n.p(a),this.T(l),this._$AH=n}}_$AC(e){let a=Zt.get(e.strings);return a===void 0&&Zt.set(e.strings,a=new Ne(e)),a}k(e){kt(this._$AH)||(this._$AH=[],this._$AR());const a=this._$AH;let s,i=0;for(const t of e)i===a.length?a.push(s=new We(this.O(Fe()),this.O(Fe()),this,this.options)):s=a[i],s._$AI(t),i++;i<a.length&&(this._$AR(s&&s._$AB.nextSibling,i),a.length=i)}_$AR(e=this._$AA.nextSibling,a){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,a);e&&e!==this._$AB;){const i=e.nextSibling;e.remove(),e=i}}setConnected(e){var a;this._$AM===void 0&&(this._$Cv=e,(a=this._$AP)==null||a.call(this,e))}}class pt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,a,s,i,t){this.type=1,this._$AH=N,this._$AN=void 0,this.element=e,this.name=a,this._$AM=i,this.options=t,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=N}_$AI(e,a=this,s,i){const t=this.strings;let n=!1;if(t===void 0)e=De(this,e,a,0),n=!Ue(e)||e!==this._$AH&&e!==Ee,n&&(this._$AH=e);else{const l=e;let r,g;for(e=t[0],r=0;r<t.length-1;r++)g=De(this,l[s+r],a,r),g===Ee&&(g=this._$AH[r]),n||(n=!Ue(g)||g!==this._$AH[r]),g===N?e=N:e!==N&&(e+=(g??"")+t[r+1]),this._$AH[r]=g}n&&!i&&this.j(e)}j(e){e===N?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Ha extends pt{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===N?void 0:e}}class Wa extends pt{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==N)}}class ja extends pt{constructor(e,a,s,i,t){super(e,a,s,i,t),this.type=5}_$AI(e,a=this){if((e=De(this,e,a,0)??N)===Ee)return;const s=this._$AH,i=e===N&&s!==N||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,t=e!==N&&(s===N||i);i&&this.element.removeEventListener(this.name,this,s),t&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var a;typeof this._$AH=="function"?this._$AH.call(((a=this.options)==null?void 0:a.host)??this.element,e):this._$AH.handleEvent(e)}}class Ka{constructor(e,a,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=a,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){De(this,e)}}const xt=Re.litHtmlPolyfillSupport;xt==null||xt(Ne,We),(Re.litHtmlVersions??(Re.litHtmlVersions=[])).push("3.3.0");const Ya=(f,e,a)=>{const s=(a==null?void 0:a.renderBefore)??e;let i=s._$litPart$;if(i===void 0){const t=(a==null?void 0:a.renderBefore)??null;s._$litPart$=i=new We(e.insertBefore(Fe(),t),t,void 0,a??{})}return i._$AI(f),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Se=globalThis;let R=class extends Le{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var a;const e=super.createRenderRoot();return(a=this.renderOptions).renderBefore??(a.renderBefore=e.firstChild),e}update(e){const a=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Ya(a,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return Ee}};var pa;R._$litElement$=!0,R.finalized=!0,(pa=Se.litElementHydrateSupport)==null||pa.call(Se,{LitElement:R});const Ct=Se.litElementPolyfillSupport;Ct==null||Ct({LitElement:R});(Se.litElementVersions??(Se.litElementVersions=[])).push("4.2.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const G=f=>(e,a)=>{a!==void 0?a.addInitializer(()=>{customElements.define(f,e)}):customElements.define(f,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Xa={attribute:!0,type:String,converter:rt,reflect:!1,hasChanged:Tt},Za=(f=Xa,e,a)=>{const{kind:s,metadata:i}=a;let t=globalThis.litPropertyMetadata.get(i);if(t===void 0&&globalThis.litPropertyMetadata.set(i,t=new Map),s==="setter"&&((f=Object.create(f)).wrapped=!0),t.set(a.name,f),s==="accessor"){const{name:n}=a;return{set(l){const r=e.get.call(this);e.set.call(this,l),this.requestUpdate(n,r,f)},init(l){return l!==void 0&&this.C(n,void 0,f,l),l}}}if(s==="setter"){const{name:n}=a;return function(l){const r=this[n];e.call(this,l),this.requestUpdate(n,r,f)}}throw Error("Unsupported decorator location: "+s)};function $(f){return(e,a)=>typeof a=="object"?Za(f,e,a):((s,i,t)=>{const n=i.hasOwnProperty(t);return i.constructor.createProperty(t,s),n?Object.getOwnPropertyDescriptor(i,t):void 0})(f,e,a)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function U(f){return $({...f,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ja=(f,e,a)=>(a.configurable=!0,a.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(f,e,a),a);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ae(f,e){return(a,s,i)=>{const t=n=>{var l;return((l=n.renderRoot)==null?void 0:l.querySelector(f))??null};return Ja(a,s,{get(){return t(this)}})}}var ei=Object.defineProperty,ti=Object.getOwnPropertyDescriptor,xa=(f,e,a,s)=>{for(var i=s>1?void 0:s?ti(e,a):e,t=f.length-1,n;t>=0;t--)(n=f[t])&&(i=(s?n(e,a,i):n(i))||i);return s&&i&&ei(e,a,i),i};let ct=class extends R{constructor(){super(...arguments),this.visible=!1}render(){return B``}};ct.styles=V`
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
  `;xa([$({type:Boolean,reflect:!0})],ct.prototype,"visible",2);ct=xa([G("blur-backdrop-component")],ct);var Jt=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function ai(f){return f&&f.__esModule&&Object.prototype.hasOwnProperty.call(f,"default")?f.default:f}var st={exports:{}};/*!
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
 */var ii=st.exports,ea;function ni(){return ea||(ea=1,function(f,e){(function(s,i){f.exports=i()})(ii,function(){return function(a){var s={};function i(t){if(s[t])return s[t].exports;var n=s[t]={i:t,l:!1,exports:{}};return a[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}return i.m=a,i.c=s,i.d=function(t,n,l){i.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:l})},i.r=function(t){typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,n){if(n&1&&(t=i(t)),n&8||n&4&&typeof t=="object"&&t&&t.__esModule)return t;var l=Object.create(null);if(i.r(l),Object.defineProperty(l,"default",{enumerable:!0,value:t}),n&2&&typeof t!="string")for(var r in t)i.d(l,r,(function(g){return t[g]}).bind(null,r));return l},i.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(n,"a",n),n},i.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},i.p="",i(i.s=20)}([function(a,s){var i={};a.exports=i,function(){i._baseDelta=1e3/60,i._nextId=0,i._seed=0,i._nowStartTime=+new Date,i._warnedOnce={},i._decomp=null,i.extend=function(n,l){var r,g;typeof l=="boolean"?(r=2,g=l):(r=1,g=!0);for(var c=r;c<arguments.length;c++){var p=arguments[c];if(p)for(var u in p)g&&p[u]&&p[u].constructor===Object&&(!n[u]||n[u].constructor===Object)?(n[u]=n[u]||{},i.extend(n[u],g,p[u])):n[u]=p[u]}return n},i.clone=function(n,l){return i.extend({},l,n)},i.keys=function(n){if(Object.keys)return Object.keys(n);var l=[];for(var r in n)l.push(r);return l},i.values=function(n){var l=[];if(Object.keys){for(var r=Object.keys(n),g=0;g<r.length;g++)l.push(n[r[g]]);return l}for(var c in n)l.push(n[c]);return l},i.get=function(n,l,r,g){l=l.split(".").slice(r,g);for(var c=0;c<l.length;c+=1)n=n[l[c]];return n},i.set=function(n,l,r,g,c){var p=l.split(".").slice(g,c);return i.get(n,l,0,-1)[p[p.length-1]]=r,r},i.shuffle=function(n){for(var l=n.length-1;l>0;l--){var r=Math.floor(i.random()*(l+1)),g=n[l];n[l]=n[r],n[r]=g}return n},i.choose=function(n){return n[Math.floor(i.random()*n.length)]},i.isElement=function(n){return typeof HTMLElement<"u"?n instanceof HTMLElement:!!(n&&n.nodeType&&n.nodeName)},i.isArray=function(n){return Object.prototype.toString.call(n)==="[object Array]"},i.isFunction=function(n){return typeof n=="function"},i.isPlainObject=function(n){return typeof n=="object"&&n.constructor===Object},i.isString=function(n){return toString.call(n)==="[object String]"},i.clamp=function(n,l,r){return n<l?l:n>r?r:n},i.sign=function(n){return n<0?-1:1},i.now=function(){if(typeof window<"u"&&window.performance){if(window.performance.now)return window.performance.now();if(window.performance.webkitNow)return window.performance.webkitNow()}return Date.now?Date.now():new Date-i._nowStartTime},i.random=function(n,l){return n=typeof n<"u"?n:0,l=typeof l<"u"?l:1,n+t()*(l-n)};var t=function(){return i._seed=(i._seed*9301+49297)%233280,i._seed/233280};i.colorToNumber=function(n){return n=n.replace("#",""),n.length==3&&(n=n.charAt(0)+n.charAt(0)+n.charAt(1)+n.charAt(1)+n.charAt(2)+n.charAt(2)),parseInt(n,16)},i.logLevel=1,i.log=function(){console&&i.logLevel>0&&i.logLevel<=3&&console.log.apply(console,["matter-js:"].concat(Array.prototype.slice.call(arguments)))},i.info=function(){console&&i.logLevel>0&&i.logLevel<=2&&console.info.apply(console,["matter-js:"].concat(Array.prototype.slice.call(arguments)))},i.warn=function(){console&&i.logLevel>0&&i.logLevel<=3&&console.warn.apply(console,["matter-js:"].concat(Array.prototype.slice.call(arguments)))},i.warnOnce=function(){var n=Array.prototype.slice.call(arguments).join(" ");i._warnedOnce[n]||(i.warn(n),i._warnedOnce[n]=!0)},i.deprecated=function(n,l,r){n[l]=i.chain(function(){i.warnOnce("🔅 deprecated 🔅",r)},n[l])},i.nextId=function(){return i._nextId++},i.indexOf=function(n,l){if(n.indexOf)return n.indexOf(l);for(var r=0;r<n.length;r++)if(n[r]===l)return r;return-1},i.map=function(n,l){if(n.map)return n.map(l);for(var r=[],g=0;g<n.length;g+=1)r.push(l(n[g]));return r},i.topologicalSort=function(n){var l=[],r=[],g=[];for(var c in n)!r[c]&&!g[c]&&i._topologicalSort(c,r,g,n,l);return l},i._topologicalSort=function(n,l,r,g,c){var p=g[n]||[];r[n]=!0;for(var u=0;u<p.length;u+=1){var o=p[u];r[o]||l[o]||i._topologicalSort(o,l,r,g,c)}r[n]=!1,l[n]=!0,c.push(n)},i.chain=function(){for(var n=[],l=0;l<arguments.length;l+=1){var r=arguments[l];r._chained?n.push.apply(n,r._chained):n.push(r)}var g=function(){for(var c,p=new Array(arguments.length),u=0,o=arguments.length;u<o;u++)p[u]=arguments[u];for(u=0;u<n.length;u+=1){var d=n[u].apply(c,p);typeof d<"u"&&(c=d)}return c};return g._chained=n,g},i.chainPathBefore=function(n,l,r){return i.set(n,l,i.chain(r,i.get(n,l)))},i.chainPathAfter=function(n,l,r){return i.set(n,l,i.chain(i.get(n,l),r))},i.setDecomp=function(n){i._decomp=n},i.getDecomp=function(){var n=i._decomp;try{!n&&typeof window<"u"&&(n=window.decomp),!n&&typeof Jt<"u"&&(n=Jt.decomp)}catch{n=null}return n}}()},function(a,s){var i={};a.exports=i,function(){i.create=function(t){var n={min:{x:0,y:0},max:{x:0,y:0}};return t&&i.update(n,t),n},i.update=function(t,n,l){t.min.x=1/0,t.max.x=-1/0,t.min.y=1/0,t.max.y=-1/0;for(var r=0;r<n.length;r++){var g=n[r];g.x>t.max.x&&(t.max.x=g.x),g.x<t.min.x&&(t.min.x=g.x),g.y>t.max.y&&(t.max.y=g.y),g.y<t.min.y&&(t.min.y=g.y)}l&&(l.x>0?t.max.x+=l.x:t.min.x+=l.x,l.y>0?t.max.y+=l.y:t.min.y+=l.y)},i.contains=function(t,n){return n.x>=t.min.x&&n.x<=t.max.x&&n.y>=t.min.y&&n.y<=t.max.y},i.overlaps=function(t,n){return t.min.x<=n.max.x&&t.max.x>=n.min.x&&t.max.y>=n.min.y&&t.min.y<=n.max.y},i.translate=function(t,n){t.min.x+=n.x,t.max.x+=n.x,t.min.y+=n.y,t.max.y+=n.y},i.shift=function(t,n){var l=t.max.x-t.min.x,r=t.max.y-t.min.y;t.min.x=n.x,t.max.x=n.x+l,t.min.y=n.y,t.max.y=n.y+r}}()},function(a,s){var i={};a.exports=i,function(){i.create=function(t,n){return{x:t||0,y:n||0}},i.clone=function(t){return{x:t.x,y:t.y}},i.magnitude=function(t){return Math.sqrt(t.x*t.x+t.y*t.y)},i.magnitudeSquared=function(t){return t.x*t.x+t.y*t.y},i.rotate=function(t,n,l){var r=Math.cos(n),g=Math.sin(n);l||(l={});var c=t.x*r-t.y*g;return l.y=t.x*g+t.y*r,l.x=c,l},i.rotateAbout=function(t,n,l,r){var g=Math.cos(n),c=Math.sin(n);r||(r={});var p=l.x+((t.x-l.x)*g-(t.y-l.y)*c);return r.y=l.y+((t.x-l.x)*c+(t.y-l.y)*g),r.x=p,r},i.normalise=function(t){var n=i.magnitude(t);return n===0?{x:0,y:0}:{x:t.x/n,y:t.y/n}},i.dot=function(t,n){return t.x*n.x+t.y*n.y},i.cross=function(t,n){return t.x*n.y-t.y*n.x},i.cross3=function(t,n,l){return(n.x-t.x)*(l.y-t.y)-(n.y-t.y)*(l.x-t.x)},i.add=function(t,n,l){return l||(l={}),l.x=t.x+n.x,l.y=t.y+n.y,l},i.sub=function(t,n,l){return l||(l={}),l.x=t.x-n.x,l.y=t.y-n.y,l},i.mult=function(t,n){return{x:t.x*n,y:t.y*n}},i.div=function(t,n){return{x:t.x/n,y:t.y/n}},i.perp=function(t,n){return n=n===!0?-1:1,{x:n*-t.y,y:n*t.x}},i.neg=function(t){return{x:-t.x,y:-t.y}},i.angle=function(t,n){return Math.atan2(n.y-t.y,n.x-t.x)},i._temp=[i.create(),i.create(),i.create(),i.create(),i.create(),i.create()]}()},function(a,s,i){var t={};a.exports=t;var n=i(2),l=i(0);(function(){t.create=function(r,g){for(var c=[],p=0;p<r.length;p++){var u=r[p],o={x:u.x,y:u.y,index:p,body:g,isInternal:!1};c.push(o)}return c},t.fromPath=function(r,g){var c=/L?\s*([-\d.e]+)[\s,]*([-\d.e]+)*/ig,p=[];return r.replace(c,function(u,o,d){p.push({x:parseFloat(o),y:parseFloat(d)})}),t.create(p,g)},t.centre=function(r){for(var g=t.area(r,!0),c={x:0,y:0},p,u,o,d=0;d<r.length;d++)o=(d+1)%r.length,p=n.cross(r[d],r[o]),u=n.mult(n.add(r[d],r[o]),p),c=n.add(c,u);return n.div(c,6*g)},t.mean=function(r){for(var g={x:0,y:0},c=0;c<r.length;c++)g.x+=r[c].x,g.y+=r[c].y;return n.div(g,r.length)},t.area=function(r,g){for(var c=0,p=r.length-1,u=0;u<r.length;u++)c+=(r[p].x-r[u].x)*(r[p].y+r[u].y),p=u;return g?c/2:Math.abs(c)/2},t.inertia=function(r,g){for(var c=0,p=0,u=r,o,d,h=0;h<u.length;h++)d=(h+1)%u.length,o=Math.abs(n.cross(u[d],u[h])),c+=o*(n.dot(u[d],u[d])+n.dot(u[d],u[h])+n.dot(u[h],u[h])),p+=o;return g/6*(c/p)},t.translate=function(r,g,c){c=typeof c<"u"?c:1;var p=r.length,u=g.x*c,o=g.y*c,d;for(d=0;d<p;d++)r[d].x+=u,r[d].y+=o;return r},t.rotate=function(r,g,c){if(g!==0){var p=Math.cos(g),u=Math.sin(g),o=c.x,d=c.y,h=r.length,m,y,w,M;for(M=0;M<h;M++)m=r[M],y=m.x-o,w=m.y-d,m.x=o+(y*p-w*u),m.y=d+(y*u+w*p);return r}},t.contains=function(r,g){for(var c=g.x,p=g.y,u=r.length,o=r[u-1],d,h=0;h<u;h++){if(d=r[h],(c-o.x)*(d.y-o.y)+(p-o.y)*(o.x-d.x)>0)return!1;o=d}return!0},t.scale=function(r,g,c,p){if(g===1&&c===1)return r;p=p||t.centre(r);for(var u,o,d=0;d<r.length;d++)u=r[d],o=n.sub(u,p),r[d].x=p.x+o.x*g,r[d].y=p.y+o.y*c;return r},t.chamfer=function(r,g,c,p,u){typeof g=="number"?g=[g]:g=g||[8],c=typeof c<"u"?c:-1,p=p||2,u=u||14;for(var o=[],d=0;d<r.length;d++){var h=r[d-1>=0?d-1:r.length-1],m=r[d],y=r[(d+1)%r.length],w=g[d<g.length?d:g.length-1];if(w===0){o.push(m);continue}var M=n.normalise({x:m.y-h.y,y:h.x-m.x}),q=n.normalise({x:y.y-m.y,y:m.x-y.x}),v=Math.sqrt(2*Math.pow(w,2)),x=n.mult(l.clone(M),w),C=n.normalise(n.mult(n.add(M,q),.5)),b=n.sub(m,n.mult(C,v)),E=c;c===-1&&(E=Math.pow(w,.32)*1.75),E=l.clamp(E,p,u),E%2===1&&(E+=1);for(var S=Math.acos(n.dot(M,q)),I=S/E,A=0;A<E;A++)o.push(n.add(n.rotate(x,I*A),b))}return o},t.clockwiseSort=function(r){var g=t.mean(r);return r.sort(function(c,p){return n.angle(g,c)-n.angle(g,p)}),r},t.isConvex=function(r){var g=0,c=r.length,p,u,o,d;if(c<3)return null;for(p=0;p<c;p++)if(u=(p+1)%c,o=(p+2)%c,d=(r[u].x-r[p].x)*(r[o].y-r[u].y),d-=(r[u].y-r[p].y)*(r[o].x-r[u].x),d<0?g|=1:d>0&&(g|=2),g===3)return!1;return g!==0?!0:null},t.hull=function(r){var g=[],c=[],p,u;for(r=r.slice(0),r.sort(function(o,d){var h=o.x-d.x;return h!==0?h:o.y-d.y}),u=0;u<r.length;u+=1){for(p=r[u];c.length>=2&&n.cross3(c[c.length-2],c[c.length-1],p)<=0;)c.pop();c.push(p)}for(u=r.length-1;u>=0;u-=1){for(p=r[u];g.length>=2&&n.cross3(g[g.length-2],g[g.length-1],p)<=0;)g.pop();g.push(p)}return g.pop(),c.pop(),g.concat(c)}})()},function(a,s,i){var t={};a.exports=t;var n=i(3),l=i(2),r=i(7),g=i(0),c=i(1),p=i(11);(function(){t._timeCorrection=!0,t._inertiaScale=4,t._nextCollidingGroupId=1,t._nextNonCollidingGroupId=-1,t._nextCategory=1,t._baseDelta=1e3/60,t.create=function(o){var d={id:g.nextId(),type:"body",label:"Body",parts:[],plugin:{},angle:0,vertices:n.fromPath("L 0 0 L 40 0 L 40 40 L 0 40"),position:{x:0,y:0},force:{x:0,y:0},torque:0,positionImpulse:{x:0,y:0},constraintImpulse:{x:0,y:0,angle:0},totalContacts:0,speed:0,angularSpeed:0,velocity:{x:0,y:0},angularVelocity:0,isSensor:!1,isStatic:!1,isSleeping:!1,motion:0,sleepThreshold:60,density:.001,restitution:0,friction:.1,frictionStatic:.5,frictionAir:.01,collisionFilter:{category:1,mask:4294967295,group:0},slop:.05,timeScale:1,render:{visible:!0,opacity:1,strokeStyle:null,fillStyle:null,lineWidth:null,sprite:{xScale:1,yScale:1,xOffset:0,yOffset:0}},events:null,bounds:null,chamfer:null,circleRadius:0,positionPrev:null,anglePrev:0,parent:null,axes:null,area:0,mass:0,inertia:0,deltaTime:16.666666666666668,_original:null},h=g.extend(d,o);return u(h,o),h},t.nextGroup=function(o){return o?t._nextNonCollidingGroupId--:t._nextCollidingGroupId++},t.nextCategory=function(){return t._nextCategory=t._nextCategory<<1,t._nextCategory};var u=function(o,d){d=d||{},t.set(o,{bounds:o.bounds||c.create(o.vertices),positionPrev:o.positionPrev||l.clone(o.position),anglePrev:o.anglePrev||o.angle,vertices:o.vertices,parts:o.parts||[o],isStatic:o.isStatic,isSleeping:o.isSleeping,parent:o.parent||o}),n.rotate(o.vertices,o.angle,o.position),p.rotate(o.axes,o.angle),c.update(o.bounds,o.vertices,o.velocity),t.set(o,{axes:d.axes||o.axes,area:d.area||o.area,mass:d.mass||o.mass,inertia:d.inertia||o.inertia});var h=o.isStatic?"#14151f":g.choose(["#f19648","#f5d259","#f55a3c","#063e7b","#ececd1"]),m=o.isStatic?"#555":"#ccc",y=o.isStatic&&o.render.fillStyle===null?1:0;o.render.fillStyle=o.render.fillStyle||h,o.render.strokeStyle=o.render.strokeStyle||m,o.render.lineWidth=o.render.lineWidth||y,o.render.sprite.xOffset+=-(o.bounds.min.x-o.position.x)/(o.bounds.max.x-o.bounds.min.x),o.render.sprite.yOffset+=-(o.bounds.min.y-o.position.y)/(o.bounds.max.y-o.bounds.min.y)};t.set=function(o,d,h){var m;typeof d=="string"&&(m=d,d={},d[m]=h);for(m in d)if(Object.prototype.hasOwnProperty.call(d,m))switch(h=d[m],m){case"isStatic":t.setStatic(o,h);break;case"isSleeping":r.set(o,h);break;case"mass":t.setMass(o,h);break;case"density":t.setDensity(o,h);break;case"inertia":t.setInertia(o,h);break;case"vertices":t.setVertices(o,h);break;case"position":t.setPosition(o,h);break;case"angle":t.setAngle(o,h);break;case"velocity":t.setVelocity(o,h);break;case"angularVelocity":t.setAngularVelocity(o,h);break;case"speed":t.setSpeed(o,h);break;case"angularSpeed":t.setAngularSpeed(o,h);break;case"parts":t.setParts(o,h);break;case"centre":t.setCentre(o,h);break;default:o[m]=h}},t.setStatic=function(o,d){for(var h=0;h<o.parts.length;h++){var m=o.parts[h];d?(m.isStatic||(m._original={restitution:m.restitution,friction:m.friction,mass:m.mass,inertia:m.inertia,density:m.density,inverseMass:m.inverseMass,inverseInertia:m.inverseInertia}),m.restitution=0,m.friction=1,m.mass=m.inertia=m.density=1/0,m.inverseMass=m.inverseInertia=0,m.positionPrev.x=m.position.x,m.positionPrev.y=m.position.y,m.anglePrev=m.angle,m.angularVelocity=0,m.speed=0,m.angularSpeed=0,m.motion=0):m._original&&(m.restitution=m._original.restitution,m.friction=m._original.friction,m.mass=m._original.mass,m.inertia=m._original.inertia,m.density=m._original.density,m.inverseMass=m._original.inverseMass,m.inverseInertia=m._original.inverseInertia,m._original=null),m.isStatic=d}},t.setMass=function(o,d){var h=o.inertia/(o.mass/6);o.inertia=h*(d/6),o.inverseInertia=1/o.inertia,o.mass=d,o.inverseMass=1/o.mass,o.density=o.mass/o.area},t.setDensity=function(o,d){t.setMass(o,d*o.area),o.density=d},t.setInertia=function(o,d){o.inertia=d,o.inverseInertia=1/o.inertia},t.setVertices=function(o,d){d[0].body===o?o.vertices=d:o.vertices=n.create(d,o),o.axes=p.fromVertices(o.vertices),o.area=n.area(o.vertices),t.setMass(o,o.density*o.area);var h=n.centre(o.vertices);n.translate(o.vertices,h,-1),t.setInertia(o,t._inertiaScale*n.inertia(o.vertices,o.mass)),n.translate(o.vertices,o.position),c.update(o.bounds,o.vertices,o.velocity)},t.setParts=function(o,d,h){var m;for(d=d.slice(0),o.parts.length=0,o.parts.push(o),o.parent=o,m=0;m<d.length;m++){var y=d[m];y!==o&&(y.parent=o,o.parts.push(y))}if(o.parts.length!==1){if(h=typeof h<"u"?h:!0,h){var w=[];for(m=0;m<d.length;m++)w=w.concat(d[m].vertices);n.clockwiseSort(w);var M=n.hull(w),q=n.centre(M);t.setVertices(o,M),n.translate(o.vertices,q)}var v=t._totalProperties(o);o.area=v.area,o.parent=o,o.position.x=v.centre.x,o.position.y=v.centre.y,o.positionPrev.x=v.centre.x,o.positionPrev.y=v.centre.y,t.setMass(o,v.mass),t.setInertia(o,v.inertia),t.setPosition(o,v.centre)}},t.setCentre=function(o,d,h){h?(o.positionPrev.x+=d.x,o.positionPrev.y+=d.y,o.position.x+=d.x,o.position.y+=d.y):(o.positionPrev.x=d.x-(o.position.x-o.positionPrev.x),o.positionPrev.y=d.y-(o.position.y-o.positionPrev.y),o.position.x=d.x,o.position.y=d.y)},t.setPosition=function(o,d,h){var m=l.sub(d,o.position);h?(o.positionPrev.x=o.position.x,o.positionPrev.y=o.position.y,o.velocity.x=m.x,o.velocity.y=m.y,o.speed=l.magnitude(m)):(o.positionPrev.x+=m.x,o.positionPrev.y+=m.y);for(var y=0;y<o.parts.length;y++){var w=o.parts[y];w.position.x+=m.x,w.position.y+=m.y,n.translate(w.vertices,m),c.update(w.bounds,w.vertices,o.velocity)}},t.setAngle=function(o,d,h){var m=d-o.angle;h?(o.anglePrev=o.angle,o.angularVelocity=m,o.angularSpeed=Math.abs(m)):o.anglePrev+=m;for(var y=0;y<o.parts.length;y++){var w=o.parts[y];w.angle+=m,n.rotate(w.vertices,m,o.position),p.rotate(w.axes,m),c.update(w.bounds,w.vertices,o.velocity),y>0&&l.rotateAbout(w.position,m,o.position,w.position)}},t.setVelocity=function(o,d){var h=o.deltaTime/t._baseDelta;o.positionPrev.x=o.position.x-d.x*h,o.positionPrev.y=o.position.y-d.y*h,o.velocity.x=(o.position.x-o.positionPrev.x)/h,o.velocity.y=(o.position.y-o.positionPrev.y)/h,o.speed=l.magnitude(o.velocity)},t.getVelocity=function(o){var d=t._baseDelta/o.deltaTime;return{x:(o.position.x-o.positionPrev.x)*d,y:(o.position.y-o.positionPrev.y)*d}},t.getSpeed=function(o){return l.magnitude(t.getVelocity(o))},t.setSpeed=function(o,d){t.setVelocity(o,l.mult(l.normalise(t.getVelocity(o)),d))},t.setAngularVelocity=function(o,d){var h=o.deltaTime/t._baseDelta;o.anglePrev=o.angle-d*h,o.angularVelocity=(o.angle-o.anglePrev)/h,o.angularSpeed=Math.abs(o.angularVelocity)},t.getAngularVelocity=function(o){return(o.angle-o.anglePrev)*t._baseDelta/o.deltaTime},t.getAngularSpeed=function(o){return Math.abs(t.getAngularVelocity(o))},t.setAngularSpeed=function(o,d){t.setAngularVelocity(o,g.sign(t.getAngularVelocity(o))*d)},t.translate=function(o,d,h){t.setPosition(o,l.add(o.position,d),h)},t.rotate=function(o,d,h,m){if(!h)t.setAngle(o,o.angle+d,m);else{var y=Math.cos(d),w=Math.sin(d),M=o.position.x-h.x,q=o.position.y-h.y;t.setPosition(o,{x:h.x+(M*y-q*w),y:h.y+(M*w+q*y)},m),t.setAngle(o,o.angle+d,m)}},t.scale=function(o,d,h,m){var y=0,w=0;m=m||o.position;for(var M=0;M<o.parts.length;M++){var q=o.parts[M];n.scale(q.vertices,d,h,m),q.axes=p.fromVertices(q.vertices),q.area=n.area(q.vertices),t.setMass(q,o.density*q.area),n.translate(q.vertices,{x:-q.position.x,y:-q.position.y}),t.setInertia(q,t._inertiaScale*n.inertia(q.vertices,q.mass)),n.translate(q.vertices,{x:q.position.x,y:q.position.y}),M>0&&(y+=q.area,w+=q.inertia),q.position.x=m.x+(q.position.x-m.x)*d,q.position.y=m.y+(q.position.y-m.y)*h,c.update(q.bounds,q.vertices,o.velocity)}o.parts.length>1&&(o.area=y,o.isStatic||(t.setMass(o,o.density*y),t.setInertia(o,w))),o.circleRadius&&(d===h?o.circleRadius*=d:o.circleRadius=null)},t.update=function(o,d){d=(typeof d<"u"?d:1e3/60)*o.timeScale;var h=d*d,m=t._timeCorrection?d/(o.deltaTime||d):1,y=1-o.frictionAir*(d/g._baseDelta),w=(o.position.x-o.positionPrev.x)*m,M=(o.position.y-o.positionPrev.y)*m;o.velocity.x=w*y+o.force.x/o.mass*h,o.velocity.y=M*y+o.force.y/o.mass*h,o.positionPrev.x=o.position.x,o.positionPrev.y=o.position.y,o.position.x+=o.velocity.x,o.position.y+=o.velocity.y,o.deltaTime=d,o.angularVelocity=(o.angle-o.anglePrev)*y*m+o.torque/o.inertia*h,o.anglePrev=o.angle,o.angle+=o.angularVelocity;for(var q=0;q<o.parts.length;q++){var v=o.parts[q];n.translate(v.vertices,o.velocity),q>0&&(v.position.x+=o.velocity.x,v.position.y+=o.velocity.y),o.angularVelocity!==0&&(n.rotate(v.vertices,o.angularVelocity,o.position),p.rotate(v.axes,o.angularVelocity),q>0&&l.rotateAbout(v.position,o.angularVelocity,o.position,v.position)),c.update(v.bounds,v.vertices,o.velocity)}},t.updateVelocities=function(o){var d=t._baseDelta/o.deltaTime,h=o.velocity;h.x=(o.position.x-o.positionPrev.x)*d,h.y=(o.position.y-o.positionPrev.y)*d,o.speed=Math.sqrt(h.x*h.x+h.y*h.y),o.angularVelocity=(o.angle-o.anglePrev)*d,o.angularSpeed=Math.abs(o.angularVelocity)},t.applyForce=function(o,d,h){var m={x:d.x-o.position.x,y:d.y-o.position.y};o.force.x+=h.x,o.force.y+=h.y,o.torque+=m.x*h.y-m.y*h.x},t._totalProperties=function(o){for(var d={mass:0,area:0,inertia:0,centre:{x:0,y:0}},h=o.parts.length===1?0:1;h<o.parts.length;h++){var m=o.parts[h],y=m.mass!==1/0?m.mass:1;d.mass+=y,d.area+=m.area,d.inertia+=m.inertia,d.centre=l.add(d.centre,l.mult(m.position,y))}return d.centre=l.div(d.centre,d.mass),d}})()},function(a,s,i){var t={};a.exports=t;var n=i(0);(function(){t.on=function(l,r,g){for(var c=r.split(" "),p,u=0;u<c.length;u++)p=c[u],l.events=l.events||{},l.events[p]=l.events[p]||[],l.events[p].push(g);return g},t.off=function(l,r,g){if(!r){l.events={};return}typeof r=="function"&&(g=r,r=n.keys(l.events).join(" "));for(var c=r.split(" "),p=0;p<c.length;p++){var u=l.events[c[p]],o=[];if(g&&u)for(var d=0;d<u.length;d++)u[d]!==g&&o.push(u[d]);l.events[c[p]]=o}},t.trigger=function(l,r,g){var c,p,u,o,d=l.events;if(d&&n.keys(d).length>0){g||(g={}),c=r.split(" ");for(var h=0;h<c.length;h++)if(p=c[h],u=d[p],u){o=n.clone(g,!1),o.name=p,o.source=l;for(var m=0;m<u.length;m++)u[m].apply(l,[o])}}}})()},function(a,s,i){var t={};a.exports=t;var n=i(5),l=i(0),r=i(1),g=i(4);(function(){t.create=function(c){return l.extend({id:l.nextId(),type:"composite",parent:null,isModified:!1,bodies:[],constraints:[],composites:[],label:"Composite",plugin:{},cache:{allBodies:null,allConstraints:null,allComposites:null}},c)},t.setModified=function(c,p,u,o){if(c.isModified=p,p&&c.cache&&(c.cache.allBodies=null,c.cache.allConstraints=null,c.cache.allComposites=null),u&&c.parent&&t.setModified(c.parent,p,u,o),o)for(var d=0;d<c.composites.length;d++){var h=c.composites[d];t.setModified(h,p,u,o)}},t.add=function(c,p){var u=[].concat(p);n.trigger(c,"beforeAdd",{object:p});for(var o=0;o<u.length;o++){var d=u[o];switch(d.type){case"body":if(d.parent!==d){l.warn("Composite.add: skipped adding a compound body part (you must add its parent instead)");break}t.addBody(c,d);break;case"constraint":t.addConstraint(c,d);break;case"composite":t.addComposite(c,d);break;case"mouseConstraint":t.addConstraint(c,d.constraint);break}}return n.trigger(c,"afterAdd",{object:p}),c},t.remove=function(c,p,u){var o=[].concat(p);n.trigger(c,"beforeRemove",{object:p});for(var d=0;d<o.length;d++){var h=o[d];switch(h.type){case"body":t.removeBody(c,h,u);break;case"constraint":t.removeConstraint(c,h,u);break;case"composite":t.removeComposite(c,h,u);break;case"mouseConstraint":t.removeConstraint(c,h.constraint);break}}return n.trigger(c,"afterRemove",{object:p}),c},t.addComposite=function(c,p){return c.composites.push(p),p.parent=c,t.setModified(c,!0,!0,!1),c},t.removeComposite=function(c,p,u){var o=l.indexOf(c.composites,p);if(o!==-1){var d=t.allBodies(p);t.removeCompositeAt(c,o);for(var h=0;h<d.length;h++)d[h].sleepCounter=0}if(u)for(var h=0;h<c.composites.length;h++)t.removeComposite(c.composites[h],p,!0);return c},t.removeCompositeAt=function(c,p){return c.composites.splice(p,1),t.setModified(c,!0,!0,!1),c},t.addBody=function(c,p){return c.bodies.push(p),t.setModified(c,!0,!0,!1),c},t.removeBody=function(c,p,u){var o=l.indexOf(c.bodies,p);if(o!==-1&&(t.removeBodyAt(c,o),p.sleepCounter=0),u)for(var d=0;d<c.composites.length;d++)t.removeBody(c.composites[d],p,!0);return c},t.removeBodyAt=function(c,p){return c.bodies.splice(p,1),t.setModified(c,!0,!0,!1),c},t.addConstraint=function(c,p){return c.constraints.push(p),t.setModified(c,!0,!0,!1),c},t.removeConstraint=function(c,p,u){var o=l.indexOf(c.constraints,p);if(o!==-1&&t.removeConstraintAt(c,o),u)for(var d=0;d<c.composites.length;d++)t.removeConstraint(c.composites[d],p,!0);return c},t.removeConstraintAt=function(c,p){return c.constraints.splice(p,1),t.setModified(c,!0,!0,!1),c},t.clear=function(c,p,u){if(u)for(var o=0;o<c.composites.length;o++)t.clear(c.composites[o],p,!0);return p?c.bodies=c.bodies.filter(function(d){return d.isStatic}):c.bodies.length=0,c.constraints.length=0,c.composites.length=0,t.setModified(c,!0,!0,!1),c},t.allBodies=function(c){if(c.cache&&c.cache.allBodies)return c.cache.allBodies;for(var p=[].concat(c.bodies),u=0;u<c.composites.length;u++)p=p.concat(t.allBodies(c.composites[u]));return c.cache&&(c.cache.allBodies=p),p},t.allConstraints=function(c){if(c.cache&&c.cache.allConstraints)return c.cache.allConstraints;for(var p=[].concat(c.constraints),u=0;u<c.composites.length;u++)p=p.concat(t.allConstraints(c.composites[u]));return c.cache&&(c.cache.allConstraints=p),p},t.allComposites=function(c){if(c.cache&&c.cache.allComposites)return c.cache.allComposites;for(var p=[].concat(c.composites),u=0;u<c.composites.length;u++)p=p.concat(t.allComposites(c.composites[u]));return c.cache&&(c.cache.allComposites=p),p},t.get=function(c,p,u){var o,d;switch(u){case"body":o=t.allBodies(c);break;case"constraint":o=t.allConstraints(c);break;case"composite":o=t.allComposites(c).concat(c);break}return o?(d=o.filter(function(h){return h.id.toString()===p.toString()}),d.length===0?null:d[0]):null},t.move=function(c,p,u){return t.remove(c,p),t.add(u,p),c},t.rebase=function(c){for(var p=t.allBodies(c).concat(t.allConstraints(c)).concat(t.allComposites(c)),u=0;u<p.length;u++)p[u].id=l.nextId();return c},t.translate=function(c,p,u){for(var o=u?t.allBodies(c):c.bodies,d=0;d<o.length;d++)g.translate(o[d],p);return c},t.rotate=function(c,p,u,o){for(var d=Math.cos(p),h=Math.sin(p),m=o?t.allBodies(c):c.bodies,y=0;y<m.length;y++){var w=m[y],M=w.position.x-u.x,q=w.position.y-u.y;g.setPosition(w,{x:u.x+(M*d-q*h),y:u.y+(M*h+q*d)}),g.rotate(w,p)}return c},t.scale=function(c,p,u,o,d){for(var h=d?t.allBodies(c):c.bodies,m=0;m<h.length;m++){var y=h[m],w=y.position.x-o.x,M=y.position.y-o.y;g.setPosition(y,{x:o.x+w*p,y:o.y+M*u}),g.scale(y,p,u)}return c},t.bounds=function(c){for(var p=t.allBodies(c),u=[],o=0;o<p.length;o+=1){var d=p[o];u.push(d.bounds.min,d.bounds.max)}return r.create(u)}})()},function(a,s,i){var t={};a.exports=t;var n=i(4),l=i(5),r=i(0);(function(){t._motionWakeThreshold=.18,t._motionSleepThreshold=.08,t._minBias=.9,t.update=function(g,c){for(var p=c/r._baseDelta,u=t._motionSleepThreshold,o=0;o<g.length;o++){var d=g[o],h=n.getSpeed(d),m=n.getAngularSpeed(d),y=h*h+m*m;if(d.force.x!==0||d.force.y!==0){t.set(d,!1);continue}var w=Math.min(d.motion,y),M=Math.max(d.motion,y);d.motion=t._minBias*w+(1-t._minBias)*M,d.sleepThreshold>0&&d.motion<u?(d.sleepCounter+=1,d.sleepCounter>=d.sleepThreshold/p&&t.set(d,!0)):d.sleepCounter>0&&(d.sleepCounter-=1)}},t.afterCollisions=function(g){for(var c=t._motionSleepThreshold,p=0;p<g.length;p++){var u=g[p];if(u.isActive){var o=u.collision,d=o.bodyA.parent,h=o.bodyB.parent;if(!(d.isSleeping&&h.isSleeping||d.isStatic||h.isStatic)&&(d.isSleeping||h.isSleeping)){var m=d.isSleeping&&!d.isStatic?d:h,y=m===d?h:d;!m.isStatic&&y.motion>c&&t.set(m,!1)}}}},t.set=function(g,c){var p=g.isSleeping;c?(g.isSleeping=!0,g.sleepCounter=g.sleepThreshold,g.positionImpulse.x=0,g.positionImpulse.y=0,g.positionPrev.x=g.position.x,g.positionPrev.y=g.position.y,g.anglePrev=g.angle,g.speed=0,g.angularSpeed=0,g.motion=0,p||l.trigger(g,"sleepStart")):(g.isSleeping=!1,g.sleepCounter=0,p&&l.trigger(g,"sleepEnd"))}})()},function(a,s,i){var t={};a.exports=t;var n=i(3),l=i(9);(function(){var r=[],g={overlap:0,axis:null},c={overlap:0,axis:null};t.create=function(p,u){return{pair:null,collided:!1,bodyA:p,bodyB:u,parentA:p.parent,parentB:u.parent,depth:0,normal:{x:0,y:0},tangent:{x:0,y:0},penetration:{x:0,y:0},supports:[null,null],supportCount:0}},t.collides=function(p,u,o){if(t._overlapAxes(g,p.vertices,u.vertices,p.axes),g.overlap<=0||(t._overlapAxes(c,u.vertices,p.vertices,u.axes),c.overlap<=0))return null;var d=o&&o.table[l.id(p,u)],h;d?h=d.collision:(h=t.create(p,u),h.collided=!0,h.bodyA=p.id<u.id?p:u,h.bodyB=p.id<u.id?u:p,h.parentA=h.bodyA.parent,h.parentB=h.bodyB.parent),p=h.bodyA,u=h.bodyB;var m;g.overlap<c.overlap?m=g:m=c;var y=h.normal,w=h.tangent,M=h.penetration,q=h.supports,v=m.overlap,x=m.axis,C=x.x,b=x.y,E=u.position.x-p.position.x,S=u.position.y-p.position.y;C*E+b*S>=0&&(C=-C,b=-b),y.x=C,y.y=b,w.x=-b,w.y=C,M.x=C*v,M.y=b*v,h.depth=v;var I=t._findSupports(p,u,y,1),A=0;if(n.contains(p.vertices,I[0])&&(q[A++]=I[0]),n.contains(p.vertices,I[1])&&(q[A++]=I[1]),A<2){var T=t._findSupports(u,p,y,-1);n.contains(u.vertices,T[0])&&(q[A++]=T[0]),A<2&&n.contains(u.vertices,T[1])&&(q[A++]=T[1])}return A===0&&(q[A++]=I[0]),h.supportCount=A,h},t._overlapAxes=function(p,u,o,d){var h=u.length,m=o.length,y=u[0].x,w=u[0].y,M=o[0].x,q=o[0].y,v=d.length,x=Number.MAX_VALUE,C=0,b,E,S,I,A,T;for(A=0;A<v;A++){var P=d[A],k=P.x,_=P.y,D=y*k+w*_,z=M*k+q*_,F=D,Q=z;for(T=1;T<h;T+=1)I=u[T].x*k+u[T].y*_,I>F?F=I:I<D&&(D=I);for(T=1;T<m;T+=1)I=o[T].x*k+o[T].y*_,I>Q?Q=I:I<z&&(z=I);if(E=F-z,S=Q-D,b=E<S?E:S,b<x&&(x=b,C=A,b<=0))break}p.axis=d[C],p.overlap=x},t._findSupports=function(p,u,o,d){var h=u.vertices,m=h.length,y=p.position.x,w=p.position.y,M=o.x*d,q=o.y*d,v=h[0],x=v,C=M*(y-x.x)+q*(w-x.y),b,E,S;for(S=1;S<m;S+=1)x=h[S],E=M*(y-x.x)+q*(w-x.y),E<C&&(C=E,v=x);return b=h[(m+v.index-1)%m],C=M*(y-b.x)+q*(w-b.y),x=h[(v.index+1)%m],M*(y-x.x)+q*(w-x.y)<C?(r[0]=v,r[1]=x,r):(r[0]=v,r[1]=b,r)}})()},function(a,s,i){var t={};a.exports=t;var n=i(16);(function(){t.create=function(l,r){var g=l.bodyA,c=l.bodyB,p={id:t.id(g,c),bodyA:g,bodyB:c,collision:l,contacts:[n.create(),n.create()],contactCount:0,separation:0,isActive:!0,isSensor:g.isSensor||c.isSensor,timeCreated:r,timeUpdated:r,inverseMass:0,friction:0,frictionStatic:0,restitution:0,slop:0};return t.update(p,l,r),p},t.update=function(l,r,g){var c=r.supports,p=r.supportCount,u=l.contacts,o=r.parentA,d=r.parentB;l.isActive=!0,l.timeUpdated=g,l.collision=r,l.separation=r.depth,l.inverseMass=o.inverseMass+d.inverseMass,l.friction=o.friction<d.friction?o.friction:d.friction,l.frictionStatic=o.frictionStatic>d.frictionStatic?o.frictionStatic:d.frictionStatic,l.restitution=o.restitution>d.restitution?o.restitution:d.restitution,l.slop=o.slop>d.slop?o.slop:d.slop,l.contactCount=p,r.pair=l;var h=c[0],m=u[0],y=c[1],w=u[1];(w.vertex===h||m.vertex===y)&&(u[1]=m,u[0]=m=w,w=u[1]),m.vertex=h,w.vertex=y},t.setActive=function(l,r,g){r?(l.isActive=!0,l.timeUpdated=g):(l.isActive=!1,l.contactCount=0)},t.id=function(l,r){return l.id<r.id?l.id.toString(36)+":"+r.id.toString(36):r.id.toString(36)+":"+l.id.toString(36)}})()},function(a,s,i){var t={};a.exports=t;var n=i(3),l=i(2),r=i(7),g=i(1),c=i(11),p=i(0);(function(){t._warming=.4,t._torqueDampen=1,t._minLength=1e-6,t.create=function(u){var o=u;o.bodyA&&!o.pointA&&(o.pointA={x:0,y:0}),o.bodyB&&!o.pointB&&(o.pointB={x:0,y:0});var d=o.bodyA?l.add(o.bodyA.position,o.pointA):o.pointA,h=o.bodyB?l.add(o.bodyB.position,o.pointB):o.pointB,m=l.magnitude(l.sub(d,h));o.length=typeof o.length<"u"?o.length:m,o.id=o.id||p.nextId(),o.label=o.label||"Constraint",o.type="constraint",o.stiffness=o.stiffness||(o.length>0?1:.7),o.damping=o.damping||0,o.angularStiffness=o.angularStiffness||0,o.angleA=o.bodyA?o.bodyA.angle:o.angleA,o.angleB=o.bodyB?o.bodyB.angle:o.angleB,o.plugin={};var y={visible:!0,lineWidth:2,strokeStyle:"#ffffff",type:"line",anchors:!0};return o.length===0&&o.stiffness>.1?(y.type="pin",y.anchors=!1):o.stiffness<.9&&(y.type="spring"),o.render=p.extend(y,o.render),o},t.preSolveAll=function(u){for(var o=0;o<u.length;o+=1){var d=u[o],h=d.constraintImpulse;d.isStatic||h.x===0&&h.y===0&&h.angle===0||(d.position.x+=h.x,d.position.y+=h.y,d.angle+=h.angle)}},t.solveAll=function(u,o){for(var d=p.clamp(o/p._baseDelta,0,1),h=0;h<u.length;h+=1){var m=u[h],y=!m.bodyA||m.bodyA&&m.bodyA.isStatic,w=!m.bodyB||m.bodyB&&m.bodyB.isStatic;(y||w)&&t.solve(u[h],d)}for(h=0;h<u.length;h+=1)m=u[h],y=!m.bodyA||m.bodyA&&m.bodyA.isStatic,w=!m.bodyB||m.bodyB&&m.bodyB.isStatic,!y&&!w&&t.solve(u[h],d)},t.solve=function(u,o){var d=u.bodyA,h=u.bodyB,m=u.pointA,y=u.pointB;if(!(!d&&!h)){d&&!d.isStatic&&(l.rotate(m,d.angle-u.angleA,m),u.angleA=d.angle),h&&!h.isStatic&&(l.rotate(y,h.angle-u.angleB,y),u.angleB=h.angle);var w=m,M=y;if(d&&(w=l.add(d.position,m)),h&&(M=l.add(h.position,y)),!(!w||!M)){var q=l.sub(w,M),v=l.magnitude(q);v<t._minLength&&(v=t._minLength);var x=(v-u.length)/v,C=u.stiffness>=1||u.length===0,b=C?u.stiffness*o:u.stiffness*o*o,E=u.damping*o,S=l.mult(q,x*b),I=(d?d.inverseMass:0)+(h?h.inverseMass:0),A=(d?d.inverseInertia:0)+(h?h.inverseInertia:0),T=I+A,P,k,_,D,z;if(E>0){var F=l.create();_=l.div(q,v),z=l.sub(h&&l.sub(h.position,h.positionPrev)||F,d&&l.sub(d.position,d.positionPrev)||F),D=l.dot(_,z)}d&&!d.isStatic&&(k=d.inverseMass/I,d.constraintImpulse.x-=S.x*k,d.constraintImpulse.y-=S.y*k,d.position.x-=S.x*k,d.position.y-=S.y*k,E>0&&(d.positionPrev.x-=E*_.x*D*k,d.positionPrev.y-=E*_.y*D*k),P=l.cross(m,S)/T*t._torqueDampen*d.inverseInertia*(1-u.angularStiffness),d.constraintImpulse.angle-=P,d.angle-=P),h&&!h.isStatic&&(k=h.inverseMass/I,h.constraintImpulse.x+=S.x*k,h.constraintImpulse.y+=S.y*k,h.position.x+=S.x*k,h.position.y+=S.y*k,E>0&&(h.positionPrev.x+=E*_.x*D*k,h.positionPrev.y+=E*_.y*D*k),P=l.cross(y,S)/T*t._torqueDampen*h.inverseInertia*(1-u.angularStiffness),h.constraintImpulse.angle+=P,h.angle+=P)}}},t.postSolveAll=function(u){for(var o=0;o<u.length;o++){var d=u[o],h=d.constraintImpulse;if(!(d.isStatic||h.x===0&&h.y===0&&h.angle===0)){r.set(d,!1);for(var m=0;m<d.parts.length;m++){var y=d.parts[m];n.translate(y.vertices,h),m>0&&(y.position.x+=h.x,y.position.y+=h.y),h.angle!==0&&(n.rotate(y.vertices,h.angle,d.position),c.rotate(y.axes,h.angle),m>0&&l.rotateAbout(y.position,h.angle,d.position,y.position)),g.update(y.bounds,y.vertices,d.velocity)}h.angle*=t._warming,h.x*=t._warming,h.y*=t._warming}}},t.pointAWorld=function(u){return{x:(u.bodyA?u.bodyA.position.x:0)+(u.pointA?u.pointA.x:0),y:(u.bodyA?u.bodyA.position.y:0)+(u.pointA?u.pointA.y:0)}},t.pointBWorld=function(u){return{x:(u.bodyB?u.bodyB.position.x:0)+(u.pointB?u.pointB.x:0),y:(u.bodyB?u.bodyB.position.y:0)+(u.pointB?u.pointB.y:0)}},t.currentLength=function(u){var o=(u.bodyA?u.bodyA.position.x:0)+(u.pointA?u.pointA.x:0),d=(u.bodyA?u.bodyA.position.y:0)+(u.pointA?u.pointA.y:0),h=(u.bodyB?u.bodyB.position.x:0)+(u.pointB?u.pointB.x:0),m=(u.bodyB?u.bodyB.position.y:0)+(u.pointB?u.pointB.y:0),y=o-h,w=d-m;return Math.sqrt(y*y+w*w)}})()},function(a,s,i){var t={};a.exports=t;var n=i(2),l=i(0);(function(){t.fromVertices=function(r){for(var g={},c=0;c<r.length;c++){var p=(c+1)%r.length,u=n.normalise({x:r[p].y-r[c].y,y:r[c].x-r[p].x}),o=u.y===0?1/0:u.x/u.y;o=o.toFixed(3).toString(),g[o]=u}return l.values(g)},t.rotate=function(r,g){if(g!==0)for(var c=Math.cos(g),p=Math.sin(g),u=0;u<r.length;u++){var o=r[u],d;d=o.x*c-o.y*p,o.y=o.x*p+o.y*c,o.x=d}}})()},function(a,s,i){var t={};a.exports=t;var n=i(3),l=i(0),r=i(4),g=i(1),c=i(2);(function(){t.rectangle=function(p,u,o,d,h){h=h||{};var m={label:"Rectangle Body",position:{x:p,y:u},vertices:n.fromPath("L 0 0 L "+o+" 0 L "+o+" "+d+" L 0 "+d)};if(h.chamfer){var y=h.chamfer;m.vertices=n.chamfer(m.vertices,y.radius,y.quality,y.qualityMin,y.qualityMax),delete h.chamfer}return r.create(l.extend({},m,h))},t.trapezoid=function(p,u,o,d,h,m){m=m||{},h>=1&&l.warn("Bodies.trapezoid: slope parameter must be < 1."),h*=.5;var y=(1-h*2)*o,w=o*h,M=w+y,q=M+w,v;h<.5?v="L 0 0 L "+w+" "+-d+" L "+M+" "+-d+" L "+q+" 0":v="L 0 0 L "+M+" "+-d+" L "+q+" 0";var x={label:"Trapezoid Body",position:{x:p,y:u},vertices:n.fromPath(v)};if(m.chamfer){var C=m.chamfer;x.vertices=n.chamfer(x.vertices,C.radius,C.quality,C.qualityMin,C.qualityMax),delete m.chamfer}return r.create(l.extend({},x,m))},t.circle=function(p,u,o,d,h){d=d||{};var m={label:"Circle Body",circleRadius:o};h=h||25;var y=Math.ceil(Math.max(10,Math.min(h,o)));return y%2===1&&(y+=1),t.polygon(p,u,y,o,l.extend({},m,d))},t.polygon=function(p,u,o,d,h){if(h=h||{},o<3)return t.circle(p,u,d,h);for(var m=2*Math.PI/o,y="",w=m*.5,M=0;M<o;M+=1){var q=w+M*m,v=Math.cos(q)*d,x=Math.sin(q)*d;y+="L "+v.toFixed(3)+" "+x.toFixed(3)+" "}var C={label:"Polygon Body",position:{x:p,y:u},vertices:n.fromPath(y)};if(h.chamfer){var b=h.chamfer;C.vertices=n.chamfer(C.vertices,b.radius,b.quality,b.qualityMin,b.qualityMax),delete h.chamfer}return r.create(l.extend({},C,h))},t.fromVertices=function(p,u,o,d,h,m,y,w){var M=l.getDecomp(),q,v,x,C,b,E,S,I,A,T,P;for(q=!!(M&&M.quickDecomp),d=d||{},x=[],h=typeof h<"u"?h:!1,m=typeof m<"u"?m:.01,y=typeof y<"u"?y:10,w=typeof w<"u"?w:.01,l.isArray(o[0])||(o=[o]),T=0;T<o.length;T+=1)if(E=o[T],C=n.isConvex(E),b=!C,b&&!q&&l.warnOnce("Bodies.fromVertices: Install the 'poly-decomp' library and use Common.setDecomp or provide 'decomp' as a global to decompose concave vertices."),C||!q)C?E=n.clockwiseSort(E):E=n.hull(E),x.push({position:{x:p,y:u},vertices:E});else{var k=E.map(function(O){return[O.x,O.y]});M.makeCCW(k),m!==!1&&M.removeCollinearPoints(k,m),w!==!1&&M.removeDuplicatePoints&&M.removeDuplicatePoints(k,w);var _=M.quickDecomp(k);for(S=0;S<_.length;S++){var D=_[S],z=D.map(function(O){return{x:O[0],y:O[1]}});y>0&&n.area(z)<y||x.push({position:n.centre(z),vertices:z})}}for(S=0;S<x.length;S++)x[S]=r.create(l.extend(x[S],d));if(h){var F=5;for(S=0;S<x.length;S++){var Q=x[S];for(I=S+1;I<x.length;I++){var H=x[I];if(g.overlaps(Q.bounds,H.bounds)){var W=Q.vertices,Y=H.vertices;for(A=0;A<Q.vertices.length;A++)for(P=0;P<H.vertices.length;P++){var fe=c.magnitudeSquared(c.sub(W[(A+1)%W.length],Y[P])),oe=c.magnitudeSquared(c.sub(W[A],Y[(P+1)%Y.length]));fe<F&&oe<F&&(W[A].isInternal=!0,Y[P].isInternal=!0)}}}}}return x.length>1?(v=r.create(l.extend({parts:x.slice(0)},d)),r.setPosition(v,{x:p,y:u}),v):x[0]}})()},function(a,s,i){var t={};a.exports=t;var n=i(0),l=i(8);(function(){t.create=function(r){var g={bodies:[],collisions:[],pairs:null};return n.extend(g,r)},t.setBodies=function(r,g){r.bodies=g.slice(0)},t.clear=function(r){r.bodies=[],r.collisions=[]},t.collisions=function(r){var g=r.pairs,c=r.bodies,p=c.length,u=t.canCollide,o=l.collides,d=r.collisions,h=0,m,y;for(c.sort(t._compareBoundsX),m=0;m<p;m++){var w=c[m],M=w.bounds,q=w.bounds.max.x,v=w.bounds.max.y,x=w.bounds.min.y,C=w.isStatic||w.isSleeping,b=w.parts.length,E=b===1;for(y=m+1;y<p;y++){var S=c[y],I=S.bounds;if(I.min.x>q)break;if(!(v<I.min.y||x>I.max.y)&&!(C&&(S.isStatic||S.isSleeping))&&u(w.collisionFilter,S.collisionFilter)){var A=S.parts.length;if(E&&A===1){var T=o(w,S,g);T&&(d[h++]=T)}else for(var P=b>1?1:0,k=A>1?1:0,_=P;_<b;_++)for(var D=w.parts[_],M=D.bounds,z=k;z<A;z++){var F=S.parts[z],I=F.bounds;if(!(M.min.x>I.max.x||M.max.x<I.min.x||M.max.y<I.min.y||M.min.y>I.max.y)){var T=o(D,F,g);T&&(d[h++]=T)}}}}}return d.length!==h&&(d.length=h),d},t.canCollide=function(r,g){return r.group===g.group&&r.group!==0?r.group>0:(r.mask&g.category)!==0&&(g.mask&r.category)!==0},t._compareBoundsX=function(r,g){return r.bounds.min.x-g.bounds.min.x}})()},function(a,s,i){var t={};a.exports=t;var n=i(0);(function(){t.create=function(l){var r={};return l||n.log("Mouse.create: element was undefined, defaulting to document.body","warn"),r.element=l||document.body,r.absolute={x:0,y:0},r.position={x:0,y:0},r.mousedownPosition={x:0,y:0},r.mouseupPosition={x:0,y:0},r.offset={x:0,y:0},r.scale={x:1,y:1},r.wheelDelta=0,r.button=-1,r.pixelRatio=parseInt(r.element.getAttribute("data-pixel-ratio"),10)||1,r.sourceEvents={mousemove:null,mousedown:null,mouseup:null,mousewheel:null},r.mousemove=function(g){var c=t._getRelativeMousePosition(g,r.element,r.pixelRatio),p=g.changedTouches;p&&(r.button=0,g.preventDefault()),r.absolute.x=c.x,r.absolute.y=c.y,r.position.x=r.absolute.x*r.scale.x+r.offset.x,r.position.y=r.absolute.y*r.scale.y+r.offset.y,r.sourceEvents.mousemove=g},r.mousedown=function(g){var c=t._getRelativeMousePosition(g,r.element,r.pixelRatio),p=g.changedTouches;p?(r.button=0,g.preventDefault()):r.button=g.button,r.absolute.x=c.x,r.absolute.y=c.y,r.position.x=r.absolute.x*r.scale.x+r.offset.x,r.position.y=r.absolute.y*r.scale.y+r.offset.y,r.mousedownPosition.x=r.position.x,r.mousedownPosition.y=r.position.y,r.sourceEvents.mousedown=g},r.mouseup=function(g){var c=t._getRelativeMousePosition(g,r.element,r.pixelRatio),p=g.changedTouches;p&&g.preventDefault(),r.button=-1,r.absolute.x=c.x,r.absolute.y=c.y,r.position.x=r.absolute.x*r.scale.x+r.offset.x,r.position.y=r.absolute.y*r.scale.y+r.offset.y,r.mouseupPosition.x=r.position.x,r.mouseupPosition.y=r.position.y,r.sourceEvents.mouseup=g},r.mousewheel=function(g){r.wheelDelta=Math.max(-1,Math.min(1,g.wheelDelta||-g.detail)),g.preventDefault(),r.sourceEvents.mousewheel=g},t.setElement(r,r.element),r},t.setElement=function(l,r){l.element=r,r.addEventListener("mousemove",l.mousemove,{passive:!0}),r.addEventListener("mousedown",l.mousedown,{passive:!0}),r.addEventListener("mouseup",l.mouseup,{passive:!0}),r.addEventListener("wheel",l.mousewheel,{passive:!1}),r.addEventListener("touchmove",l.mousemove,{passive:!1}),r.addEventListener("touchstart",l.mousedown,{passive:!1}),r.addEventListener("touchend",l.mouseup,{passive:!1})},t.clearSourceEvents=function(l){l.sourceEvents.mousemove=null,l.sourceEvents.mousedown=null,l.sourceEvents.mouseup=null,l.sourceEvents.mousewheel=null,l.wheelDelta=0},t.setOffset=function(l,r){l.offset.x=r.x,l.offset.y=r.y,l.position.x=l.absolute.x*l.scale.x+l.offset.x,l.position.y=l.absolute.y*l.scale.y+l.offset.y},t.setScale=function(l,r){l.scale.x=r.x,l.scale.y=r.y,l.position.x=l.absolute.x*l.scale.x+l.offset.x,l.position.y=l.absolute.y*l.scale.y+l.offset.y},t._getRelativeMousePosition=function(l,r,g){var c=r.getBoundingClientRect(),p=document.documentElement||document.body.parentNode||document.body,u=window.pageXOffset!==void 0?window.pageXOffset:p.scrollLeft,o=window.pageYOffset!==void 0?window.pageYOffset:p.scrollTop,d=l.changedTouches,h,m;return d?(h=d[0].pageX-c.left-u,m=d[0].pageY-c.top-o):(h=l.pageX-c.left-u,m=l.pageY-c.top-o),{x:h/(r.clientWidth/(r.width||r.clientWidth)*g),y:m/(r.clientHeight/(r.height||r.clientHeight)*g)}}})()},function(a,s,i){var t={};a.exports=t;var n=i(0);(function(){t._registry={},t.register=function(l){if(t.isPlugin(l)||n.warn("Plugin.register:",t.toString(l),"does not implement all required fields."),l.name in t._registry){var r=t._registry[l.name],g=t.versionParse(l.version).number,c=t.versionParse(r.version).number;g>c?(n.warn("Plugin.register:",t.toString(r),"was upgraded to",t.toString(l)),t._registry[l.name]=l):g<c?n.warn("Plugin.register:",t.toString(r),"can not be downgraded to",t.toString(l)):l!==r&&n.warn("Plugin.register:",t.toString(l),"is already registered to different plugin object")}else t._registry[l.name]=l;return l},t.resolve=function(l){return t._registry[t.dependencyParse(l).name]},t.toString=function(l){return typeof l=="string"?l:(l.name||"anonymous")+"@"+(l.version||l.range||"0.0.0")},t.isPlugin=function(l){return l&&l.name&&l.version&&l.install},t.isUsed=function(l,r){return l.used.indexOf(r)>-1},t.isFor=function(l,r){var g=l.for&&t.dependencyParse(l.for);return!l.for||r.name===g.name&&t.versionSatisfies(r.version,g.range)},t.use=function(l,r){if(l.uses=(l.uses||[]).concat(r||[]),l.uses.length===0){n.warn("Plugin.use:",t.toString(l),"does not specify any dependencies to install.");return}for(var g=t.dependencies(l),c=n.topologicalSort(g),p=[],u=0;u<c.length;u+=1)if(c[u]!==l.name){var o=t.resolve(c[u]);if(!o){p.push("❌ "+c[u]);continue}t.isUsed(l,o.name)||(t.isFor(o,l)||(n.warn("Plugin.use:",t.toString(o),"is for",o.for,"but installed on",t.toString(l)+"."),o._warned=!0),o.install?o.install(l):(n.warn("Plugin.use:",t.toString(o),"does not specify an install function."),o._warned=!0),o._warned?(p.push("🔶 "+t.toString(o)),delete o._warned):p.push("✅ "+t.toString(o)),l.used.push(o.name))}p.length>0&&n.info(p.join("  "))},t.dependencies=function(l,r){var g=t.dependencyParse(l),c=g.name;if(r=r||{},!(c in r)){l=t.resolve(l)||l,r[c]=n.map(l.uses||[],function(u){t.isPlugin(u)&&t.register(u);var o=t.dependencyParse(u),d=t.resolve(u);return d&&!t.versionSatisfies(d.version,o.range)?(n.warn("Plugin.dependencies:",t.toString(d),"does not satisfy",t.toString(o),"used by",t.toString(g)+"."),d._warned=!0,l._warned=!0):d||(n.warn("Plugin.dependencies:",t.toString(u),"used by",t.toString(g),"could not be resolved."),l._warned=!0),o.name});for(var p=0;p<r[c].length;p+=1)t.dependencies(r[c][p],r);return r}},t.dependencyParse=function(l){if(n.isString(l)){var r=/^[\w-]+(@(\*|[\^~]?\d+\.\d+\.\d+(-[0-9A-Za-z-+]+)?))?$/;return r.test(l)||n.warn("Plugin.dependencyParse:",l,"is not a valid dependency string."),{name:l.split("@")[0],range:l.split("@")[1]||"*"}}return{name:l.name,range:l.range||l.version}},t.versionParse=function(l){var r=/^(\*)|(\^|~|>=|>)?\s*((\d+)\.(\d+)\.(\d+))(-[0-9A-Za-z-+]+)?$/;r.test(l)||n.warn("Plugin.versionParse:",l,"is not a valid version or range.");var g=r.exec(l),c=Number(g[4]),p=Number(g[5]),u=Number(g[6]);return{isRange:!!(g[1]||g[2]),version:g[3],range:l,operator:g[1]||g[2]||"",major:c,minor:p,patch:u,parts:[c,p,u],prerelease:g[7],number:c*1e8+p*1e4+u}},t.versionSatisfies=function(l,r){r=r||"*";var g=t.versionParse(r),c=t.versionParse(l);if(g.isRange){if(g.operator==="*"||l==="*")return!0;if(g.operator===">")return c.number>g.number;if(g.operator===">=")return c.number>=g.number;if(g.operator==="~")return c.major===g.major&&c.minor===g.minor&&c.patch>=g.patch;if(g.operator==="^")return g.major>0?c.major===g.major&&c.number>=g.number:g.minor>0?c.minor===g.minor&&c.patch>=g.patch:c.patch===g.patch}return l===r||l==="*"}})()},function(a,s){var i={};a.exports=i,function(){i.create=function(t){return{vertex:t,normalImpulse:0,tangentImpulse:0}}}()},function(a,s,i){var t={};a.exports=t;var n=i(7),l=i(18),r=i(13),g=i(19),c=i(5),p=i(6),u=i(10),o=i(0),d=i(4);(function(){t._deltaMax=1e3/60,t.create=function(h){h=h||{};var m={positionIterations:6,velocityIterations:4,constraintIterations:2,enableSleeping:!1,events:[],plugin:{},gravity:{x:0,y:1,scale:.001},timing:{timestamp:0,timeScale:1,lastDelta:0,lastElapsed:0,lastUpdatesPerFrame:0}},y=o.extend(m,h);return y.world=h.world||p.create({label:"World"}),y.pairs=h.pairs||g.create(),y.detector=h.detector||r.create(),y.detector.pairs=y.pairs,y.grid={buckets:[]},y.world.gravity=y.gravity,y.broadphase=y.grid,y.metrics={},y},t.update=function(h,m){var y=o.now(),w=h.world,M=h.detector,q=h.pairs,v=h.timing,x=v.timestamp,C;m>t._deltaMax&&o.warnOnce("Matter.Engine.update: delta argument is recommended to be less than or equal to",t._deltaMax.toFixed(3),"ms."),m=typeof m<"u"?m:o._baseDelta,m*=v.timeScale,v.timestamp+=m,v.lastDelta=m;var b={timestamp:v.timestamp,delta:m};c.trigger(h,"beforeUpdate",b);var E=p.allBodies(w),S=p.allConstraints(w);for(w.isModified&&(r.setBodies(M,E),p.setModified(w,!1,!1,!0)),h.enableSleeping&&n.update(E,m),t._bodiesApplyGravity(E,h.gravity),m>0&&t._bodiesUpdate(E,m),c.trigger(h,"beforeSolve",b),u.preSolveAll(E),C=0;C<h.constraintIterations;C++)u.solveAll(S,m);u.postSolveAll(E);var I=r.collisions(M);g.update(q,I,x),h.enableSleeping&&n.afterCollisions(q.list),q.collisionStart.length>0&&c.trigger(h,"collisionStart",{pairs:q.collisionStart,timestamp:v.timestamp,delta:m});var A=o.clamp(20/h.positionIterations,0,1);for(l.preSolvePosition(q.list),C=0;C<h.positionIterations;C++)l.solvePosition(q.list,m,A);for(l.postSolvePosition(E),u.preSolveAll(E),C=0;C<h.constraintIterations;C++)u.solveAll(S,m);for(u.postSolveAll(E),l.preSolveVelocity(q.list),C=0;C<h.velocityIterations;C++)l.solveVelocity(q.list,m);return t._bodiesUpdateVelocities(E),q.collisionActive.length>0&&c.trigger(h,"collisionActive",{pairs:q.collisionActive,timestamp:v.timestamp,delta:m}),q.collisionEnd.length>0&&c.trigger(h,"collisionEnd",{pairs:q.collisionEnd,timestamp:v.timestamp,delta:m}),t._bodiesClearForces(E),c.trigger(h,"afterUpdate",b),h.timing.lastElapsed=o.now()-y,h},t.merge=function(h,m){if(o.extend(h,m),m.world){h.world=m.world,t.clear(h);for(var y=p.allBodies(h.world),w=0;w<y.length;w++){var M=y[w];n.set(M,!1),M.id=o.nextId()}}},t.clear=function(h){g.clear(h.pairs),r.clear(h.detector)},t._bodiesClearForces=function(h){for(var m=h.length,y=0;y<m;y++){var w=h[y];w.force.x=0,w.force.y=0,w.torque=0}},t._bodiesApplyGravity=function(h,m){var y=typeof m.scale<"u"?m.scale:.001,w=h.length;if(!(m.x===0&&m.y===0||y===0))for(var M=0;M<w;M++){var q=h[M];q.isStatic||q.isSleeping||(q.force.y+=q.mass*m.y*y,q.force.x+=q.mass*m.x*y)}},t._bodiesUpdate=function(h,m){for(var y=h.length,w=0;w<y;w++){var M=h[w];M.isStatic||M.isSleeping||d.update(M,m)}},t._bodiesUpdateVelocities=function(h){for(var m=h.length,y=0;y<m;y++)d.updateVelocities(h[y])}})()},function(a,s,i){var t={};a.exports=t;var n=i(3),l=i(0),r=i(1);(function(){t._restingThresh=2,t._restingThreshTangent=Math.sqrt(6),t._positionDampen=.9,t._positionWarming=.8,t._frictionNormalMultiplier=5,t._frictionMaxStatic=Number.MAX_VALUE,t.preSolvePosition=function(g){var c,p,u,o=g.length;for(c=0;c<o;c++)p=g[c],p.isActive&&(u=p.contactCount,p.collision.parentA.totalContacts+=u,p.collision.parentB.totalContacts+=u)},t.solvePosition=function(g,c,p){var u,o,d,h,m,y,w,M,q=t._positionDampen*(p||1),v=l.clamp(c/l._baseDelta,0,1),x=g.length;for(u=0;u<x;u++)o=g[u],!(!o.isActive||o.isSensor)&&(d=o.collision,h=d.parentA,m=d.parentB,y=d.normal,o.separation=d.depth+y.x*(m.positionImpulse.x-h.positionImpulse.x)+y.y*(m.positionImpulse.y-h.positionImpulse.y));for(u=0;u<x;u++)o=g[u],!(!o.isActive||o.isSensor)&&(d=o.collision,h=d.parentA,m=d.parentB,y=d.normal,M=o.separation-o.slop*v,(h.isStatic||m.isStatic)&&(M*=2),h.isStatic||h.isSleeping||(w=q/h.totalContacts,h.positionImpulse.x+=y.x*M*w,h.positionImpulse.y+=y.y*M*w),m.isStatic||m.isSleeping||(w=q/m.totalContacts,m.positionImpulse.x-=y.x*M*w,m.positionImpulse.y-=y.y*M*w))},t.postSolvePosition=function(g){for(var c=t._positionWarming,p=g.length,u=n.translate,o=r.update,d=0;d<p;d++){var h=g[d],m=h.positionImpulse,y=m.x,w=m.y,M=h.velocity;if(h.totalContacts=0,y!==0||w!==0){for(var q=0;q<h.parts.length;q++){var v=h.parts[q];u(v.vertices,m),o(v.bounds,v.vertices,M),v.position.x+=y,v.position.y+=w}h.positionPrev.x+=y,h.positionPrev.y+=w,y*M.x+w*M.y<0?(m.x=0,m.y=0):(m.x*=c,m.y*=c)}}},t.preSolveVelocity=function(g){var c=g.length,p,u;for(p=0;p<c;p++){var o=g[p];if(!(!o.isActive||o.isSensor)){var d=o.contacts,h=o.contactCount,m=o.collision,y=m.parentA,w=m.parentB,M=m.normal,q=m.tangent;for(u=0;u<h;u++){var v=d[u],x=v.vertex,C=v.normalImpulse,b=v.tangentImpulse;if(C!==0||b!==0){var E=M.x*C+q.x*b,S=M.y*C+q.y*b;y.isStatic||y.isSleeping||(y.positionPrev.x+=E*y.inverseMass,y.positionPrev.y+=S*y.inverseMass,y.anglePrev+=y.inverseInertia*((x.x-y.position.x)*S-(x.y-y.position.y)*E)),w.isStatic||w.isSleeping||(w.positionPrev.x-=E*w.inverseMass,w.positionPrev.y-=S*w.inverseMass,w.anglePrev-=w.inverseInertia*((x.x-w.position.x)*S-(x.y-w.position.y)*E))}}}}},t.solveVelocity=function(g,c){var p=c/l._baseDelta,u=p*p,o=u*p,d=-t._restingThresh*p,h=t._restingThreshTangent,m=t._frictionNormalMultiplier*p,y=t._frictionMaxStatic,w=g.length,M,q,v,x;for(v=0;v<w;v++){var C=g[v];if(!(!C.isActive||C.isSensor)){var b=C.collision,E=b.parentA,S=b.parentB,I=b.normal.x,A=b.normal.y,T=b.tangent.x,P=b.tangent.y,k=C.inverseMass,_=C.friction*C.frictionStatic*m,D=C.contacts,z=C.contactCount,F=1/z,Q=E.position.x-E.positionPrev.x,H=E.position.y-E.positionPrev.y,W=E.angle-E.anglePrev,Y=S.position.x-S.positionPrev.x,fe=S.position.y-S.positionPrev.y,oe=S.angle-S.anglePrev;for(x=0;x<z;x++){var O=D[x],se=O.vertex,j=se.x-E.position.x,ze=se.y-E.position.y,le=se.x-S.position.x,ce=se.y-S.position.y,X=Q-ze*W,Aa=H+j*W,qa=Y-ce*oe,Ta=fe+le*oe,zt=X-qa,Ot=Aa-Ta,mt=I*zt+A*Ot,ue=T*zt+P*Ot,Bt=C.separation+mt,vt=Math.min(Bt,1);vt=Bt<0?0:vt;var Rt=vt*_;ue<-Rt||ue>Rt?(q=ue>0?ue:-ue,M=C.friction*(ue>0?1:-1)*o,M<-q?M=-q:M>q&&(M=q)):(M=ue,q=y);var Ft=j*A-ze*I,Ut=le*A-ce*I,Nt=F/(k+E.inverseInertia*Ft*Ft+S.inverseInertia*Ut*Ut),Je=(1+C.restitution)*mt*Nt;if(M*=Nt,mt<d)O.normalImpulse=0;else{var ka=O.normalImpulse;O.normalImpulse+=Je,O.normalImpulse>0&&(O.normalImpulse=0),Je=O.normalImpulse-ka}if(ue<-h||ue>h)O.tangentImpulse=0;else{var Pa=O.tangentImpulse;O.tangentImpulse+=M,O.tangentImpulse<-q&&(O.tangentImpulse=-q),O.tangentImpulse>q&&(O.tangentImpulse=q),M=O.tangentImpulse-Pa}var et=I*Je+T*M,tt=A*Je+P*M;E.isStatic||E.isSleeping||(E.positionPrev.x+=et*E.inverseMass,E.positionPrev.y+=tt*E.inverseMass,E.anglePrev+=(j*tt-ze*et)*E.inverseInertia),S.isStatic||S.isSleeping||(S.positionPrev.x-=et*S.inverseMass,S.positionPrev.y-=tt*S.inverseMass,S.anglePrev-=(le*tt-ce*et)*S.inverseInertia)}}}}})()},function(a,s,i){var t={};a.exports=t;var n=i(9),l=i(0);(function(){t.create=function(r){return l.extend({table:{},list:[],collisionStart:[],collisionActive:[],collisionEnd:[]},r)},t.update=function(r,g,c){var p=n.update,u=n.create,o=n.setActive,d=r.table,h=r.list,m=h.length,y=m,w=r.collisionStart,M=r.collisionEnd,q=r.collisionActive,v=g.length,x=0,C=0,b=0,E,S,I;for(I=0;I<v;I++)E=g[I],S=E.pair,S?(S.isActive&&(q[b++]=S),p(S,E,c)):(S=u(E,c),d[S.id]=S,w[x++]=S,h[y++]=S);for(y=0,m=h.length,I=0;I<m;I++)S=h[I],S.timeUpdated>=c?h[y++]=S:(o(S,!1,c),S.collision.bodyA.sleepCounter>0&&S.collision.bodyB.sleepCounter>0?h[y++]=S:(M[C++]=S,delete d[S.id]));h.length!==y&&(h.length=y),w.length!==x&&(w.length=x),M.length!==C&&(M.length=C),q.length!==b&&(q.length=b)},t.clear=function(r){return r.table={},r.list.length=0,r.collisionStart.length=0,r.collisionActive.length=0,r.collisionEnd.length=0,r}})()},function(a,s,i){var t=a.exports=i(21);t.Axes=i(11),t.Bodies=i(12),t.Body=i(4),t.Bounds=i(1),t.Collision=i(8),t.Common=i(0),t.Composite=i(6),t.Composites=i(22),t.Constraint=i(10),t.Contact=i(16),t.Detector=i(13),t.Engine=i(17),t.Events=i(5),t.Grid=i(23),t.Mouse=i(14),t.MouseConstraint=i(24),t.Pair=i(9),t.Pairs=i(19),t.Plugin=i(15),t.Query=i(25),t.Render=i(26),t.Resolver=i(18),t.Runner=i(27),t.SAT=i(28),t.Sleeping=i(7),t.Svg=i(29),t.Vector=i(2),t.Vertices=i(3),t.World=i(30),t.Engine.run=t.Runner.run,t.Common.deprecated(t.Engine,"run","Engine.run ➤ use Matter.Runner.run(engine) instead")},function(a,s,i){var t={};a.exports=t;var n=i(15),l=i(0);(function(){t.name="matter-js",t.version="0.20.0",t.uses=[],t.used=[],t.use=function(){n.use(t,Array.prototype.slice.call(arguments))},t.before=function(r,g){return r=r.replace(/^Matter./,""),l.chainPathBefore(t,r,g)},t.after=function(r,g){return r=r.replace(/^Matter./,""),l.chainPathAfter(t,r,g)}})()},function(a,s,i){var t={};a.exports=t;var n=i(6),l=i(10),r=i(0),g=i(4),c=i(12),p=r.deprecated;(function(){t.stack=function(u,o,d,h,m,y,w){for(var M=n.create({label:"Stack"}),q=u,v=o,x,C=0,b=0;b<h;b++){for(var E=0,S=0;S<d;S++){var I=w(q,v,S,b,x,C);if(I){var A=I.bounds.max.y-I.bounds.min.y,T=I.bounds.max.x-I.bounds.min.x;A>E&&(E=A),g.translate(I,{x:T*.5,y:A*.5}),q=I.bounds.max.x+m,n.addBody(M,I),x=I,C+=1}else q+=m}v+=E+y,q=u}return M},t.chain=function(u,o,d,h,m,y){for(var w=u.bodies,M=1;M<w.length;M++){var q=w[M-1],v=w[M],x=q.bounds.max.y-q.bounds.min.y,C=q.bounds.max.x-q.bounds.min.x,b=v.bounds.max.y-v.bounds.min.y,E=v.bounds.max.x-v.bounds.min.x,S={bodyA:q,pointA:{x:C*o,y:x*d},bodyB:v,pointB:{x:E*h,y:b*m}},I=r.extend(S,y);n.addConstraint(u,l.create(I))}return u.label+=" Chain",u},t.mesh=function(u,o,d,h,m){var y=u.bodies,w,M,q,v,x;for(w=0;w<d;w++){for(M=1;M<o;M++)q=y[M-1+w*o],v=y[M+w*o],n.addConstraint(u,l.create(r.extend({bodyA:q,bodyB:v},m)));if(w>0)for(M=0;M<o;M++)q=y[M+(w-1)*o],v=y[M+w*o],n.addConstraint(u,l.create(r.extend({bodyA:q,bodyB:v},m))),h&&M>0&&(x=y[M-1+(w-1)*o],n.addConstraint(u,l.create(r.extend({bodyA:x,bodyB:v},m)))),h&&M<o-1&&(x=y[M+1+(w-1)*o],n.addConstraint(u,l.create(r.extend({bodyA:x,bodyB:v},m))))}return u.label+=" Mesh",u},t.pyramid=function(u,o,d,h,m,y,w){return t.stack(u,o,d,h,m,y,function(M,q,v,x,C,b){var E=Math.min(h,Math.ceil(d/2)),S=C?C.bounds.max.x-C.bounds.min.x:0;if(!(x>E)){x=E-x;var I=x,A=d-1-x;if(!(v<I||v>A)){b===1&&g.translate(C,{x:(v+(d%2===1?1:-1))*S,y:0});var T=C?v*S:0;return w(u+T+v*m,q,v,x,C,b)}}})},t.newtonsCradle=function(u,o,d,h,m){for(var y=n.create({label:"Newtons Cradle"}),w=0;w<d;w++){var M=1.9,q=c.circle(u+w*(h*M),o+m,h,{inertia:1/0,restitution:1,friction:0,frictionAir:1e-4,slop:1}),v=l.create({pointA:{x:u+w*(h*M),y:o},bodyB:q});n.addBody(y,q),n.addConstraint(y,v)}return y},p(t,"newtonsCradle","Composites.newtonsCradle ➤ moved to newtonsCradle example"),t.car=function(u,o,d,h,m){var y=g.nextGroup(!0),w=20,M=-d*.5+w,q=d*.5-w,v=0,x=n.create({label:"Car"}),C=c.rectangle(u,o,d,h,{collisionFilter:{group:y},chamfer:{radius:h*.5},density:2e-4}),b=c.circle(u+M,o+v,m,{collisionFilter:{group:y},friction:.8}),E=c.circle(u+q,o+v,m,{collisionFilter:{group:y},friction:.8}),S=l.create({bodyB:C,pointB:{x:M,y:v},bodyA:b,stiffness:1,length:0}),I=l.create({bodyB:C,pointB:{x:q,y:v},bodyA:E,stiffness:1,length:0});return n.addBody(x,C),n.addBody(x,b),n.addBody(x,E),n.addConstraint(x,S),n.addConstraint(x,I),x},p(t,"car","Composites.car ➤ moved to car example"),t.softBody=function(u,o,d,h,m,y,w,M,q,v){q=r.extend({inertia:1/0},q),v=r.extend({stiffness:.2,render:{type:"line",anchors:!1}},v);var x=t.stack(u,o,d,h,m,y,function(C,b){return c.circle(C,b,M,q)});return t.mesh(x,d,h,w,v),x.label="Soft Body",x},p(t,"softBody","Composites.softBody ➤ moved to softBody and cloth examples")})()},function(a,s,i){var t={};a.exports=t;var n=i(9),l=i(0),r=l.deprecated;(function(){t.create=function(g){var c={buckets:{},pairs:{},pairsList:[],bucketWidth:48,bucketHeight:48};return l.extend(c,g)},t.update=function(g,c,p,u){var o,d,h,m=p.world,y=g.buckets,w,M,q=!1;for(o=0;o<c.length;o++){var v=c[o];if(!(v.isSleeping&&!u)&&!(m.bounds&&(v.bounds.max.x<m.bounds.min.x||v.bounds.min.x>m.bounds.max.x||v.bounds.max.y<m.bounds.min.y||v.bounds.min.y>m.bounds.max.y))){var x=t._getRegion(g,v);if(!v.region||x.id!==v.region.id||u){(!v.region||u)&&(v.region=x);var C=t._regionUnion(x,v.region);for(d=C.startCol;d<=C.endCol;d++)for(h=C.startRow;h<=C.endRow;h++){M=t._getBucketId(d,h),w=y[M];var b=d>=x.startCol&&d<=x.endCol&&h>=x.startRow&&h<=x.endRow,E=d>=v.region.startCol&&d<=v.region.endCol&&h>=v.region.startRow&&h<=v.region.endRow;!b&&E&&E&&w&&t._bucketRemoveBody(g,w,v),(v.region===x||b&&!E||u)&&(w||(w=t._createBucket(y,M)),t._bucketAddBody(g,w,v))}v.region=x,q=!0}}}q&&(g.pairsList=t._createActivePairsList(g))},r(t,"update","Grid.update ➤ replaced by Matter.Detector"),t.clear=function(g){g.buckets={},g.pairs={},g.pairsList=[]},r(t,"clear","Grid.clear ➤ replaced by Matter.Detector"),t._regionUnion=function(g,c){var p=Math.min(g.startCol,c.startCol),u=Math.max(g.endCol,c.endCol),o=Math.min(g.startRow,c.startRow),d=Math.max(g.endRow,c.endRow);return t._createRegion(p,u,o,d)},t._getRegion=function(g,c){var p=c.bounds,u=Math.floor(p.min.x/g.bucketWidth),o=Math.floor(p.max.x/g.bucketWidth),d=Math.floor(p.min.y/g.bucketHeight),h=Math.floor(p.max.y/g.bucketHeight);return t._createRegion(u,o,d,h)},t._createRegion=function(g,c,p,u){return{id:g+","+c+","+p+","+u,startCol:g,endCol:c,startRow:p,endRow:u}},t._getBucketId=function(g,c){return"C"+g+"R"+c},t._createBucket=function(g,c){var p=g[c]=[];return p},t._bucketAddBody=function(g,c,p){var u=g.pairs,o=n.id,d=c.length,h;for(h=0;h<d;h++){var m=c[h];if(!(p.id===m.id||p.isStatic&&m.isStatic)){var y=o(p,m),w=u[y];w?w[2]+=1:u[y]=[p,m,1]}}c.push(p)},t._bucketRemoveBody=function(g,c,p){var u=g.pairs,o=n.id,d;c.splice(l.indexOf(c,p),1);var h=c.length;for(d=0;d<h;d++){var m=u[o(p,c[d])];m&&(m[2]-=1)}},t._createActivePairsList=function(g){var c,p=g.pairs,u=l.keys(p),o=u.length,d=[],h;for(h=0;h<o;h++)c=p[u[h]],c[2]>0?d.push(c):delete p[u[h]];return d}})()},function(a,s,i){var t={};a.exports=t;var n=i(3),l=i(7),r=i(14),g=i(5),c=i(13),p=i(10),u=i(6),o=i(0),d=i(1);(function(){t.create=function(h,m){var y=(h?h.mouse:null)||(m?m.mouse:null);y||(h&&h.render&&h.render.canvas?y=r.create(h.render.canvas):m&&m.element?y=r.create(m.element):(y=r.create(),o.warn("MouseConstraint.create: options.mouse was undefined, options.element was undefined, may not function as expected")));var w=p.create({label:"Mouse Constraint",pointA:y.position,pointB:{x:0,y:0},length:.01,stiffness:.1,angularStiffness:1,render:{strokeStyle:"#90EE90",lineWidth:3}}),M={type:"mouseConstraint",mouse:y,element:null,body:null,constraint:w,collisionFilter:{category:1,mask:4294967295,group:0}},q=o.extend(M,m);return g.on(h,"beforeUpdate",function(){var v=u.allBodies(h.world);t.update(q,v),t._triggerEvents(q)}),q},t.update=function(h,m){var y=h.mouse,w=h.constraint,M=h.body;if(y.button===0){if(w.bodyB)l.set(w.bodyB,!1),w.pointA=y.position;else for(var q=0;q<m.length;q++)if(M=m[q],d.contains(M.bounds,y.position)&&c.canCollide(M.collisionFilter,h.collisionFilter))for(var v=M.parts.length>1?1:0;v<M.parts.length;v++){var x=M.parts[v];if(n.contains(x.vertices,y.position)){w.pointA=y.position,w.bodyB=h.body=M,w.pointB={x:y.position.x-M.position.x,y:y.position.y-M.position.y},w.angleB=M.angle,l.set(M,!1),g.trigger(h,"startdrag",{mouse:y,body:M});break}}}else w.bodyB=h.body=null,w.pointB=null,M&&g.trigger(h,"enddrag",{mouse:y,body:M})},t._triggerEvents=function(h){var m=h.mouse,y=m.sourceEvents;y.mousemove&&g.trigger(h,"mousemove",{mouse:m}),y.mousedown&&g.trigger(h,"mousedown",{mouse:m}),y.mouseup&&g.trigger(h,"mouseup",{mouse:m}),r.clearSourceEvents(m)}})()},function(a,s,i){var t={};a.exports=t;var n=i(2),l=i(8),r=i(1),g=i(12),c=i(3);(function(){t.collides=function(p,u){for(var o=[],d=u.length,h=p.bounds,m=l.collides,y=r.overlaps,w=0;w<d;w++){var M=u[w],q=M.parts.length,v=q===1?0:1;if(y(M.bounds,h))for(var x=v;x<q;x++){var C=M.parts[x];if(y(C.bounds,h)){var b=m(C,p);if(b){o.push(b);break}}}}return o},t.ray=function(p,u,o,d){d=d||1e-100;for(var h=n.angle(u,o),m=n.magnitude(n.sub(u,o)),y=(o.x+u.x)*.5,w=(o.y+u.y)*.5,M=g.rectangle(y,w,m,d,{angle:h}),q=t.collides(M,p),v=0;v<q.length;v+=1){var x=q[v];x.body=x.bodyB=x.bodyA}return q},t.region=function(p,u,o){for(var d=[],h=0;h<p.length;h++){var m=p[h],y=r.overlaps(m.bounds,u);(y&&!o||!y&&o)&&d.push(m)}return d},t.point=function(p,u){for(var o=[],d=0;d<p.length;d++){var h=p[d];if(r.contains(h.bounds,u))for(var m=h.parts.length===1?0:1;m<h.parts.length;m++){var y=h.parts[m];if(r.contains(y.bounds,u)&&c.contains(y.vertices,u)){o.push(h);break}}}return o}})()},function(a,s,i){var t={};a.exports=t;var n=i(4),l=i(0),r=i(6),g=i(1),c=i(5),p=i(2),u=i(14);(function(){var o,d;typeof window<"u"&&(o=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame||function(v){window.setTimeout(function(){v(l.now())},1e3/60)},d=window.cancelAnimationFrame||window.mozCancelAnimationFrame||window.webkitCancelAnimationFrame||window.msCancelAnimationFrame),t._goodFps=30,t._goodDelta=1e3/60,t.create=function(v){var x={engine:null,element:null,canvas:null,mouse:null,frameRequestId:null,timing:{historySize:60,delta:0,deltaHistory:[],lastTime:0,lastTimestamp:0,lastElapsed:0,timestampElapsed:0,timestampElapsedHistory:[],engineDeltaHistory:[],engineElapsedHistory:[],engineUpdatesHistory:[],elapsedHistory:[]},options:{width:800,height:600,pixelRatio:1,background:"#14151f",wireframeBackground:"#14151f",wireframeStrokeStyle:"#bbb",hasBounds:!!v.bounds,enabled:!0,wireframes:!0,showSleeping:!0,showDebug:!1,showStats:!1,showPerformance:!1,showBounds:!1,showVelocity:!1,showCollisions:!1,showSeparations:!1,showAxes:!1,showPositions:!1,showAngleIndicator:!1,showIds:!1,showVertexNumbers:!1,showConvexHulls:!1,showInternalEdges:!1,showMousePosition:!1}},C=l.extend(x,v);return C.canvas&&(C.canvas.width=C.options.width||C.canvas.width,C.canvas.height=C.options.height||C.canvas.height),C.mouse=v.mouse,C.engine=v.engine,C.canvas=C.canvas||y(C.options.width,C.options.height),C.context=C.canvas.getContext("2d"),C.textures={},C.bounds=C.bounds||{min:{x:0,y:0},max:{x:C.canvas.width,y:C.canvas.height}},C.controller=t,C.options.showBroadphase=!1,C.options.pixelRatio!==1&&t.setPixelRatio(C,C.options.pixelRatio),l.isElement(C.element)&&C.element.appendChild(C.canvas),C},t.run=function(v){(function x(C){v.frameRequestId=o(x),h(v,C),t.world(v,C),v.context.setTransform(v.options.pixelRatio,0,0,v.options.pixelRatio,0,0),(v.options.showStats||v.options.showDebug)&&t.stats(v,v.context,C),(v.options.showPerformance||v.options.showDebug)&&t.performance(v,v.context,C),v.context.setTransform(1,0,0,1,0,0)})()},t.stop=function(v){d(v.frameRequestId)},t.setPixelRatio=function(v,x){var C=v.options,b=v.canvas;x==="auto"&&(x=w(b)),C.pixelRatio=x,b.setAttribute("data-pixel-ratio",x),b.width=C.width*x,b.height=C.height*x,b.style.width=C.width+"px",b.style.height=C.height+"px"},t.setSize=function(v,x,C){v.options.width=x,v.options.height=C,v.bounds.max.x=v.bounds.min.x+x,v.bounds.max.y=v.bounds.min.y+C,v.options.pixelRatio!==1?t.setPixelRatio(v,v.options.pixelRatio):(v.canvas.width=x,v.canvas.height=C)},t.lookAt=function(v,x,C,b){b=typeof b<"u"?b:!0,x=l.isArray(x)?x:[x],C=C||{x:0,y:0};for(var E={min:{x:1/0,y:1/0},max:{x:-1/0,y:-1/0}},S=0;S<x.length;S+=1){var I=x[S],A=I.bounds?I.bounds.min:I.min||I.position||I,T=I.bounds?I.bounds.max:I.max||I.position||I;A&&T&&(A.x<E.min.x&&(E.min.x=A.x),T.x>E.max.x&&(E.max.x=T.x),A.y<E.min.y&&(E.min.y=A.y),T.y>E.max.y&&(E.max.y=T.y))}var P=E.max.x-E.min.x+2*C.x,k=E.max.y-E.min.y+2*C.y,_=v.canvas.height,D=v.canvas.width,z=D/_,F=P/k,Q=1,H=1;F>z?H=F/z:Q=z/F,v.options.hasBounds=!0,v.bounds.min.x=E.min.x,v.bounds.max.x=E.min.x+P*Q,v.bounds.min.y=E.min.y,v.bounds.max.y=E.min.y+k*H,b&&(v.bounds.min.x+=P*.5-P*Q*.5,v.bounds.max.x+=P*.5-P*Q*.5,v.bounds.min.y+=k*.5-k*H*.5,v.bounds.max.y+=k*.5-k*H*.5),v.bounds.min.x-=C.x,v.bounds.max.x-=C.x,v.bounds.min.y-=C.y,v.bounds.max.y-=C.y,v.mouse&&(u.setScale(v.mouse,{x:(v.bounds.max.x-v.bounds.min.x)/v.canvas.width,y:(v.bounds.max.y-v.bounds.min.y)/v.canvas.height}),u.setOffset(v.mouse,v.bounds.min))},t.startViewTransform=function(v){var x=v.bounds.max.x-v.bounds.min.x,C=v.bounds.max.y-v.bounds.min.y,b=x/v.options.width,E=C/v.options.height;v.context.setTransform(v.options.pixelRatio/b,0,0,v.options.pixelRatio/E,0,0),v.context.translate(-v.bounds.min.x,-v.bounds.min.y)},t.endViewTransform=function(v){v.context.setTransform(v.options.pixelRatio,0,0,v.options.pixelRatio,0,0)},t.world=function(v,x){var C=l.now(),b=v.engine,E=b.world,S=v.canvas,I=v.context,A=v.options,T=v.timing,P=r.allBodies(E),k=r.allConstraints(E),_=A.wireframes?A.wireframeBackground:A.background,D=[],z=[],F,Q={timestamp:b.timing.timestamp};if(c.trigger(v,"beforeRender",Q),v.currentBackground!==_&&q(v,_),I.globalCompositeOperation="source-in",I.fillStyle="transparent",I.fillRect(0,0,S.width,S.height),I.globalCompositeOperation="source-over",A.hasBounds){for(F=0;F<P.length;F++){var H=P[F];g.overlaps(H.bounds,v.bounds)&&D.push(H)}for(F=0;F<k.length;F++){var W=k[F],Y=W.bodyA,fe=W.bodyB,oe=W.pointA,O=W.pointB;Y&&(oe=p.add(Y.position,W.pointA)),fe&&(O=p.add(fe.position,W.pointB)),!(!oe||!O)&&(g.contains(v.bounds,oe)||g.contains(v.bounds,O))&&z.push(W)}t.startViewTransform(v),v.mouse&&(u.setScale(v.mouse,{x:(v.bounds.max.x-v.bounds.min.x)/v.options.width,y:(v.bounds.max.y-v.bounds.min.y)/v.options.height}),u.setOffset(v.mouse,v.bounds.min))}else z=k,D=P,v.options.pixelRatio!==1&&v.context.setTransform(v.options.pixelRatio,0,0,v.options.pixelRatio,0,0);!A.wireframes||b.enableSleeping&&A.showSleeping?t.bodies(v,D,I):(A.showConvexHulls&&t.bodyConvexHulls(v,D,I),t.bodyWireframes(v,D,I)),A.showBounds&&t.bodyBounds(v,D,I),(A.showAxes||A.showAngleIndicator)&&t.bodyAxes(v,D,I),A.showPositions&&t.bodyPositions(v,D,I),A.showVelocity&&t.bodyVelocity(v,D,I),A.showIds&&t.bodyIds(v,D,I),A.showSeparations&&t.separations(v,b.pairs.list,I),A.showCollisions&&t.collisions(v,b.pairs.list,I),A.showVertexNumbers&&t.vertexNumbers(v,D,I),A.showMousePosition&&t.mousePosition(v,v.mouse,I),t.constraints(z,I),A.hasBounds&&t.endViewTransform(v),c.trigger(v,"afterRender",Q),T.lastElapsed=l.now()-C},t.stats=function(v,x,C){for(var b=v.engine,E=b.world,S=r.allBodies(E),I=0,A=55,T=44,P=0,k=0,_=0;_<S.length;_+=1)I+=S[_].parts.length;var D={Part:I,Body:S.length,Cons:r.allConstraints(E).length,Comp:r.allComposites(E).length,Pair:b.pairs.list.length};x.fillStyle="#0e0f19",x.fillRect(P,k,A*5.5,T),x.font="12px Arial",x.textBaseline="top",x.textAlign="right";for(var z in D){var F=D[z];x.fillStyle="#aaa",x.fillText(z,P+A,k+8),x.fillStyle="#eee",x.fillText(F,P+A,k+26),P+=A}},t.performance=function(v,x){var C=v.engine,b=v.timing,E=b.deltaHistory,S=b.elapsedHistory,I=b.timestampElapsedHistory,A=b.engineDeltaHistory,T=b.engineUpdatesHistory,P=b.engineElapsedHistory,k=C.timing.lastUpdatesPerFrame,_=C.timing.lastDelta,D=m(E),z=m(S),F=m(A),Q=m(T),H=m(P),W=m(I),Y=W/D||0,fe=Math.round(D/_),oe=1e3/D||0,O=4,se=12,j=60,ze=34,le=10,ce=69;x.fillStyle="#0e0f19",x.fillRect(0,50,se*5+j*6+22,ze),t.status(x,le,ce,j,O,E.length,Math.round(oe)+" fps",oe/t._goodFps,function(X){return E[X]/D-1}),t.status(x,le+se+j,ce,j,O,A.length,_.toFixed(2)+" dt",t._goodDelta/_,function(X){return A[X]/F-1}),t.status(x,le+(se+j)*2,ce,j,O,T.length,k+" upf",Math.pow(l.clamp(Q/fe||1,0,1),4),function(X){return T[X]/Q-1}),t.status(x,le+(se+j)*3,ce,j,O,P.length,H.toFixed(2)+" ut",1-k*H/t._goodFps,function(X){return P[X]/H-1}),t.status(x,le+(se+j)*4,ce,j,O,S.length,z.toFixed(2)+" rt",1-z/t._goodFps,function(X){return S[X]/z-1}),t.status(x,le+(se+j)*5,ce,j,O,I.length,Y.toFixed(2)+" x",Y*Y*Y,function(X){return(I[X]/E[X]/Y||0)-1})},t.status=function(v,x,C,b,E,S,I,A,T){v.strokeStyle="#888",v.fillStyle="#444",v.lineWidth=1,v.fillRect(x,C+7,b,1),v.beginPath(),v.moveTo(x,C+7-E*l.clamp(.4*T(0),-2,2));for(var P=0;P<b;P+=1)v.lineTo(x+P,C+7-(P<S?E*l.clamp(.4*T(P),-2,2):0));v.stroke(),v.fillStyle="hsl("+l.clamp(25+95*A,0,120)+",100%,60%)",v.fillRect(x,C-7,4,4),v.font="12px Arial",v.textBaseline="middle",v.textAlign="right",v.fillStyle="#eee",v.fillText(I,x+b,C-5)},t.constraints=function(v,x){for(var C=x,b=0;b<v.length;b++){var E=v[b];if(!(!E.render.visible||!E.pointA||!E.pointB)){var S=E.bodyA,I=E.bodyB,A,T;if(S?A=p.add(S.position,E.pointA):A=E.pointA,E.render.type==="pin")C.beginPath(),C.arc(A.x,A.y,3,0,2*Math.PI),C.closePath();else{if(I?T=p.add(I.position,E.pointB):T=E.pointB,C.beginPath(),C.moveTo(A.x,A.y),E.render.type==="spring")for(var P=p.sub(T,A),k=p.perp(p.normalise(P)),_=Math.ceil(l.clamp(E.length/5,12,20)),D,z=1;z<_;z+=1)D=z%2===0?1:-1,C.lineTo(A.x+P.x*(z/_)+k.x*D*4,A.y+P.y*(z/_)+k.y*D*4);C.lineTo(T.x,T.y)}E.render.lineWidth&&(C.lineWidth=E.render.lineWidth,C.strokeStyle=E.render.strokeStyle,C.stroke()),E.render.anchors&&(C.fillStyle=E.render.strokeStyle,C.beginPath(),C.arc(A.x,A.y,3,0,2*Math.PI),C.arc(T.x,T.y,3,0,2*Math.PI),C.closePath(),C.fill())}}},t.bodies=function(v,x,C){var b=C;v.engine;var E=v.options,S=E.showInternalEdges||!E.wireframes,I,A,T,P;for(T=0;T<x.length;T++)if(I=x[T],!!I.render.visible){for(P=I.parts.length>1?1:0;P<I.parts.length;P++)if(A=I.parts[P],!!A.render.visible){if(E.showSleeping&&I.isSleeping?b.globalAlpha=.5*A.render.opacity:A.render.opacity!==1&&(b.globalAlpha=A.render.opacity),A.render.sprite&&A.render.sprite.texture&&!E.wireframes){var k=A.render.sprite,_=M(v,k.texture);b.translate(A.position.x,A.position.y),b.rotate(A.angle),b.drawImage(_,_.width*-k.xOffset*k.xScale,_.height*-k.yOffset*k.yScale,_.width*k.xScale,_.height*k.yScale),b.rotate(-A.angle),b.translate(-A.position.x,-A.position.y)}else{if(A.circleRadius)b.beginPath(),b.arc(A.position.x,A.position.y,A.circleRadius,0,2*Math.PI);else{b.beginPath(),b.moveTo(A.vertices[0].x,A.vertices[0].y);for(var D=1;D<A.vertices.length;D++)!A.vertices[D-1].isInternal||S?b.lineTo(A.vertices[D].x,A.vertices[D].y):b.moveTo(A.vertices[D].x,A.vertices[D].y),A.vertices[D].isInternal&&!S&&b.moveTo(A.vertices[(D+1)%A.vertices.length].x,A.vertices[(D+1)%A.vertices.length].y);b.lineTo(A.vertices[0].x,A.vertices[0].y),b.closePath()}E.wireframes?(b.lineWidth=1,b.strokeStyle=v.options.wireframeStrokeStyle,b.stroke()):(b.fillStyle=A.render.fillStyle,A.render.lineWidth&&(b.lineWidth=A.render.lineWidth,b.strokeStyle=A.render.strokeStyle,b.stroke()),b.fill())}b.globalAlpha=1}}},t.bodyWireframes=function(v,x,C){var b=C,E=v.options.showInternalEdges,S,I,A,T,P;for(b.beginPath(),A=0;A<x.length;A++)if(S=x[A],!!S.render.visible)for(P=S.parts.length>1?1:0;P<S.parts.length;P++){for(I=S.parts[P],b.moveTo(I.vertices[0].x,I.vertices[0].y),T=1;T<I.vertices.length;T++)!I.vertices[T-1].isInternal||E?b.lineTo(I.vertices[T].x,I.vertices[T].y):b.moveTo(I.vertices[T].x,I.vertices[T].y),I.vertices[T].isInternal&&!E&&b.moveTo(I.vertices[(T+1)%I.vertices.length].x,I.vertices[(T+1)%I.vertices.length].y);b.lineTo(I.vertices[0].x,I.vertices[0].y)}b.lineWidth=1,b.strokeStyle=v.options.wireframeStrokeStyle,b.stroke()},t.bodyConvexHulls=function(v,x,C){var b=C,E,S,I;for(b.beginPath(),S=0;S<x.length;S++)if(E=x[S],!(!E.render.visible||E.parts.length===1)){for(b.moveTo(E.vertices[0].x,E.vertices[0].y),I=1;I<E.vertices.length;I++)b.lineTo(E.vertices[I].x,E.vertices[I].y);b.lineTo(E.vertices[0].x,E.vertices[0].y)}b.lineWidth=1,b.strokeStyle="rgba(255,255,255,0.2)",b.stroke()},t.vertexNumbers=function(v,x,C){var b=C,E,S,I;for(E=0;E<x.length;E++){var A=x[E].parts;for(I=A.length>1?1:0;I<A.length;I++){var T=A[I];for(S=0;S<T.vertices.length;S++)b.fillStyle="rgba(255,255,255,0.2)",b.fillText(E+"_"+S,T.position.x+(T.vertices[S].x-T.position.x)*.8,T.position.y+(T.vertices[S].y-T.position.y)*.8)}}},t.mousePosition=function(v,x,C){var b=C;b.fillStyle="rgba(255,255,255,0.8)",b.fillText(x.position.x+"  "+x.position.y,x.position.x+5,x.position.y-5)},t.bodyBounds=function(v,x,C){var b=C;v.engine;var E=v.options;b.beginPath();for(var S=0;S<x.length;S++){var I=x[S];if(I.render.visible)for(var A=x[S].parts,T=A.length>1?1:0;T<A.length;T++){var P=A[T];b.rect(P.bounds.min.x,P.bounds.min.y,P.bounds.max.x-P.bounds.min.x,P.bounds.max.y-P.bounds.min.y)}}E.wireframes?b.strokeStyle="rgba(255,255,255,0.08)":b.strokeStyle="rgba(0,0,0,0.1)",b.lineWidth=1,b.stroke()},t.bodyAxes=function(v,x,C){var b=C;v.engine;var E=v.options,S,I,A,T;for(b.beginPath(),I=0;I<x.length;I++){var P=x[I],k=P.parts;if(P.render.visible)if(E.showAxes)for(A=k.length>1?1:0;A<k.length;A++)for(S=k[A],T=0;T<S.axes.length;T++){var _=S.axes[T];b.moveTo(S.position.x,S.position.y),b.lineTo(S.position.x+_.x*20,S.position.y+_.y*20)}else for(A=k.length>1?1:0;A<k.length;A++)for(S=k[A],T=0;T<S.axes.length;T++)b.moveTo(S.position.x,S.position.y),b.lineTo((S.vertices[0].x+S.vertices[S.vertices.length-1].x)/2,(S.vertices[0].y+S.vertices[S.vertices.length-1].y)/2)}E.wireframes?(b.strokeStyle="indianred",b.lineWidth=1):(b.strokeStyle="rgba(255, 255, 255, 0.4)",b.globalCompositeOperation="overlay",b.lineWidth=2),b.stroke(),b.globalCompositeOperation="source-over"},t.bodyPositions=function(v,x,C){var b=C;v.engine;var E=v.options,S,I,A,T;for(b.beginPath(),A=0;A<x.length;A++)if(S=x[A],!!S.render.visible)for(T=0;T<S.parts.length;T++)I=S.parts[T],b.arc(I.position.x,I.position.y,3,0,2*Math.PI,!1),b.closePath();for(E.wireframes?b.fillStyle="indianred":b.fillStyle="rgba(0,0,0,0.5)",b.fill(),b.beginPath(),A=0;A<x.length;A++)S=x[A],S.render.visible&&(b.arc(S.positionPrev.x,S.positionPrev.y,2,0,2*Math.PI,!1),b.closePath());b.fillStyle="rgba(255,165,0,0.8)",b.fill()},t.bodyVelocity=function(v,x,C){var b=C;b.beginPath();for(var E=0;E<x.length;E++){var S=x[E];if(S.render.visible){var I=n.getVelocity(S);b.moveTo(S.position.x,S.position.y),b.lineTo(S.position.x+I.x,S.position.y+I.y)}}b.lineWidth=3,b.strokeStyle="cornflowerblue",b.stroke()},t.bodyIds=function(v,x,C){var b=C,E,S;for(E=0;E<x.length;E++)if(x[E].render.visible){var I=x[E].parts;for(S=I.length>1?1:0;S<I.length;S++){var A=I[S];b.font="12px Arial",b.fillStyle="rgba(255,255,255,0.5)",b.fillText(A.id,A.position.x+10,A.position.y-10)}}},t.collisions=function(v,x,C){var b=C,E=v.options,S,I,A,T;for(b.beginPath(),A=0;A<x.length;A++)if(S=x[A],!!S.isActive)for(I=S.collision,T=0;T<S.contactCount;T++){var P=S.contacts[T],k=P.vertex;b.rect(k.x-1.5,k.y-1.5,3.5,3.5)}for(E.wireframes?b.fillStyle="rgba(255,255,255,0.7)":b.fillStyle="orange",b.fill(),b.beginPath(),A=0;A<x.length;A++)if(S=x[A],!!S.isActive&&(I=S.collision,S.contactCount>0)){var _=S.contacts[0].vertex.x,D=S.contacts[0].vertex.y;S.contactCount===2&&(_=(S.contacts[0].vertex.x+S.contacts[1].vertex.x)/2,D=(S.contacts[0].vertex.y+S.contacts[1].vertex.y)/2),I.bodyB===I.supports[0].body||I.bodyA.isStatic===!0?b.moveTo(_-I.normal.x*8,D-I.normal.y*8):b.moveTo(_+I.normal.x*8,D+I.normal.y*8),b.lineTo(_,D)}E.wireframes?b.strokeStyle="rgba(255,165,0,0.7)":b.strokeStyle="orange",b.lineWidth=1,b.stroke()},t.separations=function(v,x,C){var b=C,E=v.options,S,I,A,T,P;for(b.beginPath(),P=0;P<x.length;P++)if(S=x[P],!!S.isActive){I=S.collision,A=I.bodyA,T=I.bodyB;var k=1;!T.isStatic&&!A.isStatic&&(k=.5),T.isStatic&&(k=0),b.moveTo(T.position.x,T.position.y),b.lineTo(T.position.x-I.penetration.x*k,T.position.y-I.penetration.y*k),k=1,!T.isStatic&&!A.isStatic&&(k=.5),A.isStatic&&(k=0),b.moveTo(A.position.x,A.position.y),b.lineTo(A.position.x+I.penetration.x*k,A.position.y+I.penetration.y*k)}E.wireframes?b.strokeStyle="rgba(255,165,0,0.5)":b.strokeStyle="orange",b.stroke()},t.inspector=function(v,x){v.engine;var C=v.selected,b=v.render,E=b.options,S;if(E.hasBounds){var I=b.bounds.max.x-b.bounds.min.x,A=b.bounds.max.y-b.bounds.min.y,T=I/b.options.width,P=A/b.options.height;x.scale(1/T,1/P),x.translate(-b.bounds.min.x,-b.bounds.min.y)}for(var k=0;k<C.length;k++){var _=C[k].data;switch(x.translate(.5,.5),x.lineWidth=1,x.strokeStyle="rgba(255,165,0,0.9)",x.setLineDash([1,2]),_.type){case"body":S=_.bounds,x.beginPath(),x.rect(Math.floor(S.min.x-3),Math.floor(S.min.y-3),Math.floor(S.max.x-S.min.x+6),Math.floor(S.max.y-S.min.y+6)),x.closePath(),x.stroke();break;case"constraint":var D=_.pointA;_.bodyA&&(D=_.pointB),x.beginPath(),x.arc(D.x,D.y,10,0,2*Math.PI),x.closePath(),x.stroke();break}x.setLineDash([]),x.translate(-.5,-.5)}v.selectStart!==null&&(x.translate(.5,.5),x.lineWidth=1,x.strokeStyle="rgba(255,165,0,0.6)",x.fillStyle="rgba(255,165,0,0.1)",S=v.selectBounds,x.beginPath(),x.rect(Math.floor(S.min.x),Math.floor(S.min.y),Math.floor(S.max.x-S.min.x),Math.floor(S.max.y-S.min.y)),x.closePath(),x.stroke(),x.fill(),x.translate(-.5,-.5)),E.hasBounds&&x.setTransform(1,0,0,1,0,0)};var h=function(v,x){var C=v.engine,b=v.timing,E=b.historySize,S=C.timing.timestamp;b.delta=x-b.lastTime||t._goodDelta,b.lastTime=x,b.timestampElapsed=S-b.lastTimestamp||0,b.lastTimestamp=S,b.deltaHistory.unshift(b.delta),b.deltaHistory.length=Math.min(b.deltaHistory.length,E),b.engineDeltaHistory.unshift(C.timing.lastDelta),b.engineDeltaHistory.length=Math.min(b.engineDeltaHistory.length,E),b.timestampElapsedHistory.unshift(b.timestampElapsed),b.timestampElapsedHistory.length=Math.min(b.timestampElapsedHistory.length,E),b.engineUpdatesHistory.unshift(C.timing.lastUpdatesPerFrame),b.engineUpdatesHistory.length=Math.min(b.engineUpdatesHistory.length,E),b.engineElapsedHistory.unshift(C.timing.lastElapsed),b.engineElapsedHistory.length=Math.min(b.engineElapsedHistory.length,E),b.elapsedHistory.unshift(b.lastElapsed),b.elapsedHistory.length=Math.min(b.elapsedHistory.length,E)},m=function(v){for(var x=0,C=0;C<v.length;C+=1)x+=v[C];return x/v.length||0},y=function(v,x){var C=document.createElement("canvas");return C.width=v,C.height=x,C.oncontextmenu=function(){return!1},C.onselectstart=function(){return!1},C},w=function(v){var x=v.getContext("2d"),C=window.devicePixelRatio||1,b=x.webkitBackingStorePixelRatio||x.mozBackingStorePixelRatio||x.msBackingStorePixelRatio||x.oBackingStorePixelRatio||x.backingStorePixelRatio||1;return C/b},M=function(v,x){var C=v.textures[x];return C||(C=v.textures[x]=new Image,C.src=x,C)},q=function(v,x){var C=x;/(jpg|gif|png)$/.test(x)&&(C="url("+x+")"),v.canvas.style.background=C,v.canvas.style.backgroundSize="contain",v.currentBackground=x}})()},function(a,s,i){var t={};a.exports=t;var n=i(5),l=i(17),r=i(0);(function(){t._maxFrameDelta=1e3/15,t._frameDeltaFallback=1e3/60,t._timeBufferMargin=1.5,t._elapsedNextEstimate=1,t._smoothingLowerBound=.1,t._smoothingUpperBound=.9,t.create=function(c){var p={delta:16.666666666666668,frameDelta:null,frameDeltaSmoothing:!0,frameDeltaSnapping:!0,frameDeltaHistory:[],frameDeltaHistorySize:100,frameRequestId:null,timeBuffer:0,timeLastTick:null,maxUpdates:null,maxFrameTime:33.333333333333336,lastUpdatesDeferred:0,enabled:!0},u=r.extend(p,c);return u.fps=0,u},t.run=function(c,p){return c.timeBuffer=t._frameDeltaFallback,function u(o){c.frameRequestId=t._onNextFrame(c,u),o&&c.enabled&&t.tick(c,p,o)}(),c},t.tick=function(c,p,u){var o=r.now(),d=c.delta,h=0,m=u-c.timeLastTick;if((!m||!c.timeLastTick||m>Math.max(t._maxFrameDelta,c.maxFrameTime))&&(m=c.frameDelta||t._frameDeltaFallback),c.frameDeltaSmoothing){c.frameDeltaHistory.push(m),c.frameDeltaHistory=c.frameDeltaHistory.slice(-c.frameDeltaHistorySize);var y=c.frameDeltaHistory.slice(0).sort(),w=c.frameDeltaHistory.slice(y.length*t._smoothingLowerBound,y.length*t._smoothingUpperBound),M=g(w);m=M||m}c.frameDeltaSnapping&&(m=1e3/Math.round(1e3/m)),c.frameDelta=m,c.timeLastTick=u,c.timeBuffer+=c.frameDelta,c.timeBuffer=r.clamp(c.timeBuffer,0,c.frameDelta+d*t._timeBufferMargin),c.lastUpdatesDeferred=0;var q=c.maxUpdates||Math.ceil(c.maxFrameTime/d),v={timestamp:p.timing.timestamp};n.trigger(c,"beforeTick",v),n.trigger(c,"tick",v);for(var x=r.now();d>0&&c.timeBuffer>=d*t._timeBufferMargin;){n.trigger(c,"beforeUpdate",v),l.update(p,d),n.trigger(c,"afterUpdate",v),c.timeBuffer-=d,h+=1;var C=r.now()-o,b=r.now()-x,E=C+t._elapsedNextEstimate*b/h;if(h>=q||E>c.maxFrameTime){c.lastUpdatesDeferred=Math.round(Math.max(0,c.timeBuffer/d-t._timeBufferMargin));break}}p.timing.lastUpdatesPerFrame=h,n.trigger(c,"afterTick",v),c.frameDeltaHistory.length>=100&&(c.lastUpdatesDeferred&&Math.round(c.frameDelta/d)>q?r.warnOnce("Matter.Runner: runner reached runner.maxUpdates, see docs."):c.lastUpdatesDeferred&&r.warnOnce("Matter.Runner: runner reached runner.maxFrameTime, see docs."),typeof c.isFixed<"u"&&r.warnOnce("Matter.Runner: runner.isFixed is now redundant, see docs."),(c.deltaMin||c.deltaMax)&&r.warnOnce("Matter.Runner: runner.deltaMin and runner.deltaMax were removed, see docs."),c.fps!==0&&r.warnOnce("Matter.Runner: runner.fps was replaced by runner.delta, see docs."))},t.stop=function(c){t._cancelNextFrame(c)},t._onNextFrame=function(c,p){if(typeof window<"u"&&window.requestAnimationFrame)c.frameRequestId=window.requestAnimationFrame(p);else throw new Error("Matter.Runner: missing required global window.requestAnimationFrame.");return c.frameRequestId},t._cancelNextFrame=function(c){if(typeof window<"u"&&window.cancelAnimationFrame)window.cancelAnimationFrame(c.frameRequestId);else throw new Error("Matter.Runner: missing required global window.cancelAnimationFrame.")};var g=function(c){for(var p=0,u=c.length,o=0;o<u;o+=1)p+=c[o];return p/u||0}})()},function(a,s,i){var t={};a.exports=t;var n=i(8),l=i(0),r=l.deprecated;(function(){t.collides=function(g,c){return n.collides(g,c)},r(t,"collides","SAT.collides ➤ replaced by Collision.collides")})()},function(a,s,i){var t={};a.exports=t,i(1);var n=i(0);(function(){t.pathToVertices=function(l,r){typeof window<"u"&&!("SVGPathSeg"in window)&&n.warn("Svg.pathToVertices: SVGPathSeg not defined, a polyfill is required.");var g,c,p,u,o,d,h,m,y,w,M=[],q,v,x=0,C=0,b=0;r=r||15;var E=function(I,A,T){var P=T%2===1&&T>1;if(!y||I!=y.x||A!=y.y){y&&P?(q=y.x,v=y.y):(q=0,v=0);var k={x:q+I,y:v+A};(P||!y)&&(y=k),M.push(k),C=q+I,b=v+A}},S=function(I){var A=I.pathSegTypeAsLetter.toUpperCase();if(A!=="Z"){switch(A){case"M":case"L":case"T":case"C":case"S":case"Q":C=I.x,b=I.y;break;case"H":C=I.x;break;case"V":b=I.y;break}E(C,b,I.pathSegType)}};for(t._svgPathToAbsolute(l),p=l.getTotalLength(),d=[],g=0;g<l.pathSegList.numberOfItems;g+=1)d.push(l.pathSegList.getItem(g));for(h=d.concat();x<p;){if(w=l.getPathSegAtLength(x),o=d[w],o!=m){for(;h.length&&h[0]!=o;)S(h.shift());m=o}switch(o.pathSegTypeAsLetter.toUpperCase()){case"C":case"T":case"S":case"Q":case"A":u=l.getPointAtLength(x),E(u.x,u.y,0);break}x+=r}for(g=0,c=h.length;g<c;++g)S(h[g]);return M},t._svgPathToAbsolute=function(l){for(var r,g,c,p,u,o,d=l.pathSegList,h=0,m=0,y=d.numberOfItems,w=0;w<y;++w){var M=d.getItem(w),q=M.pathSegTypeAsLetter;if(/[MLHVCSQTA]/.test(q))"x"in M&&(h=M.x),"y"in M&&(m=M.y);else switch("x1"in M&&(c=h+M.x1),"x2"in M&&(u=h+M.x2),"y1"in M&&(p=m+M.y1),"y2"in M&&(o=m+M.y2),"x"in M&&(h+=M.x),"y"in M&&(m+=M.y),q){case"m":d.replaceItem(l.createSVGPathSegMovetoAbs(h,m),w);break;case"l":d.replaceItem(l.createSVGPathSegLinetoAbs(h,m),w);break;case"h":d.replaceItem(l.createSVGPathSegLinetoHorizontalAbs(h),w);break;case"v":d.replaceItem(l.createSVGPathSegLinetoVerticalAbs(m),w);break;case"c":d.replaceItem(l.createSVGPathSegCurvetoCubicAbs(h,m,c,p,u,o),w);break;case"s":d.replaceItem(l.createSVGPathSegCurvetoCubicSmoothAbs(h,m,u,o),w);break;case"q":d.replaceItem(l.createSVGPathSegCurvetoQuadraticAbs(h,m,c,p),w);break;case"t":d.replaceItem(l.createSVGPathSegCurvetoQuadraticSmoothAbs(h,m),w);break;case"a":d.replaceItem(l.createSVGPathSegArcAbs(h,m,M.r1,M.r2,M.angle,M.largeArcFlag,M.sweepFlag),w);break;case"z":case"Z":h=r,m=g;break}(q=="M"||q=="m")&&(r=h,g=m)}}})()},function(a,s,i){var t={};a.exports=t;var n=i(6);i(0),function(){t.create=n.create,t.add=n.add,t.remove=n.remove,t.clear=n.clear,t.addComposite=n.addComposite,t.addBody=n.addBody,t.addConstraint=n.addConstraint}()}])})}(st)),st.exports}var oi=ni();const L=ai(oi),at=1,si=2,K=60,ta=70;class ri{constructor(e,a,s){console.log("PhysicsManager Creado"),this.catManager=e,this.catFoodManager=a,this.gameManager=s,this.resizeListener=this.handleResize.bind(this),this.collisionHandler=this.handleCollisions.bind(this),this.speedLimitHandler=this.limitAllCatSpeeds.bind(this)}init(e){if(console.log("PhysicsManager: init"),!e)throw console.error("PhysicsManager CRITICAL: catDisplayAreaElement es nulo en init()."),new Error("PhysicsManager requiere un catDisplayAreaElement para inicializar.");this.catDisplayAreaElement=e,this.engine=L.Engine.create(),this.world=this.engine.world,this.runner=L.Runner.create(),this.engine.gravity.y=.8,this.engine.gravity.x=0,this.engine.enableSleeping=!0,console.log("Matter.js Engine, World, Runner creados."),this.createWalls(),this.setupMouseConstraint(this.catDisplayAreaElement),console.log("PhysicsManager: Añadiendo listeners de eventos del motor..."),L.Events.on(this.engine,"collisionStart",this.collisionHandler),L.Events.on(this.engine,"beforeUpdate",this.speedLimitHandler),window.addEventListener("resize",this.resizeListener),console.log("PhysicsManager: init completado.")}createWalls(){const e=window.innerWidth,a=window.innerHeight;this.ground=L.Bodies.rectangle(e/2,a+K/2,e,K,{isStatic:!0,label:"ground",collisionFilter:{category:at}}),this.leftWall=L.Bodies.rectangle(-60/2,a/2,K,a,{isStatic:!0,label:"leftWall",collisionFilter:{category:at}}),this.rightWall=L.Bodies.rectangle(e+K/2,a/2,K,a,{isStatic:!0,label:"rightWall",collisionFilter:{category:at}}),this.topWall=L.Bodies.rectangle(e/2,-60/2,e,K,{isStatic:!0,label:"topWall",collisionFilter:{category:at}}),L.World.add(this.world,[this.ground,this.leftWall,this.rightWall,this.topWall]),console.log("PhysicsManager: Paredes creadas.")}setupMouseConstraint(e){const a=L.Mouse.create(e);this.mouseConstraint=L.MouseConstraint.create(this.engine,{mouse:a,constraint:{stiffness:.1,render:{visible:!1}}}),this.mouseConstraint.collisionFilter.mask=si,L.World.add(this.world,this.mouseConstraint),this.updateMouseConstraintOffset(),console.log("PhysicsManager: MouseConstraint configurado sobre",e),L.Events.on(this.mouseConstraint,"startdrag",s=>{const i=s.body;i&&i.label==="cat"&&(console.log("PhysicsManager: Cat drag started"),this.gameManager.setCatDragState(!0))}),L.Events.on(this.mouseConstraint,"enddrag",s=>{const i=s.body;i&&i.label==="cat"&&(console.log("PhysicsManager: Cat drag ended"),this.gameManager.setCatDragState(!1))})}updateMouseConstraintOffset(){if(this.mouseConstraint&&this.mouseConstraint.mouse.element){const e=this.mouseConstraint.mouse.element.getBoundingClientRect();L.Mouse.setOffset(this.mouseConstraint.mouse,{x:-e.left,y:-e.top})}}handleCollisions(e){var s,i;const a=e.pairs;for(let t=0;t<a.length;t++){const n=a[t],l=n.bodyA,r=n.bodyB,g=l==null?void 0:l.label,c=r==null?void 0:r.label;if(g==="cat"&&c==="cat"){const p=((s=this.mouseConstraint)==null?void 0:s.body)===l,u=((i=this.mouseConstraint)==null?void 0:i.body)===r;if(p!==u)if(typeof l.id<"u"&&typeof r.id<"u"){const o=p?l.id:r.id;this.catManager.processPlayerInitiatedCollision(l.id,r.id,o)}else console.error("Error: IDs indefinidos en colisión gato-gato.")}else if(g==="cat"&&c==="foodPellet"||g==="foodPellet"&&c==="cat"){const p=g==="cat"?l:r,u=g==="foodPellet"?l:r;typeof p.id<"u"&&u?this.catFoodManager.processCatFoodCollision(p.id,u):console.warn("Colisión Gato-Comida detectada pero falta ID de gato o cuerpo de comida.")}}}limitAllCatSpeeds(){if(!this.world)return;const e=L.Composite.allBodies(this.world);for(let a=0;a<e.length;a++){const s=e[a];if(!s.isStatic&&s.label==="cat"&&L.Vector.magnitude(s.velocity)>ta){const t=L.Vector.normalise(s.velocity),n=L.Vector.mult(t,ta);L.Body.setVelocity(s,n)}}}handleResize(){if(!this.ground||!this.leftWall||!this.rightWall||!this.topWall||!this.catDisplayAreaElement)return;const e=window.innerWidth,a=window.innerHeight;L.Body.setPosition(this.ground,{x:e/2,y:a+K/2}),L.Body.setVertices(this.ground,L.Vertices.fromPath(`L 0 0 L ${e} 0 L ${e} ${K} L 0 ${K}`,this.ground)),L.Body.setPosition(this.leftWall,{x:-60/2,y:a/2}),L.Body.setVertices(this.leftWall,L.Vertices.fromPath(`L 0 0 L ${K} 0 L ${K} ${a} L 0 ${a}`,this.leftWall)),L.Body.setPosition(this.rightWall,{x:e+K/2,y:a/2}),L.Body.setVertices(this.rightWall,L.Vertices.fromPath(`L 0 0 L ${K} 0 L ${K} ${a} L 0 ${a}`,this.rightWall)),L.Body.setPosition(this.topWall,{x:e/2,y:-60/2}),L.Body.setVertices(this.topWall,L.Vertices.fromPath(`L 0 0 L ${e} 0 L ${e} ${K} L 0 ${K}`,this.topWall)),this.updateMouseConstraintOffset(),console.log("PhysicsManager: Límites y mouse constraint actualizados en resize.")}start(){if(!this.engine||!this.runner){console.error("PhysicsManager: init() debe ser llamado antes de start().");return}L.Runner.run(this.runner,this.engine),console.log("PhysicsManager: Runner iniciado.")}stop(){if(!this.runner){console.warn("PhysicsManager: Runner no inicializado.");return}L.Runner.stop(this.runner),console.log("PhysicsManager: Runner detenido.")}shutdown(){console.log("PhysicsManager: shutdown"),this.stop(),this.engine?(L.Events.off(this.engine,"collisionStart",this.collisionHandler),L.Events.off(this.engine,"beforeUpdate",this.speedLimitHandler),this.mouseConstraint&&(L.Events.off(this.mouseConstraint,"startdrag"),L.Events.off(this.mouseConstraint,"enddrag")),L.World.clear(this.world,!1),L.Engine.clear(this.engine),console.log("PhysicsManager: Listeners de engine removidos y mundo limpiado.")):console.warn("PhysicsManager shutdown: Engine no encontrado."),window.removeEventListener("resize",this.resizeListener),this.mouseConstraint=void 0,console.log("PhysicsManager: shutdown completo.")}getEngine(){if(!this.engine)throw new Error("PhysicsManager no inicializado.");return this.engine}getWorld(){if(!this.world)throw new Error("PhysicsManager no inicializado.");return this.world}}class li{constructor(){this.allQuestions=[],this.availableQuestions=[],this.currentQuestion=null,this.isLoading=!1,this.lastError=null}async loadQuestionsData(e){if(this.isLoading)return console.warn("QuizSystem: Ya hay una carga en progreso."),!1;this.isLoading=!0,this.lastError=null,this.allQuestions=[];try{if(!Array.isArray(e))throw new Error("Los datos de preguntas proporcionados no son un array válido.");return this.allQuestions=e,this.resetAvailableQuestions(),console.log(`QuizSystem: ${this.allQuestions.length} preguntas procesadas exitosamente desde datos pre-cargados.`),this.isLoading=!1,!0}catch(a){return console.error("QuizSystem: Error al procesar los datos de preguntas:",a),this.lastError=a instanceof Error?a.message:String(a),this.isLoading=!1,this.allQuestions=[],this.availableQuestions=[],!1}}selectNextQuestion(e){if(this.allQuestions.length===0&&!this.isLoading)return console.error("QuizSystem: No hay preguntas cargadas o procesadas."),null;if(this.isLoading)return console.warn("QuizSystem: Las preguntas aún se están procesando."),null;let a=this.availableQuestions;if(e&&(a=a.filter(i=>String(i.difficulty)===String(e))),a.length===0&&(console.warn("QuizSystem: No quedan preguntas disponibles"+(e?` con dificultad '${e}'.`:".")+" Reseteando lista..."),this.resetAvailableQuestions(),a=this.availableQuestions,e&&(a=a.filter(i=>String(i.difficulty)===String(e))),a.length===0))return console.error(`QuizSystem: No se encontraron preguntas con dificultad '${e}' incluso después de resetear.`),null;const s=Math.floor(Math.random()*a.length);return this.currentQuestion=a[s],this.availableQuestions=this.availableQuestions.filter(i=>{var t;return i.id!==((t=this.currentQuestion)==null?void 0:t.id)}),this.currentQuestion}validateAnswer(e,a){const s=this.allQuestions.find(t=>t.id===e);return s?a===null?!1:s.correctAnswerKey===a:(console.error(`QuizSystem: No se encontró la pregunta con ID '${e}' para validar.`),null)}getCurrentQuestion(){return this.currentQuestion}resetAvailableQuestions(){this.availableQuestions=[...this.allQuestions],this.currentQuestion=null}getLastError(){return this.lastError}isLoadingQuestions(){return this.isLoading}getTotalQuestionsCount(){return this.allQuestions.length}getAvailableQuestionsCount(){return this.availableQuestions.length}}class ci{constructor(){this.states=new Map,this.currentState=null,this.currentStateName=null,this.isTransitioning=!1,this.animationContainer=null,this.wipeComponent=null}setAnimationContainer(e){this.animationContainer=e}setWipeComponent(e){var a;this.wipeComponent=e,console.log("[StateMachine] Wipe component seteado:",e),(a=this.wipeComponent)==null||a.reset()}addState(e,a){this.states.has(e)&&console.warn(`[StateMachine] El estado '${e}' ya existe. Sobrescribiendo.`),this.states.set(e,a)}async changeState(e,a,s,i){var c,p,u,o;if(console.log(`[StateMachine] Solicitud para cambiar a estado '${e}'. Estado actual: '${this.currentStateName}', isTransitioning: ${this.isTransitioning}`),this.isTransitioning){console.warn(`[StateMachine] Transición a '${e}' ignorada, otra transición ya está en progreso.`);return}const t=this.states.get(e);if(!t){console.error(`[StateMachine] Estado '${e}' no existe. Estados disponibles:`,Array.from(this.states.keys())),this.isTransitioning=!1;return}if(this.currentStateName===e&&!s&&!i){console.warn(`[StateMachine] Ya en estado '${e}' y sin forzar animación.`);return}this.isTransitioning=!0,console.log(`[StateMachine] INICIO TRANSICIÓN: de '${this.currentStateName||"ninguno"}' a '${e}'. isTransitioning = true.`);const n=this.currentState,l=this.currentStateName,r=s||((c=n==null?void 0:n.getPreferredExitAnimation)==null?void 0:c.call(n))||"gq-fade-out",g=i||((p=t==null?void 0:t.getPreferredEnterAnimation)==null?void 0:p.call(t))||"gq-fade-in";try{if(this.wipeComponent&&(r==="gq-wipe-transition"||g==="gq-wipe-transition"))console.log(`[StateMachine] Usando BARRIDO de '${l||"ninguno"}' a '${e}'.`),console.log("[StateMachine]   BARRIDO: Llamando wipeComponent.playIn() para cubrir pantalla..."),await this.wipeComponent.playIn(),console.log("[StateMachine]   BARRIDO: wipeComponent.playIn() COMPLETADO."),n!=null&&n.exit&&(console.log(`[StateMachine]   BARRIDO: Llamando oldState.exit() para '${l}'.`),n.exit()),this.animationContainer&&(console.log("[StateMachine]   BARRIDO: Limpiando animationContainer (innerHTML = '')."),this.animationContainer.innerHTML=""),this.currentState=t,this.currentStateName=e,(u=this.currentState)!=null&&u.enter&&(console.log(`[StateMachine]   BARRIDO: Llamando currentState.enter() para '${this.currentStateName}'.`),this.currentState.enter(a)),console.log(`[StateMachine]   BARRIDO: Llamando wipeComponent.playOut() para revelar '${this.currentStateName}'...`),await this.wipeComponent.playOut(),console.log("[StateMachine]   BARRIDO: wipeComponent.playOut() COMPLETADO."),this.wipeComponent.reset(),console.log(`[StateMachine] Transición de BARRIDO a '${this.currentStateName}' finalizada exitosamente.`);else{console.log(`[StateMachine] Usando animación ESTÁNDAR ('${r}' -> '${g}') de '${l||"ninguno"}' a '${e}'.`);const d=this.animationContainer||document.getElementById("app");if(!d){console.error("[StateMachine] Contenedor de animación estándar no encontrado. Realizando cambio directo."),n!=null&&n.exit&&n.exit(),this.currentState=t,this.currentStateName=e,this.currentState.enter&&this.currentState.enter(a),console.log(`[StateMachine] Cambio directo a '${e}' completado (sin contenedor).`);return}await new Promise(h=>{const m=()=>{var x;d.removeEventListener("animationend",w),y&&clearTimeout(y),d.classList.remove("gq-state-is-exiting",...St(d)),console.log(`[StateMachine]   ESTÁNDAR: Animación de salida '${r}' para '${l}' finalizada.`),n!=null&&n.exit&&(console.log(`[StateMachine]   ESTÁNDAR: Llamando oldState.exit() para '${l}'.`),n.exit()),r.includes("fade")&&(console.log("[StateMachine]   ESTÁNDAR: Limpiando container.innerHTML por animación fade."),d.innerHTML=""),this.currentState=t,this.currentStateName=e,(x=this.currentState)!=null&&x.enter&&(console.log(`[StateMachine]   ESTÁNDAR: Llamando currentState.enter() para '${this.currentStateName}'.`),this.currentState.enter(a)),console.log(`[StateMachine]   ESTÁNDAR: Aplicando animación de entrada '${g}' para '${this.currentStateName}'.`),d.classList.add("gq-state-is-entering",g);const M=aa(d,g);let q=window.setTimeout(()=>{console.warn(`[StateMachine]   ESTÁNDAR: Fallback para animationend de entrada en '${this.currentStateName}'.`),d.removeEventListener("animationend",v),d.classList.remove("gq-state-is-entering",...St(d)),console.log(`[StateMachine] Transición ESTÁNDAR a '${this.currentStateName}' completada (fallback).`),h()},M+150);const v=C=>{C.target===d&&C.animationName===ia(g)&&(q&&clearTimeout(q),q=void 0,d.removeEventListener("animationend",v),d.classList.remove("gq-state-is-entering",...St(d)),console.log(`[StateMachine] Transición ESTÁNDAR a '${this.currentStateName}' completada (evento).`),h())};d.addEventListener("animationend",v)};let y,w;if(n){console.log(`[StateMachine]   ESTÁNDAR: Aplicando animación de salida '${r}' a '${l}'.`),d.classList.add("gq-state-is-exiting",r);const M=aa(d,r);y=window.setTimeout(()=>{console.warn(`[StateMachine]   ESTÁNDAR: Fallback para animationend de salida en '${l}'.`),m()},M+150),w=q=>{q.target===d&&q.animationName===ia(r)&&m()},d.addEventListener("animationend",w)}else console.log("[StateMachine]   ESTÁNDAR: No hay estado antiguo, procediendo directamente a la entrada."),m()})}}catch(d){console.error(`[StateMachine] ERROR CRÍTICO durante la transición de '${l||"ninguno"}' a '${e}':`,d),(o=this.wipeComponent)==null||o.reset()}finally{this.isTransitioning=!1,console.log(`[StateMachine] FIN TRANSICIÓN: a '${e}'. isTransitioning = false. Estado final: '${this.currentStateName}'.`)}}update(e){var a;if(!this.isTransitioning&&((a=this.currentState)!=null&&a.update))try{this.currentState.update(e)}catch(s){console.error(`[StateMachine] Error en update() de '${this.currentStateName}':`,s)}}getCurrentStateName(){return this.currentStateName}getCurrentState(){return this.currentState}}function aa(f,e){const a=f.className;f.className=`${a} ${e}`.trim();const s=getComputedStyle(f).animationDuration||"0s";f.className=a;const i=parseFloat(s);return s.toLowerCase().includes("ms")?i:i*1e3}function ia(f){if(f.startsWith("anim-"))return f;const e=f.split("-");return e.length>1&&e[0]==="gq"?`anim-${e.slice(1).join("-")}`:f}function St(f){const e=["gq-fade","gq-slide","gq-wipe","anim-"];return Array.from(f.classList).filter(a=>e.some(s=>a.startsWith(s)))}class di{constructor(){this.audioCtx=null,this.isInitialized=!1,this.masterGainNode=null,console.log("AudioManager Creado (sin inicializar)")}init(){if(!this.isInitialized)try{this.audioCtx=new(window.AudioContext||window.webkitAudioContext),this.masterGainNode=this.audioCtx.createGain(),this.masterGainNode.connect(this.audioCtx.destination),this.audioCtx.state==="suspended"?this.audioCtx.resume().then(()=>{console.log("AudioManager: AudioContext reanudado exitosamente."),this.isInitialized=!0}).catch(e=>console.error("AudioManager: Error al reanudar AudioContext:",e)):this.isInitialized=!0}catch(e){console.error("AudioManager: Error al crear AudioContext:",e),this.audioCtx=null,this.masterGainNode=null,this.isInitialized=!1}}playSound(e){if(!((!this.isInitialized||!this.audioCtx||!this.masterGainNode)&&(this.isInitialized||this.init(),!this.isInitialized||!this.audioCtx||!this.masterGainNode))){if(this.audioCtx.state!=="running"){this.audioCtx.state==="suspended"&&this.audioCtx.resume().catch(a=>console.error("Error reanudando AudioContext en playSound:",a));return}try{const a=this.audioCtx.createOscillator(),s=this.audioCtx.createGain();a.connect(s),s.connect(this.masterGainNode);const i=this.audioCtx.currentTime,t=(n,l,r)=>{n.onended=()=>{try{n.numberOfOutputs>0&&n.disconnect(),r&&r.numberOfOutputs>0&&r.disconnect(),l.numberOfOutputs>0&&l.disconnect()}catch{}}};switch(e){case"correct":a.type="sine",a.frequency.setValueAtTime(440,i),s.gain.setValueAtTime(.001,i),s.gain.exponentialRampToValueAtTime(.4,i+.05),a.frequency.exponentialRampToValueAtTime(880,i+.15),s.gain.exponentialRampToValueAtTime(1e-4,i+.3),t(a,s),a.start(i),a.stop(i+.35);break;case"incorrect":a.type="square",a.frequency.setValueAtTime(110,i),s.gain.setValueAtTime(.001,i),s.gain.exponentialRampToValueAtTime(.3,i+.02),s.gain.exponentialRampToValueAtTime(1e-4,i+.2),t(a,s),a.start(i),a.stop(i+.25);break;case"eat":a.type="sawtooth",a.frequency.setValueAtTime(150,i),s.gain.setValueAtTime(.001,i),s.gain.exponentialRampToValueAtTime(.15,i+.03),a.frequency.exponentialRampToValueAtTime(50,i+.1),s.gain.exponentialRampToValueAtTime(1e-4,i+.15),t(a,s),a.start(i),a.stop(i+.2);break;case"draw_start":a.type="triangle",a.frequency.setValueAtTime(330,i),s.gain.setValueAtTime(.001,i),s.gain.exponentialRampToValueAtTime(.1,i+.02),s.gain.exponentialRampToValueAtTime(1e-4,i+.1),t(a,s),a.start(i),a.stop(i+.15);break;case"draw_end":a.type="sine",a.frequency.setValueAtTime(220,i),s.gain.setValueAtTime(.001,i),s.gain.exponentialRampToValueAtTime(.15,i+.03),s.gain.exponentialRampToValueAtTime(1e-4,i+.15),t(a,s),a.start(i),a.stop(i+.2);break;case"clear_ink":a.type="sawtooth",a.frequency.setValueAtTime(800,i),s.gain.setValueAtTime(.001,i),s.gain.exponentialRampToValueAtTime(.2,i+.05),a.frequency.exponentialRampToValueAtTime(200,i+.2),s.gain.exponentialRampToValueAtTime(1e-4,i+.3),t(a,s),a.start(i),a.stop(i+.35);break;case"game_over":a.type="square",a.frequency.setValueAtTime(220,i),s.gain.setValueAtTime(.001,i),s.gain.exponentialRampToValueAtTime(.3,i+.05),a.frequency.exponentialRampToValueAtTime(110,i+.15),s.gain.exponentialRampToValueAtTime(1e-4,i+.4),t(a,s),a.start(i),a.stop(i+.45);break;case"purchase":a.type="triangle",a.frequency.setValueAtTime(660,i),s.gain.setValueAtTime(.001,i),s.gain.exponentialRampToValueAtTime(.3,i+.03),a.frequency.exponentialRampToValueAtTime(1320,i+.1),s.gain.exponentialRampToValueAtTime(1e-4,i+.2),t(a,s),a.start(i),a.stop(i+.25);break;case"shield_break":a.type="sawtooth";const n=this.audioCtx.createBiquadFilter();n.type="bandpass",n.frequency.setValueAtTime(1500,i),n.Q.setValueAtTime(15,i),a.connect(n),n.connect(s),s.gain.setValueAtTime(.001,i),s.gain.exponentialRampToValueAtTime(.5,i+.02),s.gain.exponentialRampToValueAtTime(1e-4,i+.3),t(a,s,n),a.start(i),a.stop(i+.3);break;case"hint_used":a.type="sine",a.frequency.setValueAtTime(900,i),s.gain.setValueAtTime(.001,i),s.gain.exponentialRampToValueAtTime(.1,i+.02),s.gain.exponentialRampToValueAtTime(1e-4,i+.1),t(a,s),a.start(i),a.stop(i+.15);break;case"ui_confirm":a.type="sine",a.frequency.setValueAtTime(523.25,i),s.gain.setValueAtTime(.001,i),s.gain.exponentialRampToValueAtTime(.25,i+.02),a.frequency.linearRampToValueAtTime(659.25,i+.05),s.gain.exponentialRampToValueAtTime(1e-4,i+.15),t(a,s),a.start(i),a.stop(i+.2);break;default:console.warn(`AudioManager: Tipo de sonido desconocido: '${e}'`);return}}catch(a){console.error(`AudioManager: Error al reproducir sonido '${e}':`,a)}}}setVolume(e){if(!this.isInitialized||!this.audioCtx||!this.masterGainNode)return;const a=Math.max(0,Math.min(1,e));this.masterGainNode.gain.setValueAtTime(a,this.audioCtx.currentTime)}getVolume(){return!this.isInitialized||!this.masterGainNode?0:this.masterGainNode.gain.value}isReady(){return this.isInitialized&&this.audioCtx!==null&&this.audioCtx.state==="running"}}class Ca{constructor(e){this.type="PhysicsComponent",this.body=null,this.body=e??null}}class Sa{constructor(e){this.type="RenderComponent",this.element=null,this.isVisible=!0,this.element=e??null}}class wa{constructor(e=0,a=0,s=0,i=0){this.type="ValueComponent",this.rarity=0,this.scoreValue=0,this.currentSize=0,this.growthLevel=0,this.rarity=e,this.scoreValue=a,this.currentSize=s,this.growthLevel=i}}class hi{constructor(e,a,s,i){this.id=e,this.physics=a,this.render=s,this.value=i}getComponent(e){if(e===this.physics.type&&this.physics instanceof Ca)return this.physics;if(e===this.render.type&&this.render instanceof Sa)return this.render;if(e===this.value.type&&this.value instanceof wa)return this.value}}var ui=Object.defineProperty,pi=Object.getOwnPropertyDescriptor,je=(f,e,a,s)=>{for(var i=s>1?void 0:s?pi(e,a):e,t=f.length-1,n;t>=0;t--)(n=f[t])&&(i=(s?n(e,a,i):n(i))||i);return s&&i&&ui(e,a,i),i};let Me=class extends R{constructor(){super(...arguments),this.size=50,this.imageUrl="",this.backgroundColorFallback="var(--gq-cat-fallback-bg, #ccc)",this.glowClass=""}updated(f){if(super.updated(f),f.has("glowClass")){const e=f.get("glowClass");e&&e!==this.glowClass&&this.classList.remove(e),this.glowClass&&this.classList.add(this.glowClass)}}render(){return this.style.width=`${this.size}px`,this.style.height=`${this.size}px`,this.style.backgroundImage=this.imageUrl?`url('${this.imageUrl}')`:"none",this.style.backgroundColor=this.imageUrl?"transparent":this.backgroundColorFallback,B``}};Me.styles=V`
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
  `;je([$({type:Number})],Me.prototype,"size",2);je([$({type:String,attribute:"image-url"})],Me.prototype,"imageUrl",2);je([$({type:String,attribute:"background-color-fallback"})],Me.prototype,"backgroundColorFallback",2);je([$({type:String,attribute:"glow-class"})],Me.prototype,"glowClass",2);Me=je([G("cat-entity-display")],Me);const gi=1,na=2,fi=4,mi=8,vi=1.15,oa=300,yi=1.02,sa={0:null,1:"glow-gray",2:"glow-green",3:"glow-blue",4:"glow-violet",5:"glow-orange"},bi=10;class xi{constructor(e,a){this.cats=new Map,this.bodyIdToEntityIdMap=new Map,this.nextCatIdCounter=0,this.templates=new Map,this.audioManager=e,this.gameManager=a,console.log("CatManager Creado (esperando CatDisplayArea y PhysicsManager).")}setPhysicsManager(e){this.physicsManager=e,console.log("CatManager: PhysicsManager seteado.")}setCatDisplayArea(e){e instanceof R&&typeof e.clearAllEntityElements=="function"?(this.catDisplayArea=e,console.log("CatManager: CatDisplayArea seteado correctamente y es una instancia válida de CatDisplayArea (LitElement con clearAllEntityElements).",this.catDisplayArea)):(console.error("CatManager CRITICAL: Se intentó setear un CatDisplayArea inválido o nulo.",e),!this.catDisplayArea&&e===null||(e?console.error("CatManager: displayArea NO es una instancia válida de CatDisplayArea o no tiene clearAllEntityElements. Tipo recibido:",typeof e,"Tiene clearAllEntityElements:",typeof e.clearAllEntityElements):console.error("CatManager: displayArea es null/undefined.")))}loadTemplates(e){if(this.templates.clear(),!Array.isArray(e)){console.error("CatManager: Formato inválido de plantillas.");return}e.forEach(a=>{a!=null&&a.id?((typeof a.spawnWeight!="number"||a.spawnWeight<=0)&&(a.spawnWeight=1),this.templates.set(a.id,a)):console.warn("CatManager: Plantilla inválida o sin ID.",a)}),console.log(`CatManager: ${this.templates.size} plantillas cargadas.`)}getSpawnableTemplatesWeighted(){const e=[];return this.templates.forEach(a=>{const s=a.spawnWeight&&a.spawnWeight>0?a.spawnWeight:1;e.push({id:a.id,weight:s})}),e}addCat(e,a){if(!this.gameManager)return console.error("CatManager: GameManager no disponible."),null;if(!this.catDisplayArea)return console.error("CatManager: CatDisplayArea no está seteado o es inválido. No se puede añadir gato."),null;if(typeof this.catDisplayArea.addEntityElement!="function")return console.error("CatManager: this.catDisplayArea no tiene el método addEntityElement. Tipo actual:",typeof this.catDisplayArea,this.catDisplayArea),null;const s=this.cats.size,i=this.gameManager.getPlayerData().getMaxCatsAllowed();if(s>=i)return null;if(!this.physicsManager)return console.error("CatManager: PhysicsManager no está seteado."),null;const t=this.templates.get(e);if(!t)return console.error(`CatManager: Plantilla '${e}' no encontrada.`),null;const n=`cat_entity_${this.nextCatIdCounter++}`,l=t.initialSize,r=t.rarity,g=t.scoreValue??0,c=l/2+5,p=(a==null?void 0:a.x)??Math.random()*(window.innerWidth-l-c*2)+c,u=(a==null?void 0:a.y)??Math.max(c,Math.min(window.innerHeight-c,bi+l/2)),d={...{restitution:.6,friction:.1,frictionAir:.01,density:.005,slop:.01},...t.physicsOptions??{},label:"cat",collisionFilter:{category:na,mask:gi|na|fi|mi},plugin:{entityId:n,rarity:r,currentSize:l}},h=L.Bodies.circle(p,u,l/2,d);L.Body.setAngularVelocity(h,(Math.random()-.5)*.2);const m=new Ca(h);this.bodyIdToEntityIdMap.set(h.id,n);const y=document.createElement("cat-entity-display");y.id=n,y.size=l,y.classList.add("appearing");const w=t.renderOptions??{},M=w.backgroundColor??"var(--gq-cat-fallback-bg, #ccc)";let q=w.imageUrl;if(!q){const E=Number.isFinite(l)&&l>0?Math.round(l):50;q=`https://cataas.com/cat/says/Miaw!_${n.slice(-2)}?${Date.now()}&width=${E}&height=${E}&type=square`}y.imageUrl=q,y.backgroundColorFallback=M,y.glowClass=w.glowClass??sa[r]??"";const v=new Image;v.onload=()=>{},v.onerror=()=>{console.warn(`CatManager: Falló la carga de la imagen del gato: ${q}. Usando color de fallback.`),y&&(y.imageUrl="")},q&&(v.src=q);try{this.catDisplayArea.addEntityElement(y),y.offsetWidth,requestAnimationFrame(()=>{y.classList.remove("appearing"),y.classList.add("spawned")})}catch(E){return console.error("CatManager: Error añadiendo catDisplayElement a catDisplayArea:",E),this.bodyIdToEntityIdMap.delete(h.id),null}const x=new Sa(y),C=new wa(r,g,l,0),b=new hi(n,m,x,C);try{if(!this.physicsManager.getWorld())throw new Error("PhysicsManager world no disponible al añadir gato.");L.World.add(this.physicsManager.getWorld(),h)}catch(E){return console.error(`CatManager: Error añadiendo cuerpo físico ${n} al mundo:`,E),this.catDisplayArea&&typeof this.catDisplayArea.removeEntityElement=="function"&&this.catDisplayArea.removeEntityElement(y),this.bodyIdToEntityIdMap.delete(h.id),null}return this.cats.set(n,b),b}removeCat(e){var i;const a=String(e),s=this.cats.get(a);if(s){const t=s.physics.body;if(t){this.bodyIdToEntityIdMap.delete(t.id);try{(i=this.physicsManager)!=null&&i.getWorld&&L.Composite.get(this.physicsManager.getWorld(),t.id,"body")&&L.World.remove(this.physicsManager.getWorld(),t)}catch(n){console.warn(`Error eliminando cuerpo físico gato ${a}:`,n)}}s.render.element&&(this.catDisplayArea&&typeof this.catDisplayArea.removeEntityElement=="function"?this.catDisplayArea.removeEntityElement(s.render.element):(console.warn("CatManager: catDisplayArea no disponible o sin removeEntityElement al intentar remover gato del DOM."),s.render.element.parentNode&&s.render.element.parentNode.removeChild(s.render.element))),this.cats.delete(a)}}processPlayerInitiatedCollision(e,a,s){const i=this.bodyIdToEntityIdMap.get(e),t=this.bodyIdToEntityIdMap.get(a);if(i&&t){const n=this.cats.get(i),l=this.cats.get(t);if(n&&l){const r=e===s?n:l,g=e===s?l:n;r&&g?this.handleCatVsCatCollision(r,g):console.error("Error: No se pudo determinar dragger/target cat en colisión.")}}}handleCatVsCatCollision(e,a){if(!e.physics.body||!e.value||!a.physics.body||!a.value||!this.gameManager){console.warn("handleCatVsCatCollision: Faltan componentes necesarios en dragger o target.");return}if(e.id===a.id)return;const s=e.value.currentSize,i=e.value.rarity,t=a.value.currentSize,n=a.value.rarity,l=this.gameManager.getPlayerData().getCurrentMaxSizeLimit(),r=s>=l;let g=!1,c=!1,p=!1;s>t*yi&&(r?i<n&&(g=!0,p=!1,c=!0):(g=!0,p=!0,c=i<n)),g&&this.performEat(e,a,c,p)}performEat(e,a,s,i){if(!e.physics.body||!e.value||!(e.render.element instanceof R)||!a.value||!this.gameManager){console.warn("performEat: Faltan componentes o el elemento de render no es CatEntityDisplay.");return}const t=e.render.element,n=a.id,l=a.value.rarity;if(this.removeCat(n),i){const r=e.value.currentSize,g=this.gameManager.getPlayerData().getCurrentMaxSizeLimit();let c=Math.min(g,oa,r*vi);const p=c/r;if(p>1.001){e.value.currentSize=c;try{if(this.physicsManager.getWorld&&L.Composite.get(this.physicsManager.getWorld(),e.physics.body.id,"body"))L.Body.scale(e.physics.body,p,p),e.physics.body.plugin&&(e.physics.body.plugin.currentSize=c);else throw new Error("Body not found in world during scaling")}catch(u){console.error(`Error scaling body ${e.id}:`,u),e.value.currentSize=r,e.physics.body.plugin&&(e.physics.body.plugin.currentSize=r)}t.size=c}}s&&l>e.value.rarity&&(e.value.rarity=l,e.physics.body.plugin&&(e.physics.body.plugin.rarity=l),t.glowClass=sa[l]??"");try{this.audioManager.playSound("eat")}catch(r){console.error("Error playing 'eat' sound:",r)}}updateCats(e){this.cats.forEach(a=>{const s=a.physics.body,i=a.render.element,t=a.value;if(!s||!i||!(i instanceof R)||!t)return;const n=i,l=t.currentSize;if(a.render.isVisible){n.style.display==="none"&&(n.style.display="");const r=l/2;n.style.transform=`translate(${s.position.x-r}px, ${s.position.y-r}px) rotate(${s.angle}rad)`,n.size!==l&&(n.size=l)}else n.style.display!=="none"&&(n.style.display="none")})}getCat(e){return this.cats.get(e)}getAllCats(){return Array.from(this.cats.values())}removeAllCats(){var a;console.log(`CatManager: Intentando remover todos los ${this.cats.size} gatos...`),this.catDisplayArea&&typeof this.catDisplayArea.clearAllEntityElements=="function"?this.catDisplayArea.clearAllEntityElements():console.error("CatManager: catDisplayArea no está disponible o no es una instancia válida de CatDisplayArea con clearAllEntityElements al intentar removeAllCats. Tipo actual:",typeof this.catDisplayArea,this.catDisplayArea);const e=(a=this.physicsManager)==null?void 0:a.getWorld();if(e){const s=Array.from(this.cats.values()).map(i=>i.physics.body).filter(i=>i&&L.Composite.get(e,i.id,"body"));if(s.length>0)try{L.World.remove(e,s)}catch(i){console.warn("CatManager: Error removiendo algunos cuerpos de gatos del mundo físico:",i)}}else console.warn("CatManager: PhysicsManager world no disponible durante removeAllCats.");this.cats.clear(),this.bodyIdToEntityIdMap.clear(),this.nextCatIdCounter=0,console.log("CatManager: Lógica interna de gatos y mapeos limpiados.")}growExistingCats(e,a){let s=0;this.cats.forEach(i=>{if(!i.value||!i.physics.body||!(i.render.element instanceof R)||!this.physicsManager||!this.gameManager||i.value.rarity!==0)return;const t=i.render.element;if(i.value.growthLevel<a){const n=i.value.currentSize,l=this.gameManager.getPlayerData().getCurrentMaxSizeLimit();let r=Math.min(l,oa,n+e);const g=r/n;if(g>1.0001){i.value.growthLevel++,i.value.currentSize=r;try{const c=i.physics.body;if(this.physicsManager.getWorld&&L.Composite.get(this.physicsManager.getWorld(),c.id,"body"))L.Body.scale(c,g,g),c.plugin&&(c.plugin.currentSize=r),s++;else throw new Error("Body not found in world for growth scaling")}catch(c){console.error(` -> Error escalando gato común ${i.id} (crecimiento por acierto):`,c),i.value.growthLevel--,i.value.currentSize=n,i.physics.body.plugin&&(i.physics.body.plugin.currentSize=n)}t.size=r}}})}}var Ci=Object.defineProperty,Si=Object.getOwnPropertyDescriptor,ke=(f,e,a,s)=>{for(var i=s>1?void 0:s?Si(e,a):e,t=f.length-1,n;t>=0;t--)(n=f[t])&&(i=(s?n(e,a,i):n(i))||i);return s&&i&&Ci(e,a,i),i};let pe=class extends R{constructor(){super(),this.itemId="",this.icon="❓",this.isDisabled=!1,this.isPurchased=!1,this.isMaxLevel=!1,this.isSelected=!1,this.addEventListener("click",this._handleClick),this.addEventListener("touchstart",this._handleClick,{passive:!1})}render(){return B`
      <span class="shop-item-icon" part="icon">${this.icon}</span>
    `}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("click",this._handleClick),this.removeEventListener("touchstart",this._handleClick)}_handleClick(f){f.stopPropagation(),f.type==="touchstart"&&f.preventDefault(),this.isDisabled||this.isPurchased||this.isMaxLevel||this.dispatchEvent(new CustomEvent("item-selected",{detail:{itemId:this.itemId},bubbles:!0,composed:!0}))}};pe.styles=V`
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
  `;ke([$({type:String})],pe.prototype,"itemId",2);ke([$({type:String})],pe.prototype,"icon",2);ke([$({type:Boolean,reflect:!0})],pe.prototype,"isDisabled",2);ke([$({type:Boolean,reflect:!0})],pe.prototype,"isPurchased",2);ke([$({type:Boolean,reflect:!0})],pe.prototype,"isMaxLevel",2);ke([$({type:Boolean,reflect:!0})],pe.prototype,"isSelected",2);pe=ke([G("shop-item-card")],pe);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const wi={ATTRIBUTE:1},Ei=f=>(...e)=>({_$litDirective$:f,values:e});class Mi{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,a,s){this._$Ct=e,this._$AM=a,this._$Ci=s}_$AS(e,a){return this.update(e,a)}update(e,a){return this.render(...a)}}/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Pt=Ei(class extends Mi{constructor(f){var e;if(super(f),f.type!==wi.ATTRIBUTE||f.name!=="class"||((e=f.strings)==null?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(f){return" "+Object.keys(f).filter(e=>f[e]).join(" ")+" "}update(f,[e]){var s,i;if(this.st===void 0){this.st=new Set,f.strings!==void 0&&(this.nt=new Set(f.strings.join(" ").split(/\s/).filter(t=>t!=="")));for(const t in e)e[t]&&!((s=this.nt)!=null&&s.has(t))&&this.st.add(t);return this.render(e)}const a=f.element.classList;for(const t of this.st)t in e||(a.remove(t),this.st.delete(t));for(const t in e){const n=!!e[t];n===this.st.has(t)||(i=this.nt)!=null&&i.has(t)||(n?(a.add(t),this.st.add(t)):(a.remove(t),this.st.delete(t)))}return Ee}});var Ii=Object.defineProperty,Ai=Object.getOwnPropertyDescriptor,ie=(f,e,a,s)=>{for(var i=s>1?void 0:s?Ai(e,a):e,t=f.length-1,n;t>=0;t--)(n=f[t])&&(i=(s?n(e,a,i):n(i))||i);return s&&i&&Ii(e,a,i),i};const ra="Selecciona un ítem para ver sus detalles.";let Z=class extends R{constructor(){super(...arguments),this.itemData=null,this.playerDataSnapshot=null,this._itemName="...",this._itemLevelText="",this._itemEffectText=ra,this._itemCostText="",this._itemStatusText="",this._isBuyButtonDisabled=!0,this._buyButtonIcon="💰",this._isEmpty=!0,this._buyButtonState="empty"}connectedCallback(){super.connectedCallback(),this._updateInternalState(),this.toggleAttribute("empty",this._isEmpty)}updated(f){var a;super.updated(f);let e=!1;if(console.log("%c[ShopTooltip DEBUG] updated()","color: orange; font-weight: bold;","Cambios:",Array.from(f.keys())),f.has("playerDataSnapshot")){const s=f.get("playerDataSnapshot"),i=this.playerDataSnapshot,t=(s==null?void 0:s.comboMultiplierLevel)??"N/A",n=(i==null?void 0:i.comboMultiplierLevel)??"N/A";console.log(`%c[ShopTooltip DEBUG]   > playerDataSnapshot cambió. Nivel Combo Anterior: ${t}, Nuevo: ${n}. Llamando a _updateInternalState...`,"color: orange;"),e=!0}f.has("itemData")&&(console.log(`%c[ShopTooltip DEBUG]   > itemData cambió a ID: ${((a=this.itemData)==null?void 0:a.id)??"null"}. Llamando a _updateInternalState...`,"color: orange;"),e=!0),e&&(this._updateInternalState(),this.toggleAttribute("empty",this._isEmpty))}forceRefresh(){console.log("%c[ShopTooltip DEBUG] forceRefresh() llamado.","color: orange; font-weight: bold;"),this._updateInternalState(),this.toggleAttribute("empty",this._isEmpty),this.requestUpdate()}_updateInternalState(){var e,a,s;const f=(e=this.itemData)!=null&&e.levelRef&&this.playerDataSnapshot?this.playerDataSnapshot[this.itemData.levelRef]:"N/A";if(console.log(`%c[ShopTooltip DEBUG internalState] INICIO _updateInternalState. Item ID: ${((a=this.itemData)==null?void 0:a.id)??"null"}, Snapshot Nivel (${((s=this.itemData)==null?void 0:s.levelRef)??"?"}): ${f}`,"color: purple;"),this._isEmpty=!this.itemData,this._isEmpty||!this.playerDataSnapshot)this._itemName="Tienda",this._itemLevelText="",this._itemEffectText=ra,this._itemCostText="",this._itemStatusText="",this._isBuyButtonDisabled=!0,this._buyButtonState="empty",this._buyButtonIcon="🐈",console.log("%c[ShopTooltip DEBUG internalState] FIN Estado Vacío aplicado.","color: purple;");else{const i=this.itemData,t=this.playerDataSnapshot,n=this._calculateItemCost(i,t),l=t.score>=n,r=this._checkItemIsPurchased(i,t),g=this._checkItemCanPurchase(i,t),c=this._getItemLevel(i,t),p=i.isLeveled&&typeof i.maxLevel=="number"&&c>=i.maxLevel,u=!p&&!(r&&!i.isLeveled)&&g&&l;this._isBuyButtonDisabled=!u,p||r&&!i.isLeveled||!g?this._buyButtonState="disabled":l?this._buyButtonState="affordable":this._buyButtonState="unaffordable",this._itemName=i.name,this._itemEffectText=this._formatEffectText(i,t),this._itemLevelText=i.isLeveled&&c>=0?`Nivel: ${c}`:"",this._itemCostText=p?"Nivel Máximo":`Costo: ${n}`;let o="";p?o="Nivel Máximo Alcanzado":r&&!i.isLeveled?o="Ya comprado / Activo":!g&&!p&&(o="No disponible"),this._itemStatusText=o,this._buyButtonIcon=p||r&&!i.isLeveled?"✔️":"💰",console.log(`%c[ShopTooltip DEBUG internalState] FIN Calculado: Nivel Txt='${this._itemLevelText}', Costo Txt='${this._itemCostText}', Btn Func Disabled=${this._isBuyButtonDisabled}, Btn Visual State='${this._buyButtonState}'`,"color: purple;")}}_calculateItemCost(f,e){const a=f.cost;let s=a.base;if(f.isLeveled){const i=f.levelRef,t=i?e[i]??0:0;a.type==="exponential"&&typeof a.multiplier=="number"?s=a.base*Math.pow(a.multiplier,t):s=a.base+(a.perLevel??0)*t}else if(a.levelRef&&typeof a.perLevel=="number"){const i=e[a.levelRef]??0;s=a.base+a.perLevel*i}return Math.round(s)}_formatEffectText(f,e){var s,i,t;let a=f.effectTemplate;if(a=a.replace("{lives}",e.lives.toString()),a.includes("{isActive}")){const n=(s=f.isPurchasedCheck)==null?void 0:s.valueRef,l=n?!!e[n]:!1;a=a.replace("{isActive}",l?"(Activo)":"")}if(a.includes("{isUnlocked}")){const n=(i=f.isPurchasedCheck)==null?void 0:i.valueRef,l=n?!!e[n]:!1;a=a.replace("{isUnlocked}",l?"(Desbloqueado)":"")}if(a.includes("{charges}")){const n=(t=f.isPurchasedCheck)==null?void 0:t.valueRef,l=n?e[n]??0:0;a=a.replace("{charges}",l>0?`(Cargas: ${l})`:"")}if(a.includes("{currentValue}")){let n="?";f.id==="comboMultiplier"?n=e.getCurrentComboMultiplier().toFixed(1):f.id==="inkCostReduction"?n=e.getCurrentInkCostPerPixel().toFixed(2):f.id==="extraCat"?n=e.getCatsPerCorrectAnswer():f.id==="maxCats"?n=e.getMaxCatsAllowed():f.id==="maxCatSize"?n=e.getCurrentMaxSizeLimit():f.id==="refillCatFood"&&(n=e.currentCatFood),a=a.replace("{currentValue}",n.toString())}return a}_checkItemIsPurchased(f,e){if(!f.isPurchasedCheck)return!1;const a=f.isPurchasedCheck,s=a.valueRef,i=e[s];if(typeof i>"u")return!1;switch(a.condition){case"isTrue":return i===!0;case"isFalse":return i===!1;case"greaterThan":return typeof i=="number"&&typeof a.limit=="number"&&i>a.limit;default:return!1}}_checkItemCanPurchase(f,e){if(!f.purchaseCheck)return!0;const a=f.purchaseCheck,s=a.valueRef,i=e[s];if(typeof i>"u")return!1;switch(a.condition){case"lessThan":return typeof i=="number"&&typeof a.limit=="number"&&i<a.limit;case"lessThanOrEqual":return typeof i=="number"&&typeof a.limit=="number"&&i<=a.limit;case"isFalse":return i===!1;case"isTrue":return i===!0;case"greaterThan":return typeof i=="number"&&typeof a.limit=="number"&&i>a.limit;case"greaterThanOrEqual":return typeof i=="number"&&typeof a.limit=="number"&&i>=a.limit;default:return!1}}_getItemLevel(f,e){return!f.isLeveled||!f.levelRef?-1:e[f.levelRef]??0}_handleBuyClick(f){f.stopPropagation(),f.type==="touchstart"&&f.preventDefault(),!(this._isBuyButtonDisabled||this._isEmpty||!this.itemData)&&this.dispatchEvent(new CustomEvent("buy-item-requested",{detail:{itemId:this.itemData.id},bubbles:!0,composed:!0}))}render(){const f=B`<span class="tooltip-item-level" part="level">${this._itemLevelText}</span>`,e=B`<span class="tooltip-item-cost" part="cost">${this._itemCostText}</span>`,a=B`<span class="tooltip-item-status" part="status">${this._itemStatusText}</span>`,s={"tooltip-buy-btn":!0,affordable:this._buyButtonState==="affordable",unaffordable:this._buyButtonState==="unaffordable","disabled-state":this._buyButtonState==="disabled","empty-state":this._buyButtonState==="empty"};return B`
      <div part="content-area">
        <span class="tooltip-item-name" part="name">${this._itemName}</span>
        ${this._itemLevelText?f:N}
        <span class="tooltip-item-effect" part="effect">${this._itemEffectText}</span>
        ${this._itemCostText?e:N}
        ${this._itemStatusText?a:N}
      </div>
      <button
        class=${Pt(s)} /* Aplicar clases dinámicas */
        part="buy-button"
        ?disabled=${this._isBuyButtonDisabled||this._isEmpty} /* Controla si se puede hacer clic */
        @click=${this._handleBuyClick}
        @touchstart=${this._handleBuyClick}
        aria-label="Comprar ${this._itemName||"ítem"}"
      >
        ${this._buyButtonIcon}
      </button>
    `}};Z.styles=V`
    :host {
      /* ... (Estilos :host y estado [empty] sin cambios) ... */
      display: block; position: relative;
      background-color: var(--gq-shop-tooltip-bg, rgba(31, 41, 55, 0.98));
      border: var(--gq-shop-tooltip-border, 1px solid #6b7280);
      border-radius: var(--gq-shop-tooltip-border-radius, 0.85rem);
      color: var(--gq-shop-tooltip-text-color, #d1d5db);
      font-family: var(--gq-shop-tooltip-font-family, var(--gq-font-primary, 'Poppins', sans-serif));
      font-size: var(--gq-shop-tooltip-font-size, 0.60rem);
      text-align: left;
      box-shadow: var(--gq-shop-tooltip-box-shadow, 0 -0.3125rem 0.625rem rgba(0,0,0,0.2));
      box-sizing: border-box;
      padding: var(--gq-shop-tooltip-padding-y, 0.6rem) var(--gq-shop-tooltip-padding-x, 0.8rem);
      padding-right: calc(var(--gq-shop-tooltip-buy-btn-min-width, 5.5rem) + var(--gq-shop-tooltip-padding-x, 1rem));
      pointer-events: auto;
      min-height: 8rem;

    }
    :host([empty]) .tooltip-item-name { /* ... */ color: var(--gq-shop-tooltip-empty-name-color, var(--gq-shop-tooltip-name-text-color, #ababab)); font-style: italic; }
    :host([empty]) .tooltip-item-effect { /* ... */ color: var(--gq-shop-tooltip-empty-effect-color, var(--gq-shop-tooltip-text-color, #9ca3af)); font-style: italic; text-align: center; margin-top: 0.5rem; }
    :host([empty]) .tooltip-item-level, :host([empty]) .tooltip-item-cost, :host([empty]) .tooltip-item-status { display: none; }
    :host([empty]) .tooltip-buy-btn { opacity: 0.3; cursor: default; pointer-events: none; }

    /* Estilos internos (name, level, effect, cost, status - sin cambios) */
    .tooltip-item-name { /* ... */ font-size: var(--gq-shop-tooltip-name-font-size, 0.9rem); font-weight: var(--gq-shop-tooltip-name-font-weight, 600); color: var(--gq-shop-tooltip-name-text-color, #f9fafb); margin-bottom: 0.15rem; display: block; }
    .tooltip-item-level { /* ... */ font-size: var(--gq-shop-tooltip-level-font-size, 0.7rem); font-weight: var(--gq-shop-tooltip-level-font-weight, 700); color: var(--gq-shop-tooltip-level-text-color, #6ee7b7); margin-bottom: 0.15rem; display: block; }
    .tooltip-item-level[hidden] { display: none; }
    .tooltip-item-effect { /* ... */ font-size: var(--gq-shop-tooltip-effect-font-size, 0.7rem); margin-bottom: 0.3rem; display: block; line-height: 1.3; }
    .tooltip-item-cost { /* ... */ font-size: var(--gq-shop-tooltip-cost-font-size, 0.8rem); font-weight: var(--gq-shop-tooltip-cost-font-weight, 600); color: var(--gq-shop-tooltip-cost-text-color, #facc15); display: block; }
    .tooltip-item-status { /* ... */ font-size: var(--gq-shop-tooltip-status-font-size, 0.75rem); font-style: italic; color: var(--gq-shop-tooltip-status-text-color, #fca5a5); margin-top: 0.3rem; display: block; }
    .tooltip-item-status[hidden] { display: none; }

    /* --- Estilos Botón de Compra MODIFICADOS --- */
    .tooltip-buy-btn {
      /* Estilos base (posición, tamaño, fuente, etc. - sin cambios) */
      position: absolute; top: 0; right: 0; bottom: 0;
      min-width: var(--gq-shop-tooltip-buy-btn-min-width, 5.5rem);
      width: auto; height: 100%;
      margin: 0; transform: none; display: flex;
      justify-content: center; align-items: center;
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

      /* Color de fondo y de icono por defecto (cuando no aplica ninguno de los estados) */
      background-color: var(--gq-shop-tooltip-buy-btn-bg, #4b5563);
      color: var(--gq-shop-tooltip-buy-btn-icon-color, #facc15);
    }

    /* Estado: Comprable (Affordable) */
    .tooltip-buy-btn.affordable {
      background-color: var(--gq-shop-tooltip-buy-btn-bg-affordable, #10B981);
      color: var(--gq-shop-tooltip-buy-btn-icon-color-affordable, #FFFFFF);
      cursor: pointer; /* Asegurar cursor pointer */
    }
    .tooltip-buy-btn.affordable:hover {
      background-color: var(--gq-shop-tooltip-buy-btn-hover-bg-affordable, #059669);
      /* color: var(--gq-shop-tooltip-buy-btn-hover-icon-color-affordable, var(--gq-shop-tooltip-buy-btn-icon-color-affordable, #FFFFFF)); */
      box-shadow: var(--gq-shop-tooltip-buy-btn-hover-box-shadow, inset 1px 0 3px rgba(0,0,0,0.3));
    }
    .tooltip-buy-btn.affordable:active {
      background-color: var(--gq-shop-tooltip-buy-btn-active-bg, var(--gq-shop-tooltip-buy-btn-hover-bg-affordable, #059669)); /* Reutilizar hover o definir active específico */
      box-shadow: var(--gq-shop-tooltip-buy-btn-active-box-shadow, inset 1px 0 2px rgba(0,0,0,0.3));
    }

    /* Estado: No Comprable por Puntos (Unaffordable) */
    .tooltip-buy-btn.unaffordable {
      background-color: var(--gq-shop-tooltip-buy-btn-bg-unaffordable, #EF4444);
      color: var(--gq-shop-tooltip-buy-btn-icon-color-unaffordable, #FFFFFF);
      cursor: not-allowed; /* Cursor indica no comprable */
      opacity: 0.8; /* Ligeramente más tenue que affordable */
    }
    /* Evitar cambios de hover/active si no es comprable */
    .tooltip-buy-btn.unaffordable:hover,
    .tooltip-buy-btn.unaffordable:active {
        background-color: var(--gq-shop-tooltip-buy-btn-bg-unaffordable, #EF4444); /* Mantiene color rojo */
        color: var(--gq-shop-tooltip-buy-btn-icon-color-unaffordable, #FFFFFF);
        box-shadow: var(--gq-shop-tooltip-buy-btn-box-shadow, inset 1px 0 2px rgba(0,0,0,0.2)); /* Sombra base */
        transform: none; /* Sin efecto de escala/movimiento */
    }


    /* Estado: Deshabilitado por otras razones (MaxLevel, Purchased, ReqNotMet) */
    /* Usamos la clase 'disabled-state' para el estilo visual, */
    /* mientras que el atributo 'disabled' maneja la funcionalidad */
    .tooltip-buy-btn.disabled-state {
      background-color: var(--gq-shop-tooltip-buy-btn-bg-disabled, rgba(55, 65, 81, 0.6));
      color: var(--gq-shop-tooltip-buy-btn-disabled-icon-color, #6b7280);
      cursor: not-allowed;
      opacity: 0.6; /* Opacidad de deshabilitado */
      box-shadow: none;
      border-left-color: var(--gq-shop-tooltip-buy-btn-disabled-border-left, rgba(75, 85, 99, 0.5));
    }
    .tooltip-buy-btn.disabled-state:hover,
    .tooltip-buy-btn.disabled-state:active {
      background-color: var(--gq-shop-tooltip-buy-btn-bg-disabled, rgba(55, 65, 81, 0.6));
      color: var(--gq-shop-tooltip-buy-btn-disabled-icon-color, #6b7280);
      transform: none;
      box-shadow: none;
    }
    /* --- FIN Estilos Botón de Compra MODIFICADOS --- */
  `;ie([$({type:Object})],Z.prototype,"itemData",2);ie([$({type:Object})],Z.prototype,"playerDataSnapshot",2);ie([U()],Z.prototype,"_itemName",2);ie([U()],Z.prototype,"_itemLevelText",2);ie([U()],Z.prototype,"_itemEffectText",2);ie([U()],Z.prototype,"_itemCostText",2);ie([U()],Z.prototype,"_itemStatusText",2);ie([U()],Z.prototype,"_isBuyButtonDisabled",2);ie([U()],Z.prototype,"_buyButtonIcon",2);ie([U()],Z.prototype,"_isEmpty",2);ie([U()],Z.prototype,"_buyButtonState",2);Z=ie([G("shop-tooltip")],Z);var qi=Object.defineProperty,Ti=Object.getOwnPropertyDescriptor,he=(f,e,a,s)=>{for(var i=s>1?void 0:s?Ti(e,a):e,t=f.length-1,n;t>=0;t--)(n=f[t])&&(i=(s?n(e,a,i):n(i))||i);return s&&i&&qi(e,a,i),i};const ki=["consumable","unlockable","upgradeable","general"],Pi={consumable:"Consumibles",unlockable:"Desbloqueables",upgradeable:"Mejorables",general:"General"};let te=class extends R{constructor(){super(...arguments),this.items=[],this.playerDataSnapshot=null,this.isVisible=!1,this.updateTrigger=0,this._selectedItemId=null,this._itemsByCategory={},this._selectedItemData=null}connectedCallback(){super.connectedCallback(),this.addEventListener("click",this._handleHostClick)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("click",this._handleHostClick)}updated(f){super.updated(f);let e=!1;if(console.log("%c[ShopPopup DEBUG] updated()","color: blue; font-weight: bold;","Cambios:",Array.from(f.keys())),f.has("playerDataSnapshot")){const a=f.get("playerDataSnapshot"),s=this.playerDataSnapshot,i=(a==null?void 0:a.comboMultiplierLevel)??"N/A",t=(s==null?void 0:s.comboMultiplierLevel)??"N/A";console.log(`%c[ShopPopup DEBUG]   > playerDataSnapshot cambió. Nivel Combo Anterior: ${i}, Nuevo: ${t}`,"color: blue;"),e=!0}f.has("updateTrigger")&&(console.log(`%c[ShopPopup DEBUG]   > updateTrigger cambió a: ${this.updateTrigger}`,"color: blue;"),e=!0),f.has("isVisible")&&console.log(`%c[ShopPopup DEBUG]   > isVisible cambió a: ${this.isVisible}`,"color: blue;"),f.has("items")&&(console.log("%c[ShopPopup DEBUG]   > items cambió.","color: blue;"),this._groupItemsByCategory(),e=!0),f.has("_selectedItemId")&&(console.log(`%c[ShopPopup DEBUG]   > _selectedItemId cambió a: ${this._selectedItemId}`,"color: blue;"),this._updateTooltipData(),e=!0),e&&this._tooltipElement&&typeof this._tooltipElement.forceRefresh=="function"&&(console.log("%c[ShopPopup DEBUG]   Forzando refresh del tooltip...","color: blue;"),this._tooltipElement.forceRefresh())}_groupItemsByCategory(){const f={};this.items.forEach(e=>{const a=e.category||"general";f[a]||(f[a]=[]),f[a].push(e)});for(const e in f)f[e].sort((a,s)=>a.name.localeCompare(s.name));this._itemsByCategory=f}_updateTooltipData(){this._selectedItemData=this._selectedItemId?this.items.find(f=>f.id===this._selectedItemId)??null:null}_handleItemSelection(f){var a;const e=(a=f.detail)==null?void 0:a.itemId;console.log(`[ShopPopup DEBUG] _handleItemSelection: Ítem seleccionado/deseleccionado: ${e}`),this._selectedItemId===e?this._selectedItemId=null:this._selectedItemId=e}_handleBuyRequest(f){var a;const e=(a=f.detail)==null?void 0:a.itemId;console.log(`[ShopPopup DEBUG] _handleBuyRequest: Recibido buy request para: ${e}`),e&&this.dispatchEvent(new CustomEvent("buy-item-requested",{detail:{itemId:e},bubbles:!0,composed:!0}))}_handleCloseClick(){console.log("[ShopPopup DEBUG] Botón X clickeado, emitiendo close-requested."),this.dispatchEvent(new CustomEvent("close-requested",{bubbles:!0,composed:!0}))}_handleHostClick(f){f.target===this&&(console.log("[ShopPopup DEBUG] Clic en host (fondo), emitiendo close-requested."),this.dispatchEvent(new CustomEvent("close-requested",{bubbles:!0,composed:!0})))}render(){var f;return console.log(`%c[ShopPopup DEBUG] render() ejecutado. Item seleccionado: ${this._selectedItemId}`,"color: green;"),B`
      <div class="shop-content-box">
        <button class="shop-close-btn" @click=${this._handleCloseClick} title="Cerrar Tienda (Esc)">&times;</button>
        <h2 class="shop-title-text">Tienda de Mejoras</h2>
        <p class="shop-score-text">Puntos: ${((f=this.playerDataSnapshot)==null?void 0:f.score)??0}</p>

        <div class="shop-items-container">
          ${ki.map(e=>this._itemsByCategory[e]?B`
            <h3 class="shop-section-title">${Pi[e]||e}</h3>
            <div class="shop-section-items">
              ${this._itemsByCategory[e].map(a=>{const s=this.playerDataSnapshot?this._checkItemIsPurchased(a,this.playerDataSnapshot):!1,i=this.playerDataSnapshot?this._checkItemCanPurchase(a,this.playerDataSnapshot):!0,t=this.playerDataSnapshot?this._getItemLevel(a,this.playerDataSnapshot):-1,n=a.isLeveled&&typeof a.maxLevel=="number"&&t>=a.maxLevel,l=n||s&&!a.isLeveled||!i;return B`
                  <shop-item-card
                    .itemId=${a.id}
                    .icon=${a.icon||"❓"}
                    ?isDisabled=${l} /* Usar la nueva variable */
                    ?isPurchased=${s&&!a.isLeveled} /* Solo para estilo visual */
                    ?isMaxLevel=${n} /* Solo para estilo visual */
                    ?isSelected=${this._selectedItemId===a.id}
                    @item-selected=${this._handleItemSelection}
                  ></shop-item-card>
                `})}
            </div>
          `:N)}
        </div>

        <shop-tooltip
          .itemData=${this._selectedItemData}
          .playerDataSnapshot=${this.playerDataSnapshot} /* Pasa el snapshot */
          @buy-item-requested=${this._handleBuyRequest}
          id="internal-tooltip"
        ></shop-tooltip>
      </div>
    `}_calculateItemCost(f,e){const a=f.cost;let s=a.base;if(f.isLeveled){const i=f.levelRef,t=i?e[i]??0:0;a.type==="exponential"&&typeof a.multiplier=="number"?s=a.base*Math.pow(a.multiplier,t):s=a.base+(a.perLevel??0)*t}else if(a.levelRef&&typeof a.perLevel=="number"){const i=e[a.levelRef]??0;s=a.base+a.perLevel*i}return Math.round(s)}_checkItemIsPurchased(f,e){if(!f.isPurchasedCheck)return!1;const a=f.isPurchasedCheck,s=a.valueRef,i=e[s];if(typeof i>"u")return!1;switch(a.condition){case"isTrue":return i===!0;case"isFalse":return i===!1;case"greaterThan":return typeof i=="number"&&typeof a.limit=="number"&&i>a.limit;default:return!1}}_checkItemCanPurchase(f,e){if(!f.purchaseCheck)return!0;const a=f.purchaseCheck,s=a.valueRef,i=e[s];if(typeof i>"u")return!1;switch(a.condition){case"lessThan":return typeof i=="number"&&typeof a.limit=="number"&&i<a.limit;case"lessThanOrEqual":return typeof i=="number"&&typeof a.limit=="number"&&i<=a.limit;case"isFalse":return i===!1;case"isTrue":return i===!0;case"greaterThan":return typeof i=="number"&&typeof a.limit=="number"&&i>a.limit;case"greaterThanOrEqual":return typeof i=="number"&&typeof a.limit=="number"&&i>=a.limit;default:return!1}}_getItemLevel(f,e){return!f.isLeveled||!f.levelRef?-1:e[f.levelRef]??0}};te.styles=V`
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
  `;he([$({type:Array})],te.prototype,"items",2);he([$({type:Object})],te.prototype,"playerDataSnapshot",2);he([$({type:Boolean,reflect:!0,attribute:"visible"})],te.prototype,"isVisible",2);he([$({type:Number})],te.prototype,"updateTrigger",2);he([U()],te.prototype,"_selectedItemId",2);he([U()],te.prototype,"_itemsByCategory",2);he([U()],te.prototype,"_selectedItemData",2);he([ae(".shop-content-box")],te.prototype,"_shopContentBox",2);he([ae("shop-tooltip")],te.prototype,"_tooltipElement",2);te=he([G("shop-popup")],te);const Li="shop-popup";class Di{constructor(e,a){this.items=new Map,this.shopPopupElement=null,this.buyRequestListener=s=>this.handleBuyRequest(s),this.closeRequestListener=()=>this.closeShop(),this.handleBuyRequest=s=>{var n;const t=(n=s.detail)==null?void 0:n.itemId;t?this.executePurchaseAction(t):console.warn("ShopManager: Evento 'buy-item-requested' capturado sin itemId.")},this.playerData=e,this.gameManager=a}init(e){if(this.items.clear(),!Array.isArray(e)){console.error("ShopManager: Datos de ítems de tienda inválidos.");return}e.forEach(a=>{a!=null&&a.id&&typeof a.id=="string"?this.items.set(a.id,a):console.warn("ShopManager: Ítem inválido o sin ID.",a)})}getShopPopupElement(){return(!this.shopPopupElement||!document.body.contains(this.shopPopupElement))&&(this.shopPopupElement=document.getElementById(Li),this.shopPopupElement?(this.shopPopupElement.removeEventListener("close-requested",this.closeRequestListener),this.shopPopupElement.removeEventListener("buy-item-requested",this.buyRequestListener),this.shopPopupElement.addEventListener("close-requested",this.closeRequestListener),this.shopPopupElement.addEventListener("buy-item-requested",this.buyRequestListener)):console.error("ShopManager CRITICAL: Componente <shop-popup> con ID 'shop-popup' NO encontrado en el DOM.")),this.shopPopupElement}isShopOpen(){const e=this.getShopPopupElement();return(e==null?void 0:e.isVisible)||!1}openShop(){const e=this.getShopPopupElement();if(!e){console.error("ShopManager: No se pudo abrir la tienda, el elemento popup no existe.");return}try{e.items=Array.from(this.items.values()),e.playerDataSnapshot=this.playerData,e.updateTrigger=(e.updateTrigger||0)+1,e.isVisible=!0;const a=document.getElementById("blur-backdrop");a?a.visible=!0:console.warn("ShopManager: Componente <blur-backdrop-component> no encontrado al abrir la tienda.")}catch(a){console.error("[ShopManager] Error estableciendo props o visibilidad en <shop-popup>:",a),e&&(e.isVisible=!1);const s=document.getElementById("blur-backdrop");s&&(s.visible=!1)}}closeShop(){var i;const e=this.getShopPopupElement();if(!e||!e.isVisible)return;e.isVisible=!1;const a=document.getElementById("blur-backdrop"),s=((i=this.gameManager.getUIManager())==null?void 0:i.isExplanationVisible())??!1;a&&!s&&(a.visible=!1)}updateShopUI(){if(!this.playerData){console.warn("[ShopManager] updateShopUI llamado sin playerData.");return}const e=this.getShopPopupElement();if(e&&e.isVisible){const a=this.playerData.comboMultiplierLevel;console.log(`[ShopManager DEBUG] updateShopUI: PlayerData level ANTES de pasar: ${a}`),e.playerDataSnapshot=this.playerData,e.updateTrigger=(e.updateTrigger||0)+1,console.log(`[ShopManager DEBUG] updateShopUI: Snapshot asignado, trigger incrementado a ${e.updateTrigger}. Intentando forzar refresh del tooltip...`),queueMicrotask(()=>{var i;const s=(i=e.shadowRoot)==null?void 0:i.querySelector("shop-tooltip");s&&typeof s.forceRefresh=="function"?(s.forceRefresh(),console.log("[ShopManager DEBUG] updateShopUI (microtask): tooltip.forceRefresh() LLAMADO.")):s?(console.warn("[ShopManager DEBUG] updateShopUI (microtask): Tooltip encontrado pero no tiene el método forceRefresh(). Intentando requestUpdate..."),s.requestUpdate()):(console.warn("[ShopManager DEBUG] updateShopUI (microtask): No se pudo encontrar el componente shop-tooltip dentro del popup para forzar refresh. Forzando update del popup..."),e.requestUpdate())})}}executePurchaseAction(e){const a=this.items.get(e);if(!a)return console.error(`ShopManager: Ítem con ID '${e}' no encontrado.`),!1;const s=a.levelRef,i=s?this.playerData[s]:"N/A";console.log(`[ShopManager DEBUG exec] INTENTANDO COMPRA: Item '${e}', Nivel Actual: ${i}, Puntos Actuales: ${this.playerData.score}`);const t=this._calculateItemCost(a,this.playerData),n=this.playerData.score>=t,l=this._checkItemCanPurchase(a,this.playerData),r=this._getItemLevel(a,this.playerData),g=a.isLeveled&&typeof a.maxLevel=="number"&&r>=a.maxLevel,c=this._checkItemIsPurchased(a,this.playerData)&&!a.isLeveled;if(g||c||!l||!n)return console.warn(`[ShopManager DEBUG exec] Compra RECHAZADA para '${e}'. Razones: max=${g}, purchased=${c}, reqs=${l}, afford=${n}`),this.updateShopUI(),this.gameManager.getAudioManager().playSound("incorrect"),!1;this.playerData.score-=t,this.gameManager.updateExternalScoreUI(),console.log(`[ShopManager DEBUG exec] Costo ${t} deducido. Puntos restantes: ${this.playerData.score}`);let p=!1;const u=a.actionId;try{switch(u){case"purchaseLife":p=this.purchaseLifeAction();break;case"purchaseShield":p=this.purchaseShieldAction();break;case"purchaseHint":p=this.purchaseHintAction();break;case"purchaseUnlockDrawing":p=this.purchaseUnlockDrawingAction();break;case"purchaseUnlockCatFood":p=this.purchaseUnlockCatFoodAction();break;case"purchaseRefillCatFood":p=this.purchaseRefillCatFoodAction();break;case"purchaseComboMultiplier":p=this.purchaseComboMultiplierAction();break;case"purchaseInkCostReduction":p=this.purchaseInkCostReductionAction();break;case"purchaseExtraCatSpawn":p=this.purchaseExtraCatSpawnAction();break;case"purchaseMaxCatsIncrease":p=this.purchaseMaxCatsIncreaseAction();break;case"purchaseMaxCatSize":p=this.purchaseMaxCatSizeAction();break;default:console.error(`ShopManager: Acción desconocida: ${u}`),p=!1}const o=s&&p?this.playerData[s]:"N/A (o falló)";console.log(`[ShopManager DEBUG exec] Acción ${u} ejecutada. Éxito: ${p}. Nuevo Nivel: ${o}`)}catch(o){console.error(`ShopManager: Error ejecutando acción ${u}:`,o),p=!1}return p?(console.log(`[ShopManager DEBUG exec] Compra EXITOSA de '${e}'.`),this.gameManager.getAudioManager().playSound("purchase")):(this.playerData.score+=t,this.gameManager.updateExternalScoreUI(),console.warn(`[ShopManager DEBUG exec] Acción ${u} falló o no aplicó. Costo ${t} revertido. Puntos: ${this.playerData.score}`),this.gameManager.getAudioManager().playSound("incorrect")),console.log(`[ShopManager DEBUG exec] Llamando a updateShopUI DESPUÉS de intento de compra de '${e}'.`),this.updateShopUI(),p}purchaseLifeAction(){return this.playerData.lives++,this.gameManager.updateExternalLivesUI(),!0}purchaseShieldAction(){return this.playerData.hasShield?!1:(this.playerData.hasShield=!0,this.gameManager.updateExternalShieldUI(!0),!0)}purchaseHintAction(){return this.playerData.hintCharges++,this.gameManager.updateExternalHintUI(this.playerData.hintCharges),!0}purchaseUnlockDrawingAction(){if(this.playerData.isDrawingUnlocked)return!1;this.playerData.isDrawingUnlocked=!0;let e=!1;try{e=this.gameManager.enableDrawingFeature()}catch{e=!1}return e?!0:(this.playerData.isDrawingUnlocked=!1,!1)}purchaseComboMultiplierAction(){return this.playerData.comboMultiplierLevel++,!0}purchaseInkCostReductionAction(){return this.playerData.inkCostReductionLevel++,this.gameManager.updateInkUI(),!0}purchaseExtraCatSpawnAction(){return this.playerData.extraCatSpawnLevel++,!0}purchaseMaxCatsIncreaseAction(){return this.playerData.maxCatsLevel++,!0}purchaseMaxCatSizeAction(){return this.playerData.maxCatSizeLevel++,!0}purchaseUnlockCatFoodAction(){return this.playerData.isCatFoodUnlocked?!1:(this.playerData.isCatFoodUnlocked=!0,this.playerData.refillCatFood(),this.gameManager.enableCatFoodFeature(),!0)}purchaseRefillCatFoodAction(){return this.playerData.currentCatFood>=this.playerData.getMaxCatFood()?!1:(this.playerData.refillCatFood(),this.gameManager.updateCatFoodUI(),!0)}_calculateItemCost(e,a){const s=e.cost;let i=s.base;if(e.isLeveled){const t=e.levelRef,n=t?a[t]??0:0;s.type==="exponential"&&typeof s.multiplier=="number"?i=s.base*Math.pow(s.multiplier,n):i=s.base+(s.perLevel??0)*n}else if(s.levelRef&&typeof s.perLevel=="number"){const t=a[s.levelRef]??0;i=s.base+s.perLevel*t}return Math.round(i)}_checkItemIsPurchased(e,a){if(!e.isPurchasedCheck)return!1;const s=e.isPurchasedCheck,i=s.valueRef,t=a[i];if(typeof t>"u")return!1;switch(s.condition){case"isTrue":return t===!0;case"isFalse":return t===!1;case"greaterThan":return typeof t=="number"&&typeof s.limit=="number"&&t>s.limit;default:return!1}}_checkItemCanPurchase(e,a){if(!e.purchaseCheck)return!0;const s=e.purchaseCheck,i=s.valueRef,t=a[i];if(typeof t>"u")return!1;switch(s.condition){case"lessThan":return typeof t=="number"&&typeof s.limit=="number"&&t<s.limit;case"lessThanOrEqual":return typeof t=="number"&&typeof s.limit=="number"&&t<=s.limit;case"isFalse":return t===!1;case"isTrue":return t===!0;case"greaterThan":return typeof t=="number"&&typeof s.limit=="number"&&t>s.limit;case"greaterThanOrEqual":return typeof t=="number"&&typeof s.limit=="number"&&t>=s.limit;default:return!1}}_getItemLevel(e,a){return!e.isLeveled||!e.levelRef?-1:a[e.levelRef]??0}destroy(){const e=this.getShopPopupElement();e&&(e.removeEventListener("close-requested",this.closeRequestListener),e.removeEventListener("buy-item-requested",this.buyRequestListener)),this.items.clear(),this.shopPopupElement=null,console.log("ShopManager destruido.")}}class _i{constructor(){this.score=0,this.lives=3,this.isDrawingUnlocked=!1,this.isCatFoodUnlocked=!1,this.hasShield=!1,this.hintCharges=0,this.currentInk=0,this.INK_BAR_CAPACITY=1e3,this.inkSpentSinceLastClear=0,this.currentCatFood=0,this.MAX_CAT_FOOD=25,this.comboMultiplierLevel=0,this.inkCostReductionLevel=0,this.extraCatSpawnLevel=0,this.maxCatsLevel=0,this.maxCatSizeLevel=0,this.BASE_MAX_CAT_SIZE_LIMIT=150,this.MAX_CAT_SIZE_INCREMENT_PER_LEVEL=25,console.log("PlayerData Instanciado.")}getCurrentComboMultiplier(){return 1+this.comboMultiplierLevel*.15}getCurrentInkCostPerPixel(){return .4*Math.pow(.9,this.inkCostReductionLevel)}getCatsPerCorrectAnswer(){return 1+this.extraCatSpawnLevel*1}getMaxCatsAllowed(){return 50+this.maxCatsLevel*25}getCurrentMaxSizeLimit(){return this.BASE_MAX_CAT_SIZE_LIMIT+this.maxCatSizeLevel*this.MAX_CAT_SIZE_INCREMENT_PER_LEVEL}spendInk(e){return this.currentInk>=e?(this.currentInk-=e,this.inkSpentSinceLastClear+=e,!0):!1}gainInk(e){this.currentInk+=e}recoverSpentInk(){console.log(`[PlayerData] Recovering ${this.inkSpentSinceLastClear.toFixed(0)} ink.`),this.gainInk(this.inkSpentSinceLastClear),this.inkSpentSinceLastClear=0}getMaxCatFood(){return this.MAX_CAT_FOOD}spendCatFoodUnit(){return this.isCatFoodUnlocked&&this.currentCatFood>0?(this.currentCatFood--,!0):!1}refillCatFood(){this.isCatFoodUnlocked&&(this.currentCatFood=this.getMaxCatFood())}reset(){console.log("PlayerData: Reseteando datos..."),this.score=0,this.lives=3,this.isDrawingUnlocked=!1,this.isCatFoodUnlocked=!1,this.hasShield=!1,this.hintCharges=0,this.currentInk=0,this.inkSpentSinceLastClear=0,this.currentCatFood=0,this.comboMultiplierLevel=0,this.inkCostReductionLevel=0,this.extraCatSpawnLevel=0,this.maxCatsLevel=0,this.maxCatSizeLevel=0}}var $i=Object.defineProperty,zi=Object.getOwnPropertyDescriptor,gt=(f,e,a,s)=>{for(var i=s>1?void 0:s?zi(e,a):e,t=f.length-1,n;t>=0;t--)(n=f[t])&&(i=(s?n(e,a,i):n(i))||i);return s&&i&&$i(e,a,i),i};let _e=class extends R{constructor(){super(...arguments),this._canvasContext=null,this.isActive=!1,this.isPointerLockdown=!1}firstUpdated(){this._canvasElement&&(this._canvasContext=this._canvasElement.getContext("2d"),this._canvasContext||console.error("DrawingCanvasLayer: No se pudo obtener el contexto 2D."),this.dispatchEvent(new CustomEvent("canvas-ready",{bubbles:!0,composed:!0}))),this.resizeCanvas()}getCanvasElement(){return this._canvasElement??null}getContext(){return this._canvasContext??null}resizeCanvas(){this._canvasElement&&(this._canvasElement.width=window.innerWidth,this._canvasElement.height=window.innerHeight,this.dispatchEvent(new CustomEvent("canvas-resized",{bubbles:!0,composed:!0})))}render(){return B`<canvas></canvas>`}};_e.styles=V`
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
      `;gt([ae("canvas")],_e.prototype,"_canvasElement",2);gt([$({type:Boolean,reflect:!0})],_e.prototype,"isActive",2);gt([$({type:Boolean,reflect:!0})],_e.prototype,"isPointerLockdown",2);_e=gt([G("drawing-canvas-layer")],_e);const la=25,ca=8,Oi="#E5E7EB",Bi=150,Ri=4,Fi=2,Ui=Fi;class Ni{constructor(e){this.drawingCanvasLayer=null,this.actualCanvasElement=null,this.drawingCtx=null,this.isBrushActive=!1,this.isDrawing=!1,this.currentPath=[],this.lastPoint=null,this.drawnPaths=[],this.isInitialized=!1,this.generalListeners=[],this.lastToggleTime=0,this.BRUSH_TOGGLE_DEBOUNCE=200,this.gameManager=e;try{this.playerData=e.getPlayerData()}catch(a){console.error("InkManager: Error en constructor al obtener PlayerData.",a)}}setPhysicsManager(e){this.physicsManager=e}init(){if(this.isInitialized){this.updateInkUI();return}try{if(!this.physicsManager&&(this.physicsManager=this.gameManager.getPhysicsManager(),!this.physicsManager))throw new Error("PhysicsManager no disponible.");if(!this.playerData&&(this.playerData=this.gameManager.getPlayerData(),!this.playerData))throw new Error("PlayerData no disponible.");if(this.drawingCanvasLayer=document.getElementById("drawing-canvas-layer-main"),!this.drawingCanvasLayer)throw new Error("<drawing-canvas-layer id='drawing-canvas-layer-main'> no encontrado en el DOM.");if(this.actualCanvasElement=this.drawingCanvasLayer.getCanvasElement(),this.drawingCtx=this.drawingCanvasLayer.getContext(),!this.actualCanvasElement||!this.drawingCtx)throw new Error("No se pudo obtener el canvas o el contexto 2D desde drawing-canvas-layer.");this.setupDrawingCanvas(),this.initDrawingListeners(),this.isInitialized=!0,this.updateInkUI()}catch(e){console.error("InkManager: Error CRÍTICO en inicialización:",e),this.isInitialized=!1}}initDrawingListeners(){if(this.removeDrawingListeners(),this.actualCanvasElement){const e=this.startDrawing.bind(this),a=this.draw.bind(this),s=this.stopDrawing.bind(this);this.addListener(this.actualCanvasElement,"mousedown",e),this.addListener(this.actualCanvasElement,"mousemove",a),this.addListener(this.actualCanvasElement,"mouseup",s),this.addListener(this.actualCanvasElement,"mouseleave",s),this.addListener(this.actualCanvasElement,"touchstart",e,{passive:!1}),this.addListener(this.actualCanvasElement,"touchmove",a,{passive:!1}),this.addListener(this.actualCanvasElement,"touchend",s),this.addListener(this.actualCanvasElement,"touchcancel",s)}this.addListener(window,"resize",this.handleResize.bind(this))}addListener(e,a,s,i){e.addEventListener(a,s,i),this.generalListeners.push({element:e,type:a,handler:s,options:i})}removeDrawingListeners(){this.generalListeners.forEach(({element:e,type:a,handler:s,options:i})=>{try{e.removeEventListener(a,s,i)}catch{}}),this.generalListeners=[]}setupDrawingCanvas(){this.drawingCtx&&this.drawingCanvasLayer&&(this.drawingCanvasLayer.resizeCanvas(),this.applyContextStyles(),this.clearCanvas(),this.redrawPaths())}applyContextStyles(){this.drawingCtx&&(this.drawingCtx.strokeStyle=Oi,this.drawingCtx.lineWidth=ca,this.drawingCtx.lineCap="round",this.drawingCtx.lineJoin="round")}handleResize(){this.drawingCanvasLayer&&(this.drawingCanvasLayer.resizeCanvas(),this.drawingCtx=this.drawingCanvasLayer.getContext(),this.drawingCtx&&(this.applyContextStyles(),this.redrawPaths()))}clearCanvas(){this.drawingCtx&&this.actualCanvasElement&&this.drawingCtx.clearRect(0,0,this.actualCanvasElement.width,this.actualCanvasElement.height)}redrawPaths(){this.clearCanvas(),this.drawingCtx&&this.drawnPaths.forEach(e=>{this.drawPathPoints(e.points)})}drawPathPoints(e){if(!(!this.drawingCtx||e.length<2)){this.drawingCtx.beginPath(),this.drawingCtx.moveTo(e[0].x,e[0].y);for(let a=1;a<e.length;a++)this.drawingCtx.lineTo(e[a].x,e[a].y);this.drawingCtx.stroke()}}updateInkUI(){if(!this.isInitialized||!this.playerData)return;const e=this.playerData.isDrawingUnlocked;this.gameManager.getUIManager().updateInkVisibility(e),this.gameManager.getUIManager().updateInkBar(),e&&this.playerData.currentInk<=0&&this.isBrushActive?this.toggleBrush(!1):this.gameManager.updateToolButtonStates()}toggleBrush(e){if(!this.isInitialized)return;const a=Date.now();if(e===void 0&&a-this.lastToggleTime<this.BRUSH_TOGGLE_DEBOUNCE)return;this.lastToggleTime=a;const s=e!==void 0?e:!this.isBrushActive;if(s===!0&&(!this.playerData.isDrawingUnlocked||this.playerData.currentInk<=0)){this.isBrushActive&&(this.isBrushActive=!1,this.gameManager.setQuizUiFaded(!1),this.updateCanvasActiveState(),this.gameManager.updateToolButtonStates());return}s!==this.isBrushActive&&(this.isBrushActive=s,!this.isBrushActive&&this.isDrawing&&this.stopDrawing(null),this.gameManager.setQuizUiFaded(this.isBrushActive),this.updateCanvasActiveState(),this.gameManager.updateToolButtonStates())}updateCanvasActiveState(){this.drawingCanvasLayer&&(this.drawingCanvasLayer.isActive=this.isBrushActive)}clearInkLines(){var a;if(!this.isInitialized||!this.playerData.isDrawingUnlocked||this.playerData.inkSpentSinceLastClear<=0)return;const e=this.drawnPaths.flatMap(s=>s.bodies);if((a=this.physicsManager)!=null&&a.getWorld&&e.length>0)try{const s=this.physicsManager.getWorld(),i=e.filter(t=>L.Composite.get(s,t.id,"body"));i.length>0&&L.World.remove(s,i)}catch(s){console.error("InkManager: Error removiendo cuerpos de tinta:",s)}this.drawnPaths=[],this.clearCanvas(),this.playerData.recoverSpentInk(),this.updateInkUI(),this.gameManager.getAudioManager().playSound("clear_ink")}gainInkOnCorrectAnswer(){!this.isInitialized||!this.playerData.isDrawingUnlocked||(this.playerData.gainInk(Bi),this.updateInkUI())}destroy(){this.removeDrawingListeners(),this.isInitialized=!1,this.isBrushActive=!1,this.isDrawing=!1,this.currentPath=[],this.drawnPaths=[],this.clearCanvas(),this.drawingCanvasLayer&&(this.drawingCanvasLayer.isActive=!1,this.drawingCanvasLayer.isPointerLockdown=!1),this.drawingCtx=null,this.actualCanvasElement=null,this.drawingCanvasLayer=null}startDrawing(e){if(!this.isInitialized||!this.isBrushActive||!this.drawingCtx||!this.actualCanvasElement||this.playerData.currentInk<=0)return;e.preventDefault(),this.isDrawing=!0;const a=this.getMousePos(e);this.currentPath=[a],this.lastPoint=a,this.drawingCtx.beginPath(),this.drawingCtx.moveTo(a.x,a.y),this.gameManager.getAudioManager().playSound("draw_start")}draw(e){if(!this.isDrawing||!this.isBrushActive||!this.drawingCtx)return;e.preventDefault();const a=this.getMousePos(e),s=this.lastPoint?this.distanceSq(this.lastPoint,a):la;if(s>=la){const t=Math.sqrt(s)*this.playerData.getCurrentInkCostPerPixel();this.playerData.spendInk(t)?(this.currentPath.push(a),this.drawingCtx.lineTo(a.x,a.y),this.drawingCtx.stroke(),this.drawingCtx.beginPath(),this.drawingCtx.moveTo(a.x,a.y),this.lastPoint=a,this.updateInkUI()):(this.stopDrawing(e),this.playerData.currentInk<=0&&this.toggleBrush(!1))}}stopDrawing(e){var a;if(this.isDrawing){if(e==null||e.preventDefault(),this.isDrawing=!1,this.gameManager.getAudioManager().playSound("draw_end"),this.currentPath.length>1){const s=this.createInkBodySegments(this.currentPath);if(s.length>0&&((a=this.physicsManager)!=null&&a.getWorld))try{L.World.add(this.physicsManager.getWorld(),s),this.drawnPaths.push({points:[...this.currentPath],bodies:s})}catch(i){console.error("InkManager: Error añadiendo cuerpos:",i)}else this.physicsManager||console.error("InkManager: PhysicsManager no disponible.")}this.currentPath=[],this.lastPoint=null}}getMousePos(e){if(!this.actualCanvasElement)return{x:0,y:0};const a=this.actualCanvasElement.getBoundingClientRect();let s=0,i=0;return e instanceof MouseEvent?(s=e.clientX,i=e.clientY):e.touches&&e.touches.length>0?(s=e.touches[0].clientX,i=e.touches[0].clientY):e.changedTouches&&e.changedTouches.length>0&&(s=e.changedTouches[0].clientX,i=e.changedTouches[0].clientY),{x:s-a.left,y:i-a.top}}distanceSq(e,a){const s=e.x-a.x,i=e.y-a.y;return s*s+i*i}createInkBodySegments(e){const a=[];if(e.length<2||!this.physicsManager)return a;for(let s=1;s<e.length;s++){const i=e[s-1],t=e[s],n=t.x-i.x,l=t.y-i.y,r=n*n+l*l;if(r<1)continue;const g=Math.sqrt(r),c=Math.atan2(l,n),p=i.x+n/2,u=i.y+l/2;try{const o=L.Bodies.rectangle(p,u,g,ca,{isStatic:!0,angle:c,label:"inkLine",friction:.5,restitution:.1,collisionFilter:{category:Ri,mask:Ui},render:{visible:!1}});o&&a.push(o)}catch(o){console.error("InkManager: Error creando cuerpo:",o)}}return a}}const Vi=1,Gi=4;class xe{constructor(e){this.currentQuestion=null,this.nextQuestionTimeoutId=null,this.consecutiveCorrectAnswers=0,this.hintAppliedToQuestionId=null,this.isWaitingForExplanationConfirm=!1,this.lastAnswerResultType=null,this.isExitingOrChangingState=!1,this.BASE_POINTS_PER_CORRECT=15,this.DIFFICULTY_BONUS={easy:10,1:10,2:20,medium:30,3:30,hard:45,4:45,5:65},this.gameManager=e;try{this.uiManager=e.getUIManager(),this.quizSystem=e.getQuizSystem()}catch(a){throw console.error("QuizGameplayState: Error crítico obteniendo UIManager o QuizSystem.",a),a}}selectRandomCatTemplateId(){var n,l;const a=this.gameManager.getCatManager().getSpawnableTemplatesWeighted();if(a.length===0)return"common_cat";const s=a.reduce((r,g)=>r+g.weight,0);if(s<=0)return((n=a[0])==null?void 0:n.id)??"common_cat";const i=Math.random()*s;let t=0;for(const r of a)if(t+=r.weight,i<t)return r.id;return((l=a[a.length-1])==null?void 0:l.id)??"common_cat"}enter(e){console.log("[QuizGameplayState] enter() INICIADO.",e),this.isExitingOrChangingState=!1,this.gameManager.setBodyStateClass("quizgameplay"),this.gameManager.getPlayerData().reset(),console.log("[QuizGameplayState] PlayerData reseteado."),this.consecutiveCorrectAnswers=0,this.hintAppliedToQuestionId=null,this.isWaitingForExplanationConfirm=!1,this.lastAnswerResultType=null,this.nextQuestionTimeoutId&&(clearTimeout(this.nextQuestionTimeoutId),this.nextQuestionTimeoutId=null,console.warn("[QuizGameplayState] Timeout pendiente cancelado en enter().")),this.displayNextQuestion(),console.log("[QuizGameplayState] enter() FINALIZADO.")}exit(){console.log("[QuizGameplayState] exit() INICIADO."),this.isExitingOrChangingState=!0;const e=this.gameManager.getContainerElement();this.uiManager.clearQuizInterface(e),this.nextQuestionTimeoutId&&(clearTimeout(this.nextQuestionTimeoutId),this.nextQuestionTimeoutId=null,console.log("[QuizGameplayState] Timeout para siguiente pregunta cancelado en exit().")),this.uiManager.updateComboVisuals(0),document.body.style.backgroundColor="";const a=document.documentElement;a.style.removeProperty("--element-glow-intensity"),a.style.removeProperty("--flare-intensity"),a.style.removeProperty("--difficulty-glow-color"),a.style.removeProperty("--difficulty-glow-blur"),this.isWaitingForExplanationConfirm=!1,this.hintAppliedToQuestionId=null,this.currentQuestion=null,this.lastAnswerResultType=null,console.log("[QuizGameplayState] exit() FINALIZADO.")}update(e){}calculateScore(e,a){const s=a+1,i=this.BASE_POINTS_PER_CORRECT*s,t=this.DIFFICULTY_BONUS[e]??this.DIFFICULTY_BONUS[1]??0,n=this.gameManager.getPlayerData().getCurrentComboMultiplier(),l=Math.max(0,(i+t)*(n-1));return{totalPoints:Math.round(i+t+l),basePoints:i,difficultyBonus:t,comboBonus:Math.round(l)}}handleCorrectAnswer(e){if(console.log("[QuizGameplayState] handleCorrectAnswer() INICIADO."),this.isExitingOrChangingState){console.log("[QuizGameplayState] handleCorrectAnswer() abortado: isExitingOrChangingState es true.");return}this.lastAnswerResultType="correct";const a=this.calculateScore(e,this.consecutiveCorrectAnswers);this.consecutiveCorrectAnswers++,this.gameManager.getPlayerData().score+=a.totalPoints,this.gameManager.getInkManager().gainInkOnCorrectAnswer(),this.uiManager.updateScoreDisplay(this.gameManager.getPlayerData().score),this.uiManager.updateComboVisuals(this.consecutiveCorrectAnswers),this.uiManager.updateInkBar();let s=`¡+${a.totalPoints} Pts!`,i=`(Base: ${a.basePoints}, Dif: +${a.difficultyBonus}`;const t=this.gameManager.getPlayerData().getCurrentComboMultiplier();a.comboBonus>0&&(i+=`, Combo x${t.toFixed(1)}: +${a.comboBonus}`),i+=")",s+=` ${i}`,this.uiManager.updateFeedback(s,"correct");try{this.gameManager.getAudioManager().playSound("correct")}catch(r){console.error("Error sonido 'correct':",r)}try{this.gameManager.getCatManager().growExistingCats(Vi,Gi)}catch(r){console.error("Error llamando a catManager.growExistingCats:",r)}const n=this.gameManager.getPlayerData().getCatsPerCorrectAnswer(),l=this.selectRandomCatTemplateId();if(l)for(let r=0;r<n;r++)try{this.gameManager.getCatManager().addCat(l)}catch(g){console.error(`Error al llamar a catManager.addCat (iteración ${r+1}/${n}):`,g)}console.log("[QuizGameplayState] handleCorrectAnswer() llamando a proceedToNextStep()."),this.proceedToNextStep()}handleIncorrectAnswer(){if(console.log("[QuizGameplayState] handleIncorrectAnswer() INICIADO."),this.isExitingOrChangingState){console.log("[QuizGameplayState] handleIncorrectAnswer() abortado: isExitingOrChangingState es true.");return}this.lastAnswerResultType="incorrect";const e=this.gameManager.getPlayerData();let a=!1;e.hasShield?(e.hasShield=!1,this.uiManager.updateFeedback("¡Escudo Roto!","shield"),this.uiManager.updateShieldIcon(!1),this.gameManager.getAudioManager().playSound("shield_break"),this.lastAnswerResultType="shield",console.log("[QuizGameplayState] Escudo usado.")):(this.consecutiveCorrectAnswers=0,this.gameManager.decrementLives(),this.uiManager.updateComboVisuals(this.consecutiveCorrectAnswers),this.gameManager.getAudioManager().playSound("incorrect"),e.hintCharges>0&&(console.log("[QuizGameplayState] Respuesta incorrecta (sin escudo), reseteando cargas de pista."),e.hintCharges=0,this.uiManager.updateHintIcon(0)),this.gameManager.getLives()<=0&&(a=!0,console.log("[QuizGameplayState] VIDAS AGOTADAS - GAME OVER."))),this.hintAppliedToQuestionId=null,a?(this.isExitingOrChangingState=!0,console.log("[QuizGameplayState] Procesando Game Over..."),this.uiManager.updateFeedback("¡Has perdido!","incorrect"),this.nextQuestionTimeoutId&&(clearTimeout(this.nextQuestionTimeoutId),this.nextQuestionTimeoutId=null,console.log("[QuizGameplayState] Timeout para siguiente pregunta cancelado por Game Over.")),setTimeout(()=>{console.log("[QuizGameplayState] Timeout de Game Over: Verificando estado antes de cambiar..."),this.gameManager.getStateMachine().getCurrentStateName()==="QuizGameplay"?(console.log("[QuizGameplayState] Timeout de Game Over: Cambiando a estado GameOverState."),this.gameManager.getStateMachine().changeState("GameOver",{score:e.score},"gq-wipe-transition")):console.log("[QuizGameplayState] Timeout de Game Over: Estado ya cambió, no se transiciona a GameOverState.")},1500)):(console.log("[QuizGameplayState] handleIncorrectAnswer() (no game over) llamando a proceedToNextStep()."),this.proceedToNextStep())}proceedToNextStep(){var i,t;const e=((i=this.currentQuestion)==null?void 0:i.id)||"N/A";if(console.log(`[QuizGameplayState] proceedToNextStep() INICIADO para pregunta ${e}. isExiting: ${this.isExitingOrChangingState}, isWaitingExpl: ${this.isWaitingForExplanationConfirm}`),this.isExitingOrChangingState){console.log(`[QuizGameplayState] proceedToNextStep() abortado (pregunta ${e}): isExitingOrChangingState es true.`);return}if(this.isWaitingForExplanationConfirm){console.log(`[QuizGameplayState] proceedToNextStep() (pregunta ${e}): Ya esperando confirmación de explicación. NO SE HACE NADA MÁS.`);return}const a=(t=this.currentQuestion)==null?void 0:t.explanation,s=()=>{console.log(`[QuizGameplayState] scheduleNext() INTERNO llamado (después de pregunta ${e}). Programando siguiente pregunta.`),this.lastAnswerResultType=null;const n=a?500:1500;this.scheduleNextQuestion(n)};if(a){console.log(`[QuizGameplayState] Pregunta ${e}: Mostrando explicación. SET isWaitingForExplanationConfirm = true.`),this.isWaitingForExplanationConfirm=!0;const n=()=>{if(console.log(`[QuizGameplayState] ** explanationCallback EJECUTADO ** (pregunta ${e}). SET isWaitingForExplanationConfirm = false.`),this.isExitingOrChangingState){console.log(`[QuizGameplayState] explanationCallback abortado (pregunta ${e}): isExitingOrChangingState es true.`),this.isWaitingForExplanationConfirm=!1;return}this.isWaitingForExplanationConfirm=!1,s()};try{console.log(`[QuizGameplayState] Llamando a uiManager.showExplanation para pregunta ${e}.`),this.uiManager.showExplanation(a,n,this.lastAnswerResultType)}catch(l){console.error("[QuizGameplayState] Error llamando a uiManager.showExplanation:",l),this.isWaitingForExplanationConfirm=!1,s()}}else console.log(`[QuizGameplayState] Pregunta ${e}: No hay explicación. Llamando a scheduleNext directamente.`),s();console.log(`[QuizGameplayState] proceedToNextStep() FINALIZADO para pregunta ${e}.`)}scheduleNextQuestion(e){var s;const a=((s=this.currentQuestion)==null?void 0:s.id)||"N/A (previa)";if(console.log(`[QuizGameplayState] scheduleNextQuestion() INICIADO para pregunta ${a} con delay: ${e}ms. isExiting: ${this.isExitingOrChangingState}`),this.isExitingOrChangingState){console.log("[QuizGameplayState] scheduleNextQuestion() abortado: isExitingOrChangingState es true.");return}this.nextQuestionTimeoutId&&(console.log(`[QuizGameplayState] Limpiando timeout anterior: ${this.nextQuestionTimeoutId} antes de programar para ${a}.`),clearTimeout(this.nextQuestionTimeoutId)),this.nextQuestionTimeoutId=window.setTimeout(()=>{const i=this.nextQuestionTimeoutId;this.nextQuestionTimeoutId=null,console.log(`[QuizGameplayState] TIMEOUT EJECUTADO (ID: ${i}) para scheduleNextQuestion. Pregunta previa: ${a}`),!this.isExitingOrChangingState&&this.gameManager.getStateMachine().getCurrentStateName()==="QuizGameplay"?(console.log("[QuizGameplayState] Timeout: Llamando a displayNextQuestion."),requestAnimationFrame(()=>{!this.isExitingOrChangingState&&this.gameManager.getStateMachine().getCurrentStateName()==="QuizGameplay"?this.displayNextQuestion():console.log("[QuizGameplayState] displayNextQuestion abortado en rAF porque el estado cambió o se está saliendo.")})):console.log("[QuizGameplayState] displayNextQuestion abortado en timeout porque el estado cambió o se está saliendo. Estado FSM:",this.gameManager.getStateMachine().getCurrentStateName())},e),console.log(`[QuizGameplayState] Nueva pregunta programada con timeout ID: ${this.nextQuestionTimeoutId} para después de pregunta ${a}. Delay: ${e}ms.`)}displayNextQuestion(){var a;if(console.log(`[QuizGameplayState] displayNextQuestion() INICIADO. isExiting: ${this.isExitingOrChangingState}`),this.isExitingOrChangingState){console.log("[QuizGameplayState] displayNextQuestion abortado porque se está saliendo del estado.");return}try{this.currentQuestion=this.quizSystem.selectNextQuestion(),console.log(`[QuizGameplayState] Siguiente pregunta seleccionada: ID ${((a=this.currentQuestion)==null?void 0:a.id)||"NINGUNA"}`)}catch(s){console.error("[QuizGameplayState] Error seleccionando la siguiente pregunta:",s),this.uiManager.updateFeedback("Error al cargar la siguiente pregunta.","info");return}if(!this.currentQuestion){console.log("[QuizGameplayState] No quedan más preguntas disponibles. Transicionando a ResultsState."),this.isExitingOrChangingState=!0,this.uiManager.updateFeedback("¡Has completado todas las preguntas!","correct"),setTimeout(()=>{if(console.log("[QuizGameplayState] Timeout de fin de preguntas: Verificando estado antes de cambiar a Results..."),this.gameManager.getStateMachine().getCurrentStateName()==="QuizGameplay"){console.log("[QuizGameplayState] Timeout de fin de preguntas: Cambiando a estado ResultsState.");const s=this.quizSystem.getTotalQuestionsCount(),i=this.gameManager.getPlayerData();console.warn("[QuizGameplayState] Estimando respuestas correctas basado en puntaje. Implementar conteo real.");const t=Math.round(i.score/(this.BASE_POINTS_PER_CORRECT*1.2));this.gameManager.getStateMachine().changeState("Results",{score:i.score,correct:t,total:s},"gq-wipe-transition")}else console.log("[QuizGameplayState] Timeout de fin de preguntas: Estado ya cambió, no se transiciona a ResultsState.")},1500);return}this.hintAppliedToQuestionId=null;const e=this.gameManager.getContainerElement();if(!e){console.error("[QuizGameplayState] Contenedor #app no encontrado para displayNextQuestion.");return}try{console.log(`[QuizGameplayState] Llamando a uiManager.buildQuizInterface para pregunta ID: ${this.currentQuestion.id}`),this.uiManager.buildQuizInterface(this.currentQuestion,e,this.handleOptionClick.bind(this),this.consecutiveCorrectAnswers),this.gameManager.getPlayerData().hintCharges>0&&this.currentQuestion&&(console.log("[QuizGameplayState] Aplicando visuales de pista."),this.uiManager.applyHintVisuals(this.currentQuestion.correctAnswerKey),this.hintAppliedToQuestionId=this.currentQuestion.id),console.log(`[QuizGameplayState] displayNextQuestion() FINALIZADO para pregunta ID: ${this.currentQuestion.id}`)}catch(s){console.error("[QuizGameplayState] Error construyendo la interfaz del quiz:",s),this.uiManager.updateFeedback("Error al mostrar la pregunta.","info")}}handleOptionClick(e){var t;const a=((t=this.currentQuestion)==null?void 0:t.id)||"N/A";if(console.log(`[QuizGameplayState] handleOptionClick() INICIADO con key: ${e} para pregunta ${a}. isExiting: ${this.isExitingOrChangingState}, isWaitingExpl: ${this.isWaitingForExplanationConfirm}, timeoutId: ${this.nextQuestionTimeoutId}`),!this.currentQuestion||this.isExitingOrChangingState||this.isWaitingForExplanationConfirm||this.nextQuestionTimeoutId!==null){console.warn(`[QuizGameplayState] handleOptionClick IGNORADO (pregunta ${a}): noCurrentQ=${!this.currentQuestion}, isExiting=${this.isExitingOrChangingState}, isWaitingExpl=${this.isWaitingForExplanationConfirm}, timeoutPending=${this.nextQuestionTimeoutId!==null}`);return}console.log(`[QuizGameplayState] handleOptionClick: PROCEDIENDO con validación para pregunta ${a}.`),this.uiManager.disableOptions(),console.log(`[QuizGameplayState] Opciones deshabilitadas para pregunta ${a}.`);const s=this.quizSystem.validateAnswer(this.currentQuestion.id,e),i=this.gameManager.getPlayerData();this.hintAppliedToQuestionId===this.currentQuestion.id&&(i.hintCharges>0&&(i.hintCharges--,this.uiManager.updateHintIcon(i.hintCharges),console.log("[QuizGameplayState] Carga de pista descontada.")),this.hintAppliedToQuestionId=null),s===!0?(console.log(`[QuizGameplayState] Respuesta CORRECTA (pregunta ${a}). Llamando a handleCorrectAnswer.`),this.handleCorrectAnswer(this.currentQuestion.difficulty)):s===!1?(console.log(`[QuizGameplayState] Respuesta INCORRECTA (pregunta ${a}). Llamando a handleIncorrectAnswer.`),this.handleIncorrectAnswer()):(console.error(`[QuizGameplayState] Error al validar la respuesta (isCorrect es null) para pregunta ${a}.`),this.uiManager.updateFeedback("Error al validar la respuesta.","info"),this.hintAppliedToQuestionId=null,this.proceedToNextStep()),console.log(`[QuizGameplayState] handleOptionClick() FINALIZADO para key: ${e} (pregunta ${a}).`)}rebuildInterface(){if(console.log(`[QuizGameplayState] rebuildInterface() INICIADO. isExitingOrChangingState: ${this.isExitingOrChangingState}`),this.isExitingOrChangingState)return;const e=this.gameManager.getContainerElement();if(this.currentQuestion&&e){console.log("[QuizGameplayState] Reconstruyendo interfaz para pregunta ID:",this.currentQuestion.id);const a=this.uiManager.isExplanationVisible(),s=this.uiManager.externalConfirmCallback,i=this.lastAnswerResultType;if(this.uiManager.buildQuizInterface(this.currentQuestion,e,this.handleOptionClick.bind(this),this.consecutiveCorrectAnswers),this.hintAppliedToQuestionId===this.currentQuestion.id&&this.uiManager.applyHintVisuals(this.currentQuestion.correctAnswerKey),a&&this.currentQuestion.explanation){console.log("[UIManager] Reconstruyendo interfaz: Restaurando explicación visible.");const t=s??(()=>{this.gameManager.getStateMachine().getCurrentStateName()==="QuizGameplay"&&this.proceedToNextStep()});this.uiManager.showExplanation(this.currentQuestion.explanation,t,i)}}else console.warn("[QuizGameplayState] No se puede reconstruir, falta pregunta actual o contenedor.")}getPreferredEnterAnimation(){return"gq-wipe-transition"}getPreferredExitAnimation(){return"gq-wipe-transition"}}var Qi=Object.defineProperty,Hi=Object.getOwnPropertyDescriptor,Ke=(f,e,a,s)=>{for(var i=s>1?void 0:s?Hi(e,a):e,t=f.length-1,n;t>=0;t--)(n=f[t])&&(i=(s?n(e,a,i):n(i))||i);return s&&i&&Qi(e,a,i),i};let Ie=class extends R{constructor(){super(...arguments),this.optionKey="",this.optionText="Opción",this.disabled=!1,this.hinted=!1}render(){return B`
      <button
        class="option-button-internal" 
        ?disabled=${this.disabled||this.hinted}
        @click=${this._handleClick}
        @touchstart=${this._handleClick}
        part="button"
      >
        ${this.optionText}
      </button>
    `}_handleClick(f){f.type==="touchstart"&&f.preventDefault(),!(this.disabled||this.hinted)&&this.dispatchEvent(new CustomEvent("option-selected",{detail:{key:this.optionKey},bubbles:!0,composed:!0}))}};Ie.styles=V`
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
  `;Ke([$({type:String})],Ie.prototype,"optionKey",2);Ke([$({type:String})],Ie.prototype,"optionText",2);Ke([$({type:Boolean,reflect:!0})],Ie.prototype,"disabled",2);Ke([$({type:Boolean,reflect:!0})],Ie.prototype,"hinted",2);Ie=Ke([G("quiz-option-button")],Ie);var Wi=Object.defineProperty,ji=Object.getOwnPropertyDescriptor,ne=(f,e,a,s)=>{for(var i=s>1?void 0:s?ji(e,a):e,t=f.length-1,n;t>=0;t--)(n=f[t])&&(i=(s?n(e,a,i):n(i))||i);return s&&i&&Wi(e,a,i),i};const wt=1,Ki=10,Yi=50,Xi=200,Zi=1e3,Ji=5e3,en=5,tn=10,an=20,nn=50,on=100;let J=class extends R{constructor(){super(),this.score=0,this.combo=0,this._flareIntensity=0,this._shouldPulse=!1,this._scoreColor="var(--gq-scoredisp-text-color-base, #f3f4f6)",this._scoreWeight=800,this._displayScore=0,this._targetScore=0,this._isAnimatingScore=!1,this._scoreAnimationId=null}connectedCallback(){super.connectedCallback(),this.score!==void 0&&!this._isAnimatingScore&&this._displayScore!==this.score&&(this._displayScore=this.score,this._targetScore=this.score)}updated(f){if(super.updated(f),f.has("combo")&&this._calculateEffects(),f.has("score")){const e=f.get("score"),a=this.score;e===void 0&&a!==void 0?(this._displayScore=a,this._targetScore=a,this._isAnimatingScore=!1,this._scoreAnimationId&&(cancelAnimationFrame(this._scoreAnimationId),this._scoreAnimationId=null),a!==0&&this._animateScoreUpdate(0,a)):a!==e&&this._animateScoreUpdate(this._displayScore,a)}}_calculateEffects(){this._flareIntensity=this.combo<wt?0:Math.min((this.combo-wt+1)/(Ki-wt+1),1),this._shouldPulse=this._flareIntensity>.3;const f=Math.min(this.combo/10,1),e=parseFloat(getComputedStyle(this).getPropertyValue("--gq-scoredisp-font-weight-base").trim()||"700"),a=parseFloat(getComputedStyle(this).getPropertyValue("--gq-scoredisp-font-weight-increment").trim()||"100"),s=parseFloat(getComputedStyle(this).getPropertyValue("--gq-scoredisp-font-weight-max-steps").trim()||"2");this._scoreWeight=e+Math.floor(f*s)*a;const i=getComputedStyle(this).getPropertyValue("--gq-scoredisp-text-color-base").trim()||"#f3f4f6",t=parseFloat(getComputedStyle(this).getPropertyValue("--gq-scoredisp-text-color-combo-hue-offset").trim()||"180"),n=getComputedStyle(this).getPropertyValue("--gq-scoredisp-text-color-combo-saturation").trim()||"80%",l=parseFloat(getComputedStyle(this).getPropertyValue("--gq-scoredisp-text-color-combo-lightness-base").trim()||"90"),r=parseFloat(getComputedStyle(this).getPropertyValue("--gq-scoredisp-text-color-combo-lightness-factor").trim()||"10"),g=parseFloat(getComputedStyle(this).getPropertyValue("--gq-body-bg-combo-hue-base").trim()||"220"),c=l+f*r,u=((g+this.combo*parseFloat(getComputedStyle(this).getPropertyValue("--gq-combo-color-hue-increment").trim()||"10"))%360+t)%360;this._scoreColor=this.combo<2?i:`hsl(${u}, ${n}, ${c}%)`}_animateScoreUpdate(f,e){this._scoreAnimationId&&cancelAnimationFrame(this._scoreAnimationId),this._displayScore=f,this._targetScore=e,this._isAnimatingScore=!0;const a=()=>{if(this._targetScore!==this.score){this._scoreAnimationId&&cancelAnimationFrame(this._scoreAnimationId),this._animateScoreUpdate(this._displayScore,this.score);return}const s=this._targetScore-this._displayScore;if(s===0){this._isAnimatingScore=!1,this._scoreAnimationId=null,this.requestUpdate();return}let i=1;const t=Math.abs(s);t>Ji?i=Math.floor(t/on):t>Zi?i=Math.floor(t/nn):t>Xi?i=Math.floor(t/an):t>Yi?i=Math.floor(t/tn):t>10&&(i=Math.max(1,Math.floor(t/en))),i=Math.max(1,i),s<0&&(i=-i),Math.abs(i)>t&&(i=s),this._displayScore+=i,this._triggerPerStepEffects(),this.requestUpdate(),this._scoreAnimationId=requestAnimationFrame(a)};this._scoreAnimationId=requestAnimationFrame(a)}_triggerPerStepEffects(){this._scoreTextElement&&(this._scoreTextElement.classList.remove("score-increment-jolt"),this._scoreTextElement.offsetWidth,this._scoreTextElement.classList.add("score-increment-jolt")),this._scorePulseElement&&(this._scorePulseElement.classList.remove("pulsing-step"),this._scorePulseElement.offsetWidth,this._scorePulseElement.classList.add("pulsing-step"))}_triggerPulseAnimation(){this._scorePulseElement&&(this._scorePulseElement.classList.remove("pulsing"),this._scorePulseElement.offsetWidth,this._scorePulseElement.classList.add("pulsing"))}render(){return B`
      <style>
        :host {
          /* Inyectar las variables finales para la animación del texto (flare) */
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
          text-shadow: var(--final-flare-shadow);
        }
      </style>
      <span class="score-emoji" part="emoji" aria-hidden="true">⭐</span>
      <span
        id="score-text-internal"
        part="text"
        class="${this._shouldPulse?"score-pulsing":""} ${this._isAnimatingScore&&this._displayScore!==this._targetScore,""}"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        ${Math.round(this._displayScore)}
      </span>
      <div id="score-pulse-internal" part="pulse-effect" aria-hidden="true"></div>
    `}};J.styles=V`
    :host {
      display: inline-flex;
      align-items: center;
      position: relative;
      font-family: var(--gq-scoredisp-font-family, var(--gq-font-primary, 'Poppins', sans-serif));
      /* Variable para el color del pulso pequeño */
      --gq-scoredisp-pulse-step-color: var(--gq-scoredisp-pulse-step-color-override, rgba(255, 220, 100, 0.6));
    }

    .score-emoji {
      font-size: var(--gq-scoredisp-emoji-size, 1.5rem);
      line-height: 1;
      margin-right: var(--gq-scoredisp-emoji-margin-right, 0.3rem);
      user-select: none;
    }

    #score-text-internal {
      transition: color 0.5s ease, font-weight 0.5s ease, text-shadow 0.6s ease-out;
      font-size: var(--gq-scoredisp-text-font-size, var(--score-font-size, 2rem));
      line-height: var(--gq-scoredisp-text-line-height, var(--score-line-height, 1.1));
      text-align: center;
      min-width: 1ch;
      user-select: none;
      /* font-weight y color se aplican dinámicamente */
      /* text-shadow se aplica dinámicamente mediante variables CSS inyectadas en render() */
    }

    /* Animación de pulso de texto original (basada en combo) */
    @keyframes pulseFlareInternal {
      0%, 100% { text-shadow: var(--final-flare-shadow); opacity: 1; }
      50% { text-shadow: var(--final-flare-shadow-pulse); opacity: 0.85; }
    }

    #score-text-internal.score-pulsing {
      animation: pulseFlareInternal 1.5s infinite ease-in-out;
    }

    /* Efecto de "sacudida" para cada incremento de puntuación */
    @keyframes scoreJolt {
      0%, 100% { transform: translate(0, 0) scale(1); }
      25% { transform: translate(-1px, -1px) scale(1.03); } /* Ligera sacudida y aumento */
      50% { transform: translate(1px, 1px) scale(0.97); }  /* Sacudida en otra dirección y encogimiento */
      75% { transform: translate(1px, -1px) scale(1.02); }
    }
    #score-text-internal.score-increment-jolt {
      animation: scoreJolt 0.07s ease-in-out; /* Duración muy corta */
    }


    #score-pulse-internal {
      position: absolute;
      left: 50%; top: 50%;
      transform: translate(-50%, -50%) scale(0);
      width: 1px; height: 1px; /* El tamaño se controla con scale */
      border-radius: 50%;
      background-color: var(--gq-scoredisp-pulse-effect-bg, rgba(255, 255, 255, 0.7));
      opacity: 0;
      z-index: -1;
      pointer-events: none;
    }

    /* Animación de pulso grande original (al cambiar score, ahora opcional o para fin de animación) */
    @keyframes scorePulseAnimInternal {
      0% { transform: translate(-50%, -50%) scale(0); opacity: 0.7; }
      100% { transform: translate(-50%, -50%) scale(200); opacity: 0; }
    }
    #score-pulse-internal.pulsing {
        animation: scorePulseAnimInternal 0.6s ease-out forwards;
    }

    /* Animación de pulso PEQUEÑO para cada paso de la animación del score */
    @keyframes scoreStepPulseAnim {
      0% { transform: translate(-50%, -50%) scale(0); opacity: 0.5; }
      100% { transform: translate(-50%, -50%) scale(60); opacity: 0; } /* Escala más pequeña y rápida */
    }
    #score-pulse-internal.pulsing-step {
      background-color: var(--gq-scoredisp-pulse-step-color); /* Color diferente para el pulso pequeño */
      animation: scoreStepPulseAnim 0.25s ease-out forwards; /* Animación más rápida */
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
  `;ne([$({type:Number})],J.prototype,"score",2);ne([$({type:Number})],J.prototype,"combo",2);ne([U()],J.prototype,"_flareIntensity",2);ne([U()],J.prototype,"_shouldPulse",2);ne([U()],J.prototype,"_scoreColor",2);ne([U()],J.prototype,"_scoreWeight",2);ne([U()],J.prototype,"_displayScore",2);ne([U()],J.prototype,"_targetScore",2);ne([U()],J.prototype,"_isAnimatingScore",2);ne([ae("#score-text-internal")],J.prototype,"_scoreTextElement",2);ne([ae("#score-pulse-internal")],J.prototype,"_scorePulseElement",2);J=ne([G("score-display")],J);var sn=Object.defineProperty,rn=Object.getOwnPropertyDescriptor,ft=(f,e,a,s)=>{for(var i=s>1?void 0:s?rn(e,a):e,t=f.length-1,n;t>=0;t--)(n=f[t])&&(i=(s?n(e,a,i):n(i))||i);return s&&i&&sn(e,a,i),i};let $e=class extends R{constructor(){super(...arguments),this.lives=3,this.hasShield=!1,this.hintCharges=0}render(){const f=this.hintCharges>0;return B`
      <div class="lives-stack" part="lives-stack">
        <span class="life-emoji" part="heart-icon">❤️</span>
        <span id="lives-count-internal" part="count">${this.lives}</span>
      </div>
      <span
        class="status-icon shield-icon"
        part="shield-icon"
        ?hidden=${!this.hasShield}
        title="Escudo Activo"
      >🛡️</span>
      <span
        class="status-icon hint-icon"
        part="hint-icon"
        ?hidden=${!f}
        title="Pista Disponible"
      >💡</span>
    `}};$e.styles=V`
    :host {
      display: inline-flex;
      align-items: center;
      gap: var(--gq-livesdisp-gap, 0.5rem);
      font-family: var(--gq-livesdisp-font-family, var(--gq-font-primary, 'Poppins', sans-serif));
      color: var(--gq-livesdisp-text-color, #f3f4f6);
      user-select: none;
    }

    .lives-stack {
      position: relative; /* Contenedor para posicionar el número absolutamente */
      display: inline-flex; /* Para que el tamaño se ajuste al contenido (el corazón) */
      justify-content: center;
      align-items: center;
      /* El tamaño del stack será dictado por el tamaño del corazón */
      width: var(--gq-livesdisp-icon-size, 1.8rem);
      height: var(--gq-livesdisp-icon-size, 1.8rem);
    }

    #lives-count-internal {
      position: absolute; /* Posicionar sobre el corazón */
      top: 56%;
      left: 50%;
      transform: translate(-50%, -50%); /* Centrar exactamente sobre el corazón */
      font-size: var(--gq-livesdisp-count-font-size, var(--gq-livesdisp-icon-size, 1.8rem));
      font-weight: var(--gq-livesdisp-count-font-weight, 700);
      color: var(--gq-livesdisp-text-color, #f3f4f6); /* Asegurar que el color del texto sea visible */
      z-index: 1; /* Asegurar que esté por encima del corazón */
      line-height: 1; /* Para un centrado vertical más predecible del texto */
      text-align: center;
      /* Opcional: añadir una pequeña sombra al texto para mejorar la legibilidad sobre el corazón */
      text-shadow:
                -2px -2px 0 #000,
                2px -2px 0 #000,
                -2px 2px 0 #000,
                2px 2px 0 #000,
                -3px 0px 0 #000,
                3px 0px 0 #000,
                0px -3px 0 #000,
                0px 3px 0 #000;
    }

    .life-emoji {
      font-size: 2.6rem; /* Tamaño base del corazón */
      line-height: 1;
      color: var(--gq-livesdisp-heart-color, #f43f5e);
      animation: pulseHeart 1.5s infinite ease-in-out;
      user-select: none;
      /* Asegurar que el emoji en sí esté centrado si tiene espaciado interno */
      display: flex;
      align-items: center;
      justify-content: center;
    }

    @keyframes pulseHeart {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.15); }
    }

    .status-icon {
      font-size: var(--gq-livesdisp-icon-size, 1.8rem); /* Los iconos de estado también usan esta variable */
      line-height: 1;
      margin-left: var(--gq-livesdisp-status-icon-margin-left, 0.2rem);
      display: inline-block;
      user-select: none;
    }

    .shield-icon {
      filter: drop-shadow(0 0 3px var(--gq-livesdisp-shield-icon-shadow-color, rgba(59, 130, 246, 0.7)));
      animation: shieldPulse 2s infinite ease-in-out;
    }

    .hint-icon {
      filter: drop-shadow(0 0 3px var(--gq-livesdisp-hint-icon-shadow-color, rgba(250, 204, 21, 0.7)));
      animation: hintPulse 1.8s infinite ease-in-out;
    }

    @keyframes shieldPulse {
      0%, 100% { transform: scale(1); opacity: 0.9; }
      50% { transform: scale(1.1); opacity: 1; }
    }
    @keyframes hintPulse {
      0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.85; }
      50% { transform: scale(1.08) rotate(5deg); opacity: 1; }
    }

    [hidden] { display: none !important; }
`;ft([$({type:Number})],$e.prototype,"lives",2);ft([$({type:Boolean})],$e.prototype,"hasShield",2);ft([$({type:Number})],$e.prototype,"hintCharges",2);$e=ft([G("lives-display")],$e);var ln=Object.defineProperty,cn=Object.getOwnPropertyDescriptor,Ye=(f,e,a,s)=>{for(var i=s>1?void 0:s?cn(e,a):e,t=f.length-1,n;t>=0;t--)(n=f[t])&&(i=(s?n(e,a,i):n(i))||i);return s&&i&&ln(e,a,i),i};let Ae=class extends R{constructor(){super(...arguments),this.currentInk=0,this.maxInkPerBar=1e3,this._fullBarsCompleted=0,this._currentBarPercentage=0}updated(f){super.updated(f),(f.has("currentInk")||f.has("maxInkPerBar"))&&(this._calculateBarState(),this.requestUpdate())}_getRainbowColor(f,e){return getComputedStyle(this).getPropertyValue(`--gq-inkbar-rainbow-color-${f+1}`).trim()||e}_calculateBarState(){const f=Math.max(0,this.currentInk),e=this.maxInkPerBar>0?this.maxInkPerBar:1e3;this._fullBarsCompleted=Math.floor(f/e);const a=f%e;f===0?(this._currentBarPercentage=0,this._fullBarsCompleted=0):a===0?(this._currentBarPercentage=100,this._fullBarsCompleted=Math.max(0,Math.floor(f/e)-1)):this._currentBarPercentage=a/e*100}render(){const f=getComputedStyle(this).getPropertyValue("--gq-inkbar-bg-default").trim()||"#374151",e=getComputedStyle(this).getPropertyValue("--gq-inkbar-rainbow-color-1").trim()||"#a78bfa",a=7,s=this._fullBarsCompleted>0?this._getRainbowColor((this._fullBarsCompleted-1)%a,f):f,i=this._getRainbowColor(this._fullBarsCompleted%a,e);return B`
      <style>
        :host {
          /* Estas variables son locales al shadow DOM y se usan por los estilos estáticos */
          --final-container-bg-color: ${s};
          --final-segment-bg-color: ${i};
        }
      </style>
      <div
        class="ink-bar-segment"
        part="segment"
        style="width: ${this._currentBarPercentage}%;"
      ></div>
    `}};Ae.styles=V`
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
  `;Ye([$({type:Number})],Ae.prototype,"currentInk",2);Ye([$({type:Number})],Ae.prototype,"maxInkPerBar",2);Ye([U()],Ae.prototype,"_fullBarsCompleted",2);Ye([U()],Ae.prototype,"_currentBarPercentage",2);Ae=Ye([G("ink-bar")],Ae);var dn=Object.defineProperty,hn=Object.getOwnPropertyDescriptor,Xe=(f,e,a,s)=>{for(var i=s>1?void 0:s?hn(e,a):e,t=f.length-1,n;t>=0;t--)(n=f[t])&&(i=(s?n(e,a,i):n(i))||i);return s&&i&&dn(e,a,i),i};const it={1:{name:"COMÚN",classSuffix:"1"},2:{name:"POCO COMÚN",classSuffix:"2"},3:{name:"RARA",classSuffix:"3"},4:{name:"ÉPICA",classSuffix:"4"},5:{name:"LEGENDARIA",classSuffix:"5"},easy:{name:"FÁCIL",classSuffix:"easy"},medium:{name:"MEDIO",classSuffix:"medium"},hard:{name:"DIFÍCIL",classSuffix:"hard"}};let qe=class extends R{constructor(){super(...arguments),this.difficulty="1",this.questionText="Cargando pregunta...",this._difficultyName=it[1].name,this._difficultyClassSuffix=it[1].classSuffix}updated(f){super.updated(f),f.has("difficulty")&&this._updateDifficultyDisplayData()}_updateDifficultyDisplayData(){const f=it[this.difficulty]||it[1];this._difficultyName=f.name,this._difficultyClassSuffix=f.classSuffix}render(){const f=`difficulty-level-${this._difficultyClassSuffix}`;return B`
          <div class="question-box-internal">
            <div class="card__content">
              <span
                class="difficulty-label ${f}"
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
          overflow: visible; 
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
      `;Xe([$({type:String})],qe.prototype,"difficulty",2);Xe([$({type:String})],qe.prototype,"questionText",2);Xe([U()],qe.prototype,"_difficultyName",2);Xe([U()],qe.prototype,"_difficultyClassSuffix",2);qe=Xe([G("quiz-question-display")],qe);var un=Object.defineProperty,pn=Object.getOwnPropertyDescriptor,Lt=(f,e,a,s)=>{for(var i=s>1?void 0:s?pn(e,a):e,t=f.length-1,n;t>=0;t--)(n=f[t])&&(i=(s?n(e,a,i):n(i))||i);return s&&i&&un(e,a,i),i};let Ve=class extends R{constructor(){super(...arguments),this.message="",this.type=null}render(){const f={"feedback-text":!0,correct:this.type==="correct",incorrect:this.type==="incorrect",shield:this.type==="shield",info:this.type==="info"};return B`
      <div class=${Pt(f)} part="text">
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
  `;Lt([$({type:String})],Ve.prototype,"message",2);Lt([$({type:String})],Ve.prototype,"type",2);Ve=Lt([G("feedback-area")],Ve);var gn=Object.defineProperty,fn=Object.getOwnPropertyDescriptor,Ea=(f,e,a,s)=>{for(var i=s>1?void 0:s?fn(e,a):e,t=f.length-1,n;t>=0;t--)(n=f[t])&&(i=(s?n(e,a,i):n(i))||i);return s&&i&&gn(e,a,i),i};let dt=class extends R{constructor(){super(...arguments),this.isFaded=!1}render(){return B`
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
      /*
       * MODIFICACIÓN:
       * - Cambiado a position: fixed para anclarlo a la parte superior.
       * - Añadido 'top', 'left', 'transform' para centrarlo horizontalmente y fijar la distancia superior.
       * - Eliminado 'margin-top' ya que 'top' lo maneja.
       * - 'pointer-events: auto' se mantiene para que el contenedor sea interactivo por defecto.
       */
      display: flex;
      flex-direction: column;
      align-items: center;
      position: fixed; /* Anclado al viewport */
      top: 7vh; /* Distancia fija desde la parte superior (ej. 5% de la altura del viewport) */
               /* Puedes cambiarlo a un valor en px si prefieres, ej: top: 20px; */
      left: 50%; /* Para centrar horizontalmente */
      transform: translateX(-50%); /* Para centrar horizontalmente */
      width: 90%;
      max-width: 600px;
      box-sizing: border-box;
      padding: 0 1rem;
      background-color: transparent;
      transition: opacity 0.25s ease-in-out;
      pointer-events: auto;
      z-index: 20; /* Asegurar que esté por encima del cat-display-area pero debajo de overlays */
    }

    :host([isFaded]) {
      opacity: 0.3;
      pointer-events: none;
    }

    .top-ui-container-internal {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 1rem;
    }

    .status-row-internal {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem 0;
        gap: 0.5rem;
    }
    
    .ink-area-internal {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.2rem;
        margin-top: 0.5rem;
        /*
         * MODIFICACIÓN:
         * - Añadido min-height para reservar espacio para la etiqueta de tinta y la barra.
         * Ajusta este valor según el tamaño combinado de la etiqueta y la barra.
         * Por ejemplo, si la etiqueta es ~0.8rem y la barra ~0.5rem + gap, podría ser ~1.5rem o 2rem.
         */
        min-height: 2rem; /* Ejemplo: Ajusta este valor según sea necesario */
                          /* Esto asegura que el espacio esté siempre ocupado. */
    }


    .quiz-content-wrapper-internal {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      /*
       * MODIFICACIÓN:
       * - Añadido overflow-y: auto y max-height para que el contenido scrollee
       * si excede la altura disponible, manteniendo el contenedor principal fijo.
       * El max-height debe calcularse considerando la posición 'top' y el espacio
       * que quieras dejar en la parte inferior. (ej. 90vh - top - padding_inferior_deseado)
       */
      overflow-y: auto;
      max-height: calc(95vh - 5vh - 2rem); /* 95vh (altura casi total) - 5vh (top) - 2rem (padding inferior deseado) */
                                          /* Ajusta estos valores según tus necesidades */
      scrollbar-width: thin; /* Para Firefox */
      scrollbar-color: rgba(150,150,150,0.5) transparent; /* Para Firefox */
    }
    .quiz-content-wrapper-internal::-webkit-scrollbar {
        width: 8px;
    }
    .quiz-content-wrapper-internal::-webkit-scrollbar-thumb {
        background-color: rgba(150,150,150,0.5);
        border-radius: 4px;
    }
     .quiz-content-wrapper-internal::-webkit-scrollbar-track {
        background: transparent;
    }


    .quiz-scrollable-content-internal {
      width: 100%;
      padding: var(--gq-scrollable-content-glow-padding, 5px); /* Ajusta el valor según necesites */
      box-sizing: border-box;
    }

    .options-container-internal {
      display: flex;
      flex-direction: column;
      gap: var(--gq-options-gap, 0.75rem);
      width: 100%;
      margin-top: var(--gq-options-margin-top, 1rem);
      margin-bottom: var(--gq-options-margin-bottom, 1rem);
    }

    /*
     * MODIFICACIÓN:
     * - Eliminadas las media queries que ajustaban 'margin-top' ya que ahora se usa 'top' fijo.
     * - Se mantiene el ajuste de 'width' y 'padding' para pantallas pequeñas.
     */
    @media (max-width: 768px) {
      :host {
        padding: 0 0.5rem;
        width: calc(100% - 1rem); /* Ajustar para que el padding no cause overflow si el max-width es mayor */
        /* top: 7vh;  Si quieres un 'top' diferente para tablet, ajústalo aquí */
      }
    }
     @media (max-width: 480px) {
       :host {
         /* top: 5vh; Si quieres un 'top' diferente para móvil, ajústalo aquí */
       }
     }
  `;Ea([$({type:Boolean,reflect:!0})],dt.prototype,"isFaded",2);dt=Ea([G("quiz-ui-container")],dt);var mn=Object.defineProperty,vn=Object.getOwnPropertyDescriptor,ye=(f,e,a,s)=>{for(var i=s>1?void 0:s?vn(e,a):e,t=f.length-1,n;t>=0;t--)(n=f[t])&&(i=(s?n(e,a,i):n(i))||i);return s&&i&&mn(e,a,i),i};let de=class extends R{constructor(){super(...arguments),this.explanationText="",this.resultType=null,this.isVisible=!1,this._statusText="",this._statusIcon="",this._statusClass="",this._handleConfirm=f=>{if(!this.isVisible)return;const e=(f instanceof MouseEvent||f instanceof TouchEvent)&&f.target===this,a=f instanceof KeyboardEvent;if(!(!a&&!e)){if(a){const s=f.key;if(s!=="Enter"&&s!==" "&&s!=="Escape")return}f.stopPropagation(),(f.type==="touchstart"||f.type==="click")&&f.preventDefault(),this.dispatchEvent(new CustomEvent("confirm-clicked",{bubbles:!0,composed:!0}))}}}updated(f){super.updated(f),f.has("resultType")&&this._updateStatusContent(),f.has("isVisible")&&(f.get("isVisible"),this.isVisible?this.setAttribute("visible",""):this.removeAttribute("visible"),this._handleVisibilityChange())}_updateStatusContent(){switch(this.resultType){case"correct":this._statusText="¡Respuesta Correcta!",this._statusIcon="✅",this._statusClass="status-correct";break;case"incorrect":this._statusText="Respuesta Incorrecta",this._statusIcon="❌",this._statusClass="status-incorrect";break;case"shield":this._statusText="¡Escudo Activado!",this._statusIcon="🛡️",this._statusClass="status-shield";break;default:this._statusText="",this._statusIcon="",this._statusClass=""}}_handleVisibilityChange(){const f=this._handleConfirm,e=window,a=this;this.isVisible?this.hasAttribute("listeners-added")||(a.addEventListener("click",f),a.addEventListener("touchstart",f,{passive:!1}),e.addEventListener("keydown",f),this.setAttribute("listeners-added","")):this.hasAttribute("listeners-added")&&(a.removeEventListener("click",f),a.removeEventListener("touchstart",f),e.removeEventListener("keydown",f),this.removeAttribute("listeners-added"))}disconnectedCallback(){if(super.disconnectedCallback(),this.hasAttribute("listeners-added")){const f=this._handleConfirm;this.removeEventListener("click",f),this.removeEventListener("touchstart",f),window.removeEventListener("keydown",f),this.removeAttribute("listeners-added")}}render(){const f={"explanation-status-base":!0,[this._statusClass]:!!this._statusClass};return B`
      <div class="overlay-content-wrapper" part="wrapper">
        ${this._statusText?B`
          <p class=${Pt(f)} part="status">
            ${this._statusIcon} ${this._statusText}
          </p>
        `:N}
        <div class="explanation-text" part="text" tabindex="0"> ${this.explanationText}
        </div>
        <p class="continue-prompt" part="prompt">(Toca para continuar ...)</p> </div>
    `}};de.styles=V`
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
  `;ye([$({type:String})],de.prototype,"explanationText",2);ye([$({type:String})],de.prototype,"resultType",2);ye([$({type:Boolean})],de.prototype,"isVisible",2);ye([U()],de.prototype,"_statusText",2);ye([U()],de.prototype,"_statusIcon",2);ye([U()],de.prototype,"_statusClass",2);ye([ae(".overlay-content-wrapper")],de.prototype,"_contentWrapper",2);de=ye([G("explanation-overlay-component")],de);const Et=1,yn=10,Mt=2,bn=10,da=1,xn=20;class Cn{constructor(e){this.currentUIElements={},this.optionClickCallback=null,this.explanationConfirmListener=null,this.externalConfirmCallback=null,this.lastShownResultType=null,this.gameManager=e,console.log("UIManager Creado.")}buildQuizInterface(e,a,s,i){var r;if(!e){console.error("UIManager: Intento de construir UI sin pregunta.");return}this.optionClickCallback=s;const t=this.gameManager.getPlayerData();let n=this.currentUIElements.quizUiContainer;if(!n||!a.contains(n)){console.log("[UIManager] Creando nuevo quiz-ui-container y elementos estructurales."),a.innerHTML="",n=document.createElement("quiz-ui-container"),a.appendChild(n),this.currentUIElements={quizUiContainer:n,optionButtons:[]},this.currentUIElements.livesDisplay=document.createElement("lives-display"),this.currentUIElements.livesDisplay.slot="lives-display",n.appendChild(this.currentUIElements.livesDisplay),this.currentUIElements.scoreDisplay=document.createElement("score-display"),this.currentUIElements.scoreDisplay.slot="score-display",n.appendChild(this.currentUIElements.scoreDisplay),this.currentUIElements.inkLabel=document.createElement("div"),this.currentUIElements.inkLabel.id="ink-label",this.currentUIElements.inkLabel.className="ink-label-base hidden",this.currentUIElements.inkLabel.textContent="Tinta",this.currentUIElements.inkLabel.slot="ink-label",n.appendChild(this.currentUIElements.inkLabel),this.currentUIElements.inkBarContainer=document.createElement("ink-bar"),this.currentUIElements.inkBarContainer.classList.add("hidden"),this.currentUIElements.inkBarContainer.slot="ink-bar",n.appendChild(this.currentUIElements.inkBarContainer),this.currentUIElements.questionBox=document.createElement("quiz-question-display"),this.currentUIElements.questionBox.slot="question-display",n.appendChild(this.currentUIElements.questionBox),this.currentUIElements.optionsContainer=document.createElement("div"),this.currentUIElements.optionsContainer.slot="options",this.currentUIElements.optionsContainer.style.display="flex",this.currentUIElements.optionsContainer.style.flexDirection="column";const g=getComputedStyle(document.documentElement).getPropertyValue("--gq-options-gap").trim()||"0.75rem";this.currentUIElements.optionsContainer.style.gap=g,this.currentUIElements.optionsContainer.style.width="100%",n.appendChild(this.currentUIElements.optionsContainer),this.currentUIElements.feedbackArea=document.createElement("feedback-area"),this.currentUIElements.feedbackArea.slot="feedback-area",n.appendChild(this.currentUIElements.feedbackArea),this.currentUIElements.explanationOverlayComponent=document.getElementById("explanation-overlay-component"),this.currentUIElements.blurBackdrop=document.getElementById("blur-backdrop")}else console.log("[UIManager] Reutilizando quiz-ui-container existente.");if(this.currentUIElements.livesDisplay&&(this.currentUIElements.livesDisplay.lives=this.gameManager.getLives(),this.currentUIElements.livesDisplay.hasShield=t.hasShield,this.currentUIElements.livesDisplay.hintCharges=t.hintCharges),this.currentUIElements.scoreDisplay&&(this.currentUIElements.scoreDisplay.score=t.score,this.currentUIElements.scoreDisplay.combo=i),this.currentUIElements.inkBarContainer&&(this.currentUIElements.inkBarContainer.currentInk=t.currentInk,this.currentUIElements.inkBarContainer.maxInkPerBar=t.INK_BAR_CAPACITY),this.currentUIElements.inkLabel&&this.updateInkVisibility(t.isDrawingUnlocked),this.currentUIElements.questionBox?(this.currentUIElements.questionBox.difficulty=e.difficulty,this.currentUIElements.questionBox.questionText=e.text):console.error("UIManager: Referencia a questionBox no encontrada."),this.currentUIElements.optionsContainer){this.currentUIElements.optionsContainer.innerHTML="",this.currentUIElements.optionButtons=[];const g=[...e.options];for(let c=g.length-1;c>0;c--){const p=Math.floor(Math.random()*(c+1));[g[c],g[p]]=[g[p],g[c]]}g.forEach(c=>{if(!(c!=null&&c.key)||typeof c.text>"u"){console.warn("Opción de pregunta inválida:",c);return}const p=document.createElement("quiz-option-button");p.optionKey=c.key,p.optionText=c.text,p.disabled=!1,p.hinted=!1,p.addEventListener("option-selected",u=>{var d;const o=u;this.optionClickCallback&&((d=o.detail)!=null&&d.key)&&this.optionClickCallback(o.detail.key)}),this.currentUIElements.optionsContainer.appendChild(p),this.currentUIElements.optionButtons.push(p)})}else console.error("UIManager: Contenedor de opciones no encontrado.");this.currentUIElements.feedbackArea&&this.updateFeedback("",null),this.updateComboVisuals(i),this.updateCatFoodBar(t.currentCatFood,t.getMaxCatFood()),this.toggleCatFoodUIVisibility(t.isCatFoodUnlocked);const l=(r=this.gameManager.getThemeManager())==null?void 0:r.getActiveTheme();this.applyThemeStylesToNonLitElements(l?l.elements:null)}applyThemeStylesToNonLitElements(e){const a=this.currentUIElements.inkLabel;if(a&&(e!=null&&e.inkLabel)){const s=e.inkLabel;if(s.themeClass){a.className="ink-label-base";const i=a.classList.contains("hidden");s.themeClass.split(" ").filter(t=>t).forEach(t=>{a.classList.contains(t)||a.classList.add(t)}),i&&a.classList.add("hidden")}s.text!==void 0&&a.textContent!==s.text&&(a.textContent=s.text),this.updateInkVisibility(this.gameManager.getPlayerData().isDrawingUnlocked)}}clearQuizInterface(e){console.log("[UIManager] clearQuizInterface llamado (limpieza parcial)."),this.removeExplanationListener(),this.optionClickCallback=null,this.currentUIElements.optionsContainer?(this.currentUIElements.optionsContainer.innerHTML="",console.log("[UIManager] Contenedor de opciones limpiado.")):console.warn("[UIManager] optionsContainer no encontrado en clearQuizInterface."),this.currentUIElements.optionButtons=[],this.currentUIElements.feedbackArea&&(this.updateFeedback("",null),console.log("[UIManager] Área de feedback reseteada."))}updateComboVisuals(e){var M;const a=document.documentElement,s=document.querySelector("combo-counter"),i=(M=this.currentUIElements)==null?void 0:M.scoreDisplay;if(!a)return;const t=e<Et?0:Math.min((e-Et+1)/(yn-Et+1),1);a.style.setProperty("--flare-intensity",t.toFixed(3));const n=e<Mt?0:Math.min((e-Mt+1)/(bn-Mt+1),1);a.style.setProperty("--element-glow-intensity",n.toFixed(3)),s&&(s.combo=e),i&&(i.combo=e);const l=Math.min(Math.max(0,e-da)/(xn-da),1),r=l*l,g=getComputedStyle(a),c=parseFloat(g.getPropertyValue("--gq-body-bg-combo-hue-base").trim()||"220"),p=parseFloat(g.getPropertyValue("--gq-body-bg-combo-saturation-base").trim()||"30"),u=parseFloat(g.getPropertyValue("--gq-body-bg-combo-saturation-factor").trim()||"50"),o=parseFloat(g.getPropertyValue("--gq-body-bg-combo-lightness-base").trim()||"10"),d=parseFloat(g.getPropertyValue("--gq-body-bg-combo-lightness-factor").trim()||"15"),h=parseFloat(g.getPropertyValue("--gq-combo-color-hue-increment").trim()||"10"),m=(c+e*h)%360,y=p+r*u,w=o+r*d;document.body.style.backgroundColor=`hsl(${m.toFixed(0)}, ${y.toFixed(0)}%, ${w.toFixed(0)}%)`}updateScoreDisplay(e){var a,s;(s=(a=this.currentUIElements)==null?void 0:a.scoreDisplay)==null||s.setAttribute("score",e.toString())}updateLivesDisplay(e){var a,s;(s=(a=this.currentUIElements)==null?void 0:a.livesDisplay)==null||s.setAttribute("lives",e.toString())}updateShieldIcon(e){var a,s;(s=(a=this.currentUIElements)==null?void 0:a.livesDisplay)==null||s.toggleAttribute("hasShield",e)}updateHintIcon(e){var a,s;(s=(a=this.currentUIElements)==null?void 0:a.livesDisplay)==null||s.setAttribute("hintCharges",e.toString())}updateInkBar(){var a;const e=(a=this.currentUIElements)==null?void 0:a.inkBarContainer;e&&(e.currentInk=this.gameManager.getPlayerData().currentInk)}updateInkVisibility(e){var a,s,i,t;(s=(a=this.currentUIElements)==null?void 0:a.inkLabel)==null||s.classList.toggle("hidden",!e),(t=(i=this.currentUIElements)==null?void 0:i.inkBarContainer)==null||t.classList.toggle("hidden",!e)}updateDifficultyLabel(e){var a,s;(s=(a=this.currentUIElements)==null?void 0:a.questionBox)==null||s.setAttribute("difficulty",String(e))}updateFeedback(e,a){var i;const s=(i=this.currentUIElements)==null?void 0:i.feedbackArea;s&&(s.message=e,s.type=a),this.lastShownResultType=a}disableOptions(){var e;(e=this.currentUIElements.optionButtons)==null||e.forEach(a=>{a&&(a.disabled=!0)})}enableOptions(){var e;(e=this.currentUIElements.optionButtons)==null||e.forEach(a=>{a&&(a.disabled=a.hinted)})}applyHintVisuals(e){let a=0;const s=1,i=this.currentUIElements.optionButtons;if(!i||i.length<=1)return;[...i].sort(()=>.5-Math.random()).forEach(n=>{a>=s||n&&n.optionKey!==e&&!n.hinted&&(n.hinted=!0,a++)})}toggleCatFoodUIVisibility(e){const a=this.gameManager.getControlElements().catFoodUiContainer;a&&a.classList.toggle("hidden",!e)}updateCatFoodBar(e,a){const s=this.gameManager.getControlElements().catFoodToolButton;if(s){const i=a>0?Math.max(0,Math.min(100,e/a*100)):0;s.progressPercentage=i}}showExplanation(e,a,s){var n,l;console.log("[UIManager] showExplanation llamada.");const i=(n=this.currentUIElements)==null?void 0:n.explanationOverlayComponent,t=(l=this.currentUIElements)==null?void 0:l.blurBackdrop;if(i){this.externalConfirmCallback=a;const r=s==="info"||s===void 0?null:s;i.explanationText=e,i.resultType=r,i.isVisible=!0,console.log("[UIManager] Añadiendo listener 'confirm-clicked' a overlayComponent..."),this.addExplanationListener(i),t?t.visible=!0:console.warn("[UIManager] BackdropComponent no encontrado al intentar hacerlo visible."),console.log("[UIManager] showExplanation: Propiedad isVisible del overlay establecida a true.")}else console.warn("UIManager: Componente de explicación no encontrado, confirmando directamente."),a()}hideExplanation(){var i,t,n;console.log("[UIManager] --> hideExplanation() LLAMADA <--");const e=(i=this.currentUIElements)==null?void 0:i.explanationOverlayComponent,a=(t=this.currentUIElements)==null?void 0:t.blurBackdrop;console.log("[UIManager] hideExplanation: Removiendo listener..."),this.removeExplanationListener();const s=((n=this.gameManager.getShopManager())==null?void 0:n.isShopOpen())??!1;a&&!s?(console.log("[UIManager] hideExplanation: Estableciendo backdrop.visible = false"),a.visible=!1):a?s&&console.log("[UIManager] hideExplanation: No ocultando backdrop porque la tienda está visible."):console.warn("[UIManager] hideExplanation: backdropComponent no encontrado."),e?e.isVisible=!1:console.warn("[UIManager] hideExplanation: overlayComponent no encontrado."),console.log("[UIManager] hideExplanation FINALIZADA.")}addExplanationListener(e){if(this.removeExplanationListener(),!e||!this.externalConfirmCallback){console.warn("[UIManager] No se pudo añadir listener: overlayComponent o externalConfirmCallback es null.");return}this.explanationConfirmListener=()=>{if(console.log("[UIManager] >> LISTENER 'confirm-clicked' RECIBIDO <<"),this.externalConfirmCallback)try{console.log("[UIManager] Llamando a externalConfirmCallback..."),this.externalConfirmCallback(),console.log("[UIManager] externalConfirmCallback finalizado.")}catch(a){console.error("[UIManager] Error en callback onConfirm:",a)}else console.warn("[UIManager] 'confirm-clicked' recibido pero externalConfirmCallback es null.");this.hideExplanation()},e.addEventListener("confirm-clicked",this.explanationConfirmListener),console.log("[UIManager] Listener 'confirm-clicked' AÑADIDO a:",e.id)}removeExplanationListener(){var a;const e=(a=this.currentUIElements)==null?void 0:a.explanationOverlayComponent;e&&this.explanationConfirmListener&&(e.removeEventListener("confirm-clicked",this.explanationConfirmListener),console.log("[UIManager] Listener 'confirm-clicked' REMOVIDO de:",e.id)),this.explanationConfirmListener=null}isExplanationVisible(){var a;const e=(a=this.currentUIElements)==null?void 0:a.explanationOverlayComponent;return(e==null?void 0:e.isVisible)??!1}rebuildInterface(){console.log("[UIManager] rebuildInterface llamado.");const e=this.gameManager.getCurrentState();if(e instanceof xe&&e.currentQuestion){const a=this.gameManager.getContainerElement();if(a){const s=this.isExplanationVisible(),i=this.externalConfirmCallback,t=this.lastShownResultType;if(console.log("[UIManager] Reconstruyendo: Llamando a buildQuizInterface..."),this.buildQuizInterface(e.currentQuestion,a,e.handleOptionClick.bind(e),e.consecutiveCorrectAnswers),e.hintAppliedToQuestionId===e.currentQuestion.id&&this.gameManager.getPlayerData().hintCharges>0&&(this.applyHintVisuals(e.currentQuestion.correctAnswerKey),console.log("[UIManager] Reconstruyendo: Estado de pista reaplicado.")),s&&e.currentQuestion.explanation){console.log("[UIManager] Reconstruyendo: Restaurando explicación visible.");const l=i??(()=>{console.warn("[UIManager] Callback por defecto ejecutado al reconstruir interfaz con expl visible.");const r=this.gameManager.getStateMachine().getCurrentState();r instanceof xe&&r.proceedToNextStep()});this.showExplanation(e.currentQuestion.explanation,l,t)}else console.log("[UIManager] Reconstruyendo: No se necesita restaurar explicación.");console.log("[UIManager] rebuildInterface finalizado.")}else console.error("[UIManager] rebuildInterface: appContainer no encontrado.")}else console.warn("[UIManager] rebuildInterface: No en QuizGameplayState o sin pregunta actual.")}}class Sn{constructor(e="body"){this.themes=[],this.activeThemeIndex=0,this.defaultThemeId="default-clean",this.isLoading=!1,this.lastError=null,this.rootElement=document.body,this.masterCssVariableList=[],console.log("ThemeManager Creado.");const a=document.querySelector(e);a instanceof HTMLElement?this.rootElement=a:(console.warn(`ThemeManager: Elemento raíz '${e}' no encontrado, usando document.body.`),this.rootElement=document.body)}async loadThemesData(e){if(this.isLoading)return console.warn("ThemeManager: Ya hay una carga en progreso."),!1;console.log("ThemeManager: Procesando datos de temas pre-cargados..."),this.isLoading=!0,this.lastError=null,this.themes=[];try{if(!Array.isArray(e)||e.length===0)throw new Error("Los datos de temas proporcionados no son un array válido o están vacíos.");for(const s of e){if(!s.id||!s.name||!s.cssVariables||typeof s.cssVariables!="object"){console.warn("ThemeManager: Tema inválido o sin cssVariables, omitiendo:",s);continue}this.themes.push(s)}if(this.themes.length===0)throw new Error("No se cargaron temas válidos (todos carecían de cssVariables).");const a=this.themes.find(s=>s.id===this.defaultThemeId)||this.themes[0];return a!=null&&a.cssVariables?(this.masterCssVariableList=Object.keys(a.cssVariables),console.log(`ThemeManager: Lista maestra de ${this.masterCssVariableList.length} variables CSS generada desde el tema '${a.id}'.`)):console.warn("ThemeManager: No se pudo generar la lista maestra de variables CSS (primer tema válido sin cssVariables)."),this.activeThemeIndex=Math.max(0,this.themes.findIndex(s=>s.id===this.defaultThemeId)),this.themes.findIndex(s=>s.id===this.defaultThemeId)===-1&&this.themes.length>0&&(console.warn(`ThemeManager: Tema por defecto '${this.defaultThemeId}' no encontrado. Usando el primer tema de la lista.`),this.activeThemeIndex=0),console.log(`ThemeManager: ${this.themes.length} temas procesados exitosamente.`),this.isLoading=!1,this.applyActiveTheme(),!0}catch(a){return console.error("ThemeManager: Error al procesar los datos de temas:",a),this.lastError=a instanceof Error?a.message:String(a),this.isLoading=!1,this.themes=[],this.activeThemeIndex=0,!1}}applyActiveTheme(){const e=this.getActiveTheme();this._applyThemeCssVariables(e),this._applyRootThemeClass(e),this._dispatchThemeChangedEvent(e)}_applyThemeCssVariables(e){for(const a of this.masterCssVariableList)this.rootElement.style.removeProperty(a);if(e!=null&&e.cssVariables){console.log(`ThemeManager: Aplicando ${Object.keys(e.cssVariables).length} variables CSS para el tema '${e.id}'.`);for(const[a,s]of Object.entries(e.cssVariables))this.rootElement.style.setProperty(a,s)}else console.log("ThemeManager: No hay variables CSS para aplicar (tema null o sin cssVariables), se usarán fallbacks de componentes.")}_applyRootThemeClass(e){var s,i;this.rootElement.className.split(" ").forEach(t=>{t.startsWith("theme-id-")&&this.rootElement.classList.remove(t)});const a=(i=(s=e==null?void 0:e.elements)==null?void 0:s.quizWrapper)==null?void 0:i.themeClass;a&&(this.rootElement.classList.add(a),console.log(`ThemeManager: Clase de tema global '${a}' aplicada a ${this.rootElement.tagName}.`))}_dispatchThemeChangedEvent(e){const a=new CustomEvent("theme-changed",{detail:{themeId:e==null?void 0:e.id,theme:e},bubbles:!0,composed:!0});document.dispatchEvent(a),console.log(`ThemeManager: Evento 'theme-changed' despachado para el tema '${(e==null?void 0:e.id)??"null"}'.`)}getActiveTheme(){return this.themes.length===0?null:this.themes[this.activeThemeIndex]??null}getActiveThemeId(){var e;return((e=this.getActiveTheme())==null?void 0:e.id)??null}cycleTheme(){if(this.themes.length<=1)return;this.activeThemeIndex=(this.activeThemeIndex+1)%this.themes.length,this.applyActiveTheme();const e=this.getActiveTheme();console.log(`ThemeManager: Tema ciclado a '${(e==null?void 0:e.name)??"N/A"}' (ID: ${(e==null?void 0:e.id)??"N/A"})`)}setActiveTheme(e){var s;const a=this.themes.findIndex(i=>i.id===e);return a!==-1?(this.activeThemeIndex===a||(this.activeThemeIndex=a,this.applyActiveTheme(),console.log(`ThemeManager: Tema establecido a '${(s=this.getActiveTheme())==null?void 0:s.name}' (ID: ${e})`)),!0):(console.warn(`ThemeManager: No se encontró el tema con ID '${e}'.`),!1)}getThemes(){return[...this.themes]}getLastError(){return this.lastError}isLoadingThemes(){return this.isLoading}}var wn=Object.getOwnPropertyDescriptor,En=(f,e,a,s)=>{for(var i=s>1?void 0:s?wn(e,a):e,t=f.length-1,n;t>=0;t--)(n=f[t])&&(i=n(i)||i);return i};let It=class extends R{render(){return B``}};It.styles=V`
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
  `;It=En([G("food-pellet-display")],It);const ha=8,Mn=3500,In=8,An=2,qn=4e-4,Tn=500*500,kn=1,Pn=300;class Ln{constructor(e){this.isInitializedSuccessfully=!1,this.isEnabled=!1,this.isActive=!1,this.activePellets=new Map,this.nextPelletId=0,this.clickListener=null,this.lastToggleTime=0,this.CATFOOD_TOGGLE_DEBOUNCE=200,this.gameManager=e}setCatDisplayArea(e){if(!e)throw console.error("CatFoodManager CRITICAL: Se intentó setear un CatDisplayArea nulo."),new Error("CatDisplayArea es nulo y es requerido por CatFoodManager.");this.catDisplayArea=e}init(){this.isInitializedSuccessfully=!1;try{if(this.physicsManager=this.gameManager.getPhysicsManager(),this.playerData=this.gameManager.getPlayerData(),this.catManager=this.gameManager.getCatManager(),this.audioManager=this.gameManager.getAudioManager(),!this.catDisplayArea)throw new Error("CatDisplayArea no ha sido seteado en CatFoodManager.");if(!this.physicsManager)throw new Error("PhysicsManager no disponible en CatFoodManager.");if(!this.playerData)throw new Error("PlayerData no disponible en CatFoodManager.");if(!this.catManager)throw new Error("CatManager no disponible en CatFoodManager.");if(!this.audioManager)throw new Error("AudioManager no disponible en CatFoodManager.");this.isInitializedSuccessfully=!0}catch(e){console.error("CatFoodManager: Error CRÍTICO durante la inicialización de dependencias:",e),this.isEnabled=!1}}enable(){if(!this.isInitializedSuccessfully){console.error("CatFoodManager: No se puede habilitar, la inicialización falló o las dependencias no están listas.");return}this.isEnabled||(this.isEnabled=!0,console.log("CatFoodManager: Funcionalidad de comida para gatos habilitada."))}toggleActive(e){if(!this.isEnabled||!this.isInitializedSuccessfully||!this.playerData)return;const a=Date.now();if(e===void 0&&a-this.lastToggleTime<this.CATFOOD_TOGGLE_DEBOUNCE)return;this.lastToggleTime=a;const s=e!==void 0?e:!this.isActive;if(s===!0&&this.playerData.currentCatFood<=0){this.isActive&&(this.isActive=!1,this.gameManager.setQuizUiFaded(!1),this.updateListenerAndCursor(),this.gameManager.updateToolButtonStates());return}s!==this.isActive&&(this.isActive=s,this.gameManager.setQuizUiFaded(this.isActive),this.updateListenerAndCursor(),this.gameManager.updateToolButtonStates())}updateListenerAndCursor(){this.catDisplayArea&&(this.catDisplayArea.style.cursor=this.isActive?"copy":""),this.isActive?this.addClickListener():this.removeClickListener()}addClickListener(){if(this.clickListener||!this.isInitializedSuccessfully||!this.catDisplayArea)return;const e=this.catDisplayArea;this.clickListener=a=>{if(!this.isActive||!this.isEnabled||!this.playerData)return;const s=this.catDisplayArea.getInternalContainer();if(!(a.target!==e&&a.target!==s))if(a.preventDefault(),this.playerData.currentCatFood>0){const i=this.getClickPosition(a,e);this.spawnFoodPellet(i),this.applyAttractionForce(i),this.playerData.spendCatFoodUnit()?this.gameManager.updateCatFoodUI():this.toggleActive(!1)}else this.toggleActive(!1)},e.addEventListener("mousedown",this.clickListener),e.addEventListener("touchstart",this.clickListener,{passive:!1})}removeClickListener(){if(!this.clickListener||!this.catDisplayArea)return;const e=this.catDisplayArea;e.removeEventListener("mousedown",this.clickListener),e.removeEventListener("touchstart",this.clickListener),this.clickListener=null,e.style.cursor=""}getClickPosition(e,a){const s=a.getBoundingClientRect();let i=0,t=0;return e instanceof MouseEvent?(i=e.clientX,t=e.clientY):e.touches&&e.touches.length>0?(i=e.touches[0].clientX,t=e.touches[0].clientY):e.changedTouches&&e.changedTouches.length>0&&(i=e.changedTouches[0].clientX,t=e.changedTouches[0].clientY),{x:i-s.left,y:t-s.top}}applyAttractionForce(e){var i;if(!this.catManager||!((i=this.physicsManager)!=null&&i.getWorld))return;const a=this.catManager.getAllCats(),s=this.physicsManager.getWorld();a.forEach(t=>{if(t.physics.body&&!t.physics.body.isStatic&&L.Composite.get(s,t.physics.body.id,"body")){const n=t.physics.body,l=L.Vector.sub(e,n.position),r=L.Vector.magnitudeSquared(l);if(r>1&&r<Tn){const g=Math.sqrt(r),c=qn*n.mass/(g*.1+1),p=L.Vector.mult(L.Vector.normalise(l),c);try{L.Body.applyForce(n,n.position,p)}catch{}}}})}spawnFoodPellet(e){var l,r;if(!this.isInitializedSuccessfully||!((l=this.physicsManager)!=null&&l.getWorld)||!this.catDisplayArea||!this.playerData){console.warn("CatFoodManager: No se puede crear pellet, no inicializado o faltan dependencias.");return}const a=`food_pellet_entity_${this.nextPelletId++}`,s=parseInt(getComputedStyle(document.documentElement).getPropertyValue("--gq-food-pellet-size").trim())||ha,i=L.Bodies.circle(e.x,e.y,s/2,{label:"foodPellet",isSensor:!0,density:1e-4,frictionAir:.02,collisionFilter:{category:In,mask:An},plugin:{pelletId:a}});try{L.World.add(this.physicsManager.getWorld(),i)}catch(g){console.error("CatFoodManager: Error añadiendo pellet al mundo físico:",g);return}const t=document.createElement("food-pellet-display");t.id=a;const n=s/2;t.style.transform=`translate(${e.x-n}px, ${e.y-n}px)`,t.classList.add("appearing");try{this.catDisplayArea.addEntityElement(t),t.offsetWidth,requestAnimationFrame(()=>{t.classList.remove("appearing"),t.classList.add("spawned")})}catch(g){console.error("CatFoodManager: Error añadiendo pellet visual a catDisplayArea:",g);try{L.World.remove(this.physicsManager.getWorld(),i)}catch{}return}this.activePellets.set(a,{body:i,element:t,creationTime:performance.now(),id:a}),(r=this.audioManager)==null||r.playSound("draw_end")}update(e){if(!this.isEnabled||!this.isInitializedSuccessfully||this.activePellets.size===0)return;const a=performance.now(),s=[];this.activePellets.forEach(i=>{if(a-i.creationTime>Mn)s.push(i.id);else if(i.element&&i.body&&i.element.classList.contains("spawned")){const n=(i.element.offsetWidth||parseInt(getComputedStyle(document.documentElement).getPropertyValue("--gq-food-pellet-size").trim())||ha)/2;i.element.style.transform=`translate(${i.body.position.x-n}px, ${i.body.position.y-n}px)`}}),s.forEach(i=>this.removeFoodPellet(i))}removeFoodPellet(e,a=!1){var i;const s=this.activePellets.get(e);if(s){if((i=this.physicsManager)!=null&&i.getWorld&&s.body)try{L.Composite.get(this.physicsManager.getWorld(),s.body.id,"body")&&L.World.remove(this.physicsManager.getWorld(),s.body)}catch{}this.catDisplayArea&&s.element&&this.catDisplayArea.removeEntityElement(s.element),this.activePellets.delete(e)}}processCatFoodCollision(e,a){var p,u,o;const s=(p=a.plugin)==null?void 0:p.pelletId;if(!s||!this.activePellets.has(s)||!this.catManager||!this.playerData||!this.audioManager||!((u=this.physicsManager)!=null&&u.getWorld))return;const i=this.catManager.bodyIdToEntityIdMap.get(e);if(!i)return;const t=this.catManager.getCat(i);if(!(t!=null&&t.value)||!t.physics.body||!(((o=t.render)==null?void 0:o.element)instanceof R))return;const n=t.render.element,l=t.value.currentSize,r=this.playerData.getCurrentMaxSizeLimit();let g=Math.min(r,Pn,l+kn);const c=g/l;if(c>1.0001){t.value.currentSize=g;try{if(L.Composite.get(this.physicsManager.getWorld(),t.physics.body.id,"body"))L.Body.scale(t.physics.body,c,c),t.physics.body.plugin&&(t.physics.body.plugin.currentSize=g);else throw new Error("Cuerpo del gato no encontrado en el mundo para escalar");n&&typeof n.size=="number"&&(n.size=g)}catch(d){console.error("CatFoodManager: Error al escalar gato después de comer:",d),t.value.currentSize=l,t.physics.body.plugin&&(t.physics.body.plugin.currentSize=l)}}this.audioManager.playSound("eat"),this.removeFoodPellet(s,!0)}destroy(){this.removeClickListener(),Array.from(this.activePellets.keys()).forEach(a=>this.removeFoodPellet(a)),this.activePellets.clear(),this.isEnabled=!1,this.isActive=!1,this.isInitializedSuccessfully=!1,this.catDisplayArea&&(this.catDisplayArea.style.cursor="")}}class Dn{constructor(e){this.gameManager=e}enter(e){console.log("LoadingState: enter",e),this.gameManager.setBodyStateClass("loading")}exit(){console.log("LoadingState: exit")}update(e){}}var _n=Object.defineProperty,$n=Object.getOwnPropertyDescriptor,re=(f,e,a,s)=>{for(var i=s>1?void 0:s?$n(e,a):e,t=f.length-1,n;t>=0;t--)(n=f[t])&&(i=(s?n(e,a,i):n(i))||i);return s&&i&&_n(e,a,i),i};let ee=class extends R{constructor(){super(...arguments),this.gameData={title:"GatoQuiz Interactivo",version:"1.0.0",highScore:0,lastScore:0},this.loadingMessages=["Desenredando la diversión...","Preparando las croquetas virtuales...","Afilando las garras para el quiz..."],this._isLoading=!1,this._contentFadingOut=!1,this._currentLoadingMessage="Cargando...",this.sparkleIntervalId=null,this.hasStarted=!1}firstUpdated(f){super.firstUpdated(f),this.shadowRoot&&this.startSparkleEffect(),this.ensureFontsLoaded()}connectedCallback(){if(super.connectedCallback(),typeof CSS<"u"&&CSS.registerProperty)try{CSS.registerProperty({name:"--hue1",syntax:"<angle>",initialValue:"0deg",inherits:!1}),CSS.registerProperty({name:"--hue2",syntax:"<angle>",initialValue:"300deg",inherits:!1})}catch(f){console.warn(" mainMenuScreen: Error registrando @property CSS:",f)}this._selectRandomLoadingMessage()}disconnectedCallback(){super.disconnectedCallback(),this.sparkleIntervalId&&(clearTimeout(this.sparkleIntervalId),this.sparkleIntervalId=null)}_selectRandomLoadingMessage(){if(this.loadingMessages&&this.loadingMessages.length>0){const f=Math.floor(Math.random()*this.loadingMessages.length);this._currentLoadingMessage=this.loadingMessages[f]}else this._currentLoadingMessage="Cargando..."}async _handleScreenClick(f){if(this.hasStarted)return;this.hasStarted=!0,f.type==="touchstart"&&f.preventDefault(),console.log("MainMenuScreen: Click/Tap detectado. Iniciando secuencia de carga..."),this._selectRandomLoadingMessage(),this.sparkleIntervalId&&(clearTimeout(this.sparkleIntervalId),this.sparkleIntervalId=null),this._sparkleContainer&&(this._sparkleContainer.innerHTML=""),this._pawWrapper&&this._pawWrapper.classList.add("content-hidden"),this._titleAmpersand&&this._titleAmpersand.classList.add("content-hidden");const e=500;await new Promise(s=>setTimeout(s,e)),this._loadingMessageContainer&&this._loadingMessageContainer.classList.add("visible"),console.log("MainMenuScreen: Contenido principal oculto, mostrando spinner.");const a=2500;await new Promise(s=>setTimeout(s,a)),console.log("MainMenuScreen: Duración de carga artificial completada. Solicitando inicio del juego."),this.dispatchEvent(new CustomEvent("start-game-requested",{bubbles:!0,composed:!0}))}startSparkleEffect(){const f=()=>{if(!this._sparkleContainer||!this._sparkleSvgTemplate)return;const a=this._sparkleSvgTemplate.cloneNode(!0);a.removeAttribute("id"),a.style.display="block",a.classList.add("sparkle-instance");const s=this.getBoundingClientRect(),i=s.width,t=s.height,n=this._sparkleContainer.appendChild(a.cloneNode(!0)),l=getComputedStyle(n),r=parseFloat(l.width),g=parseFloat(l.height);this._sparkleContainer.removeChild(n);const c=Math.random()*(t-g),p=Math.random()*(i-r);a.style.position="absolute",a.style.top=`${c}px`,a.style.left=`${p}px`,this._sparkleContainer.appendChild(a),setTimeout(()=>{a.parentNode===this._sparkleContainer&&this._sparkleContainer.removeChild(a)},500)},e=()=>{if(!this.isConnected)return;f();const a=Math.random()*150+50;this.sparkleIntervalId=window.setTimeout(e,a)};this.sparkleIntervalId&&clearTimeout(this.sparkleIntervalId),e()}ensureFontsLoaded(){document.fonts&&Promise.all([document.fonts.load("1em Pacifico"),document.fonts.load("1em Geist"),document.fonts.load("1em Poppins")]).then(()=>{}).catch(f=>{console.warn("MainMenuScreen: Error esperando fuentes:",f)})}render(){const f=Va`
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
    `;return B`
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
        ${f}
      </div>

      <div class="loading-message-container">
          <div class="yarn-spinner"></div>
          <span class="loading-text">${this._currentLoadingMessage}</span>
      </div>

      <span class="title-ampersand">&</span>
    `}};ee.styles=V`
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
      top: 48.6%;
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
  `;re([$({type:Object})],ee.prototype,"gameData",2);re([$({type:Array})],ee.prototype,"loadingMessages",2);re([U()],ee.prototype,"_isLoading",2);re([U()],ee.prototype,"_contentFadingOut",2);re([U()],ee.prototype,"_currentLoadingMessage",2);re([ae("#sparkle-container-internal")],ee.prototype,"_sparkleContainer",2);re([ae("#sparkle-svg-template-internal")],ee.prototype,"_sparkleSvgTemplate",2);re([ae(".paw-wrapper")],ee.prototype,"_pawWrapper",2);re([ae(".title-ampersand")],ee.prototype,"_titleAmpersand",2);re([ae(".loading-message-container")],ee.prototype,"_loadingMessageContainer",2);ee=re([G("main-menu-screen")],ee);class ua{constructor(e){this.startListener=null,this.containerElement=null,this.gameManager=e}enter(e){if(console.log("MainMenuState: enter",e),this.gameManager.setBodyStateClass("mainmenu-whiskers"),this.containerElement=this.gameManager.getContainerElement(),!this.containerElement){console.error("MainMenuState: Contenedor principal #app no encontrado.");return}this.containerElement.innerHTML="";const a=document.createElement("main-menu-screen");a.loadingMessages=this.gameManager.getLoadingMessages(),this.containerElement.appendChild(a),a?(this.startListener=()=>{console.log("MainMenuState: Evento 'start-game-requested' recibido desde <main-menu-screen>."),this.gameManager.getAudioManager().playSound("ui_confirm"),this.removeStartListeners(),this.gameManager.start(),console.log("MainMenuState: Iniciando transición con BARRIDO a QuizGameplay..."),this.gameManager.getStateMachine().changeState("QuizGameplay",void 0,"gq-wipe-transition")},a.addEventListener("start-game-requested",this.startListener,{once:!0}),console.log("MainMenuState: Listener 'start-game-requested' añadido a <main-menu-screen>.")):console.error("MainMenuState: Error al encontrar <main-menu-screen> después de añadirlo al DOM.")}removeStartListeners(){var a;const e=(a=this.containerElement)==null?void 0:a.querySelector("main-menu-screen");e&&this.startListener&&(e.removeEventListener("start-game-requested",this.startListener),console.log("MainMenuState: Listener 'start-game-requested' removido de <main-menu-screen>.")),this.startListener=null}exit(){console.log("MainMenuState: exit"),this.removeStartListeners(),this.containerElement&&(this.containerElement.style.cursor="")}update(e){}getPreferredExitAnimation(){return"gq-wipe-transition"}getPreferredEnterAnimation(){return"gq-wipe-transition"}}var zn=Object.defineProperty,On=Object.getOwnPropertyDescriptor,Ze=(f,e,a,s)=>{for(var i=s>1?void 0:s?On(e,a):e,t=f.length-1,n;t>=0;t--)(n=f[t])&&(i=(s?n(e,a,i):n(i))||i);return s&&i&&zn(e,a,i),i};let Te=class extends R{constructor(){super(...arguments),this.finalScore=0,this.correctAnswers=0,this.totalQuestions=0,this.isNewHighScore=!1}_handleContinueClick(){this.dispatchEvent(new CustomEvent("continue-requested",{bubbles:!0,composed:!0}))}render(){const f=this.totalQuestions>0?(this.correctAnswers/this.totalQuestions*100).toFixed(0):0;return B`
      <h1 class="results-title">Resultados</h1>
      <div class="stats-container">
        <div class="stat-item">
          <span class="stat-label">Puntaje Final</span>
          <span class="stat-value score">${this.finalScore}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Precisión</span>
          <span class="stat-value accuracy">${f}%</span>
          <span class="stat-label" style="font-size: 0.8rem; color: #6b7280;">(${this.correctAnswers} / ${this.totalQuestions})</span>
        </div>
      </div>
      ${this.isNewHighScore?B`
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
  `;Ze([$({type:Number})],Te.prototype,"finalScore",2);Ze([$({type:Number})],Te.prototype,"correctAnswers",2);Ze([$({type:Number})],Te.prototype,"totalQuestions",2);Ze([$({type:Boolean})],Te.prototype,"isNewHighScore",2);Te=Ze([G("results-screen")],Te);class Bn{constructor(e){this.finalScore=0,this.correctAnswers=0,this.totalQuestions=0,this.isNewHighScore=!1,this.resultsScreenElement=null,this.continueHandler=null,this.gameManager=e}enter(e){console.log("ResultsState: enter",e),this.finalScore=(e==null?void 0:e.score)??0,this.correctAnswers=(e==null?void 0:e.correct)??0,this.totalQuestions=(e==null?void 0:e.total)??0,this.isNewHighScore=(e==null?void 0:e.isNewHighScore)??!1,this.gameManager.setBodyStateClass("results");const a=this.gameManager.getContainerElement();if(!a){console.error("ResultsState: Contenedor principal no encontrado.");return}a.innerHTML="",this.resultsScreenElement=document.createElement("results-screen"),this.resultsScreenElement.finalScore=this.finalScore,this.resultsScreenElement.correctAnswers=this.correctAnswers,this.resultsScreenElement.totalQuestions=this.totalQuestions,this.resultsScreenElement.isNewHighScore=this.isNewHighScore,this.continueHandler=()=>{console.log("ResultsState: Evento 'continue-requested' recibido."),this.gameManager.getAudioManager().playSound("ui_confirm"),this.gameManager.create()},this.resultsScreenElement.addEventListener("continue-requested",this.continueHandler),a.appendChild(this.resultsScreenElement),this.gameManager.getAudioManager().playSound("level_complete")}exit(){console.log("ResultsState: exit"),this.resultsScreenElement&&this.continueHandler&&this.resultsScreenElement.removeEventListener("continue-requested",this.continueHandler),this.resultsScreenElement=null,this.continueHandler=null}update(e){}}var Rn=Object.defineProperty,Fn=Object.getOwnPropertyDescriptor,Dt=(f,e,a,s)=>{for(var i=s>1?void 0:s?Fn(e,a):e,t=f.length-1,n;t>=0;t--)(n=f[t])&&(i=(s?n(e,a,i):n(i))||i);return s&&i&&Rn(e,a,i),i};let Ge=class extends R{constructor(){super(...arguments),this.finalScore=0,this.isNewHighScore=!1}_handleRestartClick(){this.dispatchEvent(new CustomEvent("restart-game-requested",{bubbles:!0,composed:!0}))}_handleMenuClick(){this.dispatchEvent(new CustomEvent("main-menu-requested",{bubbles:!0,composed:!0}))}render(){return B`
      <h1 class="game-over-title">¡Fin del Juego!</h1>
      <div class="score-container">
        <span class="final-score-label">Puntaje Final</span>
        <span class="final-score-value">${this.finalScore}</span>
        ${this.isNewHighScore?B`
          <span class="new-highscore-indicator">¡Nuevo Récord! 🏆</span>
        `:""}
      </div>
      <div class="button-container">
        <button class="action-button restart-button" @click=${this._handleRestartClick}>
          Reiniciar Juego
        </button>
        </div>
    `}};Ge.styles=V`
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
  `;Dt([$({type:Number})],Ge.prototype,"finalScore",2);Dt([$({type:Boolean})],Ge.prototype,"isNewHighScore",2);Ge=Dt([G("game-over-screen")],Ge);class Un{constructor(e){this.finalScore=0,this.isNewHighScore=!1,this.gameOverScreenElement=null,this.restartHandler=null,this.gameManager=e}enter(e){console.log("GameOverState: enter",e),this.finalScore=(e==null?void 0:e.score)??0,this.isNewHighScore=(e==null?void 0:e.isNewHighScore)??!1,this.gameManager.setBodyStateClass("gameover");const a=this.gameManager.getContainerElement();if(!a){console.error("GameOverState: Contenedor principal no encontrado.");return}a.innerHTML="",this.gameOverScreenElement=document.createElement("game-over-screen"),this.gameOverScreenElement.finalScore=this.finalScore,this.gameOverScreenElement.isNewHighScore=this.isNewHighScore,this.restartHandler=()=>{console.log("GameOverState: Evento 'restart-game-requested' recibido. Forzando recarga de página."),this.gameManager.getAudioManager().playSound("ui_confirm"),window.location.reload()},this.gameOverScreenElement.addEventListener("restart-game-requested",this.restartHandler),a.appendChild(this.gameOverScreenElement),this.gameManager.getAudioManager().playSound("game_over")}exit(){console.log("GameOverState: exit"),this.gameOverScreenElement&&this.restartHandler&&this.gameOverScreenElement.removeEventListener("restart-game-requested",this.restartHandler),this.gameOverScreenElement=null,this.restartHandler=null}update(e){}}var Nn=Object.defineProperty,Vn=Object.getOwnPropertyDescriptor,Pe=(f,e,a,s)=>{for(var i=s>1?void 0:s?Vn(e,a):e,t=f.length-1,n;t>=0;t--)(n=f[t])&&(i=(s?n(e,a,i):n(i))||i);return s&&i&&Nn(e,a,i),i};let ge=class extends R{constructor(){super(),this.toolId="",this.icon="❓",this.titleText="",this.disabled=!1,this.active=!1,this.progressPercentage=0,this._isProcessingInteraction=!1}render(){const f=this.toolId==="cat-food"&&!this.disabled?B`
          <div class="cat-food-bar-container" part="cat-food-bar-container">
            <div
              class="cat-food-bar-fill"
              part="cat-food-bar-fill"
              style="width: ${this.progressPercentage}%;"
            ></div>
          </div>
        `:N;return B`
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
      ${f}
    `}_handleClick(f){f.type==="touchstart"&&f.preventDefault(),!(this._isProcessingInteraction||this.disabled)&&(this._isProcessingInteraction=!0,this.dispatchEvent(new CustomEvent("tool-activated",{detail:{toolId:this.toolId},bubbles:!0,composed:!0})),requestAnimationFrame(()=>{this._isProcessingInteraction=!1}))}};ge.styles=V`
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
  `;Pe([$({type:String})],ge.prototype,"toolId",2);Pe([$({type:String})],ge.prototype,"icon",2);Pe([$({type:String})],ge.prototype,"titleText",2);Pe([$({type:Boolean,reflect:!0})],ge.prototype,"disabled",2);Pe([$({type:Boolean,reflect:!0})],ge.prototype,"active",2);Pe([$({type:Number,attribute:"progress-percentage"})],ge.prototype,"progressPercentage",2);ge=Pe([G("tool-button")],ge);var Gn=Object.defineProperty,Qn=Object.getOwnPropertyDescriptor,_t=(f,e,a,s)=>{for(var i=s>1?void 0:s?Qn(e,a):e,t=f.length-1,n;t>=0;t--)(n=f[t])&&(i=(s?n(e,a,i):n(i))||i);return s&&i&&Gn(e,a,i),i};let Qe=class extends R{constructor(){super(...arguments),this.combo=0,this._isVisible=!1}updated(f){super.updated(f),f.has("combo")&&this._updateVisuals()}_updateVisuals(){this._isVisible=this.combo>0,this.toggleAttribute("visible",this._isVisible);let f=parseFloat(getComputedStyle(this).getPropertyValue("--gq-combo-font-size-base").trim()||"3.0"),e="transparent";if(this._isVisible){const s=parseFloat(getComputedStyle(this).getPropertyValue("--gq-combo-font-size-increment").trim()||"0.5"),i=Math.min(Math.max(0,this.combo-1),10);f=parseFloat(getComputedStyle(this).getPropertyValue("--gq-combo-font-size-base").trim()||"3.0")+i*s;const t=parseFloat(getComputedStyle(this).getPropertyValue("--gq-combo-color-hue-increment").trim()||"35"),n=getComputedStyle(this).getPropertyValue("--gq-combo-color-saturation").trim()||"100%",l=getComputedStyle(this).getPropertyValue("--gq-combo-color-lightness").trim()||"65%";e=`hsl(${this.combo*t%360}, ${n}, ${l})`}this.style.fontSize=`${f}rem`,this.style.color=e}render(){return B`${this._isVisible?`x${this.combo}`:""}`}};Qe.styles=V`
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
  `;_t([$({type:Number})],Qe.prototype,"combo",2);_t([U()],Qe.prototype,"_isVisible",2);Qe=_t([G("combo-counter")],Qe);var Hn=Object.defineProperty,Wn=Object.getOwnPropertyDescriptor,Ma=(f,e,a,s)=>{for(var i=s>1?void 0:s?Wn(e,a):e,t=f.length-1,n;t>=0;t--)(n=f[t])&&(i=(s?n(e,a,i):n(i))||i);return s&&i&&Hn(e,a,i),i};let ht=class extends R{firstUpdated(){this._internalContainer||console.error("CatDisplayArea: El contenedor interno '.entities-host-container' no fue encontrado en el shadow DOM después del primer renderizado.")}addEntityElement(f){this._internalContainer?this._internalContainer.appendChild(f):console.error("CatDisplayArea: _internalContainer no está disponible. No se pudo añadir el elemento:",f)}removeEntityElement(f){var e;this._internalContainer&&this._internalContainer.contains(f)?this._internalContainer.removeChild(f):(e=this.shadowRoot)!=null&&e.contains(f)&&(console.warn("CatDisplayArea: Elemento no encontrado en _internalContainer, intentando remover del shadowRoot."),this.shadowRoot.removeChild(f))}clearAllEntityElements(){this._internalContainer?(this._internalContainer.innerHTML="",console.log("CatDisplayArea: Todos los elementos de entidad han sido limpiados.")):console.warn("CatDisplayArea: _internalContainer no disponible al intentar clearAllEntityElements.")}getInternalContainer(){return this._internalContainer||null}render(){return B`
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
  `;Ma([ae(".entities-host-container")],ht.prototype,"_internalContainer",2);ht=Ma([G("cat-display-area")],ht);var jn=Object.defineProperty,Kn=Object.getOwnPropertyDescriptor,$t=(f,e,a,s)=>{for(var i=s>1?void 0:s?Kn(e,a):e,t=f.length-1,n;t>=0;t--)(n=f[t])&&(i=(s?n(e,a,i):n(i))||i);return s&&i&&jn(e,a,i),i};let He=class extends R{constructor(){super(...arguments),this.titleText="Abrir Tienda (S)",this.disabled=!1}render(){return B`
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
    `}_handleClick(f){f.type==="touchstart"&&f.preventDefault(),!this.disabled&&this.dispatchEvent(new CustomEvent("shop-button-interaction",{bubbles:!0,composed:!0}))}};He.styles=V`
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
  `;$t([$({type:String})],He.prototype,"titleText",2);$t([$({type:Boolean,reflect:!0})],He.prototype,"disabled",2);He=$t([G("shop-button-component")],He);var Yn=Object.defineProperty,Xn=Object.getOwnPropertyDescriptor,Ia=(f,e,a,s)=>{for(var i=s>1?void 0:s?Xn(e,a):e,t=f.length-1,n;t>=0;t--)(n=f[t])&&(i=(s?n(e,a,i):n(i))||i);return s&&i&&Yn(e,a,i),i};const Zn="sweep-in-tl-to-br",Jn="sweep-out-towards-br";let ut=class extends R{constructor(){super(...arguments),this.visible=!1}async playIn(){return console.log("[DiagonalWipe] playIn() INICIADO."),new Promise(f=>{this.classList.remove("animate-out"),this.style.clipPath="polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)",this.visible=!0,this.offsetWidth;const e=a=>{a.animationName===Zn?(this.removeEventListener("animationend",e),this.style.clipPath="polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",console.log("[DiagonalWipe] playIn() FINALIZADO - Promesa resuelta."),f()):console.log(`[DiagonalWipe] playIn() animationend para OTRA animación: ${a.animationName}`)};this.addEventListener("animationend",e),this.classList.add("animate-in"),console.log('[DiagonalWipe] Clase "animate-in" añadida.')})}async playOut(){return console.log("[DiagonalWipe] playOut() INICIADO."),new Promise(f=>{if(!this.visible){console.log("[DiagonalWipe] playOut() llamado pero no visible, resolviendo inmediatamente."),f();return}this.classList.remove("animate-in"),this.style.clipPath="polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",this.offsetWidth;const e=a=>{a.animationName===Jn?(this.removeEventListener("animationend",e),this.reset(),console.log("[DiagonalWipe] playOut() FINALIZADO - Promesa resuelta."),f()):console.log(`[DiagonalWipe] playOut() animationend para OTRA animación: ${a.animationName}`)};this.addEventListener("animationend",e),this.classList.add("animate-out"),console.log('[DiagonalWipe] Clase "animate-out" añadida.')})}reset(){console.log("[DiagonalWipe] reset() llamado."),this.classList.remove("animate-in","animate-out"),this.style.clipPath="polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)",this.visible=!1}render(){return B``}};ut.styles=V`
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
  `;Ia([$({type:Boolean,reflect:!0})],ut.prototype,"visible",2);ut=Ia([G("diagonal-wipe")],ut);class eo{constructor(e){this.drawingCanvasLayerElement=null,this.gameUiContainer=null,this.diagonalWipeElement=null,this.lastTimestamp=0,this.isRunning=!1,this.keydownListener=null,this.themeChangeListener=null,this.shopButtonInstance=null,this.shopButtonInteractionListener=null,this.shopCloseRequestListener=null,this.loadingMessages=["Desenredando la diversión..."],this._lastToolToggleTime=0,this.TOOL_TOGGLE_DEBOUNCE_MS=300,this.setupToolButtonListeners=()=>{var s,i,t;(s=this.controlElements.brushToolButton)==null||s.addEventListener("tool-activated",()=>this.activateBrush()),(i=this.controlElements.clearInkToolButton)==null||i.addEventListener("tool-activated",()=>{this.playerData.isDrawingUnlocked&&this.playerData.inkSpentSinceLastClear>0&&this.inkManager.clearInkLines()}),(t=this.controlElements.catFoodToolButton)==null||t.addEventListener("tool-activated",()=>this.activateCatFood())},this.containerElement=e,this.audioManager=new di,this.quizSystem=new li,this.playerData=new _i,this.themeManager=new Sn("body"),this.catManager=new xi(this.audioManager,this),this.uiManager=new Cn(this),this.shopManager=new Di(this.playerData,this),this.inkManager=new Ni(this),this.catFoodManager=new Ln(this),this.physicsManager=new ri(this.catManager,this.catFoodManager,this),this.stateMachine=new ci,this.stateMachine.setAnimationContainer(this.containerElement),this.diagonalWipeElement=document.getElementById("diagonal-wipe-transition-element"),(!this.diagonalWipeElement||!(this.diagonalWipeElement instanceof HTMLElement&&"playIn"in this.diagonalWipeElement))&&(console.error("GameManager CRITICAL: Componente <diagonal-wipe id='diagonal-wipe-transition-element'> no encontrado o inválido."),this.diagonalWipeElement=null),this.stateMachine.setWipeComponent(this.diagonalWipeElement);const a=document.getElementById("cat-display-area-main");if(!a||!(a instanceof HTMLElement&&"clearAllEntityElements"in a))throw console.error("GameManager CRITICAL: <cat-display-area id='cat-display-area-main'> no encontrado o inválido."),new Error("<cat-display-area> no encontrado y es esencial.");this.catDisplayAreaElement=a,this.drawingCanvasLayerElement=document.getElementById("drawing-canvas-layer-main"),this.drawingCanvasLayerElement&&!(this.drawingCanvasLayerElement instanceof HTMLElement&&"resizeCanvas"in this.drawingCanvasLayerElement)&&console.warn("GameManager: drawingCanvasLayerElement no parece ser una instancia válida de DrawingCanvasLayer."),this.catManager.setCatDisplayArea(this.catDisplayAreaElement),this.catFoodManager.setCatDisplayArea(this.catDisplayAreaElement),this.catManager.setPhysicsManager(this.physicsManager),this.inkManager.setPhysicsManager(this.physicsManager),this.controlElements={controlsContainer:document.getElementById("right-controls"),drawingButtonsContainer:document.getElementById("drawing-buttons-container"),catFoodUiContainer:document.getElementById("cat-food-ui-container"),brushToolButton:document.querySelector('tool-button[toolId="brush"]'),clearInkToolButton:document.querySelector('tool-button[toolId="clear-ink"]'),catFoodToolButton:document.querySelector('tool-button[toolId="cat-food"]')},(!this.controlElements.controlsContainer||!this.controlElements.drawingButtonsContainer||!this.controlElements.catFoodUiContainer||!this.controlElements.brushToolButton||!this.controlElements.clearInkToolButton||!this.controlElements.catFoodToolButton)&&console.warn("GameManager: Uno o más elementos de control UI no fueron encontrados en el DOM."),this.setupStates()}setBodyStateClass(e){const a=document.body;a.className.split(" ").forEach(s=>{s.startsWith("state-")&&a.classList.remove(s)}),e&&a.classList.add(`state-${e.toLowerCase()}`)}async init(){this.playerData.reset(),this.physicsManager.init(this.catDisplayAreaElement),this.catFoodManager.init(),this.hideToolControls(),this.hideShopButton(),this.addThemeChangeListener(),await this.preload(),this.setupToolButtonListeners(),this.addKeyboardListener()}create(){console.log("GameManager: create() - Iniciando reseteo..."),this.quizSystem.resetAvailableQuestions(),this.catManager.removeAllCats(),this.shopManager?(this.shopManager.closeShop(),console.log("GameManager: create() - ShopManager.closeShop() llamado.")):console.warn("GameManager: create() - ShopManager no disponible para cerrar tienda."),this.hideToolControls(),this.hideShopButton(),document.querySelector("combo-counter")||document.body.appendChild(document.createElement("combo-counter")),this.stateMachine.changeState("MainMenu",void 0,"gq-wipe-transition"),console.log("GameManager: create() - Reseteo completado, transicionando a MainMenu.")}setupStates(){const e=new Dn(this),a=new ua(this),s=new xe(this),i=new Bn(this),t=new Un(this),n=(r,g,c)=>{const p=r.enter.bind(r);return u=>{try{p(u)}catch(o){console.error(`Error en enter() para ${r.constructor.name}:`,o)}if(r instanceof xe)this.gameUiContainer=this.containerElement.querySelector("quiz-ui-container");else if(r instanceof ua){const o=this.containerElement.querySelector("main-menu-screen");o&&(o.loadingMessages=this.getLoadingMessages())}g?this.showShopButton():this.hideShopButton(),c?(this.showToolControls(),r instanceof xe&&this.updateCatFoodUI()):this.hideToolControls()}},l=r=>{const g=r.exit.bind(r);return()=>{try{g()}catch(c){console.error(`Error en exit() para ${r.constructor.name}:`,c)}r instanceof xe&&(this.gameUiContainer=null)}};e.enter=n(e,!1,!1),e.exit=l(e),a.enter=n(a,!1,!1),a.exit=l(a),s.enter=n(s,!0,!0),s.exit=l(s),i.enter=n(i,!1,!1),i.exit=l(i),t.enter=n(t,!1,!1),t.exit=l(t),this.stateMachine.addState("Loading",e),this.stateMachine.addState("MainMenu",a),this.stateMachine.addState("QuizGameplay",s),this.stateMachine.addState("Results",i),this.stateMachine.addState("GameOver",t),this.stateMachine.addState("__shutdown__",{enter:()=>{this.hideToolControls(),this.hideShopButton()},exit:()=>{},update:()=>{}})}async preload(){const e="/GatoQuizDev/",a=e.endsWith("/")?e.slice(0,-1):e,s={questions:`${a}/data/questions.json`,templates:`${a}/data/cat_templates.json`,shopItems:`${a}/data/shop_items.json`,themes:`${a}/data/themes.json`,loadingMessages:`${a}/data/loading_messages.json`};console.log("GameManager: Preload - URLs a cargar:",s);try{const i=await Promise.all(Object.values(s).map(c=>fetch(c)));i.forEach((c,p)=>{if(!c.ok)throw new Error(`HTTP ${c.status} cargando ${Object.values(s)[p]}`)});const[t,n,l,r,g]=await Promise.all(i.map(c=>c.json()));if(!Array.isArray(t)||!Array.isArray(n)||!Array.isArray(l)||!Array.isArray(r)||!Array.isArray(g))throw new Error("Formato de datos JSON inválido.");if(!await this.quizSystem.loadQuestionsData(t))throw new Error("Fallo al procesar preguntas.");if(this.catManager.loadTemplates(n),this.shopManager.init(l),!await this.themeManager.loadThemesData(r))throw new Error("Fallo al procesar temas.");this.loadingMessages=g,this.loadingMessages.length===0&&(this.loadingMessages=["Cargando michi-diversión..."]),console.log("GameManager: Preload completado exitosamente.")}catch(i){throw console.error("GameManager: Error durante preload:",i),this.containerElement.innerHTML=`Error cargando assets: ${i.message}. Revisa la consola.`,i}}start(){this.isRunning||(this.isRunning=!0,this.lastTimestamp=performance.now(),this.physicsManager.start(),this.gameLoopRequestId=requestAnimationFrame(this.gameLoop.bind(this)),console.log("GameManager: Ciclo de juego iniciado."))}stop(){this.isRunning&&(this.isRunning=!1,this.gameLoopRequestId&&cancelAnimationFrame(this.gameLoopRequestId),this.gameLoopRequestId=void 0,this.physicsManager.stop(),console.log("GameManager: Ciclo de juego detenido."))}gameLoop(e){if(!this.isRunning)return;const a=(e-this.lastTimestamp)/1e3;this.lastTimestamp=e;const s=Math.min(a,.1);this.update(s),this.gameLoopRequestId=requestAnimationFrame(this.gameLoop.bind(this))}update(e){try{this.stateMachine.update(e),this.catManager.updateCats(e),this.catFoodManager.update(e)}catch(a){console.error("Error en gameLoop update:",a),this.stop()}}shutdown(){var a,s,i;console.log("GameManager: Iniciando shutdown..."),this.stop(),this.hideToolControls(),this.hideShopButton(),this.removeKeyboardListener(),this.removeThemeChangeListener(),this.physicsManager.shutdown();const e=this.stateMachine.getCurrentStateName();if(e&&e!=="__shutdown__")try{(a=this.stateMachine.getCurrentState())==null||a.exit()}catch(t){console.warn("Error en exit() del estado durante shutdown:",t)}this.stateMachine.changeState("__shutdown__"),this.catManager.removeAllCats(),this.inkManager.destroy(),this.shopManager.destroy(),this.catFoodManager.destroy(),this.containerElement.innerHTML="",this.gameUiContainer=null,this.setBodyStateClass(null),(s=document.querySelector("combo-counter"))==null||s.remove(),(i=this.diagonalWipeElement)==null||i.reset(),console.log("GameManager: Shutdown completado.")}getUIManager(){if(!this.uiManager)throw new Error("UIManager no inicializado en GameManager.");return this.uiManager}getQuizUiContainerElement(){return(!this.gameUiContainer||!this.containerElement.contains(this.gameUiContainer))&&(this.gameUiContainer=this.containerElement.querySelector("quiz-ui-container")),this.gameUiContainer}setQuizUiFaded(e){const a=this.getQuizUiContainerElement();a&&(a.isFaded=e)}setCatDragState(e){this.setQuizUiFaded(e),this.drawingCanvasLayerElement&&(this.drawingCanvasLayerElement.isPointerLockdown=e,!e&&this.inkManager&&this.inkManager.updateCanvasActiveState())}resetGame(){var e;console.log("GameManager: resetGame() - Iniciando reseteo completo..."),this.stop(),this.playerData?(this.playerData.reset(),console.log("GameManager: resetGame() - PlayerData reseteado.")):console.warn("GameManager: resetGame() - PlayerData no disponible para resetear."),this.quizSystem?(this.quizSystem.resetAvailableQuestions(),console.log("GameManager: resetGame() - QuizSystem reseteado.")):console.warn("GameManager: resetGame() - QuizSystem no disponible para resetear."),this.catManager?(this.catManager.removeAllCats(),console.log("GameManager: resetGame() - CatManager.removeAllCats() llamado.")):console.warn("GameManager: resetGame() - CatManager no disponible."),this.inkManager?(this.inkManager.destroy(),console.log("GameManager: resetGame() - InkManager.destroy() llamado.")):console.warn("GameManager: resetGame() - InkManager no disponible."),this.catFoodManager?(this.catFoodManager.destroy(),console.log("GameManager: resetGame() - CatFoodManager.destroy() llamado.")):console.warn("GameManager: resetGame() - CatFoodManager no disponible."),this.physicsManager&&console.log("GameManager: resetGame() - Asumiendo que removeAllCats limpió los cuerpos físicos."),this.shopManager?(this.shopManager.closeShop(),console.log("GameManager: resetGame() - ShopManager.closeShop() llamado.")):console.warn("GameManager: resetGame() - ShopManager no disponible."),this.hideToolControls(),this.hideShopButton(),this.gameUiContainer=null,(e=document.querySelector("combo-counter"))==null||e.remove(),console.log("GameManager: resetGame() - Transicionando a MainMenuState..."),this.stateMachine.changeState("MainMenu",void 0,"gq-wipe-transition")}showShopButton(){if(!this.shopButtonInstance){const a=document.createElement("shop-button-component");a.id="shop-button-global",a.titleText="Abrir Tienda (S)",document.body.appendChild(a),this.shopButtonInstance=a,this.shopButtonInteractionListener=()=>this.handleShopButtonInteraction(),a.addEventListener("shop-button-interaction",this.shopButtonInteractionListener)}this.shopButtonInstance.classList.remove("hidden");const e=this.shopManager.getShopPopupElement();e&&this.addShopCloseListener(e),this.updateShopButtonState()}hideShopButton(){if(this.shopButtonInstance){this.shopButtonInstance.classList.add("hidden"),this.removeShopButtonListener();const e=this.shopManager.getShopPopupElement();e&&this.removeShopCloseListener(e)}}handleShopButtonInteraction(){const e=this.getAudioManager();e.isReady()||e.init(),this.shopManager.isShopOpen()||(this.openShop(),e==null||e.playSound("ui_confirm"))}removeShopButtonListener(){this.shopButtonInstance&&this.shopButtonInteractionListener&&(this.shopButtonInstance.removeEventListener("shop-button-interaction",this.shopButtonInteractionListener),this.shopButtonInteractionListener=null)}handleShopCloseRequest(){this.closeShop(),this.getAudioManager().playSound("ui_cancel")}addShopCloseListener(e){this.removeShopCloseListener(e),this.shopCloseRequestListener=()=>this.handleShopCloseRequest(),e.addEventListener("close-requested",this.shopCloseRequestListener)}removeShopCloseListener(e){e&&this.shopCloseRequestListener&&(e.removeEventListener("close-requested",this.shopCloseRequestListener),this.shopCloseRequestListener=null)}openShop(){this.shopManager?(this.shopManager.openShop(),this.updateShopButtonState()):console.warn("GameManager: openShop() llamado pero ShopManager no está disponible.")}closeShop(){this.shopManager?(this.shopManager.closeShop(),queueMicrotask(()=>{this.updateShopButtonState()})):console.warn("GameManager: closeShop() llamado pero ShopManager no está disponible.")}updateShopButtonState(){if(this.shopButtonInstance&&this.shopManager){const e=this.shopManager.isShopOpen(),a=this.stateMachine.getCurrentStateName()==="QuizGameplay";this.shopButtonInstance.disabled=e||!a}}showToolControls(){const e=this.controlElements.controlsContainer;e?(e.classList.remove("hidden"),this.updateControlVisibilityBasedOnUnlocks()):console.warn("[GameManager] Contenedor de controles (#right-controls) no encontrado.")}hideToolControls(){const e=this.controlElements.controlsContainer;e&&e.classList.add("hidden")}updateControlVisibilityBasedOnUnlocks(){const e=this.playerData.isDrawingUnlocked,a=this.playerData.isCatFoodUnlocked;this.controlElements.drawingButtonsContainer&&this.controlElements.drawingButtonsContainer.classList.toggle("hidden",!e),this.controlElements.catFoodUiContainer&&this.controlElements.catFoodUiContainer.classList.toggle("hidden",!a),this.updateToolButtonStates()}addThemeChangeListener(){this.removeThemeChangeListener(),this.themeChangeListener=e=>{this.stateMachine.getCurrentState()instanceof xe&&this.uiManager.rebuildInterface(),this.shopManager.isShopOpen()&&this.shopManager.updateShopUI()},document.addEventListener("theme-changed",this.themeChangeListener)}removeThemeChangeListener(){this.themeChangeListener&&(document.removeEventListener("theme-changed",this.themeChangeListener),this.themeChangeListener=null)}addKeyboardListener(){this.removeKeyboardListener(),this.keydownListener=e=>{if(e.key==="Escape"){if(this.shopManager.isShopOpen()){this.closeShop(),this.audioManager.playSound("ui_cancel");return}if(this.uiManager.isExplanationVisible())return}if(this.shopManager.isShopOpen()||this.uiManager.isExplanationVisible())return;const a=this.stateMachine.getCurrentStateName();if(a==="QuizGameplay")switch(e.key.toLowerCase()){case"b":this.activateBrush();break;case"c":this.playerData.isDrawingUnlocked&&this.playerData.inkSpentSinceLastClear>0&&this.inkManager.clearInkLines();break;case"f":this.activateCatFood();break;case"s":this.shopButtonInstance&&!this.shopButtonInstance.disabled&&this.handleShopButtonInteraction();break;case"t":this.themeManager.cycleTheme();break}else["MainMenu","GameOver","Results"].includes(a||"")&&e.key.toLowerCase()==="t"&&this.themeManager.cycleTheme()},window.addEventListener("keydown",this.keydownListener)}removeKeyboardListener(){this.keydownListener&&(window.removeEventListener("keydown",this.keydownListener),this.keydownListener=null)}getLives(){return this.playerData.lives}decrementLives(){this.playerData.lives>0&&(this.playerData.lives--,this.updateExternalLivesUI())}incrementLives(){this.playerData.lives++,this.updateExternalLivesUI()}enableDrawingFeature(){try{return this.inkManager.init(),this.updateInkUI(),this.updateControlVisibilityBasedOnUnlocks(),!0}catch(e){return console.error("GameManager: Error habilitando dibujo:",e),!1}}enableCatFoodFeature(){try{this.catFoodManager.enable(),this.updateCatFoodUI(),this.updateControlVisibilityBasedOnUnlocks()}catch(e){console.error("GameManager: Error habilitando comida:",e)}}updateInkUI(){this.uiManager.updateInkVisibility(this.playerData.isDrawingUnlocked),this.uiManager.updateInkBar(),this.updateToolButtonStates()}updateExternalLivesUI(){this.uiManager.updateLivesDisplay(this.playerData.lives)}updateExternalShieldUI(e){this.uiManager.updateShieldIcon(e)}updateExternalHintUI(e){this.uiManager.updateHintIcon(e)}updateExternalScoreUI(){this.uiManager.updateScoreDisplay(this.playerData.score)}updateCatFoodUI(){this.uiManager.updateCatFoodBar(this.playerData.currentCatFood,this.playerData.getMaxCatFood()),this.updateToolButtonStates()}activateBrush(){const e=Date.now();e-this._lastToolToggleTime<this.TOOL_TOGGLE_DEBOUNCE_MS||(this._lastToolToggleTime=e,this.playerData.isDrawingUnlocked&&(this.catFoodManager.isActive&&this.catFoodManager.toggleActive(!1),this.inkManager.toggleBrush()))}activateCatFood(){const e=Date.now();e-this._lastToolToggleTime<this.TOOL_TOGGLE_DEBOUNCE_MS||(this._lastToolToggleTime=e,this.playerData.isCatFoodUnlocked&&(this.inkManager.isBrushActive&&this.inkManager.toggleBrush(!1),this.catFoodManager.toggleActive()))}updateToolButtonStates(){this.controlElements.brushToolButton&&(this.controlElements.brushToolButton.active=this.inkManager.isBrushActive,this.controlElements.brushToolButton.disabled=!this.playerData.isDrawingUnlocked||this.playerData.currentInk<=0&&!this.inkManager.isBrushActive),this.controlElements.clearInkToolButton&&(this.controlElements.clearInkToolButton.disabled=!this.playerData.isDrawingUnlocked||this.playerData.inkSpentSinceLastClear<=0),this.controlElements.catFoodToolButton&&(this.controlElements.catFoodToolButton.active=this.catFoodManager.isActive,this.controlElements.catFoodToolButton.disabled=!this.playerData.isCatFoodUnlocked||this.playerData.currentCatFood<=0&&!this.catFoodManager.isActive,this.uiManager.updateCatFoodBar(this.playerData.currentCatFood,this.playerData.getMaxCatFood())),this.updateShopButtonState()}getQuizSystem(){return this.quizSystem}getPhysicsManager(){return this.physicsManager}getStateMachine(){return this.stateMachine}getAudioManager(){return this.audioManager}getCatManager(){return this.catManager}getShopManager(){return this.shopManager}getPlayerData(){return this.playerData}getInkManager(){return this.inkManager}getThemeManager(){return this.themeManager}getCatFoodManager(){return this.catFoodManager}getContainerElement(){return this.containerElement}getCurrentState(){return this.stateMachine.getCurrentState()}getControlElements(){return this.controlElements}getCatDisplayArea(){return this.catDisplayAreaElement}getDrawingCanvasLayer(){return this.drawingCanvasLayerElement}getLoadingMessages(){return this.loadingMessages.length>0?this.loadingMessages:["Cargando..."]}}console.log("DOM Cargado. Iniciando Quiz Felino...");const nt=document.getElementById("app");if(!nt)console.error("Error: Elemento #app no encontrado en el DOM.");else{nt.innerHTML="",console.log("Preparado para inicializar GameManager.");const f=new eo(nt);window.gameManager=f,console.log("GameManager expuesto como window.gameManager para depuración.");const e=()=>{const a=f.getAudioManager();a.isReady()||(console.log("User interaction detected, attempting to initialize audio..."),a.init()),document.body.removeEventListener("click",e,{capture:!0}),document.body.removeEventListener("touchstart",e,{capture:!0}),console.log("One-time audio init listeners removed.")};console.log("Adding one-time listeners for audio initialization..."),document.body.addEventListener("click",e,{once:!0,capture:!0}),document.body.addEventListener("touchstart",e,{once:!0,capture:!0,passive:!1}),f.init().then(()=>{f.create(),f.start(),console.log("GameManager inicializado y arrancado.")}).catch(a=>{console.error("Error durante la inicialización del juego:",a),nt.innerHTML=`Error al cargar el juego: ${a.message}. Revisa la consola.`})}
