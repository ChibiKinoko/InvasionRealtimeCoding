var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_irc');
// mongoose.connect('mongodb://laure:freiheit@127.0.0.1:27017/my_irc?authSource=admin');

// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   // we're connected!
//   // console.log('MONGOLLLL CONNECTED');
// });

module.exports = mongoose;