const Question = require("../models/Question");
const Session = require("../models/Session");

// POST /questions/add — bulk insert questions into a session
exports.addQuestionsToSession = async (req, res) => {
  try {
    const { sessionId, questions } = req.body;

    if (!sessionId || !questions || !Array.isArray(questions)) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    const session = await Session.findById(sessionId);

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }


    const createdQuestions = await Question.insertMany(
      questions.map((q) => ({
        session: sessionId,
        question: q.question,
        answer: q.answer,
      }))
    );

    // link new question IDs to session
    session.questions.push(...createdQuestions.map((q) => q._id));
    await session.save();

    return res.status(201).json({
      success: true,
      questionsAdded: createdQuestions.length,
      questions: createdQuestions,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// POST /questions/:id/pin — toggle pin/unpin on a question
exports.togglePinQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    question.isPinned = !question.isPinned;
    await question.save();

    return res.status(200).json({
      success: true,
      message: `Question ${question.isPinned ? "pinned" : "unpinned"}`,
      isPinned: question.isPinned,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// POST /questions/:id/note — add/update personal note on a question
exports.updateQuestionNote = async (req, res) => {
  try {
    const { note } = req.body;
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    question.note = note;
    await question.save();

    return res.status(200).json({
      success: true,
      message: "Note updated",
      question,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = {
  addQuestionsToSession: exports.addQuestionsToSession,
  togglePinQuestion: exports.togglePinQuestion,
  updateQuestionNote: exports.updateQuestionNote,
};
