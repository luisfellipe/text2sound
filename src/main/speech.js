const fs = require('fs');
const sound = require("play-sound")();
const path = require("path");
const env = require('./env');

const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

// api access key
const key = '0jNqE8-l8CWljql4rFa-80GqO6buxXNC81H4-vH4TNEU';
// api acess url
const url = 'https://api.us-south.text-to-speech.watson.cloud.ibm.com/instances/3673787e-7e1f-45e2-beb3-3a01b9fddad9';

/**
 * textToSpeech 
 * converts text to voice using the TTS (Text To Speech) api using ibm watson 
 */
var textToSpeech = new TextToSpeechV1({
  authenticator: new IamAuthenticator({
    apikey: key,
  }),
  serviceUrl:url,
  disableSslVerification: true,
});

/**
 * Reproduz o comentário em aúdio
 * @param {string} comment 
 * @param {Response} res 
 */
function speak(comment, res){
  var params = {
    text: comment,// texto capturado direto da página
    voice: "pt-BR_IsabelaV3Voice",
    accept:'audio/wav'
  };
  textToSpeech.synthesize(params)
    .then(response => {
      const audio = response.result;
      return textToSpeech.repairWavHeaderStream(audio);
    })
    .then(buffer => {
      const filePath = path.join(__dirname, env.audio.file);
      fs.writeFileSync(filePath, buffer);
      console.log('audio ok! ');
      
    })
    .then(() => {
      const filePath = path.join(__dirname, env.audio.file);
      sound.play(filePath, (err) => {
        if(err){
          console.log("Impossivel reproduzir aúdio!");
          return res.status(500).send(err);
        } 
      });
    })
    .then(()=>{
      // deleta arquivo de audio apos reprodução
      try {
        fs.unlinkSync(env.audio.file);
        console.log("Arquivo de audio deletado");
      } catch (error) {
        console.log("Nenhum Arquivo para deletar");
      }
      return res.status(200).send("Aúdio reproduzido com sucesso!!");
    })
    .catch(err => {
      console.log(err);
      return res.status(500).send(err);
    });
}

module.exports = {speak};
