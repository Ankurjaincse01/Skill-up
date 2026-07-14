# Interview Prep Platform - Frontend

A **React + Vite + Tailwind CSS** single-page application for interview preparation. Users can create interview sessions, generate AI-powered questions, track progress, and review explanations on an intuitive dashboard.

---

## 1. Frontend Overview

This frontend app is built with:
- **React 18+** for UI components and state management
- **Vite** for fast dev server and optimized builds
- **Tailwind CSS** for utility-first styling
- **Axios** for API communication
- **Context API** for lightweight state management (user, auth)
- **React Router** (if configured) for multi-page navigation

The app communicates with the backend via REST APIs and handles authentication using JWT tokens stored in localStorage.

---

## 2. Folder Structure

```
src/
  pages/
    LandingPage.jsx              # Public landing/welcome page
    Auth/
      Login.jsx                  # User login form
      SignUp.jsx                 # User registration form
    Home/
      Dashboard.jsx              # Main dashboard with sessions/questions
      CreateSessionForm.jsx      # Form to create new interview sessions
    InterviewPrep/
      InterviewPrep.jsx          # Interview prep interface
      components/
        AIResponsePreview.jsx    # AI-generated question preview
        RoleInfoHeader.jsx       # Role/topic header info
  
  components/
    Drawer.jsx                   # Side drawer/navigation
    Modal.jsx                    # Reusable modal component
    ProfilePhotoSelector.jsx     # Photo upload for profile
    Auth/                        # Auth-related components
    Cards/
      ProfileInfoCard.jsx        # User profile card
      QuestionCard.jsx           # Question display card
      SummaryCard.jsx            # Session summary card
    Inputs/
      Input.jsx                  # Reusable input field
    layouts/
      DashboardLayout.jsx        # Dashboard layout wrapper
      Navbar.jsx                 # Top navigation bar
    Loader/
      SkeletonLoader.jsx         # Skeleton loading UI
      SpinnerLoader.jsx          # Spinning loader
  
  context/
    userContext.jsx              # User/auth state (Context API)
  
  utils/
    apiPaths.js                  # API endpoint constants
    axiosInstance.js             # Axios client with interceptors
    data.js                      # Mock/local data
    helper.js                    # Helper functions (date, format, etc.)
    uploadImage.js               # Image upload utility
  
  App.jsx                        # Root component
  main.jsx                       # Entry point
  index.css                      # Global styles

public/                          # Static assets
tailwind.config.js               # Tailwind CSS configuration
vite.config.js                   # Vite configuration
package.json                     # Dependencies and scripts
```

---

## 3. How Frontend Works (Step-by-Step Flow)

1. **User Visits App**
   - Browser loads `index.html` → loads `main.jsx` → renders `App.jsx`

2. **Landing/Auth Page**
   - User lands on `LandingPage.jsx` or redirected to `SignUp.jsx`/`Login.jsx`
   - User enters credentials → sends `POST /auth/register` or `POST /auth/login`
   - Backend validates and returns JWT token
   - Frontend stores token in localStorage via `userContext.jsx`

3. **Dashboard**
   - After login, user navigates to `Dashboard.jsx` (inside `DashboardLayout.jsx` wrapper)
   - Displays:
     - User profile card (from `ProfileInfoCard.jsx`)
     - List of sessions (from `sessionContext` or API call)
     - Quick action to create new session

4. **Create Session**
   - User clicks "Create Session" → `CreateSessionForm.jsx` modal opens
   - Form takes: role, focus area, experience level
   - Submits `POST /sessions` with JWT token in headers
   - Backend creates session in MongoDB
   - Frontend updates dashboard

5. **Generate Questions**
   - User clicks "Generate Questions" for a session
   - Frontend calls `POST /ai/generate-questions` with session ID
   - Backend generates AI prompts and questions
   - Questions stored in MongoDB
   - Frontend fetches and displays in `QuestionCard.jsx`

6. **View/Review**
   - User can view full question in `InterviewPrep.jsx`
   - Can request explanation via `POST /ai/generate-explanation`
   - Response displayed in `AIResponsePreview.jsx`

7. **State Management**
   - User data (auth, profile) stored in `userContext.jsx`
   - Component-level state for UI toggles (modals, forms)
   - API calls via `axiosInstance.js` with auto JWT injection

---

## 4. API Integration Points

Frontend uses these backend endpoints (defined in `utils/apiPaths.js`):

### Auth
- `POST /auth/register` → Create account
- `POST /auth/login` → Login and get JWT

### Sessions
- `GET /sessions` → Fetch all user sessions
- `POST /sessions` → Create new session
- `GET /sessions/:id` → Fetch session details

### Questions
- `GET /questions` → Fetch questions for a session
- `POST /questions` → Save new question (usually via AI)

### AI
- `POST /ai/generate-questions` → Generate interview questions
- `POST /ai/generate-explanation` → Get concept explanation

### Image Upload
- `POST /auth/upload-image` → Upload profile photo to Cloudinary

All requests include JWT token in `Authorization: Bearer <token>` header (auto-injected by `axiosInstance.js`).

