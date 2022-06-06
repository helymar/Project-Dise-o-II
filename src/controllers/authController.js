const controller = {};

controller.login = (req, res) => {
    res.render('login',);
};

controller.signup = (req, res) => {
    res.render('signup');
};

controller.form1 = (req, res) => {
    res.render('form1');
};

controller.form2 = (req, res) => {
    res.render('form2');
};

controller.form3 = (req, res) => {
    res.render('form3');
};


  module.exports = controller;
