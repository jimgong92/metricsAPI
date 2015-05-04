var Metric = require('../models/Metric');
var pgsql = require('../db');
var helpers = require('./helpers');
var cache = require('../cache');

function queryDB(queryObj, res){
  if (!helpers.isValid(queryObj)) {
    return res.send('Query missing necessary information');
  }
  /**
   * Query database
   */
  Metric.all(helpers.getQuery(queryObj))
    .then(function(results){
      console.log(results);
    });
}


module.exports = {
  queryDB: queryDB
};