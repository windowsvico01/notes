"use strict";

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
//# sourceMappingURL=alert.js.map
