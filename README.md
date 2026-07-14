# 🎯 Skill-Up: Interview Prep AI Platform

A full-stack web application to help users prepare for technical interviews with AI-powered question generation, real-time feedback, and comprehensive progress tracking.

---

## 📋 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)

---

## ✨ Features

### User Features
- **User Authentication** - Secure login/signup with JWT tokens
- **Interview Sessions** - Create and manage multiple interview prep sessions
- **AI-Generated Questions** - Dynamic question generation using OpenAI/Gemini APIs
- **Progress Tracking** - Track interview attempts, scores, and improvements
- **Session History** - Review past sessions and performance metrics
- **Profile Management** - Update profile, upload profile photo
- **Question Bank** - Curated questions by role and difficulty level

### Admin Features
- User management
- Question moderation
- Performance analytics
- Session monitoring

---

## 🛠️ Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **Authentication:** JWT (jsonwebtoken)
- **File Upload:** Cloudinary + Multer
- **AI Integrations:** 
  - OpenAI API
  - Google Gemini API
  - Groq API
- **Email Service:** Nodemailer
- **Password Hashing:** Bcrypt

### Frontend
- **Framework:** React 18+
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **State Management:** Context API
- **HTTP Client:** Axios
- **Routing:** React Router
- **UI Components:** React Icons, React Hot Toast
- **Markdown:** React Markdown, React Syntax Highlighter

---

## 📁 Project Structure

```
Skill-Up/
│
├── backend/                          # Node.js + Express Server
│   ├── config/
│   │   └── db.js                    # MongoDB configuration
│   │
│   ├── controllers/
│   │   ├── authController.js        # Authentication logic
│   │   ├── aiController.js          # AI integration
│   │   ├── questionController.js    # Question CRUD operations
│   │   └── sessionController.js     # Interview session management
│   │
│   ├── models/
│   │   ├── User.js                  # User schema
│   │   ├── Question.js              # Question schema
│   │   └── Session.js               # Interview session schema
│   │
│   ├── routes/
│   │   ├── authRoutes.js            # /auth endpoints
│   │   ├── questionRoutes.js        # /questions endpoints
│   │   └── sessionRoutes.js         # /sessions endpoints
│   │
│   ├── middlewares/
│   │   ├── authMiddleware.js        # JWT verification
│   │   └── uploadMiddleware.js      # File upload handling
│   │
│   ├── utils/
│   │   ├── emailService.js          # Email sending utilities
│   │   └── prompts.js               # AI prompt templates
│   │
│   ├── package.json
│   ├── server.js                    # Entry point
│   └── README.md
│
└── frontend/                         # React + Vite App
    ├── src/
    │   ├── pages/
    │   │   ├── LandingPage.jsx      # Home page
    │   │   ├── Auth/
    │   │   │   ├── Login.jsx
    │   │   │   └── SignUp.jsx
    │   │   ├── Home/
    │   │   │   ├── Dashboard.jsx            # Main dashboard
    │   │   │   └── CreateSessionForm.jsx   # Create new session
    │   │   └── InterviewPrep/
    │   │       ├── InterviewPrep.jsx       # Interview interface
    │   │       └── components/
    │   │           ├── AIResponsePreview.jsx
    │   │           └── RoleInfoHeader.jsx
    │   │
    │   ├── components/
    │   │   ├── Drawer.jsx                  # Navigation drawer
    │   │   ├── Modal.jsx                   # Modal component
    │   │   ├── ProfilePhotoSelector.jsx    # Photo upload
    │   │   ├── Cards/
    │   │   │   ├── ProfileInfoCard.jsx
    │   │   │   ├── QuestionCard.jsx
    │   │   │   └── SummaryCard.jsx
    │   │   ├── Inputs/
    │   │   │   └── Input.jsx
    │   │   ├── Loader/
    │   │   │   ├── SkeletonLoader.jsx
    │   │   │   └── SpinnerLoader.jsx
    │   │   └── layouts/
    │   │       ├── DashboardLayout.jsx
    │   │       └── Navbar.jsx
    │   │
    │   ├── context/
    │   │   └── userContext.jsx            # Global user state
    │   │
    │   ├── utils/
    │   │   ├── apiPaths.js                # API endpoint constants
    │   │   ├── axiosInstance.js           # Axios configuration
    │   │   ├── data.js                    # Mock/static data
    │   │   ├── helper.js                  # Helper functions
    │   │   └── uploadImage.js             # Image upload to Cloudinary
    │   │
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    │
    ├── public/                      # Static assets
    ├── package.json
    ├── vite.config.js
    └── index.html
```

