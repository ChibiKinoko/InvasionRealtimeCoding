var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/User');

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    done(null, user.id);
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
    process.nextTick(function() {
      User.findOne({ 'email':  email }, function(err, user) {
        if (err)
          return done(err);
        if (user) {
          return done(null, false, req.flash('signupMessage', 'This email is already taken.'));
        } else {
          var newUser = new User();
          newUser.email = email;
          newUser.username = req.body.username;
          newUser.password = newUser.generateHash(password);
          newUser.save(function(err) {
            if (err)
              throw err;
            return done(null, newUser, req.flash('signupMessage', 'Account created ! You can log in here'));
          });
        }
      });
    });
  }));

  passport.use('login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  },
  function(req, email, password, done) {
    User.findOne({ 'email':  email }, function(err, user) {
      if (err)
        return done(err);
      if (!user)
        return done(null, false, req.flash('loginMessage', 'No user found.'));
      if (!user.validPassword(password))
        req.session.user = user;
      return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
      return done(null, user);
    });
  }));

};