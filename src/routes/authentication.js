const {Router} = require('express');
const router = Router();

const authController = require('../controllers/authController');

//Login
router.get('/login', authController.login);

//Signup password
router.get('/signup', authController.signup);

router.get('/form1', authController.form1);

router.get('/form2', authController.form2);

router.get('/form3', authController.form3);




module.exports = router;