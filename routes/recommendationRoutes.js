const express = require('express');
const router = express.Router();
const controller = require('../Controllers/recommendationController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, controller.getRecommendations);

module.exports = router;