export const LOAD_CATEGORY = '/Draft/Add/LOAD_CATEGORY';
export const LOAD_CATEGORY_SUCCESS = '/Draft/Add/LOAD_CATEGORY_SUCCESS';

export const LOAD_PLATE = '/Draft/Add/LOAD_PLATE';
export const LOAD_PLATE_SUCCESS = '/Draft/Add/LOAD_PLATE_SUCCESS';

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