import { fork, call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import fetchData from '@/containers/App/sagas/fetchData';
import { LOAD_CATEGORY, loadCategorySuccess, LOAD_PLATE, loadPlate, loadPlateSuccess, ADD_PLATE, changeModal } from './actions';
export function* handleLoadCategory(action) {
  const { cid } = action.params;
  if (!cid) return;
  const formData = new FormData();
  formData.append('cid', cid);
  const options = {
    method: 'POST',
    body: formData,
  }
  const result = yield call(fetchData, { url: '/content/getCategoryInfo', options });
  console.log(result);
  if (result) {
    yield put(loadCategorySuccess(result));
  }
}
export function* handleLoadPlate(action) {
  const { cid } = action.params;
  const formData = new FormData();
  cid && formData.append('cid', cid);
  const options = {
    method: 'POST',
    body: formData,
  }
  const result = yield call(fetchData, { url: '/content/getPlate', options });
  if (result) {
    yield put(loadPlateSuccess(result));
  }
}
export function* handleAddPlate(action) {
  const { cid, name } = action.params;
  if (!cid || !name) return;
  const formData = new FormData();
  formData.append('cid', cid);
  formData.append('name', name);
  const options = {
    method: 'POST',
    body: formData,
  }
  const result = yield call(fetchData, { url: '/content/addPlate', options });
  if (result) {
    yield put(loadPlate({ cid }));
    yield put(changeModal(false));
  }
}
export function* watcher() {
  yield takeLatest(LOAD_CATEGORY, handleLoadCategory)
  yield takeLatest(LOAD_PLATE, handleLoadPlate)
  yield takeLatest(ADD_PLATE, handleAddPlate)
}

export default [
  watcher,
];
