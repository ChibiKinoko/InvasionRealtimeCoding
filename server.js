var express = require('express');
var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);

var bodyParser = require('body-parser');


server.listen(3000, function() {
	console.log('Listen on *:8000');
});

//static file use
app.use(express.static(__dirname + '/public'));

// configure body-parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


// routes
require(__dirname + '/app/config/router')(app);




// templating render
app.set('view engine', 'jade')
app.set('views', __dirname + '/app/views');


// server file
require(__dirname + '/app/app')(io);


