
class api {
  constructor() {
    this.host = '';
  }
  get(url, cb) {
    console.log(`${this.host}${url}`);
    console.log($);
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