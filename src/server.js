const express = require('express');
const path = require('path');
const morgan = require('morgan');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser')

// initializations
const app = express();

// settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares

app.use(flash())
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());



// routes
app.use(require('./routes'));
app.use('/auth',require('./routes/authentication'));

// static files
app.use(express.static(path.join(__dirname, 'public')));


module.exports = app;