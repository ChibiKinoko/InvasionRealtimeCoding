// var express = require('express');

// var server = require('http').Server(app);
// var io = require('socket.io')(server);

// var mongoose = require(__dirname + '/app/config/db.js');
// var passport = require('passport');

// var flash = require('connect-flash');
// var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser');
// var session = require('express-session');


// // configuration ===============================================================
// var app = express();

// // templating render
// // app.set('view engine', 'ejs')
// app.set('views', __dirname + '/app/views');
// app.set('view engine', 'jade')

// app.use(express.static(__dirname + '/public'));
// app.use(cookieParser());
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());
// app.use(session({
//   secret: 'Invasion of Cats',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: true }
// }));
// app.use(passport.initialize());
// app.use(passport.session()); // persistent login sessions
// app.use(flash());

// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {},
//   });
// });


// // routes ======================================================================
// require('./app/config/strategies/local')(passport);
// require(__dirname + '/app/config/router')(app, passport);
// // server file
// require(__dirname + '/app/app')(io);

// // launch ======================================================================
// server.listen(3000, function() {
// 	console.log('The magic happens on port 3000');
// });


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

var app = express();
// var routes = require('./routes/index');

var configDB = require('./app/config/db.js');

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

require('./app/config/passport')(passport);
require('./app/config/router')(app, passport);

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});

app.listen(port);

// module.exports = app;

