const {Router} = require('express');
const router = Router();
const pool = require('../database');
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn, isDocente } =require('../lib/auth')

const dashboardController = require('../controllers/dashboardController');

router.get('/', isLoggedIn, dashboardController.dashboard);

router.get('/dashboard',isLoggedIn,isDocente,  dashboardController.dashboard);

module.exports = router;