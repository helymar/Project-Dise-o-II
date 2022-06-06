const http=require("http");


const controller = {};

controller.login = (req, res) => {
    res.render('login',);
};

controller.signup = (req, res) => {
    var url="http://localhost:8080/payment/banks";
    var req = http.request(url,resp=>{
      resp.on('data', (chunk) => {
        var banks = JSON.parse(chunk);
        res.render('signup', {
            banks: banks.data
        });
      });
    });
    req.end();
};

controller.form1 = (req, res) => {
    var url="http://localhost:8080/payment/banks";
    var req = http.request(url,resp=>{
      resp.on('data', (chunk) => {
        var banks = JSON.parse(chunk);
        res.render('form1', {
            banks: banks.data
        });
      });
    });
    req.end();
};

controller.form2 = (req, res) => {
    res.render('form2');
};

controller.form3 = (req, res) => {
    res.render('form3');
};


  module.exports = controller;
