class Login {
    account = '';
    password = '';
    constructor() {
      
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
          $.post('/api/login', params, function(res, err) {
            if (res.code !== 0) {
                console.log('失败'+ err.msg);
                return
            }
            // alert('登录成功！');
            location.href = '/';
          })  
      })
    }
  }
  $(function(){
    const tLogin = new Login();
    tLogin.init();
  })