"use strict";(self.webpackChunkmemo=self.webpackChunkmemo||[]).push([[181,678,111,439,518],{8105:(n,e,t)=>{t.d(e,{Z:()=>r});const r=function(n){return n.children}},2111:(n,e,t)=>{t.r(e),t.d(e,{default:()=>f});var r=t(2256),a=t(107),o=t.n(a),c=t(9526),i=t(903),u=t(5368),s=t(1678),d=t(9479);const f=function(){var n=(0,d.O)(),e=(0,u.L)(n,"mapping",(function(e){return t=void 0,r=void 0,a=void 0,c=o().mark((function t(){var r,a,c;return o().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r={layout:e,id:n,category:"mapping"},t.next=3,fetch("/api/memo/document/update/content",{method:"POST",body:JSON.stringify(r),mode:"cors",headers:{"Content-Type":"application/json"}});case 3:return a=t.sent,t.next=6,a.text();case 6:c=t.sent,(0,s.showMessageAfterFetching)(c);case 8:case"end":return t.stop()}}),t)})),new(a||(a=Promise))((function(n,e){function o(n){try{u(c.next(n))}catch(n){e(n)}}function i(n){try{u(c.throw(n))}catch(n){e(n)}}function u(e){var t;e.done?n(e.value):(t=e.value,t instanceof a?t:new a((function(n){n(t)}))).then(o,i)}u((c=c.apply(t,r||[])).next())}));var t,r,a,c})),t=(0,r.Z)(e,2),a=t[0],f=t[1];return a||(a={position:{root:{x:-3e3,y:-3e3}},block:{},tag:{},line:{}}),c.createElement(i.default,{dataSource:a,onChange:function(n){f(n)}})}},1678:(n,e,t)=>{t.r(e),t.d(e,{showMessageAfterFetching:()=>d,default:()=>f});var r=t(2256),a=t(107),o=t.n(a),c=t(9526),i=t(5368),u=t(1518),s=t(9479);function d(n){n?alert("保存成功"):alert("保存失败")}const f=function(){var n=(0,s.O)(),e=function(){return e=void 0,t=void 0,r=void 0,a=o().mark((function e(){var t,r;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t={id:n,layout:f,category:"markdown"},e.next=3,fetch("/api/memo/document/update/content",{body:JSON.stringify(t),method:"POST",headers:{"Content-Type":"application/json"}});case 3:return r=e.sent,e.next=6,r.text();case 6:d(e.sent);case 8:case"end":return e.stop()}}),e)})),new(r||(r=Promise))((function(n,o){function c(n){try{u(a.next(n))}catch(n){o(n)}}function i(n){try{u(a.throw(n))}catch(n){o(n)}}function u(e){var t;e.done?n(e.value):(t=e.value,t instanceof r?t:new r((function(n){n(t)}))).then(c,i)}u((a=a.apply(e,t||[])).next())}));var e,t,r,a},t=(0,i.L)(n,"markdown-editor",e),a=(0,r.Z)(t,2),f=a[0],l=a[1];return c.createElement(u.default,{value:f,onChange:function(n){l(n.target.value)},onSave:e})}},5368:(n,e,t)=>{t.d(e,{L:()=>u});var r=t(2256),a=t(107),o=t.n(a),c=t(9526);function i(n,e,t){return r=this,a=void 0,c=void 0,i=o().mark((function r(){var a,c;return o().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(a=n.ctrlKey,c=n.keyCode,!a||83!==c){r.next=9;break}if(n.preventDefault(),r.t0=t,!r.t0){r.next=7;break}return r.next=7,t(e);case 7:r.next=10;break;case 9:n.stopPropagation();case 10:case"end":return r.stop()}}),r)})),new(c||(c=Promise))((function(n,e){function t(n){try{u(i.next(n))}catch(n){e(n)}}function o(n){try{u(i.throw(n))}catch(n){e(n)}}function u(e){var r;e.done?n(e.value):(r=e.value,r instanceof c?r:new c((function(n){n(r)}))).then(t,o)}u((i=i.apply(r,a||[])).next())}));var r,a,c,i}function u(n,e,t){var a=this,u="mapping"===e?"json":"md",s="./".concat(e,"/").concat(n,"/").concat(n,".").concat(u),d=(0,c.useState)(),f=(0,r.Z)(d,2),l=f[0],p=f[1];return function(n,e){(0,c.useEffect)((function(){var t=function(t){return i(t,n,e)};return window.addEventListener("keydown",t),function(){return window.removeEventListener("keydown",t)}}),[n,e])}(l,t),(0,c.useEffect)((function(){var n,t,r,c;n=a,t=void 0,r=void 0,c=o().mark((function n(){var t,r,a;return o().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return t="mapping"===e?"json":"text",n.next=3,fetch(s);case 3:return r=n.sent,n.next=6,r[t]();case 6:a=n.sent,p(a);case 8:case"end":return n.stop()}}),n)})),new(r||(r=Promise))((function(e,a){function o(n){try{u(c.next(n))}catch(n){a(n)}}function i(n){try{u(c.throw(n))}catch(n){a(n)}}function u(n){var t;n.done?e(n.value):(t=n.value,t instanceof r?t:new r((function(n){n(t)}))).then(o,i)}u((c=c.apply(n,t||[])).next())}))}),[n,e,s]),[l,p]}},903:(n,e,t)=>{t.r(e),t.d(e,{default:()=>s});var r=t(9526),a=t(5701),o=t.n(a),c=t(499);o()(c.Z,{insert:"head",singleton:!1}),c.Z.locals;var i=t(1417),u=t(8459);const s=function(n){return r.createElement("div",{className:"mapping"},r.createElement(i.Z,null),r.createElement(u.Z,{data:n.dataSource,className:"canvas-wrapper",onChange:n.onChange}))}},1518:(n,e,t)=>{t.r(e),t.d(e,{default:()=>d});var r=t(9526),a=t(6534),o=t.n(a),c=(t(239),t(5701)),i=t.n(c),u=t(9961);i()(u.Z,{insert:"head",singleton:!1}),u.Z.locals;var s=t(8105);const d=function(n){var e=n.value,t=n.onChange;return r.createElement("div",{className:"markdown-editor"},r.createElement(s.Z,null,r.createElement("textarea",{className:"markdown-body",onChange:t,value:e,onKeyUp:function(n){var e=n.currentTarget.value.substr(0,n.currentTarget.selectionStart).split("\n"),t=e.length,r=e[e.length-1].length;console.log(t+", "+r)}})),r.createElement("div",{className:"content markdown-body",dangerouslySetInnerHTML:{__html:o()(e||"")}}))}},9479:(n,e,t)=>{t.d(e,{O:()=>r,e:()=>a});var r=function(n){var e=n||location.pathname;return e.endsWith("/")&&(e=e.substr(0,e.length-1)),e.substr(e.lastIndexOf("/")+1)},a=function(n){return n.replace(/-\w/g,(function(e,t){return n.charAt(t+1).toUpperCase()})).replace(/^\S/,(function(n){return n.toUpperCase()}))}},499:(n,e,t)=>{t.d(e,{Z:()=>o});var r=t(352),a=t.n(r)()((function(n){return n[1]}));a.push([n.id,".mapping .canvas-wrapper {\n  width: 2000%;\n  height: 2000vh;\n  border: 1px solid #ccc;\n  position: fixed;\n}\n",""]);const o=a},9961:(n,e,t)=>{t.d(e,{Z:()=>o});var r=t(352),a=t.n(r)()((function(n){return n[1]}));a.push([n.id,".markdown-editor {\n  display: grid;\n  font-size: 16px;\n  grid-template-columns: 50% 50%;\n  padding: 24px;\n  height: calc(100vh - 48px);\n  overflow: hidden;\n}\n\n.markdown-body {\n  overflow: hidden;\n}\n\n.markdown-body:hover {\n  overflow: auto;\n}\n\np {\n  text-indent: 2em; /*首行缩进*/\n}\n",""]);const o=a}}]);