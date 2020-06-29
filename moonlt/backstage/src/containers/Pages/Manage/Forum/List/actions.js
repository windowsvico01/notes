export const LOAD_FORUMLIST = '/Manage/Forum/List/LOAD_FORUMLIST';
export const LOAD_FORUMLIST_SUCCESS = '/Manage/Forum/List/LOAD_FORUMLIST_SUCCESS';

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

export function loadForumList(params) {
  return {
    type: LOAD_FORUMLIST,
    params
  };
}

export function loadForumListSuccess(data) {
  return {
    type: LOAD_FORUMLIST_SUCCESS,
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

