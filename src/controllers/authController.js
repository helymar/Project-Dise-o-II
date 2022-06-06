const http=require("http");
var XMLHttpRequest = require('xhr2');

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

controller.createBankForm = (req, res) => {
    res.render('form2');
};

controller.createBank = (req, res) => {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/payment/banks");

    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");

    let data = req.body;
    xhr.send(JSON.stringify(data));
    xhr.onload = function () {
        let response = JSON.parse(xhr.responseText);
        console.log(response);
        if (xhr.status != 201) {
            req.flash('message', 'El Banco no pudo ser creado');
            res.redirect('/createBank');
        }else{
            req.flash('success', 'Banco: '+response.data.name+' fue creado correctamente');
            res.redirect('/createBank');
        }
        
    };
    
};

controller.getBalanceForm = (req, res) => {
    res.render('form3');
};

controller.getBalance = (req, res) => {
    const data = req.body;
    let url = "http://localhost:8080/payment/cards/"+data.card_number+"/balance";
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.send();
    xhr.onload = function () {
        let response = JSON.parse(xhr.responseText);
        console.log(response);
    
        if (xhr.status != 200) {
            req.flash('message', 'No se pudo obtener el balance de la tarjeta, verifique que el numero de la tarjeta este ingresado correctamente');
            res.redirect('/getBalance');
        }else{
            req.flash('success', 'El balance de la tarjeta es: '+response.data);
            res.redirect('/getBalance');
        }
        
    };
    
};

controller.deletebankForm = (req, res) => {
    var url="http://localhost:8080/payment/banks";
    var req = http.request(url,resp=>{
      resp.on('data', (chunk) => {
        var banks = JSON.parse(chunk);
        res.render('DelebankForm', {
            banks: banks.data
        });
      });
    });
    req.end();
    
};

controller.deletebank = (req, res) => {
    const data = req.body;
    let url = "http://localhost:8080/payment/banks/"+data.bankId;
    let xhr = new XMLHttpRequest();
    xhr.open("DELETE", url);
    xhr.send();
    xhr.onload = function () {
        let response = JSON.parse(xhr.responseText);
        console.log(response);
    
        if (xhr.status != 200) {
            req.flash('message', 'No se pudo eliminar el banco');
            res.redirect('/deleteBank');
        }else{
            req.flash('success', 'El banco: '+response.data.name+' fue eliminado correctamente');
            res.redirect('/deleteBank');
        }
        
    };
    
};
module.exports = controller;
