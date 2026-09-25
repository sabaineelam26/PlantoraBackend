const express = require("express");
const router = express.Router();
const { createProduct, getProducts, getProduct, updateProduct, deleteProduct } = require("../Controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const reviewController = require("../Controllers/reviewController");

router.post("/", authMiddleware, adminMiddleware, createProduct);
router.get("/", getProducts);
router.get("/:id", getProduct);
router.put("/:id", authMiddleware, adminMiddleware, updateProduct);
router.delete("/:id", authMiddleware, adminMiddleware, deleteProduct);

// Reviews for a specific product
router.get("/:productId/reviews", reviewController.getReviews);
router.post("/:productId/reviews", authMiddleware, reviewController.createReview);

module.exports = router;
