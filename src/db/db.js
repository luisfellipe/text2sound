const config = require("./config");
const mysql = require('mysql2');
const e = require("express");

/**
 * get a coonection from db
 */
function getConnection(){
  if(global.connet) return conn;
  let conn = mysql.createConnection(config);
  conn.connect(
    function(err) {
    if (err){
      console.log("!!! Cannot connect !!! Error: \n" + err);
       return getConnection();
      }
    console.log("database Connected !");
    return conn;
  });
   /**
   * Connection to the MySQL server is usually
   * lost due to either server restart, or a
   * connnection idle timeout (the wait_timeout
   * server variable configures this
   */
  conn.on('error', function(err) {
    console.log('db error', err);
      if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.')
        } else if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.')
            connections.destroy();
        }else if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.');
        }
      } else throw err;                    
  });                                  
  return conn;
}

 /**
  * delete old comments
  */
function deleteSome(){
  const sql = "DELETE FROM comments WHERE id > 0 ORDER BY id ASC LIMIT 13;";
  //let conn = getConnection();
  let conn = getConnection();
  conn.query(sql, function (err, result) {
    if (err){
      console.error(err);
    }
    console.log("records deleted");
    conn.destroy();
  });
  
}
 
/**
 * get all comments from db
 * @param {Response} res 
 */
function get_all(res){
  //let conn = getConnection();
  let conn = getConnection();
  conn.query('SELECT * FROM comments', function(err, results, fields){
    if (err) throw err;
    else{
      var len = results.length;
      if(len > 14){
        deleteSome();
      }
      var rows = [];
      for(var i = 0; i < len; i++){
        var row = JSON.parse(JSON.stringify(results[i]));
        rows.push(row);
      }
      conn.destroy();
      return res.send(rows);
    }
  });
 
}
 /**
  * 
  * @param {string} comment 
  */
function insert(comment){
  const sql =  "INSERT INTO comments (comment_text) VALUES ('"+comment+"');";
  let conn = getConnection();
  conn.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
    conn.destroy();
  });
 }
 //export public db functions
 module.exports = {get_all, insert}