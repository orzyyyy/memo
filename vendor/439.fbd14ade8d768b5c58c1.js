"use strict";(self.webpackChunkmemo=self.webpackChunkmemo||[]).push([[439,678,518],{8105:(n,e,t)=>{t.d(e,{Z:()=>r});const r=function(n){return n.children}},1678:(n,e,t)=>{t.r(e),t.d(e,{showMessageAfterFetching:()=>d,default:()=>f});var r=t(2256),a=t(107),o=t.n(a),c=t(9526),u=t(5368),i=t(1518),s=t(9479);function d(n){n?alert("保存成功"):alert("保存失败")}const f=function(){var n=(0,s.O)(),e=function(){return e=void 0,t=void 0,r=void 0,a=o().mark((function e(){var t,r;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t={id:n,layout:f,category:"markdown"},e.next=3,fetch("/api/memo/document/update/content",{body:JSON.stringify(t),method:"POST",headers:{"Content-Type":"application/json"}});case 3:return r=e.sent,e.next=6,r.text();case 6:d(e.sent);case 8:case"end":return e.stop()}}),e)})),new(r||(r=Promise))((function(n,o){function c(n){try{i(a.next(n))}catch(n){o(n)}}function u(n){try{i(a.throw(n))}catch(n){o(n)}}function i(e){var t;e.done?n(e.value):(t=e.value,t instanceof r?t:new r((function(n){n(t)}))).then(c,u)}i((a=a.apply(e,t||[])).next())}));var e,t,r,a},t=(0,u.L)(n,"markdown-editor",e),a=(0,r.Z)(t,2),f=a[0],l=a[1];return c.createElement(i.default,{value:f,onChange:function(n){l(n.target.value)},onSave:e})}},5368:(n,e,t)=>{t.d(e,{L:()=>i});var r=t(2256),a=t(107),o=t.n(a),c=t(9526);function u(n,e,t){return r=this,a=void 0,c=void 0,u=o().mark((function r(){var a,c;return o().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(a=n.ctrlKey,c=n.keyCode,!a||83!==c){r.next=9;break}if(n.preventDefault(),r.t0=t,!r.t0){r.next=7;break}return r.next=7,t(e);case 7:r.next=10;break;case 9:n.stopPropagation();case 10:case"end":return r.stop()}}),r)})),new(c||(c=Promise))((function(n,e){function t(n){try{i(u.next(n))}catch(n){e(n)}}function o(n){try{i(u.throw(n))}catch(n){e(n)}}function i(e){var r;e.done?n(e.value):(r=e.value,r instanceof c?r:new c((function(n){n(r)}))).then(t,o)}i((u=u.apply(r,a||[])).next())}));var r,a,c,u}function i(n,e,t){var a=this,i="mapping"===e?"json":"md",s="./".concat(e,"/").concat(n,"/").concat(n,".").concat(i),d=(0,c.useState)(),f=(0,r.Z)(d,2),l=f[0],v=f[1];return function(n,e){(0,c.useEffect)((function(){var t=function(t){return u(t,n,e)};return window.addEventListener("keydown",t),function(){return window.removeEventListener("keydown",t)}}),[n,e])}(l,t),(0,c.useEffect)((function(){var n,t,r,c;n=a,t=void 0,r=void 0,c=o().mark((function n(){var t,r,a;return o().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return t="mapping"===e?"json":"text",n.next=3,fetch(s);case 3:return r=n.sent,n.next=6,r[t]();case 6:a=n.sent,v(a);case 8:case"end":return n.stop()}}),n)})),new(r||(r=Promise))((function(e,a){function o(n){try{i(c.next(n))}catch(n){a(n)}}function u(n){try{i(c.throw(n))}catch(n){a(n)}}function i(n){var t;n.done?e(n.value):(t=n.value,t instanceof r?t:new r((function(n){n(t)}))).then(o,u)}i((c=c.apply(n,t||[])).next())}))}),[n,e,s]),[l,v]}},1518:(n,e,t)=>{t.r(e),t.d(e,{default:()=>d});var r=t(9526),a=t(6534),o=t.n(a),c=(t(239),t(5701)),u=t.n(c),i=t(9961);u()(i.Z,{insert:"head",singleton:!1}),i.Z.locals;var s=t(8105);const d=function(n){var e=n.value,t=n.onChange;return r.createElement("div",{className:"markdown-editor"},r.createElement(s.Z,null,r.createElement("textarea",{className:"markdown-body",onChange:t,value:e,onKeyUp:function(n){var e=n.currentTarget.value.substr(0,n.currentTarget.selectionStart).split("\n"),t=e.length,r=e[e.length-1].length;console.log(t+", "+r)}})),r.createElement("div",{className:"content markdown-body",dangerouslySetInnerHTML:{__html:o()(e||"")}}))}},9479:(n,e,t)=>{t.d(e,{O:()=>r,e:()=>a});var r=function(n){var e=n||location.pathname;return e.endsWith("/")&&(e=e.substr(0,e.length-1)),e.substr(e.lastIndexOf("/")+1)},a=function(n){return n.replace(/-\w/g,(function(e,t){return n.charAt(t+1).toUpperCase()})).replace(/^\S/,(function(n){return n.toUpperCase()}))}},9961:(n,e,t)=>{t.d(e,{Z:()=>o});var r=t(352),a=t.n(r)()((function(n){return n[1]}));a.push([n.id,".markdown-editor {\n  display: grid;\n  font-size: 16px;\n  grid-template-columns: 50% 50%;\n  padding: 24px;\n  height: calc(100vh - 48px);\n  overflow: hidden;\n}\n\n.markdown-body {\n  overflow: hidden;\n}\n\n.markdown-body:hover {\n  overflow: auto;\n}\n\np {\n  text-indent: 2em; /*首行缩进*/\n}\n",""]);const o=a}}]);