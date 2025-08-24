const express = require('express');
const router = express.Router();
const { getMobiles, addMobile, recommendMobiles } = require('../controllers/mobileController');

router.get('/', getMobiles);
router.post('/', addMobile);         // admin add
router.post('/recommend', recommendMobiles);  // recommendation API

module.exports = router;
