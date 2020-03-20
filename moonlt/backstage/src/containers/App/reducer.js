/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
// import { LOAD_REPOS_SUCCESS, LOAD_REPOS, LOAD_REPOS_ERROR } from './constants';
import {
  LOADING, LOADED, SHOW_DIALOG, HIDE_DIALOG, LOGIN, LOAD_USERINFO_SUCCESS
} from './actions';
// The initial state of the App
import { permissionMap } from '@/utils/permission.js';
export const initialState = {
  dialog: null,
  loading: {},
  error: false,
  currentUser: false,
  showLogin: false,
  userData: {
    repositories: false,
    permissions: permissionMap, // 权限菜单
    menus: [], // 菜单
    userInfo: {}, // 用户信息
  },
};

//数组中删除指定一项数据
// const ArrRemove = (arr, key) => {
//   let tIndex = '';
//   arr.forEach((e, index) => {
//     Object.keys(item).forEach((key) => {
//       if (e[key] === item[key]) tIndex = index;
//     })
//   })
//   if (tIndex > -1) {
//       this.splice(tIndex, 1);
//   }
// }
/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOGIN:
        draft.showLogin = true;
        break;
      case SHOW_DIALOG:
        draft.dialog = {
          type: action.dialogType,
          messages: action.messages,
          duration: action.duration,
        }
        break;
      case LOADING:
        draft.loading[action.indentify] = true;
        break;
      case LOADED:
        draft.loading[action.indentify] = false;
        break;
      case LOAD_USERINFO_SUCCESS:
        draft.userData.menus = action.menus;
        draft.userData.userInfo = action.info;
        break;
    }
  });
// const appReducer = (state = initialState, action) =>{
    
//     return state;
// }

export default appReducer;
