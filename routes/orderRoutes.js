const express = require('express');
const router = express.Router();
const controller = require('../Controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);
router.post('/', controller.createOrder);
router.get('/', controller.getOrders);
router.get('/:id', controller.getOrder);
router.put('/:id/cancel', controller.cancelOrder);

module.exports = router;