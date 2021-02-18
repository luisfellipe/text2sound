const env = require("./env");
const app = require("./app");

var server = app.listen(env.port, () => {
    console.log("App escutando na porta http://localhost:"+ env.port + "!");
  });

server.timeout = env.timeout;