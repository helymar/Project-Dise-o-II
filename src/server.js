const express = require('express');
const path = require('path');
const morgan = require('morgan');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser')
const session = require('express-session');

// initializations
const app = express();

// settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares
app.use(cookieParser());
app.use(session({
    secret: 'Dasboard-secret',
    resave: true,
    saveUninitialized: true,
    cookie:{maxAge:3600000} //1 hora: 3600000
}));

app.use(flash())
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
 //Global variables

app.use((req, res, next) =>{
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    next();
});

function handleErrors(err, req, res, next) {
    console.log(err);
    req.flash('message', err.message);
    res.redirect('/');
  };
  
  app.use(handleErrors);

// routes
app.use(require('./routes'));
// static files
app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});

module.exports = app;