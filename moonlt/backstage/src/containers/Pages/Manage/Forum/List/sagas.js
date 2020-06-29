import { fork, call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import fetchData from '@/containers/App/sagas/fetchData';
import { LOAD_FORUMLIST, loadForumListSuccess } from './actions';
// export function* handleAddCategory(action) {
//   const { params } = action;
//   const formData = new FormData();
//   Object.keys(params).forEach((key) => {
//     if (params[key] === undefined) return;
//     formData.append(key, params[key]);
//   })
//   const options = {
//     method: 'POST',
//     body: formData,
//   }
//   const result = yield call(fetchData, { url: '/content/addCategory', options });
//   if (result) {
//     yield put(loadCategory());
//     yield put(modalVisibleToggle(false));
//   }
// }
export function* handleLoadForumList(action) {
  const formData = new FormData();
  const { cid, fid, name, page = 1 } = action.params;
  cid && formData.append('cid', cid);
  fid && formData.append('fid', fid);
  name && formData.append('name', name);
  formData.append('page', page);
  formData.append('limit', 20);
  const options = {
    method: 'POST',
    body: formData,
  }
  const result = yield call(fetchData, { url: '/content/getForum', options });
  if (result) {
    yield put(loadForumListSuccess(result));
  }
}
// export function* handleUpdateCategory(action) {
//   const { params } = action;
//   const formData = new FormData();
//   Object.keys(params).forEach((key) => {
//     if (params[key] === '') return;
//     formData.append(key, params[key]);
//   })
//   const options = {
//     method: 'POST',
//     body: formData,
//   }
//   const result = yield call(fetchData, { url: '/content/updateCategory', options });
//   if (result) {
//     yield put(modalVisibleToggle(false)); // 清空)
//     yield put(loadCategory());
//   }
// }
export function* watcher() {
  // yield takeLatest(ADD_CATEGORY, handleAddCategory)
  yield takeLatest(LOAD_FORUMLIST, handleLoadForumList)
  // yield takeLatest(UPDATE_CATEGORY, handleUpdateCategory)
}

export default [
  watcher,
];
