(window.webpackJsonp=window.webpackJsonp||[]).push([[13,59,60],{238:function(e,t,n){"use strict";n.r(t),n.d(t,"LOAD_CATEGORY",function(){return a}),n.d(t,"LOAD_CATEGORY_SUCCESS",function(){return r}),n.d(t,"LOAD_PLATE",function(){return i}),n.d(t,"LOAD_PLATE_SUCCESS",function(){return o}),n.d(t,"FIELDS_CHANGE",function(){return c}),n.d(t,"PUBLISH_DRAFT",function(){return l}),n.d(t,"loadCategory",function(){return u}),n.d(t,"loadCategorySuccess",function(){return s}),n.d(t,"loadPlate",function(){return f}),n.d(t,"loadPlateSuccess",function(){return d}),n.d(t,"fieldsChange",function(){return p}),n.d(t,"publishDraft",function(){return m});var a="/Draft/Add/LOAD_CATEGORY",r="/Draft/Add/LOAD_CATEGORY_SUCCESS",i="/Draft/Add/LOAD_PLATE",o="/Draft/Add/LOAD_PLATE_SUCCESS",c="/Draft/Add/FIELDS_CHANGE",l="/Draft/Add/PUBLISH_DRAFT";function u(e){return{type:a}}function s(e){return{type:r,data:e}}function f(e){return{type:i,params:e}}function d(e){return{type:o,data:e}}function p(e){return{type:c,fields:e}}function m(e){return{type:l,params:e}}},252:function(e,t,n){"use strict";n.r(t),n.d(t,"selectCategoryList",function(){return c}),n.d(t,"selectPlateList",function(){return i}),n.d(t,"selectFields",function(){return o});var a=n(47),r=function(e){return e.get("Draft/Add")},i=Object(a.a)(r,function(e){return e&&e.plateList}),o=Object(a.a)(r,function(e){return e&&e.fields}),c=Object(a.a)(r,function(e){return e&&e.categoryList})},407:function(e,t,n){"use strict";n.d(t,"a",function(){return a}),n.d(t,"b",function(){return r});var a=function(e){var t=0,n=/[\u4e00-\u9fa5]/;if(e)for(var a=0,r=e.length;a<r;a+=1)if(n.test(e[a]))t+=1;else{var i=+e.charCodeAt(a);t+=i<256?.5:65377<=i&&i<=65439?.5:65512<=i&&i<=65518?.5:1}return t},r=function(e){return!(!/^\d+(\.\d+)?$/.test(e)&&!/^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/.test(e))}},438:function(e,t,n){"use strict";var a=n(434),r=n(435),i=n(476),o=n(436),c=n(475),l=n(437),u=n(0),s=n.n(u),f=n(484),d=n.n(f),p=n(401),m=n(642),h=n(398),E=n(216),b=n(8);function g(e){return function(){var t,n=Object(o.a)(e);if(function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}()){var a=Object(o.a)(this).constructor;t=Reflect.construct(n,arguments,a)}else t=n.apply(this,arguments);return Object(i.a)(this,t)}}function v(){var e=Object(l.a)(["\n  padding: 5px 10px;\n  cursor: pointer;\n  color: #999;\n  line-height: 14px;\n  font-weight: 500;\n  :hover {\n    color: #000;\n  }\n"]);return v=function(){return e},e}function y(){var e=Object(l.a)(["\n  border: 1px solid #ccc;\n  height: 300px;\n  overflow: scroll;\n"]);return y=function(){return e},e}function C(){var e=Object(l.a)(["\n  height: 30px;\n  padding: 0 5px;\n  border-right: 1px solid #ccc;\n  border-left: 1px solid #ccc;\n"]);return C=function(){return e},e}function O(){var e=Object(l.a)(["\n  border: 1px solid #ccc;\n  border-bottom: none;\n"]);return O=function(){return e},e}var j=b.a.div(O()),L=b.a.div(C()),A=b.a.div(y()),D=b.a.div(v()),S=function(e){Object(c.a)(n,e);var t=g(n);function n(e){var r;return Object(a.a)(this,n),(r=t.call(this,e)).wEditor={},r.state={editorContent:"",imgUploading:!1},r}return Object(r.a)(n,[{key:"componentDidMount",value:function(){var e=this,t=this.refs.editorElem,n=this.refs.toolDefElem;this.wEditor=new d.a(n,t),this.wEditor.customConfig.menus=["head","bold","fontSize","fontName","italic","underline","strikeThrough","foreColor","backColor","link","list","justify","quote","table","code","undo","redo"],this.wEditor.customConfig.onchange=function(t){e.setState({editorContent:t}),e.props.onChange&&e.props.onChange(t)},this.wEditor.create(),this.wEditor.txt.html(this.props.defaultValue||"")}},{key:"render",value:function(){var e=this,t={name:"file",action:"127.0.0.1"===window.location.hostname?"http://127.0.0.1:3000/user/fileUpload":"http://62.234.73.102:3000/user/fileUpload",showUploadList:!1,onChange:function(t){e.setState({imgUploading:!0}),"done"===t.file.status?(p.a.success("".concat(t.file.name," \u4e0a\u4f20\u6210\u529f")),e.setState({imgUploading:!1}),e.wEditor.txt.append("<p><img src='".concat(t.file.response.location,"' /></p>"))):"error"===t.file.status&&(p.a.error("".concat(t.file.name," \u4e0a\u4f20\u5931\u8d25")),e.setState({imgUploading:!1}))}};return s.a.createElement("div",null,s.a.createElement(j,{id:"toolDef",ref:"toolDefElem"}),s.a.createElement(L,{id:"toolCus"},s.a.createElement(m.a,t,s.a.createElement(D,null,this.state.imgUploading?s.a.createElement(h.a,{size:"small"}):s.a.createElement(E.a,null)))),s.a.createElement(A,{ref:"editorElem"}))}}]),n}(s.a.PureComponent);t.a=S},99:function(e,t,n){"use strict";n.r(t);var a=n(639),r=n(434),i=n(435),o=n(483),c=n(476),l=n(436),u=n(475),s=n(437),f=n(0),d=n.n(f),p=n(39),m=n(27),h=n(471),E=n(645),b=n(499),g=n(79),v=n(401),y=n(641),C=n(644),O=n(642),j=n(214),L=n(215),A=n(149),D=n(8),S=n(238),w=n(252),x=(n(407),n(438));function P(e){return function(){var t,n=Object(l.a)(e);if(function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}()){var a=Object(l.a)(this).constructor;t=Reflect.construct(n,arguments,a)}else t=n.apply(this,arguments);return Object(c.a)(this,t)}}function R(){var e=Object(s.a)(["\n  button{\n    margin-right: 15px;\n  }\n"]);return R=function(){return e},e}var k=h.a.TabPane,T=E.a.TextArea,U=b.a.Option,_=D.a.div(R()),F=function(e){var t=[];return e.forEach(function(e){0===e.pid&&(e.title=e.name,e.value=e.cid,e.key=e.cid,t.push(e))}),function t(n){var a=n;return n.forEach(function(n,r){var i=[];e.forEach(function(e){n.cid===e.pid&&(e.title=e.name,e.value=e.cid,e.key=e.cid,i.push(e))}),i.length&&(t(i),a[r].children=i)}),a}(t)},I=function(e){Object(u.a)(n,e);var t=P(n);function n(e){var a;return Object(r.a)(this,n),(a=t.call(this,e)).handleLoadPlate=function(e){var t={cid:e};a.state.formRef.current.setFieldsValue({plate:[]}),a.props.loadPlate(t)},a.handleFilesChange=function(e){a.state.timer&&clearTimeout(a.state.timer);var t=setTimeout(function(){a.props.fieldsChange(e),a.setState({timer:""})},200);a.setState({timer:t})},a.handlePublish=function(){if(!a.state.publishing){var e=Object(o.a)(e);e.setState({publishing:!0},function(){setTimeout(function(){e.setState({publishing:!1})},1e3),e.state.formRef.current.validateFields().then(function(t){var n={};Object.keys(t).forEach(function(e){"plate"===e&&(n.plate=t.plate.join(",")),"cover"===e?n.cover=t.cover.join("|"):n[e]=t[e]}),n.type="1",e.props.publishDraft(n)})})}},a.getImageList=function(e){var t=[];return e.fileList&&Array.isArray(e.fileList)?(e&&e.fileList.forEach(function(e){var n=e.response&&1*e.response.code===0&&e.response.location;n&&t.push(n)}),t):t},a.state={formRef:d.a.createRef(),publishing:!1},a}return Object(i.a)(n,[{key:"componentWillMount",value:function(){this.props.loadCategory()}},{key:"render",value:function(){var e=this,t=this.props,n=t.categoryList,a=t.plateList,r=t.fields,i=this.state.formRef,o={labelCol:{span:2},wrapperCol:{span:22}},c={labelCol:{span:6},wrapperCol:{span:18}},l=d.a.createElement(_,null,d.a.createElement(g.a,null," \u4fdd\u5b58\u8349\u7a3f "),d.a.createElement(g.a,{type:"primary",onClick:function(){return e.handlePublish()}}," \u53d1\u5e03 "));console.log(window.location.hostname);var u={name:"file",action:"127.0.0.1"===window.location.hostname?"http://127.0.0.1:3000/user/fileUpload":"http://62.234.73.102:3000/user/fileUpload",className:"avatar-uploader",showUploadList:!0,listType:"picture-card",onChange:function(e){if(e.file.status,"done"===e.file.status)return v.a.success("".concat(e.file.name," \u4e0a\u4f20\u6210\u529f")),e.fileList;"error"===e.file.status&&v.a.error("".concat(e.file.name," \u4e0a\u4f20\u5931\u8d25"))}};return d.a.createElement("div",null,d.a.createElement(A.f,null,d.a.createElement(g.a,{style:{float:"left"},icon:d.a.createElement(j.a,null),onClick:function(){return e.props.history.goBack()}}),d.a.createElement("h2",null,"\u6dfb\u52a0\u7a3f\u4ef6")),d.a.createElement(A.g,{style:{minWidth:"950px"}},d.a.createElement(h.a,{defaultActiveKey:"1",type:"card",tabBarExtraContent:l},d.a.createElement(k,{tab:"\u6587\u7ae0",key:"1"},d.a.createElement(y.a,{ref:i,onFieldsChange:function(t,n){return e.handleFilesChange(n)},fields:r&&r.length?r:[],initialValues:[]},d.a.createElement(A.d,null,d.a.createElement(y.a.Item,Object.assign({},c,{label:"\u7c7b\u76ee",name:"cid",required:!0}),d.a.createElement(C.a,{dropdownStyle:{maxHeight:400,overflow:"auto"},treeData:F(n),placeholder:"\u8bf7\u9009\u62e9\u7c7b\u76ee",onChange:this.handleLoadPlate,treeDefaultExpandAll:!0})),a&&!!a.length&&d.a.createElement(y.a.Item,Object.assign({},c,{label:"\u677f\u5757",name:"plate"}),d.a.createElement(b.a,{mode:"tags",placeholder:"\u8bf7\u9009\u62e9\u677f\u5757",defaultValue:[]},a&&!!a.length&&a.map(function(e){return d.a.createElement(U,{key:e.id},e.name)})))),d.a.createElement(A.c,null,d.a.createElement(y.a.Item,Object.assign({},o,{label:"\u6807\u9898",name:"title",required:!0}),d.a.createElement(E.a,null)),d.a.createElement(y.a.Item,Object.assign({},o,{label:"\u7b80\u4ecb",name:"summary"}),d.a.createElement(T,{rows:4})),d.a.createElement(y.a.Item,Object.assign({},o,{label:"\u6b63\u6587",name:"content"}),d.a.createElement(x.a,{defaultValue:""})),d.a.createElement(y.a.Item,Object.assign({},o,{label:"\u5c01\u9762",name:"cover",getValueFromEvent:this.getImageList}),d.a.createElement(O.a,u,d.a.createElement("div",null,d.a.createElement(L.a,null),d.a.createElement("div",{className:"ant-upload-text"},"\u4e0a\u4f20")))),d.a.createElement("div",null)))),d.a.createElement(k,{tab:"\u56fe\u96c6",key:"2"},"Content of Tab Pane 2"),d.a.createElement(k,{tab:"\u89c6\u9891",key:"3"},"Content of Tab Pane 2"))))}}]),n}(f.Component);t.default=Object(p.connect)(function(e){return{fields:Object(w.selectFields)(e),categoryList:Object(w.selectCategoryList)(e),plateList:Object(w.selectPlateList)(e)}},function(e){return Object(m.bindActionCreators)(Object(a.a)({},S),e)})(I)}}]);
//# sourceMappingURL=13.50b324c6.chunk.js.map