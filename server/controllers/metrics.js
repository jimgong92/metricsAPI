var Metric = require('../models/Metric');
var pgsql = require('../db');
var helpers = require('./helpers');
var cache = require('../cache');

function queryDB(queryObj, res){

}

module.exports = {
  queryDB: queryDB
};