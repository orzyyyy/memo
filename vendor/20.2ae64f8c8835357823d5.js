(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{121:function(e,t,n){"use strict";n.r(t);var r=n(1),a=n.n(r),o=n(75),l=n.n(o),i=n(43),c=n.n(i),u=n(0),s=n.n(u),f=n(250),p=(n(166),n(59)),y=n(71),d=n(88),m=(n(122),function(e,t){return c()(c()({},e),l()({},t.key,t.data))}),b={title:"",type:"",subType:"",category:"",key:""};t.default=function(e){var t=e.visible,n=e.loading,r=e.selectData,o=e.onCancel,l=e.onSubmit,i=e.pageInfo,c=e.dataItem,g=void 0===c?{id:"",type:"",subType:"",category:"markdown",title:""}:c,v=Object(u.useState)(g.type),h=a()(v,2),E=h[0],k=h[1],w=Object(u.useState)(!1),O=a()(w,2),S=O[0],x=O[1],$=Object(u.useReducer)(m,b),j=a()($,2),C=j[0],P=j[1];Object(u.useEffect)((function(){P({key:"category",data:g.category}),P({key:"type",data:g.type}),P({key:"subType",data:g.subType}),P({key:"title",data:g.title})}),[t,g.category,g.type,g.subType,g.title]);var _=function(){P({key:"title",data:""}),P({key:"category",data:""}),P({key:"subType",data:""}),P({key:"type",data:""})},F=function(){l(C,g)},z=function(e){var t=e.target.value;k(t),P({key:"type",data:e.target.value})};return s.a.createElement(f.a,{visible:t,title:"新建文档",onClose:function(){k(""),o()},animation:"zoom",maskAnimation:"fade",mousePosition:i,bodyStyle:{height:260},footer:s.a.createElement("div",{className:"footer-grid"},s.a.createElement(s.a.Fragment,null,s.a.createElement(p.a,{onClick:function(){return x(!S)}},"编辑"),s.a.createElement("div",null),s.a.createElement(p.a,{onClick:_},"清空"),s.a.createElement(p.a,{onClick:F,disabled:n},"确定"))),className:"edit-form"},s.a.createElement("div",{className:"wrapper-grid"},s.a.createElement(s.a.Fragment,null,s.a.createElement("span",null,"标题"),s.a.createElement(y.a,{style:{width:"100%"},value:C.title,onChange:function(e){return P({key:"title",data:e.target.value})}})),function(e){return s.a.createElement(s.a.Fragment,null,e?s.a.createElement(s.a.Fragment,null,s.a.createElement("span",null,"显示类别"),s.a.createElement(y.a,{style:{width:"100%"},value:C.category,onChange:function(e){return P({key:"category",data:e.target.value})}})):s.a.createElement(s.a.Fragment,null,s.a.createElement("span",null,"显示类别"),s.a.createElement(d.a,{style:{width:"100%"},value:C.category,onChange:function(e){return P({key:"category",data:e.target.value})}},s.a.createElement("option",{value:"markdown"},"markdown"),s.a.createElement("option",{value:"mapping"},"mapping"),s.a.createElement("option",{value:"utils"},"utils"))))}(S),"utils"!==C.category&&s.a.createElement(s.a.Fragment,null,S?s.a.createElement(s.a.Fragment,null,s.a.createElement("span",null,"文档类别"),s.a.createElement(y.a,{style:{width:"100%"},value:C.type,onChange:function(e){return P({key:"type",data:e.target.value})}})):s.a.createElement(s.a.Fragment,null,s.a.createElement("span",null,"文档类别"),s.a.createElement(d.a,{style:{width:"100%"},onChange:z,value:C.type},r.map((function(e){return s.a.createElement("option",{value:e.key,key:"type-".concat(e.key)},e.title)}))))),"utils"!==C.category&&s.a.createElement(s.a.Fragment,null,S?s.a.createElement(s.a.Fragment,null,s.a.createElement("span",null,"文档子类"),s.a.createElement(y.a,{style:{width:"100%"},value:C.subType,onChange:function(e){return P({key:"subType",data:e.target.value})}})):s.a.createElement(s.a.Fragment,null,s.a.createElement("span",null,"文档子类"),s.a.createElement(d.a,{style:{width:"100%"},value:C.subType,onChange:function(e){return P({key:"subType",data:e.target.value})}},r.filter((function(e){return e.key===(E||g.type)})).map((function(e){var t=e.children;return(void 0===t?[]:t).map((function(e){return s.a.createElement("option",{value:e.key,key:e.key},e.value)}))}))))),"utils"===C.category&&s.a.createElement(s.a.Fragment,null,s.a.createElement("span",null,"utils key"),s.a.createElement(y.a,{style:{width:"100%"},value:C.key,onChange:function(e){return P({key:"key",data:e.target.value})}}))))}},122:function(e,t,n){var r=n(8),a=n(123);"string"==typeof(a=a.__esModule?a.default:a)&&(a=[[e.i,a,""]]);var o={insert:"head",singleton:!1};r(a,o);e.exports=a.locals||{}},123:function(e,t,n){"use strict";n.r(t);var r=n(3),a=n.n(r)()(!1);a.push([e.i,".edit-form .wrapper-grid {\n  display: grid;\n  grid-template-columns: 15% 85%;\n  grid-template-rows: repeat(4, 25%);\n  grid-row-gap: 16px;\n}\n\n.edit-form .footer-grid {\n  display: grid;\n  grid-template-columns: repeat(4, 25%);\n}\n",""]),t.default=a},2:function(e,t,n){"use strict";function r(){return(r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}n.d(t,"a",(function(){return r}))},20:function(e,t,n){"use strict";function r(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}n.d(t,"a",(function(){return r}))},26:function(e,t,n){"use strict";e.exports=n(33)},27:function(e,t,n){"use strict";function r(e,t){return(r=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}n.d(t,"a",(function(){return r}))},33:function(e,t,n){"use strict";
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var r="function"==typeof Symbol&&Symbol.for,a=r?Symbol.for("react.element"):60103,o=r?Symbol.for("react.portal"):60106,l=r?Symbol.for("react.fragment"):60107,i=r?Symbol.for("react.strict_mode"):60108,c=r?Symbol.for("react.profiler"):60114,u=r?Symbol.for("react.provider"):60109,s=r?Symbol.for("react.context"):60110,f=r?Symbol.for("react.async_mode"):60111,p=r?Symbol.for("react.concurrent_mode"):60111,y=r?Symbol.for("react.forward_ref"):60112,d=r?Symbol.for("react.suspense"):60113,m=r?Symbol.for("react.suspense_list"):60120,b=r?Symbol.for("react.memo"):60115,g=r?Symbol.for("react.lazy"):60116,v=r?Symbol.for("react.block"):60121,h=r?Symbol.for("react.fundamental"):60117,E=r?Symbol.for("react.responder"):60118,k=r?Symbol.for("react.scope"):60119;function w(e){if("object"==typeof e&&null!==e){var t=e.$$typeof;switch(t){case a:switch(e=e.type){case f:case p:case l:case c:case i:case d:return e;default:switch(e=e&&e.$$typeof){case s:case y:case g:case b:case u:return e;default:return t}}case o:return t}}}function O(e){return w(e)===p}t.AsyncMode=f,t.ConcurrentMode=p,t.ContextConsumer=s,t.ContextProvider=u,t.Element=a,t.ForwardRef=y,t.Fragment=l,t.Lazy=g,t.Memo=b,t.Portal=o,t.Profiler=c,t.StrictMode=i,t.Suspense=d,t.isAsyncMode=function(e){return O(e)||w(e)===f},t.isConcurrentMode=O,t.isContextConsumer=function(e){return w(e)===s},t.isContextProvider=function(e){return w(e)===u},t.isElement=function(e){return"object"==typeof e&&null!==e&&e.$$typeof===a},t.isForwardRef=function(e){return w(e)===y},t.isFragment=function(e){return w(e)===l},t.isLazy=function(e){return w(e)===g},t.isMemo=function(e){return w(e)===b},t.isPortal=function(e){return w(e)===o},t.isProfiler=function(e){return w(e)===c},t.isStrictMode=function(e){return w(e)===i},t.isSuspense=function(e){return w(e)===d},t.isValidElementType=function(e){return"string"==typeof e||"function"==typeof e||e===l||e===p||e===c||e===i||e===d||e===m||"object"==typeof e&&null!==e&&(e.$$typeof===g||e.$$typeof===b||e.$$typeof===u||e.$$typeof===s||e.$$typeof===y||e.$$typeof===h||e.$$typeof===E||e.$$typeof===k||e.$$typeof===v)},t.typeOf=w},47:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var r={height:32,width:80,borderRadius:"0.25em",fontSize:18}},59:function(e,t,n){"use strict";var r=n(43),a=n.n(r),o=n(0),l=n.n(o),i=n(47),c=(n(63),function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]])}return n}),u=function(e){var t=e.style,n=e.children,r=c(e,["style","children"]);return l.a.createElement("button",a()({style:a()(i.a,t)},r),n)};t.a=u},63:function(e,t,n){var r=n(8),a=n(64);"string"==typeof(a=a.__esModule?a.default:a)&&(a=[[e.i,a,""]]);var o={insert:"head",singleton:!1};r(a,o);e.exports=a.locals||{}},64:function(e,t,n){"use strict";n.r(t);var r=n(3),a=n.n(r)()(!1);a.push([e.i,"button {\n  line-height: 20px;\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0;\n  color: #24292e;\n  background-color: #eff3f6;\n  background-image: linear-gradient(-180deg, #fafbfc, #eff3f6 90%);\n  position: relative;\n  display: inline-block;\n  padding: 6px 12px;\n  font-size: 14px;\n  font-weight: 600;\n  line-height: 20px;\n  white-space: nowrap;\n  vertical-align: middle;\n  cursor: pointer;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  background-repeat: repeat-x;\n  background-position: -1px -1px;\n  background-size: 110% 110%;\n  border: 1px solid rgba(27, 31, 35, 0.2);\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  appearance: none;\n}\n\nbutton:hover {\n  background: #f5f5f5;\n}\n",""]),t.default=a},71:function(e,t,n){"use strict";var r=n(43),a=n.n(r),o=n(0),l=n.n(o),i=n(47),c=(n(76),function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]])}return n}),u=function(e){var t=e.style,n=e.children,r=c(e,["style","children"]);return l.a.createElement("input",a()({style:a()({},i.a,t)},r),n)};t.a=u},76:function(e,t,n){var r=n(8),a=n(77);"string"==typeof(a=a.__esModule?a.default:a)&&(a=[[e.i,a,""]]);var o={insert:"head",singleton:!1};r(a,o);e.exports=a.locals||{}},77:function(e,t,n){"use strict";n.r(t);var r=n(3),a=n.n(r)()(!1);a.push([e.i,"input {\n  border: 1px solid #e8e8e8;\n  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);\n}\n\ninput:hover {\n  border: 1px solid rgb(16, 142, 233);\n  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);\n}\n",""]),t.default=a},88:function(e,t,n){"use strict";var r=n(43),a=n.n(r),o=n(0),l=n.n(o),i=n(47),c=(n(97),function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]])}return n}),u=function(e){var t=e.style,n=e.children,r=c(e,["style","children"]);return l.a.createElement("select",a()({style:a()({},i.a,t)},r),n)};t.a=u},97:function(e,t,n){var r=n(8),a=n(98);"string"==typeof(a=a.__esModule?a.default:a)&&(a=[[e.i,a,""]]);var o={insert:"head",singleton:!1};r(a,o);e.exports=a.locals||{}},98:function(e,t,n){"use strict";n.r(t);var r=n(3),a=n.n(r)()(!1);a.push([e.i,"select {\n  background: white;\n  border: 1px solid #e8e8e8;\n  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);\n}\n\nselect:hover {\n  border: 1px solid rgb(16, 142, 233);\n  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);\n  cursor: pointer;\n}\n",""]),t.default=a}}]);