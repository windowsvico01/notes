export const ADD_MENU = '/Permission/Menu/ADD_MENU';
export const ADD_MENU_SUCCESS = '/Permission/Menu/ADD_MENU_SUCCESS';

export const LOAD_MENU = '/Permission/Menu/LOAD_MENU';
export const LOAD_MENU_SUCCESS = '/Permission/Menu/LOAD_MENU_SUCCESS';

export const ADD = '/Permission/Menu/ADD';

export const FIELDS_CHANGE = '/Permission/Menu/FIELDS_CHANGE';

export const MODAL_VISIBLE_TOGGLE = '/Permission/Menu/MODAL_VISIBLE_TOGGLE';

export const UPDATE_MENU = '/Permission/Menu/UPDATE_MENU';

export function add(params) {
  return {
    type: ADD,
    params,
  };
}

export function addMenu(params) {
  return {
    type: ADD_MENU,
    params,
  };
}

export function addMenuSuccess(data) {
  return {
    type: ADD_MENU_SUCCESS,
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

export function fieldsChange(fields, editId) {
  return {
    type: FIELDS_CHANGE,
    fields,
    editId,
  }
}

export function modalVisibleToggle(bool, editId) {
  return {
    type: MODAL_VISIBLE_TOGGLE,
    bool,
    editId,
  }
}

export function updateMenu(params) {
  return {
    type: UPDATE_MENU,
    params,
  }
}

