'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(__filename);
//var env       = process.env.NODE_ENV || 'development';
//var config    = require(__dirname + '/../config/config.json')[env];

const heroku = {
  host: process.env.HEROKU_HOST,
  database: process.env.HEROKU_DATABASE,
  username: process.env.HEROKU_USERNAME,
  password: process.env.HEROKU_PASSWORD
};

var db = {};

/*if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}*/

if(heroku.host && heroku.database && heroku.username && heroku.password) {
  var sequelize = new Sequelize(heroku.database, heroku.username, heroku.password, {
    host: heroku.host,
    dialect: "postgres"
  });
} else {
  var sequelize = new Sequelize('apidb', 'postgres', 'postgres', {
    host: "127.0.0.1",
    dialect: "postgres"
  });
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
