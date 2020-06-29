export const LOAD_CATEGORY = '/Draft/Add/LOAD_CATEGORY';
export const LOAD_CATEGORY_SUCCESS = '/Draft/Add/LOAD_CATEGORY_SUCCESS';

export const LOAD_FORUM = '/Draft/Add/LOAD_FORUM';
export const LOAD_FORUM_SUCCESS = '/Draft/Add/LOAD_FORUM_SUCCESS';

export const FIELDS_CHANGE = '/Draft/Add/FIELDS_CHANGE';

export const PUBLISH_DRAFT = '/Draft/Add/PUBLISH_DRAFT';

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

export function fieldsChange(fields) {
  return {
    type: FIELDS_CHANGE,
    fields,
  }
}

export function publishDraft(params) {
  return {
    type: PUBLISH_DRAFT,
    params,
  }
}