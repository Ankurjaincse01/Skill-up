const express = require("express");
const { registerUser, loginUser, getUserProfile, verifyOTP } = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");
const { upload } = require("../middlewares/uploadMiddleware");

const router = express.Router();

// Auth Routes
router.post("/register", registerUser);
router.post("/verify-otp", verifyOTP);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);

// Upload image route
router.post("/upload-image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  // Cloudinary returns secure_url or path
  const imageUrl = req.file.secure_url || req.file.path;
  res.status(200).json({ imageUrl });
});

module.exports = router;
