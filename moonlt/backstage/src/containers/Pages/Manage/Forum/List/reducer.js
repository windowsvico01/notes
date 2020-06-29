import produce from 'immer';
import { LOAD_FORUMLIST_SUCCESS, MODAL_VISIBLE_TOGGLE, FIELDS_CHANGE } from './actions';
export const initialState = {
  modalVisible: false,
  editCid: '',
  forumList: [],
  page: 1,
  total: 0,
  fields: [],
};

const menuReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_FORUMLIST_SUCCESS:
        draft.forumList = action.data.forum;
        draft.page = action.data.page;
        draft.total = action.data.total;
        break;
      case FIELDS_CHANGE:
        if (action.editCid) draft.editCid = action.editCid;
        draft.fields = [...action.fields];
        break;
      case MODAL_VISIBLE_TOGGLE:
        if (!action.bool) draft.editCid = '';
        draft.modalVisible = action.bool;
        break;
      default:
        return state;
    }
  });

export default menuReducer;

