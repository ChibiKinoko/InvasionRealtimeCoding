module.exports = function(app) {
	var path = require('path');
	var user = require('../controllers/UserController');

    app.get('/', function(req, res) {
        res.render('login', {name: 'InvasionRealtimeCoding'});
    });

    app.post('/', function(req, res) {
        // res.render('login', {name: 'InvasionRealtimeCoding'});
        // console.log(req.body.username);
        user.create(req, res);
        res.send('<p>OK</p>');

    });

    app.get('/toto', function(req, res) {
        res.send('<p>Toto</p>');
    });
}