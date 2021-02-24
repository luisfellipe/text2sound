const fs = require('fs');
const sound = require("play-sound")();
const path = require("path");
const env = require('./env');

const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

// api access key
const key = '1QbJ2ni3XCPnfZ8q4n-zV3g5iBwXYN2QUKdqVW4TpHuu';
// api acess url
const url = 'https://api.us-south.text-to-speech.watson.cloud.ibm.com/instances/a942a5b4-6bfc-484f-8ea3-7414f501bb80';

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

function speak(comment, res){
  var params = {
    text: comment,// texto capturado direto da pagina
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
        if(err) console.log("cannot play voice!");
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
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
}

module.exports = {speak};
