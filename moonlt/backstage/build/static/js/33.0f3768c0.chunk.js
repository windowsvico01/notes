(window.webpackJsonp=window.webpackJsonp||[]).push([[33,68],{168:function(t,n,e){"use strict";e.r(n),e.d(n,"initialState",function(){return o});var r=e(412),a=e(146),i=e(239),o={modalVisible:!1,editCid:"",category:[],total:0,fields:[]};n.default=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:o,n=arguments.length>1?arguments[1]:void 0;return Object(a.a)(t,function(e){switch(n.type){case i.LOAD_CATEGORY_SUCCESS:e.category=n.data.category,e.total=n.data.total;break;case i.FIELDS_CHANGE:n.editCid&&(e.editCid=n.editCid),e.fields=Object(r.a)(n.fields);break;case i.MODAL_VISIBLE_TOGGLE:n.bool||(e.editCid=""),e.modalVisible=n.bool;break;default:return t}})}},239:function(t,n,e){"use strict";e.r(n),e.d(n,"ADD_CATEGORY",function(){return r}),e.d(n,"ADD_CATEGORY_SUCCESS",function(){return a}),e.d(n,"LOAD_CATEGORY",function(){return i}),e.d(n,"LOAD_CATEGORY_SUCCESS",function(){return o}),e.d(n,"ADD",function(){return u}),e.d(n,"FIELDS_CHANGE",function(){return d}),e.d(n,"MODAL_VISIBLE_TOGGLE",function(){return c}),e.d(n,"UPDATE_CATEGORY",function(){return f}),e.d(n,"add",function(){return C}),e.d(n,"addCategory",function(){return s}),e.d(n,"addCategorySuccess",function(){return A}),e.d(n,"loadCategory",function(){return g}),e.d(n,"loadCategorySuccess",function(){return l}),e.d(n,"fieldsChange",function(){return y}),e.d(n,"modalVisibleToggle",function(){return E}),e.d(n,"updateCategory",function(){return O});var r="/Manage/Category/List/ADD_CATEGORY",a="/Manage/Category/List/ADD_CATEGORY_SUCCESS",i="/Manage/Category/List/LOAD_CATEGORY",o="/Manage/Category/List/LOAD_CATEGORY_SUCCESS",u="/Manage/Category/List/ADD",d="/Manage/Category/List/FIELDS_CHANGE",c="/Manage/Category/List/MODAL_VISIBLE_TOGGLE",f="/Manage/Category/List/UPDATE_CATEGORY";function C(t){return{type:u,params:t}}function s(t){return{type:r,params:t}}function A(t){return{type:a,data:t}}function g(t){return{type:i}}function l(t){return{type:o,data:t}}function y(t,n){return{type:d,fields:t,editCid:n}}function E(t,n){return{type:c,bool:t,editCid:n}}function O(t){return{type:f,params:t}}},412:function(t,n,e){"use strict";function r(t){return function(t){if(Array.isArray(t)){for(var n=0,e=new Array(t.length);n<t.length;n++)e[n]=t[n];return e}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}e.d(n,"a",function(){return r})}}]);
//# sourceMappingURL=33.0f3768c0.chunk.js.map