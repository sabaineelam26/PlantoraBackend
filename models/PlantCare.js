const mongoose = require("mongoose");

//This model stores the plants that a user wants to track.

const plantCareSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    plantName: {
      type: String,
      required: true,
      trim: true,
    },

    lastWatered: {
      type: Date,
    },

    nextWatering: {
      type: Date,
    },

    lastFertilized: {
      type: Date,
    },

    nextFertilizing: {
      type: Date,
    },

    notes: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: ["healthy", "needs-attention", "unhealthy"],
      default: "healthy",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("PlantCare", plantCareSchema);
