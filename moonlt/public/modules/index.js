"use strict";

var _tpl = _interopRequireDefault(require("./tpl"));

var _row = _interopRequireDefault(require("./tpl/row.art"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var RenderModules = /*#__PURE__*/function () {
  function RenderModules(props) {
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
        }, {
          type: 'mod',
          template: 'InfoFlow'
        }], [{
          type: 'mod',
          template: 'TextList'
        }]]
      }],
      lt: {} // location信息

    };
  }

  _createClass(RenderModules, [{
    key: "render",
    value: function render(props) {
      this.config.pageData = props.pageData;
      this.config.lt = props.lt;
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
        var modId = $(item).attr('mod-id');
        var template = _this.config.modules[templateType] ? new _this.config.modules[templateType]($(item)) : new _this.config.modules['NoTpl']($(item));
        var params = {
          category: _this.config.lt.category || '',
          articleId: _this.config.lt.articleId || '',
          modData: _this.findMod(modId) || {}
        };
        template.init(params);
      });
    }
  }, {
    key: "findMod",
    value: function findMod(pModId) {
      // 找到该mod的页面数据
      var pageData = this.config.pageData;
      var finalItem = {};

      var findChild = function findChild(data) {
        data.forEach(function (item) {
          if (item.type && item.type === 'row') {
            findChild(item.modules);
          } else if (Array.isArray(item)) {
            item.forEach(function (item2) {
              if (item2.type && item2.type === 'mod') {
                if (item2.modId === pModId) {
                  finalItem = item2;
                }
              } else {
                findChild(item2);
              }
            });
          }
        });
      };

      findChild(pageData);
      return finalItem;
    }
  }]);

  return RenderModules;
}();

window.Modules = new RenderModules();
//# sourceMappingURL=index.js.map
