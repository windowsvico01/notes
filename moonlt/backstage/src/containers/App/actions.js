export const LOGIN = 'moon/global/LOGIN';

export const LOADING = 'moon/global/LOADING';
export const LOADED = 'moon/global/LOADED';

export const SHOW_DIALOG = 'moon/global/SHOW_DIALOG';
export const HIDE_DIALOG = 'moon/global/HIDE_DIALOG';
export const DIALOG_TYPE = {
  success: 'moon/dialog/success',
  info: 'moon/dialog/info',
  error: 'moon/dialog/error',
};

export const LOAD_USERINFO = 'moon/global/LOAD_USERINFO';
export const LOAD_USERINFO_SUCCESS = 'moon/global/LOAD_USERINFO_SUCCESS';

export const AUTHERROR = 'moon/global/AUTHERROR';

export function login(params) {
    return {
      type: LOGIN,
      params,
    };
  }
// spin 是否显示
export function loading(identify) {
  return {
    type: LOADING,
    identify,
  };
}

export function loaded(identify) {
  return {
    type: LOADED,
    identify,
  };
}

export function showDialog(dialogType, messages, duration) {
  return {
    type: SHOW_DIALOG,
    dialogType,
    messages,
    duration,
  };
}

export function loadUserInfo() {
  return {
    type: LOAD_USERINFO,
  };
}

export function loadUserInfoSuccess(info, menus) {
  return {
    type: LOAD_USERINFO_SUCCESS,
    info,
    menus,
  };
}