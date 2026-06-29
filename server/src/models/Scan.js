const mongoose = require("mongoose");

const scanSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    imageUrl: {
      type: String,
      required: true,
    },

    public_id: {
      type: String,
      required: true,
    },

    wasteType: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    recyclable: {
      type: Boolean,
      required: true,
    },

    confidence: {
      type: Number,
      required: true,
    },

    ecoScore: {
      type: Number,
      required: true,
    },

    recyclingInstructions: {
      type: String,
      required: true,
    },

    environmentalImpact: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Scan", scanSchema);