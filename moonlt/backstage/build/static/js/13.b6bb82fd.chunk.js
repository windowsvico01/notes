(window.webpackJsonp=window.webpackJsonp||[]).push([[13,59,60],{239:function(e,t,n){"use strict";n.r(t),n.d(t,"LOAD_CATEGORY",function(){return a}),n.d(t,"LOAD_CATEGORY_SUCCESS",function(){return r}),n.d(t,"LOAD_PLATE",function(){return i}),n.d(t,"LOAD_PLATE_SUCCESS",function(){return o}),n.d(t,"FIELDS_CHANGE",function(){return l}),n.d(t,"PUBLISH_DRAFT",function(){return c}),n.d(t,"loadCategory",function(){return u}),n.d(t,"loadCategorySuccess",function(){return s}),n.d(t,"loadPlate",function(){return f}),n.d(t,"loadPlateSuccess",function(){return d}),n.d(t,"fieldsChange",function(){return p}),n.d(t,"publishDraft",function(){return m});var a="/Draft/Add/LOAD_CATEGORY",r="/Draft/Add/LOAD_CATEGORY_SUCCESS",i="/Draft/Add/LOAD_PLATE",o="/Draft/Add/LOAD_PLATE_SUCCESS",l="/Draft/Add/FIELDS_CHANGE",c="/Draft/Add/PUBLISH_DRAFT";function u(e){return{type:a}}function s(e){return{type:r,data:e}}function f(e){return{type:i,params:e}}function d(e){return{type:o,data:e}}function p(e){return{type:l,fields:e}}function m(e){return{type:c,params:e}}},253:function(e,t,n){"use strict";n.r(t),n.d(t,"selectCategoryList",function(){return l}),n.d(t,"selectPlateList",function(){return i}),n.d(t,"selectFields",function(){return o});var a=n(47),r=function(e){return e.get("Draft/Add")},i=Object(a.a)(r,function(e){return e&&e.plateList}),o=Object(a.a)(r,function(e){return e&&e.fields}),l=Object(a.a)(r,function(e){return e&&e.categoryList})},408:function(e,t,n){"use strict";n.d(t,"a",function(){return a}),n.d(t,"b",function(){return r});var a=function(e){var t=0,n=/[\u4e00-\u9fa5]/;if(e)for(var a=0,r=e.length;a<r;a+=1)if(n.test(e[a]))t+=1;else{var i=+e.charCodeAt(a);t+=i<256?.5:65377<=i&&i<=65439?.5:65512<=i&&i<=65518?.5:1}return t},r=function(e){return!(!/^\d+(\.\d+)?$/.test(e)&&!/^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/.test(e))}},435:function(e,t,n){"use strict";var a=n(24),r=n(36),i=n(26),o=n(19),l=n(25),c=n(8),u=n(0),s=n.n(u),f=n(478),d=n.n(f),p=n(402),m=n(635),h=n(399),E=n(217),b=n(9);function g(){var e=Object(c.a)(["\n  padding: 5px 10px;\n  cursor: pointer;\n  color: #999;\n  line-height: 14px;\n  font-weight: 500;\n  :hover {\n    color: #000;\n  }\n"]);return g=function(){return e},e}function v(){var e=Object(c.a)(["\n  border: 1px solid #ccc;\n  height: 300px;\n  overflow: scroll;\n"]);return v=function(){return e},e}function C(){var e=Object(c.a)(["\n  height: 30px;\n  padding: 0 5px;\n  border-right: 1px solid #ccc;\n  border-left: 1px solid #ccc;\n"]);return C=function(){return e},e}function O(){var e=Object(c.a)(["\n  border: 1px solid #ccc;\n  border-bottom: none;\n"]);return O=function(){return e},e}var y=b.a.div(O()),L=b.a.div(C()),j=b.a.div(v()),A=b.a.div(g()),S=function(e){function t(e){var n;return Object(a.a)(this,t),(n=Object(i.a)(this,Object(o.a)(t).call(this,e))).wEditor={},n.state={editorContent:"",imgUploading:!1},n}return Object(l.a)(t,e),Object(r.a)(t,[{key:"componentDidMount",value:function(){var e=this,t=this.refs.editorElem,n=this.refs.toolDefElem;this.wEditor=new d.a(n,t),this.wEditor.customConfig.menus=["head","bold","fontSize","fontName","italic","underline","strikeThrough","foreColor","backColor","link","list","justify","quote","table","code","undo","redo"],this.wEditor.customConfig.onchange=function(t){e.setState({editorContent:t}),e.props.onChange&&e.props.onChange(t)},this.wEditor.create(),this.wEditor.txt.html(this.props.defaultValue||"")}},{key:"render",value:function(){var e=this,t={name:"file",action:"http://127.0.0.1:3000/user/fileUpload",showUploadList:!1,onChange:function(t){e.setState({imgUploading:!0}),"done"===t.file.status?(p.a.success("".concat(t.file.name," \u4e0a\u4f20\u6210\u529f")),e.setState({imgUploading:!1}),e.wEditor.txt.append("<p><img src='".concat(t.file.response.location,"' /></p>"))):"error"===t.file.status&&(p.a.error("".concat(t.file.name," \u4e0a\u4f20\u5931\u8d25")),e.setState({imgUploading:!1}))}};return s.a.createElement("div",null,s.a.createElement(y,{id:"toolDef",ref:"toolDefElem"}),s.a.createElement(L,{id:"toolCus"},s.a.createElement(m.a,t,s.a.createElement(A,null,this.state.imgUploading?s.a.createElement(h.a,{size:"small"}):s.a.createElement(E.a,null)))),s.a.createElement(j,{ref:"editorElem"}))}}]),t}(s.a.PureComponent);t.a=S},99:function(e,t,n){"use strict";n.r(t);var a=n(18),r=n(24),i=n(36),o=n(26),l=n(19),c=n(187),u=n(25),s=n(8),f=n(0),d=n.n(f),p=n(39),m=n(27),h=n(468),E=n(638),b=n(493),g=n(79),v=n(402),C=n(634),O=n(637),y=n(635),L=n(215),j=n(216),A=n(149),S=n(9),D=n(239),w=n(253),k=(n(408),n(435));function x(){var e=Object(s.a)(["\n  button{\n    margin-right: 15px;\n  }\n"]);return x=function(){return e},e}var P=h.a.TabPane,T=E.a.TextArea,_=b.a.Option,U=S.a.div(x()),F=function(e){var t=[];return e.forEach(function(e){0===e.pid&&(e.title=e.name,e.value=e.cid,e.key=e.cid,t.push(e))}),function t(n){var a=n;return n.forEach(function(n,r){var i=[];e.forEach(function(e){n.cid===e.pid&&(e.title=e.name,e.value=e.cid,e.key=e.cid,i.push(e))}),i.length&&(t(i),a[r].children=i)}),a}(t)},I=function(e){function t(e){var n;return Object(r.a)(this,t),(n=Object(o.a)(this,Object(l.a)(t).call(this,e))).handleLoadPlate=function(e){var t={cid:e};n.state.formRef.current.setFieldsValue({plate:[]}),n.props.loadPlate(t)},n.handleFilesChange=function(e){n.state.timer&&clearTimeout(n.state.timer);var t=setTimeout(function(){n.props.fieldsChange(e),n.setState({timer:""})},200);n.setState({timer:t})},n.handlePublish=function(){if(!n.state.publishing){var e=Object(c.a)(e);e.setState({publishing:!0},function(){setTimeout(function(){e.setState({publishing:!1})},1e3),e.state.formRef.current.validateFields().then(function(t){var n={};Object.keys(t).forEach(function(e){"plate"===e&&(n.plate=t.plate.join(",")),"cover"===e?n.cover=t.cover.join("|"):n[e]=t[e]}),n.type="1",e.props.publishDraft(n)})})}},n.getImageList=function(e){var t=[];return e.fileList&&Array.isArray(e.fileList)?(e&&e.fileList.forEach(function(e){var n=e.response&&1*e.response.code===0&&e.response.location;n&&t.push(n)}),t):t},n.state={formRef:d.a.createRef(),publishing:!1},n}return Object(u.a)(t,e),Object(i.a)(t,[{key:"componentWillMount",value:function(){this.props.loadCategory()}},{key:"render",value:function(){var e=this,t=this.props,n=t.categoryList,a=t.plateList,r=t.fields,i=this.state.formRef,o={labelCol:{span:2},wrapperCol:{span:22}},l={labelCol:{span:6},wrapperCol:{span:18}},c=d.a.createElement(U,null,d.a.createElement(g.a,null," \u4fdd\u5b58\u8349\u7a3f "),d.a.createElement(g.a,{type:"primary",onClick:function(){return e.handlePublish()}}," \u53d1\u5e03 ")),u={name:"file",action:"http://127.0.0.1:3000/user/fileUpload",className:"avatar-uploader",showUploadList:!0,listType:"picture-card",onChange:function(e){if(e.file.status,"done"===e.file.status)return v.a.success("".concat(e.file.name," \u4e0a\u4f20\u6210\u529f")),e.fileList;"error"===e.file.status&&v.a.error("".concat(e.file.name," \u4e0a\u4f20\u5931\u8d25"))}};return d.a.createElement("div",null,d.a.createElement(A.f,null,d.a.createElement(g.a,{style:{float:"left"},icon:d.a.createElement(L.a,null),onClick:function(){return e.props.history.goBack()}}),d.a.createElement("h2",null,"\u6dfb\u52a0\u7a3f\u4ef6")),d.a.createElement(A.g,{style:{minWidth:"950px"}},d.a.createElement(h.a,{defaultActiveKey:"1",type:"card",tabBarExtraContent:c},d.a.createElement(P,{tab:"\u6587\u7ae0",key:"1"},d.a.createElement(C.a,{ref:i,onFieldsChange:function(t,n){return e.handleFilesChange(n)},fields:r&&r.length?r:[],initialValues:[]},d.a.createElement(A.d,null,d.a.createElement(C.a.Item,Object.assign({},l,{label:"\u7c7b\u76ee",name:"cid",required:!0}),d.a.createElement(O.a,{dropdownStyle:{maxHeight:400,overflow:"auto"},treeData:F(n),placeholder:"\u8bf7\u9009\u62e9\u7c7b\u76ee",onChange:this.handleLoadPlate,treeDefaultExpandAll:!0})),a&&!!a.length&&d.a.createElement(C.a.Item,Object.assign({},l,{label:"\u677f\u5757",name:"plate"}),d.a.createElement(b.a,{mode:"tags",placeholder:"\u8bf7\u9009\u62e9\u677f\u5757",defaultValue:[]},a&&!!a.length&&a.map(function(e){return d.a.createElement(_,{key:e.id},e.name)})))),d.a.createElement(A.c,null,d.a.createElement(C.a.Item,Object.assign({},o,{label:"\u6807\u9898",name:"title",required:!0}),d.a.createElement(E.a,null)),d.a.createElement(C.a.Item,Object.assign({},o,{label:"\u7b80\u4ecb",name:"summary"}),d.a.createElement(T,{rows:4})),d.a.createElement(C.a.Item,Object.assign({},o,{label:"\u6b63\u6587",name:"content"}),d.a.createElement(k.a,{defaultValue:""})),d.a.createElement(C.a.Item,Object.assign({},o,{label:"\u5c01\u9762",name:"cover",getValueFromEvent:this.getImageList}),d.a.createElement(y.a,u,d.a.createElement("div",null,d.a.createElement(j.a,null),d.a.createElement("div",{className:"ant-upload-text"},"\u4e0a\u4f20")))),d.a.createElement("div",null)))),d.a.createElement(P,{tab:"\u56fe\u96c6",key:"2"},"Content of Tab Pane 2"),d.a.createElement(P,{tab:"\u89c6\u9891",key:"3"},"Content of Tab Pane 2"))))}}]),t}(f.Component);t.default=Object(p.connect)(function(e){return{fields:Object(w.selectFields)(e),categoryList:Object(w.selectCategoryList)(e),plateList:Object(w.selectPlateList)(e)}},function(e){return Object(m.bindActionCreators)(Object(a.a)({},D),e)})(I)}}]);
//# sourceMappingURL=13.b6bb82fd.chunk.js.map