const env = require("./main/env");
const app = require("./main/app");

var server = app.listen(env.port, () => {
    console.log("App escutando na porta http://localhost:"+ env.port + "!");
  });

server.timeout = env.timeout;