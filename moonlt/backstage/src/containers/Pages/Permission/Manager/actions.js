export const GET_USERS = '/Permission/Manager/GET_USERS';
export const GET_USERS_SUCCESS = '/Permission/Manager/GET_USERS_SUCCESS';

export function getUsers(params) {
  console.log(params);
  return {
    type: GET_USERS,
    params,
  };
  }
  
export function getUsersSuccess(data) {
  return {
    type: GET_USERS_SUCCESS,
    data,
  };
}