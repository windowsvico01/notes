class Login {
    constructor() {
      this.account = '';
      this.password = '';
    }
    init() {   
      $('#submitBtn').on('click', () => {
        this.account = $('#account').val();
        this.password = $('#password').val();
        if (!this.account || !this.password) {
          alert('请填写完整');
          return;
        }
        const passwordSha1 = sha1(this.password),
              params = {
                  account: this.account,
                  password: passwordSha1,
              };
          Api.post('/api/login', params, function(res, err) {
            if (res.code === 0) location.href = '/';
            else {
              alertMsg(res.msg, 'danger');
              if (res.code === -1) setTimeout(() => {
                location.href = '/';
              }, 2000)
              return;
            }
            // alert('登录成功！');

          })  
      })
    }
  }
  $(function(){
    const tLogin = new Login();
    tLogin.init();
  })