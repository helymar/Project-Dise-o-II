const passport = require('passport');

const controller = {};

controller.dashboard = (req, res) => {
    res.render('dashboard');
};

  module.exports = controller;