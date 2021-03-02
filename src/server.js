const {env} = require("./app/config/config");
const app = require("./app/app");

var server = app.listen(env.port, () => {
    console.log("App escutando na porta http://localhost:"+ env.port + "!");
  });
server.timeout = env.timeout;