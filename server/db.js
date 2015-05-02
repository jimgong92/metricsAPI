var Sequelize = require('sequelize');

var uri = 'postgres://localhost:5432/';
var pgsql = new Sequelize(uri, {
  logging: false
});

module.exports = pgsql;