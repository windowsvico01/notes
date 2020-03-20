"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// const Page = {
//   account: '',
//   username: '',
//   password: '',
//   passwordCheck: '',
// };
// Page.init = () => {
//   const _this = this;
//   console.log(this);
//   $('#submitBtn').on('click', () => {
//     Page.account = $('#account').val();
//     Page.username = $('#username').val();
//     Page.password = $('#password').val();
//     Page.passwordCheck = $('#passwordCheck').val();
//   })
// }
var Page = /*#__PURE__*/function () {
  function Page() {
    _classCallCheck(this, Page);

    this.account = '';
    this.username = '';
    this.password = '';
    this.passwordCheck = '';
  }

  _createClass(Page, [{
    key: "init",
    value: function init() {
      var _this2 = this;

      var _this = this;

      $('#submitBtn').on('click', function () {
        _this2.account = $('#account').val();
        _this2.username = $('#username').val();
        _this2.password = $('#password').val();
        _this2.passwordCheck = $('#passwordCheck').val();

        if (!_this2.account || !_this2.username || !_this2.password || !_this2.passwordCheck) {
          alert('请填写完整');
          return;
        }

        var passwordSha1 = sha1(_this2.password),
            params = {
          account: _this2.account,
          username: _this2.username,
          password: passwordSha1
        };
        $.post('/api/register', params, function (res, err) {
          if (res.code !== 0) {
            console.log('失败' + err.msg);
            return;
          }

          alert('注册且登录成功');
          location.href = '/';
        });
      });
    }
  }, {
    key: "login",
    value: function login() {
      var passwordSha1 = sha1(this.password),
          params = {
        account: this.account,
        password: passwordSha1
      };
      Api.post('/api/login', params, function (res, err) {
        if (res.code !== 0) {
          console.log('失败' + err.msg);
          return;
        }

        alertMsg('登录成功', 'success', function () {
          alert('哈哈哈哈'); // location.href = '/';
        });
      });
    }
  }]);

  return Page;
}();

$(function () {
  var tPage = new Page();
  tPage.init();
});
//# sourceMappingURL=register.js.map
