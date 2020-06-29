import produce from 'immer';
import { LOAD_CATEGORY_SUCCESS, LOAD_FORUM_SUCCESS, FIELDS_CHANGE } from './actions';
export const initialState = {
  categoryList: [],
  forumList: [],
  fields: [],
};

const addReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_CATEGORY_SUCCESS:
        draft.categoryList = action.data.category;
        break;
      case LOAD_FORUM_SUCCESS:
        draft.forumList = action.data.forum;
        break;
      case FIELDS_CHANGE:
        draft.fields = [...action.fields];
        break;
      default:
        return state;
    }
  });

export default addReducer;
