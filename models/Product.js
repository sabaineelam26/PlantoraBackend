const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    discountPrice: {
      type: Number,
      min: 0,
    },

    images: [
      {
        type: String,
      },
    ],

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    size: {
      type: String,
      enum: ["small", "medium", "large"],
    },

    lightRequirement: {
      type: String,
      enum: ["low", "medium", "bright", "direct"],
    },

    wateringFrequency: {
      type: String,
      enum: ["rarely", "weekly", "frequently"],
    },

    difficulty: {
      type: String,
      enum: ["easy", "moderate", "hard"],
    },

    petFriendly: {
      type: Boolean,
      default: false,
    },

    airPurifying: {
      type: Boolean,
      default: false,
    },

    roomType: [
      {
        type: String,
        enum: [
          "bedroom",
          "living-room",
          "office",
          "bathroom",
          "balcony",
          "kitchen",
        ],
      },
    ],

    careInstructions: {
      type: String,
    },

    status: {
      type: String,
      enum: ["active", "inactive", "out-of-stock"],
      default: "active",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Product", productSchema);
