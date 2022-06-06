const express = require('express');
const path = require('path');
const morgan = require('morgan');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLstore = require('express-mysql-session');
const cookieParser = require('cookie-parser')

const { database } = require('./keys');
// initializations
const app = express();
require('./lib/passport');

// settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares
app.use(session({
    secret: 'Dasboard-secret',
    resave: true,
    saveUninitialized: true
}));
app.use(flash())
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());



// Global variables
app.use((req, res, next) =>{
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.user = req.user;
    next();
});

// routes
app.use(require('./routes'));
app.use('/auth',require('./routes/authentication'));

// static files
app.use(express.static(path.join(__dirname, 'public')));


module.exports = app;