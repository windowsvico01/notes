export default {
    path: 'permission',
    label: '权限中心',
    route: 'permission',
    hasReducer: false,
    child: [
      {
        path: 'menu',
        route: 'menu',
        label: '菜单管理',
        show: true,
        hasReducer: true,
        hasSagas: true,
        icon: 'edit',
      }, {
        path: 'manager',
        route: 'manager',
        label: '用户管理',
        show: true,
        hasReducer: true,
        hasSagas: true,
        icon: 'edit',
      }, {
        path: 'group',
        route: 'group',
        label: '分组管理',
        show: true,
        hasReducer: false,
        hasSagas: false,
        icon: 'edit',
      }
    ]
  }