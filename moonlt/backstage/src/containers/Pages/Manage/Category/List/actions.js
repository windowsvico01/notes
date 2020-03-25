export const ADD_CATEGORY = '/Manage/Category/List/ADD_CATEGORY';
export const ADD_CATEGORY_SUCCESS = '/Manage/Category/List/ADD_CATEGORY_SUCCESS';

export const LOAD_CATEGORY = '/Manage/Category/List/LOAD_CATEGORY';
export const LOAD_CATEGORY_SUCCESS = '/Manage/Category/List/LOAD_CATEGORY_SUCCESS';

export const ADD = '/Manage/Category/List/ADD';

export const FIELDS_CHANGE = '/Manage/Category/List/FIELDS_CHANGE';

export const MODAL_VISIBLE_TOGGLE = '/Manage/Category/List/MODAL_VISIBLE_TOGGLE';

export const UPDATE_CATEGORY = '/Manage/Category/List/UPDATE_CATEGORY';

export function add(params) {
  return {
    type: ADD,
    params,
  };
}

export function addCategory(params) {
  return {
    type: ADD_CATEGORY,
    params,
  };
}

export function addCategorySuccess(data) {
  return {
    type: ADD_CATEGORY_SUCCESS,
    data,
  };
}

export function loadCategory(params) {
  return {
    type: LOAD_CATEGORY,
  };
}

export function loadCategorySuccess(data) {
  return {
    type: LOAD_CATEGORY_SUCCESS,
    data,
  };
}

export function fieldsChange(fields, editCid) {
  return {
    type: FIELDS_CHANGE,
    fields,
    editCid,
  }
}

export function modalVisibleToggle(bool, editCid) {
  return {
    type: MODAL_VISIBLE_TOGGLE,
    bool,
    editCid,
  }
}

export function updateCategory(params) {
  return {
    type: UPDATE_CATEGORY,
    params,
  }
}

