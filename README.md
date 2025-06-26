# 🎓 Coligo - Learning Management System

A modern, full-stack Learning Management System built with React, TypeScript, and Node.js featuring be

## 🚀 Live Demo

**Frontend**: https://colligo-frontend-mwp1h6lsv-ahmad-abdelazizs-projects.vercel.app  
**Backend API**: https://coligo-backend-4x93nbvda-ahmad-abdelazizs-projects.vercel.app

## 🧪 Test Credentials

| Role           | Email                | Password     |
| -------------- | -------------------- | ------------ |
| 🎓 **Student** | `student@coligo.com` | `student123` |
| 👨‍💼 **Admin**   | `admin@coligo.com`   | `admin123`   |

## ⚡ Tech Stack

### Frontend

- **React 19** + **TypeScript** + **Vite**
- **Material-UI** + **Tailwind CSS** for styling
- **Redux Toolkit** for state management
- **React Router** for navigation
- **i18next** for internationalization

### Backend

- **Node.js** + **Express.js** + **TypeScript**
- **MongoDB** + **Mongoose** ODM
- **JWT Authentication** + **bcrypt** hashing
- **Swagger** API documentation
- **CORS** enabled

## ✨ Key Features

### 🎓 Student Features

- **Dashboard** with announcements and upcoming quizzes
- **Quiz System** with interactive questions and scoring
- **Beautiful Empty States** with gradient animations
- **Responsive Design** for all devices

### 👨‍💼 Admin Features

- **Content Management** for quizzes and announcements
- **User Management** with role-based access
- **CRUD Operations** for all resources

### 🎨 UI/UX Highlights

- **Modern Gradient Design** with glassmorphism effects
- **Animated Empty States** with Tailwind CSS
- **Hover Animations** and smooth transitions
- **Mobile-First** responsive design

## 🛠️ Quick Setup

### Prerequisites

- Node.js 18+
- MongoDB Atlas account
- Git

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env  # Add your MongoDB URI and JWT secret
npm run build
npm run seed          # Populate test data
npm start
```

### Frontend Setup

```bash
cd frontend
npm install
npm run build
npm start
```

## 📚 API Documentation

**Swagger UI** is available when running the backend locally:

```
http://localhost:5000/api-docs
```

> **Note**: Swagger documentation is only available in development mode and does not work on the deployed Vercel URI for security reasons.

## 📁 Project Structure

```
coligo/
├── backend/           # Express.js API
│   ├── src/
│   │   ├── controllers/   # Route handlers
│   │   ├── models/        # Mongoose schemas
│   │   ├── services/      # Business logic
│   │   ├── middleware/    # Auth & logging
│   │   └── routes/        # API routes
│   └── dist/          # Compiled JavaScript
└── frontend/          # React application
    ├── src/
    │   ├── components/    # Reusable UI components
    │   ├── pages/         # Route pages
    │   ├── store/         # Redux store & slices
    │   └── services/      # API client
    └── dist/          # Production build
```

## 🔗 API Endpoints

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| `POST` | `/api/auth/register` | User registration   |
| `POST` | `/api/auth/login`    | User authentication |
| `GET`  | `/api/quizzes`       | Fetch all quizzes   |
| `GET`  | `/api/announcements` | Fetch announcements |
| `GET`  | `/api/health`        | Health check        |

## 🔐 Authentication & Route Protection

### HOC (Higher-Order Component) Pattern

The app implements a **robust authentication system** using HOCs for route protection:

#### `ProtectedRoute` Component

```typescript
// Protects routes requiring authentication
<ProtectedRoute>
  <DashboardLayout />
</ProtectedRoute>
```

#### `AdminRoute` Component

```typescript
// Dual-layer protection: Authentication + Role-based access
const AdminRoute = ({ children }) => {
  // 1. Check if user is authenticated
  // 2. Verify user has 'admin' role
  // 3. Redirect accordingly
};
```

### Route Protection Features

- **Automatic Redirects**: Unauthorized users → `/login`
- **Role-based Access**: Students → `/dashboard`, Admins → `/admin`
- **Loading States**: Smooth UX during authentication checks
- **Token Persistence**: Auth state survives page refreshes
- **JWT Validation**: Backend middleware validates all protected endpoints

### Implementation Highlights

- **Frontend HOCs** for component-level protection
- **Backend Middleware** for API endpoint security
- **Redux Integration** for centralized auth state
- **TypeScript Types** for type-safe user roles

## 🎯 Challenge Highlights

- **Full-Stack Implementation** with modern technologies
- **Clean Architecture** with separation of concerns
- **Type Safety** throughout the application
- **Responsive Design** with beautiful animations
- **Production Deployment** on Vercel
- **API Documentation** with Swagger
- **Database Seeding** with test data
- **Authentication System** with JWT

## 📝 Development Notes

- **Environment Variables**: Configure `VITE_API_URL` for frontend
- **CORS**: Enabled for cross-origin requests
- **Security**: Passwords hashed with bcrypt (12 rounds)
- **Validation**: Comprehensive input validation
- **Error Handling**: Structured error responses
