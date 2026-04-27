const Session = require("../models/Session");
const Question = require("../models/Question");
const mongoose = require("mongoose");

// @desc    Create a new session
// @route   POST /api/sessions/create
// @access  Private
exports.createSession = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, description, questions } = req.body;
    const userId = req.user._id;

    // Create new session
    const session = await Session.create({
      user: userId,
      role,
      experience,
      topicsToFocus,
      description,
    });

    console.log("[SessionController] Session created:", session._id);

    // Create questions linked to session
    if (questions && questions.length > 0) {
      console.log("[SessionController] Storing questions...");
      const questionDocs = await Promise.all(
        questions.map(async (q, index) => {
          console.log(`[SessionController] Creating question ${index + 1}:`, q.question?.substring(0, 30));
          const question = await Question.create({
            session: session._id,
            question: q.question,
            answer: q.answer,
          });
          return question._id;
        })
      );

      session.questions = questionDocs;
      await session.save();
    }

    return res.status(201).json({
      success: true,
      session,
    });
  } catch (error) {
    console.error("[SessionController] Error in createSession:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all sessions for logged-in user
// @route   GET /api/sessions/my-sessions
// @access  Private
exports.getMySessions = async (req, res) => {
  try {
    const userId = req.user._id;

    const sessions = await Session.find({ user: userId })
      .populate("questions")
      .sort({ createdAt: -1 })
      .exec();

    return res.status(200).json({
      success: true,
      sessions,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// @desc    Get a session by ID with populated questions
// @route   GET /api/sessions/:id
// @access  Private
exports.getSessionById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid session id" });
    }

    const session = await Session.findById(req.params.id)
      .populate({
        path: "questions",
        options: { sort: { isPinned: -1, createdAt: 1 } },
      })
      .exec();

    if (!session) {
      return res
        .status(404)
        .json({ success: false, message: "Session not found" });
    }

    return res.status(200).json({ success: true, session });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// @desc    Update session
// @route   PUT /api/sessions/:id
// @access  Private
exports.updateSession = async (req, res) => {
  try {
    const { id } = req.params;
    const { role, experience, topicsToFocus, questions } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid session id" });
    }

    const session = await Session.findByIdAndUpdate(
      id,
      { role, experience, topicsToFocus, questions },
      { new: true }
    ).populate("questions");

    if (!session) {
      return res.status(404).json({ success: false, message: "Session not found" });
    }

    return res.status(200).json({
      success: true,
      session,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete a session and its questions
// @route   DELETE /api/sessions/:id
// @access  Private
exports.deleteSession = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid session id" });
    }

    const session = await Session.findById(req.params.id);

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    // Check if the logged-in user owns this session
    if (session.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ message: "Not authorized to delete this session" });
    }

    // First, delete all questions linked to this session
    await Question.deleteMany({ session: session._id });

    // Then, delete the session
    await session.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Session deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = {
  createSession: exports.createSession,
  getMySessions: exports.getMySessions,
  getSessionById: exports.getSessionById,
  updateSession: exports.updateSession,
  deleteSession: exports.deleteSession,
};
