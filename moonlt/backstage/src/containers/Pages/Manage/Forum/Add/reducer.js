import produce from 'immer';
import { LOAD_CATEGORY_SUCCESS, LOAD_PLATE_SUCCESS, FIELDS_CHANGE, CHANGE_MODAL } from './actions';
export const initialState = {
  categoryList: [],
  plateList: [],
  fields: [],
  modalVisible: false,
};

const detailReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_CATEGORY_SUCCESS:
        console.log(action.data);
        draft.categoryList = action.data.category;
        break;
      case LOAD_PLATE_SUCCESS:
        draft.plateList = action.data.plate;
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
