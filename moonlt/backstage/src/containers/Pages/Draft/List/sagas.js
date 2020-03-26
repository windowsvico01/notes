import { call, put, takeLatest } from 'redux-saga/effects';
import fetchData from '@/containers/App/sagas/fetchData';
import { LOAD_CATEGORY, loadCategorySuccess, LOAD_PLATE, loadPlateSuccess, LOAD_DRAFT, loadDraftSuccess } from './actions';
export function* handleLoadCategory(action) {
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
export function* handleLoadPlate(action) {
  const { cid } = action.params;
  if (!cid) return;
  const formData = new FormData();
  formData.append('cid', cid);
  const options = {
    method: 'POST',
    body: formData,
  }
  const result = yield call(fetchData, { url: '/content/getPlate', options });
  if (result) {
    yield put(loadPlateSuccess(result));
  }
}
export function* handleLoadDraft(action) {
  const { params } = action;
  const formData = new FormData();
  Object.keys(params).forEach((key) => {
    if (params[key]) formData.append(key, params[key]);
  })
  formData.append('limit', 10);
  const options = {
    method: 'POST',
    body: formData,
  }
  const result = yield call(fetchData, { url: '/content/getDraftList', options });
  console.log(result);
  if (result) {
    yield put(loadDraftSuccess(result));
  }
}
export function* watcher() {
  yield takeLatest(LOAD_CATEGORY, handleLoadCategory)
  yield takeLatest(LOAD_PLATE, handleLoadPlate)
  yield takeLatest(LOAD_DRAFT, handleLoadDraft)
}

export default [
  watcher,
];
