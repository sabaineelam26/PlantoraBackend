const Product = require("../models/Product");
const Order = require("../models/Order");

exports.getRecommendations = async (req, res) => {
  try {
    // Simple deterministic recommendations: fetch active products and sort by newly added
    const products = await Product.find({ status: "active" }).sort({ createdAt: -1 }).limit(10);
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};