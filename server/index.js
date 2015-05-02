var morgan = require('morgan');
var bodyParser = require('body-parser');

function serverConfiguration(app){
  /**
   * Middleware
   */
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  require('./config/routes')(app);
}

module.exports = serverConfiguration;