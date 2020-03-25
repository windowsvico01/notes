export const GET_USERS = '/Permission/Manager/GET_USERS';
export const GET_USERS_SUCCESS = '/Permission/Manager/GET_USERS_SUCCESS';

export const LOAD_MENU = '/Permission/Manager/LOAD_MENU';
export const LOAD_MENU_SUCCESS = '/Permission/Manager/LOAD_MENU_SUCCESS';

export const UPDATE_USER = '/Permission/Manager/UPDATE_USER';

export function getUsers(params) {
  return {
    type: GET_USERS,
    params,
  };
  }
  
export function getUsersSuccess(data) {
  return {
    type: GET_USERS_SUCCESS,
    data,
  };
}

export function loadMenu(params) {
  return {
    type: LOAD_MENU,
    params,
  };
}

export function loadMenuSuccess(data) {
  return {
    type: LOAD_MENU_SUCCESS,
    data,
  };
}

export function updateUser(params) {
  return {
    type: UPDATE_USER,
    params,
  }
}