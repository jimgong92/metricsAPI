var Metric = require('../models/Metric');
var pgsql = require('../db');
var helpers = require('./helpers');
var cache = require('../cache');

function queryDB(queryObj, res){
  if (!helpers.isValid(queryObj)) {
    res.statusCode = 404;
    return res.send('Query missing necessary information');
  }
  /**
   * Query database
   */
  Metric.all(helpers.getQuery(queryObj))
    .then(function(results){
      handleType(queryObj.type, results, res, queryObj.toCache);
    });
}

function handleType(type, results, res, key){
  var count = getCount(results);
  if (count === 0) {
    var value = JSON.stringify({
      result: 'No entries found.'
    });
    cache.set(key, value);
    return res.send(value);
  }
  res.statusCode = 200;
  switch (type){
    case 'instances':
      var value = JSON.stringify({
        result: getInstances(results)
      });
      cache.set(key, value);
      return res.send(value);
    case 'count':
      var value = JSON.stringify({
        result: count
      });
      cache.set(key, value)
      return res.send(value);
    case 'sum':
      var value = JSON.stringify({
        result: getSum(results)
      });
      cache.set(key, value);
      return res.send(value);
    case 'average':
      var value = JSON.stringify({
        result: getSum(results) / count
      });
      cache.set(key, value);
      return res.send(value);
    default: 
      return res.sendStatus(404);
  }
}
function getInstances(results){
  var instances = [];
  results.forEach(function(row){
    instances.push({
      value: row.value,
      start_date: helpers.convertFromJT(row.start_date),
      duration: row.time_range_length
    });
  });
  return instances;
}
function getCount(results){
  return results.length;
}
function getSum(results){
  var sum = 0;
  results.forEach(function(row){ sum += Number(row.value); });
  return sum;
}

module.exports = {
  queryDB: queryDB
};