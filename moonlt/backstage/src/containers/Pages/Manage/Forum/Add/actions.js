export const LOAD_CATEGORY = '/Manage/Forum/Add/LOAD_CATEGORY';
export const LOAD_CATEGORY_SUCCESS = '/Manage/Forum/Add/LOAD_CATEGORY_SUCCESS';

export const LOAD_PLATE = '/Manage/Forum/Add/LOAD_PLATE';
export const LOAD_PLATE_SUCCESS = '/Manage/Forum/Add/LOAD_PLATE_SUCCESS';

export const ADD_FORUM = '/Manage/Forum/Add/ADD_FORUM';

export const FIELDS_CHANGE = '/Manage/Forum/Add/FIELDS_CHANGE';

export const CHANGE_MODAL = '/Manage/Forum/Add/CHANGE_MODAL';

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

export function addForum(params) {
  return {
    type: ADD_FORUM,
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


