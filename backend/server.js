require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const questionRoutes = require("./routes/questionRoutes");
const { protect } = require("./middlewares/authMiddleware");
const {
  generateInterviewQuestions,
  generateConceptExplanation,
} = require("./controllers/aiController");

const app = express();

// CORS — allow all origins
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

connectDB();

// body parser
app.use(express.json());
// health check
app.get('/test', (req, res) => {
  res.send('Ankur Jain');
});



// Routes
app.use("/auth", authRoutes);
app.use("/sessions", sessionRoutes);
app.use("/questions", questionRoutes);

// AI routes (protected)
app.post("/ai/generate-questions", protect, generateInterviewQuestions);
app.post("/ai/generate-explanation", protect, generateConceptExplanation);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




