(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{142:function(n,t,e){var r={"./zh-cn":95,"./zh-cn.js":95};function a(n){var t=o(n);return e(t)}function o(n){if(!e.o(r,n)){var t=new Error("Cannot find module '"+n+"'");throw t.code="MODULE_NOT_FOUND",t}return r[n]}a.keys=function(){return Object.keys(r)},a.resolve=o,n.exports=a,a.id=142},56:function(n,t,e){"use strict";e.r(t);var r=e(2),a=e.n(r),o=e(81),c=e.n(o),u=(e(121),e(131)),i=e.n(u),s=e(0),f=e.n(s),d=e(93),v=(e(107),e(117)),h=e.n(v),l=(e(97),e(96)),p=e.n(l),w=(e(108),e(118)),m=e.n(w),y=(e(109),e(110)),x=e.n(y),g=e(154),k=e.n(g),b=(e(120),x.a.TextArea),E=function(n){var t=n.value,e=n.onSave,r=n.onChange;return f.a.createElement(h.a,{gutter:16,style:{padding:15,width:"100%"}},f.a.createElement(m.a,{span:12},f.a.createElement(b,{style:{height:"90vh",fontSize:16},onChange:function(n){return r(n.target.value)},value:t})),f.a.createElement(m.a,{span:12,style:{height:"90vh",overflow:"auto",paddingLeft:24,fontSize:16}},f.a.createElement("div",{className:"content markdown-body",dangerouslySetInnerHTML:{__html:k()(t||"")}})),f.a.createElement(m.a,{span:8,push:8,style:{marginTop:24}},f.a.createElement(p.a,{block:!0,onClick:e},"提交")))},O=e(91);e.d(t,"showMessageAfterFetching",(function(){return S}));var j=function(n,t,e,r){return new(e||(e=Promise))((function(a,o){function c(n){try{i(r.next(n))}catch(n){o(n)}}function u(n){try{i(r.throw(n))}catch(n){o(n)}}function i(n){var t;n.done?a(n.value):(t=n.value,t instanceof e?t:new e((function(n){n(t)}))).then(c,u)}i((r=r.apply(n,t||[])).next())}))};function S(n){n?i.a.success("保存成功"):i.a.error("保存失败")}t.default=function(){var n=Object(O.a)(),t=function(){return j(void 0,void 0,void 0,c.a.mark((function t(){var e,r;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e={id:n,layout:o,category:"markdown",format:!0},t.next=3,fetch("../document/update/content",{body:JSON.stringify(e),method:"POST",headers:{"Content-Type":"application/json"}});case 3:return r=t.sent,t.next=6,r.text();case 6:S(t.sent);case 8:case"end":return t.stop()}}),t)})))},e=Object(d.a)(n,"markdown-editor",t),r=a()(e,2),o=r[0],u=r[1];return f.a.createElement(E,{value:o,onChange:function(n){u(n)},onSave:t})}},91:function(n,t,e){"use strict";e.d(t,"a",(function(){return r}));var r=function(n){var t=n||location.pathname;return t.endsWith("/")&&(t=t.substr(0,t.length-1)),t.substr(t.lastIndexOf("/")+1)}},93:function(n,t,e){"use strict";var r=e(81),a=e.n(r),o=e(2),c=e.n(o),u=e(0),i=function(n,t,e,r){return new(e||(e=Promise))((function(a,o){function c(n){try{i(r.next(n))}catch(n){o(n)}}function u(n){try{i(r.throw(n))}catch(n){o(n)}}function i(n){var t;n.done?a(n.value):(t=n.value,t instanceof e?t:new e((function(n){n(t)}))).then(c,u)}i((r=r.apply(n,t||[])).next())}))};function s(n,t,e){return i(this,void 0,void 0,a.a.mark((function r(){var o,c;return a.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(o=n.ctrlKey,c=n.keyCode,!o||83!==c){r.next=9;break}if(n.preventDefault(),r.t0=e,!r.t0){r.next=7;break}return r.next=7,e(t);case 7:r.next=10;break;case 9:n.stopPropagation();case 10:case"end":return r.stop()}}),r)})))}e.d(t,"a",(function(){return d}));var f=function(n,t,e,r){return new(e||(e=Promise))((function(a,o){function c(n){try{i(r.next(n))}catch(n){o(n)}}function u(n){try{i(r.throw(n))}catch(n){o(n)}}function i(n){var t;n.done?a(n.value):(t=n.value,t instanceof e?t:new e((function(n){n(t)}))).then(c,u)}i((r=r.apply(n,t||[])).next())}))};function d(n,t,e){var r=this,o="mapping"===t?"json":"md",i="./".concat(t,"/").concat(n,"/").concat(n,".").concat(o),d=Object(u.useState)(),v=c()(d,2),h=v[0],l=v[1];return function(n,t){Object(u.useEffect)((function(){var e=function(e){return s(e,n,t)};return window.addEventListener("keydown",e),function(){return window.removeEventListener("keydown",e)}}),[n,t])}(h,e),Object(u.useEffect)((function(){f(r,void 0,void 0,a.a.mark((function n(){var e,r,o;return a.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return e="mapping"===t?"json":"text",n.next=3,fetch(i);case 3:return r=n.sent,n.next=6,r[e]();case 6:o=n.sent,l(o);case 8:case"end":return n.stop()}}),n)})))}),[n,t,i]),[h,l]}}}]);