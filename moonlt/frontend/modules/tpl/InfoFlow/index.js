import index from './index.art';
import news from './news.art';
import './index.css';
import $ from 'jquery';
class InfoFlow {
  constructor(dom) {
    this.state = {
      dom,
      current: 1,
      limit: 10,
      total: 0,
      category: '',
      plate: '',
    }
  }
  /**
   * @param {object} data require { type: 'default/plate', cid, plate_id, module_id } / data {}
   */
  init(params = {}) {
    const { category : _ca } = params;
    const finalData = {};
    const _this = this;
    this.getRootCategory((rootCategory) => {
      if (_ca) {  // 如果有类目key传入
        _this.getCategoryList(_ca, (caData) => {
          const { category, is_root: isRoot, active_cid: activeCid, active_key: activeKey, root_key: rootKey } = caData;
          _this.state.category = activeCid;
          finalData.activeCid = activeCid;
          finalData.category = category;
          finalData.isRoot = isRoot;
          finalData.isHome = false;
          finalData.activeKey = activeKey;
          finalData.rootKey = rootKey;
          finalData.rootCategory = rootCategory;
          _this.setOuterHtml(finalData);
        })
      } else {
        finalData.rootCategory = rootCategory;
        finalData.isHome = true;
        _this.setOuterHtml(finalData);
      }
    })
  }
  setOuterHtml(finalData) {
    this.state.dom.html(index(finalData));
    const left = $('#nav-box').offset().left;
    const top = $('#nav-box').offset().top;
    $('#nav-box').css({ position: 'fixed', top: `${top}px`, left: `${left}px` });
    this.getMoreArticle();
  }
  bindLoadMore() {
    const loadMoreDom = this.state.dom.find('#load-more');
    const _this = this;
    loadMoreDom.on('click', () => {
      _this.clicked = true;
      if (!_this.clicked) return;
      _this.getMoreArticle();
    })
  }
  getMoreArticle() {
    const { current, limit, total, category } = this.state;
    const params = { page: current, limit, total, cid: category };
    const _this = this;
    const loadMoreDom = _this.state.dom.find('#load-more');
    this.getArticleData(params, (res, err) => {
      const innerHtml = news({ list: res.data });
      const outDom = _this.state.dom.find('#news-list');
      loadMoreDom && loadMoreDom.remove();
      outDom.append(innerHtml);
      if (res.data && res.data.length && res.data.length == limit) { // 正常
        outDom.append('<li id="load-more"><div class="s-box load-more">点击加载更多</div></li>');
        _this.state.current += 1;
        _this.bindLoadMore();
      } else if (res.data && res.data.length && res.data.length < limit) { // 没有下一页
        outDom.append('<li><div class="s-box no-more">没有更多了...</div></li>');
      } else {
        if (current == 1) outDom.append('<li><div class="s-box no-more">暂时没有内容...</div></li>');
        else outDom.append('<li><div class="s-box no-more">没有更多了...</div></li>');
      }
      _this.afterInit();
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
    const _this = this;
    setTimeout(() => {
      _this.clicked = false;
    }, 500)
  }
}
export default InfoFlow;