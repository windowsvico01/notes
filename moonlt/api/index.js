const Express = require('express');
const router =  Express.Router();
// const mysql = require('mysql');
const bodyParser = require('body-parser');
const moment = require('moment');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const db = require('./db');
const sha1 = require('js-sha1');
// const Base64 = require('js-base64').Base64;

// const connection = mysql.createConnection({
//   host: '127.0.0.1',
//   user: 'root',
//   password: '104yangpu',
//   port: '3306',                   
//   database: 'node',
// });

// connection.connect(function(){
//   console.log('已连接');
// });

// 注册
router.post('/register', urlencodedParser, (req, res, next) => {
  if (!req.body.account || !req.body.password) {
    res.send({
      'code': -1,
      'msg': '参数缺失',
    });
    return;
  }
  const currentTimer = moment().valueOf();
  const token = sha1(JSON.stringify({
    startTime: currentTimer,
    endTime: currentTimer + 1000 * 60 * 60 * 24 * 30,
    account: req.body.account,
  }));
  const addSql = 'INSERT INTO user(uid, username, account, password, create_time, token, tk_timer) VALUES(0,?,?,?,?,?,?)';
  const addSqlParams = [req.body.username || '用户' + req.body.account, req.body.account, req.body.password, moment().format('YYYY-MM-DD HH:mm:ss'), token, currentTimer];
  db.query(addSql, addSqlParams, (err, result) => {
    if (err) {
      res.send({
        'code': -1,
        'msg': err.message
      })
      return;
    }
    res.cookie('token', token, { domain: '127.0.0.1' });
    res.cookie('token', token, { domain: '62.234.73.102' });
    res.send({
      'code': 0,
      'msg': '成功',
    })
  })
})
// 登录  // -1 已有用户登录  -2 参数错误 -3 获取数据失败 -4 账号密码错误  -5 系统错误
router.post('/login', urlencodedParser, (req, res) => {
  if (req.cookies.token) {
    res.send({
      'code': -1,
      'msg': '已经有用户登录',
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
  db.query(sql, '', (err, result) => {
    if (err) {
      res.send({
        'code': -3,
        'msg': err.message
      })
      return;
    }
    if (result && result[0] && result[0].password == req.body.password) {
      const currentTimer = moment().valueOf();
      const token = sha1(JSON.stringify({
        startTime: currentTimer,
        endTime: currentTimer + 1000 * 60 * 60 * 24 * 30,
        account: req.body.account,
      }));
      const updateToken = `UPDATE user SET token = ?, tk_timer = ? WHERE account ='${req.body.account}'`;
      const updateParams = [token, currentTimer];
      db.query(updateToken, updateParams, (uErr, uResult) => {
        if (uErr) {
          console.log('插入token失败,[UPDATE ERROR] - ',err.message);
          res.send({
            'code': -5,
            'msg': '系统错误',
          });
          return;
        }
        res.cookie('token', token, { domain: '127.0.0.1' });
        res.cookie('token', token, { domain: '62.234.73.102' });
        res.send({
          'code': 0,
          'msg': '成功',
        });
      })
    } else {
      res.send({
        'code': -4,
        'msg': '账号或密码错误，请重新输入',
      });
    }
  })
})
// 获取用户信息
router.post('/getUserInfo', urlencodedParser, (req, res) => {
  let tToken = req.body.token || req.cookies.token;
  if (!tToken || tToken === 'null') {
    res.send({
      'code': -9,
      'msg': '当前没有用户登录',
    })
    // res.redirect(301, '/login.html');
    return;
  }
  const sql = `SELECT username, account, tk_timer, uid FROM user WHERE token='${tToken}'`;
  db.query(sql, '', (err, result) => {
    if (err) {
      res.send({
        'code': -1,
        'msg': err.message
      })
      return;
    }
    if (!result.length) {
      res.send({
        'code': -1,
        'msg': '当前登录状态已过期，请重新登录',
      })
      return;
    }
    const currentTimer = moment().valueOf();
    if (result[0].tk_timer + ( 1000 * 60 * 60 * 24 * 30 ) < currentTimer ) {
      res.send({
        'code': -2,
        'msg': '当前登录状态已过期',
      });
      // res.redirect('/login.html');
      return;
    }
    res.send({
      'code': 0,
      data: {
        username: result[0].username,
        account: result[0].account,
        uid: result[0].uid,
        permission: result[0].permission,
      },
    })
  })
})
// 新建房间
router.post('/createRoom', urlencodedParser, (req, res, next) => {
  if (!req.body.roomName || !req.body.createUid) {
    res.send({
      'code': -1,
      'msg': '参数缺失',
    });
    return;
  }
  const addSql = 'INSERT INTO rooms(id, name, create_uid, create_time) VALUES(0,?,?,?)';
  const addSqlParams = [req.body.roomName, req.body.createUid, moment().format('YYYY-MM-DD HH:mm:ss')];
  db.query(addSql, addSqlParams, (err, result) => {
    if (err) {
      res.send({
        'code': -1,
        'msg': err.message
      })
      return;
    }
    res.send({
      'code': 0,
      'msg': '成功',
      'data': result
    });
  })
})
// 获取房间列表
router.post('/getRooms', urlencodedParser, (req, res) => {
  const keys = Object.keys(req.body);
  let sql = 'SELECT id, name, record, create_time, create_uid FROM rooms WHERE id!=100000';
  if (keys.length) {
    keys.forEach((key) => {
      sql = `${sql} AND ${key}=${req.body[key]}`;
    })
  }
  db.query(sql, '', (err, result) => {
    if (err) {
      res.send({
        'code': -1,
        'msg': err.message
      })
      return;
    }
    res.send({
      'code': 0,
      data: result,
    })
  })
})
// 获取消息列表
router.post('/getMessages', urlencodedParser, (req, res) => {
  if (!req.body.roomId) {
    console.log('roomId缺失');
    return
  }
  const sql = `SELECT id, msg, target, send_name, send_uid, send_time FROM record WHERE target=${req.body.roomId}`;
  db.query(sql, '', (err, result) => {
    if (err) {
      res.send({
        'code': -1,
        'msg': err.message
      })
      return;
    }
    res.send({
      'code': 0,
      data: result,
    })
  })
})


module.exports = router;
