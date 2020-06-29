import produce from 'immer';
import { LOAD_CATEGORY_SUCCESS, LOAD_FORUM_SUCCESS, FIELDS_CHANGE, CHANGE_MODAL } from './actions';
export const initialState = {
  info: {},
  forumList: [],
  fields: [],
  modalVisible: false,
};

const detailReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_CATEGORY_SUCCESS:
        draft.info = action.data.category;
        break;
      case LOAD_FORUM_SUCCESS:
        draft.forumList = action.data.forum;
        break;
      case FIELDS_CHANGE:
        draft.fields = [...action.fields];
        break;
      case CHANGE_MODAL:
        if (!action.bool) draft.fields = [];
        draft.modalVisible = action.bool;
        break;
      default:
        return state;
    }
  });

export default detailReducer;
