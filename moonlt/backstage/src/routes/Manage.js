export default {
  path: 'manage',
  label: '类目板块管理',
  route: 'manage',
  hasReducer: false,
  child: [
    {
      path: 'category',
      route: 'category',
      label: '类目管理',
      show: false,
      hasReducer: false,
      hasSagas: false,
      child: [
        {
          path: 'list',
          route: 'list',
          label: '类目列表',
          hasReducer: true,
          hasSagas: true,
        }, {
          path: 'add',
          route: 'add(/:id)',
          label: '添加类目',
          hasReducer: false,
          hasSagas: false,
        }, {
          path: 'detail',
          route: 'detail/:cid',
          label: '类目详情',
          show: true,
          hasReducer: true,
          hasSagas: true,
        }
      ]
    }, {
      path: 'module',
      route: 'module',
      label: '模块管理',
      show: true,
      hasReducer: false,
      hasSagas: false,
      icon: 'edit',
    }
  ]
}