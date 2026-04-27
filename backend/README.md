# Backend

Node.js + Express REST API server for interview prep platform.

## Setup
```bash
npm install
cp .env.example .env
npm run dev
```

## Tech Stack
- Node.js, Express, MongoDB, JWT
- Cloudinary, Nodemailer
- AI: OpenAI, Google Gemini, Groq

## Key Endpoints
- `POST /auth/signup` - Register
- `POST /auth/login` - Login
- `GET /questions` - Get questions
- `POST /sessions` - Create session
- `POST /ai/generate-question` - Generate question
- `POST /ai/evaluate-answer` - Evaluate answer

## Running

Development:
```bash
npm run dev
```

Production:
```bash
npm start
```

Backend runs on: http://localhost:5000
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
