(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{1503:function(e,t,a){"use strict";a.r(t);var n=a(89),r=a.n(n),i=a(80),l=a.n(i),u=a(2),o=a.n(u),s=a(0),c=a.n(s),h=a(1481),p=a(1484),g=a(128),m=a.n(g),d=a(1480),f=a(1504),v=a(1482),b=a(1485),x=a(1487),C=a(1498),y=a(1506),E=a(1492),S=a(1493),O=a(69),w=a(33),j=a(66),k=a(71),T=a(1500),B=a(1479),I=Object(j.a)((function(e){return Object(k.a)({container:{display:"flex",flexWrap:"wrap"},root:{flexGrow:1},menuButton:{marginRight:e.spacing(2)},formControl:{margin:e.spacing(1)},title:{flexGrow:1},buttonProgress:{color:B.a[500],position:"absolute",top:"50%",left:"50%",marginTop:-12,marginLeft:-12},buttonSuccess:{backgroundColor:B.a[500],"&:hover":{backgroundColor:B.a[700]}}})})),M=function(e){var t=e.key,a=e.error,n=e.inputLabel,r=e.inputValue,i=e.helperText,l=e.xs,u=e.unit,o=void 0===u?"mm":u,s=e.readOnly,p=void 0!==s&&s,g=e.required,m=void 0===g||g,C=e.onChange,y=e.onBlur,E=e.classes,S=e.shrink,O=void 0!==S&&S;return c.a.createElement(d.a,{item:!0,xs:l,key:t},c.a.createElement(h.a,{required:m,className:E.formControl,error:a},c.a.createElement(f.a,{shrink:O||!!r},n),c.a.createElement(v.a,{value:r,type:"number",onChange:function(e){return C(e,t)},onBlur:y,endAdornment:c.a.createElement(b.a,{position:"end"},o),readOnly:p}),c.a.createElement(x.a,null,i)))},L=function(e){var t=e.formOptions,a=e.formData,n=e.classes,i=e.handleSelectChange,l=e.handleAutocompleteChange,u=e.handleInputChange,o=e.onSpecificationInputBlur,s=function(e,t){var a=parseInt(""+t.materialType);return e.filter((function(e){return 0===a?!t.length||t.length==e["长"]:1===a?t.length&&t.width?t.length==e["长"]&&t.width==e["宽"]:t.width?t.width==e["宽"]:!t.length||t.length==e["长"]:void 0}))}(t.materialId,a);return c.a.createElement(c.a.Fragment,null,c.a.createElement(h.a,{required:!0,fullWidth:!0,className:n.formControl,error:a.materialTypeError},c.a.createElement(f.a,null,"类别"),c.a.createElement(C.a,{value:a.materialType,onChange:i},t.materialType.map((function(e){var t=e.text,a=e.value;return c.a.createElement(y.a,{value:a,key:t+"-"+a},t)})))),function(e){var t=e.handleInputChange,a=e.formData,n=e.onSpecificationInputBlur,r=e.classes;switch(parseInt(""+a.materialType)){case 0:return M({key:"length",error:a.lengthError,inputLabel:"截面直径",inputValue:a.length,helperText:a.lengthMessage,xs:6,onChange:t,onBlur:n,classes:r});case 1:return c.a.createElement(c.a.Fragment,null,M({key:"length",error:a.lengthError,inputLabel:"截面长度",inputValue:a.length,helperText:a.lengthMessage,xs:6,onChange:t,onBlur:n,classes:r}),M({key:"width",error:a.widthError,inputLabel:"截面宽度",inputValue:a.width,helperText:a.widthMessage,xs:6,onChange:t,onBlur:n,classes:r}));default:return null}}({handleInputChange:u,formData:a,onSpecificationInputBlur:o,classes:n}),c.a.createElement(h.a,{fullWidth:!0,error:a.materialTypeError,className:n.formControl},c.a.createElement(T.a,{options:s,getOptionLabel:function(e){return e["材质"]},value:a.materialId,onChange:l,id:"material-id","aria-controls":"material-id",renderInput:function(e){return c.a.createElement(E.a,r()({},e,{fullWidth:!0,margin:"normal",required:!0,label:"材质",error:a.materialTypeError}))}}),c.a.createElement(x.a,null,a.materialTypeMessage)))},V=function(e){var t=e.classes,a=e.onSubmit,n=e.loading,r=e.success,i=Object(w.a)(m()({},t.buttonSuccess,r));return c.a.createElement(h.a,{fullWidth:!0,className:t.formControl},c.a.createElement(S.a,{variant:"contained",color:"primary",className:i,disabled:n,onClick:a},"保存"),n&&c.a.createElement(O.a,{size:24,className:t.buttonProgress}))},W=function(e){var t=e.onSubmit,a=e.formData,n=e.onChange,r=e.onSpecificationInputBlur,i=e.formOptions,l=e.loading,u=e.success,o=I(),s=function(e,t){n({text:e.target.value,value:e.target.value},"input",t)};return c.a.createElement("div",{className:o.container},L({formOptions:i,formData:a,classes:o,handleSelectChange:function(e){n({text:"",value:e.target.value},"select")},handleAutocompleteChange:function(e,t){n(t,"autoComplete")},handleInputChange:s,onSpecificationInputBlur:r}),M({key:"weight",error:a.weightError,inputLabel:"实际重量",inputValue:a.weight,helperText:a.weightMessage,xs:6,unit:"kg",onChange:s,onBlur:r,classes:o}),M({key:"height",error:a.heightError,inputLabel:"高度",inputValue:a.height,helperText:a.heightMessage,xs:6,onChange:s,onBlur:r,classes:o}),M({key:"materialCost",error:a.materialCostError,inputLabel:"单价",inputValue:a.materialCost,helperText:a.materialCostMessage,xs:6,unit:"元/kg",onChange:s,onBlur:r,classes:o}),M({key:"freight",error:a.freightError,inputLabel:"运费",inputValue:a.freight,helperText:a.freightMessage,xs:6,unit:"元",onChange:s,onBlur:r,classes:o}),M({key:"extraCost",error:!1,inputLabel:"其他费用",inputValue:a.extraCost,helperText:"",xs:6,unit:"元",onChange:s,onBlur:r,classes:o}),M({key:"predictWeight",error:!1,inputLabel:"预估重量",inputValue:a.predictWeight,helperText:"计算公式：体积 x 密度",xs:6,unit:"kg",readOnly:!0,required:!1,onChange:s,onBlur:r,classes:o}),c.a.createElement(h.a,{fullWidth:!0,className:o.formControl},c.a.createElement(p.a,{placeholder:"备注",rows:8,onChange:function(e){return s(e,"description")},value:a.description})),V({classes:o,onSubmit:t,loading:l,success:u}))},F=function(e){var t=e.onSubmit,a=e.formData,n=e.formOptions,r=e.onChange,i=e.onSpecificationInputBlur,l=e.loading,u=e.success,o=I(),s=function(e,t){r({text:e.target.value,value:e.target.value},"input",t)};return c.a.createElement("div",{className:o.container},L({formOptions:n,formData:a,classes:o,handleSelectChange:function(e){r({text:"",value:e.target.value},"select")},handleAutocompleteChange:function(e,t){r(t,"autoComplete")},handleInputChange:s,onSpecificationInputBlur:i}),M({key:"weight",error:a.weightError,inputLabel:"实际重量",inputValue:a.weight,helperText:a.weightMessage,xs:6,unit:"kg",onChange:s,onBlur:i,classes:o}),M({key:"height",error:a.heightError,inputLabel:"高度",inputValue:a.height,helperText:a.heightMessage,xs:6,onChange:s,onBlur:i,classes:o}),M({key:"materialQuantity",error:a.materialQuantityError,inputLabel:"数量",inputValue:a.materialQuantity,helperText:a.materialQuantityMessage,xs:6,unit:"个",onChange:s,onBlur:i,classes:o}),M({key:"materialCost",error:!1,inputLabel:"单价",inputValue:a.materialCost,helperText:"",xs:6,unit:"元/kg",readOnly:!0,required:!1,onChange:s,onBlur:i,classes:o}),M({key:"predictWeight",error:!1,inputLabel:"预估重量",inputValue:a.predictWeight,helperText:"计算公式：体积 x 密度",xs:6,unit:"kg",readOnly:!0,required:!1,onChange:s,onBlur:i,classes:o}),M({key:"costFee",error:!1,inputLabel:"据费",inputValue:a.costFee,helperText:"",xs:6,unit:"元/个",readOnly:!0,required:!1,onChange:s,onBlur:i,classes:o}),M({key:"predictPrice",error:!1,inputLabel:"预估总价",inputValue:a.predictPrice,helperText:"",xs:6,unit:"元",readOnly:!0,required:!1,onChange:s,onBlur:i,classes:o}),c.a.createElement(h.a,{fullWidth:!0,className:o.formControl},c.a.createElement(p.a,{placeholder:"备注",rows:8,onChange:function(e){return s(e,"description")},value:a.description})),V({classes:o,onSubmit:t,loading:l,success:u}))},N=a(1494),q=a(1495),D=a(1491),P=a(1486),Q=a(1321),A=a.n(Q),J=function(e,t,a,n){return new(a||(a=Promise))((function(r,i){function l(e){try{o(n.next(e))}catch(e){i(e)}}function u(e){try{o(n.throw(e))}catch(e){i(e)}}function o(e){var t;e.done?r(e.value):(t=e.value,t instanceof a?t:new a((function(e){e(t)}))).then(l,u)}o((n=n.apply(e,t||[])).next())}))};t.default=function(){var e=Object(s.useState)(!1),t=o()(e,2),a=t[0],n=t[1],i=Object(s.useState)(!1),u=o()(i,2),h=u[0],p=u[1],g=Object(s.useState)([]),m=o()(g,2),d=m[0],f=m[1],v=Object(s.useState)([]),b=o()(v,2),x=b[0],C=b[1],y=Object(s.useState)(0),E=o()(y,2),S=E[0],O=E[1],w=Object(s.useState)(),j=o()(w,2),k=j[0],T=j[1],B=Object(s.useState)(!1),I=o()(B,2),M=I[0],L=I[1],V=Object(s.useState)(""),Q=o()(V,2),G=Q[0],z=Q[1],R=Object(s.useState)(),H=o()(R,2),K=H[0],U=H[1],X=Object(s.useState)(!1),Y=o()(X,2),Z=Y[0],$=Y[1],_=Object(s.useState)(""),ee=o()(_,2),te=ee[0],ae=ee[1],ne=Object(s.useState)(),re=o()(ne,2),ie=re[0],le=re[1],ue=Object(s.useState)(!1),oe=o()(ue,2),se=oe[0],ce=oe[1],he=Object(s.useState)(""),pe=o()(he,2),ge=pe[0],me=pe[1],de=Object(s.useState)(),fe=o()(de,2),ve=fe[0],be=fe[1],xe=Object(s.useState)(!1),Ce=o()(xe,2),ye=Ce[0],Ee=Ce[1],Se=Object(s.useState)(""),Oe=o()(Se,2),we=Oe[0],je=Oe[1],ke=Object(s.useState)(),Te=o()(ke,2),Be=Te[0],Ie=Te[1],Me=Object(s.useState)(!1),Le=o()(Me,2),Ve=Le[0],We=Le[1],Fe=Object(s.useState)(""),Ne=o()(Fe,2),qe=Ne[0],De=Ne[1],Pe=Object(s.useState)(),Qe=o()(Pe,2),Ae=Qe[0],Je=Qe[1],Ge=Object(s.useState)(!1),ze=o()(Ge,2),Re=ze[0],He=ze[1],Ke=Object(s.useState)(""),Ue=o()(Ke,2),Xe=Ue[0],Ye=Ue[1],Ze=Object(s.useState)(),$e=o()(Ze,2),_e=$e[0],et=$e[1],tt=Object(s.useState)(!1),at=o()(tt,2),nt=at[0],rt=at[1],it=Object(s.useState)(""),lt=o()(it,2),ut=lt[0],ot=lt[1],st=Object(s.useState)(),ct=o()(st,2),ht=ct[0],pt=ct[1],gt=Object(s.useState)(),mt=o()(gt,2),dt=mt[0],ft=mt[1],vt=Object(s.useState)(!1),bt=o()(vt,2),xt=bt[0],Ct=bt[1],yt=Object(s.useState)(""),Et=o()(yt,2),St=Et[0],Ot=Et[1],wt=Object(s.useState)(),jt=o()(wt,2),kt=jt[0],Tt=jt[1],Bt=Object(s.useState)(""),It=o()(Bt,2),Mt=It[0],Lt=It[1],Vt=Object(s.useState)(),Wt=o()(Vt,2),Ft=Wt[0],Nt=Wt[1],qt=Object(s.useState)(!1),Dt=o()(qt,2),Pt=Dt[0],Qt=Dt[1],At=Object(s.useState)(""),Jt=o()(At,2),Gt=Jt[0],zt=Jt[1],Rt=Object(s.useState)(0),Ht=o()(Rt,2),Kt=Ht[0],Ut=Ht[1],Xt=Object(s.useState)(0),Yt=o()(Xt,2),Zt=Yt[0],$t=Yt[1];Object(s.useEffect)((function(){J(void 0,void 0,void 0,l.a.mark((function e(){var t,a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/toy/get/get-material-type?sign=1");case 2:return t=e.sent,e.next=5,t.json();case 5:a=e.sent,f(a);case 7:case"end":return e.stop()}}),e)})))}),[]);var _t=function(){var e=!1;return k||(L(!0),z("该项不能为空"),e=!0),""===ie&&(ce(!0),me("该项不能为空"),e=!0),ve||(Ee(!0),je("该项不能为空"),e=!0),Be||"0"===k||(We(!0),De("该项不能为空"),e=!0),Ae||(He(!0),Ye("该项不能为空"),e=!0),_e||(rt(!0),ot("该项不能为空"),e=!0),dt||(Ct(!0),Ot("该项不能为空"),e=!0),{hasError:e,params:{materialType:k,materialCost:ie,type:S,length:ve,width:Be,height:Ae,weight:_e,freight:dt,description:Mt,extraCost:kt,materialId:K,materialQuantity:Ft}}},ea=function(e){return J(void 0,void 0,void 0,l.a.mark((function t(){var a,n;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("/toy/get/get-detail?materialType="+e);case 2:return a=t.sent,t.next=5,a.json();case 5:n=t.sent,C(n);case 7:case"end":return t.stop()}}),t)})))},ta={materialType:k,materialTypeError:M,materialTypeMessage:G,materialId:K,materialIdError:Z,materialIdMessage:te,materialCost:ie,materialCostError:se,materialCostMessage:ge,type:S,length:ve,lengthError:ye,lengthMessage:we,width:Be,widthError:Ve,widthMessage:qe,height:Ae,heightError:Re,heightMessage:Xe,weight:_e,weightError:nt,weightMessage:ut,predictWeight:ht,freight:dt,freightError:xt,freightMessage:St,extraCost:kt,description:Mt},aa={loading:a,success:h,onSubmit:function(){return J(void 0,void 0,void 0,l.a.mark((function e(){var t,a,r,i,u;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n(!0),t=_t(),a=t.hasError,r=t.params,!a){e.next=4;break}return e.abrupt("return");case 4:return e.next=6,fetch("/toy/good/in",{body:JSON.stringify(r),method:"POST",headers:{"Content-Type":"application/json"}});case 6:return i=e.sent,e.next=9,i.text();case 9:return u=e.sent,n(!1),p("success"===u),setTimeout((function(){p(!1)}),2e3),e.abrupt("return",r);case 14:case"end":return e.stop()}}),e)})))},formOptions:{materialType:d,materialId:x},onChange:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{value:"",text:""},t=arguments.length>1?arguments[1]:void 0,a=arguments.length>2?arguments[2]:void 0,n={materialCost:function(){le(e.value),ce(""===e.value),me(""===e.value?"该项不能为空":"")},freight:function(){ft(e.value),Ct(""===e.value),Ot(""===e.value?"该项不能为空":"")},extraCost:function(){Tt(e.value)},description:function(){Lt(e.value)},length:function(){be(e.value),Ee(!e.value),je(e.value?"":"该项不能为空")},width:function(){Ie(e.value),We(!e.value),De(e.value?"":"该项不能为空")},height:function(){Je(e.value),He(!e.value),Ye(e.value?"":"该项不能为空")},weight:function(){et(e.value),rt(!e.value),ot(e.value?"":"该项不能为空")},predictWeight:function(){},materialQuantity:function(){Nt(e.value),Qt(!e.value),zt(e.value?"":"该项不能为空")},costFee:function(){},predictPrice:function(){}};switch(t){case"input":n[a]();break;case"select":e.value&&ea(e.value),T(e.value);break;case"autoComplete":if(null===e)return U(""),Ut(0),void le(0);Ut(e["锯费"]),le(e["单价"]),U(e.id),$(""===e.id),ae(""===e.id?"该项不能为空":"")}},onSpecificationInputBlur:function(){!function(e){$t(parseFloat((e*ie+Ft*Kt).toFixed(1)))}(function(e,t,a,n,r){0!==r||n||(n=1);var i=function(e,t,a){var r=Math.PI*e*e;return t&&(r=e*t),parseFloat((r*a*7.874/1e3*n).toFixed(2))}(e/2/10,t/10,a/10);return e&&a?pt(i):e&&t&&a&&pt(i),i}(ve,Be,Ae,Ft,S))}};return c.a.createElement(c.a.Fragment,null,c.a.createElement(N.a,{position:"static"},c.a.createElement(q.a,null,c.a.createElement(D.a,{edge:"start",color:"inherit","aria-label":"menu",onClick:function(){return O(0===S?1:0)}},c.a.createElement(A.a,null)),c.a.createElement(P.a,{variant:"h6"},S?"出库":"入库"))),S?c.a.createElement(F,r()({formData:r()({},ta,{materialQuantity:Ft,materialQuantityError:Pt,materialQuantityMessage:Gt,costFee:Kt,predictPrice:Zt})},aa)):c.a.createElement(W,r()({formData:ta},aa)))}}}]);