import produce from 'immer';
import { LOAD_MENU_SUCCESS, MODAL_VISIBLE_TOGGLE, FIELDS_CHANGE } from './actions';
export const initialState = {
  modalVisible: false,
  editId: '',
  menus: [],
  fields: [],
};

const menuReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_MENU_SUCCESS:
        draft.menus = action.data;
        break;
      case FIELDS_CHANGE:
        if (action.editId) draft.editId = action.editId;
        draft.fields = [...action.fields];
        break;
      case MODAL_VISIBLE_TOGGLE:
        if (!action.bool) draft.editId = '';
        draft.modalVisible = action.bool;
        break;
      default:
        return state;
    }
  });

export default menuReducer;

