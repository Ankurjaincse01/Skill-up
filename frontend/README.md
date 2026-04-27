# Frontend

React + Vite interview prep application.

## Setup
```bash
npm install
npm run dev
```

## Features
- User authentication (JWT)
- Create & manage interview sessions
- View AI-generated questions
- Track performance & progress
- Upload profile photos
- Real-time session tracking
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
