(window.webpackJsonp=window.webpackJsonp||[]).push([[29,35],{71:function(n,e,t){var o=t(5),r=t(72);"string"==typeof(r=r.__esModule?r.default:r)&&(r=[[n.i,r,""]]);var a={insert:"head",singleton:!1},l=(o(r,a),r.locals?r.locals:{});n.exports=l},72:function(n,e,t){(e=t(6)(!1)).push([n.i,".markdown-editor {\n  display: grid;\n  font-size: 16px;\n  grid-template-columns: 50% 50%;\n  padding: 24px;\n  height: calc(100vh - 48px);\n  overflow: hidden;\n}\n\n.markdown-body {\n  overflow: hidden;\n}\n\n.markdown-body:hover {\n  overflow: auto;\n}\n",""]),n.exports=e},725:function(n,e,t){"use strict";t.r(e);var o=t(0),r=t.n(o),a=t(79),l=t(90);describe("MarkdownEditor",(function(){var n=jest.spyOn(console,"error").mockImplementation((function(){}));afterAll((function(){n.mockRestore()})),it("render correctly",(function(){var n=jest.fn(),e=jest.fn(),t=Object(a.mount)(r.a.createElement(l.default,{onSave:n,onChange:e,value:"<ul><li>test</li></ul>"}));expect(t).toMatchSnapshot()}))}))},80:function(n,e){},83:function(n,e){},84:function(n,e){},85:function(n,e){},90:function(n,e,t){"use strict";t.r(e);var o=t(0),r=t.n(o),a=t(109),l=t.n(a),c=(t(62),t(71),function(n){return n.children});e.default=function(n){var e=n.value,t=n.onChange;return r.a.createElement("div",{className:"markdown-editor"},r.a.createElement(c,null,r.a.createElement("textarea",{className:"markdown-body",onChange:t,value:e,onKeyUp:function(n){var e=n.currentTarget.value.substr(0,n.currentTarget.selectionStart).split("\n"),t=e.length,o=e[e.length-1].length;console.log(t+", "+o)}})),r.a.createElement("div",{className:"content markdown-body",dangerouslySetInnerHTML:{__html:l()(e||"")}}))}}}]);