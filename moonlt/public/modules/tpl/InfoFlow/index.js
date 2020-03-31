"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = _interopRequireDefault(require("./index.art"));

require("./index.css");

var _jquery = _interopRequireDefault(require("jquery"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
      total: 0
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
      console.log(params);

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

            _this.getArticleData(_objectSpread({}, params, {
              cid: activeCid
            }), function (res) {
              finalData.list = res.data;
              finalData.activeCid = activeCid;
              finalData.category = category;
              finalData.isRoot = isRoot;
              finalData.isHome = false;
              finalData.activeKey = activeKey;
              finalData.rootKey = rootKey;
              finalData.rootCategory = rootCategory;
              var tHtml = (0, _index["default"])(finalData);

              _this.state.dom.html(tHtml);

              _this.afterInit();
            });
          });
        } else {
          _this.getArticleData(_objectSpread({}, params, {
            cid: ''
          }), function (res) {
            finalData.list = res.data;
            finalData.isHome = true;
            finalData.rootCategory = rootCategory;
            console.log(rootCategory);
            var tHtml = (0, _index["default"])(finalData);

            _this.state.dom.html(tHtml);

            _this.afterInit();
          });
        }
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
    }
  }]);

  return InfoFlow;
}();

var _default = InfoFlow;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
