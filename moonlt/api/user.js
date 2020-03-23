const Express = require('express');
const router =  Express.Router();
// const mysql = require('mysql');
const bodyParser = require('body-parser');
const moment = require('moment');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const db = require('./db');
const sha1 = require('js-sha1');
// const Base64 = require('js-base64').Base64;
/**
 * 获取菜单列表
 * @param {string} token - required - '用户token'
 * @param {string} menu_ids - nullable - '要获取的菜单id' - all全部
 */
router.post('/getMenuList', urlencodedParser, (req, res) => {
  const { token, menu_ids: menuIds } = req.body;
  const getMenu = (permission) => {
    let sql = 'SELECT id, pid, label, path, menu_key, icon, show_side, show_bread, route, sort_num FROM menu';
    if (permission !== 'all') {
      sql = `${sql} WHERE id in (${permission})`;
    }
    sql = `${sql} ORDER BY sort_num ASC;`
    db.query(sql, '', (err, menuData) => {
      if (err) {
        res.send({
          'code': -1,
          'msg': err.message
        })
        return;
      }
      res.send({
        code: 0,
        data: menuData,
        msg: '获取菜单成功',
      })
    })
  }
  if (menuIds) {
    getMenu(menuIds);
  } else {
    const tToken = req.cookies.token || token;
    if (!tToken ) {
      res.send({
        'code': -1,
        'msg': 'token缺失',
      })
      return;
    }
    const getUserSql = `SELECT permission FROM user WHERE token='${tToken}'`;
    db.query(getUserSql, '', (err, result) => {
      if (err) {
        res.send({
          'code': -1,
          'msg': err.message
        })
        return;
      }
      const currentTimer = moment().valueOf();
      if (result[0].tk_timer + ( 1000 * 60 * 60 * 24 * 30 ) < currentTimer ) {
        res.send({
          'code': -2,
          'msg': '当前登录状态已过期',
        });
        return;
      }
      const permission = result[0].permission;
      getMenu(permission);
    })
  }
})
/**
 * 添加菜单
 * @param {string} label - required - '菜单名称'
 * @param {string} pid - required - '菜单父级id'
 * @param {string} menu_key - required - '菜单唯一key'
 * @param {string} path - required - '菜单路径'
 * @param {string} icon - nullable - '菜单图标'
 * @param {string} route - nullable - '菜单route'
 * @param {string} sort_num - nullable - '排序'
 */
router.post('/addMenu', urlencodedParser, (req, res, next) => {
  const params = req.body;
  if (!req.cookies.token && !params.token) {
    res.send({
      'code': -9,
      'msg': '用户未登录',
    });
    return;
  }
  if (!params.label || !params.path || !params.menu_key || !params.route) {
    res.send({
      'code': -1,
      'msg': '参数缺失',
    });
    return;
  }
  const addSql = 'INSERT INTO menu(id, pid, label, path, menu_key, icon, show_side, show_bread, route, sort_num) VALUES(0,?,?,?,?,?,?,?,?,?)';
  if (!params.pid) params.pid = '0';
  const addSqlParams = [params.pid, params.label, params.path, params.menu_key, params.icon, params.show_side, params.show_bread, params.route, params.sort_num];
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
    })
  })
})
/**
 * 编辑菜单
 * @param {string} id - required - '菜单id'
 * @param {string} label - nullable - '菜单名称'
 * @param {string} pid - nullable - '菜单父级id'
 * @param {string} menu_key - nullable - '菜单唯一key'
 * @param {string} path - nullable - '菜单路径'
 * @param {string} icon - nullable - '菜单图标'
 * @param {string} route - nullable - '菜单route'
 * @param {string} sort_num - nullable - '排序'
 */
router.post('/updateMenu', urlencodedParser, (req, res, next) => {
  const params = req.body;
  if (!req.cookies.token && !params.token) {
    res.send({
      'code': -9,
      'msg': '用户未登录',
    });
    return;
  }
  if (!params.id) {
    res.send({
      'code': -1,
      'msg': '菜单id必须传',
    });
    return;
  }
  const getUpdateSql = () => {
    let tSql = 'UPDATE menu SET';
    const keys = Object.keys(params);
    const tKeys = [];
    keys.forEach((key) => {
      if (['token', 'id'].indexOf(key) === -1) tKeys.push(key);
    })
    tKeys.forEach((key, index) => {
      tSql =  `${tSql} ${key}='${params[key]}'${index === (tKeys.length - 1) ? '' : ','}`;
    })
    tSql = `${tSql} WHERE id=${params.id}`;
    return tSql;
  }
  
  const updateSql = getUpdateSql();
  db.query(updateSql, '', (err, result) => {
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
    })
  })
})
/**
 * 获取用户列表 getUsers
 * @param {string} token - required - '用户token'
 * @param {string} uid - nullable - '用户id ，分割'
 * @param {string} username - nullable - '用户名称 ，分割'
 * @param {string} gid - nullable - '分组id  ，分割'
 */
router.post('/getUsers', urlencodedParser, (req, res) => {
  const { token, uid, username, gid, page = 1, limit = 20 } = req.body;
  if (!req.cookies.token && !token) {
    res.send({
      'code': -9,
      'msg': '用户未登录',
    });
    return;
  }
  let sql = 'SELECT uid, username, account, head_image, create_time, update_time, tk_timer, permission, gid FROM user';
  const tParams = { uid, username, gid, page, limit };
  const finalKeys = [];
  let searchSql = '';
  Object.keys(tParams).forEach((key, index) => {
    if (tParams[key] && key !== 'page' && key !== 'limit') {
      finalKeys.push(key);        
    }
  })
  finalKeys.forEach((key, index) => {
    let finalParams = '';
    if (tParams[key].indexOf(',') !== -1) {
      const tps = tParams[key].split(',');
      tps.forEach((item, i) => {
        if (i === 0) finalParams = `'${item}'`;
        else finalParams = `${finalParams},'${item}'`;
      })
    } else finalParams = `'${tParams[key]}'`;
    if (index === 0) {
      searchSql = ` WHERE ${key} in (${finalParams})`;
    } else {
      searchSql = `${searchSql} AND ${key} in (${finalParams})`;
    }
  })
  sql = `${sql}${searchSql} ORDER BY create_time ASC LIMIT ${(page - 1) * limit},${limit};`;
  console.log(sql);
  db.query(sql, '', (err, userList) => {
    if (err) {
      res.send({
        'code': -1,
        'msg': err.message
      })
      return;
    }
    const CountSql = `SELECT COUNT(*) AS total FROM user${searchSql}`;
    db.query(CountSql, '', (errTotal, result) => {
      if (errTotal) {
        res.send({
          'code': -1,
          'msg': errTotal.message
        })
        return;
      }
      res.send({
        code: 0,
        data: {
          userList,
          current: page,
          limit,
          total: result[0].total || 0,
        },
        msg: '获取用户列表成功!',
      })
    })
    
  })
})

module.exports = router;
