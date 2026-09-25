const express = require('express');
const router = express.Router();
const controller = require('../Controllers/reviewController');
const authMiddleware = require('../middleware/authMiddleware');

// Note: In index.js this is mounted on /api/reviews but some endpoints 
// might need to be /api/products/:productId/reviews
// I'll define update/delete here, and create/get logic will be adjusted if needed in app.js
// Wait, prompt says: 
// POST /api/products/:productId/reviews
// GET /api/products/:productId/reviews
// PUT /api/reviews/:id
// DELETE /api/reviews/:id

router.put('/:id', authMiddleware, controller.updateReview);
router.delete('/:id', authMiddleware, controller.deleteReview);

module.exports = router;