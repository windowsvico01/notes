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
      path: 'forum',
      route: 'forum',
      label: '板块管理',
      show: true,
      hasReducer: false,
      hasSagas: false,
      child: [
        {
          path: 'list',
          route: 'list',
          label: '板块列表',
          hasReducer: true,
          hasSagas: true,
        }, {
          path: 'detail',
          route: 'detail/:fid',
          label: '板块详情',
          show: true,
          hasReducer: true,
          hasSagas: true,
        }, {
          path: 'add',
          route: 'add',
          label: '添加板块',
          hasReducer: true,
          hasSagas: true,
        }
      ]
    }
  ]
}