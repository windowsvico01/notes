const mysql = require('mysql');
const db = {};
db.query = (sqlStr, sqlParams, fn) => {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    // password: '104Yangpu.,',
    // port: '3306',                   
    // database: 'note',
    password: '104yangpu',
    port: '3306',                   
    database: 'node',
  });
  connection.connect(() => {
    // console.log('已连接');
  });
  if (!sqlStr) return;
  connection.query(sqlStr, sqlParams, (err, result) => {
    if (err) {
      console.log(err);
      return
    }
    fn(err, result);
  });
  connection.end((err) => {
    if (err) return;
    // else console.log('连接关闭');
  })
}

module.exports = db;