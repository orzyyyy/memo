(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{1324:function(e,t,n){var a=n(1325);"string"==typeof a&&(a=[[e.i,a,""]]);var r={insert:"head",singleton:!1};n(12)(a,r);a.locals&&(e.exports=a.locals)},1325:function(e,t,n){(e.exports=n(11)(!1)).push([e.i,".MainPage img {\n  width: 100%;\n}\n\n.MainPage {\n  height: 100vh;\n  min-height: 100vh;\n}\n\n.MainPage .list-item {\n  cursor: pointer;\n  transition: background 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);\n  padding-left: 10px;\n}\n\n.MainPage .list-item:hover {\n  background: #e6f7ff;\n  transition: background 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);\n}\n\n.MainPage .ant-layout-sider-zero-width-trigger {\n  top: calc(100vh - 65px);\n}\n",""])},135:function(e,t,n){var a={"./zh-cn":94,"./zh-cn.js":94};function r(e){var t=i(e);return n(t)}function i(e){if(!n.o(a,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return a[e]}r.keys=function(){return Object.keys(a)},r.resolve=i,e.exports=r,r.id=135},1494:function(e,t,n){"use strict";n.r(t);n(113);var a=n(124),r=n.n(a),i=n(88),o=n.n(i),c=n(2),u=n.n(c),l=n(79),s=n.n(l),d=n(0),m=n.n(d),f=(n(330),n(337)),p=n.n(f),h=(n(229),n(230)),y=n.n(h),v=(n(1324),n(105),n(106)),g=n.n(v),E=(n(96),n(95)),b=n.n(E),w=(n(234),n(168)),x=n.n(w),k=n(262),S=x.a.Option,C=p.a.Header,O=function(e){var t=e.onExhentaiDownload,n=e.onEdit,a=e.exhentaiDateSet,r=e.onExhentaiSelectChange,i=e.onExhentaiLoadList,o=Object(d.useState)(),c=u()(o,2),l=c[0],s=c[1];return m.a.createElement(C,{style:{background:"rgba(0, 0, 0, 0)",height:48,position:"relative"}},m.a.createElement(x.a,{style:{position:"absolute",width:160,top:10,left:8},value:l||(a.length?a[0]:""),onChange:function(e){r(e),s(e)}},a.map((function(e){return m.a.createElement(S,{value:e,key:"exhentai-time-stamp-".concat(e)},e)}))),m.a.createElement(b.a,{style:{position:"absolute",left:180,top:10},type:"dashed",onClick:i},"列表"),m.a.createElement(g.a,{onPressEnter:t,style:{position:"absolute",right:80,top:10,width:350}}),m.a.createElement(b.a,{style:{position:"absolute",right:24,top:10},onClick:function(){return n(void 0,!0)}},m.a.createElement(k.a,null)))},j=y.a.SubMenu,D=p.a.Content,T=p.a.Footer,L=p.a.Sider,F=function(e){var t,n,a=e.onMenuClick,r=e.siderSelectedKey,i=e.menuData,o=e.renderContent,c=e.isLocal,u=e.onExhentaiDownload,l=e.onEdit,s=e.exhentaiDateSet,d=e.onExhentaiSelectChange,f=e.onExhentaiLoadList,h=function(e){var t=e.keyPath;a&&a(t)};return m.a.createElement(p.a,{className:"MainPage"},m.a.createElement(L,{theme:"light",collapsible:!0,collapsedWidth:0},m.a.createElement(y.a,{selectedKeys:[r||""],mode:"inline",onClick:h},i&&i.map((function(e){var t=e.key,n=e.title,a=e.children;return a?m.a.createElement(j,{key:t,title:n},a.map((function(e){return m.a.createElement(y.a.Item,{key:e.key},e.value)}))):m.a.createElement(y.a.Item,{key:t},n)})))),m.a.createElement(p.a,null,c&&m.a.createElement(O,{onExhentaiDownload:u,onEdit:l,exhentaiDateSet:s,onExhentaiSelectChange:d,onExhentaiLoadList:f}),(t=c?48:0,n=document.body.clientHeight-90-t,m.a.createElement(D,{style:{marginLeft:8}},m.a.createElement("div",{style:{padding:"8px 16px 8px 8px",background:"#fff",height:n,overflow:"auto"},className:"main-page-content-wrapper"},o&&o()))),m.a.createElement(T,{style:{textAlign:"center"}},m.a.createElement("div",null,"你睡了一下午，醒的时候屋子里黑漆漆、一点声音都没有。抬头望望窗外，天还没完全黑。四处摸了摸，在枕头下找到手机。打开后屏幕亮起，干净，没有一条消息"),m.a.createElement("div",null,"打开电脑，打开 github。pull request 写得很菜，连 core 都在喷你，但忽然就不孤独了"))))},I=(n(338),n(340)),M=n.n(I),P=(n(1350),n(1359)),H=n.n(P),N=n(1490),q=n(259),z=n(257),J=function(e){var t=e.onDelete,n=e.siderSelectedKey,a=e.dataSource,r=e.onEdit,i=e.onListItemClick,o=e.onHide;return m.a.createElement(H.a,{dataSource:"all"===n?a:a.filter((function(e){return e.subType===n})),renderItem:function(e){return m.a.createElement(M.a,{overlay:function(){return m.a.createElement(y.a,null,m.a.createElement(y.a.Item,{key:"add-".concat(e.id),onClick:function(){return r(e,!0)}},"修改"),m.a.createElement(y.a.Item,{key:"hide-".concat(e.id),onClick:function(){return o&&o(e)}},"隐藏"),m.a.createElement(y.a.Item,{key:"delete-".concat(e.id),onClick:function(){return t&&t(e)}},"删除"))},trigger:["contextMenu"],key:"fragment-".concat(e.id)},m.a.createElement(H.a.Item,{className:"list-item",onClick:function(){return i({category:e.category,id:e.id})}},"mapping"===e.category&&m.a.createElement(q.a,{style:{marginRight:10,fontSize:16,color:"#108ee9"}}),"markdown"===e.category&&m.a.createElement(z.a,{style:{marginRight:10,fontSize:16,color:"#87d068"}}),e.type+" - "+e.subType+" - "+e.title,m.a.createElement("div",{style:{float:"right",marginRight:8}},"".concat(Object(N.a)(new Date(e.createTime||""),"yyyy-MM-dd")," / ").concat(Object(N.a)(new Date(e.modifyTime||""),"yyyy-MM-dd")))))}})},K=(n(1368),n(1383)),U=n.n(K),V=(n(103),n(111)),_=n.n(V),R=(n(104),n(112)),W=n.n(R),A=(n(1371),n(1374)),B=n.n(A),G=x.a.Option,Q={labelCol:{xs:{span:4},sm:{span:4}},wrapperCol:{xs:{span:24},sm:{span:20}}},X=!0,Y=function(e){var t=e.visible,n=e.loading,a=e.selectData,r=e.onCancel,i=e.onSubmit,c=e.dataItem,l=void 0===c?{id:"",type:"",subType:"",category:void 0,title:""}:c,s=B.a.useForm(),f=u()(s,1)[0],p=Object(d.useState)(l.type),h=u()(p,2),y=h[0],v=h[1],E=Object(d.useState)(!1),w=u()(E,2),k=w[0],S=w[1],C=function(e){f.setFieldsValue({type:e}),v(e)},O=f.getFieldsValue();return l.id?X?f.setFieldsValue(o()({},O,l)):f.setFieldsValue(o()({},l,O)):X?f.resetFields():f.setFieldsValue(o()({},l,O)),m.a.createElement(U.a,{visible:t,title:"新建文档",footer:null,onCancel:function(){X=!0,v(""),r()}},m.a.createElement(B.a,o()({},Q,{name:"edit-form",form:f,onFinish:function(e){var t=e.type,n=e.subType,a=e.title,r=e.category;i({title:a,category:r,type:t,subType:n},l)},onFinishFailed:function(e){var t=e.errorFields;f.scrollToField(t.name),i()},onValuesChange:function(){return X=!1}}),m.a.createElement(B.a.Item,{label:"标题",name:"title",required:!0,rules:[{required:!0,message:"标题不能为空"}]},m.a.createElement(g.a,null)),function(e){return m.a.createElement(B.a.Item,{label:"显示类别",name:"category",required:!0,rules:[{required:!0,message:"显示类别不能为空"}]},e?m.a.createElement(g.a,null):m.a.createElement(x.a,null,m.a.createElement(G,{value:"markdown"},"markdown"),m.a.createElement(G,{value:"mapping"},"mapping")))}(k),m.a.createElement(B.a.Item,{label:"文档类别",name:"type",required:!0,rules:[{required:!0,message:"文档类别不能为空"}]},k?m.a.createElement(g.a,null):m.a.createElement(x.a,{onChange:C},a.map((function(e){return m.a.createElement(G,{value:e.key,key:"type-".concat(e.key)},e.title)})))),m.a.createElement(B.a.Item,{label:"文档子类",name:"subType",required:!0,rules:[{required:!0,message:"文档子类不能为空"}]},k?m.a.createElement(g.a,null):m.a.createElement(x.a,null,a.filter((function(e){return e.key===(y||l.type)})).map((function(e){var t=e.children;return(void 0===t?[]:t).map((function(e){return m.a.createElement(G,{value:e.key,key:e.key},e.value)}))})))),m.a.createElement(B.a.Item,null,m.a.createElement(_.a,null,m.a.createElement(W.a,{span:6,push:3},m.a.createElement(b.a,{onClick:function(){return S(!k)}},"编辑")),m.a.createElement(W.a,{span:12,push:12},m.a.createElement(_.a,{gutter:18},m.a.createElement(W.a,{span:9},m.a.createElement(b.a,{type:"danger",onClick:function(){return f.resetFields()}},"清空")),m.a.createElement(W.a,{span:6},m.a.createElement(b.a,{type:"primary",onClick:function(){return f.submit()},loading:n},"确定"))))))))},Z=(n(235),n(311)),$=n.n(Z),ee=(n(1387),n(1398)),te=n.n(ee),ne=n(1393),ae=n.n(ne),re=function(e){var t=e.dataSource,n=void 0===t?[]:t,a=e.onDownload,r=e.wrapperHeight,i=e.onDetail;return m.a.createElement(_.a,{gutter:16,style:{width:"100%"}},n.map((function(e){return m.a.createElement(W.a,{span:4,key:e.detailUrl+"-"+e.postTime},m.a.createElement(ae.a,{height:r,once:!0,scrollContainer:".main-page-content-wrapper"},function(e){var t=e.onDownload,n=e.wrapperHeight,a=e.item,r=e.onDetail;return m.a.createElement(M.a,{overlay:m.a.createElement(y.a,null,m.a.createElement(y.a.Item,{key:"download",onClick:function(){t({url:a.detailUrl})}},"download")),trigger:["contextMenu"]},m.a.createElement(te.a,{hoverable:!0,style:{height:n/2},onClick:function(){return r(a.detailUrl)}},m.a.createElement("img",{alt:a.name,src:a.thumbnailUrl})))}({onDownload:a,wrapperHeight:r,item:e,onDetail:i})))})))},ie=function(e,t,n,a){return new(n||(n=Promise))((function(r,i){function o(e){try{u(a.next(e))}catch(e){i(e)}}function c(e){try{u(a.throw(e))}catch(e){i(e)}}function u(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(o,c)}u((a=a.apply(e,t||[])).next())}))},oe=function(e){var t=e.url;return ie(void 0,void 0,void 0,s.a.mark((function e(){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t){e.next=3;break}return r.a.error("地址为空"),e.abrupt("return","failed");case 3:return r.a.info("response"),e.next=6,fetch("exhentai/download",{body:JSON.stringify({url:t}),method:"POST",headers:{"Content-Type":"application/json"}});case 6:return r.a.success("反应"),e.abrupt("return","success");case 8:case"end":return e.stop()}}),e)})))},ce=function(e){window.open(e)},ue=function(e){var t=e.dataSource,n=m.a.createElement($.a,{description:"该页面仅在本地可用"});return m.a.createElement(m.a.Fragment,null,!t.length&&n,m.a.createElement(re,{dataSource:t,onDownload:oe,wrapperHeight:document.body.clientHeight-48-90,onDetail:ce}))};var le=n(29),se=function(e,t,n,a){return new(n||(n=Promise))((function(r,i){function o(e){try{u(a.next(e))}catch(e){i(e)}}function c(e){try{u(a.throw(e))}catch(e){i(e)}}function u(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(o,c)}u((a=a.apply(e,t||[])).next())}))},de=function(){fetch("exhentai")},me=function(e){var t=e.category,n=e.id;le.c.push("./".concat(t,"/").concat(n))},fe=function(e){return se(void 0,void 0,void 0,s.a.mark((function t(){var n,a;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch(e);case 2:return n=t.sent,t.next=5,n.json();case 5:return a=t.sent,t.abrupt("return",a);case 7:case"end":return t.stop()}}),t)})))};t.default=function(){var e=Object(d.useState)([]),t=u()(e,2),n=t[0],a=t[1],i=Object(d.useState)([]),c=u()(i,2),l=c[0],f=c[1],p=Object(d.useState)(!1),h=u()(p,2),y=h[0],v=h[1],g=Object(d.useState)(!1),E=u()(g,2),b=E[0],w=E[1],x=Object(d.useState)(),k=u()(x,2),S=k[0],C=k[1],O=Object(d.useState)(!1),j=u()(O,2),D=j[0],T=j[1],L=Object(d.useState)([]),I=u()(L,2),M=I[0],P=I[1],H=Object(d.useState)([]),N=u()(H,2),q=N[0],z=N[1],K=Object(d.useState)("all"),U=u()(K,2),V=U[0],_=U[1],R=Object(d.useState)("all"),W=u()(R,2),A=W[0],B=W[1],G=window.__isLocal;!function(){var e=Object(d.useState)(document.body.clientWidth),t=u()(e,2),n=t[0],a=t[1],r=Object(d.useState)(document.body.clientHeight),i=u()(r,2),o=i[0],c=i[1];Object(d.useEffect)((function(){var e=function(){a(document.body.clientWidth),c(document.body.clientHeight)};return window.addEventListener("resize",e),function(){window.removeEventListener("resize",e)}}))}(),Object(d.useEffect)((function(){G&&Q(),Z(),X()}),[]);var Q=function(){fetch("/exhentai/dateSet").then((function(e){return e.json()})).then((function(e){ae(e.length?e[0]:""),P(e)}))},X=function(){return se(void 0,void 0,void 0,s.a.mark((function e(){var t,n;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("./assets/mapping.json");case 2:return t=e.sent,e.next=5,t.json();case 5:n=e.sent,a(n.filter((function(e){return!1!==e.visible})).sort((function(e,t){return t.modifyTime-e.modifyTime})));case 7:case"end":return e.stop()}}),e)})))},Z=function(){return se(void 0,void 0,void 0,s.a.mark((function e(){var t,n;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("./assets/sider.json");case 2:return t=e.sent,e.next=5,t.json();case 5:n=e.sent,f(n);case 7:case"end":return e.stop()}}),e)})))},$=function(e){var t=e.id,n=e.category;return se(void 0,void 0,void 0,s.a.mark((function e(){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/document/delete",{method:"DELETE",body:JSON.stringify({id:t,category:n}),mode:"cors",headers:{"Content-Type":"application/json"}});case 2:X();case 3:case"end":return e.stop()}}),e)})))},ee=function(e,t){v(!!t),C(e)},te=function(e){var t=e.id;return se(void 0,void 0,void 0,s.a.mark((function e(){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("document/hide",{body:JSON.stringify({id:t}),method:"POST",headers:{"Content-Type":"application/json"}});case 2:Z(),X(),r.a.success("隐藏完成");case 5:case"end":return e.stop()}}),e)})))},ne=function(){v(!1)},ae=function(e){return se(void 0,void 0,void 0,s.a.mark((function t(){var n,a;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n="./assets/exhentai/".concat(e,".json"),t.next=3,fe(n);case 3:a=t.sent,z(a);case 5:case"end":return t.stop()}}),t)})))};return m.a.createElement(m.a.Fragment,null,m.a.createElement(F,{onMenuClick:function(e){_(e[1]),B(e[0]),T(e.includes("ex-hentai-module"))},menuData:l,onExhentaiDownload:function(e){return oe({url:e.target.value})},renderContent:function(){return D?m.a.createElement(ue,{dataSource:q}):m.a.createElement(J,{siderSelectedKey:A,onListItemClick:me,onDelete:$,dataSource:n,onEdit:ee,onHide:te})},isLocal:G,exhentaiDateSet:M,onExhentaiSelectChange:ae,onEdit:ee,siderOpenKey:V,siderSelectedKey:A,onExhentaiLoadList:de}),m.a.createElement(Y,{visible:y,selectData:l.filter((function(e){return e.children})),onSubmit:function(e,t){return se(void 0,void 0,void 0,s.a.mark((function n(){var a,i;return s.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(w(!0),!t||!t.id){n.next=8;break}return a=t.id,n.next=5,fetch("document/update/mapping",{body:JSON.stringify(o()({},t,e)),method:"POST",headers:{"Content-Type":"application/json"}});case 5:r.a.success("".concat(e.category," 更新完成")),n.next=15;break;case 8:return n.next=10,fetch("document/add",{body:JSON.stringify(e),method:"POST",headers:{"Content-Type":"application/json"}});case 10:return i=n.sent,n.next=13,i.text();case 13:a=n.sent,r.a.success("".concat(e.category," 初始化完成"));case 15:if(ne(),"mapping"!==e.category){n.next=19;break}return location.href="./mapping/".concat(a),n.abrupt("return");case 19:location.href="./markdown-editor/".concat(a);case 20:case"end":return n.stop()}}),n)})))},onCancel:ne,loading:b,dataItem:S}))}}}]);