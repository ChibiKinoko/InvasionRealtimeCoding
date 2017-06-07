module.exports = function(app, passport) {
    var path = require('path');
    var user = require('../controllers/UserController');

    var bodyParser = require('body-parser');


    app.get('/', function(req, res) {
        res.render('home');
    });

    app.get('/login', function(req, res) {
        res.render('login2');
    })

    // app.post('/login', function(req, res) {
    //     // res.render('login', {name: 'InvasionRealtimeCoding'});
    //     user.login(req, res);
    //     // res.send('<p>OK</p>');

    // });

    app.post('/login',
        passport.authenticate('local'),
        function(req, res) {
            // If this function gets called, authentication was successful.
            // `req.user` contains the authenticated user.
            res.redirect('/users/' + req.user.username);
        });


    app.get('/register', function(req, res) {
        res.render('register');
    });
    app.post('/register', function(req, res) {
        user.register(req, res);
    });
}
