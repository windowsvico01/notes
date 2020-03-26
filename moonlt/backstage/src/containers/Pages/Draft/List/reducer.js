import produce from 'immer';
import { LOAD_CATEGORY_SUCCESS, LOAD_PLATE_SUCCESS, LOAD_DRAFT_SUCCESS } from './actions';
export const initialState = {
  categoryList: [],
  plateList: [],
  draftList: [],
  page: 0,
  total: 0,
};

const addReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_CATEGORY_SUCCESS:
        draft.categoryList = action.data.category;
        break;
      case LOAD_PLATE_SUCCESS:
        draft.plateList = action.data.plate;
        break;
      case LOAD_DRAFT_SUCCESS:
        draft.draftList = action.data.data;
        draft.page = action.data.current;
        draft.total = action.data.total;
        break;
      default:
        return state;
    }
  });

export default addReducer;
