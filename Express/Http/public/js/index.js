$(function(){
    function handleClick() {
        var account = $('#account'),
            password = $('#password'),
            accountValue = account.val(),
            passwordValue = password.val();
        if (!accountValue || !passwordValue) {
            alert('输入账号密码');
            return
        }
        var passwordSha1 = sha1(passwordValue),
            params = {
                account: accountValue,
                password: passwordSha1,
            };
        $.post('/api/register', params, function(res, err) {
            if (res.code !== 0) {
                console.log('失败'+ err.msg);
                return
            }
            alert('注册成功！');
            account.val('');
            password.val('');
        })  
    }
    $('#submitBtn').on('click', handleClick)
})