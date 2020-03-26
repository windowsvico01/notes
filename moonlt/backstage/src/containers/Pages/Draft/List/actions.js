export const LOAD_CATEGORY = '/Draft/List/LOAD_CATEGORY';
export const LOAD_CATEGORY_SUCCESS = '/Draft/List/LOAD_CATEGORY_SUCCESS';

export const LOAD_PLATE = '/Draft/List/LOAD_PLATE';
export const LOAD_PLATE_SUCCESS = '/Draft/List/LOAD_PLATE_SUCCESS';

export const LOAD_DRAFT = '/Draft/List/LOAD_DRAFT';
export const LOAD_DRAFT_SUCCESS = '/Draft/List/LOAD_DRAFT_SUCCESS';

export function loadDraft(params) {
  return {
    type: LOAD_DRAFT,
    params,
  };
}

export function loadDraftSuccess(data) {
  return {
    type: LOAD_DRAFT_SUCCESS,
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