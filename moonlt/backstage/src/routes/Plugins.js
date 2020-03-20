export default {
  path: 'plugins',
  label: '插件集合',
  route: 'plugins',
  hasReducer: false,
  child: [
    {
      path: 'editor',
      route: 'editor',
      label: '编辑器',
      show: true,
      hasReducer: true,
      hasSagas: false,
      icon: 'edit',
      child: [
        {
          path: 'edit',
          route: 'edit',
          label: '编辑',
          hasReducer: true,
          hasSagas: false,
        },
        { 
          path: 'preview',
          route: 'preview',
          label: '预览',
          hasReducer: true,
          hasSagas: false,
        }
      ]
    }
  ]
}