---

## 5. Image Upload & Cloudinary Integration

Profile photos are uploaded to **Cloudinary** cloud storage for persistent, production-ready image delivery.

### How It Works in Frontend:
1. **ProfilePhotoSelector.jsx** allows user to choose image
2. **SignUp.jsx** calls `uploadImage()` util function
3. **uploadImage.js** sends FormData to `/auth/upload-image` endpoint
4. Backend uploads to Cloudinary, returns secure URL
5. Frontend includes URL in signup/profile payload
6. URL is stored in MongoDB and displayed in profile card

### Relevant Files:
- `src/components/ProfilePhotoSelector.jsx` - Photo picker UI
- `src/utils/uploadImage.js` - Handles Cloudinary upload request
- `src/utils/apiPaths.js` - Defines `/auth/upload-image` endpoint
- `src/pages/Auth/SignUp.jsx` - Uses photo upload in signup flow

### Supported Formats:
- JPG, JPEG, PNG
- Max file size: 5MB

### Error Handling:
- If photo upload fails, signup continues without photo (non-blocking)
- Error logged to console but doesn't prevent signup

---

## 6. Core Components Explained

| Component | Purpose |
|-----------|---------|
| `DashboardLayout` | Wraps pages with navbar + drawer |
| `Navbar` | Top nav with logout + profile |
| `Drawer` | Side menu for navigation |
| `QuestionCard` | Displays single question with actions |
| `ProfileInfoCard` | Shows user profile info |
| `SummaryCard` | Session statistics summary |
| `Modal` | Reusable modal for forms/content |
| `SkeletonLoader` | Skeleton UI while loading data |
| `Input` | Reusable form input field |

---

## 7. Context API (User State)

`userContext.jsx` manages:
- Current logged-in user info
- JWT token
- Auth state (loggedIn, loading)
- User profile (name, email, photo)

Used by components via `useContext(UserContext)` hook.

---

## 8. Setup and Installation

### Prerequisites
- Node.js (LTS)
- npm or yarn

### Steps
```bash
cd frontend/interviewprep
npm install
npm run dev
```

By default, Vite runs on `http://localhost:5173`

### Environment Variables (Optional)
Create `.env.local` in `frontend/interviewprep/` if needed:
```
VITE_API_BASE_URL=http://localhost:3000
```

This is used by `axiosInstance.js` to construct full API URLs.

---

## 9. Run Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server (hot reload enabled) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

---

## 10. Key Files Deep Dive

### `utils/axiosInstance.js`
Sets up axios client with:
- Base URL pointing to backend
- Interceptor to add JWT token to all requests
- Error handling for 401 (token expired)

### `utils/apiPaths.js`
Centralizes all API endpoint URLs so changes are maintainable.

### `context/userContext.jsx`
Provides user data and auth functions globally to all components.

### `utils/uploadImage.js`
Handles profile photo upload to Cloudinary cloud storage.

---

## 11. Common Issues and Fixes

### API calls return 401
- Token expired or not stored properly
- Check `userContext.jsx` for token storage
- Check browser localStorage for `token` key

### Page doesn't load after login
- Check if user context is properly initialized
- Verify backend is running and responding
- Check browser console for API errors

### Tailwind styles not applying
- Ensure `tailwind.config.js` has correct `content` paths
- Run `npm run build` and check CSS is bundled

### Images/uploads not showing
- Verify Cloudinary credentials are set in backend `.env`
- Check Cloudinary URL is returned from `/auth/upload-image` endpoint
- Verify CORS settings in backend `server.js`

---

## 12. Frontend to Backend Communication Flow

```
User Action (click button)
    ↓
React Handler (onClick)
    ↓
Call API via axiosInstance
    ↓
Include JWT token (auto via interceptor)
    ↓
Backend receives & validates token
    ↓
Backend processes & returns data
    ↓
Frontend updates state → re-renders UI
    ↓
User sees result
```

---

## 13. Production Build

```bash
npm run build
```

Creates optimized bundle in `dist/` folder. Deploy this folder to Vercel, Netlify, or any static host.

---

## 14. Next Steps for Enhancements

- Add TypeScript for type safety
- Add unit tests (Jest + React Testing Library)
- Add E2E tests (Cypress/Playwright)
- Implement refresh token rotation
- Add pagination for sessions/questions
- Add offline mode with service workers

---

## 15. Tech Stack Summary

| Tech | Purpose |
|------|---------|
| React | UI library |
| Vite | Build tool & dev server |
| Tailwind CSS | Styling |
| Axios | HTTP client |
| Context API | State management |
| React Router | Routing (if configured) |

---

## 16. Quick Troubleshooting Checklist

- [ ] Backend server running on port 3000?
- [ ] `.env` or `.env.local` set up with correct API URL?
- [ ] Frontend running on port 5173?
- [ ] Token stored in localStorage after login?
- [ ] CORS enabled on backend?
- [ ] No console errors in browser DevTools?

---

## Support

For issues or questions, check the root `README.md` or `backend/README.md` for full project context.
