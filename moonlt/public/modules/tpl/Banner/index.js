"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = _interopRequireDefault(require("./index.art"));

var _swiper = _interopRequireDefault(require("swiper"));

require("./index.css");

require("../../../utils/swiper/swiper.min.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Banner = /*#__PURE__*/function () {
  function Banner(dom) {
    _classCallCheck(this, Banner);

    this.config = {
      dom: dom
    };
  }

  _createClass(Banner, [{
    key: "init",
    value: function init(data) {
      var tHtml = (0, _index["default"])(data);
      this.config.dom.html(tHtml);
      this.afterInit();
    }
  }, {
    key: "afterInit",
    value: function afterInit() {
      this.initSwiper();
    }
  }, {
    key: "initSwiper",
    value: function initSwiper() {
      var mySwiper = new _swiper["default"]('.swiper-container', {
        // direction: 'horizontal', // 垂直切换选项
        loop: true,
        // 循环模式选项
        autoplay: true,
        //可选选项，自动滑动
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination'
        } // // 如果需要前进后退按钮
        // navigation: {
        //   nextEl: '.swiper-button-next',
        //   prevEl: '.swiper-button-prev',
        // },
        // // 如果需要滚动条
        // scrollbar: {
        //   el: '.swiper-scrollbar',
        // },

      });
    }
  }]);

  return Banner;
}();

var _default = Banner;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
