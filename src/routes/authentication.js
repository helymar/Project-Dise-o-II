const {Router} = require('express');
const router = Router();

const authController = require('../controllers/authController');

//Login
router.get('/login', authController.login);

//Signup password
router.get('/signup', authController.signup);




module.exports = router;