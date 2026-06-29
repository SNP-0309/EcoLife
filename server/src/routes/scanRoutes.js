const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");
const protect = require("../middleware/authMiddleware");

const {
  scanWaste,
  getScanHistory,
} = require("../controllers/scanController");

router.post("/scan", protect, upload.single("image"), scanWaste);

router.get("/history", protect, getScanHistory);

module.exports = router;