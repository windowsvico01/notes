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

var getCookie = function getCookie(name) {
  var start = document.cookie.indexOf(name + "="); //得到cookie字符串中的名称

  var len = start + name.length + 1; //得到从起始位置到结束cookie位置的长度
  //如果起始没有值且name不存在于cookie字符串中，则返回null

  if (!start && name != document.cookie.substring(0, name.length)) {
    return null;
  }

  if (start == -1) return null; //如果起始位置为-1也为null

  var end = document.cookie.indexOf(';', len); //获取cookie尾部位置

  if (end == -1) end = document.cookie.length; //计算cookie尾部长度

  return unescape(document.cookie.substring(len, end)); //获取cookie值
};

var Header = /*#__PURE__*/function () {
  function Header(dom) {
    _classCallCheck(this, Header);

    this.config = {
      dom: dom
    };
  }

  _createClass(Header, [{
    key: "init",
    value: function init(data) {
      var _this = this;

      this.getUserInfo(function (res) {
        var tHtml = (0, _index["default"])(_objectSpread({}, data, {
          userInfo: res
        }));

        _this.config.dom.html(tHtml);

        _this.afterInit();
      });
    }
  }, {
    key: "getUserInfo",
    value: function getUserInfo(cb) {
      _jquery["default"].post('/api/getUserInfo', {
        token: getCookie('token')
      }, function (res, err) {
        if ([-1, -2, -9].indexOf(res.code) !== -1) cb('');
        if (res.code === 0) cb(res.data);
      });
    }
  }, {
    key: "afterInit",
    value: function afterInit() {
      console.log('init');
    }
  }]);

  return Header;
}();

var _default = Header;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
