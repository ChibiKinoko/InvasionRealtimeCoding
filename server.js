var express = require('express');
var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);
var cookieparser = require("cookieparser");
var flash = require('express-flash');
var session = require('express-session');
var bodyParser = require('body-parser');

var mongoose = require(__dirname + '/app/config/db.js');
var passport = require('passport');

// configuration ===============================================================

// templating render
app.set('view engine', 'jade')
app.set('views', __dirname + '/app/views');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({
  secret: 'Invasion of Cats',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());

// routes ======================================================================

require(__dirname + '/app/config/router')(app, passport);
// server file
require(__dirname + '/app/app')(io);

// launch ======================================================================
server.listen(3000, function() {
	console.log('The magic happens on port 3000');
});
