import index from './index.art';
import './index.css';
import $ from 'jquery';
class Article {
  constructor(dom) {
    this.state = {
      dom,
      current: 1,
      limit: 10,
      total: 0,
    }
  }
  /**
   * @param {object} data require { article_id: '' } / data {}
   */
  init(params = {}) {
    const { articleId : _aId } = params;
    const _this = this;
    this.getArticleInfo({ article_id: _aId }, (res, err) => {
      console.log(res);
      const tHtml = index(res);
      _this.state.dom.html(tHtml);
      _this.afterInit();
    })
  }
  getArticleInfo(params, cb) {
    $.post('/content/getDraftInfo', params, (res, err) => {
      cb(res.data);
    })
  }
  afterInit() {
    console.log('init Content');
  }
}
export default Article;