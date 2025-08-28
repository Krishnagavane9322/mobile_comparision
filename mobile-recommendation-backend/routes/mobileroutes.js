const express = require('express');
const router = express.Router();
const { getMobiles, getMobileById, addMobile, recommendMobiles } = require('../controllers/mobileController');

console.log('✅ mobileroutes.js loaded');

router.get('/test', (req, res) => {
  console.log('Received request for GET /api/mobiles/test');
  res.send('✅ Mobile routes are working!');
});

router.get('/', getMobiles);
router.get('/:id', getMobileById);
router.post('/', addMobile);
router.post('/recommend', recommendMobiles);

module.exports = router;