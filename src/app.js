const express = require("express");
const app = express();
const path = require("path");

const db = require("./db/db");//database
const env = require('./env'); //environment variables
const speech = require("./speech");// responsible for transforming text into audio
const fs = require('fs');// file system
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname));
app.set('view engine', 'ejs');//html render

/**
 * set comment to database
 */
app.post('/post', function(req, res){
  db.insert(req.body.comment_text);
  return res.send();
});

/**
 * return comments from database
 */
app.get('/getcomments', function(req, res){
  db.get_all(res);
;});

 
/**
 * get text frm input and convert it to audio stored in env.audio.file
 */
app.post('/toaudio', function(req, res){
// delete old file
  try {
    fs.unlinkSync(env.audio.file);
      console.log("File is deleted.");
    } catch (error) {
    console.log("old file not exist");
  }
  speech.getAudio(req.body.text);
  res.send(env.audio.file);// return the path of the file in frontend };
});

/**
 * rende the html page index.jes with 'jes view engine'
 */
app.get('/', (req, res) => {
  return res.render("index.ejs");
});
module.exports = app;