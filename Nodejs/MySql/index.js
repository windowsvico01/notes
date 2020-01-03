const mysql = require('mysql');
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '104yangpu',
  port: '3306',                   
  database: 'node',
});

connection.connect();
const sql = 'SELECT * FROM user';
const addSql = 'INSERT INTO user(uid,username) VALUES(0,?)';
const addParams = ['贾刚'];
connection.query(addSql, addParams, (err, res) => {
  if(err){
  console.log('[INSERT ERROR] - ',err.message);
  return;
  }
  console.log('--------------------------INSERT----------------------------');
  //console.log('INSERT ID:',result.insertId);        
  console.log('INSERT ID:',res);        
  console.log('-----------------------------------------------------------------\n\n');
  connection.query(sql, (err, res) => {
    if (err) {
      console.log('[SELECT ERROR] - ',err.message);
      return;
    }
    console.log('--------------------------SELECT----------------------------');
    console.log(res);
    console.log('------------------------------------------------------------\n\n');
  })
})
