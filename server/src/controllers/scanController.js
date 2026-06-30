const uploadToCloudinary = require("../services/cloudinaryService");
const analyzeWaste = require("../services/geminiService");
const Scan = require("../models/Scan");
const cloudinary = require("../config/cloudinary");
// @desc    Scan waste image
// @route   POST /api/scan
// @access  Private
exports.scanWaste = async (req, res) => {
  try {
    // Check if image exists
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image.",
      });
    }

    // Upload image to Cloudinary
    const uploadedImage = await uploadToCloudinary(req.file.buffer);

    console.log("Cloudinary URL:", uploadedImage.secure_url);

    // Analyze image using Gemini
    const analysis = await analyzeWaste(uploadedImage.secure_url);

    console.log("Gemini Result:", analysis);

    // Save scan to MongoDB
    const scan = await Scan.create({
      user: req.user.id,

      imageUrl: uploadedImage.secure_url,
      public_id: uploadedImage.public_id,

      wasteType: analysis.wasteType,
      category: analysis.category,
      recyclable: analysis.recyclable,
      confidence: analysis.confidence,
      ecoScore: analysis.ecoScore,
      recyclingInstructions: analysis.recyclingInstructions,
      environmentalImpact: analysis.environmentalImpact,
    });

    // Send response
    res.status(200).json({
      success: true,
      message: "Image analyzed successfully!",
      scan,
    });

  } catch (error) {
    console.error("Scan Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get logged-in user's scan history
// @route   GET /api/history
// @access  Private
exports.getScanHistory = async (req, res) => {
  try {
    const scans = await Scan.find({
      user: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: scans.length,
      scans,
    });

  } catch (error) {
    console.error("History Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.getScanById = async (req, res) => {
  try {
    const scan = await Scan.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!scan) {
      return res.status(404).json({
        success: false,
        message: "Scan not found.",
      });
    }

    res.status(200).json({
      success: true,
      scan,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.deleteScan = async (req, res) => {
  try {
    const scan = await Scan.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!scan) {
      return res.status(404).json({
        success: false,
        message: "Scan not found.",
      });
    }

    // Delete image from Cloudinary
    await cloudinary.uploader.destroy(scan.public_id);

    // Delete from MongoDB
    await scan.deleteOne();

    res.status(200).json({
      success: true,
      message: "Scan deleted successfully.",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};