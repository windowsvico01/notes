import { fork, call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import fetchData from '@/containers/App/sagas/fetchData';
import { ADD_CATEGORY, modalVisibleToggle, LOAD_CATEGORY, loadCategorySuccess, loadCategory, UPDATE_CATEGORY, fieldsChange } from './actions';
export function* handleAddCategory(action) {
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
  const result = yield call(fetchData, { url: '/content/addCategory', options });
  if (result) {
    yield put(loadCategory());
    yield put(modalVisibleToggle(false));
  }
}
export function* handleLoadCategory() {
  const formData = new FormData();
  const options = {
    method: 'POST',
    body: formData,
  }
  const result = yield call(fetchData, { url: '/content/getCategory', options });
  if (result) {
    yield put(loadCategorySuccess(result));
  }
}
export function* handleUpdateCategory(action) {
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
  const result = yield call(fetchData, { url: '/content/updateCategory', options });
  if (result) {
    yield put(modalVisibleToggle(false)); // 清空)
    yield put(loadCategory());
  }
}
export function* watcher() {
  yield takeLatest(ADD_CATEGORY, handleAddCategory)
  yield takeLatest(LOAD_CATEGORY, handleLoadCategory)
  yield takeLatest(UPDATE_CATEGORY, handleUpdateCategory)
}

export default [
  watcher,
];
