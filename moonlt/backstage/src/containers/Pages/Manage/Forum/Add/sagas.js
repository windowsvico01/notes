import { fork, call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import fetchData from '@/containers/App/sagas/fetchData';
import { LOAD_CATEGORY, loadCategorySuccess, LOAD_PLATE, loadPlate, loadPlateSuccess, ADD_FORUM, changeModal } from './actions';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();
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
export function* handleAddForum(action) {
  const { cid, name, summary, cover } = action.params;
  if (!cid || !name || !cover) return;
  const formData = new FormData();
  formData.append('cid', cid);
  formData.append('name', name);
  formData.append('cover', cover);
  summary && formData.append('summary', summary);
  const options = {
    method: 'POST',
    body: formData,
  }
  const result = yield call(fetchData, { url: '/content/addForum', options });
  if (result) {
    history.goBack();
  }
}
export function* watcher() {
  yield takeLatest(LOAD_CATEGORY, handleLoadCategory)
  yield takeLatest(LOAD_PLATE, handleLoadPlate)
  yield takeLatest(ADD_FORUM, handleAddForum)
}

export default [
  watcher,
];
