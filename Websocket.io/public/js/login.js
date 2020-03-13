"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Login = /*#__PURE__*/function () {
  function Login() {
    _classCallCheck(this, Login);

    this.account = '';
    this.password = '';
  }

  _createClass(Login, [{
    key: "init",
    value: function init() {
      var _this = this;

      $('#submitBtn').on('click', function () {
        _this.account = $('#account').val();
        _this.password = $('#password').val();

        if (!_this.account || !_this.password) {
          alert('请填写完整');
          return;
        }

        var passwordSha1 = sha1(_this.password),
            params = {
          account: _this.account,
          password: passwordSha1
        };
        Api.post('/api/login', params, function (res, err) {
          if (res.code === 0) location.href = '/';else {
            alertMsg(res.msg, 'danger');
            if (res.code === -1) setTimeout(function () {
              location.href = '/';
            }, 2000);
            return;
          } // alert('登录成功！');
        });
      });
    }
  }]);

  return Login;
}();

$(function () {
  var tLogin = new Login();
  tLogin.init();
});
//# sourceMappingURL=login.js.map
