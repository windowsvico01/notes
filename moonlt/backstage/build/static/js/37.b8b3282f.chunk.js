(window.webpackJsonp=window.webpackJsonp||[]).push([[37,61],{161:function(t,n,r){"use strict";r.r(n),r.d(n,"initialState",function(){return u});var a=r(147),e=r(240),u={categoryList:[],plateList:[],draftList:[],page:0,total:0};n.default=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:u,n=arguments.length>1?arguments[1]:void 0;return Object(a.a)(t,function(r){switch(n.type){case e.LOAD_CATEGORY_SUCCESS:r.categoryList=n.data.category;break;case e.LOAD_PLATE_SUCCESS:r.plateList=n.data.plate;break;case e.LOAD_DRAFT_SUCCESS:r.draftList=n.data.data,r.page=n.data.current,r.total=n.data.total;break;default:return t}})}},240:function(t,n,r){"use strict";r.r(n),r.d(n,"LOAD_CATEGORY",function(){return a}),r.d(n,"LOAD_CATEGORY_SUCCESS",function(){return e}),r.d(n,"LOAD_PLATE",function(){return u}),r.d(n,"LOAD_PLATE_SUCCESS",function(){return i}),r.d(n,"LOAD_DRAFT",function(){return o}),r.d(n,"LOAD_DRAFT_SUCCESS",function(){return c}),r.d(n,"loadDraft",function(){return d}),r.d(n,"loadDraftSuccess",function(){return f}),r.d(n,"loadCategory",function(){return L}),r.d(n,"loadCategorySuccess",function(){return s}),r.d(n,"loadPlate",function(){return S}),r.d(n,"loadPlateSuccess",function(){return A});var a="/Draft/List/LOAD_CATEGORY",e="/Draft/List/LOAD_CATEGORY_SUCCESS",u="/Draft/List/LOAD_PLATE",i="/Draft/List/LOAD_PLATE_SUCCESS",o="/Draft/List/LOAD_DRAFT",c="/Draft/List/LOAD_DRAFT_SUCCESS";function d(t){return{type:o,params:t}}function f(t){return{type:c,data:t}}function L(t){return{type:a}}function s(t){return{type:e,data:t}}function S(t){return{type:u,params:t}}function A(t){return{type:i,data:t}}}}]);
//# sourceMappingURL=37.b8b3282f.chunk.js.map