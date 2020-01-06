const express = require('express');
const app = express();

app.use('/public', express.static('public'));

app.get('/', (req, res) => {
    console.log('主页 GET 请求');
    res.send('Hello GET');
});

// POST 请求
app.post('/', (req, res) => {
    console.log('主页 POST 请求');
    res.send('Hello Post');
})

// del_user 页面响应
app.get('/del_user', (req, res) => {
    console.log('del_user 响应 DELETE 请求');
    res.send('删除页面')
})

app.get('/list_user', (req, res) => {
    console.log('/list_user GET 请求');
    res.send('用户列表页面')
})

app.get('/ab*cd', (req, res) => {
    console.log('/ad*cd GET 请求');
    res.send('正则匹配');
})

const server = app.listen(8081, () => {
    const host = server.address().address;
    const port = server.address().port;

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})