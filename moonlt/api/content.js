const Express = require('express');
const router =  Express.Router();
const bodyParser = require('body-parser');
const moment = require('moment');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const db = require('./db');
const sha1 = require('js-sha1');
// const Base64 = require('js-base64').Base64;
/**
 * 获取类目列表
 * @param {string} id - nullable - '要获取的板块id' - null全部
 * @param {string} name - nullable - '要获取的板块名称' - null全部
 */
router.post('/getCategory', urlencodedParser, (req, res) => {
  let sql = 'SELECT cid, pid, name, plate, create_time FROM category ORDER BY create_time ASC';
  db.query(sql, '', (err, category) => {
    if (err) {
      res.send({
        'code': -1,
        'msg': err.message
      })
      return;
    }
    const CountSql = 'SELECT COUNT(*) AS total FROM category';
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
          category,
          total: result[0].total || 0,
        },
        msg: '获取类目列表成功',
      })
    })
  })
})
/**
 * 获取类目详情
 * @param {string} cid - nullable - '要获取的类目cid' - null全部
 */
router.post('/getCategoryInfo', urlencodedParser, (req, res) => {
  const cid = req.body.cid;
  if (!cid) {
    res.send({
      'code': -1,
      'msg': '参数缺失',
    });
    return;
  }
  let sql = `SELECT cid, pid, name, plate, create_time FROM category WHERE cid='${cid}' ORDER BY create_time ASC`;
  db.query(sql, '', (err, category) => {
    if (err) {
      res.send({
        'code': -1,
        'msg': err.message
      })
      return;
    }
    const CountSql = 'SELECT COUNT(*) AS total FROM category';
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
          category: category[0],
          total: result[0].total || 0,
        },
        msg: '获取类目列表成功',
      })
    })
  })
})
/**
 * 新建类目
 * @param {string} token - require - 'token'
 * @param {string} pid - nullable - '父类目的id' - 默认: 0
 * @param {string} name - require - '类目名称'
 */
router.post('/addCategory', urlencodedParser, (req, res, next) => {
  const params = req.body;
  if (!req.cookies.token && !params.token) {
    res.send({
      'code': -9,
      'msg': '用户未登录',
    });
    return;
  }
  if (!params.name) {
    res.send({
      'code': -1,
      'msg': '参数缺失',
    });
    return;
  }
  const addSql = 'INSERT INTO category(cid, pid, name, create_time) VALUES(0,?,?,?)';
  if (!params.pid) params.pid = '0';
  const addSqlParams = [params.pid, params.name, moment().format('YYYY-MM-DD HH:mm:ss')];
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
 * 编辑类目
 * @param {string} token - require - 'token'
 * @param {string} cid - require - '类目的cid' - 默认: 0
 * @param {string} name - nullable - '类目名称'
 * @param {string} plate - nullable - '类目下属板块'
 */
router.post('/updateCategory', urlencodedParser, (req, res, next) => {
  const params = req.body;
  if (!req.cookies.token && !params.token) {
    res.send({
      'code': -9,
      'msg': '用户未登录',
    });
    return;
  }
  if (!params.cid) {
    res.send({
      'code': -1,
      'msg': '类目cid必须传',
    });
    return;
  }
  const getUpdateSql = () => {
    let tSql = 'UPDATE category SET';
    const keys = Object.keys(params);
    const tKeys = [];
    keys.forEach((key) => {
      if (['token', 'cid'].indexOf(key) === -1) tKeys.push(key);
    })
    tKeys.forEach((key, index) => {
      tSql =  `${tSql} ${key}='${params[key]}'${index === (tKeys.length - 1) ? '' : ','}`;
    })
    tSql = `${tSql} WHERE cid=${params.cid}`;
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
 * 获取板块列表
 * @param {string} cid - nullable - '板块所属类目id' - null全部
 * @param {string} id - nullable - '板块所属类目id' - null全部
 * @param {string} name - nullable - '要获取的板块名称' - null全部
 * @param {string} page - nullable - '页码'
 * @param {string} limit - nullable - '每页展示多少条'
 */
router.post('/getPlate', urlencodedParser, (req, res) => {
  const { cid, id, name, page = 1, limit = 20 } = req.body;
  let sql = 'SELECT id, cid, category_name, members, news_count, read_count, name, page_data, modules, create_time FROM plate';
  const tParams = { cid, id, name, page, limit };
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
  db.query(sql, '', (err, plate) => {
    if (err) {
      res.send({
        'code': -1,
        'msg': err.message
      })
      return;
    }
    const CountSql = `SELECT COUNT(*) AS total FROM plate${searchSql}`;
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
          plate,
          current: page,
          limit,
          total: result[0].total || 0,
        },
        msg: '获取板块列表成功!',
      })
    })
    
  })
})
/**
 * 新建板块
 * @param {string} token - require - 'token'
 * @param {string} cid - require - '所属类目的cid' - 默认: 0
 * @param {string} name - require - '板块名称'
 * 
 */
