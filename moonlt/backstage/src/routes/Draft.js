export default {
  path: 'draft',
  label: '稿件管理',
  route: 'draft',
  hasReducer: false,
  child: [
    {
      path: 'list',
      route: 'list',
      label: '稿件列表',
      hasReducer: true,
      hasSagas: true,
    }, {
      path: 'add',
      route: 'add',
      label: '添加稿件',
      show: true,
      hasReducer: true,
      hasSagas: true,
    }, {
      path: 'edit',
      route: 'edit',
      label: '编辑稿件',
      show: true,
      hasReducer: false,
      hasSagas: false,
    }, {
      path: 'detail',
      route: 'detail/:id',
      label: '稿件详情',
      hasReducer: false,
      hasSagas: false,
    }
  ]
}