const uploadToCloudinary = require("../services/cloudinaryService");

exports.scanWaste = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image.",
      });
    }

    const uploadedImage = await uploadToCloudinary(req.file.buffer);

    res.status(200).json({
      success: true,
      message: "Image uploaded successfully!",
      imageUrl: uploadedImage.secure_url,
    });
  } catch (error) {
  console.log(error);

  res.status(500).json({
    success: false,
    message: error.message,
    error,
  });
}
};