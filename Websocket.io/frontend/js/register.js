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
class Page {
  constructor() {
    this.account = '';
    this.username = '';
    this.password = '';
    this.passwordCheck = '';
  }
  init() {
    const _this = this;
    $('#submitBtn').on('click', () => {
      this.account = $('#account').val();
      this.username = $('#username').val();
      this.password = $('#password').val();
      this.passwordCheck = $('#passwordCheck').val();
      if (!this.account || !this.username || !this.password || !this.passwordCheck) {
        alert('请填写完整');
        return;
      }
      const passwordSha1 = sha1(this.password),
            params = {
                account: this.account,
                username: this.username,
                password: passwordSha1,
            };
        $.post('/api/register', params, function(res, err) {
          if (res.code !== 0) {
              console.log('失败'+ err.msg);
              return
          }
          alert('注册且登录成功');
          location.href = '/';
        })
    })
  }
  login() {
    const passwordSha1 = sha1(this.password),
    params = {
        account: this.account,
        password: passwordSha1,
    };
    Api.post('/api/login', params, function(res, err) {
      if (res.code !== 0) {
          console.log('失败'+ err.msg);
          return
      }
      alertMsg('登录成功', 'success', () => {
        alert('哈哈哈哈')
        // location.href = '/';
      })
    }) 
  } 
}
$(function(){
  const tPage = new Page();
  tPage.init();
})