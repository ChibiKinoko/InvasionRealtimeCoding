// SOCKET IO =======================================================================
var server = require('http').Server(app);
var io = require('socket.io')(server);

// var user = require('controllers/UserController');

var connect = require('./config/passport');

module.exports = function() {
    io.on('connection', function(socket) {


        socket.emit('news', { hello: 'world' });
        socket.on('my other event', function(data) {
            // console.log(data);
        });
    });

    console.log(connect.getUsername);


}


exports.connexion = function() {

}
