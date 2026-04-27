# Backend - Node.js + Express

REST API server for Interview Prep platform with MongoDB, JWT auth, and AI integration.

## Tech Stack
- Node.js, Express, MongoDB, JWT, Cloudinary
- AI APIs: OpenAI, Google Gemini, Groq

## Setup
```bash
npm install
cp .env.example .env
npm run dev
```

## Project Structure
```
backend/
├── config/       # db.js (MongoDB config)
├── controllers/  # authController, aiController, questionController, sessionController
├── models/       # User, Question, Session schemas
├── routes/       # authRoutes, questionRoutes, sessionRoutes
├── middlewares/  # authMiddleware, uploadMiddleware
├── utils/        # emailService, prompts
└── server.js     # Entry point
```

## Key Endpoints
- `POST /auth/signup` - User registration
- `POST /auth/login` - User login
- `GET /questions` - Get questions
- `POST /sessions` - Create session
- `POST /ai/generate-question` - AI question generation

## Environment Variables
See `.env.example` for all required variables (MongoDB, JWT secret, API keys, etc.)
- **errorHandler.js** - Centralized error handling
- **uploadMiddleware.js** - Handles file uploads with multer

### Models
- **User.js** - User information schema
- **Question.js** - Interview question schema
- **Session.js** - Practice session data schema

### Routes
- **authRoutes.js** - `/auth/signup`, `/auth/login`
- **userRoutes.js** - `/user/profile` endpoints
- **questionRoutes.js** - `/questions` CRUD endpoints
- **sessionRoutes.js** - `/sessions` management endpoints

### Utils
- **aiHelper.js** - AI question generation and feedback (TODO: Integrate with Google Genai)
- **responseHandler.js** - Standardized response formatting

---

## Image Upload & Cloudinary Integration

**Profile photos and images are stored in Cloudinary cloud storage**, not locally.

### How It Works:
1. **Frontend** sends image file to `/auth/upload-image` endpoint (multipart/form-data)
2. **uploadMiddleware.js** intercepts with Cloudinary storage:
   - Validates file type (jpg, jpeg, png only)
   - Uploads to Cloudinary folder: `interview-prep/profile-photos/`
   - Returns secure Cloudinary URL
3. **Frontend** receives URL and includes in signup/profile update payload
4. **Backend** stores Cloudinary URL in MongoDB User document

### Cloudinary Setup:
- **Dependencies**: `cloudinary`, `multer-storage-cloudinary`
- **Env Variables Required**:
  ```env
  CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
  CLOUDINARY_API_KEY=your_cloudinary_api_key
  CLOUDINARY_API_SECRET=your_cloudinary_api_secret
  ```
- **See**: [CLOUDINARY_SETUP.md](./CLOUDINARY_SETUP.md) for detailed configuration

### Image Upload Endpoint:
```
POST /auth/upload-image
Content-Type: multipart/form-data

Body:
  - image: (binary file, jpg/jpeg/png, max 5MB)

Response:
  {
    "imageUrl": "https://res.cloudinary.com/.../interview-prep/profile-photos/abc123.jpg"
  }
```

---

## API Endpoints

### Authentication
- `POST /auth/signup` - Create new account
- `POST /auth/login` - User login

### User
- `GET /user/profile` - Get user profile
- `PUT /user/profile` - Update user profile

### Questions
- `GET /questions` - Get all user questions
- `POST /questions` - Create new question
- `GET /questions/:id` - Get specific question
- `PUT /questions/:id` - Update question
- `DELETE /questions/:id` - Delete question

### Sessions
- `GET /sessions` - Get all sessions
- `POST /sessions` - Create new session
- `GET /sessions/:id` - Get session details
- `PUT /sessions/:id` - Update session
- `DELETE /sessions/:id` - Delete session

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env` file with required variables (see `.env.example`)

3. Start the server:
   ```bash
   npm start
   ```

## Next Steps

- [ ] Integrate MongoDB connection
- [ ] Implement Google Genai API for AI features
- [ ] Add image upload functionality
- [ ] Add API request validation
- [ ] Add unit tests
- [ ] Deploy to production
