const express = require('express');
const router = express.Router();
const controller = require('../Controllers/wishlistController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);
router.get('/', controller.getWishlist);
router.post('/:productId', controller.addToWishlist);
router.delete('/:productId', controller.removeFromWishlist);

module.exports = router;