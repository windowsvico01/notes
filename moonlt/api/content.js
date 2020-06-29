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
  let sql = 'SELECT cid, pid, name, forum, path_key, create_time FROM category';
  if (req.body.pid) {
    sql = `${sql} WHERE pid='${req.body.pid}'`;
  }
  sql = `${sql} ORDER BY create_time ASC`;
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
 * 获取同级类目
 * @param {string} key - require - '要获取的板块key' - null全部
 */
router.post('/getLevelCategory', urlencodedParser, (req, res) => {
  const { key } = req.body;
  let InfoSql = `SELECT cid, pid FROM category WHERE path_key='${key}'`;
  db.query(InfoSql, '', (err, categoryInfo) => {
    if (err) {
      res.send({
        'code': -1,
        'msg': err.message
      })
      return;
    }
    const tPid = categoryInfo[0].pid;
    const tCid = categoryInfo[0].cid;
    if (tPid * 1 === 0) { // 查询key是根类目获取他的子类目
      const sql = `SELECT cid, path_key, pid, name, forum FROM category WHERE pid='${tCid}' ORDER BY create_time ASC`;
      db.query(sql, '', (errcate, category) => {
        if (errcate) {
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
            active_cid: tCid,
            active_key: key,
            root_key: key,
            is_root: true,
          },
          msg: '获取类目列表成功',
        })
      })
    } else {
      const sParentInfo = `SELECT cid, pid, path_key FROM category WHERE cid='${tPid}'`;
      db.query(sParentInfo, '', (err, pCategoryInfo) => {
        if (err) {
          res.send({
            'code': -1,
            'msg': err.message
          })
          return;
        }
        const parentKey = pCategoryInfo[0].path_key;
        const sql = `SELECT cid, path_key, pid, name, forum FROM category WHERE pid='${tPid}' ORDER BY create_time ASC`;
        db.query(sql, '', (errcate, category) => {
          if (errcate) {
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
              active_cid: tCid,
              active_key: key,
              root_key: parentKey,
              is_root: tPid * 1 === 0, // 是否为首页
            },
            msg: '获取类目列表成功',
          })
        })

      })
    }    
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
  let sql = `SELECT cid, pid, name, forum, create_time FROM category WHERE cid='${cid}' ORDER BY create_time ASC`;
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
  const addSql = 'INSERT INTO category(cid, pid, path_key, name, create_time) VALUES(0,?,?,?,?)';
  if (!params.pid) params.pid = '0';
  const addSqlParams = [params.pid, params.path_key, params.name, moment().format('YYYY-MM-DD HH:mm:ss')];
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
 * @param {string} forum - nullable - '类目下属板块'
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
router.post('/getForum', urlencodedParser, async (req, res) => {
  const { cid, fid, name, page = 1, limit = 20, sort_by = 'create_time ASC', key = '' } = req.body;
  const getCidByKey = () => {
    const getCidSql = `SELECT cid FROM category WHERE path_key='${key}'`;
    return new Promise(resolve => {
      db.query(getCidSql, '', (err, category) => {
        if (err) {
          resolve('');
        }
        console.log(category[0].cid)
        resolve(category[0].cid)
      })
    })
    // setTimeout(() => {return new Promise(resolve => )12}, 123);
    
  }
  let sql = 'SELECT fid, cid, category_name, members, news_count, read_count, name, cover, hot, color, page_data, modules, create_time FROM forum';
  let tCid = cid;
  if(key) tCid = await getCidByKey();
  const tParams = { cid: tCid + '', fid, name, page, limit };
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
  sql = `${sql}${searchSql} ORDER BY ${sort_by} LIMIT ${(page - 1) * limit},${limit};`;
  db.query(sql, '', (err, forum) => {
    if (err) {
      res.send({
        'code': -1,
        'msg': err.message
      })
      return;
    }
    const CountSql = `SELECT COUNT(*) AS total FROM forum${searchSql}`;
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
          forum,
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
 * 获取板块详情
 * @param {string} fid - required - '板块fid'
 */
router.post('/getForumInfo', urlencodedParser, (req, res) => {
  const { fid } = req.body;
  let sql = `SELECT * FROM forum WHERE fid='${fid}'`;
  db.query(sql, '', (err, forumInfo) => {
    if (err) {
      res.send({
        'code': -1,
        'msg': err.message
      })
      return;
    }
    if (forumInfo && !!forumInfo.length) {
      res.send({
        code: 0,
        data: forumInfo[0],
        msg: '获取板块详情成功!',
      })
    } else {
      res.send({
        'code': -2,
        'msg': '查无此板块',
      })
      return;
    }
  })
})
/**
 * 新建板块
 * @param {string} token - require - 'token'
 * @param {string} cid - require - '所属类目的cid' - 默认: 0
 * @param {string} name - require - '板块名称'
 * 
 */
router.post('/addForum', urlencodedParser, (req, res, next) => {
  const params = req.body;
  const { token, name, cid, cover = '', hot = 0, summary = '', color = '' } = params;
  if (!req.cookies.token && !token) {
    res.send({
      'code': -9,
      'msg': '用户未登录',
    });
    return;
  }
  if (!name || !cid) {
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
    const creatorName = user[0].username;
    const creatorUid = user[0].uid;
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
      const addSql = 'INSERT INTO forum(fid, cid, category_name, name, cover, color,  hot, summary, managers, manager_names, creator, creator_name, create_time) VALUES(0,?,?,?,?,?,?,?,?,?,?,?,?)';
      const addSqlParams = [cid, c_name, name, cover, color, hot, summary, creatorUid, creatorName, creatorUid, creatorName, moment().format('YYYY-MM-DD HH:mm:ss')];
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
})
/**
 * 编辑板块
 * @param {string} token - require - 'token'
 * @param {string} cid - require - '所属类目的cid' - 默认: 0
 * @param {string} name - require - '板块名称'
 * @param {string} summary - nullable - '板块简介'
 * @param {string} cover - nullable - '板块封面'
 */
router.post('/updateForum', urlencodedParser, (req, res, next) => {
  const params = req.body;
  if (!req.cookies.token && !params.token) {
    res.send({
      'code': -9,
      'msg': '用户未登录',
    });
    return;
  }
  if (!params.fid) {
    res.send({
      'code': -1,
      'msg': '参数缺失',
    });
    return;
  }
  const getUpdateSql = () => {
    let tSql = 'UPDATE forum SET';
    const keys = Object.keys(params);
    const tKeys = [];
    keys.forEach((key) => {
      if (['token', 'fid'].indexOf(key) === -1) tKeys.push(key);
    })
    tKeys.forEach((key, index) => {
      tSql =  `${tSql} ${key}='${params[key]}'${index === (tKeys.length - 1) ? '' : ','}`;
    })
    tSql = `${tSql} WHERE fid=${params.fid}`;
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
 * 发布稿件
 * @param {string} token - require - 'token'
 * @param {string} type - require - '稿件类型' - 1 图文 2 图集 3 视频
 * @param {string} cid - require - '所属类目'
 * @param {string} forum - nullable - '所属板块'
 * @param {string} title - require - '标题'
 * @param {string} summary - require - '简介'
 * @param {string} content - require - '正文'
 */
router.post('/publishDraft', urlencodedParser, (req, res, next) => {
  const { token, type, cid, forum, title, summary, content, cover } = req.body;
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
    const searchCidSql = `SELECT name, cid, pid FROM category WHERE cid='${cid}'`;
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
      if (forum) { // 选择板块
        const searchForumSql = `SELECT name, fid FROM forum WHERE id in (${forum})`;
        db.query(searchForumSql, '', (errSearch, forumRes) => {
          if (errSearch) {
            res.send({
              'code': -1,
              'msg': errSearch.message
            })
            return;
          }
          const forumName = [];
          forumRes && forumRes.length && forumRes.forEach((item) => {
            forumName.push(item.name);
          })
          const articleId = sha1(JSON.stringify({
            create_time: moment(),
            cid,
            forum,
          }));
          const addSql = 'INSERT INTO article(article_id, type, cid, category_name, forum, forum_name, author, author_name, title, summary, content, cover, create_time) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)';
          const addSqlParams = [`article_${articleId}`, type, cid, categoryName.join(','), forum, forumName.join(','), authorUid, authorName, title, summary, content, cover, moment().format('YYYY-MM-DD HH:mm:ss')];
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
        const articleId = sha1(JSON.stringify({
          create_time: moment(),
          cid,
          forum,
        }));
        const addSql = 'INSERT INTO article(article_id, type, cid, category_name, forum, forum_name, author, author_name, title, summary, content, cover, create_time) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)';
        const addSqlParams = [`article_${articleId}`, type, cid, categoryName.join(','), '', '', authorUid, authorName, title, summary, content, cover, moment().format('YYYY-MM-DD HH:mm:ss')];
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
 * @param {string} forum - nullable - '所属板块' - null全部
 * @param {string} author_name - nullable - '作者名字' - null全部
 * @param {string} page - nullable - '页码'
 * @param {string} limit - nullable - '每页展示多少条'
 */
router.post('/getDraftList', urlencodedParser, (req, res) => {
  const { article_id, title, cid, forum, author_name, page = 1, limit = 20 } = req.body;
  let sql = 'SELECT article_id, type, cid, category_name, forum, forum_name, author, author_name, title, summary, content, cover, read_count, thumbs_count, comments, create_time FROM article';
  const pParams = { title, cid, forum, author_name, page, limit, article_id };
  const getDraft = (tParams) => {
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
    sql = `${sql}${searchSql} ORDER BY create_time DESC LIMIT ${(page - 1) * limit},${limit};`;
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
  }
  //查询该cid有关联的cid
  if (pParams.cid) {
    const cidSql = `SELECT cid FROM category WHERE pid='${cid}'`;
    db.query(cidSql, '', (err, cidList) => {
      if (err) {
        res.send({
          'code': -1,
          'msg': err.message
        })
        return;
      }
      let childCids = '';
      if (cidList && cidList.length) {
        cidList.forEach((c, i) => {
          if (i === 0) childCids = c.cid;
          else childCids = `${childCids},${c.cid}`;
        })
      }
      if (childCids) {
        pParams.cid = `${pParams.cid},${childCids}`;      
      }
      getDraft(pParams)
    })
  } else {
    getDraft(pParams);
  }
})
/**
 * 获取新闻列表(如果通过cid查询，则查询该cid以及cid下所有子cid的新闻)
 * @param {string} title - nullable - '文章标题' - null全部
 * @param {string} cid - nullable - '板块所属类目id' - null全部
 * @param {string} forum - nullable - '所属板块' - null全部
 * @param {string} author_name - nullable - '作者名字' - null全部
 * @param {string} page - nullable - '页码'
 * @param {string} limit - nullable - '每页展示多少条'
 */
router.post('/getCategoryDraft', urlencodedParser, (req, res) => {
  const { title, cid, forum, author_name, page = 1, limit = 20 } = req.body;
  let sql = 'SELECT article_id, type, cid, category_name, forum, forum_name, author, author_name, title, summary, content, cover, read_count, thumbs_count, comments, create_time FROM article';
  const tParams = { title, cid, pid: cid, forum, author_name, page, limit };
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
/**
 * 获取新闻详情
 * @param {string} article_id - required - '文章id' - null全部
 */
router.post('/getDraftInfo', urlencodedParser, (req, res) => {
  const { article_id } = req.body;
  if (!article_id) {
    res.send({
      'code': -1,
      'msg': '参数缺失',
    })
    return;
  }
  let sql = `SELECT article_id, type, cid, category_name, forum, forum_name, author, author_name, title, summary, content, cover, read_count, thumbs_count, comments, create_time FROM article WHERE article_id='${article_id}'`;
  db.query(sql, '', (err, articleInfo) => {
    if (err) {
      res.send({
        'code': -1,
        'msg': err.message
      })
      return;
    }
    if (articleInfo && !!articleInfo.length) {
      res.send({
        code: 0,
        data: articleInfo[0],
        msg: '获取文章详情成功!',
      })
    } else {
      res.send({
        'code': -2,
        'msg': '查无此文章',
      })
      return;
    }
    
  })
})
module.exports = router;
