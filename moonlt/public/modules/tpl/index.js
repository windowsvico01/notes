"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Header = _interopRequireDefault(require("./Header"));

var _Banner = _interopRequireDefault(require("./Banner"));

var _TextList = _interopRequireDefault(require("./TextList"));

var _NoTpl = _interopRequireDefault(require("./NoTpl"));

var _InfoFlow = _interopRequireDefault(require("./InfoFlow"));

var _Article = _interopRequireDefault(require("./Article"));

var _Footer = _interopRequireDefault(require("./Footer"));

require("./common.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var modules = {
  Header: _Header["default"],
  Banner: _Banner["default"],
  TextList: _TextList["default"],
  NoTpl: _NoTpl["default"],
  InfoFlow: _InfoFlow["default"],
  Article: _Article["default"],
  Footer: _Footer["default"]
};
var _default = modules;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
