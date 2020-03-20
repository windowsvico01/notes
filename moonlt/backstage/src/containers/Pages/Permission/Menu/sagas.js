import { fork, call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import fetchData from '@/containers/App/sagas/fetchData';
import { loadUserInfo } from '@/containers/App/actions';
import { ADD_MENU, modalVisibleToggle, LOAD_MENU, loadMenuSuccess, loadMenu, UPDATE_MENU, fieldsChange } from './actions';
export function* handleAddMenu(action) {
  const { params } = action;
  const formData = new FormData();
  Object.keys(params).forEach((key) => {
    if (params[key] === undefined) return;
    formData.append(key, params[key]);
  })
  const options = {
    method: 'POST',
    body: formData,
  }
  const result = yield call(fetchData, { url: '/user/addMenu', options });
  if (result) {
    yield put(loadMenu({ menu_ids: 'all' }));
    yield put(modalVisibleToggle(false));
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
export function* handleUpdateMenu(action) {
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
  const result = yield call(fetchData, { url: '/user/updateMenu', options });
  if (result) {
    yield put(modalVisibleToggle(false)); // 清空)
    yield put(loadMenu({ menu_ids: 'all' }));
    yield put(loadUserInfo());
  }
}
export function* watcher() {
  yield takeLatest(ADD_MENU, handleAddMenu)
  yield takeLatest(LOAD_MENU, handleLoadMenu)
  yield takeLatest(UPDATE_MENU, handleUpdateMenu)
}

export default [
  watcher,
];
