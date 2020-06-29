export const LOAD_CATEGORY = '/Manage/Category/Detail/LOAD_CATEGORY';
export const LOAD_CATEGORY_SUCCESS = '/Manage/Category/Detail/LOAD_CATEGORY_SUCCESS';

export const LOAD_FORUM = '/Manage/Category/Detail/LOAD_FORUM';
export const LOAD_FORUM_SUCCESS = '/Manage/Category/Detail/LOAD_FORUM_SUCCESS';

export const ADD_FORUM = '/Manage/Category/Detail/ADD_FORUM';

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

export function loadForum(params) {
  return {
    type: LOAD_FORUM,
    params,
  };
}

export function loadForumSuccess(data) {
  return {
    type: LOAD_FORUM_SUCCESS,
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


