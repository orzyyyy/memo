(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{350:function(e,t,a){"use strict";a.r(t);var r=a(74),n=a.n(r),l=a(2),i=a.n(l),o=a(79),s=a.n(o),u=a(75),c=a.n(u),p=a(0),m=a.n(p),d=a(327),y=a(330),g=a(326),h=a(352),f=a(328),v=a(331),T=a(333),w=a(345),k=a(354),C=a(338),x=a(339),b=a(70),E=a(355),I=a(340),O=a(337),F=a(215),S=a.n(F),B=a(214),N=a.n(B),V=a(213),W=a.n(V),L=a(67),Q=a(72),P=a(348),j=a(325),D=Object(L.a)((function(e){return Object(Q.a)({container:{display:"flex",flexWrap:"wrap"},root:{flexGrow:1},menuButton:{marginRight:e.spacing(2)},formControl:{margin:e.spacing(1)},title:{flexGrow:1},buttonProgress:{position:"absolute",top:"50%",left:"50%",marginTop:-12,marginLeft:-50},buttonSuccess:{backgroundColor:j.a[500],"&:hover":{backgroundColor:j.a[700]}},success:{backgroundColor:j.a[600]},failed:{backgroundColor:e.palette.error.dark},icon:{fontSize:20},iconVariant:{opacity:.9,marginRight:e.spacing(1)},message:{display:"flex",alignItems:"center"}})})),q=function(e){var t=e.key,a=e.error,r=e.inputLabel,n=e.inputValue,l=e.helperText,i=e.xs,o=e.unit,s=void 0===o?"mm":o,u=e.readOnly,c=void 0!==u&&u,p=e.required,y=void 0===p||p,w=e.onChange,k=e.onBlur,C=e.classes,x=e.shrink,b=void 0!==x&&x,E=e.stateType,I=e.fullWidth,O=void 0!==I&&I;return m.a.createElement(g.a,{item:!0,xs:i,key:t},m.a.createElement(d.a,{required:y,fullWidth:O,className:C.formControl,error:a},m.a.createElement(h.a,{shrink:b||!!n||0===n},r),m.a.createElement(f.a,{value:n,type:"number",onChange:function(e){return w({item:{text:e.target.value,value:e.target.value},controllType:"input",key:t,stateType:E})},onBlur:k,endAdornment:m.a.createElement(v.a,{position:"end"},s),readOnly:c}),m.a.createElement(T.a,null,l)))},R=function(e){var t=e.formOptions,a=e.formData,r=e.classes,n=e.onSpecificationInputBlur,l=e.onChange,i=function(e,t){var a=parseInt(""+t.materialType.value);return e.filter((function(e){return 0===a?!t.length.value||t.length.value==e.length:1===a?t.length.value&&t.width.value?t.length.value==e.length&&t.width.value==e.width:t.width.value?t.width.value==e.width:!t.length.value||t.length.value==e.length:2!==a&&(3!==a&&void 0)})).filter((function(e){return e.sellType==t.sellType.value}))}(t.materialId,a);return m.a.createElement(m.a.Fragment,null,m.a.createElement(d.a,{required:!0,fullWidth:!0,className:r.formControl,error:a.materialType.error},m.a.createElement(h.a,{shrink:-1!==a.materialType.value},"类别"),m.a.createElement(w.a,{value:a.materialType.value,onChange:function(e){return l({item:{text:e.target.value,value:e.target.value},controllType:"select",key:"materialType",stateType:"stateful"})}},t.materialType.map((function(e){var t=e.text,a=e.value;return m.a.createElement(k.a,{value:a,key:t+"-"+a},t)})))),m.a.createElement(d.a,{required:!0,fullWidth:!0,className:r.formControl,error:a.sellType.error},m.a.createElement(h.a,{shrink:-1!==a.sellType.value},"卖出方式"),m.a.createElement(w.a,{value:a.sellType.value,onChange:function(e){return l({item:{text:e.target.value,value:e.target.value},controllType:"select",key:"sellType",stateType:"stateful"})}},t.sellType.map((function(e){var t=e.text,a=e.value;return m.a.createElement(k.a,{value:a,key:t+"-"+a},t)})))),function(e){var t=e.onChange,a=e.formData,r=e.onSpecificationInputBlur,n=e.classes;switch(parseInt(a.materialType.value+"")){case 0:return m.a.createElement(m.a.Fragment,null,q({key:"length",error:a.length.error,inputLabel:"截面直径",inputValue:a.length.value,helperText:a.length.message,xs:6,onChange:t,onBlur:r,classes:n,stateType:"stateful"}));case 1:return m.a.createElement(m.a.Fragment,null,q({key:"length",error:a.length.error,inputLabel:"截面长度",inputValue:a.length.value,helperText:a.length.message,xs:6,onChange:t,onBlur:r,classes:n,stateType:"stateful"}),q({key:"width",error:a.width.error,inputLabel:"截面宽度",inputValue:a.width.value,helperText:a.width.message,xs:6,onChange:t,onBlur:r,classes:n,stateType:"stateful"}));default:return null}}({onChange:l,formData:a,onSpecificationInputBlur:n,classes:r}),m.a.createElement(d.a,{fullWidth:!0,error:a.materialId.error,className:r.formControl},m.a.createElement(P.a,{options:i,getOptionLabel:function(e){return e.text},value:a.materialId.value,onChange:function(e,t){return l({item:t,controllType:"autoComplete",key:"materialId",stateType:"stateful"})},id:"material-id","aria-controls":"material-id",renderInput:function(e){return m.a.createElement(C.a,c()({},e,{fullWidth:!0,margin:"normal",required:!0,label:"材质",error:a.materialId.error}))}}),m.a.createElement(T.a,null,a.materialId.message)))},z=function(e){var t=e.classes,a=e.onSubmit,r=e.loading;return m.a.createElement(d.a,{fullWidth:!0,className:t.formControl},m.a.createElement(x.a,{variant:"contained",color:"primary",disabled:r,onClick:a},"保存"),r&&m.a.createElement(b.a,{size:24,className:t.buttonProgress}))},J=function(e){var t=e.type,a=e.message,r=e.open,n=e.onClose,l=D();return m.a.createElement(E.a,{anchorOrigin:{vertical:"top",horizontal:"center"},open:r},m.a.createElement(I.a,{className:l[t],message:m.a.createElement("span",{className:l.message},"success"===t?m.a.createElement(W.a,{className:l.iconVariant}):m.a.createElement(N.a,{className:l.iconVariant}),m.a.createElement("span",null,a)),action:[m.a.createElement(O.a,{key:"close","aria-label":"close",color:"inherit",onClick:n},m.a.createElement(S.a,{className:l.icon}))]}))},G=function(e){var t=e.onSubmit,a=e.formData,r=e.onChange,n=e.onSpecificationInputBlur,l=e.formOptions,i=e.loading,o=D();return m.a.createElement("div",{className:o.container},R({formOptions:l,formData:a,classes:o,onChange:r,onSpecificationInputBlur:n}),q({key:"weight",error:a.weight.error,inputLabel:"实际重量",inputValue:a.weight.value,helperText:a.weight.message,xs:6,unit:"kg",onChange:r,onBlur:n,classes:o,stateType:"stateful"}),m.a.createElement(d.a,{fullWidth:!0,className:o.formControl},m.a.createElement(y.a,{placeholder:"备注",rows:8,onChange:function(e){return r({item:{text:e.target.value,value:e.target.value},controllType:"input",key:"description",stateType:"stateless"})},value:a.description})),z({classes:o,onSubmit:t,loading:i}))},U=function(e){var t=e.onSubmit,a=e.formData,r=e.formOptions,n=e.onChange,l=e.onSpecificationInputBlur,i=e.loading,o=D();return m.a.createElement("div",{className:o.container},R({formOptions:r,formData:a,classes:o,onChange:n,onSpecificationInputBlur:l}),q({key:"weight",error:a.weight.error,inputLabel:"实际重量",inputValue:a.weight.value,helperText:a.weight.message,xs:6,unit:"kg",onChange:n,onBlur:l,classes:o,stateType:"stateful"}),q({key:"materialQuantity",error:a.materialQuantity.error,inputLabel:"数量",inputValue:a.materialQuantity.value,helperText:a.materialQuantity.message,xs:6,unit:"个",onChange:n,onBlur:l,classes:o,stateType:"stateful"}),q({key:"materialCost",error:!1,inputLabel:"单价",inputValue:a.materialCost,helperText:"",xs:6,unit:"元/kg",readOnly:!0,required:!1,onChange:n,onBlur:l,classes:o,stateType:"stateless"}),q({key:"costFee",error:!1,inputLabel:"锯费",inputValue:a.costFee,helperText:"",xs:6,unit:"元/个",readOnly:!0,required:!1,onChange:n,onBlur:l,classes:o,stateType:"stateless"}),q({key:"predictPrice",error:!1,inputLabel:"预估总价",inputValue:a.predictPrice||"",helperText:"",xs:6,unit:"元",readOnly:!0,required:!1,onChange:n,onBlur:l,classes:o,stateType:"stateless"}),m.a.createElement(d.a,{fullWidth:!0,className:o.formControl},m.a.createElement(y.a,{placeholder:"备注",rows:8,onChange:function(e){return n({item:{text:e.target.value,value:e.target.value},controllType:"input",key:"description",stateType:"stateless"})},value:a.description})),z({classes:o,onSubmit:t,loading:i}))},A=a(341),H=a(342),K=a(332),M=a(216),X=a.n(M),Y=function(e,t,a,r){return new(a||(a=Promise))((function(n,l){function i(e){try{s(r.next(e))}catch(e){l(e)}}function o(e){try{s(r.throw(e))}catch(e){l(e)}}function s(e){var t;e.done?n(e.value):(t=e.value,t instanceof a?t:new a((function(e){e(t)}))).then(i,o)}s((r=r.apply(e,t||[])).next())}))},Z={value:-1,error:!1,message:""},$={value:"",error:!1,message:""},_={materialType:Z,materialId:c()({},Z,{value:{text:"",value:-1}}),length:$,width:$,weight:$,materialQuantity:$,sellType:Z},ee={type:0,predictWeight:"",extraCost:"",description:"",costFee:"",predictPrice:"",materialCost:""},te={loading:!1,submitSuccess:!1,submitFailed:!1},ae={materialTypeOption:[],materialIdOption:[],sellTypeOption:[]},re=function(e,t){var a=function(a){return t.data.value===a?c()(c()({},e),s()({},t.key,{value:a,error:!0,message:"该项不能为空"})):c()(c()({},e),s()({},t.key,{value:"autoComplete"===t.type?{text:t.data.text,value:t.data.value}:t.data.value,error:t.data.value===a,message:t.data.value===a?"该项不能为空":""}))};switch(t.type){case"input":return a("");case"select":case"autoComplete":return a(-1);default:throw new Error('Unknown type "'.concat(t.type,'" in statefulReducer.'))}},ne=function(e,t){return c()(c()({},e),s()({},t.type,t.data))},le=function(e,t){switch(t.type){case"loading":return{loading:!0,submitSuccess:!1,submitFailed:!1};case"reset":return{loading:!1,submitSuccess:!1,submitFailed:!1};case"success":return c()(c()({},e),{submitSuccess:!0});case"failed":return c()(c()({},e),{submitFailed:!0});default:throw new Error('Unknown type "'.concat(t.type,'" in viewStateReducer.'))}},ie=function(e,t){return c()(c()({},e),s()({},t.type,t.data))};t.default=function(){var e=Object(p.useReducer)(re,_),t=i()(e,2),a=t[0],r=t[1],l=Object(p.useReducer)(ne,ee),o=i()(l,2),s=o[0],u=o[1],d=Object(p.useReducer)(le,te),y=i()(d,2),g=y[0],h=y[1],f=Object(p.useReducer)(ie,ae),v=i()(f,2),T=v[0],w=v[1];Object(p.useEffect)((function(){var e=function(e,t){return Y(void 0,void 0,void 0,n.a.mark((function a(){var r,l;return n.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,fetch("/toy/get/get-material-type?sign="+e);case 2:return r=a.sent,a.next=5,r.json();case 5:return l=a.sent,a.t0=t,a.next=9,l;case 9:a.t1=a.sent,(0,a.t0)(a.t1);case 11:case"end":return a.stop()}}),a)})))};e(1,(function(e){return w({type:"materialTypeOption",data:e})})),e(9,(function(e){return w({type:"sellTypeOption",data:e})}))}),[]);var k=function(){var e=a.materialType,t=a.length,n=a.width,l=a.weight,i=a.sellType,o=a.materialId,u=a.materialQuantity;r({type:"select",key:"materialType",data:e}),r({type:"input",key:"length",data:t}),""===n.value&&-1!==e.value&&r({type:"input",key:"width",data:n}),r({type:"input",key:"weight",data:l}),r({type:"input",key:"materialQuantity",data:u}),r({type:"select",key:"sellType",data:i}),r({type:"autoComplete",key:"materialId",data:o.value});var c={type:s.type,materialId:o.value.value,weight:l.value,description:s.description},p=!1;return""!==c.materialId&&-1!==c.materialId||(p=!0),l||(p=!0),{hasError:p,params:c}},C=function(){var e=a.materialQuantity,t=a.length,n=a.width,l=a.weight,i=a.materialType,o=a.sellType,s=a.materialId;h({type:"reset"}),u({type:"description",data:""}),u({type:"costFee",data:0}),u({type:"predictPrice",data:0}),r({type:"input",key:"materialQuantity",data:e}),r({type:"input",key:"length",data:t}),r({type:"input",key:"width",data:n}),r({type:"input",key:"weight",data:l}),r({type:"select",key:"materialType",data:i}),r({type:"select",key:"sellType",data:o}),r({type:"autoComplete",key:"materialId",data:s})},x={materialType:a.materialType,materialId:a.materialId,materialCost:s.materialCost,type:s.type,length:a.length,width:a.width,weight:a.weight,predictWeight:s.predictWeight,extraCost:s.extraCost,description:s.description,sellType:a.sellType,materialQuantity:a.materialQuantity},b={loading:g.loading,onSubmit:function(){return Y(void 0,void 0,void 0,n.a.mark((function e(){var t,a,r,l,i;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=k(),a=t.hasError,r=t.params,!a){e.next=3;break}return e.abrupt("return");case 3:return h({type:"loading"}),e.next=6,fetch("/toy/good/in",{body:JSON.stringify(r),method:"POST",headers:{"Content-Type":"application/json"}});case 6:return l=e.sent,e.next=9,l.text();case 9:return i=e.sent,h({type:"success"===i?"success":"failed"}),e.abrupt("return",r);case 12:case"end":return e.stop()}}),e)})))},formOptions:{materialType:T.materialTypeOption,materialId:T.materialIdOption,sellType:T.sellTypeOption},onChange:function(e){var t,a=e.item,l=e.controllType,i=e.key,o=e.stateType,c=function(e){"stateful"===o?("autoComplete"===l&&1===s.type&&u({type:"materialCost",data:a.materialCost}),r({type:e,key:i,data:a})):"stateless"===o&&u({type:i,data:a.value})};switch(l){case"input":c(l);break;case"select":-1!==a.value&&"materialType"===i&&(t=a.value,Y(void 0,void 0,void 0,n.a.mark((function e(){var a,r,l;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/toy/get/get-detail?materialType="+t);case 2:return a=e.sent,e.next=5,a.json();case 5:r=e.sent,l=[],r.map((function(e){l.push({value:e.id,text:e["材质"],costFee:e["锯费"],materialCost:e["单价"],length:e["长"],width:e["宽"],sellType:e["卖出方式"]})})),w({type:"materialIdOption",data:l});case 9:case"end":return e.stop()}}),e)})))),c(l);break;case"autoComplete":u({type:"costFee",data:a?a.costFee:0}),c(l)}},onSpecificationInputBlur:function(){var e=a.materialQuantity,t=a.weight,r=function(e,t,a,r){return e*a+r*t}(parseFloat(t.value)||0,s.costFee||0,parseFloat(s.materialCost+""),parseFloat(e.value)||0);u({type:"predictPrice",data:parseFloat(r.toFixed(1))})}};return m.a.createElement(m.a.Fragment,null,m.a.createElement(A.a,{position:"static"},m.a.createElement(H.a,null,m.a.createElement(O.a,{edge:"start",color:"inherit","aria-label":"menu",onClick:function(){return u({type:"type",data:0===s.type?1:0})}},m.a.createElement(X.a,null)),m.a.createElement(K.a,{variant:"h6"},s.type?"出库":"入库"))),J({type:"success",message:"保存成功",open:g.submitSuccess,onClose:C}),J({type:"failed",message:"保存失败",open:g.submitFailed,onClose:C}),s.type?m.a.createElement(U,c()({formData:c()({},x,{costFee:s.costFee,predictPrice:s.predictPrice})},b)):m.a.createElement(G,c()({formData:x},b)))}}}]);