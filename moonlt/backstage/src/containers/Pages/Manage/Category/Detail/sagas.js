import { fork, call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import fetchData from '@/containers/App/sagas/fetchData';
import { LOAD_CATEGORY, loadCategorySuccess, LOAD_FORUM, loadForum, loadForumSuccess, ADD_FORUM, changeModal } from './actions';
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
export function* handleLoadForum(action) {
  const { cid } = action.params;
  if (!cid) return;
  const formData = new FormData();
  formData.append('cid', cid);
  const options = {
    method: 'POST',
    body: formData,
  }
  const result = yield call(fetchData, { url: '/content/getForum', options });
  if (result) {
    yield put(loadForumSuccess(result));
  }
}
export function* handleAddForum(action) {
  const { cid, name } = action.params;
  if (!cid || !name) return;
  const formData = new FormData();
  formData.append('cid', cid);
  formData.append('name', name);
  const options = {
    method: 'POST',
    body: formData,
  }
  const result = yield call(fetchData, { url: '/content/addForum', options });
  if (result) {
    yield put(loadForum({ cid }));
    yield put(changeModal(false));
  }
}
export function* watcher() {
  yield takeLatest(LOAD_CATEGORY, handleLoadCategory)
  yield takeLatest(LOAD_FORUM, handleLoadForum)
  yield takeLatest(ADD_FORUM, handleAddForum)
}

export default [
  watcher,
];
