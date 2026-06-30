const express = require("express");
const router = express.Router();

const {
  register,
  login,
  logout,
  getProfile,
  updateProfile,
  changePassword,
  updateProfilePicture,
  deleteAccount,
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const validate = require("../middleware/validationMiddleware");

const {
  registerValidation,
  loginValidation,
  updateProfileValidation,
  changePasswordValidation,
} = require("../validations/authValidation");

// Public Routes
router.post(
  "/register",
  registerValidation,
  validate,
  register
);
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 

 */
router.post(
  "/login",
  loginValidation,
  validate,
  login
);

// Protected Routes
router.post("/logout", protect, logout);

router.get("/profile", protect, getProfile);

router.put(
  "/profile",
  protect,
  updateProfileValidation,
  validate,
  updateProfile
);

router.put(
  "/change-password",
  protect,
  changePasswordValidation,
  validate,
  changePassword
);

router.put(
  "/profile-picture",
  protect,
  upload.single("image"),
  updateProfilePicture
);

router.delete("/account", protect, deleteAccount);

module.exports = router;