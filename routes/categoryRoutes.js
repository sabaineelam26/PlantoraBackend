const express = require("express");
const router = express.Router();
const { createCategory, getCategories, getCategory, updateCategory, deleteCategory } = require("../Controllers/categoryController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.post("/", authMiddleware, adminMiddleware, createCategory);
router.get("/", getCategories);
router.get("/:id", getCategory);
router.put("/:id", authMiddleware, adminMiddleware, updateCategory);
router.delete("/:id", authMiddleware, adminMiddleware, deleteCategory);

module.exports = router;
