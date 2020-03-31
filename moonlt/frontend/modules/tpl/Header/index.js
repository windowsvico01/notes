import index from './index.art';
import './index.css';
import $ from 'jquery';
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
class Header {
  constructor(dom) {
    this.config = {
        dom,
    }
  }
  init(data) {
    this.getUserInfo((res)=> {
      const tHtml = index({ ...data, userInfo: res});
      this.config.dom.html(tHtml);
      this.afterInit();
    })
  }
  getUserInfo(cb) {
    $.post('/api/getUserInfo', {token: getCookie('token')}, (res, err) => {
      if ([-1, -2, -9].indexOf(res.code) !== -1) cb('');
      if (res.code === 0) cb(res.data);
    })
  }
  afterInit() {
    console.log('init');
  }
}
export default Header;