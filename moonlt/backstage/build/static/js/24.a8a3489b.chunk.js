(window.webpackJsonp=window.webpackJsonp||[]).push([[24,45],{157:function(n,e,t){"use strict";function r(n){return function(n){if(Array.isArray(n)){for(var e=0,t=new Array(n.length);e<n.length;e++)t[e]=n[e];return t}}(n)||function(n){if(Symbol.iterator in Object(n)||"[object Arguments]"===Object.prototype.toString.call(n))return Array.from(n)}(n)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}t.r(e);var u=t(135),i=t(205);t.d(e,"initialState",function(){return o});var o={modalVisible:!1,editId:"",menus:[],fields:[]};e.default=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:o,e=arguments.length>1?arguments[1]:void 0;return Object(u.a)(n,function(t){switch(e.type){case i.LOAD_MENU_SUCCESS:t.menus=e.data;break;case i.FIELDS_CHANGE:e.editId&&(t.editId=e.editId),t.fields=r(e.fields);break;case i.MODAL_VISIBLE_TOGGLE:e.bool||(t.editId=""),t.modalVisible=e.bool;break;default:return n}})}},205:function(n,e,t){"use strict";t.r(e),t.d(e,"ADD_MENU",function(){return r}),t.d(e,"ADD_MENU_SUCCESS",function(){return u}),t.d(e,"LOAD_MENU",function(){return i}),t.d(e,"LOAD_MENU_SUCCESS",function(){return o}),t.d(e,"ADD",function(){return d}),t.d(e,"FIELDS_CHANGE",function(){return a}),t.d(e,"MODAL_VISIBLE_TOGGLE",function(){return c}),t.d(e,"UPDATE_MENU",function(){return f}),t.d(e,"add",function(){return s}),t.d(e,"addMenu",function(){return E}),t.d(e,"addMenuSuccess",function(){return l}),t.d(e,"loadMenu",function(){return M}),t.d(e,"loadMenuSuccess",function(){return S}),t.d(e,"fieldsChange",function(){return D}),t.d(e,"modalVisibleToggle",function(){return _}),t.d(e,"updateMenu",function(){return p});var r="/Menu/Overview/ADD_MENU",u="/Menu/Overview/ADD_MENU_SUCCESS",i="/Menu/Overview/LOAD_MENU",o="/Menu/Overview/LOAD_MENU_SUCCESS",d="/Menu/Overview/ADD",a="/Menu/Overview/FIELDS_CHANGE",c="/Menu/Overview/MODAL_VISIBLE_TOGGLE",f="/Menu/Overview/UPDATE_MENU";function s(n){return{type:d,params:n}}function E(n){return{type:r,params:n}}function l(n){return{type:u,data:n}}function M(n){return{type:i,params:n}}function S(n){return{type:o,data:n}}function D(n,e){return{type:a,fields:n,editId:e}}function _(n,e){return{type:c,bool:n,editId:e}}function p(n){return{type:f,params:n}}}}]);
//# sourceMappingURL=24.a8a3489b.chunk.js.map