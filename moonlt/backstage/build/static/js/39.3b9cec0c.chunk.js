(window.webpackJsonp=window.webpackJsonp||[]).push([[39,77],{166:function(t,n,e){"use strict";e.r(n),e.d(n,"initialState",function(){return u});var r=e(401),a=e(129),o=e(235),u={info:{},forumList:[],fields:[],modalVisible:!1};n.default=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:u,n=arguments.length>1?arguments[1]:void 0;return Object(a.a)(t,function(e){switch(n.type){case o.LOAD_CATEGORY_SUCCESS:e.info=n.data.category;break;case o.LOAD_FORUM_SUCCESS:e.forumList=n.data.forum;break;case o.FIELDS_CHANGE:e.fields=Object(r.a)(n.fields);break;case o.CHANGE_MODAL:n.bool||(e.fields=[]),e.modalVisible=n.bool;break;default:return t}})}},235:function(t,n,e){"use strict";e.r(n),e.d(n,"LOAD_CATEGORY",function(){return r}),e.d(n,"LOAD_CATEGORY_SUCCESS",function(){return a}),e.d(n,"LOAD_FORUM",function(){return o}),e.d(n,"LOAD_FORUM_SUCCESS",function(){return u}),e.d(n,"ADD_FORUM",function(){return i}),e.d(n,"FIELDS_CHANGE",function(){return c}),e.d(n,"CHANGE_MODAL",function(){return f}),e.d(n,"loadCategory",function(){return d}),e.d(n,"loadCategorySuccess",function(){return l}),e.d(n,"loadForum",function(){return s}),e.d(n,"loadForumSuccess",function(){return C}),e.d(n,"addForum",function(){return O}),e.d(n,"fieldsChange",function(){return A}),e.d(n,"changeModal",function(){return y});var r="/Manage/Category/Detail/LOAD_CATEGORY",a="/Manage/Category/Detail/LOAD_CATEGORY_SUCCESS",o="/Manage/Category/Detail/LOAD_FORUM",u="/Manage/Category/Detail/LOAD_FORUM_SUCCESS",i="/Manage/Category/Detail/ADD_FORUM",c="/Manage/Category/Detail/FIELDS_CHANGE",f="/Manage/Category/Detail/CHANGE_MODAL";function d(t){return{type:r,params:t}}function l(t){return{type:a,data:t}}function s(t){return{type:o,params:t}}function C(t){return{type:u,data:t}}function O(t){return{type:i,params:t}}function A(t){return{type:c,fields:t}}function y(t){return{type:f,bool:t}}},401:function(t,n,e){"use strict";var r=e(86);var a=e(147);function o(t){return function(t){if(Array.isArray(t))return Object(r.a)(t)}(t)||function(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||Object(a.a)(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}e.d(n,"a",function(){return o})}}]);
//# sourceMappingURL=39.3b9cec0c.chunk.js.map