---

## 🚀 Setup & Installation

### Prerequisites
- Node.js (v14+)
- npm or yarn
- MongoDB (local or cloud)
- Git

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file and add the following:
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_key
GEMINI_API_KEY=your_gemini_key
GROQ_API_KEY=your_groq_key
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password

# Start the server
npm run dev  # Development mode with nodemon
# or
npm start   # Production mode
```

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env file and add:
VITE_API_BASE_URL=http://localhost:5000

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🏃 Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000`

### Production Mode

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
# Serve the dist folder with a static server
```

---

## 📡 API Endpoints

### Authentication
- `POST /auth/signup` - Create new user account
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout

### Questions
- `GET /questions` - Get all questions
- `GET /questions/:id` - Get question by ID
- `POST /questions` - Create new question (admin)
- `PUT /questions/:id` - Update question (admin)
- `DELETE /questions/:id` - Delete question (admin)

### Sessions
- `GET /sessions` - Get user sessions
- `POST /sessions` - Create new session
- `GET /sessions/:id` - Get session details
- `PUT /sessions/:id` - Update session
- `DELETE /sessions/:id` - Delete session

### AI
- `POST /ai/generate-question` - Generate AI question
- `POST /ai/evaluate-answer` - Evaluate user's answer

---

## 📦 Dependencies

### Backend Key Packages
```json
{
  "@google/generative-ai": "^0.24.1",
  "@google/genai": "^1.46.0",
  "bcrypt": "^6.0.0",
  "cloudinary": "^1.41.3",
  "cors": "^2.8.6",
  "express": "^5.2.1",
  "groq-sdk": "^1.1.2",
  "jsonwebtoken": "^9.0.3",
  "mongoose": "^9.3.2",
  "multer": "^2.1.1",
  "nodemailer": "^8.0.5",
  "openai": "^6.32.0"
}
```

### Frontend Key Packages
```json
{
  "react": "^19.2.4",
  "react-dom": "^19.2.4",
  "react-router-dom": "^7.13.2",
  "axios": "^1.13.6",
  "tailwindcss": "^4.2.2",
  "react-hot-toast": "^2.6.0",
  "react-markdown": "^10.1.0"
}
```

---

## 🔐 Environment Variables

### Backend (.env)
```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/skill-up

# JWT
JWT_SECRET=your_super_secret_jwt_key_here

# AI APIs
OPENAI_API_KEY=sk-...
GEMINI_API_KEY=AIza...
GROQ_API_KEY=gsk_...

# File Upload (Cloudinary)
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=1234567890
CLOUDINARY_API_SECRET=abc_xyz_secret

# Email Service
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:5000
VITE_APP_NAME=Skill-Up
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the ISC License.

---

## 👤 Author

**Ankur Jain**
- GitHub: [@Ankurjaincse01](https://github.com/Ankurjaincse01)
- Repository: [Skill-up](https://github.com/Ankurjaincse01/Skill-up)

---

## 🙏 Acknowledgments

- OpenAI for GPT API
- Google for Gemini API
- Groq for LLM inference
- Cloudinary for image hosting
- MongoDB for database
- React and Node.js communities

---

**Made with ❤️ to help students ace their interviews!**
