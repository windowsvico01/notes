import index from './index.art';
import './index.css';
import $ from 'jquery';
class InfoFlow {
  constructor(dom) {
    this.state = {
      dom,
      current: 1,
      limit: 10,
      total: 0,
    }
  }
  /**
   * @param {object} data require { type: 'default/plate', cid, plate_id, module_id } / data {}
   */
  init(params = {}) {
    this.getArticleData(params, (res) => {
      const tHtml = index({list: res.data});
      this.state.dom.html(tHtml);
      this.afterInit();
    })
  }
  getArticleData(params, cb) {
    $.post('/content/getDraftList', params, (res,err) => {
      cb(res.data);
    })
  }
  afterInit() {
    console.log('init InfoFlow');
  }
}
export default InfoFlow;