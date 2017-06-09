var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var port = process.env.PORT || 3000;

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var mongoose = require('mongoose');
var flash = require('connect-flash');
var session = require('express-session');

// DATABASE ========================================================================
require('./app/config/db.js');


var app = express();

// SOCKET IO =======================================================================
var server = require('http').Server(app);
var io = require('socket.io')(server);


// CONFIGURATION ===================================================================

app.set('view engine', 'jade');
app.set('views', __dirname + '/app/views');

// app.use(logger('dev')); //log in console
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: 'shhsecret' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


// ROUTE & STRATEGIES ==============================================================

require('./app/config/passport')(passport);
require('./app/config/router')(app, passport);
require('./app/app');


// ERRORS ==========================================================================

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});

app.listen(port);

// module.exports = app;

