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

      //If route exists, send cached response
      if (doesExist){
        res.statusCode = 200;
        return cache.get(queryString, function(value){
          res.send(value);
        });
      }

      //If route incomplete, send back 404
      if (queryString.length < MIN_QUERY_LENGTH) return res.sendStatus(404);
      var args = queryString.split('/');
      if (args.length < 3) return res.sendStatus(404);
      
      var filters = args[2].split('&');
      var queryObj = {
        metric_id: args[0],
        type: args[1],
        filters: filters,
        toCache: queryString
      };
      metricsController.queryDB(queryObj, res);
    });
  });
}

module.exports = router;