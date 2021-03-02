const config = {
    env : {
        port:8082,
        timeout: 600000,
    },
    ibmtts:{
        key: '0jNqE8-l8CWljql4rFa-80GqO6buxXNC81H4-vH4TNEU',
        url: 'https://api.us-south.text-to-speech.watson.cloud.ibm.com/instances/3673787e-7e1f-45e2-beb3-3a01b9fddad9',
        audio : {
            dir: "tts/audio/",
            fileName: "voice"
        },
    },
    dbinfo : {
        user    : "b55cc638e160a7",
        password: "90e79e27",
        database: "heroku_a249664013e9f5c",
        host    : "us-cdbr-east-03.cleardb.com",
        port    : 3306
    }
}
module.exports = config;