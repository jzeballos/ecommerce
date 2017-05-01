var express = require('express');
var session = require('express-session');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

var app = express();

app.use(session({secret: '5f0b7fa7adb96b52ee11fdd9cb08cc3d'}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new FacebookStrategy({
  clientID: '196207837544896',
  clientSecret: '5f0b7fa7adb96b52ee11fdd9cb08cc3d',
  callbackURL: 'http://localhost:3000/auth/facebook/callback'
}, function(token, refreshToken, profile, done) {
  return done(null, profile);
}));

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook',{
  successRedirect: '/me',
  failureRedirect: '/auth/facebook'
}), function(req, res) {
  console.log(req.session);
});

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.get('/me', function(req, res) {
  res.send(req.user);
})

app.listen(3000, function() {
  console.log("It worked");
})
