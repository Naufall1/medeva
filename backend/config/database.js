// database configuration (sequelize)
const { DB } = require('./app-config');

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  DB.NAME,
  DB.USER,
  DB.PASSWORD,
  {
    host: DB.HOST,
    port: Number(DB.PORT),
    dialect: DB.DIALECT,
    logging: false,
  }
);

module.exports = sequelize;