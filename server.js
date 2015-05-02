/**
 * Create Server
 */
var app = require('express')();
/**
 * Configure server
 */
require('./server/index')(app);

app.set('port', process.env.PORT || 8000);
app.listen(app.get('port'), function(){
  console.log("Listening on port %d", app.get('port'));
});
