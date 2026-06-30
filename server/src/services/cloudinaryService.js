const cloudinary = require("../config/cloudinary");

const uploadToCloudinary = async (
  buffer,
  folder = "EcoLife",
  mimeType = "image/jpeg"
) => {
  const base64Image = `data:${mimeType};base64,${buffer.toString("base64")}`;

  return await cloudinary.uploader.upload(base64Image, {
    folder,
  });
};
module.exports = uploadToCloudinary;