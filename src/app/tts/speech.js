const {fs, sound, path} = require('../config/core');
const {ibmtts} = require('../config/config');

const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

/**
 * textToSpeech 
 * Converte texto em voz usando a api TTS (Text To Speech) do IBM Watson
 */
var textToSpeech = new TextToSpeechV1({
  authenticator: new IamAuthenticator({
    apikey: ibmtts.key,
  }),
  serviceUrl: ibmtts.url,
  disableSslVerification: true,
});

function playSound(filePath){
  sound.play(filePath, (err) => {
    if(err){
      console.log("Impossivel reproduzir aúdio!");
      return res.status(500).send(err);
    } 
  });
}
/**
 * Reproduz o comentário em aúdio
 * @param {string} comment {text, id}: comentário a ser reproduzido 
 * @param {Response} res resposta http
 */
function speak(comment, res){
  var dir = ibmtts.audio.dir;
  var fileName = ibmtts.audio.fileName
  const file = `${dir}${fileName}_${comment.id}_.wav`;
  const filePath = path.join(__dirname, file);
  /**
   * verifica se arquivo já existe e reproduz se verdadeiro
   */
  if(fs.existsSync(filePath)){
    return playSound(filePath);
  }
  var params = {
    text: comment.text,// texto capturado direto da página
    voice: "pt-BR_IsabelaV3Voice",
    accept:'audio/wav'
  };
  textToSpeech.synthesize(params)
    .then(response => {
      const audio = response.result;
      return textToSpeech.repairWavHeaderStream(audio);
    })
    .then(buffer => {
      fs.writeFileSync(filePath, buffer);
      console.log('audio ok! ');
      
    })
    .then(() => {
      playSound(filePath);
    })
    .then(()=>{
      return res.status(200).send("Aúdio reproduzido com sucesso!!");
    })
    .catch(err => {
      console.log(err);
      return res.status(500).send(err);
    });
}
/**
 * Em breve
 * Deleta arquivos de aúdio antigo
 * @param {Number} max máximo de arquivos deletados
 */
function deleteOldWavs(max){
  var list_files = []
  var dir = ibmtts.audio.dir;
  fs.readdir(dir, (err, files) => {
    files.sort((f1, f2) => {
      return f1.localeCompare(f2, navigator.language)
    });
    files.forEach(file => {
      console.log(file);
    });
  });
  console.log("deletando arquivos!!!")
}
module.exports = {speak, deleteOldWavs};