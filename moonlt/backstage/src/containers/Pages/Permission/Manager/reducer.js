import produce from 'immer';
import { GET_USERS_SUCCESS } from './actions';

export const initialState = {
  userList: [],
  total: 0,
  current: 1,
};

const managerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_USERS_SUCCESS:
        console.log(action);
        draft.userList = action.data.userList;
        draft.total = action.data.total;
        draft.current = action.data.current;
        break;
      default:
        return state;
    }
  });

export default managerReducer;
