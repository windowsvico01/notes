/** 弹窗 */
const alertMsg = (text, type, cb) => {
  const alertId =  new Date().getTime();
  if (!$('#alertCon').length) $('body').prepend('<div style="position:fixed;top:20px;right:20px;z-index:100" id="alertCon">');
  const alertDom = `<div id="${alertId}" class="alert alert-${type || 'primary'} fade show" style="width: 200px;" role="alert">${text}</div>`;
  $('#alertCon').append(alertDom);
  setTimeout(() => {
    $(`#${alertId}`).fadeOut();
    if (!$('.alert').length) $('#alertCon').remove();
    cb && cb();
  }, 5000);
};
/** 获取cookit */
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
/*** Api包装 */
class api {
  constructor() {
    this.host = '';
  }
  get(url, cb) {
    $.get(`${this.host}${url}`, (res,err) => {
      console.log(res);
      return cb && cb(res, err);
    })
  }
  post(url, params, cb) {
    $.post(`${this.host}${url}`, params, (res,err) => {
      cb && cb(res, err);
    })
  }
}
const Api = new api();