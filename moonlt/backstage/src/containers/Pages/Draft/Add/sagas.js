import { call, put, takeLatest } from 'redux-saga/effects';
import fetchData from '@/containers/App/sagas/fetchData';
import { LOAD_CATEGORY, loadCategorySuccess, LOAD_FORUM, loadForumSuccess, PUBLISH_DRAFT, fieldsChange } from './actions';
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
export function* handlePublishDraft(action) {
  const { params } = action;
  const formData = new FormData();
  Object.keys(params).forEach((key) => {
    if (params[key]) formData.append(key, params[key]);
  })
  const options = {
    method: 'POST',
    body: formData,
  }
  const result = yield call(fetchData, { url: '/content/publishDraft', options });
  if (result) {
    history.goBack();
  }
}
export function* watcher() {
  yield takeLatest(LOAD_CATEGORY, handleLoadCategory)
  yield takeLatest(LOAD_FORUM, handleLoadForum)
  yield takeLatest(PUBLISH_DRAFT, handlePublishDraft)
}

export default [
  watcher,
];
