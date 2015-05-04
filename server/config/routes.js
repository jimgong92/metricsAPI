var metricsController = require('../controllers/metrics');
var MIN_QUERY_LENGTH = '0/sum/value=0'.length;
var cache = require('../cache');

/**
 * metric_id: Metric being observed
 * type: 'instances' || 'count' || 'sum' || 'average'
 * filter: Array of filters
 */
function router(app){
  app.get('/api/*', function(req, res){
    var queryString = req.params[0];
    cache.contains(queryString, function(doesExist){
      if (doesExist){
        res.statusCode = 200;
        return cache.get(queryString, function(value){
          res.send(value);
        });
      }
      
    });
  });
}

module.exports = router;