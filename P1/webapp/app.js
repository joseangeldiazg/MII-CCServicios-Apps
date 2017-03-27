
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
require('./models');
var path = require('path');

var app = express();

// modulos
var user = require('./controllers/user')

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/layouts');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// rutas
app.use(user);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
