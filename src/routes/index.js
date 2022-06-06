const {Router} = require('express');
const router = Router();

const dashboardController = require('../controllers/dashboardController');

router.get('/', dashboardController.dashboard);

router.get('/dashboard', dashboardController.dashboard);

module.exports = router;