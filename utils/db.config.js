const Sequelize = require('sequelize');
const env = require('./env');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: true,

  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  },
  timezone: '+07:00'
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//import model
db.booking_data = require('../models/booking_data')(sequelize, Sequelize);

module.exports = db;
