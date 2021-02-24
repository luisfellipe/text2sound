const config = require("./config");
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
  config.database, 
  config.user,
  config.password,
  { 
    host: config.host, 
    dialect:'mysql',
    pool: {
      max: 5,
      min: 0 
  }
  });

const modelComment = sequelize.define('comments', {
  comment_text: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notNull: { msg: "Campo de comentários não pode estar vazio ..." },
    }
  },
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
});

  sequelize.sync({force: false})
  .then(() => {
    console.log(`Banco de Dados ${config.database} ativo!`);
  })

 module.exports = {modelComment}