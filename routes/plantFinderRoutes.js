const express = require('express');
const router = express.Router();
const controller = require('../Controllers/plantFinderController');

router.post('/recommend', controller.recommend);
router.post('/space', controller.space);
router.post('/compatibility', controller.compatibility);

module.exports = router;