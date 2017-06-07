module.exports = function(app, passport) {
    var path = require('path');
    var user = require('../controllers/UserController');
    var bodyParser = require('body-parser');
	var flash = require('connect-flash');


    require('./strategies/local')(passport);


    app.get('/', function(req, res) {
        res.render('index');
    });

    app.get('/login', function(req, res) {
    	console.log(req.flash('loginMessage'));
        res.render('login2', {message: req.flash('loginMessage')});
    })

    app.get('/register', function(req, res) {
        res.render('register', {message: req.flash('signupMessage')});
    });

    app.post('/login', passport.authenticate('login', {
        successRedirect: '/home',
        failureRedirect: '/login',
        failureFlash: true
    }));

    app.post('/register', passport.authenticate('signup', {
        successRedirect: '/home',
        failureRedirect: '/register',
        failureFlash: true
    }));

     app.get('/home', function(req, res) {
        res.render('home');
    });


}
