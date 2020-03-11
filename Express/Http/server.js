const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


const api = require('./api/index.js');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(cookieParser('123456'));
app.use('/public', express.static('public'));
app.use('/api', api);

app.get('/index', (req, res) => {
    res.sendFile(__dirname + '/' + 'index.html');
})

app.get('/process_get', (req, res) => {
    //输出JSON格式
    const response = {
        'first_name': req.query.first_name,
        'last_name': req.query.last_name
    };
    console.log(response);
    res.end(JSON.stringify(response));
})
app.post('/process_post', urlencodedParser, (req, res) => {
    //输出JSON格式
    const response = {
        'first_name': req.body.first_name,
        'last_name': req.body.last_name
    };
    console.log(response);
    res.end(JSON.stringify(response));
})

const server = app.listen(8081, () => {
    const host = server.address().address;
    const port = server.address().port;

    console.log('地址为http://%s:%s', host, port);
})