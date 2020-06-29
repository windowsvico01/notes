export const LOAD_CATEGORY = '/Manage/Category/Detail/LOAD_CATEGORY';
export const LOAD_CATEGORY_SUCCESS = '/Manage/Category/Detail/LOAD_CATEGORY_SUCCESS';

export const LOAD_PLATE = '/Manage/Category/Detail/LOAD_PLATE';
export const LOAD_PLATE_SUCCESS = '/Manage/Category/Detail/LOAD_PLATE_SUCCESS';

export const ADD_PLATE = '/Manage/Category/Detail/ADD_PLATE';

export const FIELDS_CHANGE = '/Manage/Category/Detail/FIELDS_CHANGE';

export const CHANGE_MODAL = '/Manage/Category/Detail/CHANGE_MODAL';

export function loadCategory(params) {
  return {
    type: LOAD_CATEGORY,
    params,
  };
}

export function loadCategorySuccess(data) {
  return {
    type: LOAD_CATEGORY_SUCCESS,
    data,
  };
}

export function loadPlate(params) {
  return {
    type: LOAD_PLATE,
    params,
  };
}

export function loadPlateSuccess(data) {
  return {
    type: LOAD_PLATE_SUCCESS,
    data,
  };
}

export function addPlate(params) {
  return {
    type: ADD_PLATE,
    params,
  }
}

export function fieldsChange(fields) {
  return {
    type: FIELDS_CHANGE,
    fields,
  }
}

export function changeModal(bool) {
  return {
    type: CHANGE_MODAL,
    bool,
  }
}


