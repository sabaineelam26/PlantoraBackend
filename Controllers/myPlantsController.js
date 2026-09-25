const PlantCare = require("../models/PlantCare");

exports.getPlants = async (req, res) => {
  try {
    const plants = await PlantCare.find({ user: req.user._id }).populate("product");
    res.status(200).json(plants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPlant = async (req, res) => {
  try {
    const plant = await PlantCare.findOne({ _id: req.params.id, user: req.user._id }).populate("product");
    if (!plant) return res.status(404).json({ message: "Plant not found" });
    res.status(200).json(plant);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addPlant = async (req, res) => {
  try {
    const plant = await PlantCare.create({ ...req.body, user: req.user._id });
    res.status(201).json(plant);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updatePlant = async (req, res) => {
  try {
    const plant = await PlantCare.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );
    if (!plant) return res.status(404).json({ message: "Plant not found" });
    res.status(200).json(plant);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deletePlant = async (req, res) => {
  try {
    const plant = await PlantCare.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!plant) return res.status(404).json({ message: "Plant not found" });
    res.status(200).json({ message: "Plant deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};