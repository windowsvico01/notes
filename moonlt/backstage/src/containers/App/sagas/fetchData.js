import { put, call } from 'redux-saga/effects';
import request from '@/utils/request';
import { DIALOG_TYPE, AUTHERROR, showDialog, loading, loaded } from '@/containers/App/actions.js';
import { message as messageIndicator } from 'antd';

let indicator;

class APIError extends Error {
  constructor(message) {
    super(message);
    this.message = message || '服务器错误';
    this.name = 'APIError';
  }
}
const getCookie = (name) => {
  var start = document.cookie.indexOf(name + "="); //得到cookie字符串中的名称
  var len = start + name.length + 1; //得到从起始位置到结束cookie位置的长度
  //如果起始没有值且name不存在于cookie字符串中，则返回null
  if ((!start) && (name != document.cookie.substring(0, name.length))) {
      return null;
  }
  if (start == -1) return null; //如果起始位置为-1也为null
  var end = document.cookie.indexOf(';', len); //获取cookie尾部位置
  if (end == -1) end = document.cookie.length; //计算cookie尾部长度
  return unescape(document.cookie.substring(len, end)); //获取cookie值
}
// export const delay = (ms) => new Promise((resolve) => setTimeout(resolve({ code: 0, test: 'test' }), ms));

/*
  参数url和api的区别，传api时，会请求后端api代理地址。传url时，请求url的地址
 */
export default function* fetchData({url, options, successMessage, loadIdentify = 'global', mapResult, hideSpinning}) {
  let data;
  const finalURL = `http://62.234.73.102:3000${url}`;
  try {
    yield put(loading(loadIdentify));
    if (typeof indicator !== 'function' && !hideSpinning) {
      indicator = messageIndicator.loading('加载中...');
      setTimeout(() => { indicator = indicator(); }, 1500);
    }
    options.body.append('token', getCookie('token'));
    let result = yield call(request, finalURL, { credentials: 'omit', ...options });
    result = mapResult ? mapResult(result) : result;
    const errno = result.code !== undefined ? result.code : result.errno;
    const msg = result.msg || result.errmsg;
    if (errno !== 0) {
      if ([-10].indexOf(errno) !== -1) {
        yield put({ type: AUTHERROR, message: result.errmsg });
      } else {
        const error = new APIError(result);
        error.code = errno;
        error.msg = msg || result.message || '';
        error.data = result.data;
        throw error;
      }
    }
    if (successMessage) {
      yield put(showDialog(DIALOG_TYPE.success, successMessage));
    }
    data = result.data || {};
  } catch (error) {
    console.warn('APIError: %O', error); // eslint-disable-line
    yield put(showDialog(DIALOG_TYPE.error, error.code ? `【错误码：${error.code}】：${error.msg}` : '系统错误，请联系管理员'));
    if (error.code === 16) {
      data = error.data;
    }
  } finally {
    yield put(loaded(loadIdentify));
  }
  return data;
}

