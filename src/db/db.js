const config = require("./config");
const mysql = require('mysql2');

/**
 * get a coonection from db
 */
function getConnection(){
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
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
      getConnection();                        
    } else throw err;                                  
  });
  return conn;
}

 /**
  * delete old comments
  */
function deleteSome(){
  const sql = "DELETE FROM comments WHERE id > 0 ORDER BY id ASC LIMIT 5;";
  let conn = getConnection();
  conn.query(sql, function (err, result) {
    if (err) throw err;
    console.log("records deleted");
  });
  conn.end();
}
 
/**
 * get all comments from db
 * @param {Response} res 
 */
function get_all(res){
  let conn = getConnection();
  conn.query('SELECT * FROM comments', function(err, results, fields){
    if (err) throw err;
    else{
      var rows = [];
      var len = results.length;
      if(len > 6){
        deleteSome();
      }
      for(var i = 0; i < len; i++){
        var row = JSON.parse(JSON.stringify(results[i]));
        rows.push(row);
      }
      return res.send(rows);
    }
  });
  conn.end(); 
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
  });
  conn.end();
 }
 //export public db functions
 module.exports = {get_all, insert}