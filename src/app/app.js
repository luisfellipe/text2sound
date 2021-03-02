const {express, path, fs, bodyParser} = require("./config/core");
const app = express();
const {modelComment} = require("./db/db");
const {speak, deleteOldWavs} = require("./tts/speech");
const ejs = require('ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname));

app.engine('ejs', ejs);
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  return res.renderFile('index.ejs')
});

app.get('/getcomments', function(req, res){
   modelComment.findAll({
     attributes: ['id', 'text']
   })
  .then(function(comments){
    if(Object.keys(comments).length > 8){
      modelComment.destroy({
        limit:8,
        order: 'ASC'
      }).then(()=>{
        deleteOldWavs(8);
        console.log("Deletando comentário antigo!")
      })
    }
    console.log(comments);
    return res.status(200).json(comments);
  },
  function(err){
    return res.status(500).send(err);
  });
;});

app.post('/post', function(req, res){
  modelComment.create
  ({text: req.body.text})
  .then( () =>{
    return res.status(201).send("Cometário inserido!");
  })
  .catch( err => {
    console.log(err);
    return res.status(500).send(err);
  })
});

app.post('/ouvir', function(req, res){
  speak(req.body, req);
});
module.exports = app;