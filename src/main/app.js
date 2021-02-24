const path = require("path");
const fs = require('fs');

const express = require("express");
const app = express();

const {modelComment} = require("./db/db");
const env = require('./env'); 
const speech = require("./speech");


const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname));

app.set('view engine', 'ejs');


app.post('/post', function(req, res){
  modelComment.create
  ({comment_text: req.body.comment_text})
  .then( () =>{
    return res.status(200).send("Cometário inserido!");
  })
  .catch( err => {
    console.log(err);
    return res.status(500).send("Erro inesperado: "+ err);
  })
});


app.get('/getcomments', function(req, res){
   modelComment.findAll({
     attributes: ['id', 'comment_text']
   })
  .then(function(comments){
    if(comments.length > 8){
      modelComment.destroy({
        limit: 8,
        order: 'ASC'
      }).then(()=>{
        console.log("Deletando comentários antigos!")
      })
    }
    res.status(200).json(comments);
  },
  function(err){
    res.status(500).send(err);
  });
;});

 
app.post('/ouvir', function(req, res){
  speech.speak(req.body.text, req);
});


app.get('/', (req, res) => {
  return res.render('index.ejs')
});

module.exports = app;