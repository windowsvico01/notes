import produce from 'immer';
// import { CHANGE_USERNAME } from './constants';

// The initial state of the App
export const initialState = {
  helloList: '',
};

/* eslint-disable default-case, no-param-reassign */
// const homeReducer = (state = initialState, action) =>
//   produce(state, draft => {
//     switch (action.type) {
//       case CHANGE_USERNAME:
//         // Delete prefixed '@' from the github username
//         draft.username = action.username.replace(/@/gi, '');
//         break;
//     }
//   });

const listReducer = (state = initialState, action) => {
  return state;
};

export default listReducer;
