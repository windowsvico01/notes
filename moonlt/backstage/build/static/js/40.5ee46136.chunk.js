(window.webpackJsonp=window.webpackJsonp||[]).push([[40,81],{168:function(t,n,e){"use strict";e.r(n),e.d(n,"initialState",function(){return u});var r=e(401),a=e(129),o=e(237),u={categoryList:[],plateList:[],fields:[],modalVisible:!1};n.default=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:u,n=arguments.length>1?arguments[1]:void 0;return Object(a.a)(t,function(e){switch(n.type){case o.LOAD_CATEGORY_SUCCESS:console.log(n.data),e.categoryList=n.data.category;break;case o.LOAD_PLATE_SUCCESS:e.plateList=n.data.plate;break;case o.FIELDS_CHANGE:e.fields=Object(r.a)(n.fields);break;case o.CHANGE_MODAL:n.bool||(e.fields=[]),e.modalVisible=n.bool;break;default:return t}})}},237:function(t,n,e){"use strict";e.r(n),e.d(n,"LOAD_CATEGORY",function(){return r}),e.d(n,"LOAD_CATEGORY_SUCCESS",function(){return a}),e.d(n,"LOAD_PLATE",function(){return o}),e.d(n,"LOAD_PLATE_SUCCESS",function(){return u}),e.d(n,"ADD_FORUM",function(){return i}),e.d(n,"FIELDS_CHANGE",function(){return d}),e.d(n,"CHANGE_MODAL",function(){return c}),e.d(n,"loadCategory",function(){return f}),e.d(n,"loadCategorySuccess",function(){return A}),e.d(n,"loadPlate",function(){return s}),e.d(n,"loadPlateSuccess",function(){return l}),e.d(n,"addForum",function(){return S}),e.d(n,"fieldsChange",function(){return C}),e.d(n,"changeModal",function(){return E});var r="/Manage/Forum/Add/LOAD_CATEGORY",a="/Manage/Forum/Add/LOAD_CATEGORY_SUCCESS",o="/Manage/Forum/Add/LOAD_PLATE",u="/Manage/Forum/Add/LOAD_PLATE_SUCCESS",i="/Manage/Forum/Add/ADD_FORUM",d="/Manage/Forum/Add/FIELDS_CHANGE",c="/Manage/Forum/Add/CHANGE_MODAL";function f(t){return{type:r,params:t}}function A(t){return{type:a,data:t}}function s(t){return{type:o,params:t}}function l(t){return{type:u,data:t}}function S(t){return{type:i,params:t}}function C(t){return{type:d,fields:t}}function E(t){return{type:c,bool:t}}},401:function(t,n,e){"use strict";var r=e(86);var a=e(147);function o(t){return function(t){if(Array.isArray(t))return Object(r.a)(t)}(t)||function(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||Object(a.a)(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}e.d(n,"a",function(){return o})}}]);
//# sourceMappingURL=40.5ee46136.chunk.js.map