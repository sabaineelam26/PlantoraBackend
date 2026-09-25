const express = require('express');
const router = express.Router();
const controller = require('../Controllers/myPlantsController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);
router.get('/', controller.getPlants);
router.get('/:id', controller.getPlant);
router.post('/', controller.addPlant);
router.put('/:id', controller.updatePlant);
router.delete('/:id', controller.deletePlant);

module.exports = router;