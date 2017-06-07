var LocalStrategy = require('passport-local').Strategy,
    User = require('mongoose').model('User');

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use('signup', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true,
        },
        function(req, email, password, done) {
            User.findOne({ 'email': email }, function(err, user) {
                if (err)
                    return done(err);
                if (user) {
                    return done(null, false, req.flash('signupMessage', 'That email is already in use.'));
                } else {
                    var newUser = new User();
                    newUser.username = req.body.username;
                    newUser.email = email;
                    newUser.password = newUser.generateHash(password);
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            });
        }
    ));

    passport.use('login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true,
        },
        function(req, email, password, done) {
            // console.log(password);
            User.findOne({ 'email': email }, function(err, user) {
                if (err) {
                    console.log('err');
                    return done(err);
                }
                if (!user) {
                    console.log('no user');
                    return done(null, false, req.flash('loginMessage', 'No user found.'));
                } else {
                    if (!user.validPassword(password)) {
                        // console.log('wrong password');
                        return done(null, false, req.flash('loginMessage', 'Wrong password.'));
                    }
                    console.log('yo');
                    return done(null, user);
                }
            });
        }
    ));
};
