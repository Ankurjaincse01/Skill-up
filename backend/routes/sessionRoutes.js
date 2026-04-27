const express = require("express");
const {
  createSession,
  getMySessions,
  getSessionById,
  updateSession,
  deleteSession,
} = require("../controllers/sessionController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

// Session Routes (all protected)
router.post("/create", protect, createSession);
router.get("/my-sessions", protect, getMySessions);
router.get("/:id", protect, getSessionById);
router.put("/:id", protect, updateSession);
router.delete("/:id", protect, deleteSession);

module.exports = router;
