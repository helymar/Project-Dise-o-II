const passport = require('passport');

const controller = {};

controller.login = (req, res) => {
    res.render('login',);
};

controller.signup = (req, res) => {
    res.render('signup');
};

controller.signupUser = passport.authenticate('local.signup', {
    successRedirect:     '/dashboard',
    failureRedirect:    '/auth/signup',
    failureFlash:         true
});

controller.loginUser = passport.authenticate('local.signin', {
    successRedirect:     '/dashboard',
    failureRedirect:     '/auth/login',
    failureFlash:         true

});

controller.logout = (req, res) => {
    req.logOut();
    res.redirect('/auth/login');
};

  module.exports = controller;
