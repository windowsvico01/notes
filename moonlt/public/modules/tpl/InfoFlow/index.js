"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = _interopRequireDefault(require("./index.art"));

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
      total: 0
    };
  }
  /**
   * @param {object} data require { type: 'default/plate', cid, plate_id, module_id } / data {}
   */


  _createClass(InfoFlow, [{
    key: "init",
    value: function init() {
      var _this = this;

      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.getArticleData(params, function (res) {
        var tHtml = (0, _index["default"])({
          list: res.data
        });

        _this.state.dom.html(tHtml);

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