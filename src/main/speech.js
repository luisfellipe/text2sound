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

module.exports = {textToSpeech};
