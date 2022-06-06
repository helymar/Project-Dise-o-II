const controller = {};

controller.login = (req, res) => {
    res.render('login',);
};

controller.signup = (req, res) => {
    res.render('signup');
};


  module.exports = controller;
