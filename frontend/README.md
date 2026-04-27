# Frontend

React + Vite interview prep application.

## Setup
```bash
npm install
npm run dev
```

## Tech Stack
- React 18+, Vite, Tailwind CSS
- Axios, Context API
- React Router, React Icons
- React Hot Toast

## Key Features
- User authentication (JWT)
- Create & manage interview sessions
- View AI-generated questions
- Track performance & progress
- Upload profile photos
- Real-time session tracking

## Running

Development:
```bash
npm run dev
```

Production build:
```bash
npm run build
npm run preview
```

Frontend runs on: http://localhost:5173

## Folder Structure
```
src/
├── pages/          - Main page components (LandingPage, Auth, Home, InterviewPrep)
├── components/     - Reusable UI components (Cards, Inputs, Loader, Navbar, Modal, Drawer)
├── context/        - userContext.jsx for global state management
├── utils/          - Helper functions and API configuration
│   ├── axiosInstance.js  - Axios client with JWT interceptor
│   ├── apiPaths.js       - Centralized API endpoints
│   ├── helper.js         - Utility functions
│   └── uploadImage.js    - Cloudinary image upload
├── assets/         - Images, icons, and static files
├── App.jsx         - Main app component
├── main.jsx        - Entry point
└── index.css       - Global styles
```

