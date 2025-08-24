const express = require('express');
const auth = require('../middleware/auth');
const { getMe, addFavorite, removeFavorite, getFavorites } = require('../controllers/userController');

const router = express.Router();
router.get('/me', auth, getMe);
router.get('/favorites', auth, getFavorites);
router.post('/favorites/:mobileId', auth, addFavorite);
router.delete('/favorites/:mobileId', auth, removeFavorite);

module.exports = router;
