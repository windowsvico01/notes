import produce from 'immer';
import { GET_USERS_SUCCESS, LOAD_MENU_SUCCESS } from './actions';

export const initialState = {
  userList: [],
  total: 0,
  current: 1,
  menus: [],
};

const managerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_USERS_SUCCESS:
        draft.userList = action.data.userList;
        draft.total = action.data.total;
        draft.current = action.data.current;
        break;
      case LOAD_MENU_SUCCESS:
        draft.menus = action.data;
        break;
      default:
        return state;
    }
  });

export default managerReducer;
