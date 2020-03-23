import { call, put, takeLatest } from 'redux-saga/effects';
import fetchData from '@/containers/App/sagas/fetchData';
import { GET_USERS, getUsersSuccess } from './actions';

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

export function* watcher() {
  yield takeLatest(GET_USERS, handleGetUsers)
}

export default [
  watcher,
];

