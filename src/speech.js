const fs = require('fs');
const sound = require("play-sound")();
const path = require("path");
const env = require('./env');

const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

// api access key
const key = '6KLWMIcQh9GzY0TinudmsaqFSEZbr4yOceQzmYENbeJY';
// api acess url
const url = 'https://api.us-south.text-to-speech.watson.cloud.ibm.com/instances/414a992a-6f0f-40b5-8420-b0853f467036';

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
 * receives a comment and returns it as an mp3 audio stream
 * @param {string} comment 
 */
function getAudio(comment){
  
  var params = {
    text: comment,
    voice: "pt-BR_IsabelaV3Voice",
    accept:'audio/wav'
  };
  // synthesizes text in audio
 textToSpeech.synthesize(params)
    .then(response => {
      const audio = response.result;
      return textToSpeech.repairWavHeaderStream(audio);
    })
    .then(buffer => {
      const filePath = path.join(__dirname, env.audio.file);

      // generates file with audio
      fs.writeFileSync(filePath, buffer);
      console.log('audio ok! ');
      
    })
    .then(() => {
      const filePath = path.join(__dirname, env.audio.file);
      console.log(filePath);
      sound.play(filePath, (err) => {
        if(err) console.log("cannot play voice!");
      });
    })
   .catch(err => {
      console.log(err);
    });
}
module.exports = {getAudio};