router.post('/addPlate', urlencodedParser, (req, res, next) => {
  const params = req.body;
  if (!req.cookies.token && !params.token) {
    res.send({
      'code': -9,
      'msg': '用户未登录',
    });
    return;
  }
  if (!params.name || !params.cid) {
    res.send({
      'code': -1,
      'msg': '参数缺失',
    });
    return;
  }
  // 查询cid
  const searchSql = `SELECT cid, name FROM category WHERE cid='${params.cid}'`;
  db.query(searchSql, '', (errSearch, result) => {
    if (errSearch) {
      res.send({
        'code': -1,
        'msg': errSearch.message
      })
      return;
    }
    const c_name = result[0].name;
    const addSql = 'INSERT INTO plate(id, cid, category_name, name, create_time) VALUES(0,?,?,?,?)';
    const addSqlParams = [params.cid, c_name, params.name, moment().format('YYYY-MM-DD HH:mm:ss')];
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
})
/**
 * 发布稿件
 * @param {string} token - require - 'token'
 * @param {string} type - require - '稿件类型' - 1 图文 2 图集 3 视频
 * @param {string} cid - require - '所属类目'
 * @param {string} plate - nullable - '所属板块'
 * @param {string} title - require - '标题'
 * @param {string} summary - require - '简介'
 * @param {string} content - require - '正文'
 */
router.post('/publishDraft', urlencodedParser, (req, res, next) => {
  const { token, type, cid, plate, title, summary, content } = req.body;
  if (!req.cookies.token && !token) {
    res.send({
      'code': -9,
      'msg': '用户未登录',
    });
    return;
  }
  if (!type || !cid || !title || !content) {
    res.send({
      'code': -1,
      'msg': '参数缺失',
    });
    return;
  }
  // 查询user
  const searchUserSql = `SELECT uid, username FROM user WHERE token='${token}'`;
  db.query(searchUserSql, '', (errSearch, user) => {
    if (errSearch) {
      res.send({
        'code': -1,
        'msg': errSearch.message
      })
      return;
    }
    const authorName = user[0].username;
    const authorUid = user[0].uid;
    const searchCidSql = `SELECT name, cid FROM category WHERE cid='${cid}'`;
    db.query(searchCidSql, '', (errSearch, category) => {
      if (errSearch) {
        res.send({
          'code': -1,
          'msg': errSearch.message
        })
        return;
      }
      const categoryName = [];
      category && category.length && category.forEach((item) => {
        categoryName.push(item.name);
      })
      if (plate) { // 选择板块
        const searchPlateSql = `SELECT name, id FROM Plate WHERE id in (${plate})`;
        db.query(searchPlateSql, '', (errSearch, plateRes) => {
          if (errSearch) {
            res.send({
              'code': -1,
              'msg': errSearch.message
            })
            return;
          }
          const plateName = [];
          plateRes && plateRes.length && plateRes.forEach((item) => {
            plateName.push(item.name);
          })
          const addSql = 'INSERT INTO article(article_id, type, cid, category_name, plate, plate_name, author, author_name, title, summary, content, create_time) VALUES(0,?,?,?,?,?,?,?,?,?,?,?)';
          const addSqlParams = [type, cid, categoryName.join(','), plate, plateName.join(','), authorUid, authorName, title, summary, content, moment().format('YYYY-MM-DD HH:mm:ss')];
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
      } else { // 没选板块
        const addSql = 'INSERT INTO article(article_id, type, cid, category_name, plate, plate_name, author, author_name, title, summary, content, create_time) VALUES(0,?,?,?,?,?,?,?,?,?,?,?)';
        const addSqlParams = [type, cid, categoryName.join(','), '', '', authorUid, authorName, title, summary, content, moment().format('YYYY-MM-DD HH:mm:ss')];
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
      }
    })
  })
})
/**
 * 获取新闻列表
 * @param {string} title - nullable - '文章标题' - null全部
 * @param {string} cid - nullable - '板块所属类目id' - null全部
 * @param {string} plate - nullable - '所属板块' - null全部
 * @param {string} author_name - nullable - '作者名字' - null全部
 * @param {string} page - nullable - '页码'
 * @param {string} limit - nullable - '每页展示多少条'
 */
router.post('/getDraftList', urlencodedParser, (req, res) => {
  const { title, cid, plate, author_name, page = 1, limit = 20 } = req.body;
  let sql = 'SELECT article_id, type, cid, category_name, plate, plate_name, author, author_name, title, summary, content, cover, read_count, thumbs_count, comments, create_time FROM article';
  const tParams = { title, cid, plate, author_name, page, limit };
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
  db.query(sql, '', (err, articleList) => {
    if (err) {
      res.send({
        'code': -1,
        'msg': err.message
      })
      return;
    }
    const CountSql = `SELECT COUNT(*) AS total FROM article${searchSql}`;
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
          data: articleList,
          current: page,
          limit,
          total: result[0].total || 0,
        },
        msg: '获取文章列表成功!',
      })
    })
    
  })
})
module.exports = router;
