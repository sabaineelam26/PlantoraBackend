const Product = require("../models/Product");

exports.recommend = async (req, res) => {
  try {
    const { light, space, experience, watering, petFriendly } = req.body;
    let query = { status: "active" };

    if (petFriendly) query.petFriendly = true;
    if (light) query.lightRequirement = light;
    if (watering) query.wateringFrequency = watering;
    
    // Simplistic handling for space and experience
    if (space && typeof query.roomType !== 'undefined') {
      // If roomType is an array in model, maybe $in
      // query.roomType = { $in: [space] };
    }
    
    if (experience === "beginner") {
      query.difficulty = "easy";
    }

    const products = await Product.find(query).limit(10);
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.space = async (req, res) => {
  try {
    const { space } = req.body;
    const products = await Product.find({ status: "active", roomType: space }).limit(10);
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.compatibility = async (req, res) => {
  try {
    // Dummy logic for compatibility scoring
    res.status(200).json({ score: 85, message: "Highly compatible with your environment!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};