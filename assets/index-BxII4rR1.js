(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const t of a)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function i(a){const t={};return a.integrity&&(t.integrity=a.integrity),a.referrerPolicy&&(t.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?t.credentials="include":a.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(a){if(a.ep)return;a.ep=!0;const t=i(a);fetch(a.href,t)}})();var Wt=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function $i(u){return u&&u.__esModule&&Object.prototype.hasOwnProperty.call(u,"default")?u.default:u}var lt={exports:{}};/*!
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
 */var Bi=lt.exports,jt;function Oi(){return jt||(jt=1,function(u,e){(function(s,a){u.exports=a()})(Bi,function(){return function(i){var s={};function a(t){if(s[t])return s[t].exports;var o=s[t]={i:t,l:!1,exports:{}};return i[t].call(o.exports,o,o.exports,a),o.l=!0,o.exports}return a.m=i,a.c=s,a.d=function(t,o,l){a.o(t,o)||Object.defineProperty(t,o,{enumerable:!0,get:l})},a.r=function(t){typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,o){if(o&1&&(t=a(t)),o&8||o&4&&typeof t=="object"&&t&&t.__esModule)return t;var l=Object.create(null);if(a.r(l),Object.defineProperty(l,"default",{enumerable:!0,value:t}),o&2&&typeof t!="string")for(var r in t)a.d(l,r,(function(f){return t[f]}).bind(null,r));return l},a.n=function(t){var o=t&&t.__esModule?function(){return t.default}:function(){return t};return a.d(o,"a",o),o},a.o=function(t,o){return Object.prototype.hasOwnProperty.call(t,o)},a.p="",a(a.s=20)}([function(i,s){var a={};i.exports=a,function(){a._baseDelta=1e3/60,a._nextId=0,a._seed=0,a._nowStartTime=+new Date,a._warnedOnce={},a._decomp=null,a.extend=function(o,l){var r,f;typeof l=="boolean"?(r=2,f=l):(r=1,f=!0);for(var c=r;c<arguments.length;c++){var g=arguments[c];if(g)for(var h in g)f&&g[h]&&g[h].constructor===Object&&(!o[h]||o[h].constructor===Object)?(o[h]=o[h]||{},a.extend(o[h],f,g[h])):o[h]=g[h]}return o},a.clone=function(o,l){return a.extend({},l,o)},a.keys=function(o){if(Object.keys)return Object.keys(o);var l=[];for(var r in o)l.push(r);return l},a.values=function(o){var l=[];if(Object.keys){for(var r=Object.keys(o),f=0;f<r.length;f++)l.push(o[r[f]]);return l}for(var c in o)l.push(o[c]);return l},a.get=function(o,l,r,f){l=l.split(".").slice(r,f);for(var c=0;c<l.length;c+=1)o=o[l[c]];return o},a.set=function(o,l,r,f,c){var g=l.split(".").slice(f,c);return a.get(o,l,0,-1)[g[g.length-1]]=r,r},a.shuffle=function(o){for(var l=o.length-1;l>0;l--){var r=Math.floor(a.random()*(l+1)),f=o[l];o[l]=o[r],o[r]=f}return o},a.choose=function(o){return o[Math.floor(a.random()*o.length)]},a.isElement=function(o){return typeof HTMLElement<"u"?o instanceof HTMLElement:!!(o&&o.nodeType&&o.nodeName)},a.isArray=function(o){return Object.prototype.toString.call(o)==="[object Array]"},a.isFunction=function(o){return typeof o=="function"},a.isPlainObject=function(o){return typeof o=="object"&&o.constructor===Object},a.isString=function(o){return toString.call(o)==="[object String]"},a.clamp=function(o,l,r){return o<l?l:o>r?r:o},a.sign=function(o){return o<0?-1:1},a.now=function(){if(typeof window<"u"&&window.performance){if(window.performance.now)return window.performance.now();if(window.performance.webkitNow)return window.performance.webkitNow()}return Date.now?Date.now():new Date-a._nowStartTime},a.random=function(o,l){return o=typeof o<"u"?o:0,l=typeof l<"u"?l:1,o+t()*(l-o)};var t=function(){return a._seed=(a._seed*9301+49297)%233280,a._seed/233280};a.colorToNumber=function(o){return o=o.replace("#",""),o.length==3&&(o=o.charAt(0)+o.charAt(0)+o.charAt(1)+o.charAt(1)+o.charAt(2)+o.charAt(2)),parseInt(o,16)},a.logLevel=1,a.log=function(){console&&a.logLevel>0&&a.logLevel<=3&&console.log.apply(console,["matter-js:"].concat(Array.prototype.slice.call(arguments)))},a.info=function(){console&&a.logLevel>0&&a.logLevel<=2&&console.info.apply(console,["matter-js:"].concat(Array.prototype.slice.call(arguments)))},a.warn=function(){console&&a.logLevel>0&&a.logLevel<=3&&console.warn.apply(console,["matter-js:"].concat(Array.prototype.slice.call(arguments)))},a.warnOnce=function(){var o=Array.prototype.slice.call(arguments).join(" ");a._warnedOnce[o]||(a.warn(o),a._warnedOnce[o]=!0)},a.deprecated=function(o,l,r){o[l]=a.chain(function(){a.warnOnce("🔅 deprecated 🔅",r)},o[l])},a.nextId=function(){return a._nextId++},a.indexOf=function(o,l){if(o.indexOf)return o.indexOf(l);for(var r=0;r<o.length;r++)if(o[r]===l)return r;return-1},a.map=function(o,l){if(o.map)return o.map(l);for(var r=[],f=0;f<o.length;f+=1)r.push(l(o[f]));return r},a.topologicalSort=function(o){var l=[],r=[],f=[];for(var c in o)!r[c]&&!f[c]&&a._topologicalSort(c,r,f,o,l);return l},a._topologicalSort=function(o,l,r,f,c){var g=f[o]||[];r[o]=!0;for(var h=0;h<g.length;h+=1){var n=g[h];r[n]||l[n]||a._topologicalSort(n,l,r,f,c)}r[o]=!1,l[o]=!0,c.push(o)},a.chain=function(){for(var o=[],l=0;l<arguments.length;l+=1){var r=arguments[l];r._chained?o.push.apply(o,r._chained):o.push(r)}var f=function(){for(var c,g=new Array(arguments.length),h=0,n=arguments.length;h<n;h++)g[h]=arguments[h];for(h=0;h<o.length;h+=1){var d=o[h].apply(c,g);typeof d<"u"&&(c=d)}return c};return f._chained=o,f},a.chainPathBefore=function(o,l,r){return a.set(o,l,a.chain(r,a.get(o,l)))},a.chainPathAfter=function(o,l,r){return a.set(o,l,a.chain(a.get(o,l),r))},a.setDecomp=function(o){a._decomp=o},a.getDecomp=function(){var o=a._decomp;try{!o&&typeof window<"u"&&(o=window.decomp),!o&&typeof Wt<"u"&&(o=Wt.decomp)}catch{o=null}return o}}()},function(i,s){var a={};i.exports=a,function(){a.create=function(t){var o={min:{x:0,y:0},max:{x:0,y:0}};return t&&a.update(o,t),o},a.update=function(t,o,l){t.min.x=1/0,t.max.x=-1/0,t.min.y=1/0,t.max.y=-1/0;for(var r=0;r<o.length;r++){var f=o[r];f.x>t.max.x&&(t.max.x=f.x),f.x<t.min.x&&(t.min.x=f.x),f.y>t.max.y&&(t.max.y=f.y),f.y<t.min.y&&(t.min.y=f.y)}l&&(l.x>0?t.max.x+=l.x:t.min.x+=l.x,l.y>0?t.max.y+=l.y:t.min.y+=l.y)},a.contains=function(t,o){return o.x>=t.min.x&&o.x<=t.max.x&&o.y>=t.min.y&&o.y<=t.max.y},a.overlaps=function(t,o){return t.min.x<=o.max.x&&t.max.x>=o.min.x&&t.max.y>=o.min.y&&t.min.y<=o.max.y},a.translate=function(t,o){t.min.x+=o.x,t.max.x+=o.x,t.min.y+=o.y,t.max.y+=o.y},a.shift=function(t,o){var l=t.max.x-t.min.x,r=t.max.y-t.min.y;t.min.x=o.x,t.max.x=o.x+l,t.min.y=o.y,t.max.y=o.y+r}}()},function(i,s){var a={};i.exports=a,function(){a.create=function(t,o){return{x:t||0,y:o||0}},a.clone=function(t){return{x:t.x,y:t.y}},a.magnitude=function(t){return Math.sqrt(t.x*t.x+t.y*t.y)},a.magnitudeSquared=function(t){return t.x*t.x+t.y*t.y},a.rotate=function(t,o,l){var r=Math.cos(o),f=Math.sin(o);l||(l={});var c=t.x*r-t.y*f;return l.y=t.x*f+t.y*r,l.x=c,l},a.rotateAbout=function(t,o,l,r){var f=Math.cos(o),c=Math.sin(o);r||(r={});var g=l.x+((t.x-l.x)*f-(t.y-l.y)*c);return r.y=l.y+((t.x-l.x)*c+(t.y-l.y)*f),r.x=g,r},a.normalise=function(t){var o=a.magnitude(t);return o===0?{x:0,y:0}:{x:t.x/o,y:t.y/o}},a.dot=function(t,o){return t.x*o.x+t.y*o.y},a.cross=function(t,o){return t.x*o.y-t.y*o.x},a.cross3=function(t,o,l){return(o.x-t.x)*(l.y-t.y)-(o.y-t.y)*(l.x-t.x)},a.add=function(t,o,l){return l||(l={}),l.x=t.x+o.x,l.y=t.y+o.y,l},a.sub=function(t,o,l){return l||(l={}),l.x=t.x-o.x,l.y=t.y-o.y,l},a.mult=function(t,o){return{x:t.x*o,y:t.y*o}},a.div=function(t,o){return{x:t.x/o,y:t.y/o}},a.perp=function(t,o){return o=o===!0?-1:1,{x:o*-t.y,y:o*t.x}},a.neg=function(t){return{x:-t.x,y:-t.y}},a.angle=function(t,o){return Math.atan2(o.y-t.y,o.x-t.x)},a._temp=[a.create(),a.create(),a.create(),a.create(),a.create(),a.create()]}()},function(i,s,a){var t={};i.exports=t;var o=a(2),l=a(0);(function(){t.create=function(r,f){for(var c=[],g=0;g<r.length;g++){var h=r[g],n={x:h.x,y:h.y,index:g,body:f,isInternal:!1};c.push(n)}return c},t.fromPath=function(r,f){var c=/L?\s*([-\d.e]+)[\s,]*([-\d.e]+)*/ig,g=[];return r.replace(c,function(h,n,d){g.push({x:parseFloat(n),y:parseFloat(d)})}),t.create(g,f)},t.centre=function(r){for(var f=t.area(r,!0),c={x:0,y:0},g,h,n,d=0;d<r.length;d++)n=(d+1)%r.length,g=o.cross(r[d],r[n]),h=o.mult(o.add(r[d],r[n]),g),c=o.add(c,h);return o.div(c,6*f)},t.mean=function(r){for(var f={x:0,y:0},c=0;c<r.length;c++)f.x+=r[c].x,f.y+=r[c].y;return o.div(f,r.length)},t.area=function(r,f){for(var c=0,g=r.length-1,h=0;h<r.length;h++)c+=(r[g].x-r[h].x)*(r[g].y+r[h].y),g=h;return f?c/2:Math.abs(c)/2},t.inertia=function(r,f){for(var c=0,g=0,h=r,n,d,p=0;p<h.length;p++)d=(p+1)%h.length,n=Math.abs(o.cross(h[d],h[p])),c+=n*(o.dot(h[d],h[d])+o.dot(h[d],h[p])+o.dot(h[p],h[p])),g+=n;return f/6*(c/g)},t.translate=function(r,f,c){c=typeof c<"u"?c:1;var g=r.length,h=f.x*c,n=f.y*c,d;for(d=0;d<g;d++)r[d].x+=h,r[d].y+=n;return r},t.rotate=function(r,f,c){if(f!==0){var g=Math.cos(f),h=Math.sin(f),n=c.x,d=c.y,p=r.length,m,b,S,E;for(E=0;E<p;E++)m=r[E],b=m.x-n,S=m.y-d,m.x=n+(b*g-S*h),m.y=d+(b*h+S*g);return r}},t.contains=function(r,f){for(var c=f.x,g=f.y,h=r.length,n=r[h-1],d,p=0;p<h;p++){if(d=r[p],(c-n.x)*(d.y-n.y)+(g-n.y)*(n.x-d.x)>0)return!1;n=d}return!0},t.scale=function(r,f,c,g){if(f===1&&c===1)return r;g=g||t.centre(r);for(var h,n,d=0;d<r.length;d++)h=r[d],n=o.sub(h,g),r[d].x=g.x+n.x*f,r[d].y=g.y+n.y*c;return r},t.chamfer=function(r,f,c,g,h){typeof f=="number"?f=[f]:f=f||[8],c=typeof c<"u"?c:-1,g=g||2,h=h||14;for(var n=[],d=0;d<r.length;d++){var p=r[d-1>=0?d-1:r.length-1],m=r[d],b=r[(d+1)%r.length],S=f[d<f.length?d:f.length-1];if(S===0){n.push(m);continue}var E=o.normalise({x:m.y-p.y,y:p.x-m.x}),A=o.normalise({x:b.y-m.y,y:m.x-b.x}),v=Math.sqrt(2*Math.pow(S,2)),x=o.mult(l.clone(E),S),C=o.normalise(o.mult(o.add(E,A),.5)),y=o.sub(m,o.mult(C,v)),M=c;c===-1&&(M=Math.pow(S,.32)*1.75),M=l.clamp(M,g,h),M%2===1&&(M+=1);for(var w=Math.acos(o.dot(E,A)),I=w/M,q=0;q<M;q++)n.push(o.add(o.rotate(x,I*q),y))}return n},t.clockwiseSort=function(r){var f=t.mean(r);return r.sort(function(c,g){return o.angle(f,c)-o.angle(f,g)}),r},t.isConvex=function(r){var f=0,c=r.length,g,h,n,d;if(c<3)return null;for(g=0;g<c;g++)if(h=(g+1)%c,n=(g+2)%c,d=(r[h].x-r[g].x)*(r[n].y-r[h].y),d-=(r[h].y-r[g].y)*(r[n].x-r[h].x),d<0?f|=1:d>0&&(f|=2),f===3)return!1;return f!==0?!0:null},t.hull=function(r){var f=[],c=[],g,h;for(r=r.slice(0),r.sort(function(n,d){var p=n.x-d.x;return p!==0?p:n.y-d.y}),h=0;h<r.length;h+=1){for(g=r[h];c.length>=2&&o.cross3(c[c.length-2],c[c.length-1],g)<=0;)c.pop();c.push(g)}for(h=r.length-1;h>=0;h-=1){for(g=r[h];f.length>=2&&o.cross3(f[f.length-2],f[f.length-1],g)<=0;)f.pop();f.push(g)}return f.pop(),c.pop(),f.concat(c)}})()},function(i,s,a){var t={};i.exports=t;var o=a(3),l=a(2),r=a(7),f=a(0),c=a(1),g=a(11);(function(){t._timeCorrection=!0,t._inertiaScale=4,t._nextCollidingGroupId=1,t._nextNonCollidingGroupId=-1,t._nextCategory=1,t._baseDelta=1e3/60,t.create=function(n){var d={id:f.nextId(),type:"body",label:"Body",parts:[],plugin:{},angle:0,vertices:o.fromPath("L 0 0 L 40 0 L 40 40 L 0 40"),position:{x:0,y:0},force:{x:0,y:0},torque:0,positionImpulse:{x:0,y:0},constraintImpulse:{x:0,y:0,angle:0},totalContacts:0,speed:0,angularSpeed:0,velocity:{x:0,y:0},angularVelocity:0,isSensor:!1,isStatic:!1,isSleeping:!1,motion:0,sleepThreshold:60,density:.001,restitution:0,friction:.1,frictionStatic:.5,frictionAir:.01,collisionFilter:{category:1,mask:4294967295,group:0},slop:.05,timeScale:1,render:{visible:!0,opacity:1,strokeStyle:null,fillStyle:null,lineWidth:null,sprite:{xScale:1,yScale:1,xOffset:0,yOffset:0}},events:null,bounds:null,chamfer:null,circleRadius:0,positionPrev:null,anglePrev:0,parent:null,axes:null,area:0,mass:0,inertia:0,deltaTime:16.666666666666668,_original:null},p=f.extend(d,n);return h(p,n),p},t.nextGroup=function(n){return n?t._nextNonCollidingGroupId--:t._nextCollidingGroupId++},t.nextCategory=function(){return t._nextCategory=t._nextCategory<<1,t._nextCategory};var h=function(n,d){d=d||{},t.set(n,{bounds:n.bounds||c.create(n.vertices),positionPrev:n.positionPrev||l.clone(n.position),anglePrev:n.anglePrev||n.angle,vertices:n.vertices,parts:n.parts||[n],isStatic:n.isStatic,isSleeping:n.isSleeping,parent:n.parent||n}),o.rotate(n.vertices,n.angle,n.position),g.rotate(n.axes,n.angle),c.update(n.bounds,n.vertices,n.velocity),t.set(n,{axes:d.axes||n.axes,area:d.area||n.area,mass:d.mass||n.mass,inertia:d.inertia||n.inertia});var p=n.isStatic?"#14151f":f.choose(["#f19648","#f5d259","#f55a3c","#063e7b","#ececd1"]),m=n.isStatic?"#555":"#ccc",b=n.isStatic&&n.render.fillStyle===null?1:0;n.render.fillStyle=n.render.fillStyle||p,n.render.strokeStyle=n.render.strokeStyle||m,n.render.lineWidth=n.render.lineWidth||b,n.render.sprite.xOffset+=-(n.bounds.min.x-n.position.x)/(n.bounds.max.x-n.bounds.min.x),n.render.sprite.yOffset+=-(n.bounds.min.y-n.position.y)/(n.bounds.max.y-n.bounds.min.y)};t.set=function(n,d,p){var m;typeof d=="string"&&(m=d,d={},d[m]=p);for(m in d)if(Object.prototype.hasOwnProperty.call(d,m))switch(p=d[m],m){case"isStatic":t.setStatic(n,p);break;case"isSleeping":r.set(n,p);break;case"mass":t.setMass(n,p);break;case"density":t.setDensity(n,p);break;case"inertia":t.setInertia(n,p);break;case"vertices":t.setVertices(n,p);break;case"position":t.setPosition(n,p);break;case"angle":t.setAngle(n,p);break;case"velocity":t.setVelocity(n,p);break;case"angularVelocity":t.setAngularVelocity(n,p);break;case"speed":t.setSpeed(n,p);break;case"angularSpeed":t.setAngularSpeed(n,p);break;case"parts":t.setParts(n,p);break;case"centre":t.setCentre(n,p);break;default:n[m]=p}},t.setStatic=function(n,d){for(var p=0;p<n.parts.length;p++){var m=n.parts[p];d?(m.isStatic||(m._original={restitution:m.restitution,friction:m.friction,mass:m.mass,inertia:m.inertia,density:m.density,inverseMass:m.inverseMass,inverseInertia:m.inverseInertia}),m.restitution=0,m.friction=1,m.mass=m.inertia=m.density=1/0,m.inverseMass=m.inverseInertia=0,m.positionPrev.x=m.position.x,m.positionPrev.y=m.position.y,m.anglePrev=m.angle,m.angularVelocity=0,m.speed=0,m.angularSpeed=0,m.motion=0):m._original&&(m.restitution=m._original.restitution,m.friction=m._original.friction,m.mass=m._original.mass,m.inertia=m._original.inertia,m.density=m._original.density,m.inverseMass=m._original.inverseMass,m.inverseInertia=m._original.inverseInertia,m._original=null),m.isStatic=d}},t.setMass=function(n,d){var p=n.inertia/(n.mass/6);n.inertia=p*(d/6),n.inverseInertia=1/n.inertia,n.mass=d,n.inverseMass=1/n.mass,n.density=n.mass/n.area},t.setDensity=function(n,d){t.setMass(n,d*n.area),n.density=d},t.setInertia=function(n,d){n.inertia=d,n.inverseInertia=1/n.inertia},t.setVertices=function(n,d){d[0].body===n?n.vertices=d:n.vertices=o.create(d,n),n.axes=g.fromVertices(n.vertices),n.area=o.area(n.vertices),t.setMass(n,n.density*n.area);var p=o.centre(n.vertices);o.translate(n.vertices,p,-1),t.setInertia(n,t._inertiaScale*o.inertia(n.vertices,n.mass)),o.translate(n.vertices,n.position),c.update(n.bounds,n.vertices,n.velocity)},t.setParts=function(n,d,p){var m;for(d=d.slice(0),n.parts.length=0,n.parts.push(n),n.parent=n,m=0;m<d.length;m++){var b=d[m];b!==n&&(b.parent=n,n.parts.push(b))}if(n.parts.length!==1){if(p=typeof p<"u"?p:!0,p){var S=[];for(m=0;m<d.length;m++)S=S.concat(d[m].vertices);o.clockwiseSort(S);var E=o.hull(S),A=o.centre(E);t.setVertices(n,E),o.translate(n.vertices,A)}var v=t._totalProperties(n);n.area=v.area,n.parent=n,n.position.x=v.centre.x,n.position.y=v.centre.y,n.positionPrev.x=v.centre.x,n.positionPrev.y=v.centre.y,t.setMass(n,v.mass),t.setInertia(n,v.inertia),t.setPosition(n,v.centre)}},t.setCentre=function(n,d,p){p?(n.positionPrev.x+=d.x,n.positionPrev.y+=d.y,n.position.x+=d.x,n.position.y+=d.y):(n.positionPrev.x=d.x-(n.position.x-n.positionPrev.x),n.positionPrev.y=d.y-(n.position.y-n.positionPrev.y),n.position.x=d.x,n.position.y=d.y)},t.setPosition=function(n,d,p){var m=l.sub(d,n.position);p?(n.positionPrev.x=n.position.x,n.positionPrev.y=n.position.y,n.velocity.x=m.x,n.velocity.y=m.y,n.speed=l.magnitude(m)):(n.positionPrev.x+=m.x,n.positionPrev.y+=m.y);for(var b=0;b<n.parts.length;b++){var S=n.parts[b];S.position.x+=m.x,S.position.y+=m.y,o.translate(S.vertices,m),c.update(S.bounds,S.vertices,n.velocity)}},t.setAngle=function(n,d,p){var m=d-n.angle;p?(n.anglePrev=n.angle,n.angularVelocity=m,n.angularSpeed=Math.abs(m)):n.anglePrev+=m;for(var b=0;b<n.parts.length;b++){var S=n.parts[b];S.angle+=m,o.rotate(S.vertices,m,n.position),g.rotate(S.axes,m),c.update(S.bounds,S.vertices,n.velocity),b>0&&l.rotateAbout(S.position,m,n.position,S.position)}},t.setVelocity=function(n,d){var p=n.deltaTime/t._baseDelta;n.positionPrev.x=n.position.x-d.x*p,n.positionPrev.y=n.position.y-d.y*p,n.velocity.x=(n.position.x-n.positionPrev.x)/p,n.velocity.y=(n.position.y-n.positionPrev.y)/p,n.speed=l.magnitude(n.velocity)},t.getVelocity=function(n){var d=t._baseDelta/n.deltaTime;return{x:(n.position.x-n.positionPrev.x)*d,y:(n.position.y-n.positionPrev.y)*d}},t.getSpeed=function(n){return l.magnitude(t.getVelocity(n))},t.setSpeed=function(n,d){t.setVelocity(n,l.mult(l.normalise(t.getVelocity(n)),d))},t.setAngularVelocity=function(n,d){var p=n.deltaTime/t._baseDelta;n.anglePrev=n.angle-d*p,n.angularVelocity=(n.angle-n.anglePrev)/p,n.angularSpeed=Math.abs(n.angularVelocity)},t.getAngularVelocity=function(n){return(n.angle-n.anglePrev)*t._baseDelta/n.deltaTime},t.getAngularSpeed=function(n){return Math.abs(t.getAngularVelocity(n))},t.setAngularSpeed=function(n,d){t.setAngularVelocity(n,f.sign(t.getAngularVelocity(n))*d)},t.translate=function(n,d,p){t.setPosition(n,l.add(n.position,d),p)},t.rotate=function(n,d,p,m){if(!p)t.setAngle(n,n.angle+d,m);else{var b=Math.cos(d),S=Math.sin(d),E=n.position.x-p.x,A=n.position.y-p.y;t.setPosition(n,{x:p.x+(E*b-A*S),y:p.y+(E*S+A*b)},m),t.setAngle(n,n.angle+d,m)}},t.scale=function(n,d,p,m){var b=0,S=0;m=m||n.position;for(var E=0;E<n.parts.length;E++){var A=n.parts[E];o.scale(A.vertices,d,p,m),A.axes=g.fromVertices(A.vertices),A.area=o.area(A.vertices),t.setMass(A,n.density*A.area),o.translate(A.vertices,{x:-A.position.x,y:-A.position.y}),t.setInertia(A,t._inertiaScale*o.inertia(A.vertices,A.mass)),o.translate(A.vertices,{x:A.position.x,y:A.position.y}),E>0&&(b+=A.area,S+=A.inertia),A.position.x=m.x+(A.position.x-m.x)*d,A.position.y=m.y+(A.position.y-m.y)*p,c.update(A.bounds,A.vertices,n.velocity)}n.parts.length>1&&(n.area=b,n.isStatic||(t.setMass(n,n.density*b),t.setInertia(n,S))),n.circleRadius&&(d===p?n.circleRadius*=d:n.circleRadius=null)},t.update=function(n,d){d=(typeof d<"u"?d:1e3/60)*n.timeScale;var p=d*d,m=t._timeCorrection?d/(n.deltaTime||d):1,b=1-n.frictionAir*(d/f._baseDelta),S=(n.position.x-n.positionPrev.x)*m,E=(n.position.y-n.positionPrev.y)*m;n.velocity.x=S*b+n.force.x/n.mass*p,n.velocity.y=E*b+n.force.y/n.mass*p,n.positionPrev.x=n.position.x,n.positionPrev.y=n.position.y,n.position.x+=n.velocity.x,n.position.y+=n.velocity.y,n.deltaTime=d,n.angularVelocity=(n.angle-n.anglePrev)*b*m+n.torque/n.inertia*p,n.anglePrev=n.angle,n.angle+=n.angularVelocity;for(var A=0;A<n.parts.length;A++){var v=n.parts[A];o.translate(v.vertices,n.velocity),A>0&&(v.position.x+=n.velocity.x,v.position.y+=n.velocity.y),n.angularVelocity!==0&&(o.rotate(v.vertices,n.angularVelocity,n.position),g.rotate(v.axes,n.angularVelocity),A>0&&l.rotateAbout(v.position,n.angularVelocity,n.position,v.position)),c.update(v.bounds,v.vertices,n.velocity)}},t.updateVelocities=function(n){var d=t._baseDelta/n.deltaTime,p=n.velocity;p.x=(n.position.x-n.positionPrev.x)*d,p.y=(n.position.y-n.positionPrev.y)*d,n.speed=Math.sqrt(p.x*p.x+p.y*p.y),n.angularVelocity=(n.angle-n.anglePrev)*d,n.angularSpeed=Math.abs(n.angularVelocity)},t.applyForce=function(n,d,p){var m={x:d.x-n.position.x,y:d.y-n.position.y};n.force.x+=p.x,n.force.y+=p.y,n.torque+=m.x*p.y-m.y*p.x},t._totalProperties=function(n){for(var d={mass:0,area:0,inertia:0,centre:{x:0,y:0}},p=n.parts.length===1?0:1;p<n.parts.length;p++){var m=n.parts[p],b=m.mass!==1/0?m.mass:1;d.mass+=b,d.area+=m.area,d.inertia+=m.inertia,d.centre=l.add(d.centre,l.mult(m.position,b))}return d.centre=l.div(d.centre,d.mass),d}})()},function(i,s,a){var t={};i.exports=t;var o=a(0);(function(){t.on=function(l,r,f){for(var c=r.split(" "),g,h=0;h<c.length;h++)g=c[h],l.events=l.events||{},l.events[g]=l.events[g]||[],l.events[g].push(f);return f},t.off=function(l,r,f){if(!r){l.events={};return}typeof r=="function"&&(f=r,r=o.keys(l.events).join(" "));for(var c=r.split(" "),g=0;g<c.length;g++){var h=l.events[c[g]],n=[];if(f&&h)for(var d=0;d<h.length;d++)h[d]!==f&&n.push(h[d]);l.events[c[g]]=n}},t.trigger=function(l,r,f){var c,g,h,n,d=l.events;if(d&&o.keys(d).length>0){f||(f={}),c=r.split(" ");for(var p=0;p<c.length;p++)if(g=c[p],h=d[g],h){n=o.clone(f,!1),n.name=g,n.source=l;for(var m=0;m<h.length;m++)h[m].apply(l,[n])}}}})()},function(i,s,a){var t={};i.exports=t;var o=a(5),l=a(0),r=a(1),f=a(4);(function(){t.create=function(c){return l.extend({id:l.nextId(),type:"composite",parent:null,isModified:!1,bodies:[],constraints:[],composites:[],label:"Composite",plugin:{},cache:{allBodies:null,allConstraints:null,allComposites:null}},c)},t.setModified=function(c,g,h,n){if(c.isModified=g,g&&c.cache&&(c.cache.allBodies=null,c.cache.allConstraints=null,c.cache.allComposites=null),h&&c.parent&&t.setModified(c.parent,g,h,n),n)for(var d=0;d<c.composites.length;d++){var p=c.composites[d];t.setModified(p,g,h,n)}},t.add=function(c,g){var h=[].concat(g);o.trigger(c,"beforeAdd",{object:g});for(var n=0;n<h.length;n++){var d=h[n];switch(d.type){case"body":if(d.parent!==d){l.warn("Composite.add: skipped adding a compound body part (you must add its parent instead)");break}t.addBody(c,d);break;case"constraint":t.addConstraint(c,d);break;case"composite":t.addComposite(c,d);break;case"mouseConstraint":t.addConstraint(c,d.constraint);break}}return o.trigger(c,"afterAdd",{object:g}),c},t.remove=function(c,g,h){var n=[].concat(g);o.trigger(c,"beforeRemove",{object:g});for(var d=0;d<n.length;d++){var p=n[d];switch(p.type){case"body":t.removeBody(c,p,h);break;case"constraint":t.removeConstraint(c,p,h);break;case"composite":t.removeComposite(c,p,h);break;case"mouseConstraint":t.removeConstraint(c,p.constraint);break}}return o.trigger(c,"afterRemove",{object:g}),c},t.addComposite=function(c,g){return c.composites.push(g),g.parent=c,t.setModified(c,!0,!0,!1),c},t.removeComposite=function(c,g,h){var n=l.indexOf(c.composites,g);if(n!==-1){var d=t.allBodies(g);t.removeCompositeAt(c,n);for(var p=0;p<d.length;p++)d[p].sleepCounter=0}if(h)for(var p=0;p<c.composites.length;p++)t.removeComposite(c.composites[p],g,!0);return c},t.removeCompositeAt=function(c,g){return c.composites.splice(g,1),t.setModified(c,!0,!0,!1),c},t.addBody=function(c,g){return c.bodies.push(g),t.setModified(c,!0,!0,!1),c},t.removeBody=function(c,g,h){var n=l.indexOf(c.bodies,g);if(n!==-1&&(t.removeBodyAt(c,n),g.sleepCounter=0),h)for(var d=0;d<c.composites.length;d++)t.removeBody(c.composites[d],g,!0);return c},t.removeBodyAt=function(c,g){return c.bodies.splice(g,1),t.setModified(c,!0,!0,!1),c},t.addConstraint=function(c,g){return c.constraints.push(g),t.setModified(c,!0,!0,!1),c},t.removeConstraint=function(c,g,h){var n=l.indexOf(c.constraints,g);if(n!==-1&&t.removeConstraintAt(c,n),h)for(var d=0;d<c.composites.length;d++)t.removeConstraint(c.composites[d],g,!0);return c},t.removeConstraintAt=function(c,g){return c.constraints.splice(g,1),t.setModified(c,!0,!0,!1),c},t.clear=function(c,g,h){if(h)for(var n=0;n<c.composites.length;n++)t.clear(c.composites[n],g,!0);return g?c.bodies=c.bodies.filter(function(d){return d.isStatic}):c.bodies.length=0,c.constraints.length=0,c.composites.length=0,t.setModified(c,!0,!0,!1),c},t.allBodies=function(c){if(c.cache&&c.cache.allBodies)return c.cache.allBodies;for(var g=[].concat(c.bodies),h=0;h<c.composites.length;h++)g=g.concat(t.allBodies(c.composites[h]));return c.cache&&(c.cache.allBodies=g),g},t.allConstraints=function(c){if(c.cache&&c.cache.allConstraints)return c.cache.allConstraints;for(var g=[].concat(c.constraints),h=0;h<c.composites.length;h++)g=g.concat(t.allConstraints(c.composites[h]));return c.cache&&(c.cache.allConstraints=g),g},t.allComposites=function(c){if(c.cache&&c.cache.allComposites)return c.cache.allComposites;for(var g=[].concat(c.composites),h=0;h<c.composites.length;h++)g=g.concat(t.allComposites(c.composites[h]));return c.cache&&(c.cache.allComposites=g),g},t.get=function(c,g,h){var n,d;switch(h){case"body":n=t.allBodies(c);break;case"constraint":n=t.allConstraints(c);break;case"composite":n=t.allComposites(c).concat(c);break}return n?(d=n.filter(function(p){return p.id.toString()===g.toString()}),d.length===0?null:d[0]):null},t.move=function(c,g,h){return t.remove(c,g),t.add(h,g),c},t.rebase=function(c){for(var g=t.allBodies(c).concat(t.allConstraints(c)).concat(t.allComposites(c)),h=0;h<g.length;h++)g[h].id=l.nextId();return c},t.translate=function(c,g,h){for(var n=h?t.allBodies(c):c.bodies,d=0;d<n.length;d++)f.translate(n[d],g);return c},t.rotate=function(c,g,h,n){for(var d=Math.cos(g),p=Math.sin(g),m=n?t.allBodies(c):c.bodies,b=0;b<m.length;b++){var S=m[b],E=S.position.x-h.x,A=S.position.y-h.y;f.setPosition(S,{x:h.x+(E*d-A*p),y:h.y+(E*p+A*d)}),f.rotate(S,g)}return c},t.scale=function(c,g,h,n,d){for(var p=d?t.allBodies(c):c.bodies,m=0;m<p.length;m++){var b=p[m],S=b.position.x-n.x,E=b.position.y-n.y;f.setPosition(b,{x:n.x+S*g,y:n.y+E*h}),f.scale(b,g,h)}return c},t.bounds=function(c){for(var g=t.allBodies(c),h=[],n=0;n<g.length;n+=1){var d=g[n];h.push(d.bounds.min,d.bounds.max)}return r.create(h)}})()},function(i,s,a){var t={};i.exports=t;var o=a(4),l=a(5),r=a(0);(function(){t._motionWakeThreshold=.18,t._motionSleepThreshold=.08,t._minBias=.9,t.update=function(f,c){for(var g=c/r._baseDelta,h=t._motionSleepThreshold,n=0;n<f.length;n++){var d=f[n],p=o.getSpeed(d),m=o.getAngularSpeed(d),b=p*p+m*m;if(d.force.x!==0||d.force.y!==0){t.set(d,!1);continue}var S=Math.min(d.motion,b),E=Math.max(d.motion,b);d.motion=t._minBias*S+(1-t._minBias)*E,d.sleepThreshold>0&&d.motion<h?(d.sleepCounter+=1,d.sleepCounter>=d.sleepThreshold/g&&t.set(d,!0)):d.sleepCounter>0&&(d.sleepCounter-=1)}},t.afterCollisions=function(f){for(var c=t._motionSleepThreshold,g=0;g<f.length;g++){var h=f[g];if(h.isActive){var n=h.collision,d=n.bodyA.parent,p=n.bodyB.parent;if(!(d.isSleeping&&p.isSleeping||d.isStatic||p.isStatic)&&(d.isSleeping||p.isSleeping)){var m=d.isSleeping&&!d.isStatic?d:p,b=m===d?p:d;!m.isStatic&&b.motion>c&&t.set(m,!1)}}}},t.set=function(f,c){var g=f.isSleeping;c?(f.isSleeping=!0,f.sleepCounter=f.sleepThreshold,f.positionImpulse.x=0,f.positionImpulse.y=0,f.positionPrev.x=f.position.x,f.positionPrev.y=f.position.y,f.anglePrev=f.angle,f.speed=0,f.angularSpeed=0,f.motion=0,g||l.trigger(f,"sleepStart")):(f.isSleeping=!1,f.sleepCounter=0,g&&l.trigger(f,"sleepEnd"))}})()},function(i,s,a){var t={};i.exports=t;var o=a(3),l=a(9);(function(){var r=[],f={overlap:0,axis:null},c={overlap:0,axis:null};t.create=function(g,h){return{pair:null,collided:!1,bodyA:g,bodyB:h,parentA:g.parent,parentB:h.parent,depth:0,normal:{x:0,y:0},tangent:{x:0,y:0},penetration:{x:0,y:0},supports:[null,null],supportCount:0}},t.collides=function(g,h,n){if(t._overlapAxes(f,g.vertices,h.vertices,g.axes),f.overlap<=0||(t._overlapAxes(c,h.vertices,g.vertices,h.axes),c.overlap<=0))return null;var d=n&&n.table[l.id(g,h)],p;d?p=d.collision:(p=t.create(g,h),p.collided=!0,p.bodyA=g.id<h.id?g:h,p.bodyB=g.id<h.id?h:g,p.parentA=p.bodyA.parent,p.parentB=p.bodyB.parent),g=p.bodyA,h=p.bodyB;var m;f.overlap<c.overlap?m=f:m=c;var b=p.normal,S=p.tangent,E=p.penetration,A=p.supports,v=m.overlap,x=m.axis,C=x.x,y=x.y,M=h.position.x-g.position.x,w=h.position.y-g.position.y;C*M+y*w>=0&&(C=-C,y=-y),b.x=C,b.y=y,S.x=-y,S.y=C,E.x=C*v,E.y=y*v,p.depth=v;var I=t._findSupports(g,h,b,1),q=0;if(o.contains(g.vertices,I[0])&&(A[q++]=I[0]),o.contains(g.vertices,I[1])&&(A[q++]=I[1]),q<2){var k=t._findSupports(h,g,b,-1);o.contains(h.vertices,k[0])&&(A[q++]=k[0]),q<2&&o.contains(h.vertices,k[1])&&(A[q++]=k[1])}return q===0&&(A[q++]=I[0]),p.supportCount=q,p},t._overlapAxes=function(g,h,n,d){var p=h.length,m=n.length,b=h[0].x,S=h[0].y,E=n[0].x,A=n[0].y,v=d.length,x=Number.MAX_VALUE,C=0,y,M,w,I,q,k;for(q=0;q<v;q++){var T=d[q],P=T.x,z=T.y,_=b*P+S*z,$=E*P+A*z,U=_,Q=$;for(k=1;k<p;k+=1)I=h[k].x*P+h[k].y*z,I>U?U=I:I<_&&(_=I);for(k=1;k<m;k+=1)I=n[k].x*P+n[k].y*z,I>Q?Q=I:I<$&&($=I);if(M=U-$,w=Q-_,y=M<w?M:w,y<x&&(x=y,C=q,y<=0))break}g.axis=d[C],g.overlap=x},t._findSupports=function(g,h,n,d){var p=h.vertices,m=p.length,b=g.position.x,S=g.position.y,E=n.x*d,A=n.y*d,v=p[0],x=v,C=E*(b-x.x)+A*(S-x.y),y,M,w;for(w=1;w<m;w+=1)x=p[w],M=E*(b-x.x)+A*(S-x.y),M<C&&(C=M,v=x);return y=p[(m+v.index-1)%m],C=E*(b-y.x)+A*(S-y.y),x=p[(v.index+1)%m],E*(b-x.x)+A*(S-x.y)<C?(r[0]=v,r[1]=x,r):(r[0]=v,r[1]=y,r)}})()},function(i,s,a){var t={};i.exports=t;var o=a(16);(function(){t.create=function(l,r){var f=l.bodyA,c=l.bodyB,g={id:t.id(f,c),bodyA:f,bodyB:c,collision:l,contacts:[o.create(),o.create()],contactCount:0,separation:0,isActive:!0,isSensor:f.isSensor||c.isSensor,timeCreated:r,timeUpdated:r,inverseMass:0,friction:0,frictionStatic:0,restitution:0,slop:0};return t.update(g,l,r),g},t.update=function(l,r,f){var c=r.supports,g=r.supportCount,h=l.contacts,n=r.parentA,d=r.parentB;l.isActive=!0,l.timeUpdated=f,l.collision=r,l.separation=r.depth,l.inverseMass=n.inverseMass+d.inverseMass,l.friction=n.friction<d.friction?n.friction:d.friction,l.frictionStatic=n.frictionStatic>d.frictionStatic?n.frictionStatic:d.frictionStatic,l.restitution=n.restitution>d.restitution?n.restitution:d.restitution,l.slop=n.slop>d.slop?n.slop:d.slop,l.contactCount=g,r.pair=l;var p=c[0],m=h[0],b=c[1],S=h[1];(S.vertex===p||m.vertex===b)&&(h[1]=m,h[0]=m=S,S=h[1]),m.vertex=p,S.vertex=b},t.setActive=function(l,r,f){r?(l.isActive=!0,l.timeUpdated=f):(l.isActive=!1,l.contactCount=0)},t.id=function(l,r){return l.id<r.id?l.id.toString(36)+":"+r.id.toString(36):r.id.toString(36)+":"+l.id.toString(36)}})()},function(i,s,a){var t={};i.exports=t;var o=a(3),l=a(2),r=a(7),f=a(1),c=a(11),g=a(0);(function(){t._warming=.4,t._torqueDampen=1,t._minLength=1e-6,t.create=function(h){var n=h;n.bodyA&&!n.pointA&&(n.pointA={x:0,y:0}),n.bodyB&&!n.pointB&&(n.pointB={x:0,y:0});var d=n.bodyA?l.add(n.bodyA.position,n.pointA):n.pointA,p=n.bodyB?l.add(n.bodyB.position,n.pointB):n.pointB,m=l.magnitude(l.sub(d,p));n.length=typeof n.length<"u"?n.length:m,n.id=n.id||g.nextId(),n.label=n.label||"Constraint",n.type="constraint",n.stiffness=n.stiffness||(n.length>0?1:.7),n.damping=n.damping||0,n.angularStiffness=n.angularStiffness||0,n.angleA=n.bodyA?n.bodyA.angle:n.angleA,n.angleB=n.bodyB?n.bodyB.angle:n.angleB,n.plugin={};var b={visible:!0,lineWidth:2,strokeStyle:"#ffffff",type:"line",anchors:!0};return n.length===0&&n.stiffness>.1?(b.type="pin",b.anchors=!1):n.stiffness<.9&&(b.type="spring"),n.render=g.extend(b,n.render),n},t.preSolveAll=function(h){for(var n=0;n<h.length;n+=1){var d=h[n],p=d.constraintImpulse;d.isStatic||p.x===0&&p.y===0&&p.angle===0||(d.position.x+=p.x,d.position.y+=p.y,d.angle+=p.angle)}},t.solveAll=function(h,n){for(var d=g.clamp(n/g._baseDelta,0,1),p=0;p<h.length;p+=1){var m=h[p],b=!m.bodyA||m.bodyA&&m.bodyA.isStatic,S=!m.bodyB||m.bodyB&&m.bodyB.isStatic;(b||S)&&t.solve(h[p],d)}for(p=0;p<h.length;p+=1)m=h[p],b=!m.bodyA||m.bodyA&&m.bodyA.isStatic,S=!m.bodyB||m.bodyB&&m.bodyB.isStatic,!b&&!S&&t.solve(h[p],d)},t.solve=function(h,n){var d=h.bodyA,p=h.bodyB,m=h.pointA,b=h.pointB;if(!(!d&&!p)){d&&!d.isStatic&&(l.rotate(m,d.angle-h.angleA,m),h.angleA=d.angle),p&&!p.isStatic&&(l.rotate(b,p.angle-h.angleB,b),h.angleB=p.angle);var S=m,E=b;if(d&&(S=l.add(d.position,m)),p&&(E=l.add(p.position,b)),!(!S||!E)){var A=l.sub(S,E),v=l.magnitude(A);v<t._minLength&&(v=t._minLength);var x=(v-h.length)/v,C=h.stiffness>=1||h.length===0,y=C?h.stiffness*n:h.stiffness*n*n,M=h.damping*n,w=l.mult(A,x*y),I=(d?d.inverseMass:0)+(p?p.inverseMass:0),q=(d?d.inverseInertia:0)+(p?p.inverseInertia:0),k=I+q,T,P,z,_,$;if(M>0){var U=l.create();z=l.div(A,v),$=l.sub(p&&l.sub(p.position,p.positionPrev)||U,d&&l.sub(d.position,d.positionPrev)||U),_=l.dot(z,$)}d&&!d.isStatic&&(P=d.inverseMass/I,d.constraintImpulse.x-=w.x*P,d.constraintImpulse.y-=w.y*P,d.position.x-=w.x*P,d.position.y-=w.y*P,M>0&&(d.positionPrev.x-=M*z.x*_*P,d.positionPrev.y-=M*z.y*_*P),T=l.cross(m,w)/k*t._torqueDampen*d.inverseInertia*(1-h.angularStiffness),d.constraintImpulse.angle-=T,d.angle-=T),p&&!p.isStatic&&(P=p.inverseMass/I,p.constraintImpulse.x+=w.x*P,p.constraintImpulse.y+=w.y*P,p.position.x+=w.x*P,p.position.y+=w.y*P,M>0&&(p.positionPrev.x+=M*z.x*_*P,p.positionPrev.y+=M*z.y*_*P),T=l.cross(b,w)/k*t._torqueDampen*p.inverseInertia*(1-h.angularStiffness),p.constraintImpulse.angle+=T,p.angle+=T)}}},t.postSolveAll=function(h){for(var n=0;n<h.length;n++){var d=h[n],p=d.constraintImpulse;if(!(d.isStatic||p.x===0&&p.y===0&&p.angle===0)){r.set(d,!1);for(var m=0;m<d.parts.length;m++){var b=d.parts[m];o.translate(b.vertices,p),m>0&&(b.position.x+=p.x,b.position.y+=p.y),p.angle!==0&&(o.rotate(b.vertices,p.angle,d.position),c.rotate(b.axes,p.angle),m>0&&l.rotateAbout(b.position,p.angle,d.position,b.position)),f.update(b.bounds,b.vertices,d.velocity)}p.angle*=t._warming,p.x*=t._warming,p.y*=t._warming}}},t.pointAWorld=function(h){return{x:(h.bodyA?h.bodyA.position.x:0)+(h.pointA?h.pointA.x:0),y:(h.bodyA?h.bodyA.position.y:0)+(h.pointA?h.pointA.y:0)}},t.pointBWorld=function(h){return{x:(h.bodyB?h.bodyB.position.x:0)+(h.pointB?h.pointB.x:0),y:(h.bodyB?h.bodyB.position.y:0)+(h.pointB?h.pointB.y:0)}},t.currentLength=function(h){var n=(h.bodyA?h.bodyA.position.x:0)+(h.pointA?h.pointA.x:0),d=(h.bodyA?h.bodyA.position.y:0)+(h.pointA?h.pointA.y:0),p=(h.bodyB?h.bodyB.position.x:0)+(h.pointB?h.pointB.x:0),m=(h.bodyB?h.bodyB.position.y:0)+(h.pointB?h.pointB.y:0),b=n-p,S=d-m;return Math.sqrt(b*b+S*S)}})()},function(i,s,a){var t={};i.exports=t;var o=a(2),l=a(0);(function(){t.fromVertices=function(r){for(var f={},c=0;c<r.length;c++){var g=(c+1)%r.length,h=o.normalise({x:r[g].y-r[c].y,y:r[c].x-r[g].x}),n=h.y===0?1/0:h.x/h.y;n=n.toFixed(3).toString(),f[n]=h}return l.values(f)},t.rotate=function(r,f){if(f!==0)for(var c=Math.cos(f),g=Math.sin(f),h=0;h<r.length;h++){var n=r[h],d;d=n.x*c-n.y*g,n.y=n.x*g+n.y*c,n.x=d}}})()},function(i,s,a){var t={};i.exports=t;var o=a(3),l=a(0),r=a(4),f=a(1),c=a(2);(function(){t.rectangle=function(g,h,n,d,p){p=p||{};var m={label:"Rectangle Body",position:{x:g,y:h},vertices:o.fromPath("L 0 0 L "+n+" 0 L "+n+" "+d+" L 0 "+d)};if(p.chamfer){var b=p.chamfer;m.vertices=o.chamfer(m.vertices,b.radius,b.quality,b.qualityMin,b.qualityMax),delete p.chamfer}return r.create(l.extend({},m,p))},t.trapezoid=function(g,h,n,d,p,m){m=m||{},p>=1&&l.warn("Bodies.trapezoid: slope parameter must be < 1."),p*=.5;var b=(1-p*2)*n,S=n*p,E=S+b,A=E+S,v;p<.5?v="L 0 0 L "+S+" "+-d+" L "+E+" "+-d+" L "+A+" 0":v="L 0 0 L "+E+" "+-d+" L "+A+" 0";var x={label:"Trapezoid Body",position:{x:g,y:h},vertices:o.fromPath(v)};if(m.chamfer){var C=m.chamfer;x.vertices=o.chamfer(x.vertices,C.radius,C.quality,C.qualityMin,C.qualityMax),delete m.chamfer}return r.create(l.extend({},x,m))},t.circle=function(g,h,n,d,p){d=d||{};var m={label:"Circle Body",circleRadius:n};p=p||25;var b=Math.ceil(Math.max(10,Math.min(p,n)));return b%2===1&&(b+=1),t.polygon(g,h,b,n,l.extend({},m,d))},t.polygon=function(g,h,n,d,p){if(p=p||{},n<3)return t.circle(g,h,d,p);for(var m=2*Math.PI/n,b="",S=m*.5,E=0;E<n;E+=1){var A=S+E*m,v=Math.cos(A)*d,x=Math.sin(A)*d;b+="L "+v.toFixed(3)+" "+x.toFixed(3)+" "}var C={label:"Polygon Body",position:{x:g,y:h},vertices:o.fromPath(b)};if(p.chamfer){var y=p.chamfer;C.vertices=o.chamfer(C.vertices,y.radius,y.quality,y.qualityMin,y.qualityMax),delete p.chamfer}return r.create(l.extend({},C,p))},t.fromVertices=function(g,h,n,d,p,m,b,S){var E=l.getDecomp(),A,v,x,C,y,M,w,I,q,k,T;for(A=!!(E&&E.quickDecomp),d=d||{},x=[],p=typeof p<"u"?p:!1,m=typeof m<"u"?m:.01,b=typeof b<"u"?b:10,S=typeof S<"u"?S:.01,l.isArray(n[0])||(n=[n]),k=0;k<n.length;k+=1)if(M=n[k],C=o.isConvex(M),y=!C,y&&!A&&l.warnOnce("Bodies.fromVertices: Install the 'poly-decomp' library and use Common.setDecomp or provide 'decomp' as a global to decompose concave vertices."),C||!A)C?M=o.clockwiseSort(M):M=o.hull(M),x.push({position:{x:g,y:h},vertices:M});else{var P=M.map(function(R){return[R.x,R.y]});E.makeCCW(P),m!==!1&&E.removeCollinearPoints(P,m),S!==!1&&E.removeDuplicatePoints&&E.removeDuplicatePoints(P,S);var z=E.quickDecomp(P);for(w=0;w<z.length;w++){var _=z[w],$=_.map(function(R){return{x:R[0],y:R[1]}});b>0&&o.area($)<b||x.push({position:o.centre($),vertices:$})}}for(w=0;w<x.length;w++)x[w]=r.create(l.extend(x[w],d));if(p){var U=5;for(w=0;w<x.length;w++){var Q=x[w];for(I=w+1;I<x.length;I++){var H=x[I];if(f.overlaps(Q.bounds,H.bounds)){var W=Q.vertices,K=H.vertices;for(q=0;q<Q.vertices.length;q++)for(T=0;T<H.vertices.length;T++){var fe=c.magnitudeSquared(c.sub(W[(q+1)%W.length],K[T])),ne=c.magnitudeSquared(c.sub(W[q],K[(T+1)%K.length]));fe<U&&ne<U&&(W[q].isInternal=!0,K[T].isInternal=!0)}}}}}return x.length>1?(v=r.create(l.extend({parts:x.slice(0)},d)),r.setPosition(v,{x:g,y:h}),v):x[0]}})()},function(i,s,a){var t={};i.exports=t;var o=a(0),l=a(8);(function(){t.create=function(r){var f={bodies:[],collisions:[],pairs:null};return o.extend(f,r)},t.setBodies=function(r,f){r.bodies=f.slice(0)},t.clear=function(r){r.bodies=[],r.collisions=[]},t.collisions=function(r){var f=r.pairs,c=r.bodies,g=c.length,h=t.canCollide,n=l.collides,d=r.collisions,p=0,m,b;for(c.sort(t._compareBoundsX),m=0;m<g;m++){var S=c[m],E=S.bounds,A=S.bounds.max.x,v=S.bounds.max.y,x=S.bounds.min.y,C=S.isStatic||S.isSleeping,y=S.parts.length,M=y===1;for(b=m+1;b<g;b++){var w=c[b],I=w.bounds;if(I.min.x>A)break;if(!(v<I.min.y||x>I.max.y)&&!(C&&(w.isStatic||w.isSleeping))&&h(S.collisionFilter,w.collisionFilter)){var q=w.parts.length;if(M&&q===1){var k=n(S,w,f);k&&(d[p++]=k)}else for(var T=y>1?1:0,P=q>1?1:0,z=T;z<y;z++)for(var _=S.parts[z],E=_.bounds,$=P;$<q;$++){var U=w.parts[$],I=U.bounds;if(!(E.min.x>I.max.x||E.max.x<I.min.x||E.max.y<I.min.y||E.min.y>I.max.y)){var k=n(_,U,f);k&&(d[p++]=k)}}}}}return d.length!==p&&(d.length=p),d},t.canCollide=function(r,f){return r.group===f.group&&r.group!==0?r.group>0:(r.mask&f.category)!==0&&(f.mask&r.category)!==0},t._compareBoundsX=function(r,f){return r.bounds.min.x-f.bounds.min.x}})()},function(i,s,a){var t={};i.exports=t;var o=a(0);(function(){t.create=function(l){var r={};return l||o.log("Mouse.create: element was undefined, defaulting to document.body","warn"),r.element=l||document.body,r.absolute={x:0,y:0},r.position={x:0,y:0},r.mousedownPosition={x:0,y:0},r.mouseupPosition={x:0,y:0},r.offset={x:0,y:0},r.scale={x:1,y:1},r.wheelDelta=0,r.button=-1,r.pixelRatio=parseInt(r.element.getAttribute("data-pixel-ratio"),10)||1,r.sourceEvents={mousemove:null,mousedown:null,mouseup:null,mousewheel:null},r.mousemove=function(f){var c=t._getRelativeMousePosition(f,r.element,r.pixelRatio),g=f.changedTouches;g&&(r.button=0,f.preventDefault()),r.absolute.x=c.x,r.absolute.y=c.y,r.position.x=r.absolute.x*r.scale.x+r.offset.x,r.position.y=r.absolute.y*r.scale.y+r.offset.y,r.sourceEvents.mousemove=f},r.mousedown=function(f){var c=t._getRelativeMousePosition(f,r.element,r.pixelRatio),g=f.changedTouches;g?(r.button=0,f.preventDefault()):r.button=f.button,r.absolute.x=c.x,r.absolute.y=c.y,r.position.x=r.absolute.x*r.scale.x+r.offset.x,r.position.y=r.absolute.y*r.scale.y+r.offset.y,r.mousedownPosition.x=r.position.x,r.mousedownPosition.y=r.position.y,r.sourceEvents.mousedown=f},r.mouseup=function(f){var c=t._getRelativeMousePosition(f,r.element,r.pixelRatio),g=f.changedTouches;g&&f.preventDefault(),r.button=-1,r.absolute.x=c.x,r.absolute.y=c.y,r.position.x=r.absolute.x*r.scale.x+r.offset.x,r.position.y=r.absolute.y*r.scale.y+r.offset.y,r.mouseupPosition.x=r.position.x,r.mouseupPosition.y=r.position.y,r.sourceEvents.mouseup=f},r.mousewheel=function(f){r.wheelDelta=Math.max(-1,Math.min(1,f.wheelDelta||-f.detail)),f.preventDefault(),r.sourceEvents.mousewheel=f},t.setElement(r,r.element),r},t.setElement=function(l,r){l.element=r,r.addEventListener("mousemove",l.mousemove,{passive:!0}),r.addEventListener("mousedown",l.mousedown,{passive:!0}),r.addEventListener("mouseup",l.mouseup,{passive:!0}),r.addEventListener("wheel",l.mousewheel,{passive:!1}),r.addEventListener("touchmove",l.mousemove,{passive:!1}),r.addEventListener("touchstart",l.mousedown,{passive:!1}),r.addEventListener("touchend",l.mouseup,{passive:!1})},t.clearSourceEvents=function(l){l.sourceEvents.mousemove=null,l.sourceEvents.mousedown=null,l.sourceEvents.mouseup=null,l.sourceEvents.mousewheel=null,l.wheelDelta=0},t.setOffset=function(l,r){l.offset.x=r.x,l.offset.y=r.y,l.position.x=l.absolute.x*l.scale.x+l.offset.x,l.position.y=l.absolute.y*l.scale.y+l.offset.y},t.setScale=function(l,r){l.scale.x=r.x,l.scale.y=r.y,l.position.x=l.absolute.x*l.scale.x+l.offset.x,l.position.y=l.absolute.y*l.scale.y+l.offset.y},t._getRelativeMousePosition=function(l,r,f){var c=r.getBoundingClientRect(),g=document.documentElement||document.body.parentNode||document.body,h=window.pageXOffset!==void 0?window.pageXOffset:g.scrollLeft,n=window.pageYOffset!==void 0?window.pageYOffset:g.scrollTop,d=l.changedTouches,p,m;return d?(p=d[0].pageX-c.left-h,m=d[0].pageY-c.top-n):(p=l.pageX-c.left-h,m=l.pageY-c.top-n),{x:p/(r.clientWidth/(r.width||r.clientWidth)*f),y:m/(r.clientHeight/(r.height||r.clientHeight)*f)}}})()},function(i,s,a){var t={};i.exports=t;var o=a(0);(function(){t._registry={},t.register=function(l){if(t.isPlugin(l)||o.warn("Plugin.register:",t.toString(l),"does not implement all required fields."),l.name in t._registry){var r=t._registry[l.name],f=t.versionParse(l.version).number,c=t.versionParse(r.version).number;f>c?(o.warn("Plugin.register:",t.toString(r),"was upgraded to",t.toString(l)),t._registry[l.name]=l):f<c?o.warn("Plugin.register:",t.toString(r),"can not be downgraded to",t.toString(l)):l!==r&&o.warn("Plugin.register:",t.toString(l),"is already registered to different plugin object")}else t._registry[l.name]=l;return l},t.resolve=function(l){return t._registry[t.dependencyParse(l).name]},t.toString=function(l){return typeof l=="string"?l:(l.name||"anonymous")+"@"+(l.version||l.range||"0.0.0")},t.isPlugin=function(l){return l&&l.name&&l.version&&l.install},t.isUsed=function(l,r){return l.used.indexOf(r)>-1},t.isFor=function(l,r){var f=l.for&&t.dependencyParse(l.for);return!l.for||r.name===f.name&&t.versionSatisfies(r.version,f.range)},t.use=function(l,r){if(l.uses=(l.uses||[]).concat(r||[]),l.uses.length===0){o.warn("Plugin.use:",t.toString(l),"does not specify any dependencies to install.");return}for(var f=t.dependencies(l),c=o.topologicalSort(f),g=[],h=0;h<c.length;h+=1)if(c[h]!==l.name){var n=t.resolve(c[h]);if(!n){g.push("❌ "+c[h]);continue}t.isUsed(l,n.name)||(t.isFor(n,l)||(o.warn("Plugin.use:",t.toString(n),"is for",n.for,"but installed on",t.toString(l)+"."),n._warned=!0),n.install?n.install(l):(o.warn("Plugin.use:",t.toString(n),"does not specify an install function."),n._warned=!0),n._warned?(g.push("🔶 "+t.toString(n)),delete n._warned):g.push("✅ "+t.toString(n)),l.used.push(n.name))}g.length>0&&o.info(g.join("  "))},t.dependencies=function(l,r){var f=t.dependencyParse(l),c=f.name;if(r=r||{},!(c in r)){l=t.resolve(l)||l,r[c]=o.map(l.uses||[],function(h){t.isPlugin(h)&&t.register(h);var n=t.dependencyParse(h),d=t.resolve(h);return d&&!t.versionSatisfies(d.version,n.range)?(o.warn("Plugin.dependencies:",t.toString(d),"does not satisfy",t.toString(n),"used by",t.toString(f)+"."),d._warned=!0,l._warned=!0):d||(o.warn("Plugin.dependencies:",t.toString(h),"used by",t.toString(f),"could not be resolved."),l._warned=!0),n.name});for(var g=0;g<r[c].length;g+=1)t.dependencies(r[c][g],r);return r}},t.dependencyParse=function(l){if(o.isString(l)){var r=/^[\w-]+(@(\*|[\^~]?\d+\.\d+\.\d+(-[0-9A-Za-z-+]+)?))?$/;return r.test(l)||o.warn("Plugin.dependencyParse:",l,"is not a valid dependency string."),{name:l.split("@")[0],range:l.split("@")[1]||"*"}}return{name:l.name,range:l.range||l.version}},t.versionParse=function(l){var r=/^(\*)|(\^|~|>=|>)?\s*((\d+)\.(\d+)\.(\d+))(-[0-9A-Za-z-+]+)?$/;r.test(l)||o.warn("Plugin.versionParse:",l,"is not a valid version or range.");var f=r.exec(l),c=Number(f[4]),g=Number(f[5]),h=Number(f[6]);return{isRange:!!(f[1]||f[2]),version:f[3],range:l,operator:f[1]||f[2]||"",major:c,minor:g,patch:h,parts:[c,g,h],prerelease:f[7],number:c*1e8+g*1e4+h}},t.versionSatisfies=function(l,r){r=r||"*";var f=t.versionParse(r),c=t.versionParse(l);if(f.isRange){if(f.operator==="*"||l==="*")return!0;if(f.operator===">")return c.number>f.number;if(f.operator===">=")return c.number>=f.number;if(f.operator==="~")return c.major===f.major&&c.minor===f.minor&&c.patch>=f.patch;if(f.operator==="^")return f.major>0?c.major===f.major&&c.number>=f.number:f.minor>0?c.minor===f.minor&&c.patch>=f.patch:c.patch===f.patch}return l===r||l==="*"}})()},function(i,s){var a={};i.exports=a,function(){a.create=function(t){return{vertex:t,normalImpulse:0,tangentImpulse:0}}}()},function(i,s,a){var t={};i.exports=t;var o=a(7),l=a(18),r=a(13),f=a(19),c=a(5),g=a(6),h=a(10),n=a(0),d=a(4);(function(){t._deltaMax=1e3/60,t.create=function(p){p=p||{};var m={positionIterations:6,velocityIterations:4,constraintIterations:2,enableSleeping:!1,events:[],plugin:{},gravity:{x:0,y:1,scale:.001},timing:{timestamp:0,timeScale:1,lastDelta:0,lastElapsed:0,lastUpdatesPerFrame:0}},b=n.extend(m,p);return b.world=p.world||g.create({label:"World"}),b.pairs=p.pairs||f.create(),b.detector=p.detector||r.create(),b.detector.pairs=b.pairs,b.grid={buckets:[]},b.world.gravity=b.gravity,b.broadphase=b.grid,b.metrics={},b},t.update=function(p,m){var b=n.now(),S=p.world,E=p.detector,A=p.pairs,v=p.timing,x=v.timestamp,C;m>t._deltaMax&&n.warnOnce("Matter.Engine.update: delta argument is recommended to be less than or equal to",t._deltaMax.toFixed(3),"ms."),m=typeof m<"u"?m:n._baseDelta,m*=v.timeScale,v.timestamp+=m,v.lastDelta=m;var y={timestamp:v.timestamp,delta:m};c.trigger(p,"beforeUpdate",y);var M=g.allBodies(S),w=g.allConstraints(S);for(S.isModified&&(r.setBodies(E,M),g.setModified(S,!1,!1,!0)),p.enableSleeping&&o.update(M,m),t._bodiesApplyGravity(M,p.gravity),m>0&&t._bodiesUpdate(M,m),c.trigger(p,"beforeSolve",y),h.preSolveAll(M),C=0;C<p.constraintIterations;C++)h.solveAll(w,m);h.postSolveAll(M);var I=r.collisions(E);f.update(A,I,x),p.enableSleeping&&o.afterCollisions(A.list),A.collisionStart.length>0&&c.trigger(p,"collisionStart",{pairs:A.collisionStart,timestamp:v.timestamp,delta:m});var q=n.clamp(20/p.positionIterations,0,1);for(l.preSolvePosition(A.list),C=0;C<p.positionIterations;C++)l.solvePosition(A.list,m,q);for(l.postSolvePosition(M),h.preSolveAll(M),C=0;C<p.constraintIterations;C++)h.solveAll(w,m);for(h.postSolveAll(M),l.preSolveVelocity(A.list),C=0;C<p.velocityIterations;C++)l.solveVelocity(A.list,m);return t._bodiesUpdateVelocities(M),A.collisionActive.length>0&&c.trigger(p,"collisionActive",{pairs:A.collisionActive,timestamp:v.timestamp,delta:m}),A.collisionEnd.length>0&&c.trigger(p,"collisionEnd",{pairs:A.collisionEnd,timestamp:v.timestamp,delta:m}),t._bodiesClearForces(M),c.trigger(p,"afterUpdate",y),p.timing.lastElapsed=n.now()-b,p},t.merge=function(p,m){if(n.extend(p,m),m.world){p.world=m.world,t.clear(p);for(var b=g.allBodies(p.world),S=0;S<b.length;S++){var E=b[S];o.set(E,!1),E.id=n.nextId()}}},t.clear=function(p){f.clear(p.pairs),r.clear(p.detector)},t._bodiesClearForces=function(p){for(var m=p.length,b=0;b<m;b++){var S=p[b];S.force.x=0,S.force.y=0,S.torque=0}},t._bodiesApplyGravity=function(p,m){var b=typeof m.scale<"u"?m.scale:.001,S=p.length;if(!(m.x===0&&m.y===0||b===0))for(var E=0;E<S;E++){var A=p[E];A.isStatic||A.isSleeping||(A.force.y+=A.mass*m.y*b,A.force.x+=A.mass*m.x*b)}},t._bodiesUpdate=function(p,m){for(var b=p.length,S=0;S<b;S++){var E=p[S];E.isStatic||E.isSleeping||d.update(E,m)}},t._bodiesUpdateVelocities=function(p){for(var m=p.length,b=0;b<m;b++)d.updateVelocities(p[b])}})()},function(i,s,a){var t={};i.exports=t;var o=a(3),l=a(0),r=a(1);(function(){t._restingThresh=2,t._restingThreshTangent=Math.sqrt(6),t._positionDampen=.9,t._positionWarming=.8,t._frictionNormalMultiplier=5,t._frictionMaxStatic=Number.MAX_VALUE,t.preSolvePosition=function(f){var c,g,h,n=f.length;for(c=0;c<n;c++)g=f[c],g.isActive&&(h=g.contactCount,g.collision.parentA.totalContacts+=h,g.collision.parentB.totalContacts+=h)},t.solvePosition=function(f,c,g){var h,n,d,p,m,b,S,E,A=t._positionDampen*(g||1),v=l.clamp(c/l._baseDelta,0,1),x=f.length;for(h=0;h<x;h++)n=f[h],!(!n.isActive||n.isSensor)&&(d=n.collision,p=d.parentA,m=d.parentB,b=d.normal,n.separation=d.depth+b.x*(m.positionImpulse.x-p.positionImpulse.x)+b.y*(m.positionImpulse.y-p.positionImpulse.y));for(h=0;h<x;h++)n=f[h],!(!n.isActive||n.isSensor)&&(d=n.collision,p=d.parentA,m=d.parentB,b=d.normal,E=n.separation-n.slop*v,(p.isStatic||m.isStatic)&&(E*=2),p.isStatic||p.isSleeping||(S=A/p.totalContacts,p.positionImpulse.x+=b.x*E*S,p.positionImpulse.y+=b.y*E*S),m.isStatic||m.isSleeping||(S=A/m.totalContacts,m.positionImpulse.x-=b.x*E*S,m.positionImpulse.y-=b.y*E*S))},t.postSolvePosition=function(f){for(var c=t._positionWarming,g=f.length,h=o.translate,n=r.update,d=0;d<g;d++){var p=f[d],m=p.positionImpulse,b=m.x,S=m.y,E=p.velocity;if(p.totalContacts=0,b!==0||S!==0){for(var A=0;A<p.parts.length;A++){var v=p.parts[A];h(v.vertices,m),n(v.bounds,v.vertices,E),v.position.x+=b,v.position.y+=S}p.positionPrev.x+=b,p.positionPrev.y+=S,b*E.x+S*E.y<0?(m.x=0,m.y=0):(m.x*=c,m.y*=c)}}},t.preSolveVelocity=function(f){var c=f.length,g,h;for(g=0;g<c;g++){var n=f[g];if(!(!n.isActive||n.isSensor)){var d=n.contacts,p=n.contactCount,m=n.collision,b=m.parentA,S=m.parentB,E=m.normal,A=m.tangent;for(h=0;h<p;h++){var v=d[h],x=v.vertex,C=v.normalImpulse,y=v.tangentImpulse;if(C!==0||y!==0){var M=E.x*C+A.x*y,w=E.y*C+A.y*y;b.isStatic||b.isSleeping||(b.positionPrev.x+=M*b.inverseMass,b.positionPrev.y+=w*b.inverseMass,b.anglePrev+=b.inverseInertia*((x.x-b.position.x)*w-(x.y-b.position.y)*M)),S.isStatic||S.isSleeping||(S.positionPrev.x-=M*S.inverseMass,S.positionPrev.y-=w*S.inverseMass,S.anglePrev-=S.inverseInertia*((x.x-S.position.x)*w-(x.y-S.position.y)*M))}}}}},t.solveVelocity=function(f,c){var g=c/l._baseDelta,h=g*g,n=h*g,d=-t._restingThresh*g,p=t._restingThreshTangent,m=t._frictionNormalMultiplier*g,b=t._frictionMaxStatic,S=f.length,E,A,v,x;for(v=0;v<S;v++){var C=f[v];if(!(!C.isActive||C.isSensor)){var y=C.collision,M=y.parentA,w=y.parentB,I=y.normal.x,q=y.normal.y,k=y.tangent.x,T=y.tangent.y,P=C.inverseMass,z=C.friction*C.frictionStatic*m,_=C.contacts,$=C.contactCount,U=1/$,Q=M.position.x-M.positionPrev.x,H=M.position.y-M.positionPrev.y,W=M.angle-M.anglePrev,K=w.position.x-w.positionPrev.x,fe=w.position.y-w.positionPrev.y,ne=w.angle-w.anglePrev;for(x=0;x<$;x++){var R=_[x],se=R.vertex,j=se.x-M.position.x,Re=se.y-M.position.y,le=se.x-w.position.x,ce=se.y-w.position.y,X=Q-Re*W,Ti=H+j*W,Li=K-ce*ne,_i=fe+le*ne,Ft=X-Li,Ut=Ti-_i,xt=I*Ft+q*Ut,he=k*Ft+T*Ut,Nt=C.separation+xt,Ct=Math.min(Nt,1);Ct=Nt<0?0:Ct;var Vt=Ct*z;he<-Vt||he>Vt?(A=he>0?he:-he,E=C.friction*(he>0?1:-1)*n,E<-A?E=-A:E>A&&(E=A)):(E=he,A=b);var Gt=j*q-Re*I,Qt=le*q-ce*I,Ht=U/(P+M.inverseInertia*Gt*Gt+w.inverseInertia*Qt*Qt),it=(1+C.restitution)*xt*Ht;if(E*=Ht,xt<d)R.normalImpulse=0;else{var Di=R.normalImpulse;R.normalImpulse+=it,R.normalImpulse>0&&(R.normalImpulse=0),it=R.normalImpulse-Di}if(he<-p||he>p)R.tangentImpulse=0;else{var zi=R.tangentImpulse;R.tangentImpulse+=E,R.tangentImpulse<-A&&(R.tangentImpulse=-A),R.tangentImpulse>A&&(R.tangentImpulse=A),E=R.tangentImpulse-zi}var at=I*it+k*E,ot=q*it+T*E;M.isStatic||M.isSleeping||(M.positionPrev.x+=at*M.inverseMass,M.positionPrev.y+=ot*M.inverseMass,M.anglePrev+=(j*ot-Re*at)*M.inverseInertia),w.isStatic||w.isSleeping||(w.positionPrev.x-=at*w.inverseMass,w.positionPrev.y-=ot*w.inverseMass,w.anglePrev-=(le*ot-ce*at)*w.inverseInertia)}}}}})()},function(i,s,a){var t={};i.exports=t;var o=a(9),l=a(0);(function(){t.create=function(r){return l.extend({table:{},list:[],collisionStart:[],collisionActive:[],collisionEnd:[]},r)},t.update=function(r,f,c){var g=o.update,h=o.create,n=o.setActive,d=r.table,p=r.list,m=p.length,b=m,S=r.collisionStart,E=r.collisionEnd,A=r.collisionActive,v=f.length,x=0,C=0,y=0,M,w,I;for(I=0;I<v;I++)M=f[I],w=M.pair,w?(w.isActive&&(A[y++]=w),g(w,M,c)):(w=h(M,c),d[w.id]=w,S[x++]=w,p[b++]=w);for(b=0,m=p.length,I=0;I<m;I++)w=p[I],w.timeUpdated>=c?p[b++]=w:(n(w,!1,c),w.collision.bodyA.sleepCounter>0&&w.collision.bodyB.sleepCounter>0?p[b++]=w:(E[C++]=w,delete d[w.id]));p.length!==b&&(p.length=b),S.length!==x&&(S.length=x),E.length!==C&&(E.length=C),A.length!==y&&(A.length=y)},t.clear=function(r){return r.table={},r.list.length=0,r.collisionStart.length=0,r.collisionActive.length=0,r.collisionEnd.length=0,r}})()},function(i,s,a){var t=i.exports=a(21);t.Axes=a(11),t.Bodies=a(12),t.Body=a(4),t.Bounds=a(1),t.Collision=a(8),t.Common=a(0),t.Composite=a(6),t.Composites=a(22),t.Constraint=a(10),t.Contact=a(16),t.Detector=a(13),t.Engine=a(17),t.Events=a(5),t.Grid=a(23),t.Mouse=a(14),t.MouseConstraint=a(24),t.Pair=a(9),t.Pairs=a(19),t.Plugin=a(15),t.Query=a(25),t.Render=a(26),t.Resolver=a(18),t.Runner=a(27),t.SAT=a(28),t.Sleeping=a(7),t.Svg=a(29),t.Vector=a(2),t.Vertices=a(3),t.World=a(30),t.Engine.run=t.Runner.run,t.Common.deprecated(t.Engine,"run","Engine.run ➤ use Matter.Runner.run(engine) instead")},function(i,s,a){var t={};i.exports=t;var o=a(15),l=a(0);(function(){t.name="matter-js",t.version="0.20.0",t.uses=[],t.used=[],t.use=function(){o.use(t,Array.prototype.slice.call(arguments))},t.before=function(r,f){return r=r.replace(/^Matter./,""),l.chainPathBefore(t,r,f)},t.after=function(r,f){return r=r.replace(/^Matter./,""),l.chainPathAfter(t,r,f)}})()},function(i,s,a){var t={};i.exports=t;var o=a(6),l=a(10),r=a(0),f=a(4),c=a(12),g=r.deprecated;(function(){t.stack=function(h,n,d,p,m,b,S){for(var E=o.create({label:"Stack"}),A=h,v=n,x,C=0,y=0;y<p;y++){for(var M=0,w=0;w<d;w++){var I=S(A,v,w,y,x,C);if(I){var q=I.bounds.max.y-I.bounds.min.y,k=I.bounds.max.x-I.bounds.min.x;q>M&&(M=q),f.translate(I,{x:k*.5,y:q*.5}),A=I.bounds.max.x+m,o.addBody(E,I),x=I,C+=1}else A+=m}v+=M+b,A=h}return E},t.chain=function(h,n,d,p,m,b){for(var S=h.bodies,E=1;E<S.length;E++){var A=S[E-1],v=S[E],x=A.bounds.max.y-A.bounds.min.y,C=A.bounds.max.x-A.bounds.min.x,y=v.bounds.max.y-v.bounds.min.y,M=v.bounds.max.x-v.bounds.min.x,w={bodyA:A,pointA:{x:C*n,y:x*d},bodyB:v,pointB:{x:M*p,y:y*m}},I=r.extend(w,b);o.addConstraint(h,l.create(I))}return h.label+=" Chain",h},t.mesh=function(h,n,d,p,m){var b=h.bodies,S,E,A,v,x;for(S=0;S<d;S++){for(E=1;E<n;E++)A=b[E-1+S*n],v=b[E+S*n],o.addConstraint(h,l.create(r.extend({bodyA:A,bodyB:v},m)));if(S>0)for(E=0;E<n;E++)A=b[E+(S-1)*n],v=b[E+S*n],o.addConstraint(h,l.create(r.extend({bodyA:A,bodyB:v},m))),p&&E>0&&(x=b[E-1+(S-1)*n],o.addConstraint(h,l.create(r.extend({bodyA:x,bodyB:v},m)))),p&&E<n-1&&(x=b[E+1+(S-1)*n],o.addConstraint(h,l.create(r.extend({bodyA:x,bodyB:v},m))))}return h.label+=" Mesh",h},t.pyramid=function(h,n,d,p,m,b,S){return t.stack(h,n,d,p,m,b,function(E,A,v,x,C,y){var M=Math.min(p,Math.ceil(d/2)),w=C?C.bounds.max.x-C.bounds.min.x:0;if(!(x>M)){x=M-x;var I=x,q=d-1-x;if(!(v<I||v>q)){y===1&&f.translate(C,{x:(v+(d%2===1?1:-1))*w,y:0});var k=C?v*w:0;return S(h+k+v*m,A,v,x,C,y)}}})},t.newtonsCradle=function(h,n,d,p,m){for(var b=o.create({label:"Newtons Cradle"}),S=0;S<d;S++){var E=1.9,A=c.circle(h+S*(p*E),n+m,p,{inertia:1/0,restitution:1,friction:0,frictionAir:1e-4,slop:1}),v=l.create({pointA:{x:h+S*(p*E),y:n},bodyB:A});o.addBody(b,A),o.addConstraint(b,v)}return b},g(t,"newtonsCradle","Composites.newtonsCradle ➤ moved to newtonsCradle example"),t.car=function(h,n,d,p,m){var b=f.nextGroup(!0),S=20,E=-d*.5+S,A=d*.5-S,v=0,x=o.create({label:"Car"}),C=c.rectangle(h,n,d,p,{collisionFilter:{group:b},chamfer:{radius:p*.5},density:2e-4}),y=c.circle(h+E,n+v,m,{collisionFilter:{group:b},friction:.8}),M=c.circle(h+A,n+v,m,{collisionFilter:{group:b},friction:.8}),w=l.create({bodyB:C,pointB:{x:E,y:v},bodyA:y,stiffness:1,length:0}),I=l.create({bodyB:C,pointB:{x:A,y:v},bodyA:M,stiffness:1,length:0});return o.addBody(x,C),o.addBody(x,y),o.addBody(x,M),o.addConstraint(x,w),o.addConstraint(x,I),x},g(t,"car","Composites.car ➤ moved to car example"),t.softBody=function(h,n,d,p,m,b,S,E,A,v){A=r.extend({inertia:1/0},A),v=r.extend({stiffness:.2,render:{type:"line",anchors:!1}},v);var x=t.stack(h,n,d,p,m,b,function(C,y){return c.circle(C,y,E,A)});return t.mesh(x,d,p,S,v),x.label="Soft Body",x},g(t,"softBody","Composites.softBody ➤ moved to softBody and cloth examples")})()},function(i,s,a){var t={};i.exports=t;var o=a(9),l=a(0),r=l.deprecated;(function(){t.create=function(f){var c={buckets:{},pairs:{},pairsList:[],bucketWidth:48,bucketHeight:48};return l.extend(c,f)},t.update=function(f,c,g,h){var n,d,p,m=g.world,b=f.buckets,S,E,A=!1;for(n=0;n<c.length;n++){var v=c[n];if(!(v.isSleeping&&!h)&&!(m.bounds&&(v.bounds.max.x<m.bounds.min.x||v.bounds.min.x>m.bounds.max.x||v.bounds.max.y<m.bounds.min.y||v.bounds.min.y>m.bounds.max.y))){var x=t._getRegion(f,v);if(!v.region||x.id!==v.region.id||h){(!v.region||h)&&(v.region=x);var C=t._regionUnion(x,v.region);for(d=C.startCol;d<=C.endCol;d++)for(p=C.startRow;p<=C.endRow;p++){E=t._getBucketId(d,p),S=b[E];var y=d>=x.startCol&&d<=x.endCol&&p>=x.startRow&&p<=x.endRow,M=d>=v.region.startCol&&d<=v.region.endCol&&p>=v.region.startRow&&p<=v.region.endRow;!y&&M&&M&&S&&t._bucketRemoveBody(f,S,v),(v.region===x||y&&!M||h)&&(S||(S=t._createBucket(b,E)),t._bucketAddBody(f,S,v))}v.region=x,A=!0}}}A&&(f.pairsList=t._createActivePairsList(f))},r(t,"update","Grid.update ➤ replaced by Matter.Detector"),t.clear=function(f){f.buckets={},f.pairs={},f.pairsList=[]},r(t,"clear","Grid.clear ➤ replaced by Matter.Detector"),t._regionUnion=function(f,c){var g=Math.min(f.startCol,c.startCol),h=Math.max(f.endCol,c.endCol),n=Math.min(f.startRow,c.startRow),d=Math.max(f.endRow,c.endRow);return t._createRegion(g,h,n,d)},t._getRegion=function(f,c){var g=c.bounds,h=Math.floor(g.min.x/f.bucketWidth),n=Math.floor(g.max.x/f.bucketWidth),d=Math.floor(g.min.y/f.bucketHeight),p=Math.floor(g.max.y/f.bucketHeight);return t._createRegion(h,n,d,p)},t._createRegion=function(f,c,g,h){return{id:f+","+c+","+g+","+h,startCol:f,endCol:c,startRow:g,endRow:h}},t._getBucketId=function(f,c){return"C"+f+"R"+c},t._createBucket=function(f,c){var g=f[c]=[];return g},t._bucketAddBody=function(f,c,g){var h=f.pairs,n=o.id,d=c.length,p;for(p=0;p<d;p++){var m=c[p];if(!(g.id===m.id||g.isStatic&&m.isStatic)){var b=n(g,m),S=h[b];S?S[2]+=1:h[b]=[g,m,1]}}c.push(g)},t._bucketRemoveBody=function(f,c,g){var h=f.pairs,n=o.id,d;c.splice(l.indexOf(c,g),1);var p=c.length;for(d=0;d<p;d++){var m=h[n(g,c[d])];m&&(m[2]-=1)}},t._createActivePairsList=function(f){var c,g=f.pairs,h=l.keys(g),n=h.length,d=[],p;for(p=0;p<n;p++)c=g[h[p]],c[2]>0?d.push(c):delete g[h[p]];return d}})()},function(i,s,a){var t={};i.exports=t;var o=a(3),l=a(7),r=a(14),f=a(5),c=a(13),g=a(10),h=a(6),n=a(0),d=a(1);(function(){t.create=function(p,m){var b=(p?p.mouse:null)||(m?m.mouse:null);b||(p&&p.render&&p.render.canvas?b=r.create(p.render.canvas):m&&m.element?b=r.create(m.element):(b=r.create(),n.warn("MouseConstraint.create: options.mouse was undefined, options.element was undefined, may not function as expected")));var S=g.create({label:"Mouse Constraint",pointA:b.position,pointB:{x:0,y:0},length:.01,stiffness:.1,angularStiffness:1,render:{strokeStyle:"#90EE90",lineWidth:3}}),E={type:"mouseConstraint",mouse:b,element:null,body:null,constraint:S,collisionFilter:{category:1,mask:4294967295,group:0}},A=n.extend(E,m);return f.on(p,"beforeUpdate",function(){var v=h.allBodies(p.world);t.update(A,v),t._triggerEvents(A)}),A},t.update=function(p,m){var b=p.mouse,S=p.constraint,E=p.body;if(b.button===0){if(S.bodyB)l.set(S.bodyB,!1),S.pointA=b.position;else for(var A=0;A<m.length;A++)if(E=m[A],d.contains(E.bounds,b.position)&&c.canCollide(E.collisionFilter,p.collisionFilter))for(var v=E.parts.length>1?1:0;v<E.parts.length;v++){var x=E.parts[v];if(o.contains(x.vertices,b.position)){S.pointA=b.position,S.bodyB=p.body=E,S.pointB={x:b.position.x-E.position.x,y:b.position.y-E.position.y},S.angleB=E.angle,l.set(E,!1),f.trigger(p,"startdrag",{mouse:b,body:E});break}}}else S.bodyB=p.body=null,S.pointB=null,E&&f.trigger(p,"enddrag",{mouse:b,body:E})},t._triggerEvents=function(p){var m=p.mouse,b=m.sourceEvents;b.mousemove&&f.trigger(p,"mousemove",{mouse:m}),b.mousedown&&f.trigger(p,"mousedown",{mouse:m}),b.mouseup&&f.trigger(p,"mouseup",{mouse:m}),r.clearSourceEvents(m)}})()},function(i,s,a){var t={};i.exports=t;var o=a(2),l=a(8),r=a(1),f=a(12),c=a(3);(function(){t.collides=function(g,h){for(var n=[],d=h.length,p=g.bounds,m=l.collides,b=r.overlaps,S=0;S<d;S++){var E=h[S],A=E.parts.length,v=A===1?0:1;if(b(E.bounds,p))for(var x=v;x<A;x++){var C=E.parts[x];if(b(C.bounds,p)){var y=m(C,g);if(y){n.push(y);break}}}}return n},t.ray=function(g,h,n,d){d=d||1e-100;for(var p=o.angle(h,n),m=o.magnitude(o.sub(h,n)),b=(n.x+h.x)*.5,S=(n.y+h.y)*.5,E=f.rectangle(b,S,m,d,{angle:p}),A=t.collides(E,g),v=0;v<A.length;v+=1){var x=A[v];x.body=x.bodyB=x.bodyA}return A},t.region=function(g,h,n){for(var d=[],p=0;p<g.length;p++){var m=g[p],b=r.overlaps(m.bounds,h);(b&&!n||!b&&n)&&d.push(m)}return d},t.point=function(g,h){for(var n=[],d=0;d<g.length;d++){var p=g[d];if(r.contains(p.bounds,h))for(var m=p.parts.length===1?0:1;m<p.parts.length;m++){var b=p.parts[m];if(r.contains(b.bounds,h)&&c.contains(b.vertices,h)){n.push(p);break}}}return n}})()},function(i,s,a){var t={};i.exports=t;var o=a(4),l=a(0),r=a(6),f=a(1),c=a(5),g=a(2),h=a(14);(function(){var n,d;typeof window<"u"&&(n=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame||function(v){window.setTimeout(function(){v(l.now())},1e3/60)},d=window.cancelAnimationFrame||window.mozCancelAnimationFrame||window.webkitCancelAnimationFrame||window.msCancelAnimationFrame),t._goodFps=30,t._goodDelta=1e3/60,t.create=function(v){var x={engine:null,element:null,canvas:null,mouse:null,frameRequestId:null,timing:{historySize:60,delta:0,deltaHistory:[],lastTime:0,lastTimestamp:0,lastElapsed:0,timestampElapsed:0,timestampElapsedHistory:[],engineDeltaHistory:[],engineElapsedHistory:[],engineUpdatesHistory:[],elapsedHistory:[]},options:{width:800,height:600,pixelRatio:1,background:"#14151f",wireframeBackground:"#14151f",wireframeStrokeStyle:"#bbb",hasBounds:!!v.bounds,enabled:!0,wireframes:!0,showSleeping:!0,showDebug:!1,showStats:!1,showPerformance:!1,showBounds:!1,showVelocity:!1,showCollisions:!1,showSeparations:!1,showAxes:!1,showPositions:!1,showAngleIndicator:!1,showIds:!1,showVertexNumbers:!1,showConvexHulls:!1,showInternalEdges:!1,showMousePosition:!1}},C=l.extend(x,v);return C.canvas&&(C.canvas.width=C.options.width||C.canvas.width,C.canvas.height=C.options.height||C.canvas.height),C.mouse=v.mouse,C.engine=v.engine,C.canvas=C.canvas||b(C.options.width,C.options.height),C.context=C.canvas.getContext("2d"),C.textures={},C.bounds=C.bounds||{min:{x:0,y:0},max:{x:C.canvas.width,y:C.canvas.height}},C.controller=t,C.options.showBroadphase=!1,C.options.pixelRatio!==1&&t.setPixelRatio(C,C.options.pixelRatio),l.isElement(C.element)&&C.element.appendChild(C.canvas),C},t.run=function(v){(function x(C){v.frameRequestId=n(x),p(v,C),t.world(v,C),v.context.setTransform(v.options.pixelRatio,0,0,v.options.pixelRatio,0,0),(v.options.showStats||v.options.showDebug)&&t.stats(v,v.context,C),(v.options.showPerformance||v.options.showDebug)&&t.performance(v,v.context,C),v.context.setTransform(1,0,0,1,0,0)})()},t.stop=function(v){d(v.frameRequestId)},t.setPixelRatio=function(v,x){var C=v.options,y=v.canvas;x==="auto"&&(x=S(y)),C.pixelRatio=x,y.setAttribute("data-pixel-ratio",x),y.width=C.width*x,y.height=C.height*x,y.style.width=C.width+"px",y.style.height=C.height+"px"},t.setSize=function(v,x,C){v.options.width=x,v.options.height=C,v.bounds.max.x=v.bounds.min.x+x,v.bounds.max.y=v.bounds.min.y+C,v.options.pixelRatio!==1?t.setPixelRatio(v,v.options.pixelRatio):(v.canvas.width=x,v.canvas.height=C)},t.lookAt=function(v,x,C,y){y=typeof y<"u"?y:!0,x=l.isArray(x)?x:[x],C=C||{x:0,y:0};for(var M={min:{x:1/0,y:1/0},max:{x:-1/0,y:-1/0}},w=0;w<x.length;w+=1){var I=x[w],q=I.bounds?I.bounds.min:I.min||I.position||I,k=I.bounds?I.bounds.max:I.max||I.position||I;q&&k&&(q.x<M.min.x&&(M.min.x=q.x),k.x>M.max.x&&(M.max.x=k.x),q.y<M.min.y&&(M.min.y=q.y),k.y>M.max.y&&(M.max.y=k.y))}var T=M.max.x-M.min.x+2*C.x,P=M.max.y-M.min.y+2*C.y,z=v.canvas.height,_=v.canvas.width,$=_/z,U=T/P,Q=1,H=1;U>$?H=U/$:Q=$/U,v.options.hasBounds=!0,v.bounds.min.x=M.min.x,v.bounds.max.x=M.min.x+T*Q,v.bounds.min.y=M.min.y,v.bounds.max.y=M.min.y+P*H,y&&(v.bounds.min.x+=T*.5-T*Q*.5,v.bounds.max.x+=T*.5-T*Q*.5,v.bounds.min.y+=P*.5-P*H*.5,v.bounds.max.y+=P*.5-P*H*.5),v.bounds.min.x-=C.x,v.bounds.max.x-=C.x,v.bounds.min.y-=C.y,v.bounds.max.y-=C.y,v.mouse&&(h.setScale(v.mouse,{x:(v.bounds.max.x-v.bounds.min.x)/v.canvas.width,y:(v.bounds.max.y-v.bounds.min.y)/v.canvas.height}),h.setOffset(v.mouse,v.bounds.min))},t.startViewTransform=function(v){var x=v.bounds.max.x-v.bounds.min.x,C=v.bounds.max.y-v.bounds.min.y,y=x/v.options.width,M=C/v.options.height;v.context.setTransform(v.options.pixelRatio/y,0,0,v.options.pixelRatio/M,0,0),v.context.translate(-v.bounds.min.x,-v.bounds.min.y)},t.endViewTransform=function(v){v.context.setTransform(v.options.pixelRatio,0,0,v.options.pixelRatio,0,0)},t.world=function(v,x){var C=l.now(),y=v.engine,M=y.world,w=v.canvas,I=v.context,q=v.options,k=v.timing,T=r.allBodies(M),P=r.allConstraints(M),z=q.wireframes?q.wireframeBackground:q.background,_=[],$=[],U,Q={timestamp:y.timing.timestamp};if(c.trigger(v,"beforeRender",Q),v.currentBackground!==z&&A(v,z),I.globalCompositeOperation="source-in",I.fillStyle="transparent",I.fillRect(0,0,w.width,w.height),I.globalCompositeOperation="source-over",q.hasBounds){for(U=0;U<T.length;U++){var H=T[U];f.overlaps(H.bounds,v.bounds)&&_.push(H)}for(U=0;U<P.length;U++){var W=P[U],K=W.bodyA,fe=W.bodyB,ne=W.pointA,R=W.pointB;K&&(ne=g.add(K.position,W.pointA)),fe&&(R=g.add(fe.position,W.pointB)),!(!ne||!R)&&(f.contains(v.bounds,ne)||f.contains(v.bounds,R))&&$.push(W)}t.startViewTransform(v),v.mouse&&(h.setScale(v.mouse,{x:(v.bounds.max.x-v.bounds.min.x)/v.options.width,y:(v.bounds.max.y-v.bounds.min.y)/v.options.height}),h.setOffset(v.mouse,v.bounds.min))}else $=P,_=T,v.options.pixelRatio!==1&&v.context.setTransform(v.options.pixelRatio,0,0,v.options.pixelRatio,0,0);!q.wireframes||y.enableSleeping&&q.showSleeping?t.bodies(v,_,I):(q.showConvexHulls&&t.bodyConvexHulls(v,_,I),t.bodyWireframes(v,_,I)),q.showBounds&&t.bodyBounds(v,_,I),(q.showAxes||q.showAngleIndicator)&&t.bodyAxes(v,_,I),q.showPositions&&t.bodyPositions(v,_,I),q.showVelocity&&t.bodyVelocity(v,_,I),q.showIds&&t.bodyIds(v,_,I),q.showSeparations&&t.separations(v,y.pairs.list,I),q.showCollisions&&t.collisions(v,y.pairs.list,I),q.showVertexNumbers&&t.vertexNumbers(v,_,I),q.showMousePosition&&t.mousePosition(v,v.mouse,I),t.constraints($,I),q.hasBounds&&t.endViewTransform(v),c.trigger(v,"afterRender",Q),k.lastElapsed=l.now()-C},t.stats=function(v,x,C){for(var y=v.engine,M=y.world,w=r.allBodies(M),I=0,q=55,k=44,T=0,P=0,z=0;z<w.length;z+=1)I+=w[z].parts.length;var _={Part:I,Body:w.length,Cons:r.allConstraints(M).length,Comp:r.allComposites(M).length,Pair:y.pairs.list.length};x.fillStyle="#0e0f19",x.fillRect(T,P,q*5.5,k),x.font="12px Arial",x.textBaseline="top",x.textAlign="right";for(var $ in _){var U=_[$];x.fillStyle="#aaa",x.fillText($,T+q,P+8),x.fillStyle="#eee",x.fillText(U,T+q,P+26),T+=q}},t.performance=function(v,x){var C=v.engine,y=v.timing,M=y.deltaHistory,w=y.elapsedHistory,I=y.timestampElapsedHistory,q=y.engineDeltaHistory,k=y.engineUpdatesHistory,T=y.engineElapsedHistory,P=C.timing.lastUpdatesPerFrame,z=C.timing.lastDelta,_=m(M),$=m(w),U=m(q),Q=m(k),H=m(T),W=m(I),K=W/_||0,fe=Math.round(_/z),ne=1e3/_||0,R=4,se=12,j=60,Re=34,le=10,ce=69;x.fillStyle="#0e0f19",x.fillRect(0,50,se*5+j*6+22,Re),t.status(x,le,ce,j,R,M.length,Math.round(ne)+" fps",ne/t._goodFps,function(X){return M[X]/_-1}),t.status(x,le+se+j,ce,j,R,q.length,z.toFixed(2)+" dt",t._goodDelta/z,function(X){return q[X]/U-1}),t.status(x,le+(se+j)*2,ce,j,R,k.length,P+" upf",Math.pow(l.clamp(Q/fe||1,0,1),4),function(X){return k[X]/Q-1}),t.status(x,le+(se+j)*3,ce,j,R,T.length,H.toFixed(2)+" ut",1-P*H/t._goodFps,function(X){return T[X]/H-1}),t.status(x,le+(se+j)*4,ce,j,R,w.length,$.toFixed(2)+" rt",1-$/t._goodFps,function(X){return w[X]/$-1}),t.status(x,le+(se+j)*5,ce,j,R,I.length,K.toFixed(2)+" x",K*K*K,function(X){return(I[X]/M[X]/K||0)-1})},t.status=function(v,x,C,y,M,w,I,q,k){v.strokeStyle="#888",v.fillStyle="#444",v.lineWidth=1,v.fillRect(x,C+7,y,1),v.beginPath(),v.moveTo(x,C+7-M*l.clamp(.4*k(0),-2,2));for(var T=0;T<y;T+=1)v.lineTo(x+T,C+7-(T<w?M*l.clamp(.4*k(T),-2,2):0));v.stroke(),v.fillStyle="hsl("+l.clamp(25+95*q,0,120)+",100%,60%)",v.fillRect(x,C-7,4,4),v.font="12px Arial",v.textBaseline="middle",v.textAlign="right",v.fillStyle="#eee",v.fillText(I,x+y,C-5)},t.constraints=function(v,x){for(var C=x,y=0;y<v.length;y++){var M=v[y];if(!(!M.render.visible||!M.pointA||!M.pointB)){var w=M.bodyA,I=M.bodyB,q,k;if(w?q=g.add(w.position,M.pointA):q=M.pointA,M.render.type==="pin")C.beginPath(),C.arc(q.x,q.y,3,0,2*Math.PI),C.closePath();else{if(I?k=g.add(I.position,M.pointB):k=M.pointB,C.beginPath(),C.moveTo(q.x,q.y),M.render.type==="spring")for(var T=g.sub(k,q),P=g.perp(g.normalise(T)),z=Math.ceil(l.clamp(M.length/5,12,20)),_,$=1;$<z;$+=1)_=$%2===0?1:-1,C.lineTo(q.x+T.x*($/z)+P.x*_*4,q.y+T.y*($/z)+P.y*_*4);C.lineTo(k.x,k.y)}M.render.lineWidth&&(C.lineWidth=M.render.lineWidth,C.strokeStyle=M.render.strokeStyle,C.stroke()),M.render.anchors&&(C.fillStyle=M.render.strokeStyle,C.beginPath(),C.arc(q.x,q.y,3,0,2*Math.PI),C.arc(k.x,k.y,3,0,2*Math.PI),C.closePath(),C.fill())}}},t.bodies=function(v,x,C){var y=C;v.engine;var M=v.options,w=M.showInternalEdges||!M.wireframes,I,q,k,T;for(k=0;k<x.length;k++)if(I=x[k],!!I.render.visible){for(T=I.parts.length>1?1:0;T<I.parts.length;T++)if(q=I.parts[T],!!q.render.visible){if(M.showSleeping&&I.isSleeping?y.globalAlpha=.5*q.render.opacity:q.render.opacity!==1&&(y.globalAlpha=q.render.opacity),q.render.sprite&&q.render.sprite.texture&&!M.wireframes){var P=q.render.sprite,z=E(v,P.texture);y.translate(q.position.x,q.position.y),y.rotate(q.angle),y.drawImage(z,z.width*-P.xOffset*P.xScale,z.height*-P.yOffset*P.yScale,z.width*P.xScale,z.height*P.yScale),y.rotate(-q.angle),y.translate(-q.position.x,-q.position.y)}else{if(q.circleRadius)y.beginPath(),y.arc(q.position.x,q.position.y,q.circleRadius,0,2*Math.PI);else{y.beginPath(),y.moveTo(q.vertices[0].x,q.vertices[0].y);for(var _=1;_<q.vertices.length;_++)!q.vertices[_-1].isInternal||w?y.lineTo(q.vertices[_].x,q.vertices[_].y):y.moveTo(q.vertices[_].x,q.vertices[_].y),q.vertices[_].isInternal&&!w&&y.moveTo(q.vertices[(_+1)%q.vertices.length].x,q.vertices[(_+1)%q.vertices.length].y);y.lineTo(q.vertices[0].x,q.vertices[0].y),y.closePath()}M.wireframes?(y.lineWidth=1,y.strokeStyle=v.options.wireframeStrokeStyle,y.stroke()):(y.fillStyle=q.render.fillStyle,q.render.lineWidth&&(y.lineWidth=q.render.lineWidth,y.strokeStyle=q.render.strokeStyle,y.stroke()),y.fill())}y.globalAlpha=1}}},t.bodyWireframes=function(v,x,C){var y=C,M=v.options.showInternalEdges,w,I,q,k,T;for(y.beginPath(),q=0;q<x.length;q++)if(w=x[q],!!w.render.visible)for(T=w.parts.length>1?1:0;T<w.parts.length;T++){for(I=w.parts[T],y.moveTo(I.vertices[0].x,I.vertices[0].y),k=1;k<I.vertices.length;k++)!I.vertices[k-1].isInternal||M?y.lineTo(I.vertices[k].x,I.vertices[k].y):y.moveTo(I.vertices[k].x,I.vertices[k].y),I.vertices[k].isInternal&&!M&&y.moveTo(I.vertices[(k+1)%I.vertices.length].x,I.vertices[(k+1)%I.vertices.length].y);y.lineTo(I.vertices[0].x,I.vertices[0].y)}y.lineWidth=1,y.strokeStyle=v.options.wireframeStrokeStyle,y.stroke()},t.bodyConvexHulls=function(v,x,C){var y=C,M,w,I;for(y.beginPath(),w=0;w<x.length;w++)if(M=x[w],!(!M.render.visible||M.parts.length===1)){for(y.moveTo(M.vertices[0].x,M.vertices[0].y),I=1;I<M.vertices.length;I++)y.lineTo(M.vertices[I].x,M.vertices[I].y);y.lineTo(M.vertices[0].x,M.vertices[0].y)}y.lineWidth=1,y.strokeStyle="rgba(255,255,255,0.2)",y.stroke()},t.vertexNumbers=function(v,x,C){var y=C,M,w,I;for(M=0;M<x.length;M++){var q=x[M].parts;for(I=q.length>1?1:0;I<q.length;I++){var k=q[I];for(w=0;w<k.vertices.length;w++)y.fillStyle="rgba(255,255,255,0.2)",y.fillText(M+"_"+w,k.position.x+(k.vertices[w].x-k.position.x)*.8,k.position.y+(k.vertices[w].y-k.position.y)*.8)}}},t.mousePosition=function(v,x,C){var y=C;y.fillStyle="rgba(255,255,255,0.8)",y.fillText(x.position.x+"  "+x.position.y,x.position.x+5,x.position.y-5)},t.bodyBounds=function(v,x,C){var y=C;v.engine;var M=v.options;y.beginPath();for(var w=0;w<x.length;w++){var I=x[w];if(I.render.visible)for(var q=x[w].parts,k=q.length>1?1:0;k<q.length;k++){var T=q[k];y.rect(T.bounds.min.x,T.bounds.min.y,T.bounds.max.x-T.bounds.min.x,T.bounds.max.y-T.bounds.min.y)}}M.wireframes?y.strokeStyle="rgba(255,255,255,0.08)":y.strokeStyle="rgba(0,0,0,0.1)",y.lineWidth=1,y.stroke()},t.bodyAxes=function(v,x,C){var y=C;v.engine;var M=v.options,w,I,q,k;for(y.beginPath(),I=0;I<x.length;I++){var T=x[I],P=T.parts;if(T.render.visible)if(M.showAxes)for(q=P.length>1?1:0;q<P.length;q++)for(w=P[q],k=0;k<w.axes.length;k++){var z=w.axes[k];y.moveTo(w.position.x,w.position.y),y.lineTo(w.position.x+z.x*20,w.position.y+z.y*20)}else for(q=P.length>1?1:0;q<P.length;q++)for(w=P[q],k=0;k<w.axes.length;k++)y.moveTo(w.position.x,w.position.y),y.lineTo((w.vertices[0].x+w.vertices[w.vertices.length-1].x)/2,(w.vertices[0].y+w.vertices[w.vertices.length-1].y)/2)}M.wireframes?(y.strokeStyle="indianred",y.lineWidth=1):(y.strokeStyle="rgba(255, 255, 255, 0.4)",y.globalCompositeOperation="overlay",y.lineWidth=2),y.stroke(),y.globalCompositeOperation="source-over"},t.bodyPositions=function(v,x,C){var y=C;v.engine;var M=v.options,w,I,q,k;for(y.beginPath(),q=0;q<x.length;q++)if(w=x[q],!!w.render.visible)for(k=0;k<w.parts.length;k++)I=w.parts[k],y.arc(I.position.x,I.position.y,3,0,2*Math.PI,!1),y.closePath();for(M.wireframes?y.fillStyle="indianred":y.fillStyle="rgba(0,0,0,0.5)",y.fill(),y.beginPath(),q=0;q<x.length;q++)w=x[q],w.render.visible&&(y.arc(w.positionPrev.x,w.positionPrev.y,2,0,2*Math.PI,!1),y.closePath());y.fillStyle="rgba(255,165,0,0.8)",y.fill()},t.bodyVelocity=function(v,x,C){var y=C;y.beginPath();for(var M=0;M<x.length;M++){var w=x[M];if(w.render.visible){var I=o.getVelocity(w);y.moveTo(w.position.x,w.position.y),y.lineTo(w.position.x+I.x,w.position.y+I.y)}}y.lineWidth=3,y.strokeStyle="cornflowerblue",y.stroke()},t.bodyIds=function(v,x,C){var y=C,M,w;for(M=0;M<x.length;M++)if(x[M].render.visible){var I=x[M].parts;for(w=I.length>1?1:0;w<I.length;w++){var q=I[w];y.font="12px Arial",y.fillStyle="rgba(255,255,255,0.5)",y.fillText(q.id,q.position.x+10,q.position.y-10)}}},t.collisions=function(v,x,C){var y=C,M=v.options,w,I,q,k;for(y.beginPath(),q=0;q<x.length;q++)if(w=x[q],!!w.isActive)for(I=w.collision,k=0;k<w.contactCount;k++){var T=w.contacts[k],P=T.vertex;y.rect(P.x-1.5,P.y-1.5,3.5,3.5)}for(M.wireframes?y.fillStyle="rgba(255,255,255,0.7)":y.fillStyle="orange",y.fill(),y.beginPath(),q=0;q<x.length;q++)if(w=x[q],!!w.isActive&&(I=w.collision,w.contactCount>0)){var z=w.contacts[0].vertex.x,_=w.contacts[0].vertex.y;w.contactCount===2&&(z=(w.contacts[0].vertex.x+w.contacts[1].vertex.x)/2,_=(w.contacts[0].vertex.y+w.contacts[1].vertex.y)/2),I.bodyB===I.supports[0].body||I.bodyA.isStatic===!0?y.moveTo(z-I.normal.x*8,_-I.normal.y*8):y.moveTo(z+I.normal.x*8,_+I.normal.y*8),y.lineTo(z,_)}M.wireframes?y.strokeStyle="rgba(255,165,0,0.7)":y.strokeStyle="orange",y.lineWidth=1,y.stroke()},t.separations=function(v,x,C){var y=C,M=v.options,w,I,q,k,T;for(y.beginPath(),T=0;T<x.length;T++)if(w=x[T],!!w.isActive){I=w.collision,q=I.bodyA,k=I.bodyB;var P=1;!k.isStatic&&!q.isStatic&&(P=.5),k.isStatic&&(P=0),y.moveTo(k.position.x,k.position.y),y.lineTo(k.position.x-I.penetration.x*P,k.position.y-I.penetration.y*P),P=1,!k.isStatic&&!q.isStatic&&(P=.5),q.isStatic&&(P=0),y.moveTo(q.position.x,q.position.y),y.lineTo(q.position.x+I.penetration.x*P,q.position.y+I.penetration.y*P)}M.wireframes?y.strokeStyle="rgba(255,165,0,0.5)":y.strokeStyle="orange",y.stroke()},t.inspector=function(v,x){v.engine;var C=v.selected,y=v.render,M=y.options,w;if(M.hasBounds){var I=y.bounds.max.x-y.bounds.min.x,q=y.bounds.max.y-y.bounds.min.y,k=I/y.options.width,T=q/y.options.height;x.scale(1/k,1/T),x.translate(-y.bounds.min.x,-y.bounds.min.y)}for(var P=0;P<C.length;P++){var z=C[P].data;switch(x.translate(.5,.5),x.lineWidth=1,x.strokeStyle="rgba(255,165,0,0.9)",x.setLineDash([1,2]),z.type){case"body":w=z.bounds,x.beginPath(),x.rect(Math.floor(w.min.x-3),Math.floor(w.min.y-3),Math.floor(w.max.x-w.min.x+6),Math.floor(w.max.y-w.min.y+6)),x.closePath(),x.stroke();break;case"constraint":var _=z.pointA;z.bodyA&&(_=z.pointB),x.beginPath(),x.arc(_.x,_.y,10,0,2*Math.PI),x.closePath(),x.stroke();break}x.setLineDash([]),x.translate(-.5,-.5)}v.selectStart!==null&&(x.translate(.5,.5),x.lineWidth=1,x.strokeStyle="rgba(255,165,0,0.6)",x.fillStyle="rgba(255,165,0,0.1)",w=v.selectBounds,x.beginPath(),x.rect(Math.floor(w.min.x),Math.floor(w.min.y),Math.floor(w.max.x-w.min.x),Math.floor(w.max.y-w.min.y)),x.closePath(),x.stroke(),x.fill(),x.translate(-.5,-.5)),M.hasBounds&&x.setTransform(1,0,0,1,0,0)};var p=function(v,x){var C=v.engine,y=v.timing,M=y.historySize,w=C.timing.timestamp;y.delta=x-y.lastTime||t._goodDelta,y.lastTime=x,y.timestampElapsed=w-y.lastTimestamp||0,y.lastTimestamp=w,y.deltaHistory.unshift(y.delta),y.deltaHistory.length=Math.min(y.deltaHistory.length,M),y.engineDeltaHistory.unshift(C.timing.lastDelta),y.engineDeltaHistory.length=Math.min(y.engineDeltaHistory.length,M),y.timestampElapsedHistory.unshift(y.timestampElapsed),y.timestampElapsedHistory.length=Math.min(y.timestampElapsedHistory.length,M),y.engineUpdatesHistory.unshift(C.timing.lastUpdatesPerFrame),y.engineUpdatesHistory.length=Math.min(y.engineUpdatesHistory.length,M),y.engineElapsedHistory.unshift(C.timing.lastElapsed),y.engineElapsedHistory.length=Math.min(y.engineElapsedHistory.length,M),y.elapsedHistory.unshift(y.lastElapsed),y.elapsedHistory.length=Math.min(y.elapsedHistory.length,M)},m=function(v){for(var x=0,C=0;C<v.length;C+=1)x+=v[C];return x/v.length||0},b=function(v,x){var C=document.createElement("canvas");return C.width=v,C.height=x,C.oncontextmenu=function(){return!1},C.onselectstart=function(){return!1},C},S=function(v){var x=v.getContext("2d"),C=window.devicePixelRatio||1,y=x.webkitBackingStorePixelRatio||x.mozBackingStorePixelRatio||x.msBackingStorePixelRatio||x.oBackingStorePixelRatio||x.backingStorePixelRatio||1;return C/y},E=function(v,x){var C=v.textures[x];return C||(C=v.textures[x]=new Image,C.src=x,C)},A=function(v,x){var C=x;/(jpg|gif|png)$/.test(x)&&(C="url("+x+")"),v.canvas.style.background=C,v.canvas.style.backgroundSize="contain",v.currentBackground=x}})()},function(i,s,a){var t={};i.exports=t;var o=a(5),l=a(17),r=a(0);(function(){t._maxFrameDelta=1e3/15,t._frameDeltaFallback=1e3/60,t._timeBufferMargin=1.5,t._elapsedNextEstimate=1,t._smoothingLowerBound=.1,t._smoothingUpperBound=.9,t.create=function(c){var g={delta:16.666666666666668,frameDelta:null,frameDeltaSmoothing:!0,frameDeltaSnapping:!0,frameDeltaHistory:[],frameDeltaHistorySize:100,frameRequestId:null,timeBuffer:0,timeLastTick:null,maxUpdates:null,maxFrameTime:33.333333333333336,lastUpdatesDeferred:0,enabled:!0},h=r.extend(g,c);return h.fps=0,h},t.run=function(c,g){return c.timeBuffer=t._frameDeltaFallback,function h(n){c.frameRequestId=t._onNextFrame(c,h),n&&c.enabled&&t.tick(c,g,n)}(),c},t.tick=function(c,g,h){var n=r.now(),d=c.delta,p=0,m=h-c.timeLastTick;if((!m||!c.timeLastTick||m>Math.max(t._maxFrameDelta,c.maxFrameTime))&&(m=c.frameDelta||t._frameDeltaFallback),c.frameDeltaSmoothing){c.frameDeltaHistory.push(m),c.frameDeltaHistory=c.frameDeltaHistory.slice(-c.frameDeltaHistorySize);var b=c.frameDeltaHistory.slice(0).sort(),S=c.frameDeltaHistory.slice(b.length*t._smoothingLowerBound,b.length*t._smoothingUpperBound),E=f(S);m=E||m}c.frameDeltaSnapping&&(m=1e3/Math.round(1e3/m)),c.frameDelta=m,c.timeLastTick=h,c.timeBuffer+=c.frameDelta,c.timeBuffer=r.clamp(c.timeBuffer,0,c.frameDelta+d*t._timeBufferMargin),c.lastUpdatesDeferred=0;var A=c.maxUpdates||Math.ceil(c.maxFrameTime/d),v={timestamp:g.timing.timestamp};o.trigger(c,"beforeTick",v),o.trigger(c,"tick",v);for(var x=r.now();d>0&&c.timeBuffer>=d*t._timeBufferMargin;){o.trigger(c,"beforeUpdate",v),l.update(g,d),o.trigger(c,"afterUpdate",v),c.timeBuffer-=d,p+=1;var C=r.now()-n,y=r.now()-x,M=C+t._elapsedNextEstimate*y/p;if(p>=A||M>c.maxFrameTime){c.lastUpdatesDeferred=Math.round(Math.max(0,c.timeBuffer/d-t._timeBufferMargin));break}}g.timing.lastUpdatesPerFrame=p,o.trigger(c,"afterTick",v),c.frameDeltaHistory.length>=100&&(c.lastUpdatesDeferred&&Math.round(c.frameDelta/d)>A?r.warnOnce("Matter.Runner: runner reached runner.maxUpdates, see docs."):c.lastUpdatesDeferred&&r.warnOnce("Matter.Runner: runner reached runner.maxFrameTime, see docs."),typeof c.isFixed<"u"&&r.warnOnce("Matter.Runner: runner.isFixed is now redundant, see docs."),(c.deltaMin||c.deltaMax)&&r.warnOnce("Matter.Runner: runner.deltaMin and runner.deltaMax were removed, see docs."),c.fps!==0&&r.warnOnce("Matter.Runner: runner.fps was replaced by runner.delta, see docs."))},t.stop=function(c){t._cancelNextFrame(c)},t._onNextFrame=function(c,g){if(typeof window<"u"&&window.requestAnimationFrame)c.frameRequestId=window.requestAnimationFrame(g);else throw new Error("Matter.Runner: missing required global window.requestAnimationFrame.");return c.frameRequestId},t._cancelNextFrame=function(c){if(typeof window<"u"&&window.cancelAnimationFrame)window.cancelAnimationFrame(c.frameRequestId);else throw new Error("Matter.Runner: missing required global window.cancelAnimationFrame.")};var f=function(c){for(var g=0,h=c.length,n=0;n<h;n+=1)g+=c[n];return g/h||0}})()},function(i,s,a){var t={};i.exports=t;var o=a(8),l=a(0),r=l.deprecated;(function(){t.collides=function(f,c){return o.collides(f,c)},r(t,"collides","SAT.collides ➤ replaced by Collision.collides")})()},function(i,s,a){var t={};i.exports=t,a(1);var o=a(0);(function(){t.pathToVertices=function(l,r){typeof window<"u"&&!("SVGPathSeg"in window)&&o.warn("Svg.pathToVertices: SVGPathSeg not defined, a polyfill is required.");var f,c,g,h,n,d,p,m,b,S,E=[],A,v,x=0,C=0,y=0;r=r||15;var M=function(I,q,k){var T=k%2===1&&k>1;if(!b||I!=b.x||q!=b.y){b&&T?(A=b.x,v=b.y):(A=0,v=0);var P={x:A+I,y:v+q};(T||!b)&&(b=P),E.push(P),C=A+I,y=v+q}},w=function(I){var q=I.pathSegTypeAsLetter.toUpperCase();if(q!=="Z"){switch(q){case"M":case"L":case"T":case"C":case"S":case"Q":C=I.x,y=I.y;break;case"H":C=I.x;break;case"V":y=I.y;break}M(C,y,I.pathSegType)}};for(t._svgPathToAbsolute(l),g=l.getTotalLength(),d=[],f=0;f<l.pathSegList.numberOfItems;f+=1)d.push(l.pathSegList.getItem(f));for(p=d.concat();x<g;){if(S=l.getPathSegAtLength(x),n=d[S],n!=m){for(;p.length&&p[0]!=n;)w(p.shift());m=n}switch(n.pathSegTypeAsLetter.toUpperCase()){case"C":case"T":case"S":case"Q":case"A":h=l.getPointAtLength(x),M(h.x,h.y,0);break}x+=r}for(f=0,c=p.length;f<c;++f)w(p[f]);return E},t._svgPathToAbsolute=function(l){for(var r,f,c,g,h,n,d=l.pathSegList,p=0,m=0,b=d.numberOfItems,S=0;S<b;++S){var E=d.getItem(S),A=E.pathSegTypeAsLetter;if(/[MLHVCSQTA]/.test(A))"x"in E&&(p=E.x),"y"in E&&(m=E.y);else switch("x1"in E&&(c=p+E.x1),"x2"in E&&(h=p+E.x2),"y1"in E&&(g=m+E.y1),"y2"in E&&(n=m+E.y2),"x"in E&&(p+=E.x),"y"in E&&(m+=E.y),A){case"m":d.replaceItem(l.createSVGPathSegMovetoAbs(p,m),S);break;case"l":d.replaceItem(l.createSVGPathSegLinetoAbs(p,m),S);break;case"h":d.replaceItem(l.createSVGPathSegLinetoHorizontalAbs(p),S);break;case"v":d.replaceItem(l.createSVGPathSegLinetoVerticalAbs(m),S);break;case"c":d.replaceItem(l.createSVGPathSegCurvetoCubicAbs(p,m,c,g,h,n),S);break;case"s":d.replaceItem(l.createSVGPathSegCurvetoCubicSmoothAbs(p,m,h,n),S);break;case"q":d.replaceItem(l.createSVGPathSegCurvetoQuadraticAbs(p,m,c,g),S);break;case"t":d.replaceItem(l.createSVGPathSegCurvetoQuadraticSmoothAbs(p,m),S);break;case"a":d.replaceItem(l.createSVGPathSegArcAbs(p,m,E.r1,E.r2,E.angle,E.largeArcFlag,E.sweepFlag),S);break;case"z":case"Z":p=r,m=f;break}(A=="M"||A=="m")&&(r=p,f=m)}}})()},function(i,s,a){var t={};i.exports=t;var o=a(6);a(0),function(){t.create=o.create,t.add=o.add,t.remove=o.remove,t.clear=o.clear,t.addComposite=o.addComposite,t.addBody=o.addBody,t.addConstraint=o.addConstraint}()}])})}(lt)),lt.exports}var Ri=Oi();const L=$i(Ri),nt=1,Fi=2,Y=60,Yt=70;class Ui{constructor(e,i,s){console.log("PhysicsManager Creado"),this.catManager=e,this.catFoodManager=i,this.gameManager=s,this.resizeListener=this.handleResize.bind(this),this.collisionHandler=this.handleCollisions.bind(this),this.speedLimitHandler=this.limitAllCatSpeeds.bind(this)}init(e){if(console.log("PhysicsManager: init"),!e)throw console.error("PhysicsManager CRITICAL: catDisplayAreaElement es nulo en init()."),new Error("PhysicsManager requiere un catDisplayAreaElement para inicializar.");this.catDisplayAreaElement=e,this.engine=L.Engine.create(),this.world=this.engine.world,this.runner=L.Runner.create(),this.engine.gravity.y=.8,this.engine.gravity.x=0,this.engine.enableSleeping=!0,console.log("Matter.js Engine, World, Runner creados."),this.createWalls(),this.setupMouseConstraint(this.catDisplayAreaElement),console.log("PhysicsManager: Añadiendo listeners de eventos del motor..."),L.Events.on(this.engine,"collisionStart",this.collisionHandler),L.Events.on(this.engine,"beforeUpdate",this.speedLimitHandler),window.addEventListener("resize",this.resizeListener),console.log("PhysicsManager: init completado.")}createWalls(){const e=window.innerWidth,i=window.innerHeight;this.ground=L.Bodies.rectangle(e/2,i+Y/2,e,Y,{isStatic:!0,label:"ground",collisionFilter:{category:nt}}),this.leftWall=L.Bodies.rectangle(-60/2,i/2,Y,i,{isStatic:!0,label:"leftWall",collisionFilter:{category:nt}}),this.rightWall=L.Bodies.rectangle(e+Y/2,i/2,Y,i,{isStatic:!0,label:"rightWall",collisionFilter:{category:nt}}),this.topWall=L.Bodies.rectangle(e/2,-60/2,e,Y,{isStatic:!0,label:"topWall",collisionFilter:{category:nt}}),L.World.add(this.world,[this.ground,this.leftWall,this.rightWall,this.topWall]),console.log("PhysicsManager: Paredes creadas.")}setupMouseConstraint(e){const i=L.Mouse.create(e);this.mouseConstraint=L.MouseConstraint.create(this.engine,{mouse:i,constraint:{stiffness:.1,render:{visible:!1}}}),this.mouseConstraint.collisionFilter.mask=Fi,L.World.add(this.world,this.mouseConstraint),this.updateMouseConstraintOffset(),console.log("PhysicsManager: MouseConstraint configurado sobre",e),L.Events.on(this.mouseConstraint,"startdrag",s=>{const a=s.body;a&&a.label==="cat"&&(console.log("PhysicsManager: Cat drag started"),this.gameManager.setCatDragState(!0))}),L.Events.on(this.mouseConstraint,"enddrag",s=>{const a=s.body;a&&a.label==="cat"&&(console.log("PhysicsManager: Cat drag ended"),this.gameManager.setCatDragState(!1))})}updateMouseConstraintOffset(){if(this.mouseConstraint&&this.mouseConstraint.mouse.element){const e=this.mouseConstraint.mouse.element.getBoundingClientRect();L.Mouse.setOffset(this.mouseConstraint.mouse,{x:-e.left,y:-e.top})}}handleCollisions(e){var s,a;const i=e.pairs;for(let t=0;t<i.length;t++){const o=i[t],l=o.bodyA,r=o.bodyB,f=l==null?void 0:l.label,c=r==null?void 0:r.label;if(f==="cat"&&c==="cat"){const g=((s=this.mouseConstraint)==null?void 0:s.body)===l,h=((a=this.mouseConstraint)==null?void 0:a.body)===r;if(g!==h)if(typeof l.id<"u"&&typeof r.id<"u"){const n=g?l.id:r.id;this.catManager.processPlayerInitiatedCollision(l.id,r.id,n)}else console.error("Error: IDs indefinidos en colisión gato-gato.")}else if(f==="cat"&&c==="foodPellet"||f==="foodPellet"&&c==="cat"){const g=f==="cat"?l:r,h=f==="foodPellet"?l:r;typeof g.id<"u"&&h?this.catFoodManager.processCatFoodCollision(g.id,h):console.warn("Colisión Gato-Comida detectada pero falta ID de gato o cuerpo de comida.")}}}limitAllCatSpeeds(){if(!this.world)return;const e=L.Composite.allBodies(this.world);for(let i=0;i<e.length;i++){const s=e[i];if(!s.isStatic&&s.label==="cat"&&L.Vector.magnitude(s.velocity)>Yt){const t=L.Vector.normalise(s.velocity),o=L.Vector.mult(t,Yt);L.Body.setVelocity(s,o)}}}handleResize(){if(!this.ground||!this.leftWall||!this.rightWall||!this.topWall||!this.catDisplayAreaElement)return;const e=window.innerWidth,i=window.innerHeight;L.Body.setPosition(this.ground,{x:e/2,y:i+Y/2}),L.Body.setVertices(this.ground,L.Vertices.fromPath(`L 0 0 L ${e} 0 L ${e} ${Y} L 0 ${Y}`,this.ground)),L.Body.setPosition(this.leftWall,{x:-60/2,y:i/2}),L.Body.setVertices(this.leftWall,L.Vertices.fromPath(`L 0 0 L ${Y} 0 L ${Y} ${i} L 0 ${i}`,this.leftWall)),L.Body.setPosition(this.rightWall,{x:e+Y/2,y:i/2}),L.Body.setVertices(this.rightWall,L.Vertices.fromPath(`L 0 0 L ${Y} 0 L ${Y} ${i} L 0 ${i}`,this.rightWall)),L.Body.setPosition(this.topWall,{x:e/2,y:-60/2}),L.Body.setVertices(this.topWall,L.Vertices.fromPath(`L 0 0 L ${e} 0 L ${e} ${Y} L 0 ${Y}`,this.topWall)),this.updateMouseConstraintOffset(),console.log("PhysicsManager: Límites y mouse constraint actualizados en resize.")}start(){if(!this.engine||!this.runner){console.error("PhysicsManager: init() debe ser llamado antes de start().");return}L.Runner.run(this.runner,this.engine),console.log("PhysicsManager: Runner iniciado.")}stop(){if(!this.runner){console.warn("PhysicsManager: Runner no inicializado.");return}L.Runner.stop(this.runner),console.log("PhysicsManager: Runner detenido.")}shutdown(){console.log("PhysicsManager: shutdown"),this.stop(),this.engine?(L.Events.off(this.engine,"collisionStart",this.collisionHandler),L.Events.off(this.engine,"beforeUpdate",this.speedLimitHandler),this.mouseConstraint&&(L.Events.off(this.mouseConstraint,"startdrag"),L.Events.off(this.mouseConstraint,"enddrag")),L.World.clear(this.world,!1),L.Engine.clear(this.engine),console.log("PhysicsManager: Listeners de engine removidos y mundo limpiado.")):console.warn("PhysicsManager shutdown: Engine no encontrado."),window.removeEventListener("resize",this.resizeListener),this.mouseConstraint=void 0,console.log("PhysicsManager: shutdown completo.")}getEngine(){if(!this.engine)throw new Error("PhysicsManager no inicializado.");return this.engine}getWorld(){if(!this.world)throw new Error("PhysicsManager no inicializado.");return this.world}}class Ni{constructor(){this.allQuestions=[],this.availableQuestions=[],this.currentQuestion=null,this.isLoading=!1,this.lastError=null}async loadQuestionsData(e){if(this.isLoading)return console.warn("QuizSystem: Ya hay una carga en progreso."),!1;this.isLoading=!0,this.lastError=null,this.allQuestions=[];try{if(!Array.isArray(e))throw new Error("Los datos de preguntas proporcionados no son un array válido.");return this.allQuestions=e,this.resetAvailableQuestions(),console.log(`QuizSystem: ${this.allQuestions.length} preguntas procesadas exitosamente desde datos pre-cargados.`),this.isLoading=!1,!0}catch(i){return console.error("QuizSystem: Error al procesar los datos de preguntas:",i),this.lastError=i instanceof Error?i.message:String(i),this.isLoading=!1,this.allQuestions=[],this.availableQuestions=[],!1}}selectNextQuestion(e){if(this.allQuestions.length===0&&!this.isLoading)return console.error("QuizSystem: No hay preguntas cargadas o procesadas."),null;if(this.isLoading)return console.warn("QuizSystem: Las preguntas aún se están procesando."),null;let i=this.availableQuestions;if(e&&(i=i.filter(a=>String(a.difficulty)===String(e))),i.length===0&&(console.warn("QuizSystem: No quedan preguntas disponibles"+(e?` con dificultad '${e}'.`:".")+" Reseteando lista..."),this.resetAvailableQuestions(),i=this.availableQuestions,e&&(i=i.filter(a=>String(a.difficulty)===String(e))),i.length===0))return console.error(`QuizSystem: No se encontraron preguntas con dificultad '${e}' incluso después de resetear.`),null;const s=Math.floor(Math.random()*i.length);return this.currentQuestion=i[s],this.availableQuestions=this.availableQuestions.filter(a=>{var t;return a.id!==((t=this.currentQuestion)==null?void 0:t.id)}),this.currentQuestion}validateAnswer(e,i){const s=this.allQuestions.find(t=>t.id===e);return s?i===null?!1:s.correctAnswerKey===i:(console.error(`QuizSystem: No se encontró la pregunta con ID '${e}' para validar.`),null)}getCurrentQuestion(){return this.currentQuestion}resetAvailableQuestions(){this.availableQuestions=[...this.allQuestions],this.currentQuestion=null}getLastError(){return this.lastError}isLoadingQuestions(){return this.isLoading}getTotalQuestionsCount(){return this.allQuestions.length}getAvailableQuestionsCount(){return this.availableQuestions.length}}class Vi{constructor(){this.states=new Map,this.currentState=null,this.currentStateName=null,this.isTransitioning=!1,this.animationContainer=null,this.wipeComponent=null}setAnimationContainer(e){this.animationContainer=e}setWipeComponent(e){var i;this.wipeComponent=e,console.log("[StateMachine] Wipe component seteado:",e),(i=this.wipeComponent)==null||i.reset()}addState(e,i){this.states.has(e)&&console.warn(`[StateMachine] El estado '${e}' ya existe. Sobrescribiendo.`),this.states.set(e,i)}async changeState(e,i,s,a){var c,g,h,n;if(console.log(`[StateMachine] Solicitud para cambiar a estado '${e}'. Estado actual: '${this.currentStateName}', isTransitioning: ${this.isTransitioning}`),this.isTransitioning){console.warn(`[StateMachine] Transición a '${e}' ignorada, otra transición ya está en progreso.`);return}const t=this.states.get(e);if(!t){console.error(`[StateMachine] Estado '${e}' no existe. Estados disponibles:`,Array.from(this.states.keys())),this.isTransitioning=!1;return}if(this.currentStateName===e&&!s&&!a){console.warn(`[StateMachine] Ya en estado '${e}' y sin forzar animación.`);return}this.isTransitioning=!0,console.log(`[StateMachine] INICIO TRANSICIÓN: de '${this.currentStateName||"ninguno"}' a '${e}'. isTransitioning = true.`);const o=this.currentState,l=this.currentStateName,r=s||((c=o==null?void 0:o.getPreferredExitAnimation)==null?void 0:c.call(o))||"gq-fade-out",f=a||((g=t==null?void 0:t.getPreferredEnterAnimation)==null?void 0:g.call(t))||"gq-fade-in";try{if(this.wipeComponent&&(r==="gq-wipe-transition"||f==="gq-wipe-transition"))console.log(`[StateMachine] Usando BARRIDO de '${l||"ninguno"}' a '${e}'.`),console.log("[StateMachine]   BARRIDO: Llamando wipeComponent.playIn() para cubrir pantalla..."),await this.wipeComponent.playIn(),console.log("[StateMachine]   BARRIDO: wipeComponent.playIn() COMPLETADO."),o!=null&&o.exit&&(console.log(`[StateMachine]   BARRIDO: Llamando oldState.exit() para '${l}'.`),o.exit()),this.animationContainer&&(console.log("[StateMachine]   BARRIDO: Limpiando animationContainer (innerHTML = '')."),this.animationContainer.innerHTML=""),this.currentState=t,this.currentStateName=e,(h=this.currentState)!=null&&h.enter&&(console.log(`[StateMachine]   BARRIDO: Llamando currentState.enter() para '${this.currentStateName}'.`),this.currentState.enter(i)),console.log(`[StateMachine]   BARRIDO: Llamando wipeComponent.playOut() para revelar '${this.currentStateName}'...`),await this.wipeComponent.playOut(),console.log("[StateMachine]   BARRIDO: wipeComponent.playOut() COMPLETADO."),this.wipeComponent.reset(),console.log(`[StateMachine] Transición de BARRIDO a '${this.currentStateName}' finalizada exitosamente.`);else{console.log(`[StateMachine] Usando animación ESTÁNDAR ('${r}' -> '${f}') de '${l||"ninguno"}' a '${e}'.`);const d=this.animationContainer||document.getElementById("app");if(!d){console.error("[StateMachine] Contenedor de animación estándar no encontrado. Realizando cambio directo."),o!=null&&o.exit&&o.exit(),this.currentState=t,this.currentStateName=e,this.currentState.enter&&this.currentState.enter(i),console.log(`[StateMachine] Cambio directo a '${e}' completado (sin contenedor).`);return}await new Promise(p=>{const m=()=>{var x;d.removeEventListener("animationend",S),b&&clearTimeout(b),d.classList.remove("gq-state-is-exiting",...wt(d)),console.log(`[StateMachine]   ESTÁNDAR: Animación de salida '${r}' para '${l}' finalizada.`),o!=null&&o.exit&&(console.log(`[StateMachine]   ESTÁNDAR: Llamando oldState.exit() para '${l}'.`),o.exit()),r.includes("fade")&&(console.log("[StateMachine]   ESTÁNDAR: Limpiando container.innerHTML por animación fade."),d.innerHTML=""),this.currentState=t,this.currentStateName=e,(x=this.currentState)!=null&&x.enter&&(console.log(`[StateMachine]   ESTÁNDAR: Llamando currentState.enter() para '${this.currentStateName}'.`),this.currentState.enter(i)),console.log(`[StateMachine]   ESTÁNDAR: Aplicando animación de entrada '${f}' para '${this.currentStateName}'.`),d.classList.add("gq-state-is-entering",f);const E=Kt(d,f);let A=window.setTimeout(()=>{console.warn(`[StateMachine]   ESTÁNDAR: Fallback para animationend de entrada en '${this.currentStateName}'.`),d.removeEventListener("animationend",v),d.classList.remove("gq-state-is-entering",...wt(d)),console.log(`[StateMachine] Transición ESTÁNDAR a '${this.currentStateName}' completada (fallback).`),p()},E+150);const v=C=>{C.target===d&&C.animationName===Xt(f)&&(A&&clearTimeout(A),A=void 0,d.removeEventListener("animationend",v),d.classList.remove("gq-state-is-entering",...wt(d)),console.log(`[StateMachine] Transición ESTÁNDAR a '${this.currentStateName}' completada (evento).`),p())};d.addEventListener("animationend",v)};let b,S;if(o){console.log(`[StateMachine]   ESTÁNDAR: Aplicando animación de salida '${r}' a '${l}'.`),d.classList.add("gq-state-is-exiting",r);const E=Kt(d,r);b=window.setTimeout(()=>{console.warn(`[StateMachine]   ESTÁNDAR: Fallback para animationend de salida en '${l}'.`),m()},E+150),S=A=>{A.target===d&&A.animationName===Xt(r)&&m()},d.addEventListener("animationend",S)}else console.log("[StateMachine]   ESTÁNDAR: No hay estado antiguo, procediendo directamente a la entrada."),m()})}}catch(d){console.error(`[StateMachine] ERROR CRÍTICO durante la transición de '${l||"ninguno"}' a '${e}':`,d),(n=this.wipeComponent)==null||n.reset()}finally{this.isTransitioning=!1,console.log(`[StateMachine] FIN TRANSICIÓN: a '${e}'. isTransitioning = false. Estado final: '${this.currentStateName}'.`)}}update(e){var i;if(!this.isTransitioning&&((i=this.currentState)!=null&&i.update))try{this.currentState.update(e)}catch(s){console.error(`[StateMachine] Error en update() de '${this.currentStateName}':`,s)}}getCurrentStateName(){return this.currentStateName}getCurrentState(){return this.currentState}}function Kt(u,e){const i=u.className;u.className=`${i} ${e}`.trim();const s=getComputedStyle(u).animationDuration||"0s";u.className=i;const a=parseFloat(s);return s.toLowerCase().includes("ms")?a:a*1e3}function Xt(u){if(u.startsWith("anim-"))return u;const e=u.split("-");return e.length>1&&e[0]==="gq"?`anim-${e.slice(1).join("-")}`:u}function wt(u){const e=["gq-fade","gq-slide","gq-wipe","anim-"];return Array.from(u.classList).filter(i=>e.some(s=>i.startsWith(s)))}class Gi{constructor(){this.audioCtx=null,this.isInitialized=!1,this.masterGainNode=null,this.isCurrentlyMuted=!1,this.volumeBeforeMute=1,console.log("AudioManager Creado (sin inicializar)")}init(){if(!this.isInitialized)try{this.audioCtx=new(window.AudioContext||window.webkitAudioContext),this.masterGainNode=this.audioCtx.createGain(),this.masterGainNode.connect(this.audioCtx.destination),this.setVolume(this.masterGainNode.gain.value),this.isCurrentlyMuted&&this.masterGainNode.gain.setValueAtTime(1e-5,this.audioCtx.currentTime),this.audioCtx.state==="suspended"?this.audioCtx.resume().then(()=>{console.log("AudioManager: AudioContext reanudado exitosamente."),this.isInitialized=!0}).catch(e=>console.error("AudioManager: Error al reanudar AudioContext:",e)):this.isInitialized=!0}catch(e){console.error("AudioManager: Error al crear AudioContext:",e),this.audioCtx=null,this.masterGainNode=null,this.isInitialized=!1}}playSound(e){}setVolume(e){if(!this.isInitialized||!this.audioCtx||!this.masterGainNode){this.volumeBeforeMute=Math.max(0,Math.min(1,e)),this.isCurrentlyMuted=this.volumeBeforeMute<=1e-5;return}const i=Math.max(0,Math.min(1,e));this.masterGainNode.gain.setValueAtTime(i,this.audioCtx.currentTime),i>1e-5&&this.isCurrentlyMuted?this.isCurrentlyMuted=!1:i<=1e-5&&(this.isCurrentlyMuted||(this.volumeBeforeMute=this.getVolume()),this.isCurrentlyMuted=!0)}getVolume(){return!this.isInitialized||!this.masterGainNode?this.volumeBeforeMute:this.masterGainNode.gain.value}toggleMute(e){if(!this.isInitialized||!this.audioCtx||!this.masterGainNode){typeof e=="boolean"?this.isCurrentlyMuted=e:this.isCurrentlyMuted=!this.isCurrentlyMuted,console.warn(`AudioManager: No inicializado. Estado de mute establecido a ${this.isCurrentlyMuted}. Se aplicará en init.`);return}const i=1e-5,s=this.masterGainNode.gain.value<=i;let a;if(typeof e=="boolean"?a=e:a=!s,a)s||(this.volumeBeforeMute=this.masterGainNode.gain.value),this.masterGainNode.gain.setValueAtTime(i,this.audioCtx.currentTime),this.isCurrentlyMuted=!0;else{const t=this.volumeBeforeMute<=i?.5:this.volumeBeforeMute;this.masterGainNode.gain.setValueAtTime(t,this.audioCtx.currentTime),this.isCurrentlyMuted=!1}console.log(`AudioManager: Mute toggled. Is Muted: ${this.isCurrentlyMuted}, Volume: ${this.masterGainNode.gain.value}, volumeBeforeMute: ${this.volumeBeforeMute}`)}isMuted(){return!this.isInitialized||!this.masterGainNode?this.isCurrentlyMuted:this.isCurrentlyMuted||this.masterGainNode.gain.value<=1e-5}isReady(){return this.isInitialized&&this.audioCtx!==null&&this.audioCtx.state==="running"}}class bi{constructor(e){this.type="PhysicsComponent",this.body=null,this.body=e??null}}class yi{constructor(e){this.type="RenderComponent",this.element=null,this.isVisible=!0,this.element=e??null}}class xi{constructor(e=0,i=0,s=0,a=0){this.type="ValueComponent",this.rarity=0,this.scoreValue=0,this.currentSize=0,this.growthLevel=0,this.rarity=e,this.scoreValue=i,this.currentSize=s,this.growthLevel=a}}class Qi{constructor(e,i,s,a){this.id=e,this.physics=i,this.render=s,this.value=a}getComponent(e){if(e===this.physics.type&&this.physics instanceof bi)return this.physics;if(e===this.render.type&&this.render instanceof yi)return this.render;if(e===this.value.type&&this.value instanceof xi)return this.value}}/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ct=globalThis,Tt=ct.ShadowRoot&&(ct.ShadyCSS===void 0||ct.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Lt=Symbol(),Zt=new WeakMap;let Ci=class{constructor(e,i,s){if(this._$cssResult$=!0,s!==Lt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=i}get styleSheet(){let e=this.o;const i=this.t;if(Tt&&e===void 0){const s=i!==void 0&&i.length===1;s&&(e=Zt.get(i)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&Zt.set(i,e))}return e}toString(){return this.cssText}};const Hi=u=>new Ci(typeof u=="string"?u:u+"",void 0,Lt),V=(u,...e)=>{const i=u.length===1?u[0]:e.reduce((s,a,t)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(a)+u[t+1],u[0]);return new Ci(i,u,Lt)},Wi=(u,e)=>{if(Tt)u.adoptedStyleSheets=e.map(i=>i instanceof CSSStyleSheet?i:i.styleSheet);else for(const i of e){const s=document.createElement("style"),a=ct.litNonce;a!==void 0&&s.setAttribute("nonce",a),s.textContent=i.cssText,u.appendChild(s)}},Jt=Tt?u=>u:u=>u instanceof CSSStyleSheet?(e=>{let i="";for(const s of e.cssRules)i+=s.cssText;return Hi(i)})(u):u;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:ji,defineProperty:Yi,getOwnPropertyDescriptor:Ki,getOwnPropertyNames:Xi,getOwnPropertySymbols:Zi,getPrototypeOf:Ji}=Object,ve=globalThis,ei=ve.trustedTypes,ea=ei?ei.emptyScript:"",St=ve.reactiveElementPolyfillSupport,Ue=(u,e)=>u,dt={toAttribute(u,e){switch(e){case Boolean:u=u?ea:null;break;case Object:case Array:u=u==null?u:JSON.stringify(u)}return u},fromAttribute(u,e){let i=u;switch(e){case Boolean:i=u!==null;break;case Number:i=u===null?null:Number(u);break;case Object:case Array:try{i=JSON.parse(u)}catch{i=null}}return i}},_t=(u,e)=>!ji(u,e),ti={attribute:!0,type:String,converter:dt,reflect:!1,useDefault:!1,hasChanged:_t};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),ve.litPropertyMetadata??(ve.litPropertyMetadata=new WeakMap);let _e=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,i=ti){if(i.state&&(i.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((i=Object.create(i)).wrapped=!0),this.elementProperties.set(e,i),!i.noAccessor){const s=Symbol(),a=this.getPropertyDescriptor(e,s,i);a!==void 0&&Yi(this.prototype,e,a)}}static getPropertyDescriptor(e,i,s){const{get:a,set:t}=Ki(this.prototype,e)??{get(){return this[i]},set(o){this[i]=o}};return{get:a,set(o){const l=a==null?void 0:a.call(this);t==null||t.call(this,o),this.requestUpdate(e,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ti}static _$Ei(){if(this.hasOwnProperty(Ue("elementProperties")))return;const e=Ji(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(Ue("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Ue("properties"))){const i=this.properties,s=[...Xi(i),...Zi(i)];for(const a of s)this.createProperty(a,i[a])}const e=this[Symbol.metadata];if(e!==null){const i=litPropertyMetadata.get(e);if(i!==void 0)for(const[s,a]of i)this.elementProperties.set(s,a)}this._$Eh=new Map;for(const[i,s]of this.elementProperties){const a=this._$Eu(i,s);a!==void 0&&this._$Eh.set(a,i)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const i=[];if(Array.isArray(e)){const s=new Set(e.flat(1/0).reverse());for(const a of s)i.unshift(Jt(a))}else e!==void 0&&i.push(Jt(e));return i}static _$Eu(e,i){const s=i.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(i=>this.enableUpdating=i),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(i=>i(this))}addController(e){var i;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((i=e.hostConnected)==null||i.call(e))}removeController(e){var i;(i=this._$EO)==null||i.delete(e)}_$E_(){const e=new Map,i=this.constructor.elementProperties;for(const s of i.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Wi(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(i=>{var s;return(s=i.hostConnected)==null?void 0:s.call(i)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(i=>{var s;return(s=i.hostDisconnected)==null?void 0:s.call(i)})}attributeChangedCallback(e,i,s){this._$AK(e,s)}_$ET(e,i){var t;const s=this.constructor.elementProperties.get(e),a=this.constructor._$Eu(e,s);if(a!==void 0&&s.reflect===!0){const o=(((t=s.converter)==null?void 0:t.toAttribute)!==void 0?s.converter:dt).toAttribute(i,s.type);this._$Em=e,o==null?this.removeAttribute(a):this.setAttribute(a,o),this._$Em=null}}_$AK(e,i){var t,o;const s=this.constructor,a=s._$Eh.get(e);if(a!==void 0&&this._$Em!==a){const l=s.getPropertyOptions(a),r=typeof l.converter=="function"?{fromAttribute:l.converter}:((t=l.converter)==null?void 0:t.fromAttribute)!==void 0?l.converter:dt;this._$Em=a,this[a]=r.fromAttribute(i,l.type)??((o=this._$Ej)==null?void 0:o.get(a))??null,this._$Em=null}}requestUpdate(e,i,s){var a;if(e!==void 0){const t=this.constructor,o=this[e];if(s??(s=t.getPropertyOptions(e)),!((s.hasChanged??_t)(o,i)||s.useDefault&&s.reflect&&o===((a=this._$Ej)==null?void 0:a.get(e))&&!this.hasAttribute(t._$Eu(e,s))))return;this.C(e,i,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,i,{useDefault:s,reflect:a,wrapped:t},o){s&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,o??i??this[e]),t!==!0||o!==void 0)||(this._$AL.has(e)||(this.hasUpdated||s||(i=void 0),this._$AL.set(e,i)),a===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(i){Promise.reject(i)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var s;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[t,o]of this._$Ep)this[t]=o;this._$Ep=void 0}const a=this.constructor.elementProperties;if(a.size>0)for(const[t,o]of a){const{wrapped:l}=o,r=this[t];l!==!0||this._$AL.has(t)||r===void 0||this.C(t,void 0,o,r)}}let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),(s=this._$EO)==null||s.forEach(a=>{var t;return(t=a.hostUpdate)==null?void 0:t.call(a)}),this.update(i)):this._$EM()}catch(a){throw e=!1,this._$EM(),a}e&&this._$AE(i)}willUpdate(e){}_$AE(e){var i;(i=this._$EO)==null||i.forEach(s=>{var a;return(a=s.hostUpdated)==null?void 0:a.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(i=>this._$ET(i,this[i]))),this._$EM()}updated(e){}firstUpdated(e){}};_e.elementStyles=[],_e.shadowRootOptions={mode:"open"},_e[Ue("elementProperties")]=new Map,_e[Ue("finalized")]=new Map,St==null||St({ReactiveElement:_e}),(ve.reactiveElementVersions??(ve.reactiveElementVersions=[])).push("2.1.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ne=globalThis,pt=Ne.trustedTypes,ii=pt?pt.createPolicy("lit-html",{createHTML:u=>u}):void 0,wi="$lit$",me=`lit$${Math.random().toFixed(9).slice(2)}$`,Si="?"+me,ta=`<${Si}>`,Me=document,Ve=()=>Me.createComment(""),Ge=u=>u===null||typeof u!="object"&&typeof u!="function",Dt=Array.isArray,ia=u=>Dt(u)||typeof(u==null?void 0:u[Symbol.iterator])=="function",Mt=`[ 	
\f\r]`,Fe=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ai=/-->/g,oi=/>/g,xe=RegExp(`>|${Mt}(?:([^\\s"'>=/]+)(${Mt}*=${Mt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ni=/'/g,si=/"/g,Mi=/^(?:script|style|textarea|title)$/i,Ei=u=>(e,...i)=>({_$litType$:u,strings:e,values:i}),B=Ei(1),aa=Ei(2),Ee=Symbol.for("lit-noChange"),N=Symbol.for("lit-nothing"),ri=new WeakMap,we=Me.createTreeWalker(Me,129);function Ii(u,e){if(!Dt(u)||!u.hasOwnProperty("raw"))throw Error("invalid template strings array");return ii!==void 0?ii.createHTML(e):e}const oa=(u,e)=>{const i=u.length-1,s=[];let a,t=e===2?"<svg>":e===3?"<math>":"",o=Fe;for(let l=0;l<i;l++){const r=u[l];let f,c,g=-1,h=0;for(;h<r.length&&(o.lastIndex=h,c=o.exec(r),c!==null);)h=o.lastIndex,o===Fe?c[1]==="!--"?o=ai:c[1]!==void 0?o=oi:c[2]!==void 0?(Mi.test(c[2])&&(a=RegExp("</"+c[2],"g")),o=xe):c[3]!==void 0&&(o=xe):o===xe?c[0]===">"?(o=a??Fe,g=-1):c[1]===void 0?g=-2:(g=o.lastIndex-c[2].length,f=c[1],o=c[3]===void 0?xe:c[3]==='"'?si:ni):o===si||o===ni?o=xe:o===ai||o===oi?o=Fe:(o=xe,a=void 0);const n=o===xe&&u[l+1].startsWith("/>")?" ":"";t+=o===Fe?r+ta:g>=0?(s.push(f),r.slice(0,g)+wi+r.slice(g)+me+n):r+me+(g===-2?l:n)}return[Ii(u,t+(u[i]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),s]};class Qe{constructor({strings:e,_$litType$:i},s){let a;this.parts=[];let t=0,o=0;const l=e.length-1,r=this.parts,[f,c]=oa(e,i);if(this.el=Qe.createElement(f,s),we.currentNode=this.el.content,i===2||i===3){const g=this.el.content.firstChild;g.replaceWith(...g.childNodes)}for(;(a=we.nextNode())!==null&&r.length<l;){if(a.nodeType===1){if(a.hasAttributes())for(const g of a.getAttributeNames())if(g.endsWith(wi)){const h=c[o++],n=a.getAttribute(g).split(me),d=/([.?@])?(.*)/.exec(h);r.push({type:1,index:t,name:d[2],strings:n,ctor:d[1]==="."?sa:d[1]==="?"?ra:d[1]==="@"?la:mt}),a.removeAttribute(g)}else g.startsWith(me)&&(r.push({type:6,index:t}),a.removeAttribute(g));if(Mi.test(a.tagName)){const g=a.textContent.split(me),h=g.length-1;if(h>0){a.textContent=pt?pt.emptyScript:"";for(let n=0;n<h;n++)a.append(g[n],Ve()),we.nextNode(),r.push({type:2,index:++t});a.append(g[h],Ve())}}}else if(a.nodeType===8)if(a.data===Si)r.push({type:2,index:t});else{let g=-1;for(;(g=a.data.indexOf(me,g+1))!==-1;)r.push({type:7,index:t}),g+=me.length-1}t++}}static createElement(e,i){const s=Me.createElement("template");return s.innerHTML=e,s}}function De(u,e,i=u,s){var o,l;if(e===Ee)return e;let a=s!==void 0?(o=i._$Co)==null?void 0:o[s]:i._$Cl;const t=Ge(e)?void 0:e._$litDirective$;return(a==null?void 0:a.constructor)!==t&&((l=a==null?void 0:a._$AO)==null||l.call(a,!1),t===void 0?a=void 0:(a=new t(u),a._$AT(u,i,s)),s!==void 0?(i._$Co??(i._$Co=[]))[s]=a:i._$Cl=a),a!==void 0&&(e=De(u,a._$AS(u,e.values),a,s)),e}class na{constructor(e,i){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=i}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:i},parts:s}=this._$AD,a=((e==null?void 0:e.creationScope)??Me).importNode(i,!0);we.currentNode=a;let t=we.nextNode(),o=0,l=0,r=s[0];for(;r!==void 0;){if(o===r.index){let f;r.type===2?f=new Ke(t,t.nextSibling,this,e):r.type===1?f=new r.ctor(t,r.name,r.strings,this,e):r.type===6&&(f=new ca(t,this,e)),this._$AV.push(f),r=s[++l]}o!==(r==null?void 0:r.index)&&(t=we.nextNode(),o++)}return we.currentNode=Me,a}p(e){let i=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,i),i+=s.strings.length-2):s._$AI(e[i])),i++}}class Ke{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,i,s,a){this.type=2,this._$AH=N,this._$AN=void 0,this._$AA=e,this._$AB=i,this._$AM=s,this.options=a,this._$Cv=(a==null?void 0:a.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const i=this._$AM;return i!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=i.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,i=this){e=De(this,e,i),Ge(e)?e===N||e==null||e===""?(this._$AH!==N&&this._$AR(),this._$AH=N):e!==this._$AH&&e!==Ee&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):ia(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==N&&Ge(this._$AH)?this._$AA.nextSibling.data=e:this.T(Me.createTextNode(e)),this._$AH=e}$(e){var t;const{values:i,_$litType$:s}=e,a=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=Qe.createElement(Ii(s.h,s.h[0]),this.options)),s);if(((t=this._$AH)==null?void 0:t._$AD)===a)this._$AH.p(i);else{const o=new na(a,this),l=o.u(this.options);o.p(i),this.T(l),this._$AH=o}}_$AC(e){let i=ri.get(e.strings);return i===void 0&&ri.set(e.strings,i=new Qe(e)),i}k(e){Dt(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,a=0;for(const t of e)a===i.length?i.push(s=new Ke(this.O(Ve()),this.O(Ve()),this,this.options)):s=i[a],s._$AI(t),a++;a<i.length&&(this._$AR(s&&s._$AB.nextSibling,a),i.length=a)}_$AR(e=this._$AA.nextSibling,i){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,i);e&&e!==this._$AB;){const a=e.nextSibling;e.remove(),e=a}}setConnected(e){var i;this._$AM===void 0&&(this._$Cv=e,(i=this._$AP)==null||i.call(this,e))}}class mt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,i,s,a,t){this.type=1,this._$AH=N,this._$AN=void 0,this.element=e,this.name=i,this._$AM=a,this.options=t,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=N}_$AI(e,i=this,s,a){const t=this.strings;let o=!1;if(t===void 0)e=De(this,e,i,0),o=!Ge(e)||e!==this._$AH&&e!==Ee,o&&(this._$AH=e);else{const l=e;let r,f;for(e=t[0],r=0;r<t.length-1;r++)f=De(this,l[s+r],i,r),f===Ee&&(f=this._$AH[r]),o||(o=!Ge(f)||f!==this._$AH[r]),f===N?e=N:e!==N&&(e+=(f??"")+t[r+1]),this._$AH[r]=f}o&&!a&&this.j(e)}j(e){e===N?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class sa extends mt{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===N?void 0:e}}class ra extends mt{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==N)}}class la extends mt{constructor(e,i,s,a,t){super(e,i,s,a,t),this.type=5}_$AI(e,i=this){if((e=De(this,e,i,0)??N)===Ee)return;const s=this._$AH,a=e===N&&s!==N||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,t=e!==N&&(s===N||a);a&&this.element.removeEventListener(this.name,this,s),t&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var i;typeof this._$AH=="function"?this._$AH.call(((i=this.options)==null?void 0:i.host)??this.element,e):this._$AH.handleEvent(e)}}class ca{constructor(e,i,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){De(this,e)}}const Et=Ne.litHtmlPolyfillSupport;Et==null||Et(Qe,Ke),(Ne.litHtmlVersions??(Ne.litHtmlVersions=[])).push("3.3.0");const da=(u,e,i)=>{const s=(i==null?void 0:i.renderBefore)??e;let a=s._$litPart$;if(a===void 0){const t=(i==null?void 0:i.renderBefore)??null;s._$litPart$=a=new Ke(e.insertBefore(Ve(),t),t,void 0,i??{})}return a._$AI(u),a};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Se=globalThis;let O=class extends _e{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var i;const e=super.createRenderRoot();return(i=this.renderOptions).renderBefore??(i.renderBefore=e.firstChild),e}update(e){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=da(i,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return Ee}};var vi;O._$litElement$=!0,O.finalized=!0,(vi=Se.litElementHydrateSupport)==null||vi.call(Se,{LitElement:O});const It=Se.litElementPolyfillSupport;It==null||It({LitElement:O});(Se.litElementVersions??(Se.litElementVersions=[])).push("4.2.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const G=u=>(e,i)=>{i!==void 0?i.addInitializer(()=>{customElements.define(u,e)}):customElements.define(u,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const pa={attribute:!0,type:String,converter:dt,reflect:!1,hasChanged:_t},ha=(u=pa,e,i)=>{const{kind:s,metadata:a}=i;let t=globalThis.litPropertyMetadata.get(a);if(t===void 0&&globalThis.litPropertyMetadata.set(a,t=new Map),s==="setter"&&((u=Object.create(u)).wrapped=!0),t.set(i.name,u),s==="accessor"){const{name:o}=i;return{set(l){const r=e.get.call(this);e.set.call(this,l),this.requestUpdate(o,r,u)},init(l){return l!==void 0&&this.C(o,void 0,u,l),l}}}if(s==="setter"){const{name:o}=i;return function(l){const r=this[o];e.call(this,l),this.requestUpdate(o,r,u)}}throw Error("Unsupported decorator location: "+s)};function D(u){return(e,i)=>typeof i=="object"?ha(u,e,i):((s,a,t)=>{const o=a.hasOwnProperty(t);return a.constructor.createProperty(t,s),o?Object.getOwnPropertyDescriptor(a,t):void 0})(u,e,i)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function F(u){return D({...u,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ua=(u,e,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(u,e,i),i);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ie(u,e){return(i,s,a)=>{const t=o=>{var l;return((l=o.renderRoot)==null?void 0:l.querySelector(u))??null};return ua(i,s,{get(){return t(this)}})}}var ga=Object.defineProperty,fa=Object.getOwnPropertyDescriptor,Xe=(u,e,i,s)=>{for(var a=s>1?void 0:s?fa(e,i):e,t=u.length-1,o;t>=0;t--)(o=u[t])&&(a=(s?o(e,i,a):o(a))||a);return s&&a&&ga(e,i,a),a};let Ie=class extends O{constructor(){super(...arguments),this.size=50,this.imageUrl="",this.backgroundColorFallback="var(--gq-cat-fallback-bg, #ccc)",this.glowClass=""}updated(u){if(super.updated(u),u.has("glowClass")){const e=u.get("glowClass");e&&e!==this.glowClass&&this.classList.remove(e),this.glowClass&&this.classList.add(this.glowClass)}}render(){return this.style.width=`${this.size}px`,this.style.height=`${this.size}px`,this.style.backgroundImage=this.imageUrl?`url('${this.imageUrl}')`:"none",this.style.backgroundColor=this.imageUrl?"transparent":this.backgroundColorFallback,B``}};Ie.styles=V`
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
  `;Xe([D({type:Number})],Ie.prototype,"size",2);Xe([D({type:String,attribute:"image-url"})],Ie.prototype,"imageUrl",2);Xe([D({type:String,attribute:"background-color-fallback"})],Ie.prototype,"backgroundColorFallback",2);Xe([D({type:String,attribute:"glow-class"})],Ie.prototype,"glowClass",2);Ie=Xe([G("cat-entity-display")],Ie);const ma=1,li=2,va=4,ba=8,ya=1.15,ci=300,xa=1.02,di={0:null,1:"glow-gray",2:"glow-green",3:"glow-blue",4:"glow-violet",5:"glow-orange"},Ca=10;class wa{constructor(e,i){this.cats=new Map,this.bodyIdToEntityIdMap=new Map,this.nextCatIdCounter=0,this.templates=new Map,this.audioManager=e,this.gameManager=i,console.log("CatManager Creado (esperando CatDisplayArea y PhysicsManager).")}setPhysicsManager(e){this.physicsManager=e,console.log("CatManager: PhysicsManager seteado.")}setCatDisplayArea(e){e instanceof O&&typeof e.clearAllEntityElements=="function"?(this.catDisplayArea=e,console.log("CatManager: CatDisplayArea seteado correctamente y es una instancia válida de CatDisplayArea (LitElement con clearAllEntityElements).",this.catDisplayArea)):(console.error("CatManager CRITICAL: Se intentó setear un CatDisplayArea inválido o nulo.",e),!this.catDisplayArea&&e===null||(e?console.error("CatManager: displayArea NO es una instancia válida de CatDisplayArea o no tiene clearAllEntityElements. Tipo recibido:",typeof e,"Tiene clearAllEntityElements:",typeof e.clearAllEntityElements):console.error("CatManager: displayArea es null/undefined.")))}loadTemplates(e){if(this.templates.clear(),!Array.isArray(e)){console.error("CatManager: Formato inválido de plantillas.");return}e.forEach(i=>{i!=null&&i.id?((typeof i.spawnWeight!="number"||i.spawnWeight<=0)&&(i.spawnWeight=1),this.templates.set(i.id,i)):console.warn("CatManager: Plantilla inválida o sin ID.",i)}),console.log(`CatManager: ${this.templates.size} plantillas cargadas.`)}getSpawnableTemplatesWeighted(){const e=[];return this.templates.forEach(i=>{const s=i.spawnWeight&&i.spawnWeight>0?i.spawnWeight:1;e.push({id:i.id,weight:s})}),e}addCat(e,i){if(!this.gameManager)return console.error("CatManager: GameManager no disponible."),null;if(!this.catDisplayArea)return console.error("CatManager: CatDisplayArea no está seteado o es inválido. No se puede añadir gato."),null;if(typeof this.catDisplayArea.addEntityElement!="function")return console.error("CatManager: this.catDisplayArea no tiene el método addEntityElement. Tipo actual:",typeof this.catDisplayArea,this.catDisplayArea),null;const s=this.cats.size,a=this.gameManager.getPlayerData().getMaxCatsAllowed();if(s>=a)return null;if(!this.physicsManager)return console.error("CatManager: PhysicsManager no está seteado."),null;const t=this.templates.get(e);if(!t)return console.error(`CatManager: Plantilla '${e}' no encontrada.`),null;const o=`cat_entity_${this.nextCatIdCounter++}`,l=t.initialSize,r=t.rarity,f=t.scoreValue??0,c=l/2+5,g=(i==null?void 0:i.x)??Math.random()*(window.innerWidth-l-c*2)+c,h=(i==null?void 0:i.y)??Math.max(c,Math.min(window.innerHeight-c,Ca+l/2)),d={...{restitution:.6,friction:.1,frictionAir:.01,density:.005,slop:.01},...t.physicsOptions??{},label:"cat",collisionFilter:{category:li,mask:ma|li|va|ba},plugin:{entityId:o,rarity:r,currentSize:l}},p=L.Bodies.circle(g,h,l/2,d);L.Body.setAngularVelocity(p,(Math.random()-.5)*.2);const m=new bi(p);this.bodyIdToEntityIdMap.set(p.id,o);const b=document.createElement("cat-entity-display");b.id=o,b.size=l,b.classList.add("appearing");const S=t.renderOptions??{},E=S.backgroundColor??"var(--gq-cat-fallback-bg, #ccc)";let A=S.imageUrl;if(!A){const M=Number.isFinite(l)&&l>0?Math.round(l):50;A=`https://cataas.com/cat/says/Miaw!_${o.slice(-2)}?${Date.now()}&width=${M}&height=${M}&type=square`}b.imageUrl=A,b.backgroundColorFallback=E,b.glowClass=S.glowClass??di[r]??"";const v=new Image;v.onload=()=>{},v.onerror=()=>{console.warn(`CatManager: Falló la carga de la imagen del gato: ${A}. Usando color de fallback.`),b&&(b.imageUrl="")},A&&(v.src=A);try{this.catDisplayArea.addEntityElement(b),b.offsetWidth,requestAnimationFrame(()=>{b.classList.remove("appearing"),b.classList.add("spawned")})}catch(M){return console.error("CatManager: Error añadiendo catDisplayElement a catDisplayArea:",M),this.bodyIdToEntityIdMap.delete(p.id),null}const x=new yi(b),C=new xi(r,f,l,0),y=new Qi(o,m,x,C);try{if(!this.physicsManager.getWorld())throw new Error("PhysicsManager world no disponible al añadir gato.");L.World.add(this.physicsManager.getWorld(),p)}catch(M){return console.error(`CatManager: Error añadiendo cuerpo físico ${o} al mundo:`,M),this.catDisplayArea&&typeof this.catDisplayArea.removeEntityElement=="function"&&this.catDisplayArea.removeEntityElement(b),this.bodyIdToEntityIdMap.delete(p.id),null}return this.cats.set(o,y),y}removeCat(e){var a;const i=String(e),s=this.cats.get(i);if(s){const t=s.physics.body;if(t){this.bodyIdToEntityIdMap.delete(t.id);try{(a=this.physicsManager)!=null&&a.getWorld&&L.Composite.get(this.physicsManager.getWorld(),t.id,"body")&&L.World.remove(this.physicsManager.getWorld(),t)}catch(o){console.warn(`Error eliminando cuerpo físico gato ${i}:`,o)}}s.render.element&&(this.catDisplayArea&&typeof this.catDisplayArea.removeEntityElement=="function"?this.catDisplayArea.removeEntityElement(s.render.element):(console.warn("CatManager: catDisplayArea no disponible o sin removeEntityElement al intentar remover gato del DOM."),s.render.element.parentNode&&s.render.element.parentNode.removeChild(s.render.element))),this.cats.delete(i)}}processPlayerInitiatedCollision(e,i,s){const a=this.bodyIdToEntityIdMap.get(e),t=this.bodyIdToEntityIdMap.get(i);if(a&&t){const o=this.cats.get(a),l=this.cats.get(t);if(o&&l){const r=e===s?o:l,f=e===s?l:o;r&&f?this.handleCatVsCatCollision(r,f):console.error("Error: No se pudo determinar dragger/target cat en colisión.")}}}handleCatVsCatCollision(e,i){if(!e.physics.body||!e.value||!i.physics.body||!i.value||!this.gameManager){console.warn("handleCatVsCatCollision: Faltan componentes necesarios en dragger o target.");return}if(e.id===i.id)return;const s=e.value.currentSize,a=e.value.rarity,t=i.value.currentSize,o=i.value.rarity,l=this.gameManager.getPlayerData().getCurrentMaxSizeLimit(),r=s>=l;let f=!1,c=!1,g=!1;s>t*xa&&(r?a<o&&(f=!0,g=!1,c=!0):(f=!0,g=!0,c=a<o)),f&&this.performEat(e,i,c,g)}performEat(e,i,s,a){if(!e.physics.body||!e.value||!(e.render.element instanceof O)||!i.value||!this.gameManager){console.warn("performEat: Faltan componentes o el elemento de render no es CatEntityDisplay.");return}const t=e.render.element,o=i.id,l=i.value.rarity;if(this.removeCat(o),a){const r=e.value.currentSize,f=this.gameManager.getPlayerData().getCurrentMaxSizeLimit();let c=Math.min(f,ci,r*ya);const g=c/r;if(g>1.001){e.value.currentSize=c;try{if(this.physicsManager.getWorld&&L.Composite.get(this.physicsManager.getWorld(),e.physics.body.id,"body"))L.Body.scale(e.physics.body,g,g),e.physics.body.plugin&&(e.physics.body.plugin.currentSize=c);else throw new Error("Body not found in world during scaling")}catch(h){console.error(`Error scaling body ${e.id}:`,h),e.value.currentSize=r,e.physics.body.plugin&&(e.physics.body.plugin.currentSize=r)}t.size=c}}s&&l>e.value.rarity&&(e.value.rarity=l,e.physics.body.plugin&&(e.physics.body.plugin.rarity=l),t.glowClass=di[l]??"");try{this.audioManager.playSound("eat")}catch(r){console.error("Error playing 'eat' sound:",r)}}updateCats(e){this.cats.forEach(i=>{const s=i.physics.body,a=i.render.element,t=i.value;if(!s||!a||!(a instanceof O)||!t)return;const o=a,l=t.currentSize;if(i.render.isVisible){o.style.display==="none"&&(o.style.display="");const r=l/2;o.style.transform=`translate(${s.position.x-r}px, ${s.position.y-r}px) rotate(${s.angle}rad)`,o.size!==l&&(o.size=l)}else o.style.display!=="none"&&(o.style.display="none")})}getCat(e){return this.cats.get(e)}getAllCats(){return Array.from(this.cats.values())}removeAllCats(){var i;console.log(`CatManager: Intentando remover todos los ${this.cats.size} gatos...`),this.catDisplayArea&&typeof this.catDisplayArea.clearAllEntityElements=="function"?this.catDisplayArea.clearAllEntityElements():console.error("CatManager: catDisplayArea no está disponible o no es una instancia válida de CatDisplayArea con clearAllEntityElements al intentar removeAllCats. Tipo actual:",typeof this.catDisplayArea,this.catDisplayArea);const e=(i=this.physicsManager)==null?void 0:i.getWorld();if(e){const s=Array.from(this.cats.values()).map(a=>a.physics.body).filter(a=>a&&L.Composite.get(e,a.id,"body"));if(s.length>0)try{L.World.remove(e,s)}catch(a){console.warn("CatManager: Error removiendo algunos cuerpos de gatos del mundo físico:",a)}}else console.warn("CatManager: PhysicsManager world no disponible durante removeAllCats.");this.cats.clear(),this.bodyIdToEntityIdMap.clear(),this.nextCatIdCounter=0,console.log("CatManager: Lógica interna de gatos y mapeos limpiados.")}growExistingCats(e,i){let s=0;this.cats.forEach(a=>{if(!a.value||!a.physics.body||!(a.render.element instanceof O)||!this.physicsManager||!this.gameManager||a.value.rarity!==0)return;const t=a.render.element;if(a.value.growthLevel<i){const o=a.value.currentSize,l=this.gameManager.getPlayerData().getCurrentMaxSizeLimit();let r=Math.min(l,ci,o+e);const f=r/o;if(f>1.0001){a.value.growthLevel++,a.value.currentSize=r;try{const c=a.physics.body;if(this.physicsManager.getWorld&&L.Composite.get(this.physicsManager.getWorld(),c.id,"body"))L.Body.scale(c,f,f),c.plugin&&(c.plugin.currentSize=r),s++;else throw new Error("Body not found in world for growth scaling")}catch(c){console.error(` -> Error escalando gato común ${a.id} (crecimiento por acierto):`,c),a.value.growthLevel--,a.value.currentSize=o,a.physics.body.plugin&&(a.physics.body.plugin.currentSize=o)}t.size=r}}})}}var Sa=Object.defineProperty,Ma=Object.getOwnPropertyDescriptor,Te=(u,e,i,s)=>{for(var a=s>1?void 0:s?Ma(e,i):e,t=u.length-1,o;t>=0;t--)(o=u[t])&&(a=(s?o(e,i,a):o(a))||a);return s&&a&&Sa(e,i,a),a};let ue=class extends O{constructor(){super(),this.itemId="",this.icon="❓",this.isDisabled=!1,this.isPurchased=!1,this.isMaxLevel=!1,this.isSelected=!1,this.addEventListener("click",this._handleClick),this.addEventListener("touchstart",this._handleClick,{passive:!1})}render(){return B`
      <span class="shop-item-icon" part="icon">${this.icon}</span>
    `}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("click",this._handleClick),this.removeEventListener("touchstart",this._handleClick)}_handleClick(u){u.stopPropagation(),u.type==="touchstart"&&u.preventDefault(),this.isDisabled||this.isPurchased||this.isMaxLevel||this.dispatchEvent(new CustomEvent("item-selected",{detail:{itemId:this.itemId},bubbles:!0,composed:!0}))}};ue.styles=V`
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
  `;Te([D({type:String})],ue.prototype,"itemId",2);Te([D({type:String})],ue.prototype,"icon",2);Te([D({type:Boolean,reflect:!0})],ue.prototype,"isDisabled",2);Te([D({type:Boolean,reflect:!0})],ue.prototype,"isPurchased",2);Te([D({type:Boolean,reflect:!0})],ue.prototype,"isMaxLevel",2);Te([D({type:Boolean,reflect:!0})],ue.prototype,"isSelected",2);ue=Te([G("shop-item-card")],ue);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ea={ATTRIBUTE:1},Ia=u=>(...e)=>({_$litDirective$:u,values:e});class qa{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,i,s){this._$Ct=e,this._$AM=i,this._$Ci=s}_$AS(e,i){return this.update(e,i)}update(e,i){return this.render(...i)}}/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const zt=Ia(class extends qa{constructor(u){var e;if(super(u),u.type!==Ea.ATTRIBUTE||u.name!=="class"||((e=u.strings)==null?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(u){return" "+Object.keys(u).filter(e=>u[e]).join(" ")+" "}update(u,[e]){var s,a;if(this.st===void 0){this.st=new Set,u.strings!==void 0&&(this.nt=new Set(u.strings.join(" ").split(/\s/).filter(t=>t!=="")));for(const t in e)e[t]&&!((s=this.nt)!=null&&s.has(t))&&this.st.add(t);return this.render(e)}const i=u.element.classList;for(const t of this.st)t in e||(i.remove(t),this.st.delete(t));for(const t in e){const o=!!e[t];o===this.st.has(t)||(a=this.nt)!=null&&a.has(t)||(o?(i.add(t),this.st.add(t)):(i.remove(t),this.st.delete(t)))}return Ee}});var Aa=Object.defineProperty,ka=Object.getOwnPropertyDescriptor,ae=(u,e,i,s)=>{for(var a=s>1?void 0:s?ka(e,i):e,t=u.length-1,o;t>=0;t--)(o=u[t])&&(a=(s?o(e,i,a):o(a))||a);return s&&a&&Aa(e,i,a),a};const pi="Selecciona un ítem para ver sus detalles.";let Z=class extends O{constructor(){super(...arguments),this.itemData=null,this.playerDataSnapshot=null,this._itemName="...",this._itemLevelText="",this._itemEffectText=pi,this._itemCostText="",this._itemStatusText="",this._isBuyButtonDisabled=!0,this._buyButtonIcon="💰",this._isEmpty=!0,this._buyButtonState="empty"}connectedCallback(){super.connectedCallback(),this._updateInternalState(),this.toggleAttribute("empty",this._isEmpty)}updated(u){var i;super.updated(u);let e=!1;if(console.log("%c[ShopTooltip DEBUG] updated()","color: orange; font-weight: bold;","Cambios:",Array.from(u.keys())),u.has("playerDataSnapshot")){const s=u.get("playerDataSnapshot"),a=this.playerDataSnapshot,t=(s==null?void 0:s.comboMultiplierLevel)??"N/A",o=(a==null?void 0:a.comboMultiplierLevel)??"N/A";console.log(`%c[ShopTooltip DEBUG]   > playerDataSnapshot cambió. Nivel Combo Anterior: ${t}, Nuevo: ${o}. Llamando a _updateInternalState...`,"color: orange;"),e=!0}u.has("itemData")&&(console.log(`%c[ShopTooltip DEBUG]   > itemData cambió a ID: ${((i=this.itemData)==null?void 0:i.id)??"null"}. Llamando a _updateInternalState...`,"color: orange;"),e=!0),e&&(this._updateInternalState(),this.toggleAttribute("empty",this._isEmpty))}forceRefresh(){console.log("%c[ShopTooltip DEBUG] forceRefresh() llamado.","color: orange; font-weight: bold;"),this._updateInternalState(),this.toggleAttribute("empty",this._isEmpty),this.requestUpdate()}_updateInternalState(){var e,i,s;const u=(e=this.itemData)!=null&&e.levelRef&&this.playerDataSnapshot?this.playerDataSnapshot[this.itemData.levelRef]:"N/A";if(console.log(`%c[ShopTooltip DEBUG internalState] INICIO _updateInternalState. Item ID: ${((i=this.itemData)==null?void 0:i.id)??"null"}, Snapshot Nivel (${((s=this.itemData)==null?void 0:s.levelRef)??"?"}): ${u}`,"color: purple;"),this._isEmpty=!this.itemData,this._isEmpty||!this.playerDataSnapshot)this._itemName="Tienda",this._itemLevelText="",this._itemEffectText=pi,this._itemCostText="",this._itemStatusText="",this._isBuyButtonDisabled=!0,this._buyButtonState="empty",this._buyButtonIcon="🐈",console.log("%c[ShopTooltip DEBUG internalState] FIN Estado Vacío aplicado.","color: purple;");else{const a=this.itemData,t=this.playerDataSnapshot,o=this._calculateItemCost(a,t),l=t.score>=o,r=this._checkItemIsPurchased(a,t),f=this._checkItemCanPurchase(a,t),c=this._getItemLevel(a,t),g=a.isLeveled&&typeof a.maxLevel=="number"&&c>=a.maxLevel,h=!g&&!(r&&!a.isLeveled)&&f&&l;this._isBuyButtonDisabled=!h,g||r&&!a.isLeveled||!f?this._buyButtonState="disabled":l?this._buyButtonState="affordable":this._buyButtonState="unaffordable",this._itemName=a.name,this._itemEffectText=this._formatEffectText(a,t),this._itemLevelText=a.isLeveled&&c>=0?`Nivel: ${c}`:"",this._itemCostText=g?"Nivel Máximo":`Costo: ${o}`;let n="";g?n="Nivel Máximo Alcanzado":r&&!a.isLeveled?n="Ya comprado / Activo":!f&&!g&&(n="No disponible"),this._itemStatusText=n,this._buyButtonIcon=g||r&&!a.isLeveled?"✔️":"💰",console.log(`%c[ShopTooltip DEBUG internalState] FIN Calculado: Nivel Txt='${this._itemLevelText}', Costo Txt='${this._itemCostText}', Btn Func Disabled=${this._isBuyButtonDisabled}, Btn Visual State='${this._buyButtonState}'`,"color: purple;")}}_calculateItemCost(u,e){const i=u.cost;let s=i.base;if(u.isLeveled){const a=u.levelRef,t=a?e[a]??0:0;i.type==="exponential"&&typeof i.multiplier=="number"?s=i.base*Math.pow(i.multiplier,t):s=i.base+(i.perLevel??0)*t}else if(i.levelRef&&typeof i.perLevel=="number"){const a=e[i.levelRef]??0;s=i.base+i.perLevel*a}return Math.round(s)}_formatEffectText(u,e){var s,a,t;let i=u.effectTemplate;if(i=i.replace("{lives}",e.lives.toString()),i.includes("{isActive}")){const o=(s=u.isPurchasedCheck)==null?void 0:s.valueRef,l=o?!!e[o]:!1;i=i.replace("{isActive}",l?"(Activo)":"")}if(i.includes("{isUnlocked}")){const o=(a=u.isPurchasedCheck)==null?void 0:a.valueRef,l=o?!!e[o]:!1;i=i.replace("{isUnlocked}",l?"(Desbloqueado)":"")}if(i.includes("{charges}")){const o=(t=u.isPurchasedCheck)==null?void 0:t.valueRef,l=o?e[o]??0:0;i=i.replace("{charges}",l>0?`(Cargas: ${l})`:"")}if(i.includes("{currentValue}")){let o="?";u.id==="comboMultiplier"?o=e.getCurrentComboMultiplier().toFixed(1):u.id==="inkCostReduction"?o=e.getCurrentInkCostPerPixel().toFixed(2):u.id==="extraCat"?o=e.getCatsPerCorrectAnswer():u.id==="maxCats"?o=e.getMaxCatsAllowed():u.id==="maxCatSize"?o=e.getCurrentMaxSizeLimit():u.id==="refillCatFood"&&(o=e.currentCatFood),i=i.replace("{currentValue}",o.toString())}return i}_checkItemIsPurchased(u,e){if(!u.isPurchasedCheck)return!1;const i=u.isPurchasedCheck,s=i.valueRef,a=e[s];if(typeof a>"u")return!1;switch(i.condition){case"isTrue":return a===!0;case"isFalse":return a===!1;case"greaterThan":return typeof a=="number"&&typeof i.limit=="number"&&a>i.limit;default:return!1}}_checkItemCanPurchase(u,e){if(!u.purchaseCheck)return!0;const i=u.purchaseCheck,s=i.valueRef,a=e[s];if(typeof a>"u")return!1;switch(i.condition){case"lessThan":return typeof a=="number"&&typeof i.limit=="number"&&a<i.limit;case"lessThanOrEqual":return typeof a=="number"&&typeof i.limit=="number"&&a<=i.limit;case"isFalse":return a===!1;case"isTrue":return a===!0;case"greaterThan":return typeof a=="number"&&typeof i.limit=="number"&&a>i.limit;case"greaterThanOrEqual":return typeof a=="number"&&typeof i.limit=="number"&&a>=i.limit;default:return!1}}_getItemLevel(u,e){return!u.isLeveled||!u.levelRef?-1:e[u.levelRef]??0}_handleBuyClick(u){u.stopPropagation(),u.type==="touchstart"&&u.preventDefault(),!(this._isBuyButtonDisabled||this._isEmpty||!this.itemData)&&this.dispatchEvent(new CustomEvent("buy-item-requested",{detail:{itemId:this.itemData.id},bubbles:!0,composed:!0}))}render(){const u=B`<span class="tooltip-item-level" part="level">${this._itemLevelText}</span>`,e=B`<span class="tooltip-item-cost" part="cost">${this._itemCostText}</span>`,i=B`<span class="tooltip-item-status" part="status">${this._itemStatusText}</span>`,s={"tooltip-buy-btn":!0,affordable:this._buyButtonState==="affordable",unaffordable:this._buyButtonState==="unaffordable","disabled-state":this._buyButtonState==="disabled","empty-state":this._buyButtonState==="empty"};return B`
      <div part="content-area">
        <span class="tooltip-item-name" part="name">${this._itemName}</span>
        ${this._itemLevelText?u:N}
        <span class="tooltip-item-effect" part="effect">${this._itemEffectText}</span>
        ${this._itemCostText?e:N}
        ${this._itemStatusText?i:N}
      </div>
      <button
        class=${zt(s)} /* Aplicar clases dinámicas */
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
  `;ae([D({type:Object})],Z.prototype,"itemData",2);ae([D({type:Object})],Z.prototype,"playerDataSnapshot",2);ae([F()],Z.prototype,"_itemName",2);ae([F()],Z.prototype,"_itemLevelText",2);ae([F()],Z.prototype,"_itemEffectText",2);ae([F()],Z.prototype,"_itemCostText",2);ae([F()],Z.prototype,"_itemStatusText",2);ae([F()],Z.prototype,"_isBuyButtonDisabled",2);ae([F()],Z.prototype,"_buyButtonIcon",2);ae([F()],Z.prototype,"_isEmpty",2);ae([F()],Z.prototype,"_buyButtonState",2);Z=ae([G("shop-tooltip")],Z);var Pa=Object.defineProperty,Ta=Object.getOwnPropertyDescriptor,pe=(u,e,i,s)=>{for(var a=s>1?void 0:s?Ta(e,i):e,t=u.length-1,o;t>=0;t--)(o=u[t])&&(a=(s?o(e,i,a):o(a))||a);return s&&a&&Pa(e,i,a),a};const La=["consumable","unlockable","upgradeable","general"],_a={consumable:"Consumibles",unlockable:"Desbloqueables",upgradeable:"Mejorables",general:"General"};let te=class extends O{constructor(){super(...arguments),this.items=[],this.playerDataSnapshot=null,this.isVisible=!1,this.updateTrigger=0,this._selectedItemId=null,this._itemsByCategory={},this._selectedItemData=null}connectedCallback(){super.connectedCallback(),this.addEventListener("click",this._handleHostClick)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("click",this._handleHostClick)}updated(u){super.updated(u);let e=!1;if(console.log("%c[ShopPopup DEBUG] updated()","color: blue; font-weight: bold;","Cambios:",Array.from(u.keys())),u.has("playerDataSnapshot")){const i=u.get("playerDataSnapshot"),s=this.playerDataSnapshot,a=(i==null?void 0:i.comboMultiplierLevel)??"N/A",t=(s==null?void 0:s.comboMultiplierLevel)??"N/A";console.log(`%c[ShopPopup DEBUG]   > playerDataSnapshot cambió. Nivel Combo Anterior: ${a}, Nuevo: ${t}`,"color: blue;"),e=!0}u.has("updateTrigger")&&(console.log(`%c[ShopPopup DEBUG]   > updateTrigger cambió a: ${this.updateTrigger}`,"color: blue;"),e=!0),u.has("isVisible")&&console.log(`%c[ShopPopup DEBUG]   > isVisible cambió a: ${this.isVisible}`,"color: blue;"),u.has("items")&&(console.log("%c[ShopPopup DEBUG]   > items cambió.","color: blue;"),this._groupItemsByCategory(),e=!0),u.has("_selectedItemId")&&(console.log(`%c[ShopPopup DEBUG]   > _selectedItemId cambió a: ${this._selectedItemId}`,"color: blue;"),this._updateTooltipData(),e=!0),e&&this._tooltipElement&&typeof this._tooltipElement.forceRefresh=="function"&&(console.log("%c[ShopPopup DEBUG]   Forzando refresh del tooltip...","color: blue;"),this._tooltipElement.forceRefresh())}_groupItemsByCategory(){const u={};this.items.forEach(e=>{const i=e.category||"general";u[i]||(u[i]=[]),u[i].push(e)});for(const e in u)u[e].sort((i,s)=>i.name.localeCompare(s.name));this._itemsByCategory=u}_updateTooltipData(){this._selectedItemData=this._selectedItemId?this.items.find(u=>u.id===this._selectedItemId)??null:null}_handleItemSelection(u){var i;const e=(i=u.detail)==null?void 0:i.itemId;console.log(`[ShopPopup DEBUG] _handleItemSelection: Ítem seleccionado/deseleccionado: ${e}`),this._selectedItemId===e?this._selectedItemId=null:this._selectedItemId=e}_handleBuyRequest(u){var i;const e=(i=u.detail)==null?void 0:i.itemId;console.log(`[ShopPopup DEBUG] _handleBuyRequest: Recibido buy request para: ${e}`),e&&this.dispatchEvent(new CustomEvent("buy-item-requested",{detail:{itemId:e},bubbles:!0,composed:!0}))}_handleCloseClick(){console.log("[ShopPopup DEBUG] Botón X clickeado, emitiendo close-requested."),this.dispatchEvent(new CustomEvent("close-requested",{bubbles:!0,composed:!0}))}_handleHostClick(u){u.target===this&&(console.log("[ShopPopup DEBUG] Clic en host (fondo), emitiendo close-requested."),this.dispatchEvent(new CustomEvent("close-requested",{bubbles:!0,composed:!0})))}render(){var u;return console.log(`%c[ShopPopup DEBUG] render() ejecutado. Item seleccionado: ${this._selectedItemId}`,"color: green;"),B`
      <div class="shop-content-box">
        <button class="shop-close-btn" @click=${this._handleCloseClick} title="Cerrar Tienda (Esc)">&times;</button>
        <h2 class="shop-title-text">Tienda de Mejoras</h2>
        <p class="shop-score-text">Puntos: ${((u=this.playerDataSnapshot)==null?void 0:u.score)??0}</p>

        <div class="shop-items-container">
          ${La.map(e=>this._itemsByCategory[e]?B`
            <h3 class="shop-section-title">${_a[e]||e}</h3>
            <div class="shop-section-items">
              ${this._itemsByCategory[e].map(i=>{const s=this.playerDataSnapshot?this._checkItemIsPurchased(i,this.playerDataSnapshot):!1,a=this.playerDataSnapshot?this._checkItemCanPurchase(i,this.playerDataSnapshot):!0,t=this.playerDataSnapshot?this._getItemLevel(i,this.playerDataSnapshot):-1,o=i.isLeveled&&typeof i.maxLevel=="number"&&t>=i.maxLevel,l=o||s&&!i.isLeveled||!a;return B`
                  <shop-item-card
                    .itemId=${i.id}
                    .icon=${i.icon||"❓"}
                    ?isDisabled=${l} /* Usar la nueva variable */
                    ?isPurchased=${s&&!i.isLeveled} /* Solo para estilo visual */
                    ?isMaxLevel=${o} /* Solo para estilo visual */
                    ?isSelected=${this._selectedItemId===i.id}
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
    `}_calculateItemCost(u,e){const i=u.cost;let s=i.base;if(u.isLeveled){const a=u.levelRef,t=a?e[a]??0:0;i.type==="exponential"&&typeof i.multiplier=="number"?s=i.base*Math.pow(i.multiplier,t):s=i.base+(i.perLevel??0)*t}else if(i.levelRef&&typeof i.perLevel=="number"){const a=e[i.levelRef]??0;s=i.base+i.perLevel*a}return Math.round(s)}_checkItemIsPurchased(u,e){if(!u.isPurchasedCheck)return!1;const i=u.isPurchasedCheck,s=i.valueRef,a=e[s];if(typeof a>"u")return!1;switch(i.condition){case"isTrue":return a===!0;case"isFalse":return a===!1;case"greaterThan":return typeof a=="number"&&typeof i.limit=="number"&&a>i.limit;default:return!1}}_checkItemCanPurchase(u,e){if(!u.purchaseCheck)return!0;const i=u.purchaseCheck,s=i.valueRef,a=e[s];if(typeof a>"u")return!1;switch(i.condition){case"lessThan":return typeof a=="number"&&typeof i.limit=="number"&&a<i.limit;case"lessThanOrEqual":return typeof a=="number"&&typeof i.limit=="number"&&a<=i.limit;case"isFalse":return a===!1;case"isTrue":return a===!0;case"greaterThan":return typeof a=="number"&&typeof i.limit=="number"&&a>i.limit;case"greaterThanOrEqual":return typeof a=="number"&&typeof i.limit=="number"&&a>=i.limit;default:return!1}}_getItemLevel(u,e){return!u.isLeveled||!u.levelRef?-1:e[u.levelRef]??0}};te.styles=V`
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
  `;pe([D({type:Array})],te.prototype,"items",2);pe([D({type:Object})],te.prototype,"playerDataSnapshot",2);pe([D({type:Boolean,reflect:!0,attribute:"visible"})],te.prototype,"isVisible",2);pe([D({type:Number})],te.prototype,"updateTrigger",2);pe([F()],te.prototype,"_selectedItemId",2);pe([F()],te.prototype,"_itemsByCategory",2);pe([F()],te.prototype,"_selectedItemData",2);pe([ie(".shop-content-box")],te.prototype,"_shopContentBox",2);pe([ie("shop-tooltip")],te.prototype,"_tooltipElement",2);te=pe([G("shop-popup")],te);const Da="shop-popup";class za{constructor(e,i){this.items=new Map,this.shopPopupElement=null,this.buyRequestListener=s=>this.handleBuyRequest(s),this.closeRequestListener=()=>this.closeShop(),this.handleBuyRequest=s=>{var o;const t=(o=s.detail)==null?void 0:o.itemId;t?this.executePurchaseAction(t):console.warn("ShopManager: Evento 'buy-item-requested' capturado sin itemId.")},this.playerData=e,this.gameManager=i}init(e){if(this.items.clear(),!Array.isArray(e)){console.error("ShopManager: Datos de ítems de tienda inválidos.");return}e.forEach(i=>{i!=null&&i.id&&typeof i.id=="string"?this.items.set(i.id,i):console.warn("ShopManager: Ítem inválido o sin ID.",i)})}getShopPopupElement(){return(!this.shopPopupElement||!document.body.contains(this.shopPopupElement))&&(this.shopPopupElement=document.getElementById(Da),this.shopPopupElement?(this.shopPopupElement.removeEventListener("close-requested",this.closeRequestListener),this.shopPopupElement.removeEventListener("buy-item-requested",this.buyRequestListener),this.shopPopupElement.addEventListener("close-requested",this.closeRequestListener),this.shopPopupElement.addEventListener("buy-item-requested",this.buyRequestListener)):console.error("ShopManager CRITICAL: Componente <shop-popup> con ID 'shop-popup' NO encontrado en el DOM.")),this.shopPopupElement}isShopOpen(){const e=this.getShopPopupElement();return(e==null?void 0:e.isVisible)||!1}openShop(){const e=this.getShopPopupElement();if(!e){console.error("ShopManager: No se pudo abrir la tienda, el elemento popup no existe.");return}try{e.items=Array.from(this.items.values()),e.playerDataSnapshot=this.playerData,e.updateTrigger=(e.updateTrigger||0)+1,e.isVisible=!0;const i=document.getElementById("blur-backdrop");i?i.visible=!0:console.warn("ShopManager: Componente <blur-backdrop-component> no encontrado al abrir la tienda.")}catch(i){console.error("[ShopManager] Error estableciendo props o visibilidad en <shop-popup>:",i),e&&(e.isVisible=!1);const s=document.getElementById("blur-backdrop");s&&(s.visible=!1)}}closeShop(){var a;const e=this.getShopPopupElement();if(!e||!e.isVisible)return;e.isVisible=!1;const i=document.getElementById("blur-backdrop"),s=((a=this.gameManager.getUIManager())==null?void 0:a.isExplanationVisible())??!1;i&&!s&&(i.visible=!1)}updateShopUI(){if(!this.playerData){console.warn("[ShopManager] updateShopUI llamado sin playerData.");return}const e=this.getShopPopupElement();if(e&&e.isVisible){const i=this.playerData.comboMultiplierLevel;console.log(`[ShopManager DEBUG] updateShopUI: PlayerData level ANTES de pasar: ${i}`),e.playerDataSnapshot=this.playerData,e.updateTrigger=(e.updateTrigger||0)+1,console.log(`[ShopManager DEBUG] updateShopUI: Snapshot asignado, trigger incrementado a ${e.updateTrigger}. Intentando forzar refresh del tooltip...`),queueMicrotask(()=>{var a;const s=(a=e.shadowRoot)==null?void 0:a.querySelector("shop-tooltip");s&&typeof s.forceRefresh=="function"?(s.forceRefresh(),console.log("[ShopManager DEBUG] updateShopUI (microtask): tooltip.forceRefresh() LLAMADO.")):s?(console.warn("[ShopManager DEBUG] updateShopUI (microtask): Tooltip encontrado pero no tiene el método forceRefresh(). Intentando requestUpdate..."),s.requestUpdate()):(console.warn("[ShopManager DEBUG] updateShopUI (microtask): No se pudo encontrar el componente shop-tooltip dentro del popup para forzar refresh. Forzando update del popup..."),e.requestUpdate())})}}executePurchaseAction(e){const i=this.items.get(e);if(!i)return console.error(`ShopManager: Ítem con ID '${e}' no encontrado.`),!1;const s=i.levelRef,a=s?this.playerData[s]:"N/A";console.log(`[ShopManager DEBUG exec] INTENTANDO COMPRA: Item '${e}', Nivel Actual: ${a}, Puntos Actuales: ${this.playerData.score}`);const t=this._calculateItemCost(i,this.playerData),o=this.playerData.score>=t,l=this._checkItemCanPurchase(i,this.playerData),r=this._getItemLevel(i,this.playerData),f=i.isLeveled&&typeof i.maxLevel=="number"&&r>=i.maxLevel,c=this._checkItemIsPurchased(i,this.playerData)&&!i.isLeveled;if(f||c||!l||!o)return console.warn(`[ShopManager DEBUG exec] Compra RECHAZADA para '${e}'. Razones: max=${f}, purchased=${c}, reqs=${l}, afford=${o}`),this.updateShopUI(),this.gameManager.getAudioManager().playSound("incorrect"),!1;this.playerData.score-=t,this.gameManager.updateExternalScoreUI(),console.log(`[ShopManager DEBUG exec] Costo ${t} deducido. Puntos restantes: ${this.playerData.score}`);let g=!1;const h=i.actionId;try{switch(h){case"purchaseLife":g=this.purchaseLifeAction();break;case"purchaseShield":g=this.purchaseShieldAction();break;case"purchaseHint":g=this.purchaseHintAction();break;case"purchaseUnlockDrawing":g=this.purchaseUnlockDrawingAction();break;case"purchaseUnlockCatFood":g=this.purchaseUnlockCatFoodAction();break;case"purchaseRefillCatFood":g=this.purchaseRefillCatFoodAction();break;case"purchaseComboMultiplier":g=this.purchaseComboMultiplierAction();break;case"purchaseInkCostReduction":g=this.purchaseInkCostReductionAction();break;case"purchaseExtraCatSpawn":g=this.purchaseExtraCatSpawnAction();break;case"purchaseMaxCatsIncrease":g=this.purchaseMaxCatsIncreaseAction();break;case"purchaseMaxCatSize":g=this.purchaseMaxCatSizeAction();break;default:console.error(`ShopManager: Acción desconocida: ${h}`),g=!1}const n=s&&g?this.playerData[s]:"N/A (o falló)";console.log(`[ShopManager DEBUG exec] Acción ${h} ejecutada. Éxito: ${g}. Nuevo Nivel: ${n}`)}catch(n){console.error(`ShopManager: Error ejecutando acción ${h}:`,n),g=!1}return g?(console.log(`[ShopManager DEBUG exec] Compra EXITOSA de '${e}'.`),this.gameManager.getAudioManager().playSound("purchase")):(this.playerData.score+=t,this.gameManager.updateExternalScoreUI(),console.warn(`[ShopManager DEBUG exec] Acción ${h} falló o no aplicó. Costo ${t} revertido. Puntos: ${this.playerData.score}`),this.gameManager.getAudioManager().playSound("incorrect")),console.log(`[ShopManager DEBUG exec] Llamando a updateShopUI DESPUÉS de intento de compra de '${e}'.`),this.updateShopUI(),g}purchaseLifeAction(){return this.playerData.lives++,this.gameManager.updateExternalLivesUI(),!0}purchaseShieldAction(){return this.playerData.hasShield?!1:(this.playerData.hasShield=!0,this.gameManager.updateExternalShieldUI(!0),!0)}purchaseHintAction(){return this.playerData.hintCharges++,this.gameManager.updateExternalHintUI(this.playerData.hintCharges),!0}purchaseUnlockDrawingAction(){if(this.playerData.isDrawingUnlocked)return!1;this.playerData.isDrawingUnlocked=!0;let e=!1;try{e=this.gameManager.enableDrawingFeature()}catch{e=!1}return e?!0:(this.playerData.isDrawingUnlocked=!1,!1)}purchaseComboMultiplierAction(){return this.playerData.comboMultiplierLevel++,!0}purchaseInkCostReductionAction(){return this.playerData.inkCostReductionLevel++,this.gameManager.updateInkUI(),!0}purchaseExtraCatSpawnAction(){return this.playerData.extraCatSpawnLevel++,!0}purchaseMaxCatsIncreaseAction(){return this.playerData.maxCatsLevel++,!0}purchaseMaxCatSizeAction(){return this.playerData.maxCatSizeLevel++,!0}purchaseUnlockCatFoodAction(){return this.playerData.isCatFoodUnlocked?!1:(this.playerData.isCatFoodUnlocked=!0,this.playerData.refillCatFood(),this.gameManager.enableCatFoodFeature(),!0)}purchaseRefillCatFoodAction(){return this.playerData.currentCatFood>=this.playerData.getMaxCatFood()?!1:(this.playerData.refillCatFood(),this.gameManager.updateCatFoodUI(),!0)}_calculateItemCost(e,i){const s=e.cost;let a=s.base;if(e.isLeveled){const t=e.levelRef,o=t?i[t]??0:0;s.type==="exponential"&&typeof s.multiplier=="number"?a=s.base*Math.pow(s.multiplier,o):a=s.base+(s.perLevel??0)*o}else if(s.levelRef&&typeof s.perLevel=="number"){const t=i[s.levelRef]??0;a=s.base+s.perLevel*t}return Math.round(a)}_checkItemIsPurchased(e,i){if(!e.isPurchasedCheck)return!1;const s=e.isPurchasedCheck,a=s.valueRef,t=i[a];if(typeof t>"u")return!1;switch(s.condition){case"isTrue":return t===!0;case"isFalse":return t===!1;case"greaterThan":return typeof t=="number"&&typeof s.limit=="number"&&t>s.limit;default:return!1}}_checkItemCanPurchase(e,i){if(!e.purchaseCheck)return!0;const s=e.purchaseCheck,a=s.valueRef,t=i[a];if(typeof t>"u")return!1;switch(s.condition){case"lessThan":return typeof t=="number"&&typeof s.limit=="number"&&t<s.limit;case"lessThanOrEqual":return typeof t=="number"&&typeof s.limit=="number"&&t<=s.limit;case"isFalse":return t===!1;case"isTrue":return t===!0;case"greaterThan":return typeof t=="number"&&typeof s.limit=="number"&&t>s.limit;case"greaterThanOrEqual":return typeof t=="number"&&typeof s.limit=="number"&&t>=s.limit;default:return!1}}_getItemLevel(e,i){return!e.isLeveled||!e.levelRef?-1:i[e.levelRef]??0}destroy(){const e=this.getShopPopupElement();e&&(e.removeEventListener("close-requested",this.closeRequestListener),e.removeEventListener("buy-item-requested",this.buyRequestListener)),this.items.clear(),this.shopPopupElement=null,console.log("ShopManager destruido.")}}class $a{constructor(){this.score=0,this.lives=3,this.isDrawingUnlocked=!1,this.isCatFoodUnlocked=!1,this.hasShield=!1,this.hintCharges=0,this.currentInk=0,this.INK_BAR_CAPACITY=1e3,this.inkSpentSinceLastClear=0,this.currentCatFood=0,this.MAX_CAT_FOOD=25,this.comboMultiplierLevel=0,this.inkCostReductionLevel=0,this.extraCatSpawnLevel=0,this.maxCatsLevel=0,this.maxCatSizeLevel=0,this.BASE_MAX_CAT_SIZE_LIMIT=150,this.MAX_CAT_SIZE_INCREMENT_PER_LEVEL=25,console.log("PlayerData Instanciado.")}getCurrentComboMultiplier(){return 1+this.comboMultiplierLevel*.15}getCurrentInkCostPerPixel(){return .4*Math.pow(.9,this.inkCostReductionLevel)}getCatsPerCorrectAnswer(){return 1+this.extraCatSpawnLevel*1}getMaxCatsAllowed(){return 50+this.maxCatsLevel*25}getCurrentMaxSizeLimit(){return this.BASE_MAX_CAT_SIZE_LIMIT+this.maxCatSizeLevel*this.MAX_CAT_SIZE_INCREMENT_PER_LEVEL}spendInk(e){return this.currentInk>=e?(this.currentInk-=e,this.inkSpentSinceLastClear+=e,!0):!1}gainInk(e){this.currentInk+=e}recoverSpentInk(){console.log(`[PlayerData] Recovering ${this.inkSpentSinceLastClear.toFixed(0)} ink.`),this.gainInk(this.inkSpentSinceLastClear),this.inkSpentSinceLastClear=0}getMaxCatFood(){return this.MAX_CAT_FOOD}spendCatFoodUnit(){return this.isCatFoodUnlocked&&this.currentCatFood>0?(this.currentCatFood--,!0):!1}refillCatFood(){this.isCatFoodUnlocked&&(this.currentCatFood=this.getMaxCatFood())}reset(){console.log("PlayerData: Reseteando datos..."),this.score=0,this.lives=3,this.isDrawingUnlocked=!1,this.isCatFoodUnlocked=!1,this.hasShield=!1,this.hintCharges=0,this.currentInk=0,this.inkSpentSinceLastClear=0,this.currentCatFood=0,this.comboMultiplierLevel=0,this.inkCostReductionLevel=0,this.extraCatSpawnLevel=0,this.maxCatsLevel=0,this.maxCatSizeLevel=0}}var Ba=Object.defineProperty,Oa=Object.getOwnPropertyDescriptor,vt=(u,e,i,s)=>{for(var a=s>1?void 0:s?Oa(e,i):e,t=u.length-1,o;t>=0;t--)(o=u[t])&&(a=(s?o(e,i,a):o(a))||a);return s&&a&&Ba(e,i,a),a};let ze=class extends O{constructor(){super(...arguments),this._canvasContext=null,this.isActive=!1,this.isPointerLockdown=!1}firstUpdated(){this._canvasElement&&(this._canvasContext=this._canvasElement.getContext("2d"),this._canvasContext||console.error("DrawingCanvasLayer: No se pudo obtener el contexto 2D."),this.dispatchEvent(new CustomEvent("canvas-ready",{bubbles:!0,composed:!0}))),this.resizeCanvas()}getCanvasElement(){return this._canvasElement??null}getContext(){return this._canvasContext??null}resizeCanvas(){this._canvasElement&&(this._canvasElement.width=window.innerWidth,this._canvasElement.height=window.innerHeight,this.dispatchEvent(new CustomEvent("canvas-resized",{bubbles:!0,composed:!0})))}render(){return B`<canvas></canvas>`}};ze.styles=V`
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
      `;vt([ie("canvas")],ze.prototype,"_canvasElement",2);vt([D({type:Boolean,reflect:!0})],ze.prototype,"isActive",2);vt([D({type:Boolean,reflect:!0})],ze.prototype,"isPointerLockdown",2);ze=vt([G("drawing-canvas-layer")],ze);const hi=25,ui=8,Ra="#E5E7EB",Fa=150,Ua=4,Na=2,Va=Na;class Ga{constructor(e){this.drawingCanvasLayer=null,this.actualCanvasElement=null,this.drawingCtx=null,this.isBrushActive=!1,this.isDrawing=!1,this.currentPath=[],this.lastPoint=null,this.drawnPaths=[],this.isInitialized=!1,this.generalListeners=[],this.lastToggleTime=0,this.BRUSH_TOGGLE_DEBOUNCE=200,this.gameManager=e;try{this.playerData=e.getPlayerData()}catch(i){console.error("InkManager: Error en constructor al obtener PlayerData.",i)}}setPhysicsManager(e){this.physicsManager=e}init(){if(this.isInitialized){this.updateInkUI();return}try{if(!this.physicsManager&&(this.physicsManager=this.gameManager.getPhysicsManager(),!this.physicsManager))throw new Error("PhysicsManager no disponible.");if(!this.playerData&&(this.playerData=this.gameManager.getPlayerData(),!this.playerData))throw new Error("PlayerData no disponible.");if(this.drawingCanvasLayer=document.getElementById("drawing-canvas-layer-main"),!this.drawingCanvasLayer)throw new Error("<drawing-canvas-layer id='drawing-canvas-layer-main'> no encontrado en el DOM.");if(this.actualCanvasElement=this.drawingCanvasLayer.getCanvasElement(),this.drawingCtx=this.drawingCanvasLayer.getContext(),!this.actualCanvasElement||!this.drawingCtx)throw new Error("No se pudo obtener el canvas o el contexto 2D desde drawing-canvas-layer.");this.setupDrawingCanvas(),this.initDrawingListeners(),this.isInitialized=!0,this.updateInkUI()}catch(e){console.error("InkManager: Error CRÍTICO en inicialización:",e),this.isInitialized=!1}}initDrawingListeners(){if(this.removeDrawingListeners(),this.actualCanvasElement){const e=this.startDrawing.bind(this),i=this.draw.bind(this),s=this.stopDrawing.bind(this);this.addListener(this.actualCanvasElement,"mousedown",e),this.addListener(this.actualCanvasElement,"mousemove",i),this.addListener(this.actualCanvasElement,"mouseup",s),this.addListener(this.actualCanvasElement,"mouseleave",s),this.addListener(this.actualCanvasElement,"touchstart",e,{passive:!1}),this.addListener(this.actualCanvasElement,"touchmove",i,{passive:!1}),this.addListener(this.actualCanvasElement,"touchend",s),this.addListener(this.actualCanvasElement,"touchcancel",s)}this.addListener(window,"resize",this.handleResize.bind(this))}addListener(e,i,s,a){e.addEventListener(i,s,a),this.generalListeners.push({element:e,type:i,handler:s,options:a})}removeDrawingListeners(){this.generalListeners.forEach(({element:e,type:i,handler:s,options:a})=>{try{e.removeEventListener(i,s,a)}catch{}}),this.generalListeners=[]}setupDrawingCanvas(){this.drawingCtx&&this.drawingCanvasLayer&&(this.drawingCanvasLayer.resizeCanvas(),this.applyContextStyles(),this.clearCanvas(),this.redrawPaths())}applyContextStyles(){this.drawingCtx&&(this.drawingCtx.strokeStyle=Ra,this.drawingCtx.lineWidth=ui,this.drawingCtx.lineCap="round",this.drawingCtx.lineJoin="round")}handleResize(){this.drawingCanvasLayer&&(this.drawingCanvasLayer.resizeCanvas(),this.drawingCtx=this.drawingCanvasLayer.getContext(),this.drawingCtx&&(this.applyContextStyles(),this.redrawPaths()))}clearCanvas(){this.drawingCtx&&this.actualCanvasElement&&this.drawingCtx.clearRect(0,0,this.actualCanvasElement.width,this.actualCanvasElement.height)}redrawPaths(){this.clearCanvas(),this.drawingCtx&&this.drawnPaths.forEach(e=>{this.drawPathPoints(e.points)})}drawPathPoints(e){if(!(!this.drawingCtx||e.length<2)){this.drawingCtx.beginPath(),this.drawingCtx.moveTo(e[0].x,e[0].y);for(let i=1;i<e.length;i++)this.drawingCtx.lineTo(e[i].x,e[i].y);this.drawingCtx.stroke()}}updateInkUI(){if(!this.isInitialized||!this.playerData)return;const e=this.playerData.isDrawingUnlocked;this.gameManager.getUIManager().updateInkVisibility(e),this.gameManager.getUIManager().updateInkBar(),e&&this.playerData.currentInk<=0&&this.isBrushActive?this.toggleBrush(!1):this.gameManager.updateToolButtonStates()}toggleBrush(e){if(!this.isInitialized)return;const i=Date.now();if(e===void 0&&i-this.lastToggleTime<this.BRUSH_TOGGLE_DEBOUNCE)return;this.lastToggleTime=i;const s=e!==void 0?e:!this.isBrushActive;if(s===!0&&(!this.playerData.isDrawingUnlocked||this.playerData.currentInk<=0)){this.isBrushActive&&(this.isBrushActive=!1,this.gameManager.setQuizUiFaded(!1),this.updateCanvasActiveState(),this.gameManager.updateToolButtonStates());return}s!==this.isBrushActive&&(this.isBrushActive=s,!this.isBrushActive&&this.isDrawing&&this.stopDrawing(null),this.gameManager.setQuizUiFaded(this.isBrushActive),this.updateCanvasActiveState(),this.gameManager.updateToolButtonStates())}updateCanvasActiveState(){this.drawingCanvasLayer&&(this.drawingCanvasLayer.isActive=this.isBrushActive)}clearInkLines(){var i;if(!this.isInitialized||!this.playerData.isDrawingUnlocked||this.playerData.inkSpentSinceLastClear<=0)return;const e=this.drawnPaths.flatMap(s=>s.bodies);if((i=this.physicsManager)!=null&&i.getWorld&&e.length>0)try{const s=this.physicsManager.getWorld(),a=e.filter(t=>L.Composite.get(s,t.id,"body"));a.length>0&&L.World.remove(s,a)}catch(s){console.error("InkManager: Error removiendo cuerpos de tinta:",s)}this.drawnPaths=[],this.clearCanvas(),this.playerData.recoverSpentInk(),this.updateInkUI(),this.gameManager.getAudioManager().playSound("clear_ink")}gainInkOnCorrectAnswer(){!this.isInitialized||!this.playerData.isDrawingUnlocked||(this.playerData.gainInk(Fa),this.updateInkUI())}destroy(){this.removeDrawingListeners(),this.isInitialized=!1,this.isBrushActive=!1,this.isDrawing=!1,this.currentPath=[],this.drawnPaths=[],this.clearCanvas(),this.drawingCanvasLayer&&(this.drawingCanvasLayer.isActive=!1,this.drawingCanvasLayer.isPointerLockdown=!1),this.drawingCtx=null,this.actualCanvasElement=null,this.drawingCanvasLayer=null}startDrawing(e){if(!this.isInitialized||!this.isBrushActive||!this.drawingCtx||!this.actualCanvasElement||this.playerData.currentInk<=0)return;e.preventDefault(),this.isDrawing=!0;const i=this.getMousePos(e);this.currentPath=[i],this.lastPoint=i,this.drawingCtx.beginPath(),this.drawingCtx.moveTo(i.x,i.y),this.gameManager.getAudioManager().playSound("draw_start")}draw(e){if(!this.isDrawing||!this.isBrushActive||!this.drawingCtx)return;e.preventDefault();const i=this.getMousePos(e),s=this.lastPoint?this.distanceSq(this.lastPoint,i):hi;if(s>=hi){const t=Math.sqrt(s)*this.playerData.getCurrentInkCostPerPixel();this.playerData.spendInk(t)?(this.currentPath.push(i),this.drawingCtx.lineTo(i.x,i.y),this.drawingCtx.stroke(),this.drawingCtx.beginPath(),this.drawingCtx.moveTo(i.x,i.y),this.lastPoint=i,this.updateInkUI()):(this.stopDrawing(e),this.playerData.currentInk<=0&&this.toggleBrush(!1))}}stopDrawing(e){var i;if(this.isDrawing){if(e==null||e.preventDefault(),this.isDrawing=!1,this.gameManager.getAudioManager().playSound("draw_end"),this.currentPath.length>1){const s=this.createInkBodySegments(this.currentPath);if(s.length>0&&((i=this.physicsManager)!=null&&i.getWorld))try{L.World.add(this.physicsManager.getWorld(),s),this.drawnPaths.push({points:[...this.currentPath],bodies:s})}catch(a){console.error("InkManager: Error añadiendo cuerpos:",a)}else this.physicsManager||console.error("InkManager: PhysicsManager no disponible.")}this.currentPath=[],this.lastPoint=null}}getMousePos(e){if(!this.actualCanvasElement)return{x:0,y:0};const i=this.actualCanvasElement.getBoundingClientRect();let s=0,a=0;return e instanceof MouseEvent?(s=e.clientX,a=e.clientY):e.touches&&e.touches.length>0?(s=e.touches[0].clientX,a=e.touches[0].clientY):e.changedTouches&&e.changedTouches.length>0&&(s=e.changedTouches[0].clientX,a=e.changedTouches[0].clientY),{x:s-i.left,y:a-i.top}}distanceSq(e,i){const s=e.x-i.x,a=e.y-i.y;return s*s+a*a}createInkBodySegments(e){const i=[];if(e.length<2||!this.physicsManager)return i;for(let s=1;s<e.length;s++){const a=e[s-1],t=e[s],o=t.x-a.x,l=t.y-a.y,r=o*o+l*l;if(r<1)continue;const f=Math.sqrt(r),c=Math.atan2(l,o),g=a.x+o/2,h=a.y+l/2;try{const n=L.Bodies.rectangle(g,h,f,ui,{isStatic:!0,angle:c,label:"inkLine",friction:.5,restitution:.1,collisionFilter:{category:Ua,mask:Va},render:{visible:!1}});n&&i.push(n)}catch(n){console.error("InkManager: Error creando cuerpo:",n)}}return i}}const Qa=1,Ha=4;class Ce{constructor(e){this.currentQuestion=null,this.nextQuestionTimeoutId=null,this.consecutiveCorrectAnswers=0,this.hintAppliedToQuestionId=null,this.isWaitingForExplanationConfirm=!1,this.lastAnswerResultType=null,this.isExitingOrChangingState=!1,this.BASE_POINTS_PER_CORRECT=15,this.DIFFICULTY_BONUS={easy:10,1:10,2:20,medium:30,3:30,hard:45,4:45,5:65},this.gameManager=e;try{this.uiManager=e.getUIManager(),this.quizSystem=e.getQuizSystem()}catch(i){throw console.error("QuizGameplayState: Error crítico obteniendo UIManager o QuizSystem.",i),i}}selectRandomCatTemplateId(){var o,l;const i=this.gameManager.getCatManager().getSpawnableTemplatesWeighted();if(i.length===0)return"common_cat";const s=i.reduce((r,f)=>r+f.weight,0);if(s<=0)return((o=i[0])==null?void 0:o.id)??"common_cat";const a=Math.random()*s;let t=0;for(const r of i)if(t+=r.weight,a<t)return r.id;return((l=i[i.length-1])==null?void 0:l.id)??"common_cat"}enter(e){console.log("[QuizGameplayState] enter() INICIADO.",e),this.isExitingOrChangingState=!1,this.gameManager.setBodyStateClass("quizgameplay"),this.gameManager.getPlayerData().reset(),console.log("[QuizGameplayState] PlayerData reseteado."),this.consecutiveCorrectAnswers=0,this.hintAppliedToQuestionId=null,this.isWaitingForExplanationConfirm=!1,this.lastAnswerResultType=null,this.nextQuestionTimeoutId&&(clearTimeout(this.nextQuestionTimeoutId),this.nextQuestionTimeoutId=null,console.warn("[QuizGameplayState] Timeout pendiente cancelado en enter().")),this.displayNextQuestion(),console.log("[QuizGameplayState] enter() FINALIZADO.")}exit(){console.log("[QuizGameplayState] exit() INICIADO."),this.isExitingOrChangingState=!0;const e=this.gameManager.getContainerElement();this.uiManager.clearQuizInterface(e),this.nextQuestionTimeoutId&&(clearTimeout(this.nextQuestionTimeoutId),this.nextQuestionTimeoutId=null,console.log("[QuizGameplayState] Timeout para siguiente pregunta cancelado en exit().")),this.uiManager.updateComboVisuals(0),document.body.style.backgroundColor="";const i=document.documentElement;i.style.removeProperty("--element-glow-intensity"),i.style.removeProperty("--flare-intensity"),i.style.removeProperty("--difficulty-glow-color"),i.style.removeProperty("--difficulty-glow-blur"),this.isWaitingForExplanationConfirm=!1,this.hintAppliedToQuestionId=null,this.currentQuestion=null,this.lastAnswerResultType=null,console.log("[QuizGameplayState] exit() FINALIZADO.")}update(e){}calculateScore(e,i){const s=i+1,a=this.BASE_POINTS_PER_CORRECT*s,t=this.DIFFICULTY_BONUS[e]??this.DIFFICULTY_BONUS[1]??0,o=this.gameManager.getPlayerData().getCurrentComboMultiplier(),l=Math.max(0,(a+t)*(o-1));return{totalPoints:Math.round(a+t+l),basePoints:a,difficultyBonus:t,comboBonus:Math.round(l)}}handleCorrectAnswer(e){if(console.log("[QuizGameplayState] handleCorrectAnswer() INICIADO."),this.isExitingOrChangingState){console.log("[QuizGameplayState] handleCorrectAnswer() abortado: isExitingOrChangingState es true.");return}this.lastAnswerResultType="correct";const i=this.calculateScore(e,this.consecutiveCorrectAnswers);this.consecutiveCorrectAnswers++,this.gameManager.getPlayerData().score+=i.totalPoints,this.gameManager.getInkManager().gainInkOnCorrectAnswer(),this.uiManager.updateScoreDisplay(this.gameManager.getPlayerData().score),this.uiManager.updateComboVisuals(this.consecutiveCorrectAnswers),this.uiManager.updateInkBar();let s=`¡+${i.totalPoints} Pts!`,a=`(Base: ${i.basePoints}, Dif: +${i.difficultyBonus}`;const t=this.gameManager.getPlayerData().getCurrentComboMultiplier();i.comboBonus>0&&(a+=`, Combo x${t.toFixed(1)}: +${i.comboBonus}`),a+=")",s+=` ${a}`,this.uiManager.updateFeedback(s,"correct");try{this.gameManager.getAudioManager().playSound("correct")}catch(r){console.error("Error sonido 'correct':",r)}try{this.gameManager.getCatManager().growExistingCats(Qa,Ha)}catch(r){console.error("Error llamando a catManager.growExistingCats:",r)}const o=this.gameManager.getPlayerData().getCatsPerCorrectAnswer(),l=this.selectRandomCatTemplateId();if(l)for(let r=0;r<o;r++)try{this.gameManager.getCatManager().addCat(l)}catch(f){console.error(`Error al llamar a catManager.addCat (iteración ${r+1}/${o}):`,f)}console.log("[QuizGameplayState] handleCorrectAnswer() llamando a proceedToNextStep()."),this.proceedToNextStep()}handleIncorrectAnswer(){if(console.log("[QuizGameplayState] handleIncorrectAnswer() INICIADO."),this.isExitingOrChangingState){console.log("[QuizGameplayState] handleIncorrectAnswer() abortado: isExitingOrChangingState es true.");return}this.lastAnswerResultType="incorrect";const e=this.gameManager.getPlayerData();let i=!1;e.hasShield?(e.hasShield=!1,this.uiManager.updateFeedback("¡Escudo Roto!","shield"),this.uiManager.updateShieldIcon(!1),this.gameManager.getAudioManager().playSound("shield_break"),this.lastAnswerResultType="shield",console.log("[QuizGameplayState] Escudo usado.")):(this.consecutiveCorrectAnswers=0,this.gameManager.decrementLives(),this.uiManager.updateComboVisuals(this.consecutiveCorrectAnswers),this.gameManager.getAudioManager().playSound("incorrect"),e.hintCharges>0&&(console.log("[QuizGameplayState] Respuesta incorrecta (sin escudo), reseteando cargas de pista."),e.hintCharges=0,this.uiManager.updateHintIcon(0)),this.gameManager.getLives()<=0&&(i=!0,console.log("[QuizGameplayState] VIDAS AGOTADAS - GAME OVER."))),this.hintAppliedToQuestionId=null,i?(this.isExitingOrChangingState=!0,console.log("[QuizGameplayState] Procesando Game Over..."),this.uiManager.updateFeedback("¡Has perdido!","incorrect"),this.nextQuestionTimeoutId&&(clearTimeout(this.nextQuestionTimeoutId),this.nextQuestionTimeoutId=null,console.log("[QuizGameplayState] Timeout para siguiente pregunta cancelado por Game Over.")),setTimeout(()=>{console.log("[QuizGameplayState] Timeout de Game Over: Verificando estado antes de cambiar..."),this.gameManager.getStateMachine().getCurrentStateName()==="QuizGameplay"?(console.log("[QuizGameplayState] Timeout de Game Over: Cambiando a estado GameOverState."),this.gameManager.getStateMachine().changeState("GameOver",{score:e.score},"gq-wipe-transition")):console.log("[QuizGameplayState] Timeout de Game Over: Estado ya cambió, no se transiciona a GameOverState.")},1500)):(console.log("[QuizGameplayState] handleIncorrectAnswer() (no game over) llamando a proceedToNextStep()."),this.proceedToNextStep())}proceedToNextStep(){var a,t;const e=((a=this.currentQuestion)==null?void 0:a.id)||"N/A";if(console.log(`[QuizGameplayState] proceedToNextStep() INICIADO para pregunta ${e}. isExiting: ${this.isExitingOrChangingState}, isWaitingExpl: ${this.isWaitingForExplanationConfirm}`),this.isExitingOrChangingState){console.log(`[QuizGameplayState] proceedToNextStep() abortado (pregunta ${e}): isExitingOrChangingState es true.`);return}if(this.isWaitingForExplanationConfirm){console.log(`[QuizGameplayState] proceedToNextStep() (pregunta ${e}): Ya esperando confirmación de explicación. NO SE HACE NADA MÁS.`);return}const i=(t=this.currentQuestion)==null?void 0:t.explanation,s=()=>{console.log(`[QuizGameplayState] scheduleNext() INTERNO llamado (después de pregunta ${e}). Programando siguiente pregunta.`),this.lastAnswerResultType=null;const o=i?500:1500;this.scheduleNextQuestion(o)};if(i){console.log(`[QuizGameplayState] Pregunta ${e}: Mostrando explicación. SET isWaitingForExplanationConfirm = true.`),this.isWaitingForExplanationConfirm=!0;const o=()=>{if(console.log(`[QuizGameplayState] ** explanationCallback EJECUTADO ** (pregunta ${e}). SET isWaitingForExplanationConfirm = false.`),this.isExitingOrChangingState){console.log(`[QuizGameplayState] explanationCallback abortado (pregunta ${e}): isExitingOrChangingState es true.`),this.isWaitingForExplanationConfirm=!1;return}this.isWaitingForExplanationConfirm=!1,s()};try{console.log(`[QuizGameplayState] Llamando a uiManager.showExplanation para pregunta ${e}.`),this.uiManager.showExplanation(i,o,this.lastAnswerResultType)}catch(l){console.error("[QuizGameplayState] Error llamando a uiManager.showExplanation:",l),this.isWaitingForExplanationConfirm=!1,s()}}else console.log(`[QuizGameplayState] Pregunta ${e}: No hay explicación. Llamando a scheduleNext directamente.`),s();console.log(`[QuizGameplayState] proceedToNextStep() FINALIZADO para pregunta ${e}.`)}scheduleNextQuestion(e){var s;const i=((s=this.currentQuestion)==null?void 0:s.id)||"N/A (previa)";if(console.log(`[QuizGameplayState] scheduleNextQuestion() INICIADO para pregunta ${i} con delay: ${e}ms. isExiting: ${this.isExitingOrChangingState}`),this.isExitingOrChangingState){console.log("[QuizGameplayState] scheduleNextQuestion() abortado: isExitingOrChangingState es true.");return}this.nextQuestionTimeoutId&&(console.log(`[QuizGameplayState] Limpiando timeout anterior: ${this.nextQuestionTimeoutId} antes de programar para ${i}.`),clearTimeout(this.nextQuestionTimeoutId)),this.nextQuestionTimeoutId=window.setTimeout(()=>{const a=this.nextQuestionTimeoutId;this.nextQuestionTimeoutId=null,console.log(`[QuizGameplayState] TIMEOUT EJECUTADO (ID: ${a}) para scheduleNextQuestion. Pregunta previa: ${i}`),!this.isExitingOrChangingState&&this.gameManager.getStateMachine().getCurrentStateName()==="QuizGameplay"?(console.log("[QuizGameplayState] Timeout: Llamando a displayNextQuestion."),requestAnimationFrame(()=>{!this.isExitingOrChangingState&&this.gameManager.getStateMachine().getCurrentStateName()==="QuizGameplay"?this.displayNextQuestion():console.log("[QuizGameplayState] displayNextQuestion abortado en rAF porque el estado cambió o se está saliendo.")})):console.log("[QuizGameplayState] displayNextQuestion abortado en timeout porque el estado cambió o se está saliendo. Estado FSM:",this.gameManager.getStateMachine().getCurrentStateName())},e),console.log(`[QuizGameplayState] Nueva pregunta programada con timeout ID: ${this.nextQuestionTimeoutId} para después de pregunta ${i}. Delay: ${e}ms.`)}displayNextQuestion(){var i;if(console.log(`[QuizGameplayState] displayNextQuestion() INICIADO. isExiting: ${this.isExitingOrChangingState}`),this.isExitingOrChangingState){console.log("[QuizGameplayState] displayNextQuestion abortado porque se está saliendo del estado.");return}try{this.currentQuestion=this.quizSystem.selectNextQuestion(),console.log(`[QuizGameplayState] Siguiente pregunta seleccionada: ID ${((i=this.currentQuestion)==null?void 0:i.id)||"NINGUNA"}`)}catch(s){console.error("[QuizGameplayState] Error seleccionando la siguiente pregunta:",s),this.uiManager.updateFeedback("Error al cargar la siguiente pregunta.","info");return}if(!this.currentQuestion){console.log("[QuizGameplayState] No quedan más preguntas disponibles. Transicionando a ResultsState."),this.isExitingOrChangingState=!0,this.uiManager.updateFeedback("¡Has completado todas las preguntas!","correct"),setTimeout(()=>{if(console.log("[QuizGameplayState] Timeout de fin de preguntas: Verificando estado antes de cambiar a Results..."),this.gameManager.getStateMachine().getCurrentStateName()==="QuizGameplay"){console.log("[QuizGameplayState] Timeout de fin de preguntas: Cambiando a estado ResultsState.");const s=this.quizSystem.getTotalQuestionsCount(),a=this.gameManager.getPlayerData();console.warn("[QuizGameplayState] Estimando respuestas correctas basado en puntaje. Implementar conteo real.");const t=Math.round(a.score/(this.BASE_POINTS_PER_CORRECT*1.2));this.gameManager.getStateMachine().changeState("Results",{score:a.score,correct:t,total:s},"gq-wipe-transition")}else console.log("[QuizGameplayState] Timeout de fin de preguntas: Estado ya cambió, no se transiciona a ResultsState.")},1500);return}this.hintAppliedToQuestionId=null;const e=this.gameManager.getContainerElement();if(!e){console.error("[QuizGameplayState] Contenedor #app no encontrado para displayNextQuestion.");return}try{console.log(`[QuizGameplayState] Llamando a uiManager.buildQuizInterface para pregunta ID: ${this.currentQuestion.id}`),this.uiManager.buildQuizInterface(this.currentQuestion,e,this.handleOptionClick.bind(this),this.consecutiveCorrectAnswers),this.gameManager.getPlayerData().hintCharges>0&&this.currentQuestion&&(console.log("[QuizGameplayState] Aplicando visuales de pista."),this.uiManager.applyHintVisuals(this.currentQuestion.correctAnswerKey),this.hintAppliedToQuestionId=this.currentQuestion.id),console.log(`[QuizGameplayState] displayNextQuestion() FINALIZADO para pregunta ID: ${this.currentQuestion.id}`)}catch(s){console.error("[QuizGameplayState] Error construyendo la interfaz del quiz:",s),this.uiManager.updateFeedback("Error al mostrar la pregunta.","info")}}handleOptionClick(e){var t;const i=((t=this.currentQuestion)==null?void 0:t.id)||"N/A";if(console.log(`[QuizGameplayState] handleOptionClick() INICIADO con key: ${e} para pregunta ${i}. isExiting: ${this.isExitingOrChangingState}, isWaitingExpl: ${this.isWaitingForExplanationConfirm}, timeoutId: ${this.nextQuestionTimeoutId}`),!this.currentQuestion||this.isExitingOrChangingState||this.isWaitingForExplanationConfirm||this.nextQuestionTimeoutId!==null){console.warn(`[QuizGameplayState] handleOptionClick IGNORADO (pregunta ${i}): noCurrentQ=${!this.currentQuestion}, isExiting=${this.isExitingOrChangingState}, isWaitingExpl=${this.isWaitingForExplanationConfirm}, timeoutPending=${this.nextQuestionTimeoutId!==null}`);return}console.log(`[QuizGameplayState] handleOptionClick: PROCEDIENDO con validación para pregunta ${i}.`),this.uiManager.disableOptions(),console.log(`[QuizGameplayState] Opciones deshabilitadas para pregunta ${i}.`);const s=this.quizSystem.validateAnswer(this.currentQuestion.id,e),a=this.gameManager.getPlayerData();this.hintAppliedToQuestionId===this.currentQuestion.id&&(a.hintCharges>0&&(a.hintCharges--,this.uiManager.updateHintIcon(a.hintCharges),console.log("[QuizGameplayState] Carga de pista descontada.")),this.hintAppliedToQuestionId=null),s===!0?(console.log(`[QuizGameplayState] Respuesta CORRECTA (pregunta ${i}). Llamando a handleCorrectAnswer.`),this.handleCorrectAnswer(this.currentQuestion.difficulty)):s===!1?(console.log(`[QuizGameplayState] Respuesta INCORRECTA (pregunta ${i}). Llamando a handleIncorrectAnswer.`),this.handleIncorrectAnswer()):(console.error(`[QuizGameplayState] Error al validar la respuesta (isCorrect es null) para pregunta ${i}.`),this.uiManager.updateFeedback("Error al validar la respuesta.","info"),this.hintAppliedToQuestionId=null,this.proceedToNextStep()),console.log(`[QuizGameplayState] handleOptionClick() FINALIZADO para key: ${e} (pregunta ${i}).`)}rebuildInterface(){if(console.log(`[QuizGameplayState] rebuildInterface() INICIADO. isExitingOrChangingState: ${this.isExitingOrChangingState}`),this.isExitingOrChangingState)return;const e=this.gameManager.getContainerElement();if(this.currentQuestion&&e){console.log("[QuizGameplayState] Reconstruyendo interfaz para pregunta ID:",this.currentQuestion.id);const i=this.uiManager.isExplanationVisible(),s=this.uiManager.externalConfirmCallback,a=this.lastAnswerResultType;if(this.uiManager.buildQuizInterface(this.currentQuestion,e,this.handleOptionClick.bind(this),this.consecutiveCorrectAnswers),this.hintAppliedToQuestionId===this.currentQuestion.id&&this.uiManager.applyHintVisuals(this.currentQuestion.correctAnswerKey),i&&this.currentQuestion.explanation){console.log("[UIManager] Reconstruyendo interfaz: Restaurando explicación visible.");const t=s??(()=>{this.gameManager.getStateMachine().getCurrentStateName()==="QuizGameplay"&&this.proceedToNextStep()});this.uiManager.showExplanation(this.currentQuestion.explanation,t,a)}}else console.warn("[QuizGameplayState] No se puede reconstruir, falta pregunta actual o contenedor.")}getPreferredEnterAnimation(){return"gq-wipe-transition"}getPreferredExitAnimation(){return"gq-wipe-transition"}}var Wa=Object.defineProperty,ja=Object.getOwnPropertyDescriptor,Ze=(u,e,i,s)=>{for(var a=s>1?void 0:s?ja(e,i):e,t=u.length-1,o;t>=0;t--)(o=u[t])&&(a=(s?o(e,i,a):o(a))||a);return s&&a&&Wa(e,i,a),a};let qe=class extends O{constructor(){super(...arguments),this.optionKey="",this.optionText="Opción",this.disabled=!1,this.hinted=!1}render(){return B`
      <button
        class="option-button-internal" 
        ?disabled=${this.disabled||this.hinted}
        @click=${this._handleClick}
        @touchstart=${this._handleClick}
        part="button"
      >
        ${this.optionText}
      </button>
    `}_handleClick(u){u.type==="touchstart"&&u.preventDefault(),!(this.disabled||this.hinted)&&this.dispatchEvent(new CustomEvent("option-selected",{detail:{key:this.optionKey},bubbles:!0,composed:!0}))}};qe.styles=V`
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
  `;Ze([D({type:String})],qe.prototype,"optionKey",2);Ze([D({type:String})],qe.prototype,"optionText",2);Ze([D({type:Boolean,reflect:!0})],qe.prototype,"disabled",2);Ze([D({type:Boolean,reflect:!0})],qe.prototype,"hinted",2);qe=Ze([G("quiz-option-button")],qe);var Ya=Object.defineProperty,Ka=Object.getOwnPropertyDescriptor,oe=(u,e,i,s)=>{for(var a=s>1?void 0:s?Ka(e,i):e,t=u.length-1,o;t>=0;t--)(o=u[t])&&(a=(s?o(e,i,a):o(a))||a);return s&&a&&Ya(e,i,a),a};const qt=1,Xa=10,Za=50,Ja=200,eo=1e3,to=5e3,io=5,ao=10,oo=20,no=50,so=100;let J=class extends O{constructor(){super(),this.score=0,this.combo=0,this._flareIntensity=0,this._shouldPulse=!1,this._scoreColor="var(--gq-scoredisp-text-color-base, #f3f4f6)",this._scoreWeight=800,this._displayScore=0,this._targetScore=0,this._isAnimatingScore=!1,this._scoreAnimationId=null}connectedCallback(){super.connectedCallback(),this.score!==void 0&&!this._isAnimatingScore&&this._displayScore!==this.score&&(this._displayScore=this.score,this._targetScore=this.score)}updated(u){if(super.updated(u),u.has("combo")&&this._calculateEffects(),u.has("score")){const e=u.get("score"),i=this.score;e===void 0&&i!==void 0?(this._displayScore=i,this._targetScore=i,this._isAnimatingScore=!1,this._scoreAnimationId&&(cancelAnimationFrame(this._scoreAnimationId),this._scoreAnimationId=null),i!==0&&this._animateScoreUpdate(0,i)):i!==e&&this._animateScoreUpdate(this._displayScore,i)}}_calculateEffects(){this._flareIntensity=this.combo<qt?0:Math.min((this.combo-qt+1)/(Xa-qt+1),1),this._shouldPulse=this._flareIntensity>.3;const u=Math.min(this.combo/10,1),e=parseFloat(getComputedStyle(this).getPropertyValue("--gq-scoredisp-font-weight-base").trim()||"700"),i=parseFloat(getComputedStyle(this).getPropertyValue("--gq-scoredisp-font-weight-increment").trim()||"100"),s=parseFloat(getComputedStyle(this).getPropertyValue("--gq-scoredisp-font-weight-max-steps").trim()||"2");this._scoreWeight=e+Math.floor(u*s)*i;const a=getComputedStyle(this).getPropertyValue("--gq-scoredisp-text-color-base").trim()||"#f3f4f6",t=parseFloat(getComputedStyle(this).getPropertyValue("--gq-scoredisp-text-color-combo-hue-offset").trim()||"180"),o=getComputedStyle(this).getPropertyValue("--gq-scoredisp-text-color-combo-saturation").trim()||"80%",l=parseFloat(getComputedStyle(this).getPropertyValue("--gq-scoredisp-text-color-combo-lightness-base").trim()||"90"),r=parseFloat(getComputedStyle(this).getPropertyValue("--gq-scoredisp-text-color-combo-lightness-factor").trim()||"10"),f=parseFloat(getComputedStyle(this).getPropertyValue("--gq-body-bg-combo-hue-base").trim()||"220"),c=l+u*r,h=((f+this.combo*parseFloat(getComputedStyle(this).getPropertyValue("--gq-combo-color-hue-increment").trim()||"10"))%360+t)%360;this._scoreColor=this.combo<2?a:`hsl(${h}, ${o}, ${c}%)`}_animateScoreUpdate(u,e){this._scoreAnimationId&&cancelAnimationFrame(this._scoreAnimationId),this._displayScore=u,this._targetScore=e,this._isAnimatingScore=!0;const i=()=>{if(this._targetScore!==this.score){this._scoreAnimationId&&cancelAnimationFrame(this._scoreAnimationId),this._animateScoreUpdate(this._displayScore,this.score);return}const s=this._targetScore-this._displayScore;if(s===0){this._isAnimatingScore=!1,this._scoreAnimationId=null,this.requestUpdate();return}let a=1;const t=Math.abs(s);t>to?a=Math.floor(t/so):t>eo?a=Math.floor(t/no):t>Ja?a=Math.floor(t/oo):t>Za?a=Math.floor(t/ao):t>10&&(a=Math.max(1,Math.floor(t/io))),a=Math.max(1,a),s<0&&(a=-a),Math.abs(a)>t&&(a=s),this._displayScore+=a,this._triggerPerStepEffects(),this.requestUpdate(),this._scoreAnimationId=requestAnimationFrame(i)};this._scoreAnimationId=requestAnimationFrame(i)}_triggerPerStepEffects(){this._scoreTextElement&&(this._scoreTextElement.classList.remove("score-increment-jolt"),this._scoreTextElement.offsetWidth,this._scoreTextElement.classList.add("score-increment-jolt")),this._scorePulseElement&&(this._scorePulseElement.classList.remove("pulsing-step"),this._scorePulseElement.offsetWidth,this._scorePulseElement.classList.add("pulsing-step"))}_triggerPulseAnimation(){this._scorePulseElement&&(this._scorePulseElement.classList.remove("pulsing"),this._scorePulseElement.offsetWidth,this._scorePulseElement.classList.add("pulsing"))}render(){return B`
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
  `;oe([D({type:Number})],J.prototype,"score",2);oe([D({type:Number})],J.prototype,"combo",2);oe([F()],J.prototype,"_flareIntensity",2);oe([F()],J.prototype,"_shouldPulse",2);oe([F()],J.prototype,"_scoreColor",2);oe([F()],J.prototype,"_scoreWeight",2);oe([F()],J.prototype,"_displayScore",2);oe([F()],J.prototype,"_targetScore",2);oe([F()],J.prototype,"_isAnimatingScore",2);oe([ie("#score-text-internal")],J.prototype,"_scoreTextElement",2);oe([ie("#score-pulse-internal")],J.prototype,"_scorePulseElement",2);J=oe([G("score-display")],J);var ro=Object.defineProperty,lo=Object.getOwnPropertyDescriptor,bt=(u,e,i,s)=>{for(var a=s>1?void 0:s?lo(e,i):e,t=u.length-1,o;t>=0;t--)(o=u[t])&&(a=(s?o(e,i,a):o(a))||a);return s&&a&&ro(e,i,a),a};let $e=class extends O{constructor(){super(...arguments),this.lives=3,this.hasShield=!1,this.hintCharges=0}render(){const u=this.hintCharges>0;return B`
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
        ?hidden=${!u}
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
`;bt([D({type:Number})],$e.prototype,"lives",2);bt([D({type:Boolean})],$e.prototype,"hasShield",2);bt([D({type:Number})],$e.prototype,"hintCharges",2);$e=bt([G("lives-display")],$e);var co=Object.defineProperty,po=Object.getOwnPropertyDescriptor,Je=(u,e,i,s)=>{for(var a=s>1?void 0:s?po(e,i):e,t=u.length-1,o;t>=0;t--)(o=u[t])&&(a=(s?o(e,i,a):o(a))||a);return s&&a&&co(e,i,a),a};let Ae=class extends O{constructor(){super(...arguments),this.currentInk=0,this.maxInkPerBar=1e3,this._fullBarsCompleted=0,this._currentBarPercentage=0}updated(u){super.updated(u),(u.has("currentInk")||u.has("maxInkPerBar"))&&(this._calculateBarState(),this.requestUpdate())}_getRainbowColor(u,e){return getComputedStyle(this).getPropertyValue(`--gq-inkbar-rainbow-color-${u+1}`).trim()||e}_calculateBarState(){const u=Math.max(0,this.currentInk),e=this.maxInkPerBar>0?this.maxInkPerBar:1e3;this._fullBarsCompleted=Math.floor(u/e);const i=u%e;u===0?(this._currentBarPercentage=0,this._fullBarsCompleted=0):i===0?(this._currentBarPercentage=100,this._fullBarsCompleted=Math.max(0,Math.floor(u/e)-1)):this._currentBarPercentage=i/e*100}render(){const u=getComputedStyle(this).getPropertyValue("--gq-inkbar-bg-default").trim()||"#374151",e=getComputedStyle(this).getPropertyValue("--gq-inkbar-rainbow-color-1").trim()||"#a78bfa",i=7,s=this._fullBarsCompleted>0?this._getRainbowColor((this._fullBarsCompleted-1)%i,u):u,a=this._getRainbowColor(this._fullBarsCompleted%i,e);return B`
      <style>
        :host {
          /* Estas variables son locales al shadow DOM y se usan por los estilos estáticos */
          --final-container-bg-color: ${s};
          --final-segment-bg-color: ${a};
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
  `;Je([D({type:Number})],Ae.prototype,"currentInk",2);Je([D({type:Number})],Ae.prototype,"maxInkPerBar",2);Je([F()],Ae.prototype,"_fullBarsCompleted",2);Je([F()],Ae.prototype,"_currentBarPercentage",2);Ae=Je([G("ink-bar")],Ae);var ho=Object.defineProperty,uo=Object.getOwnPropertyDescriptor,et=(u,e,i,s)=>{for(var a=s>1?void 0:s?uo(e,i):e,t=u.length-1,o;t>=0;t--)(o=u[t])&&(a=(s?o(e,i,a):o(a))||a);return s&&a&&ho(e,i,a),a};const st={1:{name:"COMÚN",classSuffix:"1"},2:{name:"POCO COMÚN",classSuffix:"2"},3:{name:"RARA",classSuffix:"3"},4:{name:"ÉPICA",classSuffix:"4"},5:{name:"LEGENDARIA",classSuffix:"5"},easy:{name:"FÁCIL",classSuffix:"easy"},medium:{name:"MEDIO",classSuffix:"medium"},hard:{name:"DIFÍCIL",classSuffix:"hard"}};let ke=class extends O{constructor(){super(...arguments),this.difficulty="1",this.questionText="Cargando pregunta...",this._difficultyName=st[1].name,this._difficultyClassSuffix=st[1].classSuffix}updated(u){super.updated(u),u.has("difficulty")&&this._updateDifficultyDisplayData()}_updateDifficultyDisplayData(){const u=st[this.difficulty]||st[1];this._difficultyName=u.name,this._difficultyClassSuffix=u.classSuffix}render(){const u=`difficulty-level-${this._difficultyClassSuffix}`;return B`
          <div class="question-box-internal">
            <div class="card__content">
              <span
                class="difficulty-label ${u}"
                part="difficulty"
              >
                Pregunta: ${this._difficultyName}
              </span>
              <p class="question-text" part="text">
                ${this.questionText}
              </p>
            </div>
          </div>
        `}};ke.styles=V`
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
      `;et([D({type:String})],ke.prototype,"difficulty",2);et([D({type:String})],ke.prototype,"questionText",2);et([F()],ke.prototype,"_difficultyName",2);et([F()],ke.prototype,"_difficultyClassSuffix",2);ke=et([G("quiz-question-display")],ke);var go=Object.defineProperty,fo=Object.getOwnPropertyDescriptor,$t=(u,e,i,s)=>{for(var a=s>1?void 0:s?fo(e,i):e,t=u.length-1,o;t>=0;t--)(o=u[t])&&(a=(s?o(e,i,a):o(a))||a);return s&&a&&go(e,i,a),a};let He=class extends O{constructor(){super(...arguments),this.message="",this.type=null}render(){const u={"feedback-text":!0,correct:this.type==="correct",incorrect:this.type==="incorrect",shield:this.type==="shield",info:this.type==="info"};return B`
      <div class=${zt(u)} part="text">
        ${this.message||""}
      </div>
    `}};He.styles=V`
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
  `;$t([D({type:String})],He.prototype,"message",2);$t([D({type:String})],He.prototype,"type",2);He=$t([G("feedback-area")],He);var mo=Object.defineProperty,vo=Object.getOwnPropertyDescriptor,qi=(u,e,i,s)=>{for(var a=s>1?void 0:s?vo(e,i):e,t=u.length-1,o;t>=0;t--)(o=u[t])&&(a=(s?o(e,i,a):o(a))||a);return s&&a&&mo(e,i,a),a};let ht=class extends O{constructor(){super(...arguments),this.isFaded=!1}render(){return B`
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
    `}};ht.styles=V`
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
  `;qi([D({type:Boolean,reflect:!0})],ht.prototype,"isFaded",2);ht=qi([G("quiz-ui-container")],ht);var bo=Object.defineProperty,yo=Object.getOwnPropertyDescriptor,ye=(u,e,i,s)=>{for(var a=s>1?void 0:s?yo(e,i):e,t=u.length-1,o;t>=0;t--)(o=u[t])&&(a=(s?o(e,i,a):o(a))||a);return s&&a&&bo(e,i,a),a};let de=class extends O{constructor(){super(...arguments),this.explanationText="",this.resultType=null,this.isVisible=!1,this._statusText="",this._statusIcon="",this._statusClass="",this._handleConfirm=u=>{if(!this.isVisible)return;const e=(u instanceof MouseEvent||u instanceof TouchEvent)&&u.target===this,i=u instanceof KeyboardEvent;if(!(!i&&!e)){if(i){const s=u.key;if(s!=="Enter"&&s!==" "&&s!=="Escape")return}u.stopPropagation(),(u.type==="touchstart"||u.type==="click")&&u.preventDefault(),this.dispatchEvent(new CustomEvent("confirm-clicked",{bubbles:!0,composed:!0}))}}}updated(u){super.updated(u),u.has("resultType")&&this._updateStatusContent(),u.has("isVisible")&&(u.get("isVisible"),this.isVisible?this.setAttribute("visible",""):this.removeAttribute("visible"),this._handleVisibilityChange())}_updateStatusContent(){switch(this.resultType){case"correct":this._statusText="¡Respuesta Correcta!",this._statusIcon="✅",this._statusClass="status-correct";break;case"incorrect":this._statusText="Respuesta Incorrecta",this._statusIcon="❌",this._statusClass="status-incorrect";break;case"shield":this._statusText="¡Escudo Activado!",this._statusIcon="🛡️",this._statusClass="status-shield";break;default:this._statusText="",this._statusIcon="",this._statusClass=""}}_handleVisibilityChange(){const u=this._handleConfirm,e=window,i=this;this.isVisible?this.hasAttribute("listeners-added")||(i.addEventListener("click",u),i.addEventListener("touchstart",u,{passive:!1}),e.addEventListener("keydown",u),this.setAttribute("listeners-added","")):this.hasAttribute("listeners-added")&&(i.removeEventListener("click",u),i.removeEventListener("touchstart",u),e.removeEventListener("keydown",u),this.removeAttribute("listeners-added"))}disconnectedCallback(){if(super.disconnectedCallback(),this.hasAttribute("listeners-added")){const u=this._handleConfirm;this.removeEventListener("click",u),this.removeEventListener("touchstart",u),window.removeEventListener("keydown",u),this.removeAttribute("listeners-added")}}render(){const u={"explanation-status-base":!0,[this._statusClass]:!!this._statusClass};return B`
      <div class="overlay-content-wrapper" part="wrapper">
        ${this._statusText?B`
          <p class=${zt(u)} part="status">
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
  `;ye([D({type:String})],de.prototype,"explanationText",2);ye([D({type:String})],de.prototype,"resultType",2);ye([D({type:Boolean})],de.prototype,"isVisible",2);ye([F()],de.prototype,"_statusText",2);ye([F()],de.prototype,"_statusIcon",2);ye([F()],de.prototype,"_statusClass",2);ye([ie(".overlay-content-wrapper")],de.prototype,"_contentWrapper",2);de=ye([G("explanation-overlay-component")],de);const At=1,xo=10,kt=2,Co=10,gi=1,wo=20;class So{constructor(e){this.currentUIElements={},this.optionClickCallback=null,this.explanationConfirmListener=null,this.externalConfirmCallback=null,this.lastShownResultType=null,this.gameManager=e,console.log("UIManager Creado.")}buildQuizInterface(e,i,s,a){var r;if(!e){console.error("UIManager: Intento de construir UI sin pregunta.");return}this.optionClickCallback=s;const t=this.gameManager.getPlayerData();let o=this.currentUIElements.quizUiContainer;if(!o||!i.contains(o)){console.log("[UIManager] Creando nuevo quiz-ui-container y elementos estructurales."),i.innerHTML="",o=document.createElement("quiz-ui-container"),i.appendChild(o),this.currentUIElements={quizUiContainer:o,optionButtons:[]},this.currentUIElements.livesDisplay=document.createElement("lives-display"),this.currentUIElements.livesDisplay.slot="lives-display",o.appendChild(this.currentUIElements.livesDisplay),this.currentUIElements.scoreDisplay=document.createElement("score-display"),this.currentUIElements.scoreDisplay.slot="score-display",o.appendChild(this.currentUIElements.scoreDisplay),this.currentUIElements.inkLabel=document.createElement("div"),this.currentUIElements.inkLabel.id="ink-label",this.currentUIElements.inkLabel.className="ink-label-base hidden",this.currentUIElements.inkLabel.textContent="Tinta",this.currentUIElements.inkLabel.slot="ink-label",o.appendChild(this.currentUIElements.inkLabel),this.currentUIElements.inkBarContainer=document.createElement("ink-bar"),this.currentUIElements.inkBarContainer.classList.add("hidden"),this.currentUIElements.inkBarContainer.slot="ink-bar",o.appendChild(this.currentUIElements.inkBarContainer),this.currentUIElements.questionBox=document.createElement("quiz-question-display"),this.currentUIElements.questionBox.slot="question-display",o.appendChild(this.currentUIElements.questionBox),this.currentUIElements.optionsContainer=document.createElement("div"),this.currentUIElements.optionsContainer.slot="options",this.currentUIElements.optionsContainer.style.display="flex",this.currentUIElements.optionsContainer.style.flexDirection="column";const f=getComputedStyle(document.documentElement).getPropertyValue("--gq-options-gap").trim()||"0.75rem";this.currentUIElements.optionsContainer.style.gap=f,this.currentUIElements.optionsContainer.style.width="100%",o.appendChild(this.currentUIElements.optionsContainer),this.currentUIElements.feedbackArea=document.createElement("feedback-area"),this.currentUIElements.feedbackArea.slot="feedback-area",o.appendChild(this.currentUIElements.feedbackArea),this.currentUIElements.explanationOverlayComponent=document.getElementById("explanation-overlay-component"),this.currentUIElements.blurBackdrop=document.getElementById("blur-backdrop")}else console.log("[UIManager] Reutilizando quiz-ui-container existente.");if(this.currentUIElements.livesDisplay&&(this.currentUIElements.livesDisplay.lives=this.gameManager.getLives(),this.currentUIElements.livesDisplay.hasShield=t.hasShield,this.currentUIElements.livesDisplay.hintCharges=t.hintCharges),this.currentUIElements.scoreDisplay&&(this.currentUIElements.scoreDisplay.score=t.score,this.currentUIElements.scoreDisplay.combo=a),this.currentUIElements.inkBarContainer&&(this.currentUIElements.inkBarContainer.currentInk=t.currentInk,this.currentUIElements.inkBarContainer.maxInkPerBar=t.INK_BAR_CAPACITY),this.currentUIElements.inkLabel&&this.updateInkVisibility(t.isDrawingUnlocked),this.currentUIElements.questionBox?(this.currentUIElements.questionBox.difficulty=e.difficulty,this.currentUIElements.questionBox.questionText=e.text):console.error("UIManager: Referencia a questionBox no encontrada."),this.currentUIElements.optionsContainer){this.currentUIElements.optionsContainer.innerHTML="",this.currentUIElements.optionButtons=[];const f=[...e.options];for(let c=f.length-1;c>0;c--){const g=Math.floor(Math.random()*(c+1));[f[c],f[g]]=[f[g],f[c]]}f.forEach(c=>{if(!(c!=null&&c.key)||typeof c.text>"u"){console.warn("Opción de pregunta inválida:",c);return}const g=document.createElement("quiz-option-button");g.optionKey=c.key,g.optionText=c.text,g.disabled=!1,g.hinted=!1,g.addEventListener("option-selected",h=>{var d;const n=h;this.optionClickCallback&&((d=n.detail)!=null&&d.key)&&this.optionClickCallback(n.detail.key)}),this.currentUIElements.optionsContainer.appendChild(g),this.currentUIElements.optionButtons.push(g)})}else console.error("UIManager: Contenedor de opciones no encontrado.");this.currentUIElements.feedbackArea&&this.updateFeedback("",null),this.updateComboVisuals(a),this.updateCatFoodBar(t.currentCatFood,t.getMaxCatFood()),this.toggleCatFoodUIVisibility(t.isCatFoodUnlocked);const l=(r=this.gameManager.getThemeManager())==null?void 0:r.getActiveTheme();this.applyThemeStylesToNonLitElements(l?l.elements:null)}applyThemeStylesToNonLitElements(e){const i=this.currentUIElements.inkLabel;if(i&&(e!=null&&e.inkLabel)){const s=e.inkLabel;if(s.themeClass){i.className="ink-label-base";const a=i.classList.contains("hidden");s.themeClass.split(" ").filter(t=>t).forEach(t=>{i.classList.contains(t)||i.classList.add(t)}),a&&i.classList.add("hidden")}s.text!==void 0&&i.textContent!==s.text&&(i.textContent=s.text),this.updateInkVisibility(this.gameManager.getPlayerData().isDrawingUnlocked)}}clearQuizInterface(e){console.log("[UIManager] clearQuizInterface llamado (limpieza parcial)."),this.removeExplanationListener(),this.optionClickCallback=null,this.currentUIElements.optionsContainer?(this.currentUIElements.optionsContainer.innerHTML="",console.log("[UIManager] Contenedor de opciones limpiado.")):console.warn("[UIManager] optionsContainer no encontrado en clearQuizInterface."),this.currentUIElements.optionButtons=[],this.currentUIElements.feedbackArea&&(this.updateFeedback("",null),console.log("[UIManager] Área de feedback reseteada."))}updateComboVisuals(e){var E;const i=document.documentElement,s=document.querySelector("combo-counter"),a=(E=this.currentUIElements)==null?void 0:E.scoreDisplay;if(!i)return;const t=e<At?0:Math.min((e-At+1)/(xo-At+1),1);i.style.setProperty("--flare-intensity",t.toFixed(3));const o=e<kt?0:Math.min((e-kt+1)/(Co-kt+1),1);i.style.setProperty("--element-glow-intensity",o.toFixed(3)),s&&(s.combo=e),a&&(a.combo=e);const l=Math.min(Math.max(0,e-gi)/(wo-gi),1),r=l*l,f=getComputedStyle(i),c=parseFloat(f.getPropertyValue("--gq-body-bg-combo-hue-base").trim()||"220"),g=parseFloat(f.getPropertyValue("--gq-body-bg-combo-saturation-base").trim()||"30"),h=parseFloat(f.getPropertyValue("--gq-body-bg-combo-saturation-factor").trim()||"50"),n=parseFloat(f.getPropertyValue("--gq-body-bg-combo-lightness-base").trim()||"10"),d=parseFloat(f.getPropertyValue("--gq-body-bg-combo-lightness-factor").trim()||"15"),p=parseFloat(f.getPropertyValue("--gq-combo-color-hue-increment").trim()||"10"),m=(c+e*p)%360,b=g+r*h,S=n+r*d;document.body.style.backgroundColor=`hsl(${m.toFixed(0)}, ${b.toFixed(0)}%, ${S.toFixed(0)}%)`}updateScoreDisplay(e){var i,s;(s=(i=this.currentUIElements)==null?void 0:i.scoreDisplay)==null||s.setAttribute("score",e.toString())}updateLivesDisplay(e){var i,s;(s=(i=this.currentUIElements)==null?void 0:i.livesDisplay)==null||s.setAttribute("lives",e.toString())}updateShieldIcon(e){var i,s;(s=(i=this.currentUIElements)==null?void 0:i.livesDisplay)==null||s.toggleAttribute("hasShield",e)}updateHintIcon(e){var i,s;(s=(i=this.currentUIElements)==null?void 0:i.livesDisplay)==null||s.setAttribute("hintCharges",e.toString())}updateInkBar(){var i;const e=(i=this.currentUIElements)==null?void 0:i.inkBarContainer;e&&(e.currentInk=this.gameManager.getPlayerData().currentInk)}updateInkVisibility(e){var i,s,a,t;(s=(i=this.currentUIElements)==null?void 0:i.inkLabel)==null||s.classList.toggle("hidden",!e),(t=(a=this.currentUIElements)==null?void 0:a.inkBarContainer)==null||t.classList.toggle("hidden",!e)}updateDifficultyLabel(e){var i,s;(s=(i=this.currentUIElements)==null?void 0:i.questionBox)==null||s.setAttribute("difficulty",String(e))}updateFeedback(e,i){var a;const s=(a=this.currentUIElements)==null?void 0:a.feedbackArea;s&&(s.message=e,s.type=i),this.lastShownResultType=i}disableOptions(){var e;(e=this.currentUIElements.optionButtons)==null||e.forEach(i=>{i&&(i.disabled=!0)})}enableOptions(){var e;(e=this.currentUIElements.optionButtons)==null||e.forEach(i=>{i&&(i.disabled=i.hinted)})}applyHintVisuals(e){let i=0;const s=1,a=this.currentUIElements.optionButtons;if(!a||a.length<=1)return;[...a].sort(()=>.5-Math.random()).forEach(o=>{i>=s||o&&o.optionKey!==e&&!o.hinted&&(o.hinted=!0,i++)})}toggleCatFoodUIVisibility(e){const i=this.gameManager.getControlElements().catFoodUiContainer;i&&i.classList.toggle("hidden",!e)}updateCatFoodBar(e,i){const s=this.gameManager.getControlElements().catFoodToolButton;if(s){const a=i>0?Math.max(0,Math.min(100,e/i*100)):0;s.progressPercentage=a}}showExplanation(e,i,s){var o,l;console.log("[UIManager] showExplanation llamada.");const a=(o=this.currentUIElements)==null?void 0:o.explanationOverlayComponent,t=(l=this.currentUIElements)==null?void 0:l.blurBackdrop;if(a){this.externalConfirmCallback=i;const r=s==="info"||s===void 0?null:s;a.explanationText=e,a.resultType=r,a.isVisible=!0,console.log("[UIManager] Añadiendo listener 'confirm-clicked' a overlayComponent..."),this.addExplanationListener(a),t?t.visible=!0:console.warn("[UIManager] BackdropComponent no encontrado al intentar hacerlo visible."),console.log("[UIManager] showExplanation: Propiedad isVisible del overlay establecida a true.")}else console.warn("UIManager: Componente de explicación no encontrado, confirmando directamente."),i()}hideExplanation(){var a,t,o;console.log("[UIManager] --> hideExplanation() LLAMADA <--");const e=(a=this.currentUIElements)==null?void 0:a.explanationOverlayComponent,i=(t=this.currentUIElements)==null?void 0:t.blurBackdrop;console.log("[UIManager] hideExplanation: Removiendo listener..."),this.removeExplanationListener();const s=((o=this.gameManager.getShopManager())==null?void 0:o.isShopOpen())??!1;i&&!s?(console.log("[UIManager] hideExplanation: Estableciendo backdrop.visible = false"),i.visible=!1):i?s&&console.log("[UIManager] hideExplanation: No ocultando backdrop porque la tienda está visible."):console.warn("[UIManager] hideExplanation: backdropComponent no encontrado."),e?e.isVisible=!1:console.warn("[UIManager] hideExplanation: overlayComponent no encontrado."),console.log("[UIManager] hideExplanation FINALIZADA.")}addExplanationListener(e){if(this.removeExplanationListener(),!e||!this.externalConfirmCallback){console.warn("[UIManager] No se pudo añadir listener: overlayComponent o externalConfirmCallback es null.");return}this.explanationConfirmListener=()=>{if(console.log("[UIManager] >> LISTENER 'confirm-clicked' RECIBIDO <<"),this.externalConfirmCallback)try{console.log("[UIManager] Llamando a externalConfirmCallback..."),this.externalConfirmCallback(),console.log("[UIManager] externalConfirmCallback finalizado.")}catch(i){console.error("[UIManager] Error en callback onConfirm:",i)}else console.warn("[UIManager] 'confirm-clicked' recibido pero externalConfirmCallback es null.");this.hideExplanation()},e.addEventListener("confirm-clicked",this.explanationConfirmListener),console.log("[UIManager] Listener 'confirm-clicked' AÑADIDO a:",e.id)}removeExplanationListener(){var i;const e=(i=this.currentUIElements)==null?void 0:i.explanationOverlayComponent;e&&this.explanationConfirmListener&&(e.removeEventListener("confirm-clicked",this.explanationConfirmListener),console.log("[UIManager] Listener 'confirm-clicked' REMOVIDO de:",e.id)),this.explanationConfirmListener=null}isExplanationVisible(){var i;const e=(i=this.currentUIElements)==null?void 0:i.explanationOverlayComponent;return(e==null?void 0:e.isVisible)??!1}rebuildInterface(){console.log("[UIManager] rebuildInterface llamado.");const e=this.gameManager.getCurrentState();if(e instanceof Ce&&e.currentQuestion){const i=this.gameManager.getContainerElement();if(i){const s=this.isExplanationVisible(),a=this.externalConfirmCallback,t=this.lastShownResultType;if(console.log("[UIManager] Reconstruyendo: Llamando a buildQuizInterface..."),this.buildQuizInterface(e.currentQuestion,i,e.handleOptionClick.bind(e),e.consecutiveCorrectAnswers),e.hintAppliedToQuestionId===e.currentQuestion.id&&this.gameManager.getPlayerData().hintCharges>0&&(this.applyHintVisuals(e.currentQuestion.correctAnswerKey),console.log("[UIManager] Reconstruyendo: Estado de pista reaplicado.")),s&&e.currentQuestion.explanation){console.log("[UIManager] Reconstruyendo: Restaurando explicación visible.");const l=a??(()=>{console.warn("[UIManager] Callback por defecto ejecutado al reconstruir interfaz con expl visible.");const r=this.gameManager.getStateMachine().getCurrentState();r instanceof Ce&&r.proceedToNextStep()});this.showExplanation(e.currentQuestion.explanation,l,t)}else console.log("[UIManager] Reconstruyendo: No se necesita restaurar explicación.");console.log("[UIManager] rebuildInterface finalizado.")}else console.error("[UIManager] rebuildInterface: appContainer no encontrado.")}else console.warn("[UIManager] rebuildInterface: No en QuizGameplayState o sin pregunta actual.")}}class Mo{constructor(e="body"){this.themes=[],this.activeThemeIndex=0,this.defaultThemeId="default-clean",this.isLoading=!1,this.lastError=null,this.rootElement=document.body,this.masterCssVariableList=[],console.log("ThemeManager Creado.");const i=document.querySelector(e);i instanceof HTMLElement?this.rootElement=i:(console.warn(`ThemeManager: Elemento raíz '${e}' no encontrado, usando document.body.`),this.rootElement=document.body)}async loadThemesData(e){if(this.isLoading)return console.warn("ThemeManager: Ya hay una carga en progreso."),!1;console.log("ThemeManager: Procesando datos de temas pre-cargados..."),this.isLoading=!0,this.lastError=null,this.themes=[];try{if(!Array.isArray(e)||e.length===0)throw new Error("Los datos de temas proporcionados no son un array válido o están vacíos.");for(const s of e){if(!s.id||!s.name||!s.cssVariables||typeof s.cssVariables!="object"){console.warn("ThemeManager: Tema inválido o sin cssVariables, omitiendo:",s);continue}this.themes.push(s)}if(this.themes.length===0)throw new Error("No se cargaron temas válidos (todos carecían de cssVariables).");const i=this.themes.find(s=>s.id===this.defaultThemeId)||this.themes[0];return i!=null&&i.cssVariables?(this.masterCssVariableList=Object.keys(i.cssVariables),console.log(`ThemeManager: Lista maestra de ${this.masterCssVariableList.length} variables CSS generada desde el tema '${i.id}'.`)):console.warn("ThemeManager: No se pudo generar la lista maestra de variables CSS (primer tema válido sin cssVariables)."),this.activeThemeIndex=Math.max(0,this.themes.findIndex(s=>s.id===this.defaultThemeId)),this.themes.findIndex(s=>s.id===this.defaultThemeId)===-1&&this.themes.length>0&&(console.warn(`ThemeManager: Tema por defecto '${this.defaultThemeId}' no encontrado. Usando el primer tema de la lista.`),this.activeThemeIndex=0),console.log(`ThemeManager: ${this.themes.length} temas procesados exitosamente.`),this.isLoading=!1,this.applyActiveTheme(),!0}catch(i){return console.error("ThemeManager: Error al procesar los datos de temas:",i),this.lastError=i instanceof Error?i.message:String(i),this.isLoading=!1,this.themes=[],this.activeThemeIndex=0,!1}}applyActiveTheme(){const e=this.getActiveTheme();this._applyThemeCssVariables(e),this._applyRootThemeClass(e),this._dispatchThemeChangedEvent(e)}_applyThemeCssVariables(e){for(const i of this.masterCssVariableList)this.rootElement.style.removeProperty(i);if(e!=null&&e.cssVariables){console.log(`ThemeManager: Aplicando ${Object.keys(e.cssVariables).length} variables CSS para el tema '${e.id}'.`);for(const[i,s]of Object.entries(e.cssVariables))this.rootElement.style.setProperty(i,s)}else console.log("ThemeManager: No hay variables CSS para aplicar (tema null o sin cssVariables), se usarán fallbacks de componentes.")}_applyRootThemeClass(e){var s,a;this.rootElement.className.split(" ").forEach(t=>{t.startsWith("theme-id-")&&this.rootElement.classList.remove(t)});const i=(a=(s=e==null?void 0:e.elements)==null?void 0:s.quizWrapper)==null?void 0:a.themeClass;i&&(this.rootElement.classList.add(i),console.log(`ThemeManager: Clase de tema global '${i}' aplicada a ${this.rootElement.tagName}.`))}_dispatchThemeChangedEvent(e){const i=new CustomEvent("theme-changed",{detail:{themeId:e==null?void 0:e.id,theme:e},bubbles:!0,composed:!0});document.dispatchEvent(i),console.log(`ThemeManager: Evento 'theme-changed' despachado para el tema '${(e==null?void 0:e.id)??"null"}'.`)}getActiveTheme(){return this.themes.length===0?null:this.themes[this.activeThemeIndex]??null}getActiveThemeId(){var e;return((e=this.getActiveTheme())==null?void 0:e.id)??null}cycleTheme(){if(this.themes.length<=1)return;this.activeThemeIndex=(this.activeThemeIndex+1)%this.themes.length,this.applyActiveTheme();const e=this.getActiveTheme();console.log(`ThemeManager: Tema ciclado a '${(e==null?void 0:e.name)??"N/A"}' (ID: ${(e==null?void 0:e.id)??"N/A"})`)}setActiveTheme(e){var s;const i=this.themes.findIndex(a=>a.id===e);return i!==-1?(this.activeThemeIndex===i||(this.activeThemeIndex=i,this.applyActiveTheme(),console.log(`ThemeManager: Tema establecido a '${(s=this.getActiveTheme())==null?void 0:s.name}' (ID: ${e})`)),!0):(console.warn(`ThemeManager: No se encontró el tema con ID '${e}'.`),!1)}getThemes(){return[...this.themes]}getLastError(){return this.lastError}isLoadingThemes(){return this.isLoading}}var Eo=Object.getOwnPropertyDescriptor,Io=(u,e,i,s)=>{for(var a=s>1?void 0:s?Eo(e,i):e,t=u.length-1,o;t>=0;t--)(o=u[t])&&(a=o(a)||a);return a};let Pt=class extends O{render(){return B``}};Pt.styles=V`
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
  `;Pt=Io([G("food-pellet-display")],Pt);const fi=8,qo=3500,Ao=8,ko=2,Po=4e-4,To=500*500,Lo=1,_o=300;class Do{constructor(e){this.isInitializedSuccessfully=!1,this.isEnabled=!1,this.isActive=!1,this.activePellets=new Map,this.nextPelletId=0,this.clickListener=null,this.lastToggleTime=0,this.CATFOOD_TOGGLE_DEBOUNCE=200,this.gameManager=e}setCatDisplayArea(e){if(!e)throw console.error("CatFoodManager CRITICAL: Se intentó setear un CatDisplayArea nulo."),new Error("CatDisplayArea es nulo y es requerido por CatFoodManager.");this.catDisplayArea=e}init(){this.isInitializedSuccessfully=!1;try{if(this.physicsManager=this.gameManager.getPhysicsManager(),this.playerData=this.gameManager.getPlayerData(),this.catManager=this.gameManager.getCatManager(),this.audioManager=this.gameManager.getAudioManager(),!this.catDisplayArea)throw new Error("CatDisplayArea no ha sido seteado en CatFoodManager.");if(!this.physicsManager)throw new Error("PhysicsManager no disponible en CatFoodManager.");if(!this.playerData)throw new Error("PlayerData no disponible en CatFoodManager.");if(!this.catManager)throw new Error("CatManager no disponible en CatFoodManager.");if(!this.audioManager)throw new Error("AudioManager no disponible en CatFoodManager.");this.isInitializedSuccessfully=!0}catch(e){console.error("CatFoodManager: Error CRÍTICO durante la inicialización de dependencias:",e),this.isEnabled=!1}}enable(){if(!this.isInitializedSuccessfully){console.error("CatFoodManager: No se puede habilitar, la inicialización falló o las dependencias no están listas.");return}this.isEnabled||(this.isEnabled=!0,console.log("CatFoodManager: Funcionalidad de comida para gatos habilitada."))}toggleActive(e){if(!this.isEnabled||!this.isInitializedSuccessfully||!this.playerData)return;const i=Date.now();if(e===void 0&&i-this.lastToggleTime<this.CATFOOD_TOGGLE_DEBOUNCE)return;this.lastToggleTime=i;const s=e!==void 0?e:!this.isActive;if(s===!0&&this.playerData.currentCatFood<=0){this.isActive&&(this.isActive=!1,this.gameManager.setQuizUiFaded(!1),this.updateListenerAndCursor(),this.gameManager.updateToolButtonStates());return}s!==this.isActive&&(this.isActive=s,this.gameManager.setQuizUiFaded(this.isActive),this.updateListenerAndCursor(),this.gameManager.updateToolButtonStates())}updateListenerAndCursor(){this.catDisplayArea&&(this.catDisplayArea.style.cursor=this.isActive?"copy":""),this.isActive?this.addClickListener():this.removeClickListener()}addClickListener(){if(this.clickListener||!this.isInitializedSuccessfully||!this.catDisplayArea)return;const e=this.catDisplayArea;this.clickListener=i=>{if(!this.isActive||!this.isEnabled||!this.playerData)return;const s=this.catDisplayArea.getInternalContainer();if(!(i.target!==e&&i.target!==s))if(i.preventDefault(),this.playerData.currentCatFood>0){const a=this.getClickPosition(i,e);this.spawnFoodPellet(a),this.applyAttractionForce(a),this.playerData.spendCatFoodUnit()?this.gameManager.updateCatFoodUI():this.toggleActive(!1)}else this.toggleActive(!1)},e.addEventListener("mousedown",this.clickListener),e.addEventListener("touchstart",this.clickListener,{passive:!1})}removeClickListener(){if(!this.clickListener||!this.catDisplayArea)return;const e=this.catDisplayArea;e.removeEventListener("mousedown",this.clickListener),e.removeEventListener("touchstart",this.clickListener),this.clickListener=null,e.style.cursor=""}getClickPosition(e,i){const s=i.getBoundingClientRect();let a=0,t=0;return e instanceof MouseEvent?(a=e.clientX,t=e.clientY):e.touches&&e.touches.length>0?(a=e.touches[0].clientX,t=e.touches[0].clientY):e.changedTouches&&e.changedTouches.length>0&&(a=e.changedTouches[0].clientX,t=e.changedTouches[0].clientY),{x:a-s.left,y:t-s.top}}applyAttractionForce(e){var a;if(!this.catManager||!((a=this.physicsManager)!=null&&a.getWorld))return;const i=this.catManager.getAllCats(),s=this.physicsManager.getWorld();i.forEach(t=>{if(t.physics.body&&!t.physics.body.isStatic&&L.Composite.get(s,t.physics.body.id,"body")){const o=t.physics.body,l=L.Vector.sub(e,o.position),r=L.Vector.magnitudeSquared(l);if(r>1&&r<To){const f=Math.sqrt(r),c=Po*o.mass/(f*.1+1),g=L.Vector.mult(L.Vector.normalise(l),c);try{L.Body.applyForce(o,o.position,g)}catch{}}}})}spawnFoodPellet(e){var l,r;if(!this.isInitializedSuccessfully||!((l=this.physicsManager)!=null&&l.getWorld)||!this.catDisplayArea||!this.playerData){console.warn("CatFoodManager: No se puede crear pellet, no inicializado o faltan dependencias.");return}const i=`food_pellet_entity_${this.nextPelletId++}`,s=parseInt(getComputedStyle(document.documentElement).getPropertyValue("--gq-food-pellet-size").trim())||fi,a=L.Bodies.circle(e.x,e.y,s/2,{label:"foodPellet",isSensor:!0,density:1e-4,frictionAir:.02,collisionFilter:{category:Ao,mask:ko},plugin:{pelletId:i}});try{L.World.add(this.physicsManager.getWorld(),a)}catch(f){console.error("CatFoodManager: Error añadiendo pellet al mundo físico:",f);return}const t=document.createElement("food-pellet-display");t.id=i;const o=s/2;t.style.transform=`translate(${e.x-o}px, ${e.y-o}px)`,t.classList.add("appearing");try{this.catDisplayArea.addEntityElement(t),t.offsetWidth,requestAnimationFrame(()=>{t.classList.remove("appearing"),t.classList.add("spawned")})}catch(f){console.error("CatFoodManager: Error añadiendo pellet visual a catDisplayArea:",f);try{L.World.remove(this.physicsManager.getWorld(),a)}catch{}return}this.activePellets.set(i,{body:a,element:t,creationTime:performance.now(),id:i}),(r=this.audioManager)==null||r.playSound("draw_end")}update(e){if(!this.isEnabled||!this.isInitializedSuccessfully||this.activePellets.size===0)return;const i=performance.now(),s=[];this.activePellets.forEach(a=>{if(i-a.creationTime>qo)s.push(a.id);else if(a.element&&a.body&&a.element.classList.contains("spawned")){const o=(a.element.offsetWidth||parseInt(getComputedStyle(document.documentElement).getPropertyValue("--gq-food-pellet-size").trim())||fi)/2;a.element.style.transform=`translate(${a.body.position.x-o}px, ${a.body.position.y-o}px)`}}),s.forEach(a=>this.removeFoodPellet(a))}removeFoodPellet(e,i=!1){var a;const s=this.activePellets.get(e);if(s){if((a=this.physicsManager)!=null&&a.getWorld&&s.body)try{L.Composite.get(this.physicsManager.getWorld(),s.body.id,"body")&&L.World.remove(this.physicsManager.getWorld(),s.body)}catch{}this.catDisplayArea&&s.element&&this.catDisplayArea.removeEntityElement(s.element),this.activePellets.delete(e)}}processCatFoodCollision(e,i){var g,h,n;const s=(g=i.plugin)==null?void 0:g.pelletId;if(!s||!this.activePellets.has(s)||!this.catManager||!this.playerData||!this.audioManager||!((h=this.physicsManager)!=null&&h.getWorld))return;const a=this.catManager.bodyIdToEntityIdMap.get(e);if(!a)return;const t=this.catManager.getCat(a);if(!(t!=null&&t.value)||!t.physics.body||!(((n=t.render)==null?void 0:n.element)instanceof O))return;const o=t.render.element,l=t.value.currentSize,r=this.playerData.getCurrentMaxSizeLimit();let f=Math.min(r,_o,l+Lo);const c=f/l;if(c>1.0001){t.value.currentSize=f;try{if(L.Composite.get(this.physicsManager.getWorld(),t.physics.body.id,"body"))L.Body.scale(t.physics.body,c,c),t.physics.body.plugin&&(t.physics.body.plugin.currentSize=f);else throw new Error("Cuerpo del gato no encontrado en el mundo para escalar");o&&typeof o.size=="number"&&(o.size=f)}catch(d){console.error("CatFoodManager: Error al escalar gato después de comer:",d),t.value.currentSize=l,t.physics.body.plugin&&(t.physics.body.plugin.currentSize=l)}}this.audioManager.playSound("eat"),this.removeFoodPellet(s,!0)}destroy(){this.removeClickListener(),Array.from(this.activePellets.keys()).forEach(i=>this.removeFoodPellet(i)),this.activePellets.clear(),this.isEnabled=!1,this.isActive=!1,this.isInitializedSuccessfully=!1,this.catDisplayArea&&(this.catDisplayArea.style.cursor="")}}class zo{constructor(e){this.gameManager=e}enter(e){console.log("LoadingState: enter",e),this.gameManager.setBodyStateClass("loading")}exit(){console.log("LoadingState: exit")}update(e){}}var $o=Object.defineProperty,Bo=Object.getOwnPropertyDescriptor,re=(u,e,i,s)=>{for(var a=s>1?void 0:s?Bo(e,i):e,t=u.length-1,o;t>=0;t--)(o=u[t])&&(a=(s?o(e,i,a):o(a))||a);return s&&a&&$o(e,i,a),a};let ee=class extends O{constructor(){super(...arguments),this.gameData={title:"GatoQuiz Interactivo",version:"1.0.0",highScore:0,lastScore:0},this.loadingMessages=["Desenredando la diversión...","Preparando las croquetas virtuales...","Afilando las garras para el quiz..."],this._isLoading=!1,this._contentFadingOut=!1,this._currentLoadingMessage="Cargando...",this.sparkleIntervalId=null,this.hasStarted=!1}firstUpdated(u){super.firstUpdated(u),this.shadowRoot&&this.startSparkleEffect(),this.ensureFontsLoaded()}connectedCallback(){if(super.connectedCallback(),typeof CSS<"u"&&CSS.registerProperty)try{CSS.registerProperty({name:"--hue1",syntax:"<angle>",initialValue:"0deg",inherits:!1}),CSS.registerProperty({name:"--hue2",syntax:"<angle>",initialValue:"300deg",inherits:!1})}catch(u){console.warn(" mainMenuScreen: Error registrando @property CSS:",u)}this._selectRandomLoadingMessage()}disconnectedCallback(){super.disconnectedCallback(),this.sparkleIntervalId&&(clearTimeout(this.sparkleIntervalId),this.sparkleIntervalId=null)}_selectRandomLoadingMessage(){if(this.loadingMessages&&this.loadingMessages.length>0){const u=Math.floor(Math.random()*this.loadingMessages.length);this._currentLoadingMessage=this.loadingMessages[u]}else this._currentLoadingMessage="Cargando..."}async _handleScreenClick(u){if(this.hasStarted)return;this.hasStarted=!0,u.type==="touchstart"&&u.preventDefault(),console.log("MainMenuScreen: Click/Tap detectado. Iniciando secuencia de carga..."),this._selectRandomLoadingMessage(),this.sparkleIntervalId&&(clearTimeout(this.sparkleIntervalId),this.sparkleIntervalId=null),this._sparkleContainer&&(this._sparkleContainer.innerHTML=""),this._pawWrapper&&this._pawWrapper.classList.add("content-hidden"),this._titleAmpersand&&this._titleAmpersand.classList.add("content-hidden");const e=500;await new Promise(s=>setTimeout(s,e)),this._loadingMessageContainer&&this._loadingMessageContainer.classList.add("visible"),console.log("MainMenuScreen: Contenido principal oculto, mostrando spinner.");const i=2500;await new Promise(s=>setTimeout(s,i)),console.log("MainMenuScreen: Duración de carga artificial completada. Solicitando inicio del juego."),this.dispatchEvent(new CustomEvent("start-game-requested",{bubbles:!0,composed:!0}))}startSparkleEffect(){const u=()=>{if(!this._sparkleContainer||!this._sparkleSvgTemplate)return;const i=this._sparkleSvgTemplate.cloneNode(!0);i.removeAttribute("id"),i.style.display="block",i.classList.add("sparkle-instance");const s=this.getBoundingClientRect(),a=s.width,t=s.height,o=this._sparkleContainer.appendChild(i.cloneNode(!0)),l=getComputedStyle(o),r=parseFloat(l.width),f=parseFloat(l.height);this._sparkleContainer.removeChild(o);const c=Math.random()*(t-f),g=Math.random()*(a-r);i.style.position="absolute",i.style.top=`${c}px`,i.style.left=`${g}px`,this._sparkleContainer.appendChild(i),setTimeout(()=>{i.parentNode===this._sparkleContainer&&this._sparkleContainer.removeChild(i)},500)},e=()=>{if(!this.isConnected)return;u();const i=Math.random()*150+50;this.sparkleIntervalId=window.setTimeout(e,i)};this.sparkleIntervalId&&clearTimeout(this.sparkleIntervalId),e()}ensureFontsLoaded(){document.fonts&&Promise.all([document.fonts.load("1em Pacifico"),document.fonts.load("1em Geist"),document.fonts.load("1em Poppins")]).then(()=>{}).catch(u=>{console.warn("MainMenuScreen: Error esperando fuentes:",u)})}render(){const u=aa`
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
        ${u}
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
  `;re([D({type:Object})],ee.prototype,"gameData",2);re([D({type:Array})],ee.prototype,"loadingMessages",2);re([F()],ee.prototype,"_isLoading",2);re([F()],ee.prototype,"_contentFadingOut",2);re([F()],ee.prototype,"_currentLoadingMessage",2);re([ie("#sparkle-container-internal")],ee.prototype,"_sparkleContainer",2);re([ie("#sparkle-svg-template-internal")],ee.prototype,"_sparkleSvgTemplate",2);re([ie(".paw-wrapper")],ee.prototype,"_pawWrapper",2);re([ie(".title-ampersand")],ee.prototype,"_titleAmpersand",2);re([ie(".loading-message-container")],ee.prototype,"_loadingMessageContainer",2);ee=re([G("main-menu-screen")],ee);class mi{constructor(e){this.startListener=null,this.containerElement=null,this.gameManager=e}enter(e){if(console.log("MainMenuState: enter",e),this.gameManager.setBodyStateClass("mainmenu-whiskers"),this.containerElement=this.gameManager.getContainerElement(),!this.containerElement){console.error("MainMenuState: Contenedor principal #app no encontrado.");return}this.containerElement.innerHTML="";const i=document.createElement("main-menu-screen");i.loadingMessages=this.gameManager.getLoadingMessages(),this.containerElement.appendChild(i),i?(this.startListener=()=>{console.log("MainMenuState: Evento 'start-game-requested' recibido desde <main-menu-screen>."),this.gameManager.getAudioManager().playSound("ui_confirm"),this.removeStartListeners(),this.gameManager.start(),console.log("MainMenuState: Iniciando transición con BARRIDO a QuizGameplay..."),this.gameManager.getStateMachine().changeState("QuizGameplay",void 0,"gq-wipe-transition")},i.addEventListener("start-game-requested",this.startListener,{once:!0}),console.log("MainMenuState: Listener 'start-game-requested' añadido a <main-menu-screen>.")):console.error("MainMenuState: Error al encontrar <main-menu-screen> después de añadirlo al DOM.")}removeStartListeners(){var i;const e=(i=this.containerElement)==null?void 0:i.querySelector("main-menu-screen");e&&this.startListener&&(e.removeEventListener("start-game-requested",this.startListener),console.log("MainMenuState: Listener 'start-game-requested' removido de <main-menu-screen>.")),this.startListener=null}exit(){console.log("MainMenuState: exit"),this.removeStartListeners(),this.containerElement&&(this.containerElement.style.cursor="")}update(e){}getPreferredExitAnimation(){return"gq-wipe-transition"}getPreferredEnterAnimation(){return"gq-wipe-transition"}}var Oo=Object.defineProperty,Ro=Object.getOwnPropertyDescriptor,tt=(u,e,i,s)=>{for(var a=s>1?void 0:s?Ro(e,i):e,t=u.length-1,o;t>=0;t--)(o=u[t])&&(a=(s?o(e,i,a):o(a))||a);return s&&a&&Oo(e,i,a),a};let Pe=class extends O{constructor(){super(...arguments),this.finalScore=0,this.correctAnswers=0,this.totalQuestions=0,this.isNewHighScore=!1}_handleContinueClick(){this.dispatchEvent(new CustomEvent("continue-requested",{bubbles:!0,composed:!0}))}render(){const u=this.totalQuestions>0?(this.correctAnswers/this.totalQuestions*100).toFixed(0):0;return B`
      <h1 class="results-title">Resultados</h1>
      <div class="stats-container">
        <div class="stat-item">
          <span class="stat-label">Puntaje Final</span>
          <span class="stat-value score">${this.finalScore}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Precisión</span>
          <span class="stat-value accuracy">${u}%</span>
          <span class="stat-label" style="font-size: 0.8rem; color: #6b7280;">(${this.correctAnswers} / ${this.totalQuestions})</span>
        </div>
      </div>
      ${this.isNewHighScore?B`
        <span class="new-highscore-indicator">¡Nuevo Récord! 🏆</span>
      `:""}
      <button class="action-button continue-button" @click=${this._handleContinueClick}>
        Continuar
      </button>
    `}};Pe.styles=V`
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
  `;tt([D({type:Number})],Pe.prototype,"finalScore",2);tt([D({type:Number})],Pe.prototype,"correctAnswers",2);tt([D({type:Number})],Pe.prototype,"totalQuestions",2);tt([D({type:Boolean})],Pe.prototype,"isNewHighScore",2);Pe=tt([G("results-screen")],Pe);class Fo{constructor(e){this.finalScore=0,this.correctAnswers=0,this.totalQuestions=0,this.isNewHighScore=!1,this.resultsScreenElement=null,this.continueHandler=null,this.gameManager=e}enter(e){console.log("ResultsState: enter",e),this.finalScore=(e==null?void 0:e.score)??0,this.correctAnswers=(e==null?void 0:e.correct)??0,this.totalQuestions=(e==null?void 0:e.total)??0,this.isNewHighScore=(e==null?void 0:e.isNewHighScore)??!1,this.gameManager.setBodyStateClass("results");const i=this.gameManager.getContainerElement();if(!i){console.error("ResultsState: Contenedor principal no encontrado.");return}i.innerHTML="",this.resultsScreenElement=document.createElement("results-screen"),this.resultsScreenElement.finalScore=this.finalScore,this.resultsScreenElement.correctAnswers=this.correctAnswers,this.resultsScreenElement.totalQuestions=this.totalQuestions,this.resultsScreenElement.isNewHighScore=this.isNewHighScore,this.continueHandler=()=>{console.log("ResultsState: Evento 'continue-requested' recibido."),this.gameManager.getAudioManager().playSound("ui_confirm"),this.gameManager.create()},this.resultsScreenElement.addEventListener("continue-requested",this.continueHandler),i.appendChild(this.resultsScreenElement),this.gameManager.getAudioManager().playSound("level_complete")}exit(){console.log("ResultsState: exit"),this.resultsScreenElement&&this.continueHandler&&this.resultsScreenElement.removeEventListener("continue-requested",this.continueHandler),this.resultsScreenElement=null,this.continueHandler=null}update(e){}}var Uo=Object.defineProperty,No=Object.getOwnPropertyDescriptor,Bt=(u,e,i,s)=>{for(var a=s>1?void 0:s?No(e,i):e,t=u.length-1,o;t>=0;t--)(o=u[t])&&(a=(s?o(e,i,a):o(a))||a);return s&&a&&Uo(e,i,a),a};let We=class extends O{constructor(){super(...arguments),this.finalScore=0,this.isNewHighScore=!1}_handleRestartClick(){this.dispatchEvent(new CustomEvent("restart-game-requested",{bubbles:!0,composed:!0}))}_handleMenuClick(){this.dispatchEvent(new CustomEvent("main-menu-requested",{bubbles:!0,composed:!0}))}render(){return B`
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
    `}};We.styles=V`
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
  `;Bt([D({type:Number})],We.prototype,"finalScore",2);Bt([D({type:Boolean})],We.prototype,"isNewHighScore",2);We=Bt([G("game-over-screen")],We);class Vo{constructor(e){this.finalScore=0,this.isNewHighScore=!1,this.gameOverScreenElement=null,this.restartHandler=null,this.gameManager=e}enter(e){console.log("GameOverState: enter",e),this.finalScore=(e==null?void 0:e.score)??0,this.isNewHighScore=(e==null?void 0:e.isNewHighScore)??!1,this.gameManager.setBodyStateClass("gameover");const i=this.gameManager.getContainerElement();if(!i){console.error("GameOverState: Contenedor principal no encontrado.");return}i.innerHTML="",this.gameOverScreenElement=document.createElement("game-over-screen"),this.gameOverScreenElement.finalScore=this.finalScore,this.gameOverScreenElement.isNewHighScore=this.isNewHighScore,this.restartHandler=()=>{console.log("GameOverState: Evento 'restart-game-requested' recibido. Forzando recarga de página."),this.gameManager.getAudioManager().playSound("ui_confirm"),window.location.reload()},this.gameOverScreenElement.addEventListener("restart-game-requested",this.restartHandler),i.appendChild(this.gameOverScreenElement),this.gameManager.getAudioManager().playSound("game_over")}exit(){console.log("GameOverState: exit"),this.gameOverScreenElement&&this.restartHandler&&this.gameOverScreenElement.removeEventListener("restart-game-requested",this.restartHandler),this.gameOverScreenElement=null,this.restartHandler=null}update(e){}}var Go=Object.defineProperty,Qo=Object.getOwnPropertyDescriptor,Le=(u,e,i,s)=>{for(var a=s>1?void 0:s?Qo(e,i):e,t=u.length-1,o;t>=0;t--)(o=u[t])&&(a=(s?o(e,i,a):o(a))||a);return s&&a&&Go(e,i,a),a};let ge=class extends O{constructor(){super(),this.toolId="",this.icon="❓",this.titleText="",this.disabled=!1,this.active=!1,this.progressPercentage=0,this._isProcessingInteraction=!1}render(){const u=this.toolId==="cat-food"&&!this.disabled?B`
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
      ${u}
    `}_handleClick(u){u.type==="touchstart"&&u.preventDefault(),!(this._isProcessingInteraction||this.disabled)&&(this._isProcessingInteraction=!0,this.dispatchEvent(new CustomEvent("tool-activated",{detail:{toolId:this.toolId},bubbles:!0,composed:!0})),requestAnimationFrame(()=>{this._isProcessingInteraction=!1}))}};ge.styles=V`
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
  `;Le([D({type:String})],ge.prototype,"toolId",2);Le([D({type:String})],ge.prototype,"icon",2);Le([D({type:String})],ge.prototype,"titleText",2);Le([D({type:Boolean,reflect:!0})],ge.prototype,"disabled",2);Le([D({type:Boolean,reflect:!0})],ge.prototype,"active",2);Le([D({type:Number,attribute:"progress-percentage"})],ge.prototype,"progressPercentage",2);ge=Le([G("tool-button")],ge);var Ho=Object.defineProperty,Wo=Object.getOwnPropertyDescriptor,Ot=(u,e,i,s)=>{for(var a=s>1?void 0:s?Wo(e,i):e,t=u.length-1,o;t>=0;t--)(o=u[t])&&(a=(s?o(e,i,a):o(a))||a);return s&&a&&Ho(e,i,a),a};let je=class extends O{constructor(){super(...arguments),this.combo=0,this._isVisible=!1}updated(u){super.updated(u),u.has("combo")&&this._updateVisuals()}_updateVisuals(){this._isVisible=this.combo>0,this.toggleAttribute("visible",this._isVisible);let u=parseFloat(getComputedStyle(this).getPropertyValue("--gq-combo-font-size-base").trim()||"3.0"),e="transparent";if(this._isVisible){const s=parseFloat(getComputedStyle(this).getPropertyValue("--gq-combo-font-size-increment").trim()||"0.5"),a=Math.min(Math.max(0,this.combo-1),10);u=parseFloat(getComputedStyle(this).getPropertyValue("--gq-combo-font-size-base").trim()||"3.0")+a*s;const t=parseFloat(getComputedStyle(this).getPropertyValue("--gq-combo-color-hue-increment").trim()||"35"),o=getComputedStyle(this).getPropertyValue("--gq-combo-color-saturation").trim()||"100%",l=getComputedStyle(this).getPropertyValue("--gq-combo-color-lightness").trim()||"65%";e=`hsl(${this.combo*t%360}, ${o}, ${l})`}this.style.fontSize=`${u}rem`,this.style.color=e}render(){return B`${this._isVisible?`x${this.combo}`:""}`}};je.styles=V`
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
  `;Ot([D({type:Number})],je.prototype,"combo",2);Ot([F()],je.prototype,"_isVisible",2);je=Ot([G("combo-counter")],je);var jo=Object.defineProperty,Yo=Object.getOwnPropertyDescriptor,Ai=(u,e,i,s)=>{for(var a=s>1?void 0:s?Yo(e,i):e,t=u.length-1,o;t>=0;t--)(o=u[t])&&(a=(s?o(e,i,a):o(a))||a);return s&&a&&jo(e,i,a),a};let ut=class extends O{firstUpdated(){this._internalContainer||console.error("CatDisplayArea: El contenedor interno '.entities-host-container' no fue encontrado en el shadow DOM después del primer renderizado.")}addEntityElement(u){this._internalContainer?this._internalContainer.appendChild(u):console.error("CatDisplayArea: _internalContainer no está disponible. No se pudo añadir el elemento:",u)}removeEntityElement(u){var e;this._internalContainer&&this._internalContainer.contains(u)?this._internalContainer.removeChild(u):(e=this.shadowRoot)!=null&&e.contains(u)&&(console.warn("CatDisplayArea: Elemento no encontrado en _internalContainer, intentando remover del shadowRoot."),this.shadowRoot.removeChild(u))}clearAllEntityElements(){this._internalContainer?(this._internalContainer.innerHTML="",console.log("CatDisplayArea: Todos los elementos de entidad han sido limpiados.")):console.warn("CatDisplayArea: _internalContainer no disponible al intentar clearAllEntityElements.")}getInternalContainer(){return this._internalContainer||null}render(){return B`
      <div class="entities-host-container">
        </div>
    `}};ut.styles=V`
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
  `;Ai([ie(".entities-host-container")],ut.prototype,"_internalContainer",2);ut=Ai([G("cat-display-area")],ut);var Ko=Object.defineProperty,Xo=Object.getOwnPropertyDescriptor,Rt=(u,e,i,s)=>{for(var a=s>1?void 0:s?Xo(e,i):e,t=u.length-1,o;t>=0;t--)(o=u[t])&&(a=(s?o(e,i,a):o(a))||a);return s&&a&&Ko(e,i,a),a};let Ye=class extends O{constructor(){super(...arguments),this.titleText="Abrir Tienda (S)",this.disabled=!1}render(){return B`
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
    `}_handleClick(u){u.type==="touchstart"&&u.preventDefault(),!this.disabled&&this.dispatchEvent(new CustomEvent("shop-button-interaction",{bubbles:!0,composed:!0}))}};Ye.styles=V`
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
  `;Rt([D({type:String})],Ye.prototype,"titleText",2);Rt([D({type:Boolean,reflect:!0})],Ye.prototype,"disabled",2);Ye=Rt([G("shop-button-component")],Ye);var Zo=Object.defineProperty,Jo=Object.getOwnPropertyDescriptor,ki=(u,e,i,s)=>{for(var a=s>1?void 0:s?Jo(e,i):e,t=u.length-1,o;t>=0;t--)(o=u[t])&&(a=(s?o(e,i,a):o(a))||a);return s&&a&&Zo(e,i,a),a};const en="sweep-in-tl-to-br",tn="sweep-out-towards-br";let gt=class extends O{constructor(){super(...arguments),this.visible=!1}async playIn(){return console.log("[DiagonalWipe] playIn() INICIADO."),new Promise(u=>{this.classList.remove("animate-out"),this.style.clipPath="polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)",this.visible=!0,this.offsetWidth;const e=i=>{i.animationName===en?(this.removeEventListener("animationend",e),this.style.clipPath="polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",console.log("[DiagonalWipe] playIn() FINALIZADO - Promesa resuelta."),u()):console.log(`[DiagonalWipe] playIn() animationend para OTRA animación: ${i.animationName}`)};this.addEventListener("animationend",e),this.classList.add("animate-in"),console.log('[DiagonalWipe] Clase "animate-in" añadida.')})}async playOut(){return console.log("[DiagonalWipe] playOut() INICIADO."),new Promise(u=>{if(!this.visible){console.log("[DiagonalWipe] playOut() llamado pero no visible, resolviendo inmediatamente."),u();return}this.classList.remove("animate-in"),this.style.clipPath="polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",this.offsetWidth;const e=i=>{i.animationName===tn?(this.removeEventListener("animationend",e),this.reset(),console.log("[DiagonalWipe] playOut() FINALIZADO - Promesa resuelta."),u()):console.log(`[DiagonalWipe] playOut() animationend para OTRA animación: ${i.animationName}`)};this.addEventListener("animationend",e),this.classList.add("animate-out"),console.log('[DiagonalWipe] Clase "animate-out" añadida.')})}reset(){console.log("[DiagonalWipe] reset() llamado."),this.classList.remove("animate-in","animate-out"),this.style.clipPath="polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)",this.visible=!1}render(){return B``}};gt.styles=V`
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
  `;ki([D({type:Boolean,reflect:!0})],gt.prototype,"visible",2);gt=ki([G("diagonal-wipe")],gt);var an=Object.defineProperty,on=Object.getOwnPropertyDescriptor,Pi=(u,e,i,s)=>{for(var a=s>1?void 0:s?on(e,i):e,t=u.length-1,o;t>=0;t--)(o=u[t])&&(a=(s?o(e,i,a):o(a))||a);return s&&a&&an(e,i,a),a};let ft=class extends O{constructor(){super(...arguments),this.visible=!1}render(){return B``}};ft.styles=V`
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
  `;Pi([D({type:Boolean,reflect:!0})],ft.prototype,"visible",2);ft=Pi([G("blur-backdrop-component")],ft);var nn=Object.defineProperty,sn=Object.getOwnPropertyDescriptor,yt=(u,e,i,s)=>{for(var a=s>1?void 0:s?sn(e,i):e,t=u.length-1,o;t>=0;t--)(o=u[t])&&(a=(s?o(e,i,a):o(a))||a);return s&&a&&nn(e,i,a),a};let Be=class extends O{constructor(){super(...arguments),this.titleText="Abrir Opciones (O)",this.disabled=!1,this.icon="⚙️"}render(){return B`
      <button
        class="options-button-internal"
        title=${this.titleText}
        ?disabled=${this.disabled}
        @click=${this._handleClick}
        @touchstart=${this._handleClick}
        part="button"
        aria-label=${this.titleText}
        tabindex="0"
      >
        ${this.icon}
      </button>
    `}_handleClick(u){u.type==="touchstart"&&u.preventDefault(),!this.disabled&&this.dispatchEvent(new CustomEvent("options-button-clicked",{bubbles:!0,composed:!0}))}};Be.styles=V`
    :host {
      position: fixed; /* Posicionamiento fijo */
      /* Por defecto: Esquina superior izquierda */
      top: var(--gq-optionsbtn-pos-top, 0.8rem);
      left: var(--gq-optionsbtn-pos-left, 0.8rem);
      /* Si quisieras que por defecto sea bottom-left, cambiarías 'top' por 'bottom' */
      /* bottom: var(--gq-optionsbtn-pos-bottom, 0.8rem); */
      /* left: var(--gq-optionsbtn-pos-left, 0.8rem); */

      z-index: var(--gq-optionsbtn-z-index, 31); /* Similar a shop-button */
      pointer-events: auto;

      /* Estilos base tomados de tool-button/shop-button */
      display: inline-flex;
      justify-content: center;
      align-items: center;
      width: var(--gq-optionsbtn-size, var(--gq-toolbtn-size, 3rem));
      height: var(--gq-optionsbtn-size, var(--gq-toolbtn-size, 3rem));
      box-sizing: border-box;
      -webkit-tap-highlight-color: transparent;
      cursor: pointer;
      background-color: var(--gq-optionsbtn-bg, var(--gq-toolbtn-bg, rgba(17, 24, 39, 0.8))); /* Variable específica con fallback a toolbtn */
      color: var(--gq-optionsbtn-text-color, var(--gq-toolbtn-text-color, #e5e7eb));
      border: var(--gq-optionsbtn-border, var(--gq-toolbtn-border, 2px solid #4b5563));
      border-radius: var(--gq-optionsbtn-border-radius, var(--gq-toolbtn-border-radius, 0.5rem));
      padding: var(--gq-optionsbtn-padding, var(--gq-toolbtn-padding, 0.5rem));
      font-size: var(--gq-optionsbtn-icon-font-size, var(--gq-toolbtn-font-size, 1.1rem));
      line-height: 1;
      transition: background-color 0.2s ease, border-color 0.2s ease,
                  box-shadow 0.2s ease, transform 0.1s ease,
                  opacity 0.2s ease;
      box-shadow: var(--gq-optionsbtn-box-shadow, var(--gq-toolbtn-box-shadow, 0 2px 4px rgba(0,0,0,0.3)));
    }

    .options-button-internal {
      appearance: none; -webkit-appearance: none; -moz-appearance: none;
      background: transparent; border: none; padding: 0; margin: 0;
      font: inherit; color: inherit; cursor: inherit; outline: none;
      width: 100%; height: 100%; display: flex;
      justify-content: center; align-items: center;
    }

    /* Hover (usando vars específicas con fallback a toolbtn) */
    :host(:not([disabled]):hover) {
      background-color: var(--gq-optionsbtn-hover-bg, var(--gq-toolbtn-hover-bg, rgba(31, 41, 55, 0.9)));
      border-color: var(--gq-optionsbtn-hover-border-color, var(--gq-toolbtn-hover-border-color, #6b7280));
    }

    /* Active (presionado) (usando vars específicas con fallback a toolbtn) */
    :host(:not([disabled]):active) {
      transform: scale(0.95);
      background-color: var(--gq-optionsbtn-pressed-bg, var(--gq-toolbtn-pressed-bg, rgba(55, 65, 81, 0.9)));
    }

    /* Estado deshabilitado (usando vars específicas con fallback a toolbtn) */
    :host([disabled]) {
      opacity: var(--gq-optionsbtn-disabled-opacity, var(--gq-toolbtn-disabled-opacity, 0.5));
      cursor: not-allowed;
      transform: none !important;
      background-color: var(--gq-optionsbtn-disabled-bg, var(--gq-toolbtn-disabled-bg, var(--gq-toolbtn-bg)));
      border-color: var(--gq-optionsbtn-disabled-border-color, var(--gq-toolbtn-disabled-border-color, var(--gq-toolbtn-border)));
    }
     :host([disabled]:hover) {
       background-color: var(--gq-optionsbtn-disabled-bg, var(--gq-toolbtn-disabled-bg, var(--gq-toolbtn-bg)));
       border-color: var(--gq-optionsbtn-disabled-border-color, var(--gq-toolbtn-disabled-border-color));
     }

    /* --- Media Queries para Posicionamiento y Tamaño --- */
    /* Desktop (769px en adelante) - Esquina Superior Izquierda por defecto */
    @media (min-width: 769px) {
      :host {
        width: var(--gq-optionsbtn-desktop-size, var(--gq-toolbtn-desktop-size, 3.5rem));
        height: var(--gq-optionsbtn-desktop-size, var(--gq-toolbtn-desktop-size, 3.5rem));
        font-size: var(--gq-optionsbtn-icon-desktop-font-size, var(--gq-toolbtn-desktop-font-size, 1.2rem));
        padding: var(--gq-optionsbtn-desktop-padding, var(--gq-toolbtn-desktop-padding, 0.6rem));
        
        /* Replicar valores de shopbtn-pos-top-desktop y shopbtn-pos-right-desktop pero para top y left */
        top: var(--gq-optionsbtn-pos-top-desktop, var(--gq-shopbtn-pos-top-desktop, 0.8rem));
        left: var(--gq-optionsbtn-pos-left-desktop, var(--gq-shopbtn-pos-right-desktop, 0.8rem)); /* Usa el valor de 'right' del shop button para 'left' */
        /* Si necesitas que esté en otra esquina, ajusta top/left/bottom/right aquí */
        /* Ejemplo para bottom-left:
        bottom: var(--gq-optionsbtn-pos-bottom-desktop, var(--gq-shopbtn-pos-bottom-desktop, 0.8rem)); 
        left: var(--gq-optionsbtn-pos-left-desktop, var(--gq-shopbtn-pos-right-desktop, 0.8rem));
        top: auto; right: auto; 
        */
      }
    }

    /* Tablet (481px a 768px) - Esquina Superior Izquierda por defecto */
     @media (min-width: 481px) and (max-width: 768px) {
        :host {
            /* Usar valores base o definir vars específicas para tablet */
            width: var(--gq-optionsbtn-tablet-size, var(--gq-toolbtn-size, 3rem));
            height: var(--gq-optionsbtn-tablet-size, var(--gq-toolbtn-size, 3rem));
            font-size: var(--gq-optionsbtn-icon-tablet-font-size, var(--gq-toolbtn-font-size, 1.1rem));
            padding: var(--gq-optionsbtn-tablet-padding, var(--gq-toolbtn-padding, 0.5rem));

            /* Replicar valores de shopbtn-pos-top-tablet y shopbtn-pos-right-tablet pero para top y left */
            top: var(--gq-optionsbtn-pos-top-tablet, var(--gq-shopbtn-pos-top-tablet, 0.6rem));
            left: var(--gq-optionsbtn-pos-left-tablet, var(--gq-shopbtn-pos-right-tablet, 0.6rem));
            /* Ejemplo para bottom-left:
            bottom: var(--gq-optionsbtn-pos-bottom-tablet, var(--gq-shopbtn-pos-bottom-tablet, 0.6rem));
            left: var(--gq-optionsbtn-pos-left-tablet, var(--gq-shopbtn-pos-right-tablet, 0.6rem));
            top: auto; right: auto;
            */
        }
     }

    /* Móvil (hasta 480px) - Esquina Superior Izquierda por defecto */
    @media (max-width: 480px) {
      :host {
        width: var(--gq-optionsbtn-mobile-size, var(--gq-toolbtn-size-mobile, 3rem)); /* Ajustado para coincidir con shop-button */
        height: var(--gq-optionsbtn-mobile-size, var(--gq-toolbtn-size-mobile, 3rem));
        font-size: var(--gq-optionsbtn-icon-mobile-font-size, var(--gq-toolbtn-font-size-mobile, 1.1rem));
        padding: var(--gq-optionsbtn-mobile-padding, var(--gq-toolbtn-padding-mobile, 0.5rem));

        /* Replicar valores de shopbtn-pos-top-mobile y shopbtn-pos-right-mobile pero para top y left */
        top: var(--gq-optionsbtn-pos-top-mobile, var(--gq-shopbtn-pos-top-mobile, 0.1rem));
        left: var(--gq-optionsbtn-pos-left-mobile, var(--gq-shopbtn-pos-right-mobile, 0.1rem));
        /* Ejemplo para bottom-left:
        bottom: var(--gq-optionsbtn-pos-bottom-mobile, var(--gq-shopbtn-pos-bottom-mobile, 0.1rem));
        left: var(--gq-optionsbtn-pos-left-mobile, var(--gq-shopbtn-pos-right-mobile, 0.1rem));
        top: auto; right: auto;
        */
      }
    }
  `;yt([D({type:String})],Be.prototype,"titleText",2);yt([D({type:Boolean,reflect:!0})],Be.prototype,"disabled",2);yt([D({type:String})],Be.prototype,"icon",2);Be=yt([G("options-button-component")],Be);var rn=Object.defineProperty,ln=Object.getOwnPropertyDescriptor,Oe=(u,e,i,s)=>{for(var a=s>1?void 0:s?ln(e,i):e,t=u.length-1,o;t>=0;t--)(o=u[t])&&(a=(s?o(e,i,a):o(a))||a);return s&&a&&rn(e,i,a),a};let be=class extends O{constructor(){super(...arguments),this.isVisible=!1,this.initialVolume=1,this.initiallyMuted=!1,this._currentVolume=1,this._isMuted=!1}updated(u){super.updated(u),u.has("initialVolume")&&(this._currentVolume=this.initialVolume),u.has("initiallyMuted")&&(this._isMuted=this.initiallyMuted)}connectedCallback(){super.connectedCallback(),this.addEventListener("click",this._handleHostClick)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("click",this._handleHostClick)}_handleHostClick(u){u.target===this&&this._closePopup()}_handleVolumeChange(u){var i;const e=u.target;this._currentVolume=parseFloat(e.value),(i=this.audioManagerInstance)==null||i.setVolume(this._currentVolume),this._isMuted&&this._currentVolume>1e-5?this._isMuted=!1:!this._isMuted&&this._currentVolume<=1e-5&&(this._isMuted=!0),this.requestUpdate()}_toggleMute(){if(!this.audioManagerInstance)return;const u=!this._isMuted;this.audioManagerInstance.toggleMute(u),this._isMuted=this.audioManagerInstance.isMuted(),this._isMuted||(this._currentVolume=this.audioManagerInstance.getVolume(),this._currentVolume<=1e-5&&(this.audioManagerInstance.setVolume(.5),this._currentVolume=.5)),this.requestUpdate()}_changeTheme(){var u,e,i;(u=this.themeManagerInstance)==null||u.cycleTheme(),(i=(e=this.gameManagerInstance)==null?void 0:e.getAudioManager())==null||i.playSound("ui_confirm")}_closePopup(){var u,e;this.isVisible&&(this.isVisible=!1,this.dispatchEvent(new CustomEvent("options-close-requested",{bubbles:!0,composed:!0})),(e=(u=this.gameManagerInstance)==null?void 0:u.getAudioManager())==null||e.playSound("ui_cancel"))}render(){return this.isVisible?B`
      <div class="options-popup-content" @click=${u=>u.stopPropagation()}>
        <button class="options-popup-close-btn" @click=${this._closePopup} title="Cerrar Opciones (Esc)" aria-label="Cerrar Opciones">&times;</button>
        <h2 class="options-popup-title">Opciones</h2>

        <div class="option-item">
          <label for="volume-slider">Volumen: ${this._isMuted?"Silenciado":Math.round(this._currentVolume*100)+"%"}</label>
          <input
            type="range"
            id="volume-slider"
            min="0"
            max="1"
            step="0.01"
            .value="${this._isMuted?"0":this._currentVolume.toString()}"
            ?disabled="${this._isMuted}"
            @input="${this._handleVolumeChange}"
            aria-label="Control de volumen"
          />
        </div>

        <div class="option-item">
          <button class="options-button" @click="${this._toggleMute}" aria-pressed="${this._isMuted}">
            ${this._isMuted?"Activar Sonido":"Silenciar"}
          </button>
        </div>

        <div class="option-item">
          <button class="options-button" @click="${this._changeTheme}">
            Cambiar Tema
          </button>
        </div>
      </div>
    `:N}};be.styles=V`
    :host {
      display: none; /* Oculto por defecto */
      position: fixed;
      inset: 0; /* Cubre toda la pantalla */
      justify-content: center;
      align-items: center;
      z-index: 101; /* Encima del backdrop, similar a shop-popup */
      pointer-events: none; /* El host no intercepta por defecto, el contenido sí */
      font-family: var(--gq-font-primary, 'Poppins', sans-serif);
    }
    :host([isVisible]) {
      display: flex;
      pointer-events: auto; /* Cuando es visible, el host puede interceptar para cerrar al hacer clic fuera */
    }

    .options-popup-content {
      /* Variables de tema con fallbacks a las de shop-popup o valores genéricos */
      background-color: var(--gq-options-popup-bg, var(--gq-shop-popup-bg, rgba(30, 40, 55, 0.97)));
      border-radius: var(--gq-options-popup-border-radius, var(--gq-shop-popup-border-radius, 1rem));
      border: var(--gq-options-popup-border, var(--gq-shop-popup-border, 1px solid #5a6b80));
      box-shadow: var(--gq-options-popup-box-shadow, var(--gq-shop-popup-box-shadow, 0 0.5rem 1.5rem rgba(0, 0, 0, 0.5)));
      color: var(--gq-options-popup-text-color, var(--gq-shop-popup-text-color, #dde1e7));
      
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 1.2rem; /* Espacio entre elementos del menú */
      min-width: 280px;
      max-width: calc(100% - 2rem); /* Evita que toque los bordes en pantallas pequeñas */
      pointer-events: auto; /* El contenido sí es interactivo */
      position: relative; /* Para el botón de cierre absoluto */
      box-sizing: border-box;
    }

    .options-popup-title {
      font-size: var(--gq-options-popup-title-font-size, 1.4rem);
      font-weight: var(--gq-options-popup-title-font-weight, 700);
      text-align: center;
      margin: 0 0 0.5rem 0;
      color: var(--gq-options-popup-title-text-color, var(--gq-shop-popup-title-text-color, inherit));
    }

    .options-popup-close-btn {
      position: absolute;
      top: var(--gq-options-popup-close-btn-top, 0.3rem);
      right: var(--gq-options-popup-close-btn-right, 0.6rem);
      background: none;
      border: none;
      color: var(--gq-options-popup-close-btn-text-color, var(--gq-shop-popup-close-btn-text-color, #a0aec0));
      font-size: var(--gq-options-popup-close-btn-font-size, 2.2rem);
      line-height: 1;
      cursor: pointer;
      padding: 0.25rem;
      transition: color 0.2s ease;
    }
    .options-popup-close-btn:hover {
      color: var(--gq-options-popup-close-btn-hover-text-color, var(--gq-shop-popup-close-btn-hover-text-color, #e2e8f0));
    }

    .option-item {
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
    }
    .option-item label {
      font-weight: 600;
      font-size: 0.95rem;
      color: var(--gq-options-popup-label-color, inherit);
    }

    input[type="range"] {
      width: 100%;
      cursor: pointer;
      accent-color: var(--gq-slider-thumb-color, #fb923c); /* Color principal del slider */
      background: transparent; /* Para mejor control de track en algunos navegadores */
    }

    /* Estilos para el track del slider */
    input[type="range"]::-webkit-slider-runnable-track {
      width: 100%;
      height: 0.5rem;
      cursor: pointer;
      background: var(--gq-slider-track-color, #374151);
      border-radius: 0.25rem;
      border: 1px solid var(--gq-slider-track-border-color, #4b5563);
    }
    input[type="range"]::-moz-range-track {
      width: 100%;
      height: 0.5rem;
      cursor: pointer;
      background: var(--gq-slider-track-color, #374151);
      border-radius: 0.25rem;
      border: 1px solid var(--gq-slider-track-border-color, #4b5563);
    }

    /* Estilos para el thumb (la bolita) del slider */
    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 1.2rem;
      height: 1.2rem;
      background: var(--gq-slider-thumb-color, #fb923c);
      border-radius: 50%;
      cursor: pointer;
      margin-top: -0.375rem; /* Ajustar verticalmente: (track_height - thumb_height) / 2  (considerando borde) */
      border: 2px solid var(--gq-slider-thumb-border-color, #f9fafb);
      box-shadow: 0 0 3px rgba(0,0,0,0.3);
    }
    input[type="range"]::-moz-range-thumb {
      width: 1.1rem; /* Ajustar para Firefox si es necesario */
      height: 1.1rem;
      background: var(--gq-slider-thumb-color, #fb923c);
      border-radius: 50%;
      cursor: pointer;
      border: 2px solid var(--gq-slider-thumb-border-color, #f9fafb);
      box-shadow: 0 0 3px rgba(0,0,0,0.3);
    }
    input[type="range"]:focus::-webkit-slider-thumb {
        box-shadow: 0 0 0 3px var(--gq-slider-focus-ring-color, rgba(251, 146, 60, 0.5));
    }
    input[type="range"]:focus::-moz-range-thumb {
        box-shadow: 0 0 0 3px var(--gq-slider-focus-ring-color, rgba(251, 146, 60, 0.5));
    }


    .options-button {
      padding: 0.7rem 1.2rem;
      font-size: 0.95rem;
      font-weight: 600;
      border-radius: var(--gq-options-button-border-radius, var(--gq-opt-btn-border-radius, 0.6rem));
      border: var(--gq-options-button-border, var(--gq-opt-btn-border, none));
      background: var(--gq-options-button-bg, var(--gq-opt-btn-bg, linear-gradient(to right, #4f46e5, #7c3aed)));
      color: var(--gq-options-button-text-color, var(--gq-opt-btn-text-color, #FFFFFF));
      cursor: pointer;
      transition: background-color 0.2s, transform 0.1s, box-shadow 0.2s;
      text-align: center;
      box-shadow: var(--gq-options-button-box-shadow, var(--gq-opt-btn-box-shadow, 0 3px 7px rgba(0,0,0,0.2)));
    }
    .options-button:hover {
      background: var(--gq-options-button-hover-bg, var(--gq-opt-btn-hover-bg, linear-gradient(to right, #6366f1, #8b5cf6)));
      box-shadow: var(--gq-options-button-hover-box-shadow, 0 4px 10px rgba(0,0,0,0.25));
      transform: translateY(-1px);
    }
    .options-button:active {
      transform: translateY(0px) scale(0.98);
      box-shadow: var(--gq-options-button-active-box-shadow, 0 1px 3px rgba(0,0,0,0.2));
    }

    @media (max-width: 480px) {
        .options-popup-content {
            padding: 1rem;
            gap: 1rem;
            min-width: calc(100% - 2rem);
        }
        .options-popup-title {
            font-size: 1.2rem;
        }
        .option-item label {
            font-size: 0.85rem;
        }
        .options-button {
            padding: 0.6rem 1rem;
            font-size: 0.9rem;
        }
    }
  `;Oe([D({type:Boolean,reflect:!0})],be.prototype,"isVisible",2);Oe([D({type:Number})],be.prototype,"initialVolume",2);Oe([D({type:Boolean})],be.prototype,"initiallyMuted",2);Oe([F()],be.prototype,"_currentVolume",2);Oe([F()],be.prototype,"_isMuted",2);be=Oe([G("options-menu-popup")],be);class cn{constructor(e){this.drawingCanvasLayerElement=null,this.gameUiContainer=null,this.diagonalWipeElement=null,this.blurBackdrop=null,this.optionsButtonInstance=null,this.optionsPopupInstance=null,this.lastTimestamp=0,this.isRunning=!1,this.keydownListener=null,this.themeChangeListener=null,this.shopButtonInstance=null,this.shopButtonInteractionListener=null,this.shopCloseRequestListener=null,this.optionsButtonClickListener=null,this.optionsPopupCloseListener=null,this.loadingMessages=["Desenredando la diversión..."],this._lastToolToggleTime=0,this.TOOL_TOGGLE_DEBOUNCE_MS=300,this.setupToolButtonListeners=()=>{var s,a,t;(s=this.controlElements.brushToolButton)==null||s.addEventListener("tool-activated",()=>this.activateBrush()),(a=this.controlElements.clearInkToolButton)==null||a.addEventListener("tool-activated",()=>{this.playerData.isDrawingUnlocked&&this.playerData.inkSpentSinceLastClear>0&&this.inkManager.clearInkLines()}),(t=this.controlElements.catFoodToolButton)==null||t.addEventListener("tool-activated",()=>this.activateCatFood())},this.containerElement=e,this.audioManager=new Gi,this.quizSystem=new Ni,this.playerData=new $a,this.themeManager=new Mo("body"),this.catManager=new wa(this.audioManager,this),this.uiManager=new So(this),this.shopManager=new za(this.playerData,this),this.inkManager=new Ga(this),this.catFoodManager=new Do(this),this.physicsManager=new Ui(this.catManager,this.catFoodManager,this),this.stateMachine=new Vi,this.stateMachine.setAnimationContainer(this.containerElement),this.diagonalWipeElement=document.getElementById("diagonal-wipe-transition-element"),(!this.diagonalWipeElement||!(this.diagonalWipeElement instanceof HTMLElement&&"playIn"in this.diagonalWipeElement))&&(console.error("GameManager CRITICAL: Componente <diagonal-wipe id='diagonal-wipe-transition-element'> no encontrado o inválido."),this.diagonalWipeElement=null),this.stateMachine.setWipeComponent(this.diagonalWipeElement);const i=document.getElementById("cat-display-area-main");if(!i||!(i instanceof HTMLElement&&"clearAllEntityElements"in i))throw console.error("GameManager CRITICAL: <cat-display-area id='cat-display-area-main'> no encontrado o inválido."),new Error("<cat-display-area> no encontrado y es esencial.");this.catDisplayAreaElement=i,this.drawingCanvasLayerElement=document.getElementById("drawing-canvas-layer-main"),this.drawingCanvasLayerElement&&!(this.drawingCanvasLayerElement instanceof HTMLElement&&"resizeCanvas"in this.drawingCanvasLayerElement)&&console.warn("GameManager: drawingCanvasLayerElement no parece ser una instancia válida de DrawingCanvasLayer."),this.catManager.setCatDisplayArea(this.catDisplayAreaElement),this.catFoodManager.setCatDisplayArea(this.catDisplayAreaElement),this.catManager.setPhysicsManager(this.physicsManager),this.inkManager.setPhysicsManager(this.physicsManager),this.controlElements={controlsContainer:document.getElementById("right-controls"),drawingButtonsContainer:document.getElementById("drawing-buttons-container"),catFoodUiContainer:document.getElementById("cat-food-ui-container"),brushToolButton:document.querySelector('tool-button[toolId="brush"]'),clearInkToolButton:document.querySelector('tool-button[toolId="clear-ink"]'),catFoodToolButton:document.querySelector('tool-button[toolId="cat-food"]')},(!this.controlElements.controlsContainer||!this.controlElements.drawingButtonsContainer||!this.controlElements.catFoodUiContainer||!this.controlElements.brushToolButton||!this.controlElements.clearInkToolButton||!this.controlElements.catFoodToolButton)&&console.warn("GameManager: Uno o más elementos de control UI no fueron encontrados en el DOM."),this.setupStates()}setBodyStateClass(e){const i=document.body;i.className.split(" ").forEach(s=>{s.startsWith("state-")&&i.classList.remove(s)}),e&&i.classList.add(`state-${e.toLowerCase()}`)}async init(){this.playerData.reset(),this.physicsManager.init(this.catDisplayAreaElement),this.catFoodManager.init(),this.blurBackdrop=document.getElementById("blur-backdrop"),this.blurBackdrop||console.warn("GameManager (init): Componente <blur-backdrop-component> no encontrado."),this.optionsButtonInstance=document.getElementById("settings-options-button-global"),this.optionsPopupInstance=document.getElementById("options-menu-popup-global"),!this.optionsButtonInstance||!this.optionsPopupInstance?console.error("GameManager (init): No se encontraron los componentes de opciones (botón o popup). La funcionalidad de opciones no estará disponible."):(this.optionsPopupInstance.audioManagerInstance=this.audioManager,this.optionsPopupInstance.themeManagerInstance=this.themeManager,this.optionsPopupInstance.gameManagerInstance=this,console.log("GameManager (init): Instancias de AudioManager y ThemeManager pasadas a OptionsMenuPopup.")),this.shopButtonInstance=document.getElementById("shop-button-global"),this.shopButtonInstance||console.info("GameManager (init): Botón de tienda global no encontrado inicialmente. Se creará si es necesario."),this.hideToolControls(),this.hideShopButton(),this.hideOptionsButton(),this.addThemeChangeListener(),await this.preload(),this.setupToolButtonListeners(),this.addKeyboardListener(),this.setupGlobalUICListeners()}create(){var e;console.log("GameManager: create() - Iniciando reseteo..."),this.quizSystem.resetAvailableQuestions(),this.catManager.removeAllCats(),this.shopManager?(this.shopManager.closeShop(),console.log("GameManager: create() - ShopManager.closeShop() llamado.")):console.warn("GameManager: create() - ShopManager no disponible para cerrar tienda."),(e=this.optionsPopupInstance)!=null&&e.isVisible&&this.closeOptionsMenu(),this.hideToolControls(),this.hideShopButton(),this.hideOptionsButton(),document.querySelector("combo-counter")||document.body.appendChild(document.createElement("combo-counter")),this.stateMachine.changeState("MainMenu",void 0,"gq-wipe-transition"),console.log("GameManager: create() - Reseteo completado, transicionando a MainMenu.")}setupStates(){const e=new zo(this),i=new mi(this),s=new Ce(this),a=new Fo(this),t=new Vo(this),o=(r,f,c,g)=>{const h=r.enter.bind(r);return n=>{try{h(n)}catch(d){console.error(`Error en enter() para ${r.constructor.name}:`,d)}if(r instanceof Ce)this.gameUiContainer=this.containerElement.querySelector("quiz-ui-container");else if(r instanceof mi){const d=this.containerElement.querySelector("main-menu-screen");d&&(d.loadingMessages=this.getLoadingMessages())}f?this.showShopButton():this.hideShopButton(),g?this.showOptionsButton():this.hideOptionsButton(),c?(this.showToolControls(),r instanceof Ce&&this.updateCatFoodUI()):this.hideToolControls(),this.updateGlobalButtonsState()}},l=r=>{const f=r.exit.bind(r);return()=>{try{f()}catch(c){console.error(`Error en exit() para ${r.constructor.name}:`,c)}r instanceof Ce&&(this.gameUiContainer=null)}};e.enter=o(e,!1,!1,!1),e.exit=l(e),i.enter=o(i,!1,!1,!1),i.exit=l(i),s.enter=o(s,!0,!0,!0),s.exit=l(s),a.enter=o(a,!1,!1,!1),a.exit=l(a),t.enter=o(t,!1,!1,!1),this.stateMachine.addState("Loading",e),this.stateMachine.addState("MainMenu",i),this.stateMachine.addState("QuizGameplay",s),this.stateMachine.addState("Results",a),this.stateMachine.addState("GameOver",t),this.stateMachine.addState("__shutdown__",{enter:()=>{this.hideToolControls(),this.hideShopButton(),this.hideOptionsButton()},exit:()=>{},update:()=>{}})}async preload(){const e="/GatoQuizDev/",i=e.endsWith("/")?e.slice(0,-1):e,s={questions:`${i}/data/questions.json`,templates:`${i}/data/cat_templates.json`,shopItems:`${i}/data/shop_items.json`,themes:`${i}/data/themes.json`,loadingMessages:`${i}/data/loading_messages.json`};try{const a=await Promise.all(Object.values(s).map(c=>fetch(c)));a.forEach((c,g)=>{if(!c.ok)throw new Error(`HTTP ${c.status} cargando ${Object.values(s)[g]}`)});const[t,o,l,r,f]=await Promise.all(a.map(c=>c.json()));if(!Array.isArray(t)||!Array.isArray(o)||!Array.isArray(l)||!Array.isArray(r)||!Array.isArray(f))throw new Error("Formato de datos JSON inválido.");if(!await this.quizSystem.loadQuestionsData(t))throw new Error("Fallo al procesar preguntas.");if(this.catManager.loadTemplates(o),this.shopManager.init(l),!await this.themeManager.loadThemesData(r))throw new Error("Fallo al procesar temas.");this.loadingMessages=f,this.loadingMessages.length===0&&(this.loadingMessages=["Cargando michi-diversión..."]),console.log("GameManager: Preload completado exitosamente.")}catch(a){throw console.error("GameManager: Error durante preload:",a),this.containerElement.innerHTML=`Error cargando assets: ${a.message}. Revisa la consola.`,a}}start(){this.isRunning||(this.isRunning=!0,this.lastTimestamp=performance.now(),this.physicsManager.start(),this.gameLoopRequestId=requestAnimationFrame(this.gameLoop.bind(this)),console.log("GameManager: Ciclo de juego iniciado."))}stop(){this.isRunning&&(this.isRunning=!1,this.gameLoopRequestId&&cancelAnimationFrame(this.gameLoopRequestId),this.gameLoopRequestId=void 0,this.physicsManager.stop(),console.log("GameManager: Ciclo de juego detenido."))}gameLoop(e){if(!this.isRunning)return;const i=(e-this.lastTimestamp)/1e3;this.lastTimestamp=e;const s=Math.min(i,.1);this.update(s),this.gameLoopRequestId=requestAnimationFrame(this.gameLoop.bind(this))}update(e){try{this.stateMachine.update(e),this.catManager.updateCats(e),this.catFoodManager.update(e)}catch(i){console.error("Error en gameLoop update:",i),this.stop()}}shutdown(){var i,s,a;console.log("GameManager: Iniciando shutdown..."),this.stop(),this.hideToolControls(),this.hideShopButton(),this.hideOptionsButton(),this.removeKeyboardListener(),this.removeThemeChangeListener(),this.removeGlobalUICListeners(),this.physicsManager.shutdown();const e=this.stateMachine.getCurrentStateName();if(e&&e!=="__shutdown__")try{(i=this.stateMachine.getCurrentState())==null||i.exit()}catch(t){console.warn("Error en exit() del estado durante shutdown:",t)}this.stateMachine.changeState("__shutdown__"),this.catManager.removeAllCats(),this.inkManager.destroy(),this.shopManager.destroy(),this.catFoodManager.destroy(),this.containerElement.innerHTML="",this.gameUiContainer=null,this.setBodyStateClass(null),(s=document.querySelector("combo-counter"))==null||s.remove(),(a=this.diagonalWipeElement)==null||a.reset(),this.blurBackdrop=null,console.log("GameManager: Shutdown completado.")}getUIManager(){if(!this.uiManager)throw new Error("UIManager no inicializado en GameManager.");return this.uiManager}getQuizUiContainerElement(){return(!this.gameUiContainer||!this.containerElement.contains(this.gameUiContainer))&&(this.gameUiContainer=this.containerElement.querySelector("quiz-ui-container")),this.gameUiContainer}setQuizUiFaded(e){const i=this.getQuizUiContainerElement();i&&(i.isFaded=e)}setCatDragState(e){this.setQuizUiFaded(e),this.drawingCanvasLayerElement&&(this.drawingCanvasLayerElement.isPointerLockdown=e,!e&&this.inkManager&&this.inkManager.updateCanvasActiveState())}resetGame(){var e,i;console.log("GameManager: resetGame() - Iniciando reseteo completo..."),this.stop(),this.playerData&&this.playerData.reset(),this.quizSystem&&this.quizSystem.resetAvailableQuestions(),this.catManager&&this.catManager.removeAllCats(),this.inkManager&&this.inkManager.destroy(),this.catFoodManager&&this.catFoodManager.destroy(),this.shopManager&&this.shopManager.closeShop(),(e=this.optionsPopupInstance)!=null&&e.isVisible&&this.closeOptionsMenu(),this.hideToolControls(),this.hideShopButton(),this.hideOptionsButton(),this.gameUiContainer=null,(i=document.querySelector("combo-counter"))==null||i.remove(),this.stateMachine.changeState("MainMenu",void 0,"gq-wipe-transition")}showToolControls(){const e=this.controlElements.controlsContainer;e?(e.classList.remove("hidden"),this.updateControlVisibilityBasedOnUnlocks()):console.warn("[GameManager] Contenedor de controles (#right-controls) no encontrado.")}hideToolControls(){const e=this.controlElements.controlsContainer;e&&e.classList.add("hidden")}showShopButton(){if(!this.shopButtonInstance){if(this.shopButtonInstance=document.getElementById("shop-button-global"),!this.shopButtonInstance){console.warn("GameManager: shop-button-global no encontrado, creando dinámicamente. Revisa index.html.");const e=document.createElement("shop-button-component");e.id="shop-button-global",e.titleText="Abrir Tienda (S)",document.body.appendChild(e),this.shopButtonInstance=e}this.shopButtonInstance&&!this.shopButtonInteractionListener&&(this.shopButtonInteractionListener=()=>this.handleShopButtonInteraction(),this.shopButtonInstance.addEventListener("shop-button-interaction",this.shopButtonInteractionListener))}this.shopButtonInstance&&this.shopButtonInstance.classList.remove("hidden")}hideShopButton(){this.shopButtonInstance&&this.shopButtonInstance.classList.add("hidden")}showOptionsButton(){this.optionsButtonInstance&&this.optionsButtonInstance.classList.remove("hidden")}hideOptionsButton(){this.optionsButtonInstance&&this.optionsButtonInstance.classList.add("hidden")}updateBackdropAndFadeState(){var t;const e=this.shopManager.isShopOpen(),i=((t=this.optionsPopupInstance)==null?void 0:t.isVisible)??!1,s=this.uiManager.isExplanationVisible(),a=e||i||s;this.blurBackdrop&&(this.blurBackdrop.visible=a),this.setQuizUiFaded(a),this.updateGlobalButtonsState()}toggleOptionsMenu(){if(!this.optionsPopupInstance){console.warn("GameManager: No se puede alternar el menú de opciones, falta el popup.");return}const i=!this.optionsPopupInstance.isVisible;this.optionsPopupInstance.isVisible=i,i&&(this.optionsPopupInstance.initialVolume=this.audioManager.getVolume(),this.optionsPopupInstance.initiallyMuted=this.audioManager.isMuted(),this.audioManager.playSound("ui_confirm")),this.updateBackdropAndFadeState()}closeOptionsMenu(){this.optionsPopupInstance&&(this.optionsPopupInstance.isVisible&&(this.optionsPopupInstance.isVisible=!1),this.updateBackdropAndFadeState())}handleShopButtonInteraction(){const e=this.getAudioManager();e.isReady()||e.init(),this.shopManager.isShopOpen()||(this.openShop(),e==null||e.playSound("ui_confirm"))}handleShopCloseRequest(){this.closeShop()}addShopCloseListener(e){this.removeShopCloseListener(e),this.shopCloseRequestListener=()=>this.handleShopCloseRequest(),e.addEventListener("close-requested",this.shopCloseRequestListener)}removeShopCloseListener(e){e&&this.shopCloseRequestListener&&e.removeEventListener("close-requested",this.shopCloseRequestListener)}openShop(){this.shopManager?(this.shopManager.openShop(),this.updateBackdropAndFadeState()):console.warn("GameManager: openShop() llamado pero ShopManager no está disponible.")}closeShop(){this.shopManager?(this.shopManager.closeShop(),this.updateBackdropAndFadeState()):console.warn("GameManager: closeShop() llamado pero ShopManager no está disponible.")}updateGlobalButtonsState(){var l;const e=this.shopManager.isShopOpen(),i=((l=this.optionsPopupInstance)==null?void 0:l.isVisible)??!1,s=this.uiManager.isExplanationVisible(),a=e||i||s,o=this.stateMachine.getCurrentStateName()==="QuizGameplay";if(this.shopButtonInstance&&(this.shopButtonInstance.disabled=a||!o,this.shopButtonInstance.classList.toggle("hidden",!o)),this.optionsButtonInstance){const r=o;this.optionsButtonInstance.disabled=e||s||!r,this.optionsButtonInstance.classList.toggle("hidden",!r)}this.updateToolButtonStates()}updateControlVisibilityBasedOnUnlocks(){const e=this.playerData.isDrawingUnlocked,i=this.playerData.isCatFoodUnlocked;this.controlElements.drawingButtonsContainer&&this.controlElements.drawingButtonsContainer.classList.toggle("hidden",!e),this.controlElements.catFoodUiContainer&&this.controlElements.catFoodUiContainer.classList.toggle("hidden",!i),this.updateToolButtonStates()}addThemeChangeListener(){this.removeThemeChangeListener(),this.themeChangeListener=e=>{var s;this.stateMachine.getCurrentState()instanceof Ce&&this.uiManager.rebuildInterface(),this.shopManager.isShopOpen()&&this.shopManager.updateShopUI(),(s=this.optionsPopupInstance)!=null&&s.isVisible&&this.optionsPopupInstance.requestUpdate()},document.addEventListener("theme-changed",this.themeChangeListener)}removeThemeChangeListener(){this.themeChangeListener&&(document.removeEventListener("theme-changed",this.themeChangeListener),this.themeChangeListener=null)}addKeyboardListener(){this.removeKeyboardListener(),this.keydownListener=e=>{var a,t;if(e.key==="Escape"){if((a=this.optionsPopupInstance)!=null&&a.isVisible){this.closeOptionsMenu();return}if(this.shopManager.isShopOpen()){this.closeShop(),this.audioManager.playSound("ui_cancel");return}}if(this.shopManager.isShopOpen()||(((t=this.optionsPopupInstance)==null?void 0:t.isVisible)??!1)||this.uiManager.isExplanationVisible())return;const s=this.stateMachine.getCurrentStateName();if(s==="QuizGameplay")switch(e.key.toLowerCase()){case"b":this.activateBrush();break;case"c":this.playerData.isDrawingUnlocked&&this.playerData.inkSpentSinceLastClear>0&&this.inkManager.clearInkLines();break;case"f":this.activateCatFood();break;case"s":this.shopButtonInstance&&!this.shopButtonInstance.disabled&&this.handleShopButtonInteraction();break;case"o":this.optionsButtonInstance&&!this.optionsButtonInstance.disabled&&this.toggleOptionsMenu();break;case"t":this.themeManager.cycleTheme();break}else["MainMenu","GameOver","Results"].includes(s||"")&&e.key.toLowerCase()==="t"&&this.themeManager.cycleTheme()},window.addEventListener("keydown",this.keydownListener)}removeKeyboardListener(){this.keydownListener&&(window.removeEventListener("keydown",this.keydownListener),this.keydownListener=null)}setupGlobalUICListeners(){this.removeGlobalUICListeners(),this.shopButtonInstance?(this.shopButtonInteractionListener=()=>this.handleShopButtonInteraction(),this.shopButtonInstance.addEventListener("shop-button-interaction",this.shopButtonInteractionListener)):console.warn("GameManager: shopButtonInstance es null en setupGlobalUICListeners. No se pudo añadir listener.");const e=this.shopManager.getShopPopupElement();e&&this.addShopCloseListener(e),this.optionsButtonInstance?(this.optionsButtonClickListener=()=>this.toggleOptionsMenu(),this.optionsButtonInstance.addEventListener("options-button-clicked",this.optionsButtonClickListener)):console.warn("GameManager: optionsButtonInstance es null en setupGlobalUICListeners. No se pudo añadir listener."),this.optionsPopupInstance?(this.optionsPopupCloseListener=()=>this.closeOptionsMenu(),this.optionsPopupInstance.addEventListener("options-close-requested",this.optionsPopupCloseListener)):console.warn("GameManager: optionsPopupInstance es null en setupGlobalUICListeners. No se pudo añadir listener.")}removeGlobalUICListeners(){var i;this.shopButtonInstance&&this.shopButtonInteractionListener&&(this.shopButtonInstance.removeEventListener("shop-button-interaction",this.shopButtonInteractionListener),this.shopButtonInteractionListener=null);const e=(i=this.shopManager)==null?void 0:i.getShopPopupElement();e&&this.shopCloseRequestListener&&(e.removeEventListener("close-requested",this.shopCloseRequestListener),this.shopCloseRequestListener=null),this.optionsButtonInstance&&this.optionsButtonClickListener&&(this.optionsButtonInstance.removeEventListener("options-button-clicked",this.optionsButtonClickListener),this.optionsButtonClickListener=null),this.optionsPopupInstance&&this.optionsPopupCloseListener&&(this.optionsPopupInstance.removeEventListener("options-close-requested",this.optionsPopupCloseListener),this.optionsPopupCloseListener=null)}getLives(){return this.playerData.lives}decrementLives(){this.playerData.lives>0&&(this.playerData.lives--,this.updateExternalLivesUI())}incrementLives(){this.playerData.lives++,this.updateExternalLivesUI()}enableDrawingFeature(){try{return this.inkManager.init(),this.updateInkUI(),this.updateControlVisibilityBasedOnUnlocks(),!0}catch(e){return console.error("GameManager: Error habilitando dibujo:",e),!1}}enableCatFoodFeature(){try{this.catFoodManager.enable(),this.updateCatFoodUI(),this.updateControlVisibilityBasedOnUnlocks()}catch(e){console.error("GameManager: Error habilitando comida:",e)}}updateInkUI(){this.uiManager.updateInkVisibility(this.playerData.isDrawingUnlocked),this.uiManager.updateInkBar(),this.updateToolButtonStates()}updateExternalLivesUI(){this.uiManager.updateLivesDisplay(this.playerData.lives)}updateExternalShieldUI(e){this.uiManager.updateShieldIcon(e)}updateExternalHintUI(e){this.uiManager.updateHintIcon(e)}updateExternalScoreUI(){this.uiManager.updateScoreDisplay(this.playerData.score)}updateCatFoodUI(){this.uiManager.updateCatFoodBar(this.playerData.currentCatFood,this.playerData.getMaxCatFood()),this.updateToolButtonStates()}activateBrush(){const e=Date.now();e-this._lastToolToggleTime<this.TOOL_TOGGLE_DEBOUNCE_MS||(this._lastToolToggleTime=e,this.playerData.isDrawingUnlocked&&(this.catFoodManager.isActive&&this.catFoodManager.toggleActive(!1),this.inkManager.toggleBrush(),this.updateGlobalButtonsState()))}activateCatFood(){const e=Date.now();e-this._lastToolToggleTime<this.TOOL_TOGGLE_DEBOUNCE_MS||(this._lastToolToggleTime=e,this.playerData.isCatFoodUnlocked&&(this.inkManager.isBrushActive&&this.inkManager.toggleBrush(!1),this.catFoodManager.toggleActive(),this.updateGlobalButtonsState()))}updateToolButtonStates(){var i;const e=this.shopManager.isShopOpen()||(((i=this.optionsPopupInstance)==null?void 0:i.isVisible)??!1)||this.uiManager.isExplanationVisible();this.controlElements.brushToolButton&&(this.controlElements.brushToolButton.active=this.inkManager.isBrushActive,this.controlElements.brushToolButton.disabled=e||!this.playerData.isDrawingUnlocked||this.playerData.currentInk<=0&&!this.inkManager.isBrushActive),this.controlElements.clearInkToolButton&&(this.controlElements.clearInkToolButton.disabled=e||!this.playerData.isDrawingUnlocked||this.playerData.inkSpentSinceLastClear<=0),this.controlElements.catFoodToolButton&&(this.controlElements.catFoodToolButton.active=this.catFoodManager.isActive,this.controlElements.catFoodToolButton.disabled=e||!this.playerData.isCatFoodUnlocked||this.playerData.currentCatFood<=0&&!this.catFoodManager.isActive,this.uiManager.updateCatFoodBar(this.playerData.currentCatFood,this.playerData.getMaxCatFood()))}getQuizSystem(){return this.quizSystem}getPhysicsManager(){return this.physicsManager}getStateMachine(){return this.stateMachine}getAudioManager(){return this.audioManager}getCatManager(){return this.catManager}getShopManager(){return this.shopManager}getPlayerData(){return this.playerData}getInkManager(){return this.inkManager}getThemeManager(){return this.themeManager}getCatFoodManager(){return this.catFoodManager}getContainerElement(){return this.containerElement}getCurrentState(){return this.stateMachine.getCurrentState()}getControlElements(){return this.controlElements}getCatDisplayArea(){return this.catDisplayAreaElement}getDrawingCanvasLayer(){return this.drawingCanvasLayerElement}getLoadingMessages(){return this.loadingMessages.length>0?this.loadingMessages:["Cargando..."]}}console.log("DOM Cargado. Iniciando Quiz Felino...");const rt=document.getElementById("app");if(!rt)console.error("Error: Elemento #app no encontrado en el DOM.");else{rt.innerHTML="",console.log("Preparado para inicializar GameManager.");const u=new cn(rt);window.gameManager=u,console.log("GameManager expuesto como window.gameManager para depuración.");const e=()=>{const i=u.getAudioManager();i.isReady()||(console.log("User interaction detected, attempting to initialize audio..."),i.init()),document.body.removeEventListener("click",e,{capture:!0}),document.body.removeEventListener("touchstart",e,{capture:!0}),console.log("One-time audio init listeners removed.")};console.log("Adding one-time listeners for audio initialization..."),document.body.addEventListener("click",e,{once:!0,capture:!0}),document.body.addEventListener("touchstart",e,{once:!0,capture:!0,passive:!1}),u.init().then(()=>{u.create(),u.start(),console.log("GameManager inicializado y arrancado.")}).catch(i=>{console.error("Error durante la inicialización del juego:",i),rt.innerHTML=`Error al cargar el juego: ${i.message}. Revisa la consola.`})}
