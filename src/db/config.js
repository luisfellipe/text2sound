// mysql://b55cc638e160a7:90e79e27@us-cdbr-east-03.cleardb.com/heroku_a249664013e9f5c?reconnect=true
const HOST =  "us-cdbr-east-03.cleardb.com";
const USER =  "b55cc638e160a7";
const PASSWORD = "90e79e27";
const DATA_BASE = "heroku_a249664013e9f5c";
const PORT = 3306;

const config = {
    user    : USER,
    password: PASSWORD,
    database: DATA_BASE,
    host    : HOST,
    port    : PORT
}
module.exports = config;