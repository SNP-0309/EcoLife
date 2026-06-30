const { body } = require("express-validator");

// Register Validation
exports.registerValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required.")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters."),

  body("email")
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email."),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters."),
];

// Login Validation
exports.loginValidation = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email."),

  body("password")
    .notEmpty()
    .withMessage("Password is required."),
];

// Update Profile Validation
exports.updateProfileValidation = [
  body("name")
    .optional()
    .trim()
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters."),

  body("email")
    .optional()
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email."),
];

// Change Password Validation
exports.changePasswordValidation = [
  body("currentPassword")
    .notEmpty()
    .withMessage("Current password is required."),

  body("newPassword")
    .isLength({ min: 6 })
    .withMessage("New password must be at least 6 characters."),
];