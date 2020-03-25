import { call, put, takeLatest } from 'redux-saga/effects';
import fetchData from '@/containers/App/sagas/fetchData';
import { GET_USERS, getUsers, getUsersSuccess, LOAD_MENU, loadMenuSuccess, UPDATE_USER } from './actions';
import { loadUserInfo } from '@/containers/App/actions';
export function* handleGetUsers(action) {
  const { params } = action;
  const formData = new FormData();
  Object.keys(params).forEach((key) => {
    if (params[key] === '') return;
    formData.append(key, params[key]);
  })
  formData.append('limit', 10);
  const options = {
    method: 'POST',
    body: formData,
  }
  const result = yield call(fetchData, { url: '/user/getUsers', options });
  if (result) {
    yield put(getUsersSuccess(result));
  }
}

export function* handleLoadMenu(action) {
  const { params } = action;
  const formData = new FormData();
  Object.keys(params).forEach((key) => {
    if (params[key] === '') return;
    formData.append(key, params[key]);
  })
  const options = {
    method: 'POST',
    body: formData,
  }
  const result = yield call(fetchData, { url: '/user/getMenuList', options });
  if (result) {
    yield put(loadMenuSuccess(result));
  }
}

export function* handleUpdateUser(action) {
  const { params } = action;
  const formData = new FormData();
  Object.keys(params).forEach((key) => {
    if (params[key] === '') return;
    formData.append(key, params[key]);
  })
  const options = {
    method: 'POST',
    body: formData,
  }
  const result = yield call(fetchData, { url: '/user/updateUser', options });
  if (result) {
    yield put(getUsers({}));
    yield put(loadUserInfo());
  }
}

export function* watcher() {
  yield takeLatest(GET_USERS, handleGetUsers)
  yield takeLatest(LOAD_MENU, handleLoadMenu)
  yield takeLatest(UPDATE_USER, handleUpdateUser)
}

export default [
  watcher,
];

