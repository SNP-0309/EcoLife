const mongoose = require("mongoose");

const scanHistorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    wasteType: {
      type: String,
      required: true,
    },

    confidence: {
      type: Number,
      default: 0,
    },

    recyclingTips: {
      type: String,
      required: true,
    },

    ecoPoints: {
      type: Number,
      default: 10,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ScanHistory", scanHistorySchema);