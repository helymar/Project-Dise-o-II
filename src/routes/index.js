const {Router} = require('express');
const router = Router();

const authController = require('../controllers/authController');

//Login
router.get('/login', authController.login);

//Signup password
router.get('/signup', authController.signup);

router.get('/form1', authController.form1);


router.get('/createBank', authController.createBankForm);
router.post('/createBank', authController.createBank);

router.get('/getBalance', authController.getBalanceForm);
router.post('/getBalance', authController.getBalance);

router.get('/deleteBank', authController.deletebankForm);
router.post('/deleteBank', authController.deletebank);



module.exports = router;