"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/** 弹窗 */
var alertMsg = function alertMsg(text, type, cb) {
  var alertId = new Date().getTime();
  if (!$('#alertCon').length) $('body').prepend('<div style="position:fixed;top:20px;right:20px;z-index:100" id="alertCon">');
  var alertDom = "<div id=\"".concat(alertId, "\" class=\"alert alert-").concat(type || 'primary', " fade show\" style=\"width: 200px;\" role=\"alert\">").concat(text, "</div>");
  $('#alertCon').append(alertDom);
  setTimeout(function () {
    $("#".concat(alertId)).fadeOut();
    if (!$('.alert').length) $('#alertCon').remove();
    cb && cb();
  }, 5000);
};
/*** Api包装 */


var api = /*#__PURE__*/function () {
  function api() {
    _classCallCheck(this, api);

    this.host = '';
  }

  _createClass(api, [{
    key: "get",
    value: function get(url, cb) {
      $.get("".concat(this.host).concat(url), function (res, err) {
        console.log(res);
        return cb && cb(res, err);
      });
    }
  }, {
    key: "post",
    value: function post(url, params, cb) {
      $.post("".concat(this.host).concat(url), params, function (res, err) {
        cb && cb(res, err);
      });
    }
  }]);

  return api;
}();

var Api = new api();
//# sourceMappingURL=common.js.map
