const {dbinfo} = require("../config/config");
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
  dbinfo.database, 
  dbinfo.user,
  dbinfo.password,
  { 
    host: dbinfo.host, 
    dialect:'mysql',
    pool: {
      max: 5,
      min: 1,
  }
});
sequelize.authenticate().then(function(){
  console.log("Banco de dados conectado!");
}).catch(function(err){
  console.log("falha ao conectar com banco de dados");
  throw err;
});
const modelComment = sequelize.define('comments', {
  text: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notNull: { msg: "Comentário vazio ..." },
    }
  },
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
});

sequelize.sync({force: true})
  .then(() => {
    console.log(`Banco de Dados ${dbinfo.database} ativo!`);
})
module.exports = {modelComment}