(window.webpackJsonp=window.webpackJsonp||[]).push([[16,73,74],{113:function(e,n,t){"use strict";t.r(n);var a=t(18),r=t(24),i=t(36),u=t(26),l=t(19),c=t(25),o=t(0),s=t.n(o),d=t(39),f=t(27),m=t(79),p=t(640),h=t(643),E=t(641),b=t(645),M=t(149),g=t(243),O=t(259),C=t(407),v=function(e){var n=[];return e.forEach(function(e){0===e.pid&&n.push(e)}),function n(t){var a=t;return t.forEach(function(t,r){var i=[];e.forEach(function(e){t.id===e.pid&&i.push(e)}),i.length&&(n(i),a[r].children=i)}),a}(n)},y=function(e){var n="\u6dfb\u52a0\u83dc\u5355";return e&&e.length&&e.forEach(function(e){e.name&&"pid"===e.name[0]&&e.value&&(n="\u6dfb\u52a0\u5b50\u83dc\u5355")}),n},j=function(e){function n(e){var t;return Object(r.a)(this,n),(t=Object(u.a)(this,Object(l.a)(n).call(this,e))).handleUpdateMenu=function(){var e=t.props.editId;e?t.state.formRef.current.validateFields().then(function(n){var a={id:e};Object.keys(n).forEach(function(e){a[e]=n[e]}),t.props.updateMenu(a)}):t.state.formRef.current.validateFields().then(function(e){var n={};Object.keys(e).forEach(function(t){n[t]=e[t]}),t.props.addMenu(n)})},t.toggleModalVisible=function(e){e||(t.state.formRef.current.resetFields(),t.props.fieldsChange([])),t.props.modalVisibleToggle(e)},t.handleFilesChange=function(e){t.state.timer&&clearTimeout(t.state.timer);var n=setTimeout(function(){t.props.fieldsChange(e),t.setState({timer:""})},200);t.setState({timer:n})},t.handleEditMenu=function(e){var n=[];Object.keys(e).forEach(function(t){"id"!==t&&n.push({name:[t],value:e[t]})}),t.props.fieldsChange(n,e.id),t.toggleModalVisible(!0)},t.handleAddChildMenu=function(e){var n=[{name:["pid"],value:e}];t.props.fieldsChange(n),t.toggleModalVisible(!0)},t.handleChangeMenuShow=function(e,n){var a={id:e,show_side:n};t.props.updateMenu(a)},t.state={formRef:s.a.createRef(),timer:"",editId:""},t}return Object(c.a)(n,e),Object(i.a)(n,[{key:"componentWillMount",value:function(){this.props.loadMenu({menu_ids:"all"})}},{key:"render",value:function(){var e=this,n=this.props,t=n.menus,a=n.fields,r=n.modalVisible,i=this.state.formRef,u=i&&i.current&&i.current.getFieldValue("label")||"",l=[{title:"\u540d\u79f0",dataIndex:"label",key:"label",width:400},{title:"id",dataIndex:"id",key:"id"},{title:"\u8def\u5f84",dataIndex:"path",key:"path"},{title:"\u83dc\u5355\u4e2d\u663e\u793a",dataIndex:"show_side",key:"show_side",render:function(n,t){return s.a.createElement("span",null,"1"===n?s.a.createElement(m.a,{type:"primary",size:"small",shape:"round",onClick:function(){return e.handleChangeMenuShow(t.id,"0")}},"\u663e\u793a"):s.a.createElement(m.a,{type:"primary",danger:!0,size:"small",shape:"round",onClick:function(){return e.handleChangeMenuShow(t.id,"1")}},"\u9690\u85cf"))}},{title:"\u64cd\u4f5c",key:"operate",render:function(n,t){return s.a.createElement(M.b,null,s.a.createElement(m.a,{type:"link",onClick:function(){return e.handleAddChildMenu(t.id)}},"\u6dfb\u52a0\u5b50\u83dc\u5355"),s.a.createElement(m.a,{type:"link",onClick:function(){return e.handleEditMenu(t)}},"\u7f16\u8f91"))}}],c={labelCol:{span:6},wrapperCol:{span:16}};return s.a.createElement("div",null,s.a.createElement(M.f,null,s.a.createElement("div",{className:"borderLeft"}),s.a.createElement("h2",null,"\u83dc\u5355\u7ba1\u7406"),s.a.createElement(m.a,{type:"primary",className:"btn-r",onClick:function(){return e.toggleModalVisible(!0)}},"\u6dfb\u52a0\u83dc\u5355")),s.a.createElement(M.g,null,s.a.createElement(p.a,{columns:l,size:"middle",dataSource:t&&!!t.length&&v(t),rowKey:"route"})),s.a.createElement(h.a,{title:this.props.editId?"\u7f16\u8f91\u83dc\u5355":y(a),visible:r,width:500,onOk:function(){return e.handleUpdateMenu()},onCancel:function(){return e.toggleModalVisible(!1)},okText:this.props.editId?"\u786e\u5b9a":"\u6dfb\u52a0",cancelText:"\u53d6\u6d88",maskClosable:!1,forceRender:!0},s.a.createElement(E.a,{ref:i,onFieldsChange:function(n,t){return e.handleFilesChange(t)},fields:a&&a.length?a:[],initialValues:[]},s.a.createElement(E.a.Item,Object.assign({},c,{label:"\u540d\u79f0",name:"label",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u83dc\u5355\u540d\u79f0"}]}),s.a.createElement(b.a,{addonAfter:s.a.createElement("div",{style:{width:"50px"}},Object(C.a)(u),"\u4e2a\u5b57")})),s.a.createElement(E.a.Item,Object.assign({},c,{label:"\u552f\u4e00\u6807\u8bc6",name:"menu_key",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u552f\u4e00\u6807\u8bc6"}]}),s.a.createElement(b.a,null)),s.a.createElement(E.a.Item,Object.assign({},c,{label:"\u8def\u5f84",name:"path",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u8def\u5f84"}]}),s.a.createElement(b.a,null)),s.a.createElement(E.a.Item,Object.assign({},c,{label:"\u56fe\u6807",name:"icon"}),s.a.createElement(b.a,null)),s.a.createElement(E.a.Item,Object.assign({},c,{label:"Route",name:"route"}),s.a.createElement(b.a,null)),s.a.createElement(E.a.Item,Object.assign({},c,{label:"\u6392\u5e8f",name:"sort_num"}),s.a.createElement(b.a,null)),s.a.createElement(E.a.Item,Object.assign({},c,{label:"pid",name:"pid",style:{display:"none"}}),s.a.createElement(b.a,null)))))}}]),n}(o.Component);n.default=Object(d.connect)(function(e){return{menus:Object(O.selectMenus)(e),fields:Object(O.selectFields)(e),modalVisible:Object(O.selectModalVisible)(e),editId:Object(O.selectEditId)(e)}},function(e){return Object(f.bindActionCreators)(Object(a.a)({},g),e)})(j)},243:function(e,n,t){"use strict";t.r(n),t.d(n,"ADD_MENU",function(){return a}),t.d(n,"ADD_MENU_SUCCESS",function(){return r}),t.d(n,"LOAD_MENU",function(){return i}),t.d(n,"LOAD_MENU_SUCCESS",function(){return u}),t.d(n,"ADD",function(){return l}),t.d(n,"FIELDS_CHANGE",function(){return c}),t.d(n,"MODAL_VISIBLE_TOGGLE",function(){return o}),t.d(n,"UPDATE_MENU",function(){return s}),t.d(n,"add",function(){return d}),t.d(n,"addMenu",function(){return f}),t.d(n,"addMenuSuccess",function(){return m}),t.d(n,"loadMenu",function(){return p}),t.d(n,"loadMenuSuccess",function(){return h}),t.d(n,"fieldsChange",function(){return E}),t.d(n,"modalVisibleToggle",function(){return b}),t.d(n,"updateMenu",function(){return M});var a="/Permission/Menu/ADD_MENU",r="/Permission/Menu/ADD_MENU_SUCCESS",i="/Permission/Menu/LOAD_MENU",u="/Permission/Menu/LOAD_MENU_SUCCESS",l="/Permission/Menu/ADD",c="/Permission/Menu/FIELDS_CHANGE",o="/Permission/Menu/MODAL_VISIBLE_TOGGLE",s="/Permission/Menu/UPDATE_MENU";function d(e){return{type:l,params:e}}function f(e){return{type:a,params:e}}function m(e){return{type:r,data:e}}function p(e){return{type:i,params:e}}function h(e){return{type:u,data:e}}function E(e,n){return{type:c,fields:e,editId:n}}function b(e,n){return{type:o,bool:e,editId:n}}function M(e){return{type:s,params:e}}},259:function(e,n,t){"use strict";t.r(n),t.d(n,"selectMenus",function(){return i}),t.d(n,"selectFields",function(){return u}),t.d(n,"selectModalVisible",function(){return l}),t.d(n,"selectEditId",function(){return c});var a=t(47),r=function(e){return e.get("Permission/Menu")},i=Object(a.a)(r,function(e){return e&&e.menus}),u=Object(a.a)(r,function(e){return e&&e.fields}),l=Object(a.a)(r,function(e){return e&&e.modalVisible}),c=Object(a.a)(r,function(e){return e&&e.editId})},407:function(e,n,t){"use strict";t.d(n,"a",function(){return a}),t.d(n,"b",function(){return r});var a=function(e){var n=0,t=/[\u4e00-\u9fa5]/;if(e)for(var a=0,r=e.length;a<r;a+=1)if(t.test(e[a]))n+=1;else{var i=+e.charCodeAt(a);n+=i<256?.5:65377<=i&&i<=65439?.5:65512<=i&&i<=65518?.5:1}return n},r=function(e){return!(!/^\d+(\.\d+)?$/.test(e)&&!/^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/.test(e))}}}]);
//# sourceMappingURL=16.d815b985.chunk.js.map