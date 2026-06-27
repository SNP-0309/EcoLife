const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const { scanWaste } = require("../controllers/scanController");

router.post("/", protect, upload.single("image"), scanWaste);

module.exports = router;