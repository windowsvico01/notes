"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = _interopRequireDefault(require("./index.art"));

var _news = _interopRequireDefault(require("./news.art"));

require("./index.css");

var _jquery = _interopRequireDefault(require("jquery"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var InfoFlow = /*#__PURE__*/function () {
  function InfoFlow(dom) {
    _classCallCheck(this, InfoFlow);

    this.state = {
      dom: dom,
      current: 1,
      limit: 10,
      total: 0,
      category: '',
      plate: ''
    };
  }
  /**
   * @param {object} data require { type: 'default/plate', cid, plate_id, module_id } / data {}
   */


  _createClass(InfoFlow, [{
    key: "init",
    value: function init() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var _ca = params.category;
      var finalData = {};

      var _this = this;

      this.getRootCategory(function (rootCategory) {
        if (_ca) {
          // 如果有类目key传入
          _this.getCategoryList(_ca, function (caData) {
            var category = caData.category,
                isRoot = caData.is_root,
                activeCid = caData.active_cid,
                activeKey = caData.active_key,
                rootKey = caData.root_key;
            _this.state.category = activeCid;
            finalData.activeCid = activeCid;
            finalData.category = category;
            finalData.isRoot = isRoot;
            finalData.isHome = false;
            finalData.activeKey = activeKey;
            finalData.rootKey = rootKey;
            finalData.rootCategory = rootCategory;

            _this.setOuterHtml(finalData);
          });
        } else {
          finalData.rootCategory = rootCategory;
          finalData.isHome = true;

          _this.setOuterHtml(finalData);
        }
      });
    }
  }, {
    key: "setOuterHtml",
    value: function setOuterHtml(finalData) {
      this.state.dom.html((0, _index["default"])(finalData));
      var left = (0, _jquery["default"])('#nav-box').offset().left;
      var top = (0, _jquery["default"])('#nav-box').offset().top;
      (0, _jquery["default"])('#nav-box').css({
        position: 'fixed',
        top: "".concat(top, "px"),
        left: "".concat(left, "px")
      });
      this.getMoreArticle();
    }
  }, {
    key: "bindLoadMore",
    value: function bindLoadMore() {
      var loadMoreDom = this.state.dom.find('#load-more');

      var _this = this;

      loadMoreDom.on('click', function () {
        _this.clicked = true;
        if (!_this.clicked) return;

        _this.getMoreArticle();
      });
    }
  }, {
    key: "getMoreArticle",
    value: function getMoreArticle() {
      var _this$state = this.state,
          current = _this$state.current,
          limit = _this$state.limit,
          total = _this$state.total,
          category = _this$state.category;
      var params = {
        page: current,
        limit: limit,
        total: total,
        cid: category
      };

      var _this = this;

      var loadMoreDom = _this.state.dom.find('#load-more');

      this.getArticleData(params, function (res, err) {
        var innerHtml = (0, _news["default"])({
          list: res.data
        });

        var outDom = _this.state.dom.find('#news-list');

        loadMoreDom && loadMoreDom.remove();
        outDom.append(innerHtml);

        if (res.data && res.data.length && res.data.length == limit) {
          // 正常
          outDom.append('<li id="load-more"><div class="s-box load-more">点击加载更多</div></li>');
          _this.state.current += 1;

          _this.bindLoadMore();
        } else if (res.data && res.data.length && res.data.length < limit) {
          // 没有下一页
          outDom.append('<li><div class="s-box no-more">没有更多了...</div></li>');
        } else {
          if (current == 1) outDom.append('<li><div class="s-box no-more">暂时没有内容...</div></li>');else outDom.append('<li><div class="s-box no-more">没有更多了...</div></li>');
        }

        _this.afterInit();
      });
    }
  }, {
    key: "getArticleData",
    value: function getArticleData(params, cb) {
      _jquery["default"].post('/content/getDraftList', params, function (res, err) {
        cb(res.data);
      });
    }
  }, {
    key: "getCategoryList",
    value: function getCategoryList(category, cb) {
      // 获取类目列表
      _jquery["default"].post('/content/getLevelCategory', {
        key: category
      }, function (res, err) {
        cb(res.data);
      });
    }
  }, {
    key: "getRootCategory",
    value: function getRootCategory(cb) {
      _jquery["default"].post('/content/getCategory', {
        pid: '0'
      }, function (res, err) {
        cb(res.data);
      });
    }
  }, {
    key: "afterInit",
    value: function afterInit() {
      console.log('init InfoFlow');

      var _this = this;

      setTimeout(function () {
        _this.clicked = false;
      }, 500);
    }
  }]);

  return InfoFlow;
}();

var _default = InfoFlow;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
