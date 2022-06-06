const http=require("http");
var XMLHttpRequest = require('xhr2');
const baseurl = require('../lib/varible.js');
const controller = {};

controller.login = (req, res) => {
    res.render('login',);
};

controller.signup = (req, res) => {
    var url=baseurl+"/payment/banks";
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

controller.createBankForm = (req, res) => {
    res.render('createBank');
};

controller.createBank = (req, res) => {
    let xhr = new XMLHttpRequest();
    var url=baseurl+"/payment/banks";
    xhr.open("POST", url);

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
    res.render('getBalanceCard');
};

controller.getBalance = (req, res) => {
    const data = req.body;
    var url=baseurl+"/payment/cards/"+data.card_number+"/balance";
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
    var url=baseurl+"/payment/banks";
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
controller.createCardForm = (req, res) => {
    var url=baseurl+"/payment/banks";
    var req = http.request(url,resp=>{
      resp.on('data', (chunk) => {
        var banks = JSON.parse(chunk);
        res.render('createCard', {
            banks: banks.data
        });
      });
    });
    req.end();
};

controller.createCard = (req, res) => {
    var url=baseurl+"/payment/cards";

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url);

    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");

    let data = req.body;
    xhr.send(JSON.stringify(data));
    xhr.onload = function () {
        let response = JSON.parse(xhr.responseText);
        console.log(response);
        if (xhr.status != 201) {
            req.flash('message', 'No se pudo crear la tarjeta');
            res.redirect('/createCard');
        }else{
            req.flash('success', 'La tarjeta se ha creado exitosamente, su numero es: '+response.data.id);
            res.redirect('/createCard');
        }
        
    };
    
};

controller.deletebankForm = (req, res) => {
    var url=baseurl+"/payment/banks";
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
    var url=baseurl+"/payment/banks/"+data.bankId;
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

controller.updateBankForm = (req, res) => {

    var url=baseurl+"/payment/banks";
    var req = http.request(url,resp=>{
      resp.on('data', (chunk) => {
        var banks = JSON.parse(chunk);
        res.render('updateBank', {
            banks: banks.data
        });
      });
    });
    req.end();
};


function toBoolean(val){
    var toReturn = false;

    if(val == 'true' || val =='True'){
        toReturn = true;
    }

    return toReturn;
}


controller.updateBank = (req, res) => {
    const data = req.body;
    let xhr = new XMLHttpRequest();
    let url = baseurl+"/payment/banks/"+data.bankId;

    xhr.open("PATCH", url);

    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");

    let dataInsert = {
        name: data.name,
        isBalanceServiceActive: toBoolean(data.isBalanceServiceActive),
        isPaymentServiceActive: toBoolean(data.isPaymentServiceActive)
    };
    xhr.send(JSON.stringify(dataInsert));
    xhr.onload = function () {
        let response = JSON.parse(xhr.responseText);
        console.log(response);
        if (xhr.status != 200) {
            req.flash('message', 'No se pudo actualizar el banco');
            res.redirect('/updateBank');
        }else{
            req.flash('success', 'el banco ha sido actualizado exitosamente');
            res.redirect('/updateBank');
        }
        
    };
    
};

controller.createPaymentForm = (req, res) => {
    var url=baseurl+"/payment/banks";
    var req = http.request(url,resp=>{
      resp.on('data', (chunk) => {
        var banks = JSON.parse(chunk);
        res.render('createPayment', {
            banks: banks.data
        });
      });
    });
    req.end();
    
};


controller.createPayment = (req, res) => {
    var url=baseurl+"/base/payments";

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url);

    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");

    let data = {
        bankId: parseInt(req.body.bankId),
        cardId: parseInt(req.body.cardId),
        creditLapses: parseInt(req.body.creditLapses),
        description: req.body.description,
        email: req.body.email,
        franchise: req.body.franchise,
        location:   req.body.location,
        name: req.body.name,
        ownerId: parseInt(req.body.ownerId),
        total: parseInt(req.body.total),
        type: req.body.type
    };

    xhr.send(JSON.stringify(data));
    xhr.onload = function () {
        let response = JSON.parse(xhr.responseText);
        console.log(response);
        if (xhr.status != 201) {
            req.flash('message', 'No se pudo realizar el pago');
            res.redirect('/createPayment');
        }else{
            if (response.data.transactionStatus!="APPROVED") {
                req.flash('message', 'Pago rechazado');
                res.redirect('/createPayment');
            } else {
                req.flash('success', 'El pago se realizo satisfactoriamente');
                res.redirect('/createPayment');
            }
            
        }
        
    };
};

controller.getAllPayments = (req, res) => {
    var url=baseurl+"/base/payments";
    var req = http.request(url,resp=>{
      resp.on('data', (chunk) => {
        var allPayments = JSON.parse(chunk);
        console.log(allPayments);
        res.render('getAllPayments', {
            allPayments: allPayments.data
        });
      });
    });
    req.end();
    
};
module.exports = controller;
