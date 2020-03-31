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
    const { category : _ca } = params;
    const finalData = {};
    console.log(params);
    const _this = this;
    this.getRootCategory((rootCategory) => {
      if (_ca) {  // 如果有类目key传入
        _this.getCategoryList(_ca, (caData) => {
          const { category, is_root: isRoot, active_cid: activeCid, active_key: activeKey, root_key: rootKey } = caData;
          _this.getArticleData({...params, cid: activeCid}, (res) => {
            finalData.list = res.data;
            finalData.activeCid = activeCid;
            finalData.category = category;
            finalData.isRoot = isRoot;
            finalData.isHome = false;
            finalData.activeKey = activeKey;
            finalData.rootKey = rootKey;
            finalData.rootCategory = rootCategory;
            const tHtml = index(finalData);
            _this.state.dom.html(tHtml);
            _this.afterInit();
          })
        })
      } else {
        _this.getArticleData({...params, cid: ''}, (res) => {
          finalData.list = res.data;
          finalData.isHome = true;
          finalData.rootCategory = rootCategory;
          console.log(rootCategory);
          const tHtml = index(finalData);
          _this.state.dom.html(tHtml);
          _this.afterInit();
        })
      }
    })
  }
  getArticleData(params, cb) {
    $.post('/content/getDraftList', params, (res,err) => {
      cb(res.data);
    })
  }
  getCategoryList(category, cb) { // 获取类目列表
    $.post('/content/getLevelCategory', { key: category }, (res,err) => {
      cb(res.data);
    })
  }
  getRootCategory(cb) {
    $.post('/content/getCategory', { pid: '0' }, (res,err) => {
      cb(res.data);
    })
  }
  afterInit() {
    console.log('init InfoFlow');
  }
}
export default InfoFlow;