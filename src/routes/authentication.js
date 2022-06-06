const {Router} = require('express');
const router = Router();
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth')

const authController = require('../controllers/authController');

//Login
router.get('/login', isNotLoggedIn, authController.login);
router.post('/login', isNotLoggedIn, authController.loginUser);

//Signup password
router.get('/signup', isNotLoggedIn, authController.signup);
router.post('/signup', isNotLoggedIn, authController.signupUser);

router.get('/logout', isLoggedIn, authController.logout)





module.exports = router;