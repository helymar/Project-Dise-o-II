const {Router} = require('express');
const router = Router();

const authController = require('../controllers/authController');

//Login
router.get('/login', authController.login);

//Signup password
router.get('/signup', authController.signup);



router.get('/createBank', authController.createBankForm);
router.post('/createBank', authController.createBank);

router.get('/getBalance', authController.getBalanceForm);
router.post('/getBalance', authController.getBalance);

router.get('/deleteBank', authController.deletebankForm);
router.post('/deleteBank', authController.deletebank);

router.get('/createCard', authController.createCardForm);
router.post('/createCard', authController.createCard);


router.get('/updateBank', authController.updateBankForm);
router.post('/updateBank', authController.updateBank);



module.exports = router;