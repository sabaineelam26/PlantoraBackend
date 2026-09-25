const express = require('express');
const router = express.Router();
const controller = require('../Controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

router.use(authMiddleware, adminMiddleware);

router.get('/dashboard', controller.getDashboard);
router.get('/users', controller.getUsers);
router.get('/products', controller.getProducts);
router.get('/orders', controller.getOrders);
router.get('/reviews', controller.getReviews);
router.put('/orders/:id/status', controller.updateOrderStatus);
router.put('/products/:id/inventory', controller.updateProductInventory);
router.get('/products/low-stock', controller.getLowStockProducts);

module.exports = router;