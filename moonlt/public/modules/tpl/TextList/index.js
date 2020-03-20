"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = _interopRequireDefault(require("./index.art"));

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TextList = /*#__PURE__*/function () {
  function TextList(dom) {
    _classCallCheck(this, TextList);

    this.config = {
      dom: dom
    };
  }

  _createClass(TextList, [{
    key: "init",
    value: function init(data) {
      var tHtml = (0, _index["default"])(data);
      this.config.dom.html(tHtml);
      this.afterInit();
    }
  }, {
    key: "afterInit",
    value: function afterInit() {
      console.log('init TextList');
    }
  }]);

  return TextList;
}();

var _default = TextList;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
