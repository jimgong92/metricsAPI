var pg = require('pg');

/**
 * If database is empty, populate
 */
function init(){
  pg.connect(function(err, client, done){
    var query = client.query("SELECT * FROM metrics");
    query.on('end', function(result){
      var isPopulated = result.rowCount;
      if(!isPopulated){
        populate(client);
      }
    });
  });
}

/**
 * Populate DB with CSV data
 */
function populate(sql){
  var columns = [
    "metric_id",
    "start_date",
    "time_range_length",
    "value",
    "last_calculated_at",
    "end_date"
  ];
  var toBaseLen = '/server/controllers'.length;
  var csvPath = '/data/metrics.csv';
  csvPath = __dirname.slice(0, __dirname.length - toBaseLen)  + csvPath;
  var queryString = "COPY metrics (" + columns.join(", ") + ") FROM '" + csvPath + "' DELIMITER ',' CSV HEADER";
  sql.query(queryString);
}

module.exports = {
  init: init
};