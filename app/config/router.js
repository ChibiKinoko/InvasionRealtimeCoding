module.exports = function(app, passport) {
    var path = require('path');
    var user = require('../controllers/UserController');

    // var bodyParser = require('body-parser');
    // var flash = require('connect-flash');


    // require('./strategies/local')(passport);


    app.get('/', function(req, res) {
        res.render('index.jade');
    });

    app.get('/home', isLoggedIn, function(req, res) {
    	console.log(req.session.passport.user);
        res.render('home.jade');
    });

    app.get('/login', function(req, res) {
        //console.log('ça marche ? : ' + req.flash('loginMessage'));
        //var error = req.flash('loginMessage');
        //console.log(error);
        res.render('login.jade', { message: req.flash('loginMessage') });
    });

    app.get('/register', function(req, res) {
        res.render('register.jade', { message: req.flash('signupMessage') });
    });

    app.post('/login', passport.authenticate('login', {
        successRedirect: '/home',
        failureRedirect: '/login',
        failureFlash: true
    }));

    app.post('/register', passport.authenticate('signup', {
        successRedirect: '/register',
        failureRedirect: '/register',
        failureFlash: true
    }));


    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

}
// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();
    else 
		// if they aren't redirect them to the home page
		// res.end('failed');	
		res.redirect('/');
}
