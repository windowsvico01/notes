const Express = require('express');
const router =  Express.Router();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const moment = require('moment');
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '104yangpu',
  port: '3306',                   
  database: 'node',
});

connection.connect();

// 注册
router.post('/register', urlencodedParser, (req, res, next) => {
  if (!req.body.account || !req.body.password) {
    res.send({
      'code': -1,
      'msg': '参数缺失',
    });
    return;
  }
  const addSql = 'INSERT INTO user(uid, username, account, password, create_time) VALUES(0,?,?,?,?)';
  const addSqlParams = ['用户' + req.body.account, req.body.account, req.body.password, moment().format('YYYY-MM-DD HH:mm:ss')];
  connection.query(addSql, addSqlParams, (err, result) => {
    if (err) {
      res.send({
        'code': -1,
        'msg': err.message
      })
      return;
    }
    console.log('INSERT ID:',result); 
    res.send({
      'code': 0,
      'msg': '成功',
      'data': result
    });
  })
})
// 登录
router.post('/login', urlencodedParser, (req, res) => {
  if (req.signedCookies.username) {
    res.send({
      'code': -1,
      'msg': '已经有账户登录',
    })
    return;
  }
  if (!req.body.account || !req.body.password) {
    res.send({
      'code': -1,
      'msg': '参数错误',
    });
    return;
  }
  const sql = `SELECT password, username FROM user WHERE account='${req.body.account}'`;
  connection.query(sql, (err, result) => {
    if (err) {
      res.send({
        'code': -1,
        'msg': err.message
      })
      return;
    }
    if (result[0].password == req.body.password) {
      res.cookie('username', result[0].username, { signed: true });
      res.send({
        'code': 0,
        'msg': '成功',
      });
    } else {
      res.send({
        'code': -1,
        'msg': '密码错误',
      });
    }
  })
})

module.exports = router;
