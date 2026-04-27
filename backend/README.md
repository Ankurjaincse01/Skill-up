# Interview Prep AI - Backend Structure

## Project Structure

```
backend/
├── config/
│   └── db.js                 # MongoDB database configuration
├── controllers/
│   ├── authController.js     # Authentication logic (signup, login)
│   ├── userController.js     # User profile management
│   ├── questionController.js # Interview questions management
│   └── sessionController.js  # Practice session management
├── middlewares/
│   ├── authMiddleware.js     # JWT authentication middleware
│   ├── errorHandler.js       # Global error handling
│   └── uploadMiddleware.js   # File upload handling
├── models/
│   ├── User.js               # User schema
│   ├── Question.js           # Question schema
│   └── Session.js            # Session schema
├── routes/
│   ├── authRoutes.js         # Auth endpoints
│   ├── userRoutes.js         # User endpoints
│   ├── questionRoutes.js     # Question endpoints
│   └── sessionRoutes.js      # Session endpoints
├── utils/
│   ├── aiHelper.js           # AI-related utility functions
│   └── responseHandler.js    # Response formatting utilities
├── uploads/                  # Uploaded files directory
├── .env                      # Environment variables
├── .env.example              # Example environment file
├── server.js                 # Main server file
├── package.json              # Dependencies
└── README.md                 # This file
```

## File Descriptions

### Config
- **db.js** - MongoDB connection setup

### Controllers
- **authController.js** - Handles user signup and login
- **userController.js** - Profile retrieval and updates
- **questionController.js** - CRUD operations for interview questions
- **sessionController.js** - Create and manage practice sessions

### Middlewares
- **authMiddleware.js** - Validates JWT tokens
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
