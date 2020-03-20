"use strict";

var _tpl = _interopRequireDefault(require("./tpl"));

var _row = _interopRequireDefault(require("./tpl/row.art"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var RenderModules = /*#__PURE__*/function () {
  function RenderModules() {
    _classCallCheck(this, RenderModules);

    this.config = {
      modules: _tpl["default"],
      pageData: [{
        type: 'row',
        template: 'row-full',
        modules: [[{
          type: 'mod',
          template: 'Header'
        }]]
      }, {
        type: 'row',
        template: 'row-600-300',
        modules: [[{
          type: 'mod',
          template: 'Banner'
        }], [{
          type: 'mod',
          template: 'TextList'
        }]]
      }, {
        type: 'row',
        template: 'row-600-300',
        modules: [[{
          type: 'mod',
          template: 'Banner'
        }], [{
          type: 'mod',
          template: 'TextList'
        }]]
      }, {
        type: 'row',
        template: 'row-600-300',
        modules: [[{
          type: 'mod',
          template: 'Banner'
        }], [{
          type: 'mod',
          template: 'TextList'
        }]]
      }, {
        type: 'row',
        template: 'row-600-300',
        modules: [[{
          type: 'mod',
          template: 'Banner'
        }], [{
          type: 'mod',
          template: 'TextList'
        }]]
      }, {
        type: 'row',
        template: 'row-600-300',
        modules: [[{
          type: 'mod',
          template: 'Banner'
        }], [{
          type: 'mod',
          template: 'TextList'
        }]]
      }]
    };
  }

  _createClass(RenderModules, [{
    key: "render",
    value: function render() {
      this.renderRow();
    }
  }, {
    key: "renderRow",
    value: function renderRow() {
      var tHtml = '';
      this.config.pageData.forEach(function (item) {
        tHtml += (0, _row["default"])(item);
      });
      $('#app').html(tHtml);
      this.renderModules();
    }
  }, {
    key: "renderModules",
    value: function renderModules() {
      var moduleWrapper = $('.module-wrapper');

      var _this = this;

      moduleWrapper.length && moduleWrapper.each(function (index, item) {
        var templateType = $(item).attr('template-type') || 'no-template';
        var template = _this.config.modules[templateType] ? new _this.config.modules[templateType]($(item)) : new _this.config.modules['NoTpl']($(item));
        template.init();
      });
    }
  }]);

  return RenderModules;
}();

window.Modules = new RenderModules();
//# sourceMappingURL=index.js.map