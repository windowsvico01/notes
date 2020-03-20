import { call, put, takeLatest } from 'redux-saga/effects';
import fetchData from './fetchData';
import { LOAD_USERINFO, loadUserInfoSuccess } from '@/containers/App/actions.js';
/* 获取个人信息的异步流程 */
export function* handleLoadUserInfo() {
  const formDataForInfo = new FormData();
  const optionsForInfo = {
    method: 'POST',
    body: formDataForInfo,
  };
  const formDataForMenu = new FormData();
  const optionsForMenu = {
    method: 'POST',
    body: formDataForMenu,
  };
  const results = yield call(fetchData, { url: '/api/getUserInfo', options: optionsForInfo });
  if (results) {
    const menus = yield call(fetchData, { url: '/user/getMenuList', options: optionsForMenu });
    yield put(loadUserInfoSuccess(results, menus));
  }
}

export default function* profileWatcher() {
  yield takeLatest(LOAD_USERINFO, handleLoadUserInfo);